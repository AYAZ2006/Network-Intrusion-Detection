import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { forwardRef } from "react";
const attackMessages = [
  "Port scan attempt detected from 192.168.1.45",
  "DDoS attack detected — source: 10.0.0.87",
  "SQL injection attempt blocked on port 3306",
  "Brute force login detected — 5 failed attempts",
  "Suspicious outbound traffic to 203.45.67.89",
  "Man-in-the-Middle attack detected on subnet",
];

const benignMessages = [
  "Benign traffic detected — normal HTTP request",
  "DNS query resolved successfully",
  "Routine heartbeat check passed",
  "SSL handshake completed — secure connection",
  "Standard FTP transfer in progress",
];

const infoMessages = [
  "System scan completed — no anomalies",
  "Firewall rules updated successfully",
  "Database backup completed",
  "Model retrained with latest threat data",
];

const LiveFeed = forwardRef((props, ref) => {
  const [logs, setLogs] = useState([]);
  const scrollRef = useRef(null);
  useEffect(() => {
    const initial = [];
    for (let i = 0; i < 8; i++) {
      const type = Math.random() > 0.6 ? "attack" : Math.random() > 0.3 ? "benign": "info";
      const messages = type === "attack" ? attackMessages : type === "benign" ? benignMessages : infoMessages;
      const d = new Date(Date.now() - (8 - i) * 5000);
      initial.push({id: i,time: d.toLocaleTimeString("en-US", { hour12: false }),message: messages[Math.floor(Math.random() * messages.length)],type,});}
    setLogs(initial);
    const interval = setInterval(() => {
      const type = Math.random() > 0.6 ? "attack" : Math.random() > 0.3 ? "benign" : "info";
      const messages = type === "attack" ? attackMessages : type === "benign" ? benignMessages : infoMessages;
      const entry = {id: Date.now(),time: new Date().toLocaleTimeString("en-US", { hour12: false }),message: messages[Math.floor(Math.random() * messages.length)],type,};
      setLogs((prev) => [...prev.slice(-50), entry]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const typeColor = (type) => {
    if (type === "attack") return "text-[#C12727] text-glow-red";
    if (type === "benign") return "text-[#21AF56] text-glow-green";
    return "text-[#00EAFF] text-glow-blue";
  };

  return (
    <section id="live-feed" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-[#E0E6EB]">Live Detection Feed</h2>
          <p className="text-muted-foreground text-sm text-[#56606F]">Real-time event stream from network sensors</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#121519]">
            <Terminal className="h-4 w-4 text-[#26D466]" />
            <span className="text-xs font-mono text-[#7B889C]">nids-sensor-01 — live feed</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#C12727]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#CFB219]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#21AF56]" />
            </div>
          </div>
          <div ref={scrollRef} className="h-72 overflow-y-auto p-4 font-mono text-xs space-y-1 scroll-smooth bg-[#0D1013] border-l border-b border-white/10">
            {logs.map((log) => (
              <motion.div key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2">
                <span className="text-[#56606F] flex-shrink-0">[{log.time}]</span>
                <span className={typeColor(log.type)}>{log.message}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default LiveFeed;