import { Shield, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-4 bg-[#080A0C] border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-[#26D466]" />
          <span className="text-sm text-[#7B899D] font-medium">Network Intrusion Detection System</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[#7B899D] hover:text-primary transition-colors"><Github className="h-4 w-4" /></a>
          <a href="#" className="text-[#7B899D] hover:text-primary transition-colors"><Mail className="h-4 w-4" /></a>
          <a href="#" className="text-xs text-[#7B899D] hover:text-primary transition-colors">Documentation</a>
        </div>
        <p className="text-xs text-[#7B899D]">© {new Date().getFullYear()} NIDS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;