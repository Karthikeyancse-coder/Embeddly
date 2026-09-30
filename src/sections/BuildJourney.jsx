import { ArrowRight } from "lucide-react";

const WEEK1 = [
  "Embedded fundamentals",
  "Microcontrollers",
  "Sensors",
  "Electronics",
  "Firmware",
  "Circuit building",
];

const WEEK2 = [
  "PCB exposure",
  "Soldering",
  "Guided project",
  "Hardware integration",
  "Prototype development",
  "Final demonstration",
];

const TAKEAWAY = [
  "Practical hardware experience",
  "Guided project experience",
  "Prototype-building experience",
  "Embedded development skills",
  "Mentor interaction",
  "Real engineering workflow exposure",
];

const FEE_BREAKDOWN = [
  { label: "Hardware Kit", amount: "₹4,000" },
  { label: "Technical Training", amount: "₹1,000" },
  { label: "Practical Lab Training", amount: "₹1,200" },
  { label: "Project Mentoring", amount: "₹1,800" },
];

export default function BuildJourney() {
  return (
    <section id="program" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-widest uppercase mb-5">
            Program Details
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-slate-900 leading-[1.15] tracking-tight mb-4">
            Your 2-Week{" "}
            <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
              Build Journey
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Two structured weeks. One working prototype.
          </p>
        </div>

        {/* Weeks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:mb-14">
          {/* Week 1 */}
          <div className="bg-[#F7F9FC] rounded-3xl border border-slate-200 p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-2xl bg-embeddly-blue text-white font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                01
              </div>
              <div>
                <div className="text-[10px] font-heading font-bold tracking-widest text-embeddly-blue uppercase">
                  Week One
                </div>
                <div className="font-heading text-base font-bold text-slate-900">
                  Understand → Connect → Code
                </div>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {WEEK1.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-embeddly-blue flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Week 2 */}
          <div className="bg-embeddly-navy rounded-3xl border border-white/10 p-6 sm:p-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-embeddly-blue/15 blur-[40px] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-2xl bg-embeddly-blue text-white font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                  02
                </div>
                <div>
                  <div className="text-[10px] font-heading font-bold tracking-widest text-embeddly-blue uppercase">
                    Week Two
                  </div>
                  <div className="font-heading text-base font-bold text-white">
                    Design → Build → Debug → Demonstrate
                  </div>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {WEEK2.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-embeddly-blue flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* What You Take Home */}
        <div className="bg-[#F7F9FC] rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 sm:mb-14">
          <div className="text-[10px] font-heading font-bold tracking-widest text-embeddly-blue uppercase mb-5">
            What You Take Home
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {TAKEAWAY.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-embeddly-blue flex-shrink-0" />
                <span className="text-sm text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Program Investment + Limited Batch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Fee table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card-md p-6 sm:p-7">
            <div className="text-[10px] font-heading font-bold tracking-widest text-embeddly-blue uppercase mb-5">
              Program Investment
            </div>
            <div className="space-y-3 mb-5">
              {FEE_BREAKDOWN.map((f) => (
                <div key={f.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">{f.label}</span>
                  <span className="font-heading font-bold text-slate-900">{f.amount}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="font-heading font-bold text-slate-900 text-base">Total</span>
              <span className="font-heading font-bold text-embeddly-blue text-2xl">₹8,000</span>
            </div>
          </div>

          {/* Limited batch info */}
          <div className="bg-embeddly-navy rounded-3xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-40 h-40 bg-embeddly-blue/10 blur-[50px] pointer-events-none" />
            <div className="relative z-10">
              <div className="text-[10px] font-heading font-bold tracking-widest text-embeddly-blue uppercase mb-3">
                Batch Size
              </div>
              <div className="font-heading text-5xl font-bold text-white mb-2">10</div>
              <div className="font-heading text-lg font-bold text-embeddly-blue mb-3">Builders Only</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                The initial batch is intentionally limited to 10 students to maintain a
                hands-on learning environment and meaningful mentor interaction.
              </p>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-[10px] font-bold">!</span>
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-amber-900 mb-1">
                Important — Please Read
              </p>
              <p className="text-amber-800 text-sm leading-relaxed">
                This is an interest form, not a final enrollment or payment form. Submitting
                the form does not confirm admission, reserve a seat, or create a payment
                obligation. The Embeddly team may contact interested students to explain
                the program and discuss next steps.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Row */}
        <div className="mt-10 text-center">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdzJmpaxI66ItK05FitoIQ7jOeOrA_vra4jAW717RMDhlQ1pw/viewform?fbzx=6666488062294828495"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-embeddly-blue hover:bg-embeddly-blue-hover text-white font-heading font-bold text-sm sm:text-base shadow-blue-glow hover:shadow-[0_8px_30px_rgba(46,90,255,0.35)] transition-all duration-300 group cursor-pointer"
          >
            Register Interest
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
