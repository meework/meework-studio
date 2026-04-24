"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ContentSections from "@/components/ContentSections";
import Navbar from "@/components/Navbar";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function ClientShell() {
  return (
    <SmoothScroll>
      <Scene3D />
      <Navbar />
      <main>
        <HeroSection />
        <ContentSections />
        <footer className="relative z-10 flex flex-col items-center justify-center gap-2 py-16 border-t border-white/5">
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-white/50">
            Meework<span className="text-red-500">.</span>Studio
          </span>
          <p className="text-xs text-white/20">© 2026 Meetang · All rights reserved.</p>
        </footer>
      </main>
    </SmoothScroll>
  );
}
