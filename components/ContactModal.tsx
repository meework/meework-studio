"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  onClose: () => void;
}

export default function ContactModal({ onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(cardRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = () => {
    gsap.to(cardRef.current, { y: 40, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-end justify-center p-4 md:items-center"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
    >
      <div
        ref={cardRef}
        className="w-full max-w-lg rounded-2xl border border-white/10 p-8 md:p-10"
        style={{ background: "rgba(10,10,10,0.95)" }}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-red-400">Get In Touch</p>
            <h2 className="mt-1 text-3xl font-bold text-white">Let&apos;s Work Together</h2>
          </div>
          <button onClick={close} className="text-white/40 transition hover:text-white text-xl leading-none mt-1">✕</button>
        </div>

        <div className="mb-8 space-y-3">
          <a
            href="mailto:meeworkofficial@gmail.com"
            className="flex items-center justify-between rounded-xl border border-white/10 px-5 py-4 transition hover:border-red-500/40 hover:bg-white/5 group"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Email</p>
              <p className="text-sm text-white">meeworkofficial@gmail.com</p>
            </div>
            <span className="text-white/30 transition group-hover:text-red-400">→</span>
          </a>

          <a
            href="https://www.instagram.com/meeworkofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-white/10 px-5 py-4 transition hover:border-red-500/40 hover:bg-white/5 group"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Instagram</p>
              <p className="text-sm text-white">@meeworkofficial</p>
            </div>
            <span className="text-white/30 transition group-hover:text-red-400">→</span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61582669813302"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-white/10 px-5 py-4 transition hover:border-red-500/40 hover:bg-white/5 group"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Facebook</p>
              <p className="text-sm text-white">Meework Official</p>
            </div>
            <span className="text-white/30 transition group-hover:text-red-400">→</span>
          </a>
        </div>

        <p className="text-center text-xs text-white/30">
          © 2026 Meetang · Meework Studio · All rights reserved.
        </p>
      </div>
    </div>
  );
}
