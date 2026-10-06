"use client";

import { useEffect, createContext, useContext, ReactNode } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./hooks";

interface ScrollContextType {
  lenis: Lenis | null;
  scrollToTarget: (targetId: string) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollToTarget: () => {},
});

let globalLenis: Lenis | null = null;

export function ScrollProvider({ children }: { children: ReactNode }) {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    globalLenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
    };
  }, [prefersReduced]);

  const scrollToTarget = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    if (globalLenis) {
      globalLenis.scrollTo(element, { offset: 0, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    }
  };

  return (
    <ScrollContext.Provider value={{ lenis: globalLenis, scrollToTarget }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}
