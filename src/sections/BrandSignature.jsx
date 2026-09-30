"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { num: "01", label: "Learn", sub: "Theory meets purpose" },
  { num: "02", label: "Build", sub: "Connect the circuit" },
  { num: "03", label: "Break", sub: "Push it to its limits" },
  { num: "04", label: "Debug", sub: "Find out exactly why" },
  { num: "05", label: "Create", sub: "Ship something real" },
];

function safeFallback(elements) {
  elements.forEach((el) => {
    if (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    }
  });
}

export default function BrandSignature() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const stagesRef = useRef([]);
  const dividerRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          safeFallback([
            headlineRef.current,
            subRef.current,
            dividerRef.current,
            ...stagesRef.current,
          ]);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "80px" }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      safeFallback([headlineRef.current, subRef.current, dividerRef.current, ...stagesRef.current]);
      return () => obs.disconnect();
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      const rect = sectionRef.current?.getBoundingClientRect();
      const alreadyVisible = rect && rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

      if (alreadyVisible) {
        safeFallback([headlineRef.current, subRef.current, dividerRef.current, ...stagesRef.current]);
        return;
      }

      gsap.fromTo(
        [headlineRef.current, subRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
          onComplete: () => safeFallback([headlineRef.current, subRef.current]),
        }
      );
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          onComplete: () => { if (dividerRef.current) dividerRef.current.style.opacity = "1"; },
        }
      );
      gsap.fromTo(
        stagesRef.current.filter(Boolean),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
          onComplete: () => safeFallback(stagesRef.current.filter(Boolean)),
        }
      );
    }, sectionRef);

    return () => { obs.disconnect(); ctx.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brand"
      className="py-20 sm:py-28 bg-embeddly-navy relative overflow-hidden"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(46,90,255,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-embeddly-blue/10 blur-[80px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Headline */}
        <div className="text-center mb-14 sm:mb-18">
          <p
            ref={headlineRef}
            className="font-heading text-[10px] sm:text-xs tracking-[0.35em] uppercase text-embeddly-blue font-bold mb-5"
          >
            The Embeddly Philosophy
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
            Real engineering isn&apos;t{" "}
            <span className="text-embeddly-blue">learned by watching.</span>
          </h2>
          <p
            ref={subRef}
            className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            At Embeddly, you connect the circuit, write the firmware, make mistakes,
            debug the board and understand why it works. The objective isn&apos;t to finish
            another course. The objective is to finish something that{" "}
            <em className="text-white not-italic font-semibold">works</em>.
          </p>
        </div>

        {/* Divider line */}
        <div
          ref={dividerRef}
          className="w-full h-px bg-gradient-to-r from-transparent via-embeddly-blue/40 to-transparent mb-14 origin-left"
        />

        {/* 5-Stage Process */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {STAGES.map((stage, i) => (
            <div
              key={stage.num}
              ref={(el) => (stagesRef.current[i] = el)}
              className="relative group"
            >
              {/* Connector arrow (desktop only) */}
              {i < STAGES.length - 1 && (
                <div className="hidden lg:block absolute top-6 -right-3 text-embeddly-blue/40 text-lg font-bold z-10">
                  →
                </div>
              )}

              <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-embeddly-blue/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 group-hover:shadow-[0_0_24px_rgba(46,90,255,0.15)] h-full">
                <div className="text-embeddly-blue font-heading text-xs font-bold tracking-widest mb-3 uppercase">
                  {stage.num}
                </div>
                <div className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                  {stage.label}
                </div>
                <div className="text-slate-400 text-xs sm:text-sm leading-snug">
                  {stage.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
