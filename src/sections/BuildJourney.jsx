"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Cpu, Radio, Layers, CheckCircle2, Terminal } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 5-Stage Engineering Roadmap Data
 */
const ROADMAP_STEPS = [
  {
    id: "01",
    days: "DAY 1–2",
    stage: "Understand",
    title: "Hardware Fundamentals & Circuit Thinking",
    description: "Deep-dive into component datasheets, power regulation, schematics, and embedded mental models.",
    tech: ["MCU ARCHITECTURE", "CIRCUIT LAWS", "SCHEMATIC DESIGN", "COMPONENT SELECTION"],
    icon: Terminal,
    badge: "Stage 01 // Fundamentals",
    outcome: "Schematic analysis, power budget calculations & MCU pin multiplexing blueprint.",
    side: "left",
  },
  {
    id: "02",
    days: "DAY 3–5",
    stage: "Connect",
    title: "Sensors, Peripherals & Communication",
    description: "Wire active sensor payloads and master communication buses to interface hardware with silicon.",
    tech: ["I2C BUS", "SPI PROTOCOL", "UART SERIAL", "ANALOG/DIGITAL ADC"],
    icon: Radio,
    badge: "Stage 02 // Interfacing",
    outcome: "Multi-bus communication harness streaming raw sensor packets without bus locking.",
    side: "right",
  },
  {
    id: "03",
    days: "DAY 6–9",
    stage: "Build",
    title: "Firmware Architecture & Signal Debugging",
    description: "Write production-grade embedded C/C++, profile execution loops, and debug with logic analyzers.",
    tech: ["EMBEDDED C/C++", "INTERRUPT VECTORS", "LOGIC ANALYZER", "OSCILLOSCOPE"],
    icon: Cpu,
    badge: "Stage 03 // Firmware & Logic",
    outcome: "Non-blocking firmware architecture verified with oscilloscope signal analysis.",
    side: "left",
  },
  {
    id: "04",
    days: "DAY 10–14",
    stage: "Prototype",
    title: "System Integration & Hardware Hardening",
    description: "Assemble the complete custom hardware stack, solder PCB interconnects, and stress-test under real loads.",
    tech: ["CUSTOM PCB", "SOLDERING", "POWER HARNESS", "FAULT ISOLATION"],
    icon: Layers,
    badge: "Stage 04 // System Assembly",
    outcome: "Hardened physical prototype enclosed with power routing and fault-tolerance checks.",
    side: "right",
  },
  {
    id: "05",
    days: "DAY 15+",
    stage: "Demonstrate",
    title: "Validation, Documentation & Technical Pitch",
    description: "Benchmark your hardware, document git firmware repositories, and present a live working demo.",
    tech: ["LIVE HARDWARE DEMO", "SYSTEM BENCHMARKS", "ENGINEERING REPO", "PEER REVIEW"],
    icon: CheckCircle2,
    badge: "Stage 05 // Working Product",
    outcome: "Production firmware repository, verified hardware benchmarks, and live defense.",
    side: "left",
  },
];

export default function BuildJourney() {
  const containerRef = useRef(null);

  // ── Roadmap Stacking Animation Refs ──
  const roadmapSectionRef = useRef(null);
  const roadmapStickyRef = useRef(null);
  const cardRefs = useRef([]);
  const mobileCardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ══════════════════════════════════════════════════════════════════════
      // 1. ROADMAP 2-COLUMN GRID -> DUAL CARD STACKS (Scroll-Progress Driven)
      // ══════════════════════════════════════════════════════════════════════
      if (roadmapSectionRef.current && roadmapStickyRef.current) {
        const mmRoadmap = gsap.matchMedia();

        // ── Desktop (min-width: 768px): 2-Column Grid -> Centered Dual Card Stacks ──
        mmRoadmap.add("(min-width: 768px)", () => {
          const cards = cardRefs.current;
          if (!cards[0] || !cards[1] || !cards[2] || !cards[3] || !cards[4]) return;

          // Clear any inline styles from previous breakpoint triggers
          gsap.set(cards, { clearProps: "all" });

          // Initial state: normal 2-column grid positions (0 overlap)
          gsap.set(cards[0], { x: 0, y: 0, scale: 1, rotation: 0, zIndex: 10 });
          gsap.set(cards[1], { x: 0, y: 0, scale: 1, rotation: 0, zIndex: 10 });
          gsap.set(cards[2], { x: 0, y: 0, scale: 1, rotation: 0, zIndex: 20 });
          gsap.set(cards[3], { x: 0, y: 0, scale: 1, rotation: 0, zIndex: 20 });
          gsap.set(cards[4], { x: 0, y: 0, scale: 1, rotation: 0, zIndex: 30 });

          // Calculate precise row spacing between Row 1 and Row 2
          const rowStep = cards[2].offsetTop - cards[0].offsetTop || 206;
          const peek = 28; // Subtle vertical peek offset between stacked cards

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: roadmapSectionRef.current,
              start: "top top",
              end: "+=1200",
              pin: roadmapStickyRef.current,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // 0% -> 15%: Initial normal 2-column grid buffer
          tl.to({}, { duration: 15 });

          // 15% -> 80%: Progressive symmetrical convergence around the vertical center (Row 2)
          // LEFT STACK (Cards 01, 03, 05):
          // Card 01 moves DOWN from Row 1 toward the center stack
          tl.to(
            cards[0],
            {
              x: 20,
              y: rowStep + peek,
              scale: 0.96,
              rotation: 1.5,
              duration: 35,
              ease: "power1.inOut",
            },
            15
          );

          // Card 03 stays in Row 2 (vertical center), subtly tilts and scales
          tl.to(
            cards[2],
            {
              x: 10,
              y: 0,
              scale: 0.98,
              rotation: 0.8,
              duration: 35,
              ease: "power1.inOut",
            },
            25
          );

          // Card 05 moves UP from Row 3 to the top of the Left Stack
          tl.to(
            cards[4],
            {
              x: 0,
              y: -(rowStep + peek),
              scale: 1.0,
              rotation: -1.2,
              duration: 40,
              ease: "power1.inOut",
            },
            35
          );

          // RIGHT STACK (Cards 02, 04):
          // Card 02 moves DOWN from Row 1 toward the center stack
          tl.to(
            cards[1],
            {
              x: 12,
              y: rowStep,
              scale: 0.97,
              rotation: 1.2,
              duration: 35,
              ease: "power1.inOut",
            },
            20
          );

          // Card 04 aligns with Card 05 at the top of the Right Stack
          tl.to(
            cards[3],
            {
              x: 0,
              y: -peek,
              scale: 1.0,
              rotation: -1.0,
              duration: 35,
              ease: "power1.inOut",
            },
            30
          );

          // 80% -> 100%: Stable resting hold on centered stacks before natural transition
          tl.to({}, { duration: 20 }, 80);
        });

        // ── Mobile (max-width: 767px): 1-Column Grid -> Centered Single Stack ──
        mmRoadmap.add("(max-width: 767px)", () => {
          const mCards = mobileCardRefs.current.filter(Boolean);
          if (mCards.length !== 5) return;

          gsap.set(mCards, { clearProps: "all" });

          gsap.set(mCards[0], { x: 0, y: 0, scale: 1, zIndex: 10 });
          gsap.set(mCards[1], { x: 0, y: 0, scale: 1, zIndex: 20 });
          gsap.set(mCards[2], { x: 0, y: 0, scale: 1, zIndex: 30 });
          gsap.set(mCards[3], { x: 0, y: 0, scale: 1, zIndex: 40 });
          gsap.set(mCards[4], { x: 0, y: 0, scale: 1, zIndex: 50 });

          const tlMobile = gsap.timeline({
            scrollTrigger: {
              trigger: roadmapSectionRef.current,
              start: "top top",
              end: "+=1000",
              pin: roadmapStickyRef.current,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          const mStep = mCards[1].offsetTop - mCards[0].offsetTop || 195;
          const mPeek = 20;

          // 0% -> 15%: Buffer for normal 1-column layout
          tlMobile.to({}, { duration: 15 });

          // Symmetrical convergence around Card 03 (center card, index 2)
          tlMobile.to(
            mCards[0],
            { y: 2 * mStep, x: 12, scale: 0.94, rotation: 1.0, duration: 30, ease: "power1.inOut" },
            15
          );
          tlMobile.to(
            mCards[1],
            { y: mStep, x: 8, scale: 0.96, rotation: -0.6, duration: 30, ease: "power1.inOut" },
            25
          );
          tlMobile.to(
            mCards[2],
            { y: 0, x: 4, scale: 0.98, rotation: 0.6, duration: 30, ease: "power1.inOut" },
            35
          );
          tlMobile.to(
            mCards[3],
            { y: -(mStep - mPeek), x: 0, scale: 0.99, rotation: -0.6, duration: 30, ease: "power1.inOut" },
            45
          );
          tlMobile.to(
            mCards[4],
            { y: -(2 * mStep - 2 * mPeek), x: 0, scale: 1.0, rotation: 0, duration: 30, ease: "power1.inOut" },
            55
          );

          tlMobile.to({}, { duration: 15 }, 85);
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  /**
   * Helper to render an authentic Roadmap Milestone Card
   */
  const renderRoadmapCard = (step) => {
    const IconComp = step.icon;

    return (
      <div className="w-full h-full bg-white border border-slate-200/90 rounded-[18px] p-3 sm:p-3.5 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.04)] flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:shadow-[0_16px_40px_-8px_rgba(46,90,255,0.14)] hover:border-[#2E5AFF]/40">
        {/* Thin blue gradient accent line along top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2E5AFF] via-cyan-400 to-[#2E5AFF] opacity-90" />

        <div>
          {/* Header Row: Stage and Day Badges */}
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-[#2E5AFF]/10 border border-[#2E5AFF]/20 text-[#2E5AFF] font-mono text-[10px] font-bold tracking-wider uppercase shadow-xs">
                STAGE {step.id}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[9px] font-semibold">
                {step.days}
              </span>
            </div>
            <span className="font-mono text-[9px] text-slate-400 font-semibold uppercase tracking-wider hidden sm:inline">
              {step.badge}
            </span>
          </div>

          {/* Milestone Name & Icon */}
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h4 className="font-heading text-base font-extrabold text-[#0F172A] tracking-tight leading-snug">
              {step.stage}
            </h4>
            <div className="w-6 h-6 rounded-lg bg-[#2E5AFF]/10 border border-[#2E5AFF]/20 flex items-center justify-center text-[#2E5AFF] flex-shrink-0">
              <IconComp className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Subtitle */}
          <div className="font-heading text-[11px] font-semibold text-[#2E5AFF] mb-0.5 leading-tight truncate">
            {step.title}
          </div>

          {/* Description */}
          <p className="text-slate-600 text-[10.5px] leading-relaxed mb-1 font-normal line-clamp-2">
            {step.description}
          </p>
        </div>

        {/* Deliverables Inner Panel & Tech Chips */}
        <div className="mt-auto">
          {/* Deliverables Inner Panel */}
          <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/80 mb-1">
            <div className="text-[8px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5AFF]" />
              LABORATORY DELIVERABLE:
            </div>
            <p className="text-[10px] text-slate-800 font-medium leading-snug line-clamp-1">
              {step.outcome}
            </p>
          </div>

          {/* Tags as Compact Rounded Pills */}
          <div className="flex flex-wrap gap-1">
            {step.tech.map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 rounded-full bg-slate-100 border border-slate-200/70 text-[8.5px] font-mono font-medium text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="bg-[#F8FAFC]">
      {/* ══════════════════════════════════════════════════════════════════════
          1. INTERNSHIP VISION HEADER (Clean Light Theme Studio)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative z-10 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E5AFF]/8 border border-[#2E5AFF]/20 text-[#2E5AFF] font-mono text-xs font-semibold tracking-[0.2em] uppercase mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#2E5AFF] animate-pulse" />
          INTERNSHIP PROGRAM
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-[1.08] tracking-tight mb-6 max-w-4xl mx-auto">
          From First Circuit to{" "}
          <span className="text-[#2E5AFF]">Working Prototype.</span>
        </h2>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal mb-8">
          No endless lectures. No passive tutorials. Step into a structured engineering laboratory workflow
          and construct real physical systems from the silicon up.
        </p>

        {/* Quick Flow Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs text-slate-500 uppercase tracking-widest">
          <span className="px-3 py-1 rounded-md bg-white border border-slate-200/90 text-slate-900 font-semibold shadow-xs">
            UNDERSTAND
          </span>
          <span className="text-[#2E5AFF]">→</span>
          <span className="px-3 py-1 rounded-md bg-white border border-slate-200/90 text-slate-900 font-semibold shadow-xs">
            CONNECT
          </span>
          <span className="text-[#2E5AFF]">→</span>
          <span className="px-3 py-1 rounded-md bg-white border border-slate-200/90 text-slate-900 font-semibold shadow-xs">
            BUILD
          </span>
          <span className="text-[#2E5AFF]">→</span>
          <span className="px-3 py-1 rounded-md bg-white border border-slate-200/90 text-slate-900 font-semibold shadow-xs">
            PROTOTYPE
          </span>
          <span className="text-[#2E5AFF]">→</span>
          <span className="px-3 py-1 rounded-md bg-white border border-slate-200/90 text-slate-900 font-semibold shadow-xs">
            DEMONSTRATE
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. THE ENGINEERING ROADMAP (Scroll-Driven Dual Card Stacks)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={roadmapSectionRef}
        id="program"
        className="relative bg-[#F8FAFC] text-slate-900 border-b border-slate-200/80"
      >
        <div
          ref={roadmapStickyRef}
          className="h-screen w-full flex flex-col justify-center items-center py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden relative select-none"
        >
          {/* Subtle engineering background grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 select-none"
            style={{
              backgroundImage:
                "linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          {/* Section Header */}
          <div className="relative z-10 max-w-4xl mx-auto text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E5AFF]/8 border border-[#2E5AFF]/20 text-[#2E5AFF] font-mono text-[11px] font-bold tracking-[0.22em] uppercase mb-2 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5AFF]" />
              ENGINEERING ROADMAP
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#0F172A] tracking-tight leading-tight mb-1.5">
              The Engineering Roadmap
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto font-normal">
              A 5-stage laboratory curriculum transforming fundamental circuit concepts into production-grade hardware.
            </p>
          </div>

          {/* ── DESKTOP 2-COLUMN GRID -> DUAL STACKS (MD+) ── */}
          <div className="hidden md:grid md:grid-cols-2 gap-5 lg:gap-8 max-w-5xl mx-auto w-full relative z-10">
            {/* Left Column Track: Stages 01, 03, 05 */}
            <div className="flex flex-col space-y-4">
              <div
                ref={(el) => (cardRefs.current[0] = el)}
                className="w-full h-[190px] will-change-transform relative z-10"
              >
                {renderRoadmapCard(ROADMAP_STEPS[0])}
              </div>
              <div
                ref={(el) => (cardRefs.current[2] = el)}
                className="w-full h-[190px] will-change-transform relative z-20"
              >
                {renderRoadmapCard(ROADMAP_STEPS[2])}
              </div>
              <div
                ref={(el) => (cardRefs.current[4] = el)}
                className="w-full h-[190px] will-change-transform relative z-30"
              >
                {renderRoadmapCard(ROADMAP_STEPS[4])}
              </div>
            </div>

            {/* Right Column Track: Stages 02, 04 */}
            <div className="flex flex-col space-y-4">
              <div
                ref={(el) => (cardRefs.current[1] = el)}
                className="w-full h-[190px] will-change-transform relative z-10"
              >
                {renderRoadmapCard(ROADMAP_STEPS[1])}
              </div>
              <div
                ref={(el) => (cardRefs.current[3] = el)}
                className="w-full h-[190px] will-change-transform relative z-20"
              >
                {renderRoadmapCard(ROADMAP_STEPS[3])}
              </div>
            </div>
          </div>

          {/* ── MOBILE 1-COLUMN GRID -> SINGLE STACK (Under MD) ── */}
          <div className="md:hidden flex flex-col space-y-3 max-w-md mx-auto w-full px-1 relative z-10">
            {ROADMAP_STEPS.map((step, idx) => (
              <div
                key={`mobile-roadmap-${step.id}`}
                ref={(el) => (mobileCardRefs.current[idx] = el)}
                className="w-full h-[185px] will-change-transform relative"
                style={{ zIndex: (idx + 1) * 10 }}
              >
                {renderRoadmapCard(step)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

