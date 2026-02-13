import { useEffect, useRef } from "react";
export default function CyberBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    const nodes = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));
    function draw() {
      ctx.fillStyle = "#07090c";
      ctx.fillRect(0, 0, width, height);
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0,255,150,${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.fillStyle = "#25D466";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      if (Math.random() < 0.02) {
        const pulseX = Math.random() * width;
        const pulseY = Math.random() * height;
        ctx.strokeStyle = "rgba(255,0,0,0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 20, 0, Math.PI * 2);
        ctx.stroke();
      }
      requestAnimationFrame(draw);
    }
    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas ref={canvasRef} style={{position: "absolute",top: 0,left: 0,width: "100%",height: "100%",zIndex: 0}}/>
    );
}
