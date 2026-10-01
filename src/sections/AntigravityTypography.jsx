"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const LETTERS = ["E", "M", "B", "E", "D", "D", "L", "Y"];

export default function AntigravityTypography() {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);
  // Array of intensity values [0..1] for each of the 8 letters
  const [intensities, setIntensities] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  /**
   * Mouse interaction calculation:
   * Measures horizontal distance from cursor to each letter center,
   * producing a fluid wave of activation across the typography:
   * nearest letter -> 100%
   * adjacent letters -> ~50%
   * next letters -> ~20%
   */
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    setIsHovered(true);

    const clientX = e.clientX;

    const newIntensities = LETTERS.map((_, idx) => {
      const el = letterRefs.current[idx];
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const dist = Math.abs(clientX - letterCenterX);

      // Activation radius scaled to letter width
      const radius = Math.max(rect.width * 1.6, 110);

      if (dist >= radius) return 0;

      // Smooth cosine / power falloff
      const rawIntensity = 1 - dist / radius;
      return Math.pow(rawIntensity, 1.4);
    });

    setIntensities(newIntensities);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIntensities([0, 0, 0, 0, 0, 0, 0, 0]);
  }, []);

  /**
   * Touch support for mobile / touchscreens:
   * Allows dragging finger across letters to activate circuitry
   */
  const handleTouchMove = useCallback(
    (e) => {
      if (e.touches && e.touches[0]) {
        handleMouseMove(e.touches[0]);
      }
    },
    [handleMouseMove]
  );

  /**
   * Mobile / Idle Auto-Wave Animation:
   * Periodically sweeps a white energy wave across the word when not actively hovered.
   */
  useEffect(() => {
    if (isHovered || prefersReducedMotion) return;

    let animFrameId;
    let startTime = performance.now();

    const loop = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      const cycleDuration = 4.2;
      const cycleProgress = (elapsed % cycleDuration) / cycleDuration;

      if (cycleProgress >= 0.08 && cycleProgress <= 0.72) {
        const wavePos = (cycleProgress - 0.08) / 0.64;
        const currentCenterIdx = wavePos * (LETTERS.length - 1);

        const waveIntensities = LETTERS.map((_, idx) => {
          const dist = Math.abs(idx - currentCenterIdx);
          if (dist > 1.8) return 0;
          const val = Math.max(0, 1 - dist / 1.8);
          return Math.pow(val, 1.6) * 0.92;
        });

        setIntensities(waveIntensities);
      } else {
        setIntensities((prev) => {
          if (prev.every((v) => v === 0)) return prev;
          return prev.map((v) => Math.max(0, v - 0.05));
        });
      }

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId);
  }, [isHovered, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      aria-label="Antigravity Embeddly Typography"
      className="relative w-full overflow-hidden select-none py-20 sm:py-28 md:py-36 lg:py-44 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #050B1B 0%, #071029 45%, #0B1740 100%)",
      }}
    >
      {/* ── Background: Subtle dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Subtle Technical Circuit Traces (Monochrome SVG Layer) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 120 L 220 120 L 260 160 L 580 160"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <circle cx="260" cy="160" r="3" fill="#FFFFFF" opacity="0.4" />
        <circle cx="580" cy="160" r="2.5" fill="#FFFFFF" opacity="0.5" />

        <path
          d="M 100% 180 L calc(100% - 240px) 180 L calc(100% - 290px) 130 L calc(100% - 640px) 130"
          fill="none"
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
        <circle cx="calc(100% - 290px)" cy="130" r="3" fill="#FFFFFF" opacity="0.4" />

        <path
          d="M 0 calc(100% - 100px) L 320 calc(100% - 100px) L 370 calc(100% - 150px) L 700 calc(100% - 150px)"
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.2"
        />
        <circle cx="370" cy="calc(100% - 150px)" r="2.5" fill="#FFFFFF" opacity="0.4" />

        <path
          d="M 100% calc(100% - 110px) L calc(100% - 310px) calc(100% - 110px) L calc(100% - 360px) calc(100% - 160px)"
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.2"
          strokeDasharray="5 5"
        />
      </svg>

      {/* ── Faint Glowing Ambient Core at Center (Pure soft white halo) ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] rounded-full pointer-events-none blur-[120px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* ── 1. Top Small Supporting Technical Label ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center mb-6 sm:mb-8 md:mb-10 text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-white/80">
            BUILT TO EXPLORE
          </span>
        </div>
      </div>

      {/* ── 2. Giant Antigravity Typography: E M B E D D L Y ── */}
      {/* Full width container without artificial max-width bottleneck or inner overflow clipping */}
      <div className="relative z-10 w-full flex items-center justify-center px-3 sm:px-6 md:px-8 py-4 sm:py-6">
        <div
          className="flex items-center justify-center select-none w-full"
          style={{
            fontSize: "clamp(2.4rem, 13.5vw, 16.5rem)",
            lineHeight: 1.05,
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
          }}
        >
          {LETTERS.map((char, idx) => {
            const intensity = intensities[idx] || 0;
            // Antigravity vertical float:
            // - upward displacement under cursor (intensity * 10px)
            // - subtle alternating zero-gravity base float
            const floatOffset = prefersReducedMotion
              ? 0
              : idx % 2 === 0
                ? -3
                : 3;
            const cursorLift = -intensity * 10;
            const totalY = floatOffset + cursorLift;

            return (
              <div
                key={idx}
                ref={(el) => {
                  letterRefs.current[idx] = el;
                }}
                className="relative inline-flex items-center justify-center cursor-default select-none transition-transform duration-300 ease-out mx-[0.02em]"
                style={{
                  transform: `translateY(${totalY}px)`,
                }}
              >
                {/* ── Layer 1: Inactive Outlined Letter (Thin pure white outline, subtle opacity) ── */}
                <span
                  className="select-none block"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.35)",
                    transition: "WebkitTextStroke 0.25s ease",
                  }}
                >
                  {char}
                </span>

                {/* ── Layer 2: Active Bright White Fill + Multi-layer White Neon Glow ── */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                  style={{
                    color: "#FFFFFF",
                    WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.95)",
                    opacity: intensity,
                    // Multi-layer white glow: tight sharp glow + soft medium halo + subtle outer glow
                    textShadow:
                      intensity > 0.05
                        ? `0 0 ${intensity * 10}px rgba(255, 255, 255, 0.95), 0 0 ${intensity * 25
                        }px rgba(255, 255, 255, 0.6), 0 0 ${intensity * 50
                        }px rgba(255, 255, 255, 0.25)`
                        : "none",
                    filter:
                      intensity > 0.1
                        ? `drop-shadow(0 0 ${intensity * 8}px rgba(255, 255, 255, 0.5))`
                        : "none",
                    transition:
                      "opacity 0.2s ease-out, text-shadow 0.2s ease-out, filter 0.2s ease-out",
                  }}
                >
                  {char}
                </span>

                {/* ── Layer 3: Faint Micro Circuit Node beneath each letter (Pure white) ── */}
                <span
                  className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      intensity > 0.2 ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)",
                    boxShadow:
                      intensity > 0.2
                        ? "0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.5)"
                        : "none",
                    transform: `translateX(-50%) scale(${intensity > 0.2 ? 1.5 : 1
                      })`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. Bottom Small Supporting Subtitle ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-6 sm:mt-8 md:mt-10 flex flex-col items-center gap-2 text-center">
        <p className="text-slate-400 font-heading text-xs sm:text-sm md:text-base font-medium tracking-[0.25em] uppercase">
          Learn. Build. Experiment. Repeat.
        </p>
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
          <span>CIRCUIT</span>
          <span className="text-white/60">→</span>
          <span>CODE</span>
          <span className="text-white/60">→</span>
          <span>PROTOTYPE</span>
        </div>
      </div>

      {/* ── Bottom subtle seam transitioning into the footer ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
    </section>
  );
}
