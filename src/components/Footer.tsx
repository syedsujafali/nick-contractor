import { motion } from "framer-motion";
import { COMPANY } from "@/data/site";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#040406] px-4 py-16 sm:px-8 overflow-hidden border-t border-white/5">
      {/* Desktop-only Colorful Animated Background */}
      <div className="hidden lg:block absolute inset-0 opacity-50 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] left-[20%] w-[40%] h-[150%] bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_50%)] will-change-transform transform-gpu" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-[10%] right-[10%] w-[30%] h-[100%] bg-[radial-gradient(circle,rgba(245,158,11,0.1)_0%,transparent_50%)] will-change-transform transform-gpu" 
        />
      </div>

      <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="flex flex-col items-center gap-4 mb-10"
        >
          <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.2)] border border-white/20 group hover:border-white/40 transition-colors">
            <img src="/logo.png" alt="Nick Contractor Logo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-black tracking-widest uppercase text-white drop-shadow-md">
            {COMPANY.name.split(" ")[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-white to-yellow-600">{COMPANY.name.split(" ").slice(1).join(" ")}</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-sm md:text-base font-medium text-white/60 mb-10"
        >
          <a href={COMPANY.phoneHref} className="flex items-center gap-2 hover:text-amber-400 transition-colors group">
            <FiPhone className="h-4 w-4 text-white/40 group-hover:text-amber-400 transition-colors" />
            <span className="tracking-widest">{COMPANY.phone}</span>
          </a>
          <span className="hidden sm:block text-white/20">•</span>
          <a href={COMPANY.emailHref} className="flex items-center gap-2 hover:text-amber-400 transition-colors group">
            <FiMail className="h-4 w-4 text-white/40 group-hover:text-amber-400 transition-colors" />
            <span className="tracking-widest">{COMPANY.email}</span>
          </a>
          <span className="hidden sm:block text-white/20">•</span>
          <div className="flex items-center gap-2">
            <FiMapPin className="h-4 w-4 text-white/40" />
            <span className="tracking-widest text-center sm:text-left">{COMPANY.address}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8 origin-center"
        />

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-[10px] md:text-xs text-white/40 font-bold tracking-[0.2em] uppercase"
        >
          © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
