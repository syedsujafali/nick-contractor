import { motion } from "framer-motion";

export default function ShowcaseSection() {
  return (
    <section className="relative w-full bg-ink px-4 py-16 sm:px-8 overflow-hidden">
      
      {/* Background accents */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-white/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-white/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl font-bold text-offwhite sm:text-5xl">
            Clean, Professional <span className="text-neon-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">Results</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-offwhite/70">
            We deliver uncompromising quality using top-tier materials and modern architectural standards for every commercial project.
          </p>
        </motion.div>

        {/* Image Showcase Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black aspect-[4/3] md:aspect-[3/2]"
          >
            <img 
              src="/gallery_image_1.png" 
              alt="Clean Roofing Materials" 
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="font-display text-2xl font-semibold text-white">Premium Materials</h3>
              <p className="text-[15px] text-offwhite/80 mt-2">Sleek, modern commercial-grade roofing.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black aspect-[4/3] md:aspect-[3/2]"
          >
            <img 
              src="/gallery_image_2.png" 
              alt="Modern Commercial Exterior" 
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="font-display text-2xl font-semibold text-white">Architectural Excellence</h3>
              <p className="text-[15px] text-offwhite/80 mt-2">Impeccable aesthetics and unyielding performance.</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
