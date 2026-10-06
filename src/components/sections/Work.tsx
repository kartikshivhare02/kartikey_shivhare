"use client";

import { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import TechLogo from "@/components/ui/TechLogo";

export default function Work() {
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="section-padding bg-[#f4f2ee] relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-12">
          <div className="rv font-mono-tag text-xs font-semibold tracking-widest text-[#77756f] uppercase mb-2">
            03 — Selected Work
          </div>
          <h2 className="rv font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0d0d0d]">
            Things I've built<span className="font-serif-italic ml-2">.</span>
          </h2>
        </div>

        {/* Desktop Expanding Accordion Gallery (side by side, height: min(78svh, 600px)) */}
        <div className="hidden lg:flex items-stretch gap-4 h-[min(78svh,600px)] w-full">
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProjectId(project.id)}
                onFocus={() => setActiveProjectId(project.id)}
                onClick={() => setActiveProjectId(project.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                aria-label={`Project ${project.title}`}
                className={`pill-card overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative outline-none flex ${
                  isOpen ? "flex-[8] bg-white shadow-2xl" : "flex-[1] bg-white/70 hover:bg-white cursor-pointer"
                }`}
              >
                {/* Closed Slim Spine */}
                {!isOpen && (
                  <div className="w-full h-full p-6 flex flex-col justify-between items-center text-center">
                    <span className="font-mono-tag text-sm font-bold text-[#77756f]">
                      {project.index}
                    </span>
                    <div className="writing-mode-vertical text-lg font-display font-bold text-[#0d0d0d] tracking-tight whitespace-nowrap rotate-180 my-auto">
                      {project.title}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[#0d0d0d]/20 flex items-center justify-center text-[#0d0d0d] font-bold text-base transition-transform duration-300 group-hover:rotate-90">
                      +
                    </div>
                  </div>
                )}

                {/* Open Expanded Panel */}
                {isOpen && (
                  <div className="w-full h-full p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-center overflow-y-auto">
                    {/* Left Details */}
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono-tag text-xs font-bold text-[#77756f]">
                            {project.index}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#f4f2ee] font-mono-tag text-[10px] font-bold text-[#3a3a3a] uppercase">
                            {project.kicker}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0d0d0d] leading-tight mb-4">
                          {project.title}
                        </h3>
                        <p className="text-[#3a3a3a] text-sm leading-relaxed mb-6 font-normal">
                          {project.description}
                        </p>

                        {/* 2-Column Feature List */}
                        <div className="mb-6">
                          <span className="font-mono-tag text-[10px] font-bold text-[#77756f] uppercase tracking-wider block mb-2">
                            Key Features:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3a3a3a]">
                            {project.features.map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="text-[#0d0d0d] font-bold">✓</span>
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        {/* Tech Chips */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full bg-[#f4f2ee] text-[#0d0d0d] font-mono-tag text-[11px] font-semibold flex items-center gap-1.5"
                            >
                              <span>{t}</span>
                            </span>
                          ))}
                        </div>

                        {/* Buttons (GitHub link only if exists) */}
                        <div className="flex items-center gap-3">
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary text-xs"
                            >
                              View on GitHub ↗
                            </a>
                          ) : (
                            <span className="font-mono-tag text-xs text-[#77756f] italic">
                              Client / Academic Project
                            </span>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary text-xs"
                            >
                              Live Site ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Grayscale Illustrative UI with "Illustrative UI" Label */}
                    <div className="relative w-full h-full min-h-[300px] rounded-2xl bg-[#f4f2ee] p-5 border border-[#0d0d0d]/10 flex flex-col justify-between overflow-hidden group">
                      {/* Top Window Bar */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#0d0d0d]/10">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                        </div>
                        <span className="font-mono-tag text-[9px] font-bold text-[#77756f] uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-md border border-[#0d0d0d]/10">
                          Illustrative UI
                        </span>
                      </div>

                      {/* Mock UI Contents based on uiType */}
                      <div className="my-auto py-4 space-y-3">
                        {project.uiType === "legal-ai" && (
                          <div className="space-y-3 font-mono-tag text-[10px]">
                            <div className="bg-white p-3 rounded-xl border border-[#0d0d0d]/10 space-y-2">
                              <div className="flex items-center justify-between text-[#77756f]">
                                <span>SEARCH QUERY</span>
                                <span className="font-bold text-[#0d0d0d]">AI PARSER ACTIVE</span>
                              </div>
                              <div className="font-bold text-[#0d0d0d]">"Commercial arbitration section 34 precedents"</div>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-[#0d0d0d]/10 space-y-1.5">
                              <div className="h-2 w-3/4 bg-gray-800 rounded" />
                              <div className="h-2 w-1/2 bg-gray-400 rounded" />
                              <div className="h-2 w-5/6 bg-gray-300 rounded" />
                            </div>
                          </div>
                        )}

                        {project.uiType === "dashboard" && (
                          <div className="space-y-3 font-mono-tag text-[10px]">
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-white p-2.5 rounded-xl border border-[#0d0d0d]/10 text-center">
                                <div className="text-[#77756f]">ATTENDANCE</div>
                                <div className="text-lg font-bold text-[#0d0d0d]">94.2%</div>
                              </div>
                              <div className="bg-white p-2.5 rounded-xl border border-[#0d0d0d]/10 text-center">
                                <div className="text-[#77756f]">QUIZ AVG</div>
                                <div className="text-lg font-bold text-[#0d0d0d]">8.8/10</div>
                              </div>
                              <div className="bg-white p-2.5 rounded-xl border border-[#0d0d0d]/10 text-center">
                                <div className="text-[#77756f]">ENGAGED</div>
                                <div className="text-lg font-bold text-[#0d0d0d]">ACTIVE</div>
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-[#0d0d0d]/10 h-24 flex items-end justify-between gap-1.5">
                              <div className="w-full bg-gray-300 h-1/2 rounded-t" />
                              <div className="w-full bg-gray-400 h-3/4 rounded-t" />
                              <div className="w-full bg-[#0d0d0d] h-full rounded-t" />
                              <div className="w-full bg-gray-400 h-2/3 rounded-t" />
                              <div className="w-full bg-gray-300 h-1/3 rounded-t" />
                            </div>
                          </div>
                        )}

                        {project.uiType === "ecommerce" && (
                          <div className="space-y-3 font-mono-tag text-[10px]">
                            <div className="bg-white p-3 rounded-xl border border-[#0d0d0d]/10 flex items-center justify-between">
                              <span className="font-bold text-[#0d0d0d]">angelixbysuraj.shop & Vrindavan</span>
                              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">LIVE PORTAL</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-white p-3 rounded-xl border border-[#0d0d0d]/10 space-y-2">
                                <div className="h-12 bg-gray-200 rounded-lg" />
                                <div className="h-2 w-3/4 bg-gray-800 rounded" />
                              </div>
                              <div className="bg-white p-3 rounded-xl border border-[#0d0d0d]/10 space-y-2">
                                <div className="h-12 bg-gray-200 rounded-lg" />
                                <div className="h-2 w-3/4 bg-gray-800 rounded" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-[9px] font-mono-tag text-[#77756f] text-center pt-2 border-t border-[#0d0d0d]/10">
                        Design & Architecture by Kartikey Shivhare
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion Layout */}
        <div className="lg:hidden flex flex-col gap-6">
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;
            return (
              <div
                key={project.id}
                className="pill-card bg-white p-6 border border-[#0d0d0d]/10"
              >
                <div
                  onClick={() => setActiveProjectId(isOpen ? "" : project.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tag text-xs font-bold text-[#77756f]">
                      {project.index}
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#0d0d0d]">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-lg font-bold">{isOpen ? "−" : "+"}</span>
                </div>

                {isOpen && (
                  <div className="mt-6 pt-6 border-t border-[#0d0d0d]/10 space-y-4">
                    <p className="text-xs text-[#3a3a3a] leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full bg-[#f4f2ee] font-mono-tag text-[10px] font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs py-2 px-4 inline-block mt-2"
                      >
                        Live Site ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
