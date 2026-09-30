import { ExternalLink } from "lucide-react";

const TIMELINE = [
  {
    period: "School — 10th Standard",
    event: "Started exploring technology and electronics",
    detail: "Early curiosity about how electronic systems work.",
  },
  {
    period: "11th Grade",
    event: "Built a World Record Wooden Satellite",
    detail: "An early hardware project that demonstrated what determined student builders can achieve.",
  },
  {
    period: "NASA & ISRO",
    event: "Selected as Young Scientist",
    detail: "Represented the next generation of Indian engineering talent on international platforms.",
  },
  {
    period: "Product Development",
    event: "Building real hardware products",
    detail: "Moved from experiments to shipping actual embedded systems and IoT products.",
  },
  {
    period: "Today",
    event: "CTO, Co-Founder — SQUAROOTS & Mentoring at Embeddly",
    detail: "4th Year ECE at Sona College of Technology. Building and mentoring the next generation of makers.",
  },
];

const SKILLS = [
  "Embedded Systems & IoT",
  "AI on Hardware",
  "Product Development",
  "Microcontrollers & Firmware",
  "Electronics Design",
];

export default function Mentor() {
  return (
    <section id="mentor" className="py-20 sm:py-28 relative bg-[#F7F9FC]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-widest uppercase mb-5">
            Your Mentor
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-[1.15] tracking-tight">
            Learn from someone who{" "}
            <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
              started building early.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* Left: Profile Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-card-md p-6 sm:p-7 sticky top-28">

              {/* Avatar placeholder — styled */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-embeddly-blue to-[#0042E0] flex items-center justify-center text-white font-heading font-bold text-3xl mb-5 shadow-blue-glow">
                AV
              </div>

              <div className="mb-1">
                <div className="text-[10px] font-heading font-bold tracking-widest text-embeddly-blue uppercase mb-1">
                  Mentor
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                  Akshay Venkatesan
                </h3>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                CTO &amp; Co-Founder, SQUAROOTS
                <br />
                4th Year ECE · Sona College of Technology, Salem
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {SKILLS.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-heading font-semibold text-embeddly-blue bg-embeddly-blue-subtle border border-embeddly-blue/15 px-2.5 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <a
                  href="https://www.linkedin.com/in/akshay-venkatesan-3b589b28a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-heading font-semibold text-slate-700 hover:text-embeddly-blue transition-colors group"
                >
                  <svg className="w-4 h-4 fill-current text-embeddly-blue flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.31a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.65 1.65 0 0 0-1.66-1.66z" />
                  </svg>
                  View LinkedIn Profile
                  <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="https://akshayv.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-heading font-semibold text-slate-700 hover:text-embeddly-blue transition-colors group"
                >
                  <svg className="w-4 h-4 fill-current text-embeddly-blue flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                  View Portfolio
                  <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <p className="font-heading text-xs font-bold tracking-widest text-embeddly-blue uppercase mb-1">
                Engineering Timeline
              </p>
              <p className="text-slate-600 text-sm">
                A journey that started with hardware curiosity and grew into building real products.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-embeddly-blue/50 via-embeddly-blue/20 to-transparent" />

              <div className="space-y-8 sm:space-y-10">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="flex gap-5 sm:gap-7 group">
                    {/* Dot */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border-2 border-embeddly-blue/30 group-hover:border-embeddly-blue flex items-center justify-center transition-all duration-300 shadow-sm">
                        <div className="w-3 h-3 rounded-full bg-embeddly-blue/30 group-hover:bg-embeddly-blue transition-all duration-300" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="pb-2">
                      <div className="text-[11px] font-heading font-bold tracking-widest text-embeddly-blue uppercase mb-1.5">
                        {item.period}
                      </div>
                      <h4 className="font-heading text-base sm:text-lg font-bold text-slate-900 mb-1 group-hover:text-embeddly-blue transition-colors">
                        {item.event}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial statement — clearly labeled as editorial */}
            <div className="mt-10 bg-embeddly-navy rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-40 h-40 bg-embeddly-blue/10 blur-[50px] rounded-full" />
              </div>
              <div className="relative z-10">
                <div className="text-[10px] font-heading font-bold tracking-widest text-embeddly-blue uppercase mb-3">
                  Embeddly Editorial
                </div>
                <blockquote className="font-heading text-lg sm:text-xl font-semibold text-white leading-relaxed italic mb-3">
                  &quot;I started building before I knew where it would take me.
                  Now I want students to start building earlier.&quot;
                </blockquote>
                <p className="text-slate-400 text-xs font-medium">
                  — Inspired by Akshay&apos;s engineering journey · Embeddly editorial statement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
