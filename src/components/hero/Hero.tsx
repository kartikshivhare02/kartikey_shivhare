"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(true);
  const { scrollToTarget } = useScroll();

  // Sync play/pause state with video native events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Handle autoplay audio attempt & global pointerdown unlock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try unmuted play first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayingSound(true);
          setAutoplayBlocked(false);
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked: play muted
          video.muted = true;
          video.play().catch(() => {});
          setIsPlayingSound(false);
          setAutoplayBlocked(true);
          setIsPlaying(true);
        });
    }

    // Unlock sound on first user interaction anywhere
    const unlockSound = () => {
      if (video) {
        video.muted = false;
        video
          .play()
          .then(() => {
            setIsPlayingSound(true);
            setAutoplayBlocked(false);
            setIsPlaying(true);
          })
          .catch(() => {});
      }
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };
  }, []);

  // IntersectionObserver: Pause video when < 35% visible
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.35) {
          video.play().catch(() => {});
        } else {
          video.pause();
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
      setIsPlayingSound(true);
      video.play().catch(() => {
        video.muted = true;
        setIsPlayingSound(false);
        video.play().catch(() => {});
      });
    } else {
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || !isPlayingSound) {
      video.muted = false;
      video
        .play()
        .then(() => {
          setIsPlayingSound(true);
          setAutoplayBlocked(false);
          setIsPlaying(true);
        })
        .catch(() => {});
    } else {
      video.muted = true;
      setIsPlayingSound(false);
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#f4f2ee]"
    >
      {/* Giant outlined ghost word behind person */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-0">
        <span
          className="font-display text-[22vw] font-black leading-none text-transparent uppercase tracking-tighter opacity-15"
          style={{
            WebkitTextStroke: "2px #0d0d0d",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="section-container relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto">
        {/* Video Wrapper */}
        <div className="relative w-full max-w-[768px] flex items-center justify-center">
          <div className="relative w-full h-[62svh] md:h-[min(96svh,960px)] aspect-[768/960] flex items-center justify-center">
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

            {/* Central Play/Pause Button (Single, Transparent & Minimalist) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <button
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause introduction video" : "Play introduction video"}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/15 hover:bg-black/50 text-[#0d0d0d] hover:text-white flex items-center justify-center backdrop-blur-sm border border-black/10 hover:border-white/30 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer shadow-sm"
              >
                {!isPlaying && (
                  <span className="absolute -inset-2 rounded-full border border-black/20 animate-ping pointer-events-none" />
                )}
                {isPlaying ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5 opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
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
