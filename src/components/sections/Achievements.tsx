"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";

function CountUpNumber({ target, prefix = "", suffix = "", isSeen }: { target: number; prefix?: string; suffix?: string; isSeen: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isSeen) return;

    let startTime: number | null = null;
    const duration = 1400; // 1.4s

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, isSeen]);

  return (
    <span className="font-display font-black text-5xl sm:text-6xl text-[#0d0d0d] tracking-tighter">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Achievements() {
  const stickyContainerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const container = stickyContainerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;

      if (scrollableDistance > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress * 100}%`;
        }

        const trackWidth = track.scrollWidth - window.innerWidth + 120;
        const translateX = progress * Math.max(trackWidth, 0);
        track.style.transform = `translateX(-${translateX}px)`;

        const cardWidth = 440;
        const activeCardIdx = Math.min(
          Math.floor((translateX + window.innerWidth / 2) / cardWidth),
          ACHIEVEMENTS.length - 1
        );

        const targetMaxIdx = Math.max(0, activeCardIdx);

        setSeenIndices((prev) => {
          let needsUpdate = false;
          for (let i = 0; i <= targetMaxIdx; i++) {
            if (!prev.has(i)) {
              needsUpdate = true;
              break;
            }
          }
          if (!needsUpdate) return prev;
          const next = new Set(prev);
          for (let i = 0; i <= targetMaxIdx; i++) {
            next.add(i);
          }
          return next;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="achievements"
      ref={stickyContainerRef}
      className="relative bg-[#f4f2ee]"
      style={{ height: "300vh" }}
    >
      {/* Sticky Full-Viewport Container */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-between py-10 overflow-hidden">
        {/* Header */}
        <div className="section-container w-full flex items-center justify-between z-10">
          <div>
            <div className="font-mono-tag text-xs font-semibold tracking-widest text-[#77756f] uppercase mb-1">
              05 — Key Milestones
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0d0d0d]">
              Recognitions & honors<span className="font-serif-italic ml-2">.</span>
            </h2>
          </div>

          {/* Thin Progress Bar in Header */}
          <div className="hidden sm:block w-36 h-1 bg-[#0d0d0d]/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-[#0d0d0d] transition-all duration-150 ease-out"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Pinned Card Track */}
        <div className="w-full overflow-hidden my-auto py-6">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 px-[var(--gutter)] transition-transform duration-100 ease-out"
            style={{ width: "max-content" }}
          >
            {ACHIEVEMENTS.map((item, idx) => {
              const isSeen = seenIndices.has(idx);

              return (
                <div
                  key={item.id}
                  className="relative w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] rounded-[28px] bg-white p-8 flex flex-col justify-between shadow-lg hover:-translate-y-3 transition-all duration-500 ease-out group border border-[#0d0d0d]/5"
                >
                  {/* Top Row: 72px Logo Tile + Index */}
                  <div className="flex items-center justify-between w-full">
                    <div
                      className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center p-3.5 relative overflow-hidden transition-all duration-300 group-hover:scale-105"
                      style={{ backgroundColor: item.brandColor }}
                    >
                      <Image
                        src={`/logos/${item.platformLogo}`}
                        alt={item.platform}
                        width={44}
                        height={44}
                        className="object-contain drop-shadow-sm"
                      />
                    </div>
                    <span className="font-mono-tag text-xs font-bold text-[#77756f]">
                      {item.index}
                    </span>
                  </div>

                  {/* Bottom Row: Left Info + Right Count Up Number */}
                  <div className="flex items-end justify-between gap-4">
                    <div className="max-w-[60%]">
                      <div className="font-mono-tag text-[10px] font-bold text-[#77756f] uppercase tracking-wider mb-1">
                        {item.platform}
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#0d0d0d] leading-snug mb-1">
                        {item.label}
                      </h3>
                      <p className="text-xs text-[#77756f] line-clamp-2">
                        {item.detail}
                      </p>
                    </div>

                    <div className="text-right">
                      <CountUpNumber
                        target={item.bigNumber}
                        prefix={item.numberPrefix}
                        suffix={item.numberSuffix}
                        isSeen={isSeen}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Track Ending Card: "and counting →" */}
            <div className="w-[clamp(240px,25vw,360px)] h-[clamp(260px,36vh,310px)] rounded-[28px] border-2 border-dashed border-[#0d0d0d]/20 bg-white/40 p-8 flex flex-col items-center justify-center text-center">
              <span className="font-display text-2xl font-bold text-[#0d0d0d] mb-2">
                and counting →
              </span>
              <p className="font-mono-tag text-xs text-[#77756f]">
                Pursuing continuous growth in AI & Engineering.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="section-container w-full text-center">
          <span className="font-mono-tag text-[10px] text-[#77756f] uppercase tracking-widest">
            Scroll down to navigate milestones
          </span>
        </div>
      </div>
    </section>
  );
}
