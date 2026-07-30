import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

type Variant = "primary" | "gold" | "ghost";

type Props = Omit<HTMLMotionProps<"button">, "children" | "className"> & {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand-red to-brand-red-soft text-white shadow-[0_10px_40px_-10px_rgba(163,22,33,0.7)] hover:shadow-[0_14px_50px_-8px_rgba(163,22,33,0.85)]",
  gold:
    "bg-gradient-to-r from-gold to-gold-soft text-ink shadow-[0_10px_40px_-12px_rgba(212,175,55,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(212,175,55,0.8)]",
  ghost:
    "glass text-offwhite border border-white/20 hover:border-gold/60 hover:text-gold",
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: Props) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {/* Animated sheen sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
