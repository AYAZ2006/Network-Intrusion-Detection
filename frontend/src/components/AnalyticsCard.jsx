import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {Activity,ShieldAlert,ShieldCheck,ShieldX,Target,Wifi,} from "lucide-react";
const colorMap = {
  green: { text: "text-neon-green", glow: "glow-green", bg: "bg-primary/10" },
  blue: { text: "text-neon-blue", glow: "glow-blue", bg: "bg-secondary/10" },
  red: { text: "text-neon-red", glow: "glow-red", bg: "bg-destructive/10" },
  cyan: { text: "text-neon-cyan", glow: "glow-green", bg: "bg-primary/10" },
  yellow: { text: "text-neon-yellow", glow: "glow-green", bg: "bg-primary/10" },
};

const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>{count.toLocaleString()}{suffix}</span>
  );
};

const metrics = [
  {
    label: "Total Traffic Analyzed",
    value: 1248573,
    icon: <Activity className="h-5 w-5 text-[#1A8CFF]" />,
    iconColor: "text-[#1A8CFF]",
    iconBg: "bg-[#0F1D2B]",
    valueColor: "text-[#1A8CFF]",
    cardGlow: "glow-blue",
  },
  {
    label: "Attacks Detected",
    value: 2847,
    icon: <ShieldAlert className="h-5 w-5" />,
    iconColor: "text-[#EE2B2B]",
    iconBg: "bg-[#241315]",
    valueColor: "text-[#EE2B2B]",
    cardGlow: "glow-red",
  },
  {
    label: "Correctly Detected",
    value: 2791,
    icon: <ShieldCheck className="h-5 w-5" />,
    iconColor: "text-[#25D466]",
    iconBg: "bg-[#10241B]",
    valueColor: "text-[#25D466]",
    cardGlow: "glow-green",
  },
  {
    label: "Incorrect Predictions",
    value: 56,
    icon: <ShieldX className="h-5 w-5" />,
    iconColor: "text-[#FFD91A]",
    iconBg: "bg-[#10241C]",
    valueColor: "text-[#FFD91A]",
    cardGlow: "glow-green",
  },
  {
    label: "Detection Accuracy",
    value: 98.03,
    suffix: "%",
    icon: <Target className="h-5 w-5" />,
    iconColor: "text-[#00EAFF]",
    iconBg: "bg-[#10241B]",
    valueColor: "text-[#00EAFF]",
    cardGlow: "glow-green",
  },
  {
    label: "Active Connections",
    value: 342,
    icon: <Wifi className="h-5 w-5" />,
    iconColor: "text-[#1A8CFF]",
    iconBg: "bg-[#0F1D2B]",
    valueColor: "text-[#1A8CFF]",
    cardGlow: "glow-blue",
  },
];

const AnalyticsCards = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E0E6EB] text-foreground mb-2">Analytics Overview</h2>
          <p className="text-muted-foreground text-sm text-[#7B899D]">Real-time detection performance metrics</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#0D1013]">
          {metrics.map((metric, i) => (
          <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`glass-panel p-6 ${metric.cardGlow} hover:scale-[1.02] transition-transform border border-white/20 duration-300`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-md ${metric.iconBg} ${metric.iconColor}`}>{metric.icon}</div>
              <span className="text-sm text-[#7B899D]">{metric.label}</span>
            </div>
            <p className={`text-3xl font-bold font-mono ${metric.valueColor}`}>
              <AnimatedCounter target={metric.value} suffix={metric.suffix} />
            </p>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsCards;