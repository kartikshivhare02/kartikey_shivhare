"use client";

import Image from "next/image";

export const BRAND_MAP: Record<string, { src: string; alt: string; color: string }> = {
  python: { src: "/logos/python.svg", alt: "Python", color: "#3776AB" },
  c: { src: "/logos/c.svg", alt: "C Language", color: "#A8B9CC" },
  cplusplus: { src: "/logos/cplusplus.svg", alt: "C++", color: "#00599C" },
  mysql: { src: "/logos/mysql.svg", alt: "MySQL", color: "#4479A1" },
  mongodb: { src: "/logos/mongodb.svg", alt: "MongoDB", color: "#47A248" },
  pandas: { src: "/logos/pandas.svg", alt: "Pandas", color: "#150458" },
  numpy: { src: "/logos/numpy.svg", alt: "NumPy", color: "#013243" },
  git: { src: "/logos/git.svg", alt: "Git", color: "#F05032" },
  github: { src: "/logos/github.svg", alt: "GitHub", color: "#181717" },
  jupyter: { src: "/logos/jupyter.svg", alt: "Jupyter", color: "#F37626" },
  powerbi: { src: "/logos/powerbi.svg", alt: "Power BI", color: "#F2C811" },
  excel: { src: "/logos/excel.svg", alt: "Microsoft Excel", color: "#217346" },
  claude: { src: "/logos/claude.svg", alt: "Claude", color: "#D97757" },
  gemini: { src: "/logos/gemini.svg", alt: "Google Gemini", color: "#8E75FF" },
  openai: { src: "/logos/openai.svg", alt: "ChatGPT / OpenAI", color: "#10A37F" },
  leetcode: { src: "/logos/leetcode.svg", alt: "LeetCode", color: "#FFA116" },
  codechef: { src: "/logos/codechef.svg", alt: "CodeChef", color: "#5B4638" },
  geeksforgeeks: { src: "/logos/geeksforgeeks.svg", alt: "GeeksforGeeks", color: "#2F8D46" },
  hackerrank: { src: "/logos/hackerrank.svg", alt: "HackerRank", color: "#2EC866" },
};

export function isBrand(logoKey: string): boolean {
  return logoKey in BRAND_MAP;
}

interface TechLogoProps {
  logoKey: string;
  size?: number;
  className?: string;
}

export default function TechLogo({ logoKey, size = 24, className = "" }: TechLogoProps) {
  if (isBrand(logoKey)) {
    const brand = BRAND_MAP[logoKey];
    return (
      <div 
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={brand.src}
          alt={brand.alt}
          width={size}
          height={size}
          className="object-contain"
        />
      </div>
    );
  }

  // Concept thin line icons
  return (
    <div 
      className={`flex items-center justify-center text-current ${className}`}
      style={{ width: size, height: size }}
    >
      {logoKey === "concept-data" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      )}
      {logoKey === "concept-eda" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )}
      {logoKey === "concept-ml" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="8" height="8" rx="2" />
          <rect x="14" y="2" width="8" height="8" rx="2" />
          <rect x="8" y="14" width="8" height="8" rx="2" />
          <path d="M6 10v2a2 2 0 002 2h4" />
          <path d="M18 10v2a2 2 0 01-2 2h-4" />
        </svg>
      )}
      {logoKey === "concept-dl" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="18" r="3" />
          <line x1="9" y1="6" x2="15" y2="6" />
          <line x1="9" y1="18" x2="15" y2="18" />
          <line x1="6" y1="9" x2="6" y2="15" />
          <line x1="18" y1="9" x2="18" y2="15" />
          <line x1="8.1" y1="8.1" x2="15.9" y2="15.9" />
        </svg>
      )}
      {logoKey === "concept-nlp" && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="14" y2="13" />
        </svg>
      )}
    </div>
  );
}
