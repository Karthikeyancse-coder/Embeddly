"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Play, Cpu, Zap } from "lucide-react";
import { kalam } from "@/lib/fonts";
import VideoPlayer from "@/components/VideoPlayer";

const EmbeddlyRobot = dynamic(() => import("@/components/EmbeddlyRobot"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] sm:h-[540px] lg:h-[580px] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-embeddly-blue/20 border-t-embeddly-blue animate-spin" />
    </div>
  ),
});

export default function Hero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const headlineRef = useRef(null);
  const subRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Progressive reveal — never hidden by animation
  useEffect(() => {
    if (headlineRef.current) headlineRef.current.style.opacity = "1";
    if (subRef.current) subRef.current.style.opacity = "1";
  }, []);

  return (
    <section id="home" className="pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden relative">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(46,90,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(46,90,255,0.035) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

          {/* ─── Left Column ─── */}
          <div className="lg:col-span-7 flex flex-col items-start">

            {/* EDDY intro pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              EDDY is ready to build.
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="font-heading text-[2.6rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-bold text-slate-900 leading-[1.06] tracking-tight mb-5"
            >
              Don&apos;t Just{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-embeddly-blue via-blue-600 to-[#0042E0] bg-clip-text text-transparent">
                  Learn
                </span>
              </span>{" "}
              Electronics.{" "}
              <span className="block mt-1 text-slate-900">Build It.</span>
            </h1>

            {/* Sub headline */}
            <p
              ref={subRef}
              className="text-slate-500 text-base sm:text-lg leading-relaxed mb-3 max-w-xl font-medium"
            >
              From your first circuit to your first working prototype.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Embeddly is a practical engineering platform where students learn
              electronics, embedded systems and hardware by building real
              things — not simply watching someone else build them.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#enroll"
                onClick={(e) => { e.preventDefault(); scrollTo("enroll"); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-embeddly-amber hover:bg-embeddly-amber-hover text-slate-900 font-heading font-bold text-sm sm:text-base shadow-amber-glow hover:shadow-[0_8px_24px_rgba(255,176,32,0.45)] transition-all duration-300 group cursor-pointer select-none"
              >
                Start Building
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-3 group cursor-pointer"
                aria-label="See how we build"
              >
                <div className="w-11 h-11 rounded-full bg-embeddly-blue text-white flex items-center justify-center pulse-ring-btn shadow-blue-glow group-hover:scale-105 transition-transform duration-300">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold text-slate-900 group-hover:text-embeddly-blue transition-colors">
                    See How We Build
                  </div>
                  <div className="text-xs text-slate-500">
                    Inside a build session
                  </div>
                </div>
              </button>
            </div>

            {/* Quick facts */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-5 border-t border-slate-200/80">
              {[
                { icon: Cpu, label: "Real Hardware" },
                { icon: Zap, label: "Hands-on Projects" },
                { icon: ArrowRight, label: "Prototype Outcomes" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="inline-flex items-center gap-2 text-slate-600 text-sm font-semibold">
                  <Icon className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ─── Right Column: Robot ─── */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* EDDY label — top left */}
            <div className="absolute top-2 left-4 z-20 hidden md:block select-none pointer-events-none animate-note-fade-in">
              <div
                className={`${kalam.className} text-[20px] leading-[0.95] text-embeddly-blue`}
                style={{ fontWeight: 700 }}
              >
                <span className="block text-[11px] font-heading tracking-widest text-slate-400 uppercase mb-1 font-bold">
                  Meet
                </span>
                <span className="block text-[2rem] text-embeddly-blue">EDDY</span>
              </div>
              <div className="text-xs text-slate-500 font-heading font-semibold mt-0.5">
                Your build companion.
              </div>
            </div>

            {/* Annotation — top right */}
            <div className="absolute top-2 right-3 sm:right-5 z-20 hidden md:block select-none pointer-events-none animate-note-fade-in">
              <div
                className={`${kalam.className} text-[13px] leading-[1.1] text-right text-slate-400`}
                style={{ fontWeight: 700 }}
              >
                <span className="block">Circuit</span>
                <span className="block">→ Code</span>
                <span className="block">→ Build</span>
              </div>
            </div>

            {/* Robot */}
            <div className="relative w-full flex items-center justify-center">
              <EmbeddlyRobot />
            </div>

            {/* Floating badge — lower left */}
            <div className="animate-float-1 absolute bottom-10 sm:bottom-4 left-2 sm:left-3 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-card-md flex items-center gap-3 z-20">
              <div className="w-9 h-9 rounded-xl bg-embeddly-blue-subtle text-embeddly-blue font-mono font-bold flex items-center justify-center text-sm border border-embeddly-blue/15">
                &lt;/&gt;
              </div>
              <div>
                <div className="font-heading text-xs font-bold text-slate-900 leading-tight">
                  Firmware Ready
                </div>
                <div className="text-[11px] text-slate-500">
                  Write. Flash. Run.
                </div>
              </div>
            </div>

            {/* Floating badge — upper right */}
            <div className="animate-float-2 absolute top-14 sm:top-16 -right-1 sm:right-0 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-card-md flex items-center gap-3 z-20">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base border border-amber-200">
                ⚡
              </div>
              <div>
                <div className="font-heading text-xs font-bold text-slate-900 leading-tight">
                  Circuit Live
                </div>
                <div className="text-[11px] text-slate-500">
                  First prototype
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoPlayer isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </section>
  );
}
