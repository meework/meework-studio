"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const contactRef = useRef<HTMLDivElement>(null);
  const isOpen = useRef(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Set overlay hidden initially without flash
    gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(linkRefs.current, { y: 50, opacity: 0 });
    gsap.set(contactRef.current, { y: 20, opacity: 0 });
  }, []);

  const openMenu = useCallback(() => {
    if (isOpen.current) return;
    isOpen.current = true;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();
    tl.to(overlayRef.current, {
      autoAlpha: 1,
      pointerEvents: "auto",
      duration: 0.45,
      ease: "power2.out",
    })
      .to(
        linkRefs.current,
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.2"
      )
      .to(
        contactRef.current,
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        "-=0.25"
      );
  }, []);

  const closeMenu = useCallback((cb?: () => void) => {
    if (!isOpen.current) return;
    isOpen.current = false;
    document.body.style.overflow = "";

    const tl = gsap.timeline({
      onComplete: cb,
    });
    tl.to(contactRef.current, { y: 10, opacity: 0, duration: 0.25, ease: "power2.in" })
      .to(
        linkRefs.current,
        {
          y: -20,
          opacity: 0,
          stagger: { each: 0.04, from: "end" },
          duration: 0.35,
          ease: "power2.in",
        },
        "-=0.15"
      )
      .to(
        overlayRef.current,
        {
          autoAlpha: 0,
          pointerEvents: "none",
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.15"
      )
      // Reset positions for next open
      .set(linkRefs.current, { y: 50, opacity: 0 })
      .set(contactRef.current, { y: 20, opacity: 0 });
  }, []);

  const doScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (el: Element, opts: object) => void } | undefined;
    if (lenis) {
      lenis.scrollTo(el, { offset: 0 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollTo = (id: string) => {
    if (isOpen.current) {
      closeMenu(() => setTimeout(() => doScroll(id), 50));
    } else {
      doScroll(id);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
        style={{ opacity: 0 }}
      >
        <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">
          Meework<span className="text-red-500">.</span>Studio
        </span>
        <div className="hidden gap-8 md:flex">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={openMenu}
          className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-widest text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          Menu
        </button>
      </nav>

      {/* Overlay — always in DOM, GSAP controls visibility */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] flex flex-col justify-between px-10 py-8"
        style={{
          background: "rgba(0,0,0,0.97)",
          backdropFilter: "blur(24px)",
          willChange: "opacity",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">
            Meework<span className="text-red-500">.</span>Studio
          </span>
          <button
            onClick={() => closeMenu()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/50 transition-colors hover:border-white/50 hover:text-white"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((item, i) => (
            <button
              key={item.label}
              ref={(el) => { linkRefs.current[i] = el; }}
              onClick={() => scrollTo(item.id)}
              className="group flex items-center justify-between border-b border-white/10 py-6 text-left"
              style={{ willChange: "transform, opacity" }}
            >
              <span className="text-5xl font-bold uppercase tracking-tight text-white transition-colors duration-200 group-hover:text-red-400 md:text-7xl">
                {item.label}
              </span>
              <span className="text-white/30 transition-colors duration-200 group-hover:text-red-400">→</span>
            </button>
          ))}
        </nav>

        <div
          ref={contactRef}
          className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between"
          style={{ willChange: "transform, opacity" }}
        >
          <a
            href="mailto:meeworkofficial@gmail.com"
            className="text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
          >
            meeworkofficial@gmail.com
          </a>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/meeworkofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61582669813302"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
