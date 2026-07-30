import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { SERVICES, Service } from "@/data/site";
import { FiArrowRight } from "react-icons/fi";

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, type: "spring", bounce: 0.3 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-[#08080a]/80 backdrop-blur-sm p-8 md:p-10 transition-colors duration-500 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      {/* Accent Glow specific to this card */}
      <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br ${service.accent} opacity-0 blur-[80px] group-hover:opacity-[0.2] transition-opacity duration-700 pointer-events-none`} />

      <div className="relative z-10">
        <div className="mb-8 flex items-center justify-end md:justify-between">
          <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/10 shadow-inner overflow-hidden relative group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 ease-out">
            <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-10 mix-blend-overlay`} />
            <service.icon className="relative z-10 h-7 w-7 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,1)] transition-all" />
          </div>
          <span className="font-display text-5xl font-black text-white/[0.05] group-hover:text-white/20 group-hover:-translate-y-2 transition-all duration-500">
            0{index + 1}
          </span>
        </div>
        
        <h3 className="mb-4 font-display text-3xl font-bold text-white tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300 drop-shadow-sm">
          {service.title}
        </h3>
        <p className="text-white/50 leading-relaxed text-base font-medium max-w-sm group-hover:text-white/80 transition-colors duration-500">
          {service.description}
        </p>
      </div>

      <div className="relative z-10 mt-12 pt-6 border-t border-white/5 flex items-center justify-between group-hover:border-white/20 transition-colors duration-500">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-neon-cyan transition-colors duration-500 drop-shadow-sm">
          Learn More
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.02] border border-white/10 group-hover:bg-neon-cyan group-hover:border-neon-cyan group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,102,255,0.6)] transition-all duration-500">
          <FiArrowRight className="h-4 w-4 text-white/50 group-hover:text-[#0a0a0f] transition-colors duration-500 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesSection() {
  return (
    <section className="relative w-full py-24 md:py-32 px-4 sm:px-8 bg-ink overflow-hidden border-t border-white/5">
      
      {/* Desktop-only Colorful Animated Background */}
      <div className="hidden lg:block absolute inset-0 opacity-40 pointer-events-none mix-blend-screen z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] bg-blue-600/20 rounded-full blur-[150px] will-change-transform transform-gpu" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute bottom-[0%] left-[0%] w-[60%] h-[70%] bg-emerald-500/15 rounded-full blur-[150px] will-change-transform transform-gpu" 
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 3 }}
          className="absolute top-[20%] left-[30%] w-[50%] h-[50%] bg-neon-purple/15 rounded-full blur-[140px] will-change-transform transform-gpu" 
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-overlay z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 shadow-[0_0_15px_rgba(0,102,255,0.2)]">
                <div className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,102,255,1)] animate-pulse" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neon-cyan drop-shadow-sm">Our Expertise</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg">
              Uncompromising <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40">Quality & Precision.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
            className="text-white/60 max-w-md text-sm md:text-base leading-relaxed border-l-2 border-neon-cyan/30 pl-6 lg:pb-2 backdrop-blur-sm"
          >
            We deploy advanced commercial roofing solutions designed to eliminate leaks, reduce energy costs, and maximize the lifecycle of your investment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {SERVICES.map((s, idx) => (
            <ServiceCard key={idx} service={s} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
