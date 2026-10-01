"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom circular "O" cursor for Embeddly.
 * - Smooth lerp tracking (fluid interpolation)
 * - State ○ (normal, 20px) -> ◎ (hovering clickable element, 32px with center dot and soft glow)
 * - Inverts automatically via mix-blend-mode: difference to maintain high contrast on both dark and light sections
 * - Completely disabled on mobile and touch devices
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Enable custom cursor only on devices with a mouse / fine pointer
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    setMounted(true);

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        target.closest &&
        target.closest(
          'a, button, input, textarea, select, [role="button"], [tabindex], .cursor-pointer, summary'
        )
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (
        target &&
        target.closest &&
        target.closest(
          'a, button, input, textarea, select, [role="button"], [tabindex], .cursor-pointer, summary'
        )
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // Smooth lerp loop (~60fps fluid cursor trailing)
    const lerp = 0.22;
    const render = () => {
      const dx = mousePos.current.x - currentPos.current.x;
      const dy = mousePos.current.y - currentPos.current.y;

      currentPos.current.x += dx * lerp;
      currentPos.current.y += dy * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[999999] select-none"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
        willChange: "transform",
      }}
    >
      {/* Solid filled gray circle: ● (14px) -> ● (24px on hover) */}
      <div
        className={`rounded-full transition-all duration-250 ease-out ${
          isHovering ? "w-6 h-6" : "w-3.5 h-3.5"
        }`}
        style={{
          backgroundColor: "#6B7280",
          boxShadow: isHovering
            ? "0 0 10px rgba(107, 114, 128, 0.45), 0 0 20px rgba(107, 114, 128, 0.2)"
            : "0 0 4px rgba(107, 114, 128, 0.2)",
        }}
      />
    </div>
  );
}
