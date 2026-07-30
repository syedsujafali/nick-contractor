import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type ScrollFn = (target: string | number | HTMLElement, offset?: number) => void;

type SmoothScrollCtx = {
  scrollTo: ScrollFn;
};

const Ctx = createContext<SmoothScrollCtx>({ scrollTo: () => {} });

export function useSmoothScroll() {
  return useContext(Ctx);
}

/**
 * Initialises Lenis smooth scrolling and exposes a `scrollTo` helper.
 * Only starts once `active` is true (after the intro animation) so the
 * first paint stays locked to the cinematic loader.
 */
export function SmoothScrollProvider({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollTo, setScrollTo] = useState<ScrollFn>(() => () => {});

  useEffect(() => {
    if (!active) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    setScrollTo(
      () => (target: string | number | HTMLElement, offset = 0) =>
        lenis.scrollTo(target, { offset, duration: 1.25 })
    );

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [active]);

  return <Ctx.Provider value={{ scrollTo }}>{children}</Ctx.Provider>;
}
