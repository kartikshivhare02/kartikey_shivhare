"use client";

import { useRef, useEffect, useState } from "react";
import { TIMELINE } from "@/lib/data";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lineProgress, setLineProgress] = useState(0);

  // Scroll progress through this specific section
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far we've scrolled into section
      const totalDist = rect.height;
      const currentDist = windowHeight - rect.top;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const prog = currentDist / (totalDist + windowHeight * 0.5);
        setLineProgress(Math.min(Math.max(prog, 0), 1));
      } else if (rect.top > windowHeight) {
        setLineProgress(0);
      } else if (rect.bottom < 0) {
        setLineProgress(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="section-padding bg-[#f4f2ee] relative">
      <div className="section-container" ref={containerRef}>
        {/* Section Header */}
        <div className="mb-16">
          <div className="rv font-mono-tag text-xs font-semibold tracking-widest text-[#77756f] uppercase mb-2">
            04 — Journey & Experience
          </div>
          <h2 className="rv font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0d0d0d]">
            Education & experience as one path<span className="font-serif-italic ml-2">.</span>
          </h2>
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10">
          {/* Vertical Spine (Background track + Animated active line) */}
          <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-12 w-[2px] bg-[#0d0d0d]/10">
            <div
              className="w-full bg-[#0d0d0d] transition-all duration-150 ease-out"
              style={{ height: `${lineProgress * 100}%` }}
            />
          </div>

          {/* Stops */}
          <div className="space-y-12">
            {TIMELINE.map((item, idx) => {
              const stopThreshold = (idx + 1) / (TIMELINE.length + 1);
              const isLit = lineProgress >= stopThreshold;

              return (
                <div key={item.id} className="relative flex items-start gap-6 group">
                  {/* Node Circle */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-8 h-8 rounded-full border-2 transition-all duration-500 flex items-center justify-center bg-white ${
                      isLit
                        ? "border-[#0d0d0d] bg-[#0d0d0d] text-white shadow-md scale-110"
                        : "border-[#0d0d0d]/30 text-[#77756f]"
                    }`}
                  >
                    <span className="font-mono-tag text-[10px] font-bold">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div
                    className={`pill-card p-6 sm:p-8 w-full transition-all duration-500 ${
                      isLit ? "bg-white shadow-lg translate-x-0" : "bg-white/60 opacity-70"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full font-mono-tag text-[10px] font-bold uppercase tracking-wider ${
                            item.type === "experience"
                              ? "bg-[#0d0d0d] text-white"
                              : "bg-[#e9e6e0] text-[#0d0d0d]"
                          }`}
                        >
                          {item.type}
                        </span>
                        {item.isCurrent && (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono-tag text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                            CURRENT
                          </span>
                        )}
                      </div>
                      <span className="font-mono-tag text-xs font-semibold text-[#77756f]">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0d0d0d] mb-1">
                      {item.title}
                    </h3>
                    <div className="font-mono-tag text-xs font-semibold text-[#3a3a3a] mb-3">
                      {item.organization} {item.location && `· ${item.location}`}
                    </div>

                    <p className="text-xs sm:text-sm text-[#77756f] leading-relaxed mb-3">
                      {item.detail}
                    </p>

                    {item.metrics && (
                      <div className="inline-block px-3 py-1 rounded-lg bg-[#f4f2ee] font-mono-tag text-xs font-bold text-[#0d0d0d]">
                        Score: {item.metrics}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Ending Dashed Card: "Next — Your team?" */}
            <div className="relative flex items-start gap-6">
              <div className="absolute -left-[31px] sm:-left-[39px] top-3 w-8 h-8 rounded-full border-2 border-dashed border-[#0d0d0d]/40 bg-[#f4f2ee] flex items-center justify-center text-[#0d0d0d] font-bold text-sm">
                ?
              </div>

              <div className="rounded-[28px] border-2 border-dashed border-[#0d0d0d]/25 p-8 w-full bg-white/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left hover:border-[#0d0d0d] transition-colors duration-300">
                <div>
                  <h4 className="font-display text-2xl font-bold text-[#0d0d0d]">
                    Next — Your team?
                  </h4>
                  <p className="text-xs text-[#77756f] font-mono-tag mt-1">
                    Ready for Data Science, Analytics, or Full-Stack roles.
                  </p>
                </div>
                <a href="mailto:shivhares747@gmail.com" className="btn-primary text-xs whitespace-nowrap">
                  Get in touch ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
