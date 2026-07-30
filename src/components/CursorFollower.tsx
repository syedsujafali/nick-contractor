import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Soft dual-ring cursor follower. Disabled on touch / coarse pointers.
 * The outer ring lags slightly behind the inner dot for a premium feel.
 */
export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
    } else {
      return;
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest("a, button, [role='button'], input, textarea, label")
      );
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true">
      {/* Outer lagging ring */}
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-gold/60"
        style={{
          translateX: ringX,
          translateY: ringY,
          width: 38,
          height: 38,
          marginLeft: -19,
          marginTop: -19,
        }}
        animate={{
          scale: hovering ? 1.7 : 1,
          opacity: hovering ? 1 : 0.55,
          borderColor: hovering
            ? "rgba(212,175,55,0.9)"
            : "rgba(212,175,55,0.4)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
      />
      {/* Inner precise dot */}
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-gold"
        style={{
          translateX: x,
          translateY: y,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
        }}
        animate={{ scale: hovering ? 0.4 : 1 }}
      />
    </div>
  );
}
