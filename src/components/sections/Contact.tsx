"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { scrollToTarget } = useScroll();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const titleLines = ["Let's build", "something together."];

  return (
    <section id="contact" className="section-padding bg-[#f4f2ee] relative pt-24 pb-12 overflow-hidden border-t border-[#0d0d0d]/10">
      <div className="section-container relative z-10 flex flex-col justify-between min-h-[70vh]">
        {/* Main Content */}
        <div>
          <div className="rv font-mono-tag text-xs font-semibold tracking-widest text-[#77756f] uppercase mb-4">
            06 — Contact & Connect
          </div>

          {/* Interactive Letter-Hopping Huge Heading */}
          <h2 className="rv font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#0d0d0d] leading-[1.05] mb-12">
            {titleLines.map((line, lineIdx) => (
              <div key={lineIdx} className="block">
                {line.split("").map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="inline-block transition-transform duration-300 hover:-translate-y-3 cursor-default"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
                {lineIdx === 1 && <span className="font-serif-italic text-[#77756f] ml-3">.</span>}
              </div>
            ))}
          </h2>

          {/* Email with Copy Chip */}
          <div className="rv flex flex-wrap items-center gap-4 mb-10">
            <a
              href={`mailto:${PROFILE.email}`}
              className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-[#0d0d0d] underline underline-offset-8 decoration-1 hover:text-[#77756f] transition-colors"
            >
              {PROFILE.email}
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-full bg-[#0d0d0d] text-white font-mono-tag text-xs font-bold shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-2"
              aria-live="polite"
            >
              {copied ? (
                <>
                  <span className="text-emerald-400">✓</span> Copied
                </>
              ) : (
                "Copy"
              )}
            </button>
          </div>

          {/* Contact Details Grid */}
          <div className="rv grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#0d0d0d]/10">
            <div>
              <span className="font-mono-tag text-[10px] font-bold text-[#77756f] uppercase tracking-wider block mb-1">
                Direct Line
              </span>
              <a
                href={PROFILE.phoneHref}
                className="font-display text-lg font-bold text-[#0d0d0d] hover:underline"
              >
                {PROFILE.phone}
              </a>
            </div>

            <div>
              <span className="font-mono-tag text-[10px] font-bold text-[#77756f] uppercase tracking-wider block mb-1">
                Social & Dev Profiles
              </span>
              <div className="space-y-1">
                {PROFILE.linkedin && (
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-base font-bold text-[#0d0d0d] hover:underline block"
                  >
                    LinkedIn ↗
                  </a>
                )}
                {PROFILE.github && (
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-base font-bold text-[#0d0d0d] hover:underline block"
                  >
                    GitHub ↗
                  </a>
                )}
                {PROFILE.leetcode && (
                  <a
                    href={PROFILE.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-base font-bold text-[#0d0d0d] hover:underline block"
                  >
                    LeetCode ↗
                  </a>
                )}
              </div>
            </div>

            <div className="relative flex items-center justify-start md:justify-end">
              {/* Spinning Circular "Say Hello" Badge */}
              <div className="relative w-24 h-24 flex items-center justify-center pointer-events-none">
                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="font-mono-tag text-[10px] font-bold uppercase tracking-widest fill-[#0d0d0d]">
                    <textPath href="#circlePath" startOffset="0%">
                      • SAY HELLO • GET IN TOUCH • LET'S TALK
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-serif-italic text-xl">
                  👋
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-[#0d0d0d]/10 flex flex-wrap items-center justify-between gap-4 font-mono-tag text-xs text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToTarget("hero")}
              className="hover:text-[#0d0d0d] underline"
            >
              Back to top ↑
            </button>
            <span>Built with Next.js & Tailwind CSS</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
