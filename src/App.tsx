import { useEffect } from "react";
import Lenis from "lenis";
import BusinessCard from "./components/BusinessCard";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import Background from "./components/Background";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen text-offwhite selection:bg-gold selection:text-ink relative">
      <Background />
      <main className="relative z-10">
        <BusinessCard />
        <div className="hidden md:block">
          <AboutSection />
          <ServicesSection />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;