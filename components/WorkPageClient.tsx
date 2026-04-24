"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactModal from "@/components/ContactModal";

const WorkBackground3D = dynamic(() => import("@/components/WorkBackground3D"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "football",
    label: "Football",
    number: "01",
    description: "Match graphics, derby posters, league content, and matchday visuals crafted for the energy of the game.",
    tags: ["Match Graphics", "Derby Posters", "League Content", "Matchday"],
    href: "/work/football",
    external: false,
  },
  {
    id: "formula1",
    label: "Formula 1",
    number: "02",
    description: "Race day visuals, grand prix posters, driver profiles, and constructor season graphics.",
    tags: ["Race Day", "Grand Prix", "Driver Profile", "Constructor"],
    href: "/work/formula1",
    external: false,
  },
  {
    id: "cars",
    label: "Cars",
    number: "03",
    description: "Automotive editorial, supercar showcases, and JDM street photography — visual storytelling for machines.",
    tags: ["Editorial", "Supercar", "JDM", "Automotive"],
    href: "/work/cars",
    external: false,
  },
  {
    id: "webdesign",
    label: "Web Design",
    number: "04",
    description: "Immersive 3D motion websites and interactive digital experiences for studios and brands.",
    tags: ["3D Motion", "Interactive", "Studio", "Brand"],
    href: null,
    external: false,
  },
];

export default function WorkPageClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    cardRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen text-white">
      <WorkBackground3D />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-black/90 px-8 py-5 backdrop-blur-md">
        <Link href="/" className="text-sm font-bold tracking-[0.2em] uppercase text-white">
          Meework<span className="text-red-500">.</span>Studio
        </Link>
        <div className="hidden gap-8 md:flex">
          {["Work", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Work" ? "/work" : `/#${item.toLowerCase()}`}
              className={`text-xs uppercase tracking-widest transition ${
                item === "Work" ? "text-white" : "text-white/40 hover:text-white"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-widest text-white/70 transition hover:border-white/50 hover:text-white"
        >
          Get Started
        </button>
      </nav>

      <main className="relative z-10 px-8 pb-32 pt-16 md:px-16">
        {/* Header */}
        <div className="mb-20 max-w-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-red-400">Portfolio</p>
          <h1
            ref={headingRef}
            className="text-7xl font-bold leading-none tracking-tight text-white md:text-9xl"
            style={{ opacity: 0 }}
          >
            Our<br />Work
          </h1>
        </div>

        {/* Category cards */}
        <div className="flex flex-col gap-px border border-white/5">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="group relative border-b border-white/5 px-8 py-12 transition-colors duration-300 hover:bg-white/[0.02] md:px-12"
              style={{ opacity: 0 }}
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                {/* Left */}
                <div className="max-w-lg">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs text-white/20">{cat.number}</span>
                    <div className="h-px w-8 bg-white/10" />
                  </div>
                  <h2 className="mb-4 text-4xl font-bold tracking-tight text-white transition-colors group-hover:text-white md:text-6xl">
                    {cat.label}
                  </h2>
                  <p className="text-sm leading-relaxed text-white/40">
                    {cat.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="flex items-center md:pt-16">
                  {cat.href ? (
                    <Link
                      href={cat.href}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-white/40 transition duration-300 group-hover:border-white/50 group-hover:text-white"
                    >
                      →
                    </Link>
                  ) : (
                    <button
                      onClick={() => setModalOpen(true)}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-white/40 transition duration-300 group-hover:border-red-500/50 group-hover:text-red-400"
                    >
                      →
                    </button>
                  )}
                </div>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-red-500/40 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 flex flex-col items-start gap-4">
          <div className="h-px w-16 bg-white/10" />
          <p className="text-white/30 text-sm max-w-xs">
            All work is available on Instagram. Want to collaborate?
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href="https://www.instagram.com/meeworkofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-widest text-white/60 transition hover:border-white/40 hover:text-white"
            >
              Instagram →
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-widest text-black font-medium transition hover:bg-red-400 hover:text-white"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center gap-2 border-t border-white/5 py-12">
        <Link href="/" className="text-sm font-bold tracking-[0.2em] uppercase text-white/30 transition hover:text-white">
          Meework<span className="text-red-500">.</span>Studio
        </Link>
        <p className="text-xs text-white/20">© 2026 Meetang · All rights reserved.</p>
      </footer>

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
