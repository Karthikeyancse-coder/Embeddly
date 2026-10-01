"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

/**
 * Hero image slides configuration.
 * Uses existing high-res project images as temporary media
 * until final hero videos are uploaded.
 */
const HERO_IMAGES = [
  {
    id: 0,
    src: "/images/hero-circuit.jpg",
    alt: "Embeddly Circuitry and Electronics",
    label: "Slide 1",
  },
  {
    id: 1,
    src: "/images/video-poster.jpg",
    alt: "Interactive Hands-on Engineering",
    label: "Slide 2",
  },
  {
    id: 2,
    src: "/images/about-lab.jpg",
    alt: "Modern Hardware Prototyping Lab",
    label: "Slide 3",
  },
  {
    id: 3,
    src: "/images/enroll-workbench.jpg",
    alt: "Student Workbench and Embedded Tools",
    label: "Slide 4",
  },
];

const SLIDE_DURATION = 5000; // 5 seconds per slide

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);

  // Sync ref with paused state for animation frame loop
  const isPausedRef = useRef(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  /**
   * Smooth automatic slide progression:
   * Smoothly advances progress from 0% -> 100% over SLIDE_DURATION.
   * On reaching 100%, transitions to the next slide and loops continuously.
   */
  useEffect(() => {
    if (isPaused) return;

    let animFrameId;
    let lastTime = performance.now();

    const tick = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      setSlideProgress((prev) => {
        const next = prev + (delta / SLIDE_DURATION) * 100;
        if (next >= 100) {
          setActiveIndex((curr) => (curr + 1) % HERO_IMAGES.length);
          return 0;
        }
        return next;
      });

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [isPaused]);

  /**
   * Jump to a specific slide:
   */
  const switchToSlide = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex >= HERO_IMAGES.length) return;
    setActiveIndex(targetIndex);
    setSlideProgress(0);
  }, []);

  /**
   * Indicator click handler:
   */
  const handleIndicatorClick = useCallback(
    (targetIndex) => {
      switchToSlide(targetIndex);
    },
    [switchToSlide]
  );

  /**
   * Play / Pause toggle:
   * Pausing stops current slide and freezes progress bar.
   * Playing resumes progress right from where it paused.
   */
  const togglePlayPause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Hide scroll prompt on user scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setShowScrollPrompt(false);
      } else {
        setShowScrollPrompt(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black"
      style={{ height: "100svh", minHeight: "100vh", width: "100%" }}
    >
      {/* ── 4-Image Hero Presentation Layers ── */}
      {HERO_IMAGES.map((image, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={image.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={idx === 0}
              className="object-cover object-center"
              sizes="100vw"
              onLoad={() => {
                if (idx === 0) setImagesLoaded(true);
              }}
            />
          </div>
        );
      })}

      {/* ── Fallback background if images are loading ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          imagesLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          zIndex: 15,
          background: "linear-gradient(135deg, #0B1740 0%, #0e1f5e 50%, #0B1740 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(46,90,255,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Subtle Cinematic Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 16,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ── 1. Scroll Indicator — Positioned at bottom edge (bottom: 28px–32px), centered ── */}
      <div
        className="absolute bottom-7 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-all duration-500 pointer-events-none"
        style={{
          zIndex: 20,
          opacity: showScrollPrompt ? 1 : 0,
          transform: `translateX(-50%) translateY(${showScrollPrompt ? "0px" : "8px"})`,
        }}
        aria-hidden="true"
      >
        <div className="scroll-indicator-chevron">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span
          className="text-white/60 text-[10px] font-heading font-semibold tracking-[0.25em] uppercase select-none"
          style={{ letterSpacing: "0.25em" }}
        >
          Scroll
        </span>
      </div>

      {/* ── 2. Carousel Controls Group — Positioned at bottom-LEFT ── */}
      <div
        className="absolute bottom-6 left-5 sm:bottom-7 sm:left-8 md:bottom-8 md:left-12 flex items-center gap-3 select-none"
        style={{ zIndex: 25 }}
      >
        {/* Circular Play / Pause Button */}
        <button
          type="button"
          onClick={togglePlayPause}
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          className="w-9 h-9 rounded-full bg-black/45 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-black/60 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          {isPaused ? (
            <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
          ) : (
            <Pause className="w-3.5 h-3.5 fill-white text-white" />
          )}
        </button>

        {/* ── 3. Dark translucent rounded container with real playback progress ── */}
        <div
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 shadow-lg"
          role="tablist"
          aria-label="Hero media playlist"
        >
          {HERO_IMAGES.map((image, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={image.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Jump to ${image.label}`}
                onClick={() => handleIndicatorClick(idx)}
                className="flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer py-1"
              >
                {isActive ? (
                  /* Active slide: 40px progress track with smooth playback progress fill */
                  <div className="relative w-10 h-1 rounded-full bg-white/30 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                      style={{ width: `${slideProgress}%` }}
                    />
                  </div>
                ) : (
                  /* Inactive slide: small circle */
                  <span className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 transition-colors duration-200 block" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
