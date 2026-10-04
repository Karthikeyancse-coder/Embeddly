"use client";

import { useState } from "react";
import BookingModal from "@/components/BookingModal";

export default function FinalCTA() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section id="enroll" className="py-16 sm:py-24 bg-[#F8FAFC] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="w-full rounded-2xl sm:rounded-[28px] lg:rounded-[32px] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden bg-gradient-to-br from-[#EEF4FF] via-white to-[#EAEFFE] border border-[#D5E2FC] shadow-[0_20px_50px_-15px_rgba(46,90,255,0.08),0_1px_3px_rgba(15,23,42,0.04)]">
            {/* Subtle background engineering grid accent */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 select-none"
              style={{
                backgroundImage:
                  "linear-gradient(#2E5AFF 1px, transparent 1px), linear-gradient(90deg, #2E5AFF 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Ambient soft glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#2E5AFF]/8 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-indigo-400/8 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              {/* Headline */}
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.18] mb-4">
                Ready to Start Building Your Future?
              </h2>

              {/* Copy */}
              <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed mb-8 sm:mb-10 font-normal max-w-xl mx-auto">
                Turn your curiosity into real engineering experience through structured, hands-on learning.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdzJmpaxI66ItK05FitoIQ7jOeOrA_vra4jAW717RMDhlQ1pw/viewform?fbzx=6666488062294828495"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-[#2E5AFF] hover:bg-[#1E42D9] text-white font-heading font-bold text-base shadow-[0_8px_24px_rgba(46,90,255,0.3)] hover:shadow-[0_12px_32px_rgba(46,90,255,0.45)] transition-all duration-300 group cursor-pointer"
                >
                  Enquire Now
                </a>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-heading font-bold text-base border border-slate-200/90 shadow-xs hover:border-[#2E5AFF]/40 hover:text-[#2E5AFF] transition-all duration-300 group cursor-pointer"
                >
                  Book a Free Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-step Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
