"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Star, Play, Zap, Cpu, Settings, TrendingUp } from "lucide-react";
import Button from "@/components/Button";
import StatCard from "@/components/StatCard";
import VideoPlayer from "@/components/VideoPlayer";
import { HERO_STATS } from "@/data/stats";
import { kalam } from "@/lib/fonts";

const EmbeddlyRobot = dynamic(() => import("@/components/EmbeddlyRobot"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] sm:h-[540px] lg:h-[580px] xl:h-[620px] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-embeddly-blue/20 border-t-embeddly-blue animate-spin" />
    </div>
  ),
});

export default function Hero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-wider uppercase mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Practical • Project-Based • Future-Ready</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.85rem] font-bold text-slate-900 leading-[1.12] tracking-tight mb-6">
              Learn Electronics &amp; Embedded Systems for a{" "}
              <span className="bg-gradient-to-r from-embeddly-blue via-blue-600 to-[#0042E0] bg-clip-text text-transparent">
                Smarter Tomorrow
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              Hands-on courses, real-world projects, and expert mentorship to help
              you build, experiment, and innovate with electronics and embedded
              systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 mb-12">
              <Button href="#enroll">Enroll Now</Button>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-3.5 text-left group cursor-pointer"
                aria-label="Watch introductory video"
              >
                <div className="w-12 h-12 rounded-full bg-embeddly-blue text-white flex items-center justify-center pulse-ring-btn shadow-blue-glow group-hover:scale-105 transition-transform duration-300">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold text-slate-900 group-hover:text-embeddly-blue transition-colors">
                    Watch Our Intro
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    See how we teach
                  </div>
                </div>
              </button>
            </div>

            {/* Hero Quick Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 w-full max-w-xl">
              {HERO_STATS.map((stat) => (
                <StatCard
                  key={stat.label}
                  target={stat.target}
                  suffix={stat.suffix}
                  title={stat.label}
                  icon={stat.icon}
                  compact
                />
              ))}
            </div>
          </div>

          {/* Right Column: Hardware Circuit Visual Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* 1. Handwritten Annotation: Learn Build Innovate */}
            {/* Position: Above-left of robot head. Adjust 'top' and 'left' to fine-tune */}
            <div className="absolute top-0 sm:top-1 left-2 sm:left-4 lg:left-6 z-20 hidden md:block select-none pointer-events-none animate-note-fade-in">
              <div
                className={`${kalam.className} text-[22px] md:text-[26px] lg:text-[25px] leading-[0.95] text-[#2E5AFF]`}
                style={{
                  fontFamily: `'Kalam', ${kalam.style.fontFamily}, cursive`,
                  fontWeight: 700,
                  fontStyle: "normal",
                }}
              >
                <span className="block" style={{ transform: "translateX(0px)" }}>Learn</span>
                <span className="block" style={{ transform: "translateX(6px)" }}>Build</span>
                <span className="block" style={{ transform: "translateX(2px)" }}>Innovate</span>
              </div>
              {/* Organic Curved Hand-Drawn SVG Underline */}
              <svg
                viewBox="0 0 220 35"
                className="w-[115px] md:w-[135px] lg:w-[120px] h-auto -mt-1"
                aria-hidden="true"
              >
                <path
                  d="M8 18 C45 28 70 12 105 18 C145 25 175 10 215 15"
                  fill="none"
                  stroke="#2E5AFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 2. Handwritten Annotation: IDEAS CIRCUITS REAL SOLUTIONS */}
            {/* Position: Upper-right of robot head. Adjust 'top' and 'right' to fine-tune */}
            <div className="absolute top-1 sm:top-2 right-4 sm:right-6 lg:right-8 z-20 hidden md:block select-none pointer-events-none animate-note-fade-in">
              <div
                className={`${kalam.className} text-[14px] md:text-[16px] lg:text-[15px] leading-[1.05] tracking-wider text-right text-slate-500`}
                style={{
                  fontFamily: `'Kalam', ${kalam.style.fontFamily}, cursive`,
                  fontWeight: 700,
                  fontStyle: "normal",
                }}
              >
                <span className="block" style={{ transform: "translateX(0px)" }}>IDEAS</span>
                <span className="block mr-1" style={{ transform: "translateX(-4px)" }}>CIRCUITS</span>
                <span className="block" style={{ transform: "translateX(0px)" }}>REAL SOLUTIONS</span>
              </div>
              {/* Hand-Drawn Underline */}
              <svg
                viewBox="0 0 145 20"
                className="w-[95px] md:w-[115px] lg:w-[125px] h-auto text-slate-400 mt-0.5 ml-auto"
                aria-hidden="true"
              >
                <path
                  d="M4 12 C 38 18, 80 4, 140 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Main 3D Embeddly Robot Canvas (Unchanged Center Anchor) */}
            <div className="relative w-full flex items-center justify-center">
              <EmbeddlyRobot />
            </div>

            {/* 3. Floating Badge: Code Program */}
            {/* Position: Lower-left flank of robot. Adjust 'bottom' and 'left' to fine-tune */}
            <div className="animate-float-1 absolute bottom-12 sm:bottom-4 left-4 sm:left-3 lg:left-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 sm:p-3.5 shadow-card-md flex items-center gap-3 z-20 pointer-events-auto">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-embeddly-blue-subtle text-embeddly-blue font-mono font-bold flex items-center justify-center text-sm border border-embeddly-blue/15">
                &lt;/&gt;
              </div>
              <div>
                <div className="font-heading text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Code Program
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500">
                  Control &amp; Automate
                </div>
              </div>
            </div>

            {/* 4. Floating Badge: Design Prototype */}
            {/* Position: Mid/upper-right flank of robot. Adjust 'top' and 'right' to fine-tune */}
            <div className="animate-float-2 absolute top-16 sm:top-20 -right-1 sm:-right-2 lg:-right-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 sm:p-3.5 shadow-card-md flex items-center gap-3 z-20 pointer-events-auto">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base sm:text-lg border border-amber-200">
                ⚙️
              </div>
              <div>
                <div className="font-heading text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Design Prototype
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500">
                  Test &amp; Deploy
                </div>
              </div>
            </div>

            {/* 5. Handwritten Annotation: From Concept to Creation */}
            {/* Position: Lower-right below robot. Adjust 'bottom' and 'right' to fine-tune */}
            <div className="absolute bottom-2 sm:bottom-3 right-4 sm:right-8 lg:right-10 z-20 hidden md:block select-none pointer-events-none animate-note-fade-in">
              <div
                className={`${kalam.className} text-[18px] md:text-[23px] lg:text-[21px] leading-[0.95] text-[#2E5AFF]`}
                style={{
                  fontFamily: `'Kalam', ${kalam.style.fontFamily}, cursive`,
                  fontWeight: 700,
                  fontStyle: "normal",
                }}
              >
                <span className="block" style={{ transform: "translateX(0px)" }}>From</span>
                <span className="block" style={{ transform: "translateX(6px)" }}>Concept</span>
                <span className="block" style={{ transform: "translateX(2px)" }}>to Creation</span>
              </div>
              {/* Organic Curved Hand-Drawn SVG Underline */}
              <svg
                viewBox="0 0 220 35"
                className="w-[115px] md:w-[135px] lg:w-[120px] h-auto -mt-1"
                aria-hidden="true"
              >
                <path
                  d="M8 18 C45 28 70 12 105 18 C145 25 175 10 215 15"
                  fill="none"
                  stroke="#2E5AFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Feature Pills Strip */}
        <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl sm:rounded-full shadow-card-sm max-w-4xl mx-auto mt-16 sm:mt-20">
          <div className="inline-flex items-center gap-2 text-slate-900 font-semibold text-sm sm:text-base px-2">
            <Zap className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
            <span>Explore</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <div className="inline-flex items-center gap-2 text-slate-900 font-semibold text-sm sm:text-base px-2">
            <Settings className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
            <span>Experiment</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <div className="inline-flex items-center gap-2 text-slate-900 font-semibold text-sm sm:text-base px-2">
            <Cpu className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
            <span>Build</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <div className="inline-flex items-center gap-2 text-slate-900 font-semibold text-sm sm:text-base px-2">
            <TrendingUp className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
            <span>Grow</span>
          </div>
        </div>
      </div>

      {/* Intro Video Player Modal */}
      <VideoPlayer
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </section>
  );
}
