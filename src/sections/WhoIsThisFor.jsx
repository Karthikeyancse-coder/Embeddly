import { ArrowRight } from "lucide-react";

const FOR_STUDENTS = [
  "Want to understand what happens beyond Arduino tutorials.",
  "Know programming and want to control physical hardware.",
  "Have ideas but don't know how to turn them into prototypes.",
  "Want practical electronics experience they can demonstrate.",
  "Want to build something — not just complete a course.",
];

export default function WhoIsThisFor() {
  return (
    <section id="who" className="py-20 sm:py-28 bg-[#F7F9FC] relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-widest uppercase mb-5">
              Who Is This For?
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-[1.15] tracking-tight mb-6">
              This is for students{" "}
              <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
                who...
              </span>
            </h2>

            <ul className="space-y-4 mb-8">
              {FOR_STUDENTS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-xl bg-embeddly-blue-subtle border border-embeddly-blue/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-embeddly-blue group-hover:border-embeddly-blue transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-embeddly-blue group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdzJmpaxI66ItK05FitoIQ7jOeOrA_vra4jAW717RMDhlQ1pw/viewform?fbzx=6666488062294828495"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-embeddly-amber hover:bg-embeddly-amber-hover text-slate-900 font-heading font-bold text-sm shadow-amber-glow hover:shadow-[0_8px_24px_rgba(255,176,32,0.45)] transition-all duration-300 group cursor-pointer"
            >
              Start Building
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right: Certificate statement */}
          <div className="space-y-5">
            <div className="bg-embeddly-navy rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-embeddly-blue/10 blur-[50px] pointer-events-none" />
              <div className="relative z-10">
                <div className="font-heading text-2xl sm:text-3xl font-bold text-white leading-[1.2] mb-3">
                  Not Another Certificate-First Internship.
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  If your only goal is a certificate, this may not be the right
                  program for you.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-card-md p-6 sm:p-7">
              <div className="font-heading text-lg font-bold text-slate-900 mb-3">
                If you want to build something that works...
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                You&apos;re in the right place. We care about the working output more than
                the completion percentage.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Hands-on", "Offline", "Hardware-First", "2 Weeks", "10 Builders"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-heading font-bold text-embeddly-blue bg-embeddly-blue-subtle border border-embeddly-blue/15 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick program summary */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "10", label: "Builders" },
                { num: "2W", label: "Duration" },
                { num: "1", label: "Real Build" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center shadow-card-sm">
                  <div className="font-heading text-2xl font-bold text-embeddly-blue">{s.num}</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
