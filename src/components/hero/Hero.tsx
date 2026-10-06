"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollToTarget } = useScroll();

  // Sync play/pause state with video native events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Ensure video starts paused on initial mount
    video.pause();
    setIsPlaying(false);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // IntersectionObserver: Pause video when < 35% visible (do not auto-resume)
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.35) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: [0, 0.35, 0.5, 1.0] }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If unmuted play fails due to browser policy, play muted
          video.muted = true;
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    // Don't toggle video if user clicked interactive links or non-play CTA buttons
    if (target.closest("a") || (target.closest("button") && !target.closest(".video-play-btn"))) {
      return;
    }
    togglePlayPause();
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onClick={handleSectionClick}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#f4f2ee] cursor-pointer select-none"
    >
      {/* Giant outlined ghost word behind person */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span
          className="font-display text-[22vw] font-black leading-none text-transparent uppercase tracking-tighter opacity-30 transition-opacity duration-300"
          style={{
            WebkitTextStroke: "3px #0d0d0d",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="section-container relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto">
        {/* Video Wrapper (16:9 Widescreen Aspect Ratio) */}
        <div className="relative w-full max-w-[960px] flex items-center justify-center mx-auto my-2">
          <div className="relative w-full aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-700"
            >
              <source src="/hero/hero.webm" type="video/webm" />
              <source src="/hero/hero.mp4" type="video/mp4" />
            </video>

            {/* Central Play/Pause Button Overlay (Icon Only, No Text) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                aria-label={isPlaying ? "Pause introduction video" : "Play introduction video"}
                className="video-play-btn relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/25 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer shadow-xl"
              >
                {!isPlaying && (
                  <span className="absolute -inset-2 rounded-full border border-black/25 animate-ping pointer-events-none" />
                )}
                {isPlaying ? (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current opacity-90 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5 opacity-90 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Heading & Role */}
        <div className="text-center mt-6 max-w-2xl">
          <div className="rv font-mono-tag text-xs font-semibold tracking-widest text-[#77756f] uppercase mb-3">
            00 — Hello & Welcome
          </div>
          <h1 className="rv font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0d0d0d] leading-[1.05]">
            {PROFILE.role}
            <span className="font-serif-italic ml-2">.</span>
          </h1>

          {/* CTA Buttons */}
          <div className="rv flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
            <button
              onClick={() => scrollToTarget("work")}
              className="btn-primary"
            >
              Explore work
            </button>
            <button
              onClick={() => scrollToTarget("contact")}
              className="btn-secondary"
            >
              Let's talk
            </button>
            <a
              href={PROFILE.resumePath}
              download
              className="btn-secondary font-mono-tag text-xs"
            >
              Résumé ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

