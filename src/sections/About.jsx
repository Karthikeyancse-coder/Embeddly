import Image from "next/image";

const JOURNEY_STEPS = [
  { emoji: "🔍", step: "Curiosity", desc: "You wonder how a circuit actually works." },
  { emoji: "⚡", step: "First Circuit", desc: "You connect components and see current flow." },
  { emoji: "💥", step: "First Failure", desc: "The board doesn't respond. That's expected." },
  { emoji: "🔬", step: "First Debug", desc: "You find the short. You understand why." },
  { emoji: "🛠️", step: "First Prototype", desc: "Something you built actually works." },
  { emoji: "🚀", step: "Builder", desc: "You think differently about every device around you." },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 relative bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-widest uppercase mb-5">
            ABOUT EMBEDDLY
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-slate-900 leading-[1.15] tracking-tight mb-5">
            From Curious Student{" "}
            <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
              To Confident Builder.
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            We believe engineering students don&apos;t need another place to watch tutorials.
            They need a place to build, fail, experiment, debug and finally make something work.
          </p>
        </div>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Journey Steps */}
          <div>
            <p className="font-heading text-xs font-bold tracking-widest uppercase text-embeddly-blue mb-6">
              The Builder&apos;s Journey
            </p>
            <div className="relative">
              {/* Vertical connector */}
              <div className="absolute left-[18px] top-4 bottom-4 w-px bg-gradient-to-b from-embeddly-blue/30 via-embeddly-blue/20 to-transparent hidden sm:block" />

              <div className="space-y-5">
                {JOURNEY_STEPS.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-embeddly-blue-subtle border border-embeddly-blue/15 flex items-center justify-center text-base flex-shrink-0 z-10 group-hover:bg-embeddly-blue group-hover:border-embeddly-blue transition-all duration-300">
                      <span className="group-hover:scale-110 transition-transform duration-200 inline-block">
                        {item.emoji}
                      </span>
                    </div>
                    <div className="pt-0.5">
                      <div className="font-heading text-sm font-bold text-slate-900 mb-0.5 group-hover:text-embeddly-blue transition-colors">
                        {item.step}
                      </div>
                      <div className="text-slate-500 text-sm leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Lab Photo + Context */}
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-card-lg p-2.5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <Image
                  src="/images/about-lab.jpg"
                  alt="Students working on embedded systems hardware at Embeddly Lab"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
                {/* Overlay label */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-card-md border border-slate-200/80">
                  <div className="font-heading text-sm font-bold text-slate-900 leading-snug">
                    This is what learning looks like at Embeddly.
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Hardware first. Understanding follows.
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting statement */}
            <div className="bg-embeddly-blue-subtle rounded-2xl p-5 border border-embeddly-blue/15">
              <p className="font-heading text-sm font-semibold text-embeddly-blue leading-relaxed">
                "The best way to understand a microcontroller is to program one,
                not read about one."
              </p>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                — Embeddly Build Philosophy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
