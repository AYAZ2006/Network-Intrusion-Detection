import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Radio, AlertTriangle, CheckCircle } from "lucide-react";
const attackTypes = [
  "DDoS Attack",
  "Port Scan",
  "SQL Injection",
  "Brute Force",
  "Man-in-the-Middle",
];

const severities = ["Low", "Medium", "High", "Critical"];
const randomIP = () =>
  `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
const MonitoringPanel = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [detection, setDetection] = useState(null);

  useEffect(() => {
    if (!isMonitoring) return;
    const interval = setInterval(() => {
      const isAttack = Math.random() > 0.6;
      const now = new Date();
      const ts = now.toLocaleTimeString("en-US", { hour12: false });
      if (isAttack) {
        setDetection({id: Date.now(),type: "attack",attackType: attackTypes[Math.floor(Math.random() * attackTypes.length)],severity: severities[Math.floor(Math.random() * severities.length)],sourceIP: randomIP(),timestamp: ts,});
      } else {
        setDetection({id: Date.now(),type: "benign",timestamp: ts,});
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isMonitoring]);

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
          <button onClick={() => {const next = !isMonitoring;setIsMonitoring(next);if (!next) setDetection(null); }} className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 ${isMonitoring ? "bg-red-900 text-red-300 border border-[#801E1F] hover:bg-[#3B1618] glow-red" : "bg-[#1f6b3d] text-white border border-[#19753C] hover:bg-[#144B2B] glow-green"}`}>              {isMonitoring ? (
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