import { motion } from "framer-motion";
import { Shield, Zap } from "lucide-react";
import CyberBackground from "./CyberBackground";
const NetworkBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-30" />
    <div className="absolute inset-0 scan-line pointer-events-none" />
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div key={i} className="absolute h-1 w-1 rounded-full bg-primary/40" style={{left: `${10 + Math.random() * 80}%`,top: `${10 + Math.random() * 80}%`,}} animate={{opacity: [0.2, 0.8, 0.2],scale: [1, 1.5, 1],}} transition={{duration: 3 + Math.random() * 2,repeat: Infinity,delay: Math.random() * 2,}}/>
    ))}
    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <NetworkBackground />
      <CyberBackground />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-8 glow-green bg-[#0D1013] rounded-xl border border-white/10">
            <Zap className="h-4 w-4 text-[#25D265]" />
            <span className="text-xs font-mono text-[#25D265] tracking-wider">AI-POWERED DEFENSE SYSTEM</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-[#E0E6EB]">Real-Time Network{" "}
            <span className="text-[#25D466] text-glow-green">Threat Monitoring</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-[#7B899D]"> Advanced ML-driven intrusion detection system that analyzes live network traffic, identifies threats in milliseconds, and provides comprehensive security analytics.</p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center justify-center gap-3">
            <Shield className="h-5 w-5 text-[#25D466]" />
            <span className="text-sm font-mono text-[#25D466]">SYSTEM ONLINE — ALL SENSORS ACTIVE</span>
            <div className="h-2 w-2 rounded-full bg-[#26D466] animate-ping opacity-75" />
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 mb-16">
          <div>
            <p className="text-3xl font-bold text-[#25D466]">99.98%</p>
            <p className="text-sm text-[#7B899D]">Detection Accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#25D466]">2ms</p>
            <p className="text-sm text-[#7B899D]">Response Time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#25D466]">24/7</p>
            <p className="text-sm text-[#7B899D]">Live Monitoring</p>
          </div>
      </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;