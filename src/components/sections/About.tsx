"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";
import TechLogo from "@/components/ui/TechLogo";

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const lanyardContainerRef = useRef<HTMLDivElement | null>(null);
  const physicsRef = useRef({
    angle: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
  });

  // Pointer movement velocity calculation & spring damping animation loop
  useEffect(() => {
    let animFrame: number;

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = (now - (physicsRef.current.lastTime || now)) / 1000;
      if (dt > 0.001) {
        const dx = e.clientX - physicsRef.current.lastX;
        const vx = dx / dt; // velocity in px/s
        physicsRef.current.velocity += vx * 0.005;
      }
      physicsRef.current.lastX = e.clientX;
      physicsRef.current.lastTime = now;
    };

    window.addEventListener("pointermove", handlePointerMove);

    const updatePhysics = () => {
      const state = physicsRef.current;
      const k = 15;
      const damping = 0.92;
      const accel = -k * state.angle;

      state.velocity = (state.velocity + accel * 0.016) * damping;
      state.angle += state.velocity * 0.016;

      const time = performance.now() * 0.002;
      const idleSway = Math.sin(time) * 1.5;

      const totalAngle = Math.max(-25, Math.min(25, state.angle + idleSway));
      if (lanyardContainerRef.current) {
        lanyardContainerRef.current.style.transform = `rotate(${totalAngle}deg)`;
      }

      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <section id="about" className="section-padding bg-[#f4f2ee] relative overflow-hidden">
      <div className="section-container">
        {/* Section Tag & Heading */}
        <div className="mb-12">
          <div className="rv font-mono-tag text-xs font-semibold tracking-widest text-[#77756f] uppercase mb-2">
            01 — About me
          </div>
          <h2 className="rv font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0d0d0d]">
            Quiet dedication, practical solutions<span className="font-serif-italic ml-2">.</span>
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
          {/* Left Column */}
          <div className="rv pill-card p-8 flex flex-col justify-between" style={{ "--i": 1 } as React.CSSProperties}>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#0d0d0d] mb-4">
                Hi, I'm {PROFILE.firstName}.
              </h3>
              <p className="text-[#3a3a3a] text-sm leading-relaxed mb-6 font-normal">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-[#77756f] text-xs leading-relaxed border-t border-[#0d0d0d]/10 pt-4">
                Currently pursuing B.Tech in CS (Data Science) while building custom AI applications and websites for independent clients.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a href={PROFILE.resumePath} download className="btn-primary text-xs py-2.5 px-5">
                Résumé ↓
              </a>
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-2.5 px-5"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card */}
          <div className="rv flex flex-col items-center justify-start relative pt-6" style={{ "--i": 2 } as React.CSSProperties}>
            {/* Lanyard Strap hanging from top */}
            <div className="relative w-8 h-16 bg-[#0d0d0d] rounded-t-sm flex flex-col items-center justify-center overflow-hidden shadow-md">
              <div className="animate-marquee whitespace-nowrap text-[8px] font-mono-tag font-bold text-white tracking-widest uppercase opacity-75 writing-mode-vertical">
                {PROFILE.name} • {PROFILE.role} •
              </div>
              {/* Metal Clip */}
              <div className="absolute bottom-0 w-full h-3 bg-[#a9a6a0] border-t border-black/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black/40 border border-white/50" />
              </div>
            </div>

            {/* Pendulum Swinging Container */}
            <div
              ref={lanyardContainerRef}
              style={{
                transformOrigin: "top center",
                transition: "transform 0.1s linear",
              }}
              className="w-full flex justify-center mt-[-2px]"
            >
              {/* 3D Flip Card Container */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Developer ID Card. Hover or press Enter to flip."
                onKeyDown={handleKeyDown}
                onClick={() => setIsFlipped(!isFlipped)}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                className="w-[300px] h-[404px] cursor-pointer perspective-1000 outline-none group"
              >
                <div
                  ref={cardRef}
                  className={`relative w-full h-full rounded-[24px] transition-transform duration-700 transform-style-3d shadow-xl ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRONT SIDE - LINKEDIN ID */}
                  <div className="absolute inset-0 w-full h-full rounded-[24px] bg-white border border-[#0d0d0d]/10 p-5 flex flex-col justify-between backface-hidden overflow-hidden shadow-xl">
                    {/* Top Band */}
                    <div className="bg-[#0A66C2] text-white px-3.5 py-1.5 rounded-xl flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                        <span className="font-mono-tag text-[10px] font-bold tracking-widest uppercase">
                          LINKEDIN ID CARD
                        </span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    </div>

                    {/* Portrait Frame */}
                    <div className="relative mx-auto mt-1 w-[115px] h-[135px] rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-[#e9e6e0] to-[#ffffff] border border-[#0d0d0d]/10 shadow-inner group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src="/profile-id.png"
                        alt={PROFILE.name}
                        width={115}
                        height={135}
                        className="w-full h-full object-cover object-top rounded-xl"
                      />
                    </div>

                    {/* Info Rows */}
                    <div className="text-center my-0.5">
                      <h4 className="font-display text-base font-bold text-[#0d0d0d] leading-tight">
                        {PROFILE.name}
                      </h4>
                      <p className="font-mono-tag text-[10px] font-medium text-[#77756f]">
                        {PROFILE.role}
                      </p>
                    </div>

                    {/* LinkedIn Action Badge */}
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-between bg-[#0A66C2]/10 border border-[#0A66C2]/30 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white px-3 py-2 rounded-xl transition-all duration-300 group/link"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          in
                        </div>
                        <div className="text-left font-mono-tag">
                          <div className="text-[9px] font-bold opacity-75 uppercase tracking-wider leading-none">LinkedIn Profile</div>
                          <div className="text-[11px] font-bold leading-tight">kartikey-shivhare</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold group-hover/link:translate-x-0.5 transition-transform">↗</span>
                    </a>

                    {/* Footer & Barcode */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#0d0d0d]/10">
                      <svg className="h-5 w-24 text-[#0d0d0d]" viewBox="0 0 100 24" fill="currentColor">
                        <rect x="0" y="0" width="3" height="24" />
                        <rect x="5" y="0" width="1" height="24" />
                        <rect x="8" y="0" width="4" height="24" />
                        <rect x="14" y="0" width="2" height="24" />
                        <rect x="18" y="0" width="1" height="24" />
                        <rect x="21" y="0" width="5" height="24" />
                        <rect x="28" y="0" width="2" height="24" />
                        <rect x="32" y="0" width="3" height="24" />
                        <rect x="37" y="0" width="1" height="24" />
                        <rect x="40" y="0" width="4" height="24" />
                        <rect x="46" y="0" width="2" height="24" />
                        <rect x="50" y="0" width="5" height="24" />
                        <rect x="57" y="0" width="1" height="24" />
                        <rect x="60" y="0" width="3" height="24" />
                        <rect x="65" y="0" width="2" height="24" />
                        <rect x="69" y="0" width="4" height="24" />
                        <rect x="75" y="0" width="1" height="24" />
                        <rect x="78" y="0" width="3" height="24" />
                        <rect x="83" y="0" width="5" height="24" />
                        <rect x="90" y="0" width="2" height="24" />
                        <rect x="94" y="0" width="4" height="24" />
                      </svg>
                      <span className="font-mono-tag text-[8px] font-bold text-[#77756f] uppercase bg-[#f4f2ee] px-2 py-0.5 rounded-md">
                        Flip ↺
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE - GITHUB & LEETCODE ID */}
                  <div className="absolute inset-0 w-full h-full rounded-[24px] bg-[#0d0d0d] text-white p-5 flex flex-col justify-between rotate-y-180 backface-hidden border border-white/15 shadow-xl">
                    {/* Top Header */}
                    <div className="bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-xl flex items-center justify-between">
                      <span className="font-mono-tag text-[10px] font-bold tracking-widest uppercase text-[#a9a6a0]">
                        DEV PROFILES
                      </span>
                      <span className="font-mono-tag text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                        GITHUB & LEETCODE
                      </span>
                    </div>

                    {/* GitHub Section Box */}
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white/5 border border-white/10 hover:border-white/40 hover:bg-white/10 p-3.5 rounded-xl transition-all duration-300 group/gh block text-left shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <TechLogo logoKey="github" size={22} className="invert" />
                          <span className="font-display font-bold text-sm text-white">GitHub</span>
                        </div>
                        <span className="font-mono-tag text-[10px] font-bold text-[#a9a6a0] group-hover/gh:text-white transition-colors">
                          View Repos ↗
                        </span>
                      </div>
                      <p className="font-mono-tag text-[11px] text-gray-300 font-semibold">
                        @{PROFILE.github.split("/").pop()}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        <span className="text-[8px] font-mono-tag bg-white/10 px-2 py-0.5 rounded text-gray-300">Data Science</span>
                        <span className="text-[8px] font-mono-tag bg-white/10 px-2 py-0.5 rounded text-gray-300">AI & Web</span>
                        <span className="text-[8px] font-mono-tag bg-white/10 px-2 py-0.5 rounded text-gray-300">Open Source</span>
                      </div>
                    </a>

                    {/* LeetCode Section Box */}
                    <a
                      href={PROFILE.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 p-3.5 rounded-xl transition-all duration-300 group/lc block text-left shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <TechLogo logoKey="leetcode" size={22} />
                          <span className="font-display font-bold text-sm text-white">LeetCode</span>
                        </div>
                        <span className="font-mono-tag text-[10px] font-bold text-amber-400 group-hover/lc:text-amber-300 transition-colors">
                          View Profile ↗
                        </span>
                      </div>
                      <p className="font-mono-tag text-[11px] text-gray-300 font-semibold">
                        @{PROFILE.leetcode.split("/").filter(Boolean).pop()}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        <span className="text-[8px] font-mono-tag bg-amber-400/15 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">Python & SQL</span>
                        <span className="text-[8px] font-mono-tag bg-amber-400/15 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">Data Structures</span>
                      </div>
                    </a>

                    {/* Footer */}
                    <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                      <p className="font-mono-tag text-[9px] text-[#a9a6a0] truncate max-w-[170px]">
                        {PROFILE.email}
                      </p>
                      <span className="font-mono-tag text-[8px] font-bold text-[#a9a6a0] uppercase bg-white/10 px-2 py-0.5 rounded-md">
                        Flip ↺
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Facts & Quote */}
          <div className="rv pill-card p-8 flex flex-col justify-between" style={{ "--i": 3 } as React.CSSProperties}>
            <div>
              <h3 className="font-display text-xl font-bold text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-3">
                Quick Facts
              </h3>

              <div className="space-y-4 text-xs font-mono-tag">
                <div>
                  <span className="text-[#77756f] block uppercase text-[10px] tracking-wider mb-0.5">Location</span>
                  <span className="font-bold text-[#0d0d0d] text-sm">{PROFILE.location}</span>
                </div>
                <div>
                  <span className="text-[#77756f] block uppercase text-[10px] tracking-wider mb-0.5">Education</span>
                  <span className="font-bold text-[#0d0d0d] text-sm">B.Tech CS (Data Science), Acropolis Institute</span>
                </div>
                <div>
                  <span className="text-[#77756f] block uppercase text-[10px] tracking-wider mb-0.5">Current Role</span>
                  <span className="font-bold text-[#0d0d0d] text-sm">Self-Employed Web & AI Solutions</span>
                </div>
                <div>
                  <span className="text-[#77756f] block uppercase text-[10px] tracking-wider mb-0.5">Email</span>
                  <a href={`mailto:${PROFILE.email}`} className="font-bold text-[#0d0d0d] text-sm underline hover:text-[#77756f]">
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#0d0d0d]/10">
              <blockquote className="font-serif-italic text-lg text-[#3a3a3a] leading-snug">
                "{PROFILE.quote}"
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
