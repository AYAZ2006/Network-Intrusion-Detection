import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Radio, AlertTriangle, CheckCircle } from "lucide-react";
import axios from "axios";
import {toast} from "react-toastify";
const MonitoringPanel = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [detection, setDetection] = useState(null);

  useEffect(() => {
  if (!isMonitoring) return;

  const fetchResults = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/test-model/");
      const data = res.data;

      const now = new Date().toLocaleTimeString("en-US", { hour12: false });

      const results = data.results;
      const total = data.total_flows;

      // 👉 Remove benign from attack calculation
      const attackEntries = Object.entries(results).filter(
        ([key]) => key !== "Benign"
      );

      // ✅ CASE 1: No attack
      if (attackEntries.length === 0) {
        setDetection({
          id: Date.now(),
          type: "benign",
          timestamp: now,
        });
        return;
      }

      // ✅ CASE 2: Attack exists
      // pick highest attack
      let topAttack = attackEntries[0];
      attackEntries.forEach((entry) => {
        if (entry[1] > topAttack[1]) {
          topAttack = entry;
        }
      });

      const [attackType, count] = topAttack;

      const percentage = ((count / total) * 100).toFixed(2);

      setDetection({
        id: Date.now(),
        type: "attack",
        attackType: attackType,
        severity: `${percentage}%`,
        sourceIP: "192.168.x.x", // optional (you can improve later)
        timestamp: now,
      });

    } catch (err) {
  console.error("Error fetching model:", err);

  const now = new Date().toLocaleTimeString("en-US", { hour12: false });

  // 👉 If CSV not found OR backend error → treat as no threat
  if (
    err.response &&
    err.response.data &&
    typeof err.response.data === "string" &&
    err.response.data.includes("No such file or directory")
  ) {
    setDetection({
      id: Date.now(),
      type: "benign",
      timestamp: now,
    });
    return;
  }

  // 👉 fallback (any error → still show safe state)
  setDetection({
    id: Date.now(),
    type: "benign",
    timestamp: now,
  });
}
  };

  fetchResults(); // initial call

  const interval = setInterval(fetchResults, 10000); // every 10 sec

  return () => clearInterval(interval);
}, [isMonitoring]);

  const startMonitoringAPI = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/capture/",{action: "start_monitoring",});
      toast.success("Capture started:", response.data);
    } catch (error) {
      toast.error("Error starting monitoring:");
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-[#E0E6EB]">Monitoring Control Panel</h2>
          <p className="text-muted-foreground text-sm text-[#7B899D]">Start real-time traffic analysis and threat detection</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 text-center border border-white/10 relative overflow-hidden rounded-xl bg-[#0D1013] backdrop-blur-xl" style={isMonitoring ? { boxShadow: "0 0 30px hsl(142 70% 49% / 0.1)" } : {}}>          {isMonitoring && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-64 w-64 rounded-full border border-primary/10 pulse-ring" />
              <div className="absolute h-48 w-48 rounded-full border border-primary/5 pulse-ring" style={{ animationDelay: "0.5s" }}/>
              <div className="absolute h-32 w-32 rounded-full border border-primary/5 pulse-ring" style={{ animationDelay: "1s" }}/>
            </div>
          )}
          <div className="relative z-10">
          <button onClick={() => {
  const next = !isMonitoring;
  setIsMonitoring(next);

  if (next) {
    startMonitoringAPI();
  } else {
    setDetection(null);
  }
}} className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 ${isMonitoring ? "bg-red-900 text-red-300 border border-[#801E1F] hover:bg-[#3B1618] glow-red" : "bg-[#1f6b3d] text-white border border-[#19753C] hover:bg-[#144B2B] glow-green"}`}>              {isMonitoring ? (
                <>
                  <Square className="h-5 w-5 text-[#EE2B2B]" /><span className="text-white"> Stop Monitoring</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 text-[#25D265]" /><span className="text-white">Start Monitoring</span>
                </>
              )}
            </button>
            {isMonitoring && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center justify-center gap-2 text-primary text-sm font-mono">
                <Radio className="h-4 w-4 animate-glow-pulse text-[#26D466]" /><span className="text-[#26D466]">Scanning network traffic...</span>
              </motion.div>
            )}
          </div>
          <AnimatePresence mode="wait">
            {detection && (
              <motion.div key={detection.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`mt-8 p-5 rounded-lg border text-left ${ detection.type === "attack" ? "bg-[#3B1618] border-red-900 glow-red" : "bg-[#10241B] border-[#26D466] glow-green"}`}>
                {detection.type === "attack" ? (
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-red-900 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-white text-glow-red">THREAT DETECTED</p>
                      <p className="text-sm text-white text-foreground">Attack Type:{" "}
                        <span className="font-mono text-white">{detection.attackType}</span>
                      </p>
                      <p className="text-sm text-white text-foreground">Severity:{" "}
                        <span className="font-mono text-white">{detection.severity}</span>
                      </p>
                      <p className="text-sm text-white text-foreground">Source IP:{" "}
                        <span className="font-mono text-white">{detection.sourceIP}</span>
                      </p>
                      <p className="text-xs text-white text-muted-foreground font-mono">{detection.timestamp}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-6 w-6 text-[#26D466] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#26D466]">Traffic Normal</p>
                      <p className="text-sm text-white/40 text-muted-foreground font-mono">{detection.timestamp} — No threats detected</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MonitoringPanel;