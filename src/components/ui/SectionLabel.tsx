import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

/** Small uppercase gold eyebrow label with a leading rule. */
export default function SectionLabel({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
      <span className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">
        {children}
      </span>
      {align === "center" && (
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
      )}
    </motion.div>
  );
}
