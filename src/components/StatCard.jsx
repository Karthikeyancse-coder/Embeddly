"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const ICON_MAP = {
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  Award: Award,
};

export default function StatCard({
  target = 500,
  suffix = "+",
  prefix = "",
  title,
  sublabel,
  icon = "GraduationCap",
  compact = false,
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef(null);
  const animatedRef = useRef(false);

  const IconComponent = typeof icon === "string" ? ICON_MAP[icon] || GraduationCap : icon;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const duration = 1800; // ms
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(eased * target);

              setDisplayValue(currentVal);

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                setDisplayValue(target);
              }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target]);

  if (compact) {
    return (
      <div ref={cardRef} className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-embeddly-blue-subtle text-embeddly-blue flex items-center justify-center flex-shrink-0 border border-embeddly-blue/15">
          <IconComponent className="w-5 h-5" />
        </div>
        <div>
          <div className="font-heading text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {prefix}
            {displayValue}
            {suffix}
          </div>
          <div className="text-xs sm:text-sm text-slate-500 font-medium">
            {title}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="bg-white border border-embeddly-border-light rounded-2xl p-6 shadow-card-sm hover:shadow-card-md hover:-translate-y-1 transition-all duration-300 relative group"
    >
      <div className="w-12 h-12 rounded-xl bg-embeddly-blue-subtle text-embeddly-blue flex items-center justify-center mb-4 border border-embeddly-blue/15 group-hover:bg-embeddly-blue group-hover:text-white transition-colors duration-300">
        <IconComponent className="w-6 h-6" />
      </div>

      <div className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
        {prefix}
        {displayValue}
        {suffix}
      </div>

      <div className="font-heading text-base font-bold text-slate-900 mb-1">
        {title}
      </div>

      {sublabel && (
        <div className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {sublabel}
        </div>
      )}
    </div>
  );
}
