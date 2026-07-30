import { useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "./Particles";

const WORD_TOP = "NOTEAROFF".split("");
const WORD_BOTTOM = "ROOFING".split("");

function Letter({
  char,
  variant,
}: {
  char: string;
  variant: "top" | "bottom";
}) {
  return (
    <motion.span
      className="inline-block"
      variants={{
        hidden: { opacity: 0, y: 46, filter: "blur(12px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      <span className={variant === "top" ? "text-platinum" : "text-gold-metallic"}>
        {char}
      </span>
    </motion.span>
  );
}

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2700);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(18px)", scale: 1.06 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[80px]" />
      </div>

      <Particles count={26} className="opacity-70" />

      {/* Wordmark */}
      <motion.div
        className="relative z-10 text-center font-display font-semibold leading-none tracking-[0.12em]"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
        }}
      >
        <div className="flex justify-center text-4xl sm:text-6xl md:text-7xl">
          {WORD_TOP.map((c, i) => (
            <Letter key={`t-${i}`} char={c} variant="top" />
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="mx-auto mt-5 mb-5 h-px origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
          style={{ width: "70%" }}
        />

        <motion.div
          className="flex justify-center text-base font-sans font-light tracking-[0.7em] sm:text-xl"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04, delayChildren: 1 } },
          }}
        >
          {WORD_BOTTOM.map((c, i) => (
            <Letter key={`b-${i}`} char={c} variant="bottom" />
          ))}
        </motion.div>
      </motion.div>

      {/* Loading line */}
      <div className="absolute bottom-16 h-px w-44 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-gold to-brand-red"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
