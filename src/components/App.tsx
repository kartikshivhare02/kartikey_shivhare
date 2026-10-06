"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import RevealObserver from "@/components/ui/RevealObserver";
import { ScrollProvider } from "@/lib/scroll";

export default function App() {
  return (
    <ScrollProvider>
      <RevealObserver />
      <div className="relative min-h-screen bg-[#f4f2ee] text-[#0d0d0d] selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Work />
          <Experience />
          <Achievements />
          <Contact />
        </main>
      </div>
    </ScrollProvider>
  );
}
