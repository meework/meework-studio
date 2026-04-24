"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import ContactModal from "@/components/ContactModal";

const WorkBackground3D = dynamic(() => import("@/components/WorkBackground3D"), { ssr: false });

interface WorkItem {
  title: string;
  tag: string;
  sub?: string;
  image?: string;
}

interface Props {
  category: string;
  number: string;
  description: string;
  instagramHref?: string;
  items: WorkItem[];
}

export default function CategoryPageClient({ category, number, description, instagramHref, items }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".work-card"),
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.7, ease: "power3.out", delay: 0.3 }
    );
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
          <Link href="/work" className="text-xs uppercase tracking-widest text-white/40 transition hover:text-white">← Work</Link>
          <Link href="/#contact" className="text-xs uppercase tracking-widest text-white/40 transition hover:text-white">Contact</Link>
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
        <div className="mb-16 max-w-xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs text-white/20">{number}</span>
            <span className="text-xs uppercase tracking-[0.3em] text-red-400">Portfolio</span>
          </div>
          <h1
            ref={headingRef}
            className="text-7xl font-bold leading-none tracking-tight text-white md:text-9xl"
            style={{ opacity: 0 }}
          >
            {category}
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-white/40 max-w-md">{description}</p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="work-card group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl border border-white/8"
              style={{ opacity: 0 }}
            >
              {/* Real image or fallback */}
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={i < 2}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-900 transition-transform duration-500 group-hover:scale-105" />
              )}

              {/* Dark gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Content — always visible at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[10px] uppercase tracking-widest text-red-400 mb-1">{item.tag}</p>
                <p className="text-sm font-semibold text-white leading-tight">{item.title}</p>
                {item.sub && <p className="text-[10px] text-white/50 mt-0.5">{item.sub}</p>}
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-red-500/60 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-start gap-4">
          <div className="h-px w-16 bg-white/10" />
          <p className="text-sm text-white/30">See the full portfolio on Instagram</p>
          <div className="flex gap-3 mt-1">
            {instagramHref && (
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-widest text-white/60 transition hover:border-white/40 hover:text-white"
              >
                @meeworkofficial →
              </a>
            )}
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-widest text-black font-medium transition hover:bg-red-400 hover:text-white"
            >
              Commission Work
            </button>
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-2 border-t border-white/5 py-12">
        <Link href="/work" className="text-xs uppercase tracking-widest text-white/20 transition hover:text-white">
          ← Back to Work
        </Link>
        <p className="text-xs text-white/10 mt-1">© 2026 Meetang · Meework Studio</p>
      </footer>

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
