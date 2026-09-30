"use client";

import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="enroll" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(46,90,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(46,90,255,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-widest uppercase mb-7">
          <span className="w-2 h-2 rounded-full bg-embeddly-blue animate-pulse" />
          EDDY is ready. Are you?
        </div>

        {/* Headline */}
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-slate-900 leading-[1.1] tracking-tight mb-5">
          Your First Prototype{" "}
          <span className="block mt-1 bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
            Could Start Here.
          </span>
        </h2>

        {/* Copy */}
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
          You don&apos;t need to know everything before you begin. You just need enough
          curiosity to build the first thing.
        </p>

        {/* Quick stats */}
        <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-4 mb-10 text-sm font-heading font-bold text-slate-900">
          <div className="flex items-center gap-2">
            <span className="text-embeddly-blue text-lg">10</span>
            Builders
          </div>
          <div className="w-px h-5 bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-embeddly-blue text-lg">2</span>
            Weeks
          </div>
          <div className="w-px h-5 bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-embeddly-blue text-lg">1</span>
            Real Build Experience
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdzJmpaxI66ItK05FitoIQ7jOeOrA_vra4jAW717RMDhlQ1pw/viewform?fbzx=6666488062294828495"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-embeddly-amber hover:bg-embeddly-amber-hover text-slate-900 font-heading font-bold text-base shadow-amber-glow hover:shadow-[0_8px_28px_rgba(255,176,32,0.5)] transition-all duration-300 group cursor-pointer w-full sm:w-auto justify-center"
          >
            Start Building →
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#program"
            onClick={(e) => { e.preventDefault(); document.getElementById("program")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-embeddly-blue text-embeddly-blue font-heading font-bold text-base hover:bg-embeddly-blue hover:text-white transition-all duration-300 group cursor-pointer w-full sm:w-auto justify-center shadow-sm hover:shadow-blue-glow"
          >
            Explore the Internship
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
