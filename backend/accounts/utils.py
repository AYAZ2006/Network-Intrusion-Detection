# traffic_capture_cicids_style.py

from scapy.all import sniff
import pandas as pd
import statistics
import threading

flows = {}

# -------------------------------
# Flow key (bidirectional)
# -------------------------------
def get_flow_key(pkt):

    if not pkt.haslayer("IP"):
        return None

    proto = pkt["IP"].proto

    sport = 0
    dport = 0

    if pkt.haslayer("TCP"):
        sport = pkt["TCP"].sport
        dport = pkt["TCP"].dport
    elif pkt.haslayer("UDP"):
        sport = pkt["UDP"].sport
        dport = pkt["UDP"].dport

    src = pkt["IP"].src
    dst = pkt["IP"].dst

    if src < dst:
        return (src, sport, dst, dport, proto)
    else:
        return (dst, dport, src, sport, proto)


# -------------------------------
# Add packet
# -------------------------------
def add_packet(pkt):

    key = get_flow_key(pkt)

    if key is None:
        return

    if key not in flows:
        flows[key] = []

    flows[key].append(pkt)

    print(f"Packet captured: {pkt.summary()}", flush=True)


# -------------------------------
# Safe helpers
# -------------------------------
def safe_mean(data):
    return statistics.mean(data) if len(data) > 0 else 0


def safe_std(data):
    return statistics.stdev(data) if len(data) > 1 else 0


def safe_max(data):
    return max(data) if len(data) > 0 else 0


def safe_min(data):
    return min(data) if len(data) > 0 else 0


# -------------------------------
# Compute flow features
# -------------------------------
def compute_flow_features(pkts):

    pkts.sort(key=lambda p: p.time)

    timestamps = [p.time for p in pkts]
    pkt_lengths = [len(p) for p in pkts]

    # -----------------------
    # Flow duration fix
    # -----------------------

    if len(pkts) > 1:
        flow_duration = timestamps[-1] - timestamps[0]
        if flow_duration <= 0:
            flow_duration = 1e-6
    else:
        flow_duration = 1e-6

    # -----------------------
    # IAT
    # -----------------------

    if len(timestamps) > 1:
        iats = [timestamps[i+1] - timestamps[i] for i in range(len(timestamps)-1)]
    else:
        iats = [0]

    # -----------------------
    # Packet statistics
    # -----------------------

    pkt_len_mean = safe_mean(pkt_lengths)
    pkt_len_std = safe_std(pkt_lengths)

    # -----------------------
    # Forward / backward split
    # -----------------------

    src_ip = pkts[0]["IP"].src

    fwd = []
    bwd = []

    for p in pkts:

        if p["IP"].src == src_ip:
            fwd.append(p)
        else:
            bwd.append(p)

    fwd_lengths = [len(p) for p in fwd]
    bwd_lengths = [len(p) for p in bwd]

    # -----------------------
    # IAT Forward / Backward
    # -----------------------

    def calc_iat(packet_list):

        if len(packet_list) < 2:
            return [0]

        ts = [p.time for p in packet_list]

        return [ts[i+1] - ts[i] for i in range(len(ts)-1)]

    fwd_iat = calc_iat(fwd)
    bwd_iat = calc_iat(bwd)

    # -----------------------
    # TCP Flags
    # -----------------------

    syn = ack = fin = rst = psh = urg = ece = cwr = 0

    for p in pkts:

        if p.haslayer("TCP"):

            flags = p["TCP"].flags

            if flags & 0x02: syn += 1
            if flags & 0x10: ack += 1
            if flags & 0x01: fin += 1
            if flags & 0x04: rst += 1
            if flags & 0x08: psh += 1
            if flags & 0x20: urg += 1
            if flags & 0x40: ece += 1
            if flags & 0x80: cwr += 1

    # -----------------------
    # Window features
    # -----------------------

    fwd_win = []
    bwd_win = []

    for p in pkts:

        if p.haslayer("TCP"):

            win = p["TCP"].window

            if p["IP"].src == src_ip:
                fwd_win.append(win)
            else:
                bwd_win.append(win)

    init_fwd_win = fwd_win[0] if fwd_win else 0
    init_bwd_win = bwd_win[0] if bwd_win else 0

    # -----------------------
    # Active / Idle
    # -----------------------

    active_times = []
    idle_times = []

    threshold = 1

    start_active = timestamps[0]

    for i in range(1, len(timestamps)):

        gap = timestamps[i] - timestamps[i-1]

        if gap > threshold:

            active_times.append(timestamps[i-1] - start_active)
            idle_times.append(gap)

            start_active = timestamps[i]

    active_times.append(timestamps[-1] - start_active)

    # -----------------------
    # Bulk features
    # -----------------------

    def calc_bulk(pkts):

        if len(pkts) < 4:
            return (0,0)

        bytes_bulk = sum(len(p) for p in pkts)
        pkts_bulk = len(pkts)

        return (bytes_bulk, pkts_bulk)

    fwd_bulk_bytes, fwd_bulk_pkts = calc_bulk(fwd)
    bwd_bulk_bytes, bwd_bulk_pkts = calc_bulk(bwd)

    # -----------------------
    # Subflows
    # -----------------------

    subflows = 1

    for i in range(1, len(timestamps)):

        if timestamps[i] - timestamps[i-1] > 1:
            subflows += 1

    subflow_fwd_pkts = len(fwd) / subflows
    subflow_bwd_pkts = len(bwd) / subflows
    subflow_fwd_bytes = sum(fwd_lengths) / subflows if fwd_lengths else 0
    subflow_bwd_bytes = sum(bwd_lengths) / subflows if bwd_lengths else 0

    # -----------------------
    # Throughput
    # -----------------------

    total_bytes = sum(pkt_lengths)

    flow_bytes_sec = total_bytes / flow_duration
    flow_pkts_sec = len(pkts) / flow_duration

    # -----------------------
    # Ports / Protocol
    # -----------------------

    proto = pkts[0]["IP"].proto

    sport = 0
    dport = 0

    if pkts[0].haslayer("TCP"):
        sport = pkts[0]["TCP"].sport
        dport = pkts[0]["TCP"].dport
    elif pkts[0].haslayer("UDP"):
        sport = pkts[0]["UDP"].sport
        dport = pkts[0]["UDP"].dport

    # -----------------------
    # Feature dictionary
    # -----------------------

    features = {

        "Timestamp": timestamps[0],

        "Flow Duration": flow_duration,

        "Protocol": proto,

        "Src IP": pkts[0]["IP"].src,
        "Dst IP": pkts[0]["IP"].dst,

        "Src Port": sport,
        "Dst Port": dport,

        "Tot Fwd Pkts": len(fwd),
        "Tot Bwd Pkts": len(bwd),

        "Flow Byts/s": flow_bytes_sec,
        "Flow Pkts/s": flow_pkts_sec,

        "Pkt Len Mean": pkt_len_mean,
        "Pkt Len Std": pkt_len_std,
        "Pkt Len Max": safe_max(pkt_lengths),
        "Pkt Len Min": safe_min(pkt_lengths),

        "Flow IAT Mean": safe_mean(iats),
        "Flow IAT Std": safe_std(iats),
        "Flow IAT Max": safe_max(iats),
        "Flow IAT Min": safe_min(iats),

        "Fwd IAT Mean": safe_mean(fwd_iat),
        "Fwd IAT Std": safe_std(fwd_iat),
        "Fwd IAT Max": safe_max(fwd_iat),
        "Fwd IAT Min": safe_min(fwd_iat),

        "Bwd IAT Mean": safe_mean(bwd_iat),
        "Bwd IAT Std": safe_std(bwd_iat),
        "Bwd IAT Max": safe_max(bwd_iat),
        "Bwd IAT Min": safe_min(bwd_iat),

        "Fwd Pkt Len Mean": safe_mean(fwd_lengths),
        "Fwd Pkt Len Std": safe_std(fwd_lengths),
        "Fwd Pkt Len Max": safe_max(fwd_lengths),
        "Fwd Pkt Len Min": safe_min(fwd_lengths),

        "Bwd Pkt Len Mean": safe_mean(bwd_lengths),
        "Bwd Pkt Len Std": safe_std(bwd_lengths),
        "Bwd Pkt Len Max": safe_max(bwd_lengths),
        "Bwd Pkt Len Min": safe_min(bwd_lengths),

        "SYN Flag Cnt": syn,
        "ACK Flag Cnt": ack,
        "FIN Flag Cnt": fin,
        "RST Flag Cnt": rst,
        "PSH Flag Cnt": psh,
        "URG Flag Cnt": urg,
        "ECE Flag Cnt": ece,
        "CWR Flag Cnt": cwr,

        "Init Fwd Win Byts": init_fwd_win,
        "Init Bwd Win Byts": init_bwd_win,

        "Active Mean": safe_mean(active_times),
        "Active Std": safe_std(active_times),
        "Active Max": safe_max(active_times),
        "Active Min": safe_min(active_times),

        "Idle Mean": safe_mean(idle_times),
        "Idle Std": safe_std(idle_times),
        "Idle Max": safe_max(idle_times),
        "Idle Min": safe_min(idle_times),

        "Fwd Bytes/Bulk": fwd_bulk_bytes,
        "Fwd Pkts/Bulk": fwd_bulk_pkts,
        "Bwd Bytes/Bulk": bwd_bulk_bytes,
        "Bwd Pkts/Bulk": bwd_bulk_pkts,

        "Subflow Fwd Pkts": subflow_fwd_pkts,
        "Subflow Bwd Pkts": subflow_bwd_pkts,
        "Subflow Fwd Byts": subflow_fwd_bytes,
        "Subflow Bwd Byts": subflow_bwd_bytes,

        "Label": "unknown",
        "detailed_label": "unknown",
        "parent_label": "unknown"
    }

    return features


# -------------------------------
# Capture traffic
# -------------------------------
def capture_and_save_csv(duration=60, output_file="traffic_features.csv"):

    interface = "Wi-Fi"

    print("Capturing packets...")

    flows.clear()

    sniff(
        iface=interface,
        prn=add_packet,
        store=False,
        timeout=duration
    )

    print("Flows captured:", len(flows))

    flow_features = []

    for pkts in flows.values():

        if len(pkts) > 1:
            flow_features.append(compute_flow_features(pkts))

    df = pd.DataFrame(flow_features)

    df.to_csv(output_file, index=False)

    print("CSV saved:", output_file)

    return output_file


# -------------------------------
# Thread for Django
# -------------------------------
def run_capture_in_thread(duration=60, output_file="traffic_features.csv"):

    thread = threading.Thread(
        target=capture_and_save_csv,
        args=(duration, output_file)
    )

    thread.start()

    return thread


# -------------------------------
# Standalone test
# -------------------------------
if __name__ == "__main__":
    capture_and_save_csv()