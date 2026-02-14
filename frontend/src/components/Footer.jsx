import { useState } from "react";
import {Shield,Github,Mail,MessageSquare,MailWarning,X,AlertTriangle,Send,Bug,FileText,Activity,ArrowLeft} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const DEVELOPERS = [
  {
    name: "Mohammed Ayaz Mohiuddin",
    role: "Full Stack Developer",
    linkedin: "https://www.linkedin.com/in/mohammed-ayaz-38ba06289",
  },
  {
    name: "Mahanth Goutham",
    role: "Full Stack Developer",
    linkedin: "https://www.linkedin.com/in/mahanth-goutham-8ba31a297/",
  },
  {
    name: "Amara Vishnu Saran",
    role: "Full Stack Developer",
    linkedin: "https://www.linkedin.com/in/amara-vishnu-saran/",
  },
  {
    name: "Arkala Aditya",
    role: "Full Stack Developer",
    linkedin: "https://www.linkedin.com/in/arkala-aditya-raj-46717b300/",
  }
];

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [ropen,setROpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}/>
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 40 }} transition={{ duration: 0.3 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md bg-[#0b1220] border border-[#26D466]/30 rounded-2xl shadow-[0_0_40px_#26D46633] p-8 z-50 overflow-hidden">
              {[...Array(18)].map((_, i) => {
                const size = Math.random() * 4 + 2;
                return (
                  <motion.span key={i} initial={{x: Math.random() * 400 - 200,y: Math.random() * 300 - 150,opacity: 0,}} animate={{x: Math.random() * 400 - 200,y: Math.random() * 300 - 150,opacity: [0, 1, 0],}} transition={{duration: Math.random() * 6 + 6,repeat: Infinity,ease: "easeInOut",delay: Math.random() * 5,}} style={{ width: size, height: size }} className="absolute rounded-full bg-[#26D466] blur-[2px] pointer-events-none"/>
                );
              })}
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-white/60 hover:text-white cursor-pointer"><X size={18} /></button>
              <h2 className="text-white text-xl font-semibold mb-6 text-center">Contact Us</h2>
              <form className="flex flex-col gap-4">
                <input placeholder="Your Name" className="bg-[#060b18] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#26D466]" required/>
                <input placeholder="Email Address" className="bg-[#060b18] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#26D466]" required/>
                <textarea rows={4} placeholder="Your Message..." className="bg-[#060b18] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#26D466]" required/>
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 bg-[#25D466] text-black font-semibold rounded-lg hover:scale-105 transition-transform cursor-pointer"><Send className="h-5 w-5" />Send Message</button>
              </form>
            </motion.div>
          </>
        )}
        {ropen && (
          <>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}/>
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 40 }} transition={{ duration: 0.3 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md bg-[#0b1220] border border-[#26D466]/30 rounded-2xl shadow-[0_0_40px_#26D46633] p-8 z-50 overflow-hidden">
              {[...Array(18)].map((_, i) => {
                const size = Math.random() * 4 + 2;
                return (
                  <motion.span key={i} initial={{x: Math.random() * 400 - 200,y: Math.random() * 300 - 150,opacity: 0,}} animate={{x: Math.random() * 400 - 200,y: Math.random() * 300 - 150,opacity: [0, 1, 0],}} transition={{duration: Math.random() * 6 + 6,repeat: Infinity,ease: "easeInOut",delay: Math.random() * 5,}} style={{ width: size, height: size }} className="absolute rounded-full bg-[#26D466] blur-[2px] pointer-events-none"/>
                );
              })}
              <button onClick={() => setROpen(false)} className="absolute right-4 top-4 text-white/60 hover:text-white cursor-pointer"><X size={18} /></button>
              <div className="text-center mb-8">
                  <div className="flex justify-center mb-3"><Bug className="w-12 h-12 text-[#26D466]" /></div>
                  <h2 className="text-3xl font-bold text-white">Report an Issue</h2>
                  <p className="text-gray-400 mt-2 text-sm">Found a bug? Let us know so we can fix it.</p>
              </div>
              <form className="flex flex-col gap-4">
                <div className="relative">
                  <AlertTriangle className="absolute left-3 top-3.5 h-5 w-5 text-red-600" />
                  <input type="text" placeholder="Issue Summary" required className="w-full border bg-[#060b18] border-white/10 rounded-xl py-3 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-[#26D466] transition"/>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                      <Activity className="absolute left-3 top-3.5 h-5 w-5 text-[#FFD700]/60" />
                      <select className="w-full bg-[#060b18] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-gray-200 focus:outline-none transition appearance-none cursor-pointer">
                        <option value="low">Severity: Low</option>
                        <option value="medium">Severity: Medium</option>
                        <option value="high">Severity: High</option>
                        <option value="critical">Severity: Critical</option>
                      </select>
                    </div>
                </div>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 h-5 w-5 text-green-500" />
                  <textarea placeholder="Describe the issue in detail..." required rows="5" className="w-full bg-[#060b18] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-[#26D466] transition resize-none"></textarea>
                </div>
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 bg-[#25D466] text-black font-semibold rounded-lg hover:scale-105 transition-transform cursor-pointer"><Send className="h-5 w-5" />Submit Report</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <footer className="relative overflow-hidden border-t border-white/10 py-12 px-4 bg-[#080A0C]/80 backdrop-blur-xl">
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div>
              <h2 className="text-white font-semibold text-lg mb-4">Developers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-10 gap-y-3">
                {DEVELOPERS.map((dev, idx) => (
                  <div key={idx} className="flex flex-col">
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-[#26D466]">{dev.name}</a>
                    <span className="text-white/50 text-sm italic">{dev.role}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-[180px]">
              <h3 className="text-white font-semibold text-sm mb-4">Support</h3>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <button onClick={() => setROpen(true)} className="flex items-center gap-2 hover:text-[#26D466] cursor-pointer"><MailWarning className="w-4 h-4" />Report an Issue</button>
                <button onClick={() => setOpen(true)} className="flex items-center gap-2 hover:text-[#26D466] text-left cursor-pointer"><MessageSquare className="w-4 h-4" />Contact Us</button>
              </div>
            </div>
          </div>
          <div className="my-10 h-[1px] bg-gradient-to-r from-transparent via-[#26D466]/40 to-transparent" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-[#26D466]" />
              <span className="text-sm text-[#7B899D]">Network Intrusion Detection System</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://github.com/AYAZ2006/Network-Intrusion-Detection" className="text-[#7B899D] hover:text-[#26D466]"><Github className="h-4 w-4" /></a>
              <Mail className="h-4 w-4 text-[#7B899D] hover:text-[#26D466]" />
              <span className="text-xs text-[#7B899D]">Documentation</span>
            </div>
            <p className="text-xs text-[#7B899D] font-mono">© {new Date().getFullYear()} NIDS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
