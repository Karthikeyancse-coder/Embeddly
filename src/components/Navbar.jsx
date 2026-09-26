"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "@/data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const sectionIds = ["home", "about", "video", "gallery", "events", "enroll"];
      let current = "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        id="mainNavbar"
        className={`sticky top-0 z-[10000] w-full md:fixed md:top-0 md:left-0 md:w-full md:z-40 transition-all duration-300 ${
          mobileMenuOpen || scrolled
            ? "bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)] border-b border-slate-200"
            : "bg-white md:bg-white/80 md:backdrop-blur-sm border-b border-slate-200/50"
        }`}
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
                          isActive
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Right CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Button
              href="#enroll"
              className="hidden md:inline-flex"
            >
              Enroll Now
            </Button>

            {/* Mobile Menu Toggle Button */}
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

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
