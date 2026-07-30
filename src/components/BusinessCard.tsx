import { useEffect, useRef, useState } from "react";
import { Variants, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowRight, FiPhone, FiMapPin } from "react-icons/fi";
import { COMPANY, SERVICES, TRUST_BADGES } from "@/data/site";

const containerVariants: Variants = {
  hidden: { opacity: 0, perspective: 2000 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  },
};

export default function BusinessCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const images = ["/1.png", "/2.png", "/3.png", "/4.png"];

  useEffect(() => {
    setCanTilt(window.matchMedia("(hover: hover) and (pointer: fine)").matches);

    // Auto-cycle gallery images smoothly
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 60, damping: 30, mass: 1.5 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 60, damping: 30, mass: 1.5 });

  // Spotlight follows the mouse smoothly
  const spotlightX = useSpring(useTransform(mx, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 50, damping: 25, mass: 1.2 });
  const spotlightY = useSpring(useTransform(my, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 50, damping: 25, mass: 1.2 });

  const onMove = (e: React.MouseEvent) => {
    if (!canTilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  // Base tile style with a subtle colorful gradient to break up the solid black
  const tileClass = "relative overflow-hidden rounded-3xl bg-[#08080a] lg:bg-[#08080a]/80 bg-gradient-to-br from-neon-purple/10 via-[#08080a]/50 to-neon-cyan/10 lg:backdrop-blur-2xl border border-white/10 shadow-lg lg:shadow-[0_15px_50px_rgba(0,102,255,0.1)] lg:[transform-style:preserve-3d]";

  return (
    <motion.div
      style={{ perspective: 1800 }}
      className="w-full flex flex-col min-h-[100dvh] justify-center items-center p-2 sm:p-4 lg:p-6 py-8 lg:py-12"
      initial={{ opacity: 0, filter: "blur(15px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: canTilt ? rotateX : 0, rotateY: canTilt ? rotateY : 0, transformStyle: canTilt ? "preserve-3d" : "flat" }}
        className={`w-full max-w-[100rem] mx-auto flex flex-col lg:flex-row h-auto lg:min-h-[850px] ${tileClass} divide-y lg:divide-y-0 lg:divide-x divide-white/10`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Spotlight overlay on the whole container */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 rounded-[2rem] opacity-0 transition-opacity duration-1000 ease-out group-hover/container:opacity-100 mix-blend-overlay will-change-transform transform-gpu"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) => `radial-gradient(800px circle at ${x} ${y}, rgba(255,255,255,0.15), transparent 40%)`
            ),
          }}
        />

        {/* =========================================
            LEFT COLUMN (Identity, Services, Stats/CTA)
            ========================================= */}
        <div className="flex flex-col w-full lg:w-[70%] xl:w-[70%] divide-y divide-white/10 h-full">

          {/* TILE 1: Identity */}
          <motion.div variants={tileVariants} className="flex-[1.2] p-4 lg:p-6 flex flex-col justify-center transition-colors duration-500 hover:bg-white/[0.02] group/tile relative will-change-transform transform-gpu">
            {/* Top-Right Badge Image inside the tile */}
            <motion.img
              src="/badge.png"
              alt="30 Years of Experience"
              className="absolute top-6 right-6 w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.6 }}
              style={{ transform: "translateZ(50px)" }}
            />

            {/* Logo */}
            <div className="flex items-center gap-4 mb-6 relative z-10" style={{ transform: "translateZ(30px)" }}>
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.3)] group-hover/tile:scale-110 group-hover/tile:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-500 border border-white/10">
                <img src="/logo.png" alt="Nick Contractor Logo" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="relative z-10 pl-6 border-l-4 border-amber-500 flex flex-col xl:flex-row items-start xl:items-end gap-16 w-full" style={{ transform: "translateZ(40px)" }}>
              <div className="shrink-0">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl lg:text-[4.2rem] xl:text-[5rem] leading-[0.9] tracking-normal uppercase mb-2 lg:mb-4"
                  style={{ fontFamily: "'Titan One', cursive" }}
                >
                  <span
                    className="block mb-2 inline-block"
                    style={{
                      backgroundImage: "linear-gradient(180deg, #fff2a8 0%, #ffcc00 35%, #cc9900 75%, #806000 100%)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      WebkitTextStroke: "4px #111",
                      filter: "drop-shadow(0px 15px 10px rgba(0,0,0,0.6))"
                    }}
                  >
                    FLAT
                  </span><br />
                  <span
                    className="block mb-2 inline-block"
                    style={{
                      backgroundImage: "linear-gradient(180deg, #b3edff 0%, #00bfff 35%, #0088cc 75%, #004466 100%)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      WebkitTextStroke: "4px #111",
                      filter: "drop-shadow(0px 15px 10px rgba(0,0,0,0.6))"
                    }}
                  >
                    ROOF
                  </span><br />
                  <span
                    className="block inline-block"
                    style={{
                      backgroundImage: "linear-gradient(180deg, #ffb3b3 0%, #ff0033 35%, #cc0000 75%, #660000 100%)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      WebkitTextStroke: "4px #111",
                      filter: "drop-shadow(0px 15px 10px rgba(0,0,0,0.6))"
                    }}
                  >
                    REPAIR
                  </span>
                </motion.h1>
              </div>

              {/* About Text Block styled as a premium colorful glass card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="hidden md:block max-w-xl relative group overflow-hidden bg-gradient-to-br from-neon-purple/20 via-neon-cyan/10 to-neon-pink/20 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] xl:ml-auto xl:mr-8 transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_40px_rgba(0,102,255,0.3)]"
              >
                {/* Colorful animated glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-transparent to-blue-500 opacity-0 group-hover:opacity-30 transition-opacity duration-700 mix-blend-screen" />

                <div className="absolute -top-4 -left-3 text-7xl text-amber-500/40 font-serif leading-none select-none drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]">"</div>

                <p className="mb-4 text-white text-sm md:text-base lg:text-lg font-medium leading-relaxed tracking-wide relative z-10 drop-shadow-md">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-white to-yellow-600 font-black text-[110%]">Welcome to Nick Contractor</span>, the trusted choice for businesses across New Jersey.
                </p>
                <p className="text-white/90 font-medium text-xs md:text-sm lg:text-base leading-relaxed relative z-10 drop-shadow-sm">
                  For over 35 years, we've provided reliable and cost-effective commercial roofing solutions, focusing on uncompromising quality, proven durability, and minimal business downtime.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Half of Left Column: Side-by-side Layout to reduce height */}
          <div className="flex flex-col xl:flex-row divide-y xl:divide-y-0 xl:divide-x divide-white/10 flex-1">

            {/* TILE 2: Services */}
            <motion.div variants={tileVariants} className="relative overflow-hidden w-full xl:w-[55%] p-5 md:p-6 lg:p-8 group/services transition-colors duration-700 flex flex-col justify-center hover:bg-white/[0.02] will-change-transform transform-gpu">

              {/* Tile ambient glow */}
              <div className="absolute inset-0 opacity-0 group-hover/services:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center text-center mb-4" style={{ transform: "translateZ(30px)" }}>
                <motion.div
                  animate={{
                    textShadow: ["0px 0px 8px rgba(251, 191, 36, 0.8)", "0px 0px 20px rgba(96, 165, 250, 0.8)", "0px 0px 8px rgba(251, 191, 36, 0.8)"],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center justify-center gap-4 mb-1"
                >
                  <div className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,1)]" />
                  <span className="text-[14px] md:text-[20px] font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-white to-yellow-600">
                    Our Expertise
                  </span>
                  <div className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,1)]" />
                </motion.div>
                <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4" style={{ transform: "translateZ(40px)" }}>
                {SERVICES.map((s, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                    className={`relative flex flex-col items-center justify-center sm:items-start sm:justify-start gap-1.5 sm:gap-2 p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${s.accent} border border-white/20 transition-all duration-500 ease-out hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group/srv cursor-pointer overflow-hidden backdrop-blur-md`}
                  >
                    {/* Darker overlay for better text contrast, lightens on hover */}
                    <div className="absolute inset-0 bg-black/40 group-hover/srv:bg-black/20 transition-colors duration-500 pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 relative z-10 text-center sm:text-left">
                      <div className="relative flex h-8 w-8 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-2xl bg-black/30 border border-white/30 shadow-[inset_0_1px_8px_rgba(255,255,255,0.3)] overflow-hidden group-hover/srv:border-white/60 transition-all duration-500 group-hover/srv:shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                        <s.icon className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)] group-hover/srv:scale-125 group-hover/srv:rotate-12 transition-transform duration-500 ease-out" />
                      </div>
                      <h3 className="font-sans sm:font-display text-[10px] sm:text-base font-bold sm:font-black text-white tracking-normal sm:tracking-wide transition-all duration-300 leading-tight drop-shadow-md group-hover/srv:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{s.title}</h3>
                    </div>

                    <p className="hidden sm:block relative z-10 text-[11px] sm:text-[12px] leading-snug text-white/90 font-medium group-hover/srv:text-white transition-colors duration-300 drop-shadow-sm">
                      {s.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* SUB-GRID: Stats & Contact */}
            <div className="w-full xl:w-[45%] flex flex-col divide-y divide-white/10">

              {/* TILE 3: Stats */}
              <motion.div variants={tileVariants} className="flex-1 p-5 lg:p-6 flex flex-col justify-center group/stats relative overflow-hidden transition-colors duration-500 rounded-3xl will-change-transform transform-gpu">
                {/* Subtle colorful background for the stats tile */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 opacity-0 group-hover/stats:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full relative z-10">
                  {TRUST_BADGES.map((b, i) => (
                    <div
                      key={b.label}
                      className="flex flex-col justify-center text-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm"
                    >
                      <div className={`font-sans sm:font-display text-[11px] sm:text-[15px] xl:text-[16px] leading-tight font-extrabold sm:font-black tracking-normal sm:tracking-wide mb-0 sm:mb-1.5 ${i % 2 === 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 drop-shadow-[0_0_10px_rgba(96,165,250,0.4)]'}`}>
                        {b.value}
                      </div>
                      <div className="hidden sm:block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-white/70 group-hover/stats:text-white/90 transition-colors duration-300 leading-snug">
                        {b.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* TILE 4: Contact CTA & Address */}
              <motion.div variants={tileVariants} className="p-5 lg:p-6 flex flex-col gap-3 justify-center hover:bg-white/[0.02] transition-colors duration-700 ease-out will-change-transform transform-gpu">

                {/* Address Row */}
                <a
                  href={COMPANY.addressHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/loc flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 w-full p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-500 group-hover/loc:scale-110 group-hover/loc:bg-amber-500 group-hover/loc:text-white transition-all duration-500 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                    <FiMapPin className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">Headquarters</span>
                    <span className="text-[12px] font-medium text-white/90 leading-snug group-hover/loc:text-white transition-colors">{COMPANY.address}</span>
                  </div>
                </a>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href={COMPANY.phoneHref}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0d0d12]/80 px-4 py-3 transition-all duration-500 hover:bg-[#1a1a24] hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group/ph"
                  >
                    <FiPhone className="h-3.5 w-3.5 text-blue-500 group-hover/ph:animate-pulse" />
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-white uppercase whitespace-nowrap">{COMPANY.phone}</span>
                  </a>

                  <a
                    href={COMPANY.emailHref}
                    className="flex-1 group/btn relative overflow-hidden flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 transition-transform duration-500 hover:scale-[1.02] shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-black whitespace-nowrap">Email</span>
                    <FiArrowRight className="h-3.5 w-3.5 text-black transition-transform duration-500 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

        {/* =========================================
            RIGHT COLUMN (Visual Centerpiece - Animated Stack)
            ========================================= */}
        <motion.div variants={tileVariants} className="hidden lg:flex w-full lg:w-[30%] xl:w-[30%] flex-col items-center justify-center min-h-[400px] lg:min-h-0 relative overflow-hidden group/right p-4 sm:p-6 transition-colors duration-500 will-change-transform transform-gpu">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none transition-transform duration-1000 group-hover/right:scale-110" />

          {/* Animated Card Stack (Portrait) */}
          <div className="relative w-full h-[400px] lg:h-[550px] perspective-[1000px] flex items-center justify-center mt-6 lg:mt-0" style={{ transform: "translateZ(50px)" }}>
            {images.map((src, idx) => {
              // Calculate relative offset for stacking logic
              const isActive = idx === activeImg;
              const isPrev = idx === (activeImg - 1 + images.length) % images.length;
              const isNext = idx === (activeImg + 1) % images.length;

              let zIndex = 0;
              let scale = 0.8;
              let yOffset = 0;
              let opacity = 0;
              let rotateZ = 0;

              if (isActive) {
                zIndex = 30;
                scale = 1;
                opacity = 1;
                rotateZ = 0;
                yOffset = 0;
              } else if (isNext) {
                zIndex = 20;
                scale = 0.9;
                opacity = 0.7;
                rotateZ = 5;
                yOffset = 20;
              } else if (isPrev) {
                zIndex = 10;
                scale = 0.85;
                opacity = 0.4;
                rotateZ = -5;
                yOffset = 40;
              } else {
                zIndex = 0;
                scale = 0.8;
                opacity = 0;
                rotateZ = 10;
                yOffset = 60;
              }

              return (
                <motion.div
                  key={src}
                  animate={{
                    zIndex,
                    scale,
                    y: yOffset,
                    rotateZ,
                    opacity
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Ultra smooth snappy transition
                  className="absolute w-[90%] h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/20 cursor-pointer will-change-transform transform-gpu"
                  onClick={() => setActiveImg(idx)}
                >
                  <img src={src} alt={`Project ${idx + 1}`} className="w-full h-full object-cover" />

                  {/* Highlight overlay for active card */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10 pointer-events-none" />
                  )}
                  {/* Dim overlay for non-active cards */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-700" />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="absolute bottom-6 text-center w-full px-8 z-40 pointer-events-none" style={{ transform: "translateZ(70px)" }}>
            <div className="inline-block px-6 py-2.5 rounded-full bg-[#0d0d12]/90 backdrop-blur-md border border-neon-cyan/30 shadow-[0_0_20px_rgba(0,102,255,0.4)]">
              <span className="font-display text-[10px] font-bold tracking-[0.2em] text-white uppercase drop-shadow-[0_0_5px_rgba(0,102,255,0.8)]">Featured Projects</span>
            </div>
            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4 pointer-events-auto">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeImg ? "bg-neon-cyan scale-125 shadow-[0_0_10px_rgba(0,102,255,0.8)]" : "bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
