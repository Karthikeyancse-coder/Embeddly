"use client";

import { useEffect } from "react";
import Button from "./Button";
import { NAV_LINKS } from "@/data/navigation";

export default function MobileMenu({ isOpen, onClose, activeSection }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop: Sits behind menu (z-[9990]), dims & blurs page */}
      <div
        className={`fixed inset-0 z-[9990] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content-height Mobile Menu Panel: 100% solid white, stops right after Enroll Now */}
      <div
        id="mobileMenuDrawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed left-0 right-0 top-16 sm:top-20 z-[9999] bg-white border-b border-slate-200/80 px-6 pt-5 pb-7 shadow-2xl transition-all duration-300 ease-out md:hidden ${
          isOpen
            ? "translate-y-0 opacity-100 visible pointer-events-auto"
            : "-translate-y-2 opacity-0 invisible pointer-events-none"
        }`}
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <nav aria-label="Mobile Navigation">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={onClose}
                    className={`block py-2 text-lg font-heading font-semibold transition-colors ${
                      isActive
                        ? "text-embeddly-blue"
                        : "text-slate-800 hover:text-embeddly-blue"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-2">
              <Button
                href="#enroll"
                onClick={onClose}
                className="w-full text-center"
              >
                Enroll Now
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
