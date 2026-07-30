import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

export default function AboutSection() {
  const services = [
    {
      title: "Commercial Roof Repair",
      description: "Expert repair of flat roof systems to stop leaks at their source."
    },
    {
      title: "Silicone Roof Coatings",
      description: "Seamless, waterproof membranes extending roof life up to 20 years."
    },
    {
      title: "Roof Restoration",
      description: "Revitalize aging roofs without tear-off, saving up to 60%."
    },
    {
      title: "Skylight Installation",
      description: "Commercial-grade installation to bring natural light into your space."
    }
  ];

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#040406] overflow-hidden">

      {/* Desktop-only Colorful Background */}
      <div className="hidden lg:block absolute inset-0 opacity-60 pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[20%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_50%)] will-change-transform transform-gpu"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-[20%] right-[0%] w-[50%] h-[80%] bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_50%)] will-change-transform transform-gpu"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 4 }}
          className="absolute bottom-[10%] right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(245,158,11,0.1)_0%,transparent_50%)] will-change-transform transform-gpu"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >

          {/* Text Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-neon-cyan font-bold tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-neon-cyan/10 px-4 py-1.5 rounded-full border border-neon-cyan/20"
            >
              Your Local Commercial Roofing Experts
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-4xl md:text-5xl font-black text-white mb-6 leading-tight drop-shadow-md"
            >
              About Nick Contractor
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 text-2xl md:text-3xl mt-2 block">Expert Roof Repair & Restoration</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-white/70 text-lg leading-relaxed mb-8 backdrop-blur-sm"
            >
              Welcome to Nick Contractor, the trusted choice for businesses across New Jersey. For over 35 years, we've provided reliable and cost-effective commercial roofing solutions, focusing on quality, durability, and minimal business downtime.
            </motion.p>

            <div className="space-y-4">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (0.1 * idx), duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="flex items-start gap-4 p-3 rounded-xl transition-colors duration-300 cursor-default border border-transparent hover:border-white/10"
                >
                  <FiCheckCircle className="text-neon-cyan h-6 w-6 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(0,102,255,0.5)]" />
                  <div>
                    <span className="text-white font-bold tracking-wide">{service.title}</span>
                    <span className="text-white/40 mx-2">—</span>
                    <span className="text-white/70">{service.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden border border-white/20 group shadow-[0_20px_60px_rgba(0,0,0,0.8)] lg:shadow-[0_0_80px_rgba(0,102,255,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-black/20 to-transparent z-10 pointer-events-none" />
            <motion.img
              src="/1.png"
              alt="Commercial Roofing Work"
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-90"
            />
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-8 left-8 right-8 lg:right-auto z-20"
            >
              <div className="flex items-center gap-5 bg-[#08080a]/80 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-neon-cyan/50 transition-colors duration-500">
                <div className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-neon-cyan to-blue-600 drop-shadow-md">35+</div>
                <div className="text-[11px] font-black text-white uppercase tracking-widest leading-relaxed">Years of<br /><span className="text-white/60">Excellence</span></div>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
