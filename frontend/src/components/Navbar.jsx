import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
const navItems = ["Dashboard", "Reports", "Logs", "Settings"];
const Navbar = ({onLogsClick,onReportsClick}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = true;
  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/20 border-x-0 rounded-none bg-[#0D1013] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-[#26D466]" />
              <div className="absolute inset-0 text-[#26D466] blur-sm opacity-50"><Shield className="h-8 w-8 bg-[#26D466]" /></div>
            </div>
            <span className="font-semibold text-foreground text-sm sm:text-base tracking-wide text-[#E0E6EB]">Network Intrusion Detection System</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item} href="#" onClick={(e) => {if (item === "Logs") {e.preventDefault();onLogsClick?.();} if (item === "Reports") {e.preventDefault();onReportsClick?.();}}} className="text-white/60 hover:text-[#26D466] transition-colors text-sm font-medium">{item}</a>
            ))}
            <div className="flex items-center gap-2 glass-panel px-3 py-1.5 glow-green rounded-sm">
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-[#26D466]" />
                <div className="absolute inset-0 h-2 w-2 rounded-full bg-[#26D466] animate-ping opacity-75" />
              </div>
              <span className="text-xs font-mono text-[#26D466]">{isActive ? "MONITORING ACTIVE" : "MONITORING STOPPED"}</span>
            </div>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6 text-[#E0E6EB]" /> : <Menu className="h-6 w-6 text-[#E0E6EB]" />}
          </button>
        </div>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <a key={item} href="#" className="block text-[#E0E6EB] hover:text-[#26D466] transition-colors text-sm py-2">{item}</a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;