"use client";

import { useRef, useEffect } from "react";
import { Cpu, HardDrive, AlertTriangle, Package } from "lucide-react";

const PRINCIPLES = [
  {
    num: "01",
    icon: Cpu,
    title: "Build-First",
    desc: "You learn concepts while building. Theory is introduced in context, not in a vacuum before you touch any hardware.",
  },
  {
    num: "02",
    icon: HardDrive,
    title: "Hardware-First",
    desc: "Real components, circuits and boards — not only simulations. You work with the same tools used in actual product development.",
  },
  {
    num: "03",
    icon: AlertTriangle,
    title: "Failure Is Part of the Process",
    desc: "Debugging is treated as part of learning, not as failure. Every mistake is data. Every fix is a step forward.",
  },
  {
    num: "04",
    icon: Package,
    title: "Finish With Something Real",
    desc: "The goal is a working prototype, not just course completion. You leave with something you built with your own hands.",
  },
];

function safeFallback(elements) {
  elements.forEach((el) => {
    if (el) { el.style.opacity = "1"; el.style.transform = "none"; }
  });
}

export default function WhyDifferent() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const statementRef = useRef(null);

  useEffect(() => {
    const all = [headerRef.current, ...cardsRef.current.filter(Boolean), statementRef.current];

    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { safeFallback(all); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: "80px" }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { safeFallback(all); return () => obs.disconnect(); }

    let gsap, ScrollTrigger;
    import("gsap").then(({ default: g }) => {
      gsap = g;
      import("gsap/ScrollTrigger").then(({ ScrollTrigger: ST }) => {
        ScrollTrigger = ST;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh();

        const rect = sectionRef.current?.getBoundingClientRect();
        const visible = rect && rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
        if (visible) { safeFallback(all); return; }

        const ctx = gsap.context(() => {
          gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
            onComplete: () => { if (headerRef.current) { headerRef.current.style.opacity = "1"; headerRef.current.style.transform = "none"; } },
          });
          gsap.fromTo(cardsRef.current.filter(Boolean), { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
            onComplete: () => safeFallback(cardsRef.current.filter(Boolean)),
          });
          gsap.fromTo(statementRef.current, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
            onComplete: () => { if (statementRef.current) { statementRef.current.style.opacity = "1"; statementRef.current.style.transform = "none"; } },
          });
        }, sectionRef);

        return () => { obs.disconnect(); ctx.revert(); };
      });
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="py-20 sm:py-28 relative bg-gradient-to-b from-[#F7F9FC] to-white"
    >
      {/* Circuit trace bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg className="w-full h-full text-embeddly-circuit" viewBox="0 0 1440 700" fill="none">
          <path d="M-50 120H300L420 240H840" stroke="currentColor" strokeWidth="1" strokeDasharray="5 7" />
          <path d="M1490 200H1100L980 80H580" stroke="currentColor" strokeWidth="1" strokeDasharray="5 7" />
          <circle cx="300" cy="120" r="4" fill="currentColor" />
          <circle cx="420" cy="240" r="5" fill="#2E5AFF" fillOpacity="0.25" />
          <circle cx="1100" cy="200" r="4" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-widest uppercase mb-5">
            What Sets Us Apart
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-slate-900 leading-[1.15] tracking-tight mb-5">
            Why Embeddly Is{" "}
            <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
              Different
            </span>
          </h2>
        </div>

        {/* Principle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 mb-14">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                ref={(el) => (cardsRef.current[i] = el)}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card-md hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 flex gap-5 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-2xl bg-embeddly-blue-subtle border border-embeddly-blue/15 flex items-center justify-center group-hover:bg-embeddly-blue group-hover:border-embeddly-blue transition-all duration-300">
                    <Icon className="w-5 h-5 text-embeddly-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <div className="text-embeddly-blue font-heading text-[10px] font-bold tracking-widest uppercase mb-1">
                    {p.num}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 mb-2 group-hover:text-embeddly-blue transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strong Statement */}
        <div
          ref={statementRef}
          className="relative rounded-3xl bg-embeddly-navy p-8 sm:p-10 lg:p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-embeddly-blue/15 blur-[60px]" />
          </div>
          <div className="relative z-10">
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.2] mb-3">
              Don&apos;t Just Collect a Certificate.
            </p>
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-embeddly-blue leading-[1.2] mb-6">
              Build Something You Can Show.
            </p>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              A certificate tells employers what you studied. A working prototype tells
              them what you can do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
