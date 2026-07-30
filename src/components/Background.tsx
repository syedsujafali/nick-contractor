import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate random particles with colors
  const colors = ["bg-neon-cyan", "bg-neon-pink", "bg-neon-purple", "bg-white", "bg-white"];
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  // Generate random lines
  const lines = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030305]">
      {/* Deep colorful animated mesh gradients */}
      <motion.div 
        animate={{ x: ["0%", "5%", "0%"], y: ["0%", "10%", "0%"], scale: [1, 1.1, 1] }} 
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_50%)] will-change-transform transform-gpu" 
      />
      <motion.div 
        animate={{ x: ["0%", "-10%", "0%"], y: ["0%", "-5%", "0%"], scale: [1, 1.2, 1] }} 
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_50%)] will-change-transform transform-gpu" 
      />
      <motion.div 
        animate={{ x: ["0%", "15%", "0%"], y: ["0%", "-15%", "0%"], scale: [1, 1.1, 1] }} 
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-[20%] right-[20%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(236,72,153,0.1)_0%,transparent_50%)] will-change-transform transform-gpu" 
      />
      <motion.div 
        animate={{ x: ["0%", "-20%", "0%"], y: ["0%", "20%", "0%"], scale: [1, 1.3, 1] }} 
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] left-[20%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_50%)] will-change-transform transform-gpu" 
      />
      <motion.div 
        animate={{ x: ["0%", "10%", "0%"], y: ["0%", "10%", "0%"], scale: [1, 1.2, 1] }} 
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_50%)] will-change-transform transform-gpu" 
      />

      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)]" />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color} shadow-[0_0_10px_rgba(255,255,255,0.3)] will-change-transform transform-gpu`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: ["-20vh", "20vh"],
            x: ["-10vw", "10vw"],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Glowing vertical lines */}
      {lines.map((l) => (
        <motion.div
          key={`line-${l.id}`}
          className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-neon-cyan/40 to-transparent will-change-transform transform-gpu"
          style={{ left: `${l.x}%` }}
          animate={{
            opacity: [0, 1, 0],
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: l.duration,
            repeat: Infinity,
            delay: l.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
