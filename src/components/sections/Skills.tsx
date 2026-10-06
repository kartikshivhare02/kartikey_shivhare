"use client";

import { useState } from "react";
import { SKILLS, SKILL_GROUPS, SkillItem } from "@/lib/data";
import TechLogo, { BRAND_MAP } from "@/components/ui/TechLogo";

export default function Skills() {
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS[0]);

  return (
    <section id="skills" className="section-padding bg-[#f4f2ee] relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-10">
          <div className="rv font-mono-tag text-xs font-semibold tracking-widest text-[#77756f] uppercase mb-2">
            02 — Technical Stack
          </div>
          <h2 className="rv font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0d0d0d]">
            The periodic table of my stack<span className="font-serif-italic ml-2">.</span>
          </h2>
        </div>

        {/* Filter Chips */}
        <div className="rv flex flex-wrap gap-2 mb-10">
          {SKILL_GROUPS.map((group) => {
            const isActive = selectedGroup === group;
            return (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-[#0d0d0d] text-white shadow-md"
                    : "bg-white/70 text-[#3a3a3a] border border-[#0d0d0d]/10 hover:border-[#0d0d0d] hover:bg-white"
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        {/* Grid + Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Table Grid (8 cols on desktop, 4 cols on mobile) */}
          <div className="rv grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
            {SKILLS.map((skill, index) => {
              const row = Math.floor(index / 8);
              const col = index % 8;
              const delayMs = (row + col) * 40;

              const isMatch =
                selectedGroup === "All" || skill.family === selectedGroup;

              const isSelected = activeSkill.name === skill.name;
              const brand = SKILLS.find((s) => s.name === skill.name);

              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onFocus={() => setActiveSkill(skill)}
                  onClick={() => setActiveSkill(skill)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Skill tile ${skill.name}`}
                  className={`pill-card aspect-square p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-300 relative outline-none ${
                    isMatch ? "opacity-100 scale-100" : "opacity-30 scale-95"
                  } ${
                    isSelected
                      ? "ring-2 ring-[#0d0d0d] bg-white shadow-lg translate-y-[-4px]"
                      : "hover:translate-y-[-2px]"
                  }`}
                  style={
                    {
                      "--i": (row + col) * 0.5,
                      transitionDelay: `${delayMs}ms`,
                    } as React.CSSProperties
                  }
                >
                  {/* Top Row: Atomic Number + Logo indicator */}
                  <div className="flex items-center justify-between w-full font-mono-tag text-[10px] text-[#77756f]">
                    <span>{skill.atomicNumber}</span>
                    <TechLogo logoKey={skill.logoKey} size={14} className="opacity-70" />
                  </div>

                  {/* Symbol */}
                  <div className="text-center font-display text-xl font-bold text-[#0d0d0d] my-auto">
                    {skill.symbol}
                  </div>

                  {/* Name */}
                  <div className="text-center font-mono-tag text-[9px] font-medium text-[#3a3a3a] truncate w-full">
                    {skill.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide on desktop) */}
          <div className="lg:sticky lg:top-28 w-full">
            <div className="pill-card p-6 bg-white border border-[#0d0d0d]/10 shadow-xl flex flex-col items-center text-center">
              <span className="font-mono-tag text-[10px] font-bold text-[#77756f] uppercase tracking-widest self-start mb-4">
                02.1 — Skill Inspector
              </span>

              {/* Pop Logo Display (150px) */}
              <div className="w-[150px] h-[150px] rounded-3xl bg-[#f4f2ee] p-6 flex items-center justify-center mb-6 shadow-inner relative group overflow-hidden transition-all duration-500 transform hover:scale-105">
                {/* Brand glow if brand logo */}
                {activeSkill.isBrand && BRAND_MAP[activeSkill.logoKey] && (
                  <div
                    className="absolute inset-0 opacity-20 blur-xl transition-all duration-500"
                    style={{ backgroundColor: BRAND_MAP[activeSkill.logoKey].color }}
                  />
                )}
                <TechLogo
                  logoKey={activeSkill.logoKey}
                  size={100}
                  className="relative z-10 drop-shadow-md transition-transform duration-300 animate-pop"
                />
              </div>

              {/* Details */}
              <h3 className="font-display text-2xl font-bold text-[#0d0d0d] mb-1">
                {activeSkill.name}
              </h3>
              <span className="inline-block px-3 py-1 rounded-full bg-[#f4f2ee] text-[#77756f] font-mono-tag text-xs font-semibold mb-6">
                {activeSkill.family}
              </span>

              {/* Projects using this skill */}
              <div className="w-full text-left border-t border-[#0d0d0d]/10 pt-4">
                <span className="font-mono-tag text-[10px] font-bold text-[#77756f] uppercase tracking-wider block mb-2">
                  Applied in Projects:
                </span>
                <ul className="space-y-2">
                  {activeSkill.projectsUsed.map((proj, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs font-semibold text-[#0d0d0d] bg-[#f4f2ee]/60 px-3 py-2 rounded-xl"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                      <span>{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
