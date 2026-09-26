"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Cpu,
  Users,
  Monitor,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { UPCOMING_EVENTS } from "@/data/events";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORY_ICONS = {
  Briefcase: Briefcase,
  Cpu: Cpu,
  Users: Users,
  Monitor: Monitor,
};

export default function UpcomingEvents() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header fade + translateY
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Cards staggered reveal
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 35,
        duration: 0.75,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-[#F7FAFF] to-white"
    >
      {/* Subtle Circuit Background Graphics */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-40">
        <svg
          className="w-full h-full text-embeddly-circuit"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circuit Lines */}
          <path
            d="M-50 180H220L310 270H680"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path
            d="M1490 220H1220L1120 120H840"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path
            d="M310 270V440L420 550H920"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M1120 120V320L1020 420H720"
            stroke="currentColor"
            strokeWidth="1.2"
          />

          {/* Node Circles */}
          <circle cx="220" cy="180" r="3.5" fill="currentColor" />
          <circle cx="310" cy="270" r="4.5" fill="#2E5AFF" fillOpacity="0.3" />
          <circle cx="680" cy="270" r="3.5" fill="currentColor" />
          <circle cx="1220" cy="220" r="3.5" fill="currentColor" />
          <circle cx="1120" cy="120" r="4.5" fill="#2E5AFF" fillOpacity="0.3" />
          <circle cx="420" cy="550" r="3.5" fill="currentColor" />
          <circle cx="1020" cy="420" r="3.5" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          {/* Category Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF2FE] border border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-wider uppercase mb-5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 fill-current" />
            <span>Upcoming Events</span>
          </div>

          {/* Section Main Title */}
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.15] tracking-tight mb-5">
            Build.{" "}
            <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
              Learn.
            </span>{" "}
            Connect.
          </h2>

          {/* Section Subtitle */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Join our upcoming workshops, technical sessions, hackathons, and
            hands-on events designed to turn learning into real-world
            experience.
          </p>
        </div>

        {/* Event Cards Grid / Centered Card */}
        <div
          className={
            UPCOMING_EVENTS.length === 1
              ? "flex justify-center mb-8 sm:mb-12"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12 sm:mb-14"
          }
        >
          {UPCOMING_EVENTS.map((event, index) => {
            const IconComponent = CATEGORY_ICONS[event.categoryIcon] || Cpu;

            return (
              <div
                key={event.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-card-md hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group ${
                  UPCOMING_EVENTS.length === 1
                    ? "w-full max-w-[420px]"
                    : "h-full"
                }`}
              >
                <div>
                  {/* Event 16:9 Image with Floating Badges */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 bg-slate-100">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Category Badge (Top-Left) */}
                    <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-embeddly-blue text-white text-xs font-heading font-bold shadow-md z-10 select-none">
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{event.category}</span>
                    </div>

                    {/* Date Badge (Top-Right) */}
                    <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md rounded-xl px-2.5 py-1.5 text-center shadow-md border border-slate-100 z-10 min-w-[46px] select-none">
                      <div className="text-base sm:text-lg font-bold text-slate-950 font-heading leading-none">
                        {event.day}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5 leading-none">
                        {event.month}
                      </div>
                    </div>
                  </div>

                  {/* Event Title */}
                  <h3 className="font-heading text-xl sm:text-[1.35rem] font-bold text-slate-900 leading-snug line-clamp-2 mb-2.5 group-hover:text-embeddly-blue transition-colors">
                    {event.title}
                  </h3>

                  {/* Event Description */}
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5">
                    {event.description}
                  </p>

                  {/* Info Rows */}
                  <div className="space-y-2.5 mb-6 text-sm text-slate-600 font-medium">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Register Button (Pinned to Bottom across all cards) */}
                <a
                  href={
                    event.registerUrl ||
                    "https://docs.google.com/forms/d/e/1FAIpQLSdzJmpaxI66ItK05FitoIQ7jOeOrA_vra4jAW717RMDhlQ1pw/viewform?fbzx=6666488062294828495"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full font-heading text-sm sm:text-base font-bold text-slate-900 bg-gradient-to-r from-embeddly-amber to-[#FFA812] hover:from-[#FFB938] hover:to-[#FF9F05] shadow-amber-glow hover:shadow-[0_8px_24px_rgba(255,176,32,0.45)] transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto select-none cursor-pointer"
                >
                  <span>{event.buttonText || "Register Now"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>

        {/* View All Events Button (Shown only if multiple events exist) */}
        {UPCOMING_EVENTS.length > 1 && (
          <div className="text-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdzJmpaxI66ItK05FitoIQ7jOeOrA_vra4jAW717RMDhlQ1pw/viewform?fbzx=6666488062294828495"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-embeddly-blue text-embeddly-blue font-heading font-bold text-sm sm:text-base hover:bg-embeddly-blue hover:text-white transition-all duration-300 shadow-sm hover:shadow-blue-glow group select-none cursor-pointer"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
