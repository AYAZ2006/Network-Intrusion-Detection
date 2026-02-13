import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div onClick={scrollToTop} style={{position: "fixed",right: 28,bottom: 28,zIndex: 999,opacity: visible ? 1 : 0,transform: visible ? "scale(1)" : "scale(0.7)",transition: "all 0.4s cubic-bezier(.22,1,.36,1)",pointerEvents: visible ? "auto" : "none",cursor: "pointer",}}>
      <div style={{width: 64,height: 64,borderRadius: "50%",display: "flex",alignItems: "center",justifyContent: "center",gap: 4,background: "rgba(255,255,255,0.06)",backdropFilter: "blur(14px)",boxShadow:"0 10px 30px rgba(0,0,0,0.35), inset 0 0 20px rgba(255,255,255,0.04)",transition: "all 0.25s ease",}} onMouseEnter={e => {e.currentTarget.style.transform = "scale(1.12) rotate(6deg)";e.currentTarget.style.boxShadow ="0 14px 40px rgba(0,255,170,0.25)";}} onMouseLeave={e => {e.currentTarget.style.transform = "scale(1) rotate(0deg)";e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35), inset 0 0 20px rgba(255,255,255,0.04)";}}>
        <ArrowUp size={30} color="white" />
      </div>
    </div>
  );
}
