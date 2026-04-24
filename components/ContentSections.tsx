"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactModal from "@/components/ContactModal";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: "work",
    number: "01",
    tag: "Portfolio",
    title: "Sports & Automotive Design",
    body: "Match graphics, derby posters, league content, Formula 1 race visuals, automotive photography, and web design — crafted for impact.",
    cta: "View Work",
    ctaHref: "/work",
    external: false,
  },
  {
    id: "about",
    number: "02",
    tag: "About",
    title: "Meework Studio",
    body: "Based in Thailand. Specializing in sports and automotive graphic design — Football, F1, Cars and beyond. Visual content that captures the energy of sport.",
    cta: null,
    ctaHref: null,
    external: false,
  },
  {
    id: "services",
    number: "03",
    tag: "Services",
    title: "What We Do",
    body: "Matchday graphics · Race day visuals · Social media content · Automotive design · Brand identity · Motion graphics",
    cta: null,
    ctaHref: null,
    external: false,
  },
  {
    id: "contact",
    number: "04",
    tag: "Contact",
    title: "Let's Create Together",
    body: "Interested in collaborations, commissions, or just want to say hello? Reach out — let's make something great.",
    cta: "Get In Touch",
    ctaHref: null,
    external: false,
    isContact: true,
  },
];

export default function ContentSections() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    sectionRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll(".reveal"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <div className="relative z-10">
        {sections.map((s, i) => (
          <section
            key={i}
            id={s.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="flex min-h-screen items-center px-8 md:px-24"
          >
            <div className="max-w-2xl">
              <div className="reveal flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-white/30 tracking-widest uppercase">{s.number}</span>
                <span className="text-xs uppercase tracking-widest text-red-400">{s.tag}</span>
              </div>
              <h2 className="reveal mt-2 text-5xl font-bold leading-tight text-white md:text-7xl">
                {s.title}
              </h2>
              <p className="reveal mt-6 text-lg leading-relaxed text-white/50">
                {s.body}
              </p>
              <div className="reveal mt-8 h-px w-16 bg-red-500/40" />

              {s.cta && (
                <div className="reveal mt-8">
                  {s.external && s.ctaHref ? (
                    <a
                      href={s.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm text-white transition hover:border-red-400 hover:text-red-400"
                    >
                      {s.cta} <span>→</span>
                    </a>
                  ) : s.ctaHref ? (
                    <Link
                      href={s.ctaHref}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm text-white transition hover:border-red-400 hover:text-red-400"
                    >
                      {s.cta} <span>→</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-red-400 hover:text-white"
                    >
                      {s.cta} <span>→</span>
                    </button>
                  )}
                </div>
              )}

              {s.id === "contact" && (
                <div className="reveal mt-8 flex flex-col gap-3">
                  <a
                    href="mailto:meeworkofficial@gmail.com"
                    className="group flex items-center gap-3 text-white/50 transition hover:text-white"
                  >
                    <span className="text-xs uppercase tracking-widest">Email</span>
                    <span className="text-sm">meeworkofficial@gmail.com</span>
                    <span className="text-white/30 group-hover:text-red-400 transition">→</span>
                  </a>
                  <a
                    href="https://www.instagram.com/meeworkofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-white/50 transition hover:text-white"
                  >
                    <span className="text-xs uppercase tracking-widest">Instagram</span>
                    <span className="text-sm">@meeworkofficial</span>
                    <span className="text-white/30 group-hover:text-red-400 transition">→</span>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61582669813302"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-white/50 transition hover:text-white"
                  >
                    <span className="text-xs uppercase tracking-widest">Facebook</span>
                    <span className="text-sm">Meework Official</span>
                    <span className="text-white/30 group-hover:text-red-400 transition">→</span>
                  </a>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
