"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const EXPERIENCE_ITEMS = [
  "Embedded Systems Fundamentals",
  "Microcontroller & Electronics Activities",
  "PCB Design & Soldering Exposure",
  "Guided Project Development",
  "Functional Prototype Development",
];

function safeFallback(elements) {
  elements.forEach((el) => {
    if (el) { el.style.opacity = "1"; el.style.transform = "none"; }
  });
}

export default function UpcomingEvents() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const all = [headerRef.current, cardRef.current];

    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { safeFallback(all); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: "100px" }
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
          gsap.fromTo(cardRef.current, { opacity: 0, y: 35 }, {
            opacity: 1, y: 0, duration: 0.75, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
            onComplete: () => { if (cardRef.current) { cardRef.current.style.opacity = "1"; cardRef.current.style.transform = "none"; } },
          });
        }, sectionRef);

        return () => { obs.disconnect(); ctx.revert(); };
      });
    });

    const handleLoad = () => { import("gsap/ScrollTrigger").then(({ ScrollTrigger: ST }) => ST.refresh()); };
    window.addEventListener("load", handleLoad);
    return () => { obs.disconnect(); window.removeEventListener("load", handleLoad); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-[#F7FAFF] to-white"
    >
      {/* Subtle circuit bg */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-35">
        <svg className="w-full h-full text-embeddly-circuit" viewBox="0 0 1440 900" fill="none">
          <path d="M-50 180H220L310 270H680" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" />
          <path d="M1490 220H1220L1120 120H840" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" />
          <path d="M310 270V440L420 550H920" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="220" cy="180" r="3.5" fill="currentColor" />
          <circle cx="310" cy="270" r="4.5" fill="#2E5AFF" fillOpacity="0.3" />
          <circle cx="420" cy="550" r="3.5" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF2FE] border border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-wider uppercase mb-5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 fill-current" />
            <span>What Are We Building Next?</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.15] tracking-tight mb-5">
            Build.{" "}
            <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
              Learn.
            </span>{" "}
            Connect.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Workshops, build sessions and intensive programs designed around one
            thing — making something real.
          </p>
        </div>

        {/* Single premium event card — centered */}
        <div ref={cardRef} className="flex justify-center">
          <div className="w-full max-w-[560px] bg-white rounded-3xl border border-slate-200/90 shadow-card-lg overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-8px_rgba(46,90,255,0.14)] transition-all duration-300">

            {/* Card top image */}
            <div className="relative aspect-[16/9] w-full bg-slate-100">
              <Image
                src="/images/events/embedded-bootcamp.jpg"
                alt="Embedded Systems & Hardware Internship at Embeddly"
                fill
                sizes="560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

              {/* Category badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-embeddly-blue text-white text-xs font-heading font-bold shadow-md z-10">
                <Briefcase className="w-3.5 h-3.5" />
                INTERNSHIP
              </div>

              {/* Date badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 text-center shadow-md border border-slate-100 z-10 min-w-[50px]">
                <div className="text-lg font-bold text-slate-950 font-heading leading-none">01</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5 leading-none">DEC</div>
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-4 left-5">
                <div className="font-heading text-xs font-bold text-white/80 tracking-widest uppercase">
                  Embeddly Build Lab
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="p-5 sm:p-6">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-2 hover:text-embeddly-blue transition-colors">
                Embedded Systems &amp; Hardware Internship
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                A hands-on industrial internship covering microcontrollers, sensors,
                circuits, firmware, and real-world hardware projects.
              </p>

              {/* Details */}
              <div className="space-y-2.5 mb-5 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
                  <span>December 1, 2026</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
                  <span>Approx. 2 Weeks (Offline, hands-on)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
                  <span>Sai Foundation, Sona College, Salem</span>
                </div>
              </div>

              {/* Experience includes */}
              <div className="bg-[#F7F9FC] rounded-2xl p-4 mb-5 border border-slate-100">
                <div className="text-[10px] font-heading font-bold tracking-widest text-embeddly-blue uppercase mb-3">
                  Experience Includes
                </div>
                <ul className="space-y-1.5">
                  {EXPERIENCE_ITEMS.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-embeddly-blue flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdzJmpaxI66ItK05FitoIQ7jOeOrA_vra4jAW717RMDhlQ1pw/viewform?fbzx=6666488062294828495"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full font-heading text-sm font-bold text-slate-900 bg-gradient-to-r from-embeddly-amber to-[#FFA812] hover:from-[#FFB938] hover:to-[#FF9F05] shadow-amber-glow hover:shadow-[0_8px_24px_rgba(255,176,32,0.45)] transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>Explore the Build →</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
