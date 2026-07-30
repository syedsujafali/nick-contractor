import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Lightweight floating particle field rendered with absolutely positioned
 * divs. Count stays modest for performance. Respects reduced-motion via CSS.
 */
export default function Particles({
  count = 22,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 3 + 1.5;
        return {
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size,
          delay: Math.random() * 6,
          duration: Math.random() * 8 + 8,
          drift: (Math.random() - 0.5) * 40,
          gold: Math.random() > 0.6,
        };
      }),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.gold
              ? "rgba(212,175,55,0.8)"
              : "rgba(247,247,247,0.55)",
            boxShadow: d.gold
              ? "0 0 8px 1px rgba(212,175,55,0.6)"
              : "0 0 6px 1px rgba(247,247,247,0.35)",
          }}
          animate={{
            y: [0, -36, 0],
            x: [0, d.drift, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
