"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "@/data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);   // past 50px → white bg
  const [visible, setVisible] = useState(false);     // hero-aware: hidden until scrolled past hero
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const heroHeightRef = useRef(0);

  useEffect(() => {
    // Measure the hero height once on mount (it's 100svh / 100vh)
    const measureHero = () => {
      const heroEl = document.getElementById("home");
      if (heroEl) {
        heroHeightRef.current = heroEl.offsetHeight;
      } else {
        // Fallback: use viewport height
        heroHeightRef.current = window.innerHeight;
      }
    };
    measureHero();
    window.addEventListener("resize", measureHero, { passive: true });

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // ── Hero-aware visibility ──
      // Navbar is hidden when scrollY = 0 (user sees full video)
      // Starts appearing after ~80px of scroll (feels intentional)
      // Fully visible once past 160px
      const threshold = Math.max(80, heroHeightRef.current * 0.1);
      setVisible(scrollY > threshold);
      setScrolled(scrollY > 50);

      // ── Active section tracking ──
      const sectionIds = [
        "home", "about", "brand", "why", "video",
        "mentor", "gallery", "events", "program", "who", "enroll",
      ];
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 140;
          if (scrollY >= top && scrollY < top + el.offsetHeight) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once to set initial state (scrollY=0 → hidden)

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureHero);
    };
  }, []);

  return (
    <>
      <header
        id="mainNavbar"
        className={`fixed top-0 left-0 w-full z-[10000] transition-all duration-400 ${
          // Slide in from top when visible
          visible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          // Background: solid when scrolled past 50, glass when just appeared
          mobileMenuOpen || scrolled
            ? "bg-white shadow-[0_4px_20px_rgba(15,23,42,0.08)] border-b border-slate-200"
            : "bg-white/90 backdrop-blur-md border-b border-slate-200/50"
        }`}
        style={{ transitionProperty: "transform, opacity, background-color, box-shadow" }}
        aria-hidden={!visible}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between relative z-20">

          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3"
            aria-label="Embeddly Home"
          >
            <Image
              src="/logo/NAVAHARISHEMBDDLY (1).png"
              alt="Embeddly Logo"
              width={160}
              height={44}
              className="h-9 sm:h-11 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden md:block">
            <ul className="flex items-center gap-8 lg:gap-10">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`relative font-heading text-[1.02rem] font-semibold py-2 transition-colors duration-200 group ${
                        isActive
                          ? "text-embeddly-blue"
                          : "text-slate-800 hover:text-embeddly-blue"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] bg-embeddly-blue rounded-full transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Button href="#enroll" className="hidden md:inline-flex">
              Start Building
            </Button>

            <button
              type="button"
              className="md:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobileMenuDrawer"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
