"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactModal from "@/components/ContactModal";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(headingRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");
  }, []);

  const handleExplore = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
        <h1
          ref={headingRef}
          className="max-w-4xl text-6xl font-bold leading-tight tracking-tight text-white md:text-8xl"
          style={{ opacity: 0 }}
        >
          Beyond
          <br />
          <span className="bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dimensions
          </span>
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-xl text-lg text-white/50 md:text-xl"
          style={{ opacity: 0 }}
        >
          Graphic Design Studio
        </p>

        <div ref={ctaRef} className="mt-12 flex gap-4" style={{ opacity: 0 }}>
          <button
            onClick={handleExplore}
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10 hover:border-white/40"
          >
            Explore Work
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition hover:bg-red-400 hover:text-white"
          >
            Get Started
          </button>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-white/30">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
