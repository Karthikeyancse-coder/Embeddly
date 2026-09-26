"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, VolumeX, ArrowDown } from "lucide-react";
import { kalam } from "@/lib/fonts";

/**
 * EMBEDDLY - CINEMATIC SCROLL-DRIVEN VIDEO GALLERY SECTION
 * Progressive scroll-tied video expansion from a 65% rounded card
 * to an immersive visual fullscreen experience with muted autoplay & graceful exit.
 */
export default function VideoGallery() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const bgBackdropRef = useRef(null);
  const headerRef = useRef(null);
  const bottomRef = useRef(null);
  const decorationsRef = useRef(null);
  const posterRef = useRef(null);

  const hasStartedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showTapToPlay, setShowTapToPlay] = useState(false);
  const [showMinimalControls, setShowMinimalControls] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const card = cardRef.current;
    const video = videoRef.current;
    const bgBackdrop = bgBackdropRef.current;
    const header = headerRef.current;
    const bottom = bottomRef.current;
    const decorations = decorationsRef.current;
    const poster = posterRef.current;

    if (!section || !card) return;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      if (poster) poster.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial card scale
      gsap.set(card, {
        scale: 0.82,
        transformOrigin: "center center",
      });

      // Master ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Trigger Autoplay once when reaching 65% - 90% progress
            if (p >= 0.65 && p <= 0.9) {
              if (!hasStartedRef.current && video) {
                hasStartedRef.current = true;
                video.muted = true;
                video.playsInline = true;

                video
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    setShowMinimalControls(true);
                    setShowTapToPlay(false);
                    if (poster) poster.style.opacity = "0";
                  })
                  .catch(() => {
                    setShowTapToPlay(true);
                  });
              }
            } else if (p < 0.2) {
              // Reset when scrolling back up
              hasStartedRef.current = false;
              if (video && !video.paused) {
                video.pause();
                setIsPlaying(false);
              }
              if (poster) poster.style.opacity = "1";
              setShowMinimalControls(false);
              setShowTapToPlay(false);
            } else if (p > 0.96) {
              // Pause when scrolled past section
              if (video && !video.paused) {
                video.pause();
                setIsPlaying(false);
              }
            }
          },
        },
      });

      // Step 1: Surrounding content fades out as card expands
      tl.to(
        header,
        {
          opacity: 0,
          y: -35,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        bottom,
        {
          opacity: 0,
          y: 35,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        decorations,
        {
          opacity: 0,
          scale: 1.15,
          duration: 0.35,
          ease: "power2.out",
        },
        0
      );

      // Step 2: Progressive scaling from 0.82 to 1.0 (100vw x 100vh)
      tl.to(
        card,
        {
          scale: 1,
          width: "100vw",
          maxWidth: "100vw",
          height: "100vh",
          borderRadius: "0px",
          boxShadow: "none",
          borderWidth: "0px",
          duration: 0.65,
          ease: "power2.inOut",
        },
        0
      );

      // Background color transitions toward deep cinematic #08111F
      tl.to(
        bgBackdrop,
        {
          backgroundColor: "#08111F",
          duration: 0.5,
          ease: "power2.inOut",
        },
        0.08
      );

      // Step 3: Poster overlay fades out
      tl.to(
        poster,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
        },
        0.6
      );

      // Step 4: Cinematic Exit after holding fullscreen (0.84 to 1.00)
      tl.to(
        card,
        {
          yPercent: -22,
          opacity: 0.2,
          scale: 0.96,
          duration: 0.16,
          ease: "power2.in",
        },
        0.84
      );

      tl.to(
        bgBackdrop,
        {
          backgroundColor: "#F7F9FC",
          duration: 0.16,
          ease: "power2.in",
        },
        0.84
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      if (video) {
        video.pause();
      }
    };
  }, []);

  const handlePlayToggle = (e) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.muted = isMuted;
      video.playsInline = true;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowMinimalControls(true);
          setShowTapToPlay(false);
          if (posterRef.current) posterRef.current.style.opacity = "0";
        })
        .catch(() => {
          setShowTapToPlay(true);
        });
    }
  };

  const handleMuteToggle = (e) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section
      ref={sectionRef}
      className="video-scroll-section relative h-[300vh] bg-embeddly-bg w-full"
      id="video"
    >
      {/* 100vh Sticky Viewport Container */}
      <div className="video-sticky-container sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center z-10">
        {/* Background Backdrop */}
        <div
          ref={bgBackdropRef}
          className="video-bg-backdrop absolute inset-0 bg-embeddly-bg z-[1] pointer-events-none transition-colors"
        />

        {/* Surrounding Header Content */}
        <div
          ref={headerRef}
          className="video-surrounding-content absolute top-10 left-0 w-full flex flex-col items-center text-center z-20 px-5 pointer-events-none"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="h-[1.5px] w-10 bg-gradient-to-r from-transparent to-[#C6D8FF]" />
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-embeddly-blue">
              VIDEO GALLERY
            </span>
            <div className="h-[1.5px] w-10 bg-gradient-to-l from-transparent to-[#C6D8FF]" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            See How We{" "}
            <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
              Teach
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mb-4 leading-relaxed">
            Get a glimpse of our classes, projects, and student experiences. Watch
            our intro video to see how Embeddly turns ideas into real electronic
            creations.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-embeddly-blue bg-embeddly-blue/10 border border-embeddly-blue/20 px-4 py-1.5 rounded-full">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>

        {/* Circuit Decorative Elements & Clean Brand Typography */}
        <div
          ref={decorationsRef}
          className="video-decorations-wrapper absolute inset-0 pointer-events-none z-10 overflow-hidden"
        >
          {/* Handwritten Annotation Left */}
          {/* TO MOVE: change 'top-[27%]' (up/down) or 'left-[5%]' (left/right) */}
          <div className="hidden lg:flex flex-col items-start absolute top-[27%] left-[5%] pointer-events-none select-none animate-note-fade-in">
            <div
              className={`${kalam.className} font-bold text-[32px] text-embeddly-blue leading-[0.98] tracking-wide`}
              style={{
                fontFamily: `'Kalam', ${kalam.style.fontFamily}, cursive`,
                fontWeight: 700,
                fontStyle: "normal",
              }}
            >
              <span className="block">Real</span>
              <span className="block ml-2">Learning</span>
              <span className="block">Real Skills</span>
            </div>
            {/* Curved Hand-Drawn SVG Underline */}
            <svg
              viewBox="0 0 160 24"
              className="w-[140px] h-auto text-embeddly-blue -mt-0.5"
              aria-hidden="true"
            >
              <path
                d="M5 14 C 40 22, 85 5, 154 11"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hand-drawn-underline-path"
              />
            </svg>
          </div>

          {/* Handwritten Annotation Right */}
          {/* TO MOVE: change 'top-[31%]' (up/down) or 'right-[5%]' (left/right) */}
          <div className="hidden lg:flex flex-col items-start absolute top-[51%] right-[3%] pointer-events-none select-none animate-note-fade-in">
            <div
              className={`${kalam.className} font-bold text-[32px] text-embeddly-blue leading-[0.98] tracking-wide`}
              style={{
                fontFamily: `'Kalam', ${kalam.style.fontFamily}, cursive`,
                fontWeight: 700,
                fontStyle: "normal",
              }}
            >
              <span className="block">From</span>
              <span className="block ml-2">Concept</span>
              <span className="block">to Creation</span>
            </div>
            {/* Curved Hand-Drawn SVG Underline */}
            <svg
              viewBox="0 0 160 24"
              className="w-[140px] h-auto text-embeddly-blue -mt-0.5"
              aria-hidden="true"
            >
              <path
                d="M5 14 C 42 22, 90 5, 154 11"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hand-drawn-underline-path"
              />
            </svg>
          </div>

          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1400px] h-[80%] opacity-35 text-embeddly-blue"
            viewBox="0 0 1200 680"
            fill="none"
          >
            <path
              d="M50 200 H250 L320 270 H480"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <circle cx="50" cy="200" r="5" fill="currentColor" />
            <circle cx="480" cy="270" r="4" fill="currentColor" />
            <path
              d="M1150 420 H980 L920 360 H760"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <circle cx="1150" cy="420" r="5" fill="currentColor" />
            <circle cx="760" cy="360" r="4" fill="currentColor" />
          </svg>
        </div>

        {/* Progressive Video Card */}
        <div className="video-transform-wrapper relative z-20 flex items-center justify-center w-full h-full">
          <div
            ref={cardRef}
            onClick={handlePlayToggle}
            className="video-card-frame relative w-[92vw] md:w-[65vw] max-w-[1000px] aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10 flex items-center justify-center cursor-pointer"
          >
            {/* HTML5 Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover block bg-black"
              poster="/images/video-poster.jpg"
              muted={isMuted}
              playsInline
              preload="metadata"
            >
              <source src="/videos/embeddly-intro.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>

            {/* Poster Overlay with Blue Center Play Button */}
            <div
              ref={posterRef}
              className="video-poster-overlay absolute inset-0 flex items-center justify-center z-30 bg-black transition-opacity duration-500"
            >
              <img
                src="/images/video-poster.jpg"
                alt="Video cover"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08111F]/80 via-[#08111F]/30 to-transparent" />

              <div className="relative z-40 flex flex-col items-center text-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayToggle}
                  aria-label="Play video"
                  className="w-20 h-20 rounded-full bg-embeddly-blue text-white flex items-center justify-center shadow-[0_0_0_10px_rgba(46,90,255,0.25)] hover:scale-110 transition-transform pulse-ring-btn"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white drop-shadow">
                  See How We Teach
                </h3>
                <span className="text-xs sm:text-sm font-medium text-white/80 tracking-wide">
                  Scroll to explore
                </span>
              </div>
            </div>

            {/* Fallback Tap to Play Button */}
            {showTapToPlay && (
              <button
                type="button"
                onClick={handlePlayToggle}
                className="absolute top-6 left-6 z-40 inline-flex items-center gap-2 bg-embeddly-blue text-white px-4 py-2 rounded-full font-heading font-bold text-sm shadow-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Tap to Play</span>
              </button>
            )}

            {/* Minimal Controls */}
            {showMinimalControls && (
              <div className="absolute bottom-6 right-6 z-40 flex items-center gap-2.5 pointer-events-auto">
                <button
                  type="button"
                  onClick={handlePlayToggle}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="inline-flex items-center bg-slate-900/80 hover:bg-embeddly-blue text-white border border-white/20 p-2 rounded-full text-xs font-semibold backdrop-blur transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleMuteToggle}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="inline-flex items-center gap-1.5 bg-slate-900/80 hover:bg-embeddly-blue text-white border border-white/20 px-3.5 py-2 rounded-full text-xs font-semibold backdrop-blur transition-colors"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Mute</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Surrounding Bottom Content */}
        <div
          ref={bottomRef}
          className="video-bottom-content absolute bottom-6 left-0 w-full flex flex-col items-center z-20 px-5 pointer-events-none"
        >
          <div className="hidden md:flex items-center gap-6 px-6 py-2.5 rounded-full bg-white/95 border border-slate-200 shadow-sm mb-4">
            <span className="text-xs font-semibold text-slate-700">Classroom Sessions</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-xs font-semibold text-slate-700">Hands-on Projects</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-xs font-semibold text-slate-700">Student Experiences</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-xs font-semibold text-slate-700">Workshops &amp; Events</span>
          </div>

          <p className="text-sm sm:text-base italic text-slate-600 max-w-lg text-center">
            “Embeddly gave me the confidence to build real hardware projects and think like an engineer.”
            <span className="block text-xs not-italic font-bold text-slate-800 mt-1">— Our Student</span>
          </p>
        </div>
      </div>
    </section>
  );
}
