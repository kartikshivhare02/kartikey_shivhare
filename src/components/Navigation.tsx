"use client";

import { useEffect, useState } from "react";
import { PROFILE, NAV_ITEMS } from "@/lib/data";
import { useScroll } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollToTarget } = useScroll();
  const scrollProgress = useScrollProgress();

  // Scroll detection > 40px
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer with rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Esc key & body scroll lock for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToTarget(id);
  };

  return (
    <>
      {/* 2px ink scroll progress bar along the very top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#0d0d0d] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      <header className="fixed top-6 left-0 right-0 z-40 px-[var(--gutter)] pointer-events-none">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Left: Initials mark + Name */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={() => handleNavClick("hero")}
              aria-label="Scroll to top"
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono-tag text-xs font-semibold tracking-wider transition-all duration-500 ease-out hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[#0d0d0d] text-white shadow-md"
                  : "bg-transparent text-[#0d0d0d] border border-[#0d0d0d]/30"
              }`}
            >
              {PROFILE.initials}
            </button>
            <span
              className={`font-display font-semibold text-sm tracking-tight text-[#0d0d0d] transition-opacity duration-300 ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Desktop Navigation Pill */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 pointer-events-auto relative ${
              scrolled
                ? "bg-white/70 backdrop-blur-md border border-[#0d0d0d]/10 shadow-lg"
                : "bg-white/40 backdrop-blur-sm border border-transparent"
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 z-10 ${
                    isActive ? "text-white" : "text-[#3a3a3a] hover:text-[#0d0d0d]"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full bg-[#0d0d0d] -z-10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden pointer-events-auto">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="px-5 py-2.5 rounded-full bg-[#0d0d0d] text-white font-mono-tag text-xs font-semibold tracking-wider shadow-md hover:scale-105 active:scale-95"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay */}
      <div
        className={`fixed inset-0 bg-[#f4f2ee] z-50 flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "clip-path-open opacity-100 pointer-events-auto"
            : "clip-path-closed opacity-0 pointer-events-none"
        }`}
        style={{
          clipPath: mobileMenuOpen
            ? "circle(150% at calc(100% - 40px) 40px)"
            : "circle(0% at calc(100% - 40px) 40px)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono-tag text-xs font-semibold tracking-widest text-[#77756f] uppercase">
            Navigation
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 rounded-full border border-[#0d0d0d]/20 flex items-center justify-center text-[#0d0d0d] font-bold text-lg hover:bg-[#0d0d0d] hover:text-white"
          >
            ✕
          </button>
        </div>

        <nav aria-label="Mobile Navigation" className="flex flex-col gap-4 my-auto">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-baseline gap-4 text-left py-2 border-b border-[#0d0d0d]/10 hover:border-[#0d0d0d]"
              style={{
                transitionDelay: `${mobileMenuOpen ? idx * 0.06 : 0}s`,
              }}
            >
              <span className="font-mono-tag text-xs font-medium text-[#77756f] group-hover:text-[#0d0d0d]">
                0{idx + 1}
              </span>
              <span className="font-display text-3xl font-bold text-[#0d0d0d] tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex items-center justify-between pt-4 border-t border-[#0d0d0d]/10 text-xs text-[#77756f]">
          <span>{PROFILE.name}</span>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0d0d0d] underline"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </>
  );
}
