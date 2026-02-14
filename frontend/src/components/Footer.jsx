import { Shield, Github, Mail, MessageSquare , MailWarning  } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-12 px-4 bg-[#080A0C]/80 backdrop-blur-xl">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 scan-line pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row justify-between gap-10">
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">Developers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-10 gap-y-3">
              {DEVELOPERS.map((dev, idx) => (
                <div key={idx} className="flex flex-col">
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-[#26D466] transition">{dev.name}</a>
                  <span className="text-white/50 text-sm italic">{dev.role}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="min-w-[180px]">
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">Support</h3>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a className="flex items-center gap-2 hover:text-[#26D466] transition cursor-pointer"><MailWarning className="w-4 h-4" />Report an Issue</a>
              <a className="flex items-center gap-2 hover:text-[#26D466] transition cursor-pointer"><MessageSquare className="w-4 h-4" />Contact Us</a>
            </div>
          </div>
        </motion.div>
        <div className="my-10 h-[1px] bg-gradient-to-r from-transparent via-[#26D466]/40 to-transparent" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-[#26D466] drop-shadow-[0_0_8px_rgba(38,212,102,0.7)]" />
            <span className="text-sm text-[#7B899D] font-medium">Network Intrusion Detection System</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/AYAZ2006/Network-Intrusion-Detection" className="text-[#7B899D] hover:text-[#26D466] transition cursor-pointer"><Github className="h-4 w-4" /></a>
            <a className="text-[#7B899D] hover:text-[#26D466] transition cursor-pointer"><Mail className="h-4 w-4" /></a>
            <a className="text-xs text-[#7B899D] hover:text-[#26D466] transition cursor-pointer">Documentation</a>
          </div>
          <p className="text-xs text-[#7B899D] font-mono">© {new Date().getFullYear()} NIDS. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
