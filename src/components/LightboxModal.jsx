"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function LightboxModal({ isOpen, onClose, item }) {
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

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.label || "Image Lightbox"}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl p-3 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full h-[320px] sm:h-[460px] rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={item.image}
            alt={item.alt || item.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        <div className="pt-4 px-2 pb-2">
          <span className="text-xs font-bold text-embeddly-blue uppercase tracking-wider block mb-1">
            {item.badge || item.category}
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            {item.label}
          </h3>
        </div>
      </div>
    </div>
  );
}
