"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause } from "lucide-react";

/**
 * Hero video playlist configuration.
 * Add or change the video paths below.
 */
const HERO_VIDEOS = [
  { id: 0, src: "/videos/hero-1.mp4", label: "Video 1" },
  { id: 1, src: "/videos/hero-2.mp4", label: "Video 2" },
  { id: 2, src: "/videos/hero-3.mp4", label: "Video 3" },
  { id: 3, src: "/videos/hero-4.mp4", label: "Video 4" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);

  // Array of video element refs
  const videoRefs = useRef([]);
  // Ref keeping synchronized with activeIndex to eliminate stale closures in event listeners
  const activeIndexRef = useRef(0);
  // Ref keeping synchronized with isPaused to prevent advancement while paused
  const isPausedRef = useRef(false);

  // Synchronize refs with state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  /**
   * Track real video playback progress via HTML5 timeupdate event.
   * Attached to the currently active video and detached on activeIndex change / unmount.
   */
  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (!video) return;

    const updateProgress = () => {
      if (!video.duration || isNaN(video.duration)) {
        setVideoProgress(0);
        return;
      }
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(Math.min(100, Math.max(0, progress)));
    };

    updateProgress();
    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, [activeIndex]);

  /**
   * Switch to a target video index:
   * - Reset videoProgress to 0
   * - Pause all inactive videos and reset currentTime to 0
   * - Reset target video currentTime to 0 and call play()
   * - Reset pause state to playing
   * - Update activeIndex
   */
  const switchToVideo = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex >= HERO_VIDEOS.length) return;

    setVideoProgress(0);
    activeIndexRef.current = targetIndex;
    setActiveIndex(targetIndex);
    setIsPaused(false);
    isPausedRef.current = false;

    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === targetIndex) {
        try {
          video.currentTime = 0;
        } catch {
          // Ignore if seek not allowed before metadata
        }
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn(`Autoplay prevented for video ${i + 1}:`, err);
          });
        }
      } else {
        try {
          video.pause();
          video.currentTime = 0;
        } catch {
          // Ignore pause exceptions
        }
      }
    });
  }, []);

  /**
   * Natural HTML5 ended event handler:
   * Advances only if the ended video is the active one and carousel is not paused.
   */
  const handleVideoEnded = useCallback(
    (idx) => {
      if (idx !== activeIndexRef.current) return;
      if (isPausedRef.current) return;

      const nextIndex = (idx + 1) % HERO_VIDEOS.length;
      switchToVideo(nextIndex);
    },
    [switchToVideo]
  );

  /**
   * Indicator click handler:
   * Manually jump to any video index immediately from 0%.
   */
  const handleIndicatorClick = useCallback(
    (targetIndex) => {
      switchToVideo(targetIndex);
    },
    [switchToVideo]
  );

  /**
   * Play / Pause toggle:
   * Pausing stops current video and prevents auto-advance (freezes progress).
   * Playing resumes current video from its current position (resumes progress).
   */
  const togglePlayPause = useCallback(() => {
    const currentVideo = videoRefs.current[activeIndexRef.current];
    if (!currentVideo) return;

    if (isPausedRef.current) {
      setIsPaused(false);
      isPausedRef.current = false;
      currentVideo.muted = true;
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      setIsPaused(true);
      isPausedRef.current = true;
      try {
        currentVideo.pause();
      } catch {}
    }
  }, []);

  // Initial playback on mount and cleanup on unmount/navigation
  useEffect(() => {
    let isMounted = true;
    const firstVideo = videoRefs.current[0];

    const startInitialPlayback = () => {
      if (!isMounted || !firstVideo) return;
      firstVideo.muted = true;
      firstVideo.currentTime = 0;
      const playPromise = firstVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isMounted) setVideoLoaded(true);
          })
          .catch(() => {
            if (isMounted) setVideoLoaded(true);
          });
      }
    };

    if (firstVideo) {
      if (firstVideo.readyState >= 2) {
        startInitialPlayback();
      } else {
        firstVideo.addEventListener("canplay", startInitialPlayback, { once: true });
      }
    }

    return () => {
      isMounted = false;
      if (firstVideo) {
        firstVideo.removeEventListener("canplay", startInitialPlayback);
      }
      videoRefs.current.forEach((video) => {
        if (video) {
          try {
            video.pause();
          } catch {}
        }
      });
    };
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
      {/* ── 4-Video Playlist Layers ── */}
      {HERO_VIDEOS.map((video, idx) => {
        const isActive = idx === activeIndex;
        return (
          <video
            key={video.id}
            ref={(el) => {
              videoRefs.current[idx] = el;
            }}
            muted
            playsInline
            preload="auto"
            aria-hidden={!isActive}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ease-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            onEnded={() => handleVideoEnded(idx)}
            onCanPlay={() => {
              if (isActive) setVideoLoaded(true);
            }}
            onError={() => {
              setVideoLoaded(true);
            }}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        );
      })}

      {/* ── Fallback background if video is loading / unavailable ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          videoLoaded ? "opacity-0" : "opacity-100"
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
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* ── 1. Scroll Indicator — Positioned lower at bottom edge (bottom: 28px–32px), centered ── */}
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

      {/* ── 2. Video Controls Group — Moved to bottom-LEFT (left: 20px/48px, bottom: 24px/32px) ── */}
      <div
        className="absolute bottom-6 left-5 sm:bottom-7 sm:left-8 md:bottom-8 md:left-12 flex items-center gap-3 select-none"
        style={{ zIndex: 25 }}
      >
        {/* Circular Play / Pause Button */}
        <button
          type="button"
          onClick={togglePlayPause}
          aria-label={isPaused ? "Play video" : "Pause video"}
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
          aria-label="Hero video playlist"
        >
          {HERO_VIDEOS.map((video, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={video.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Jump to ${video.label}`}
                onClick={() => handleIndicatorClick(idx)}
                className="flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer py-1"
              >
                {isActive ? (
                  /* Active video: 36–42px progress track with actual playback progress fill */
                  <div className="relative w-10 h-1 rounded-full bg-white/30 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.7)] transition-[width] duration-150 ease-linear"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                ) : (
                  /* Inactive video: small circle */
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
