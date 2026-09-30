import Image from "next/image";

const OVERLAYS = [
  { label: "Circuit Assembly", top: "10%", left: "5%", color: "blue" },
  { label: "Firmware Testing", top: "10%", right: "5%", color: "amber" },
  { label: "Sensor Integration", bottom: "18%", left: "5%", color: "blue" },
  { label: "PCB Debugging", bottom: "18%", right: "5%", color: "amber" },
];

export default function BuildSession() {
  return (
    <section id="video" className="py-20 sm:py-28 relative bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-widest uppercase mb-5">
              Build Sessions
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-[1.15] tracking-tight mb-4">
              Inside an Embeddly{" "}
              <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
                Build Session.
              </span>
            </h2>
            <p className="text-slate-500 text-sm font-heading font-semibold tracking-wider uppercase mb-4">
              Observe → Try → Break → Debug → Build
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              No passive classroom experience. You work with the hardware.
              Sessions are structured around doing, not watching — you pick up a component,
              you try something, and you figure out what happens.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-5">
            <div className="bg-[#F7F9FC] rounded-2xl p-5 border border-slate-200">
              <div className="font-heading text-xs font-bold text-embeddly-blue uppercase tracking-widest mb-3">
                What a session looks like
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                {[
                  "Brief concept introduction (theory in context)",
                  "Hands-on hardware task with real components",
                  "You write firmware. You flash. You test.",
                  "When something breaks — you debug it.",
                  "Session ends with a working output.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-embeddly-blue font-bold text-xs mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Visual: Lab imagery with overlay labels */}
        <div className="relative rounded-3xl overflow-hidden shadow-card-lg">
          <div className="relative aspect-[16/7] sm:aspect-[16/6] bg-slate-100">
            <Image
              src="/images/enroll-workbench.jpg"
              alt="Students working on hardware at Embeddly build session"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

            {/* Bottom statement */}
            <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10">
              <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.15]">
                No passive classroom experience.
              </p>
              <p className="font-heading text-lg sm:text-xl text-embeddly-amber font-bold mt-1">
                You work with the hardware.
              </p>
            </div>

            {/* Floating labels */}
            {OVERLAYS.map((o) => (
              <div
                key={o.label}
                className="absolute hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-bold shadow-md backdrop-blur-md"
                style={{
                  top: o.top,
                  left: o.left,
                  right: o.right,
                  bottom: o.bottom,
                  background: o.color === "blue" ? "rgba(46,90,255,0.85)" : "rgba(255,176,32,0.9)",
                  color: o.color === "blue" ? "white" : "#1a1a1a",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                {o.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
