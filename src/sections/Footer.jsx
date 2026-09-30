import Image from "next/image";
import { ArrowRight } from "lucide-react";

const EXPLORE_LINKS = [
  { label: "About", href: "#about" },
  { label: "Build Sessions", href: "#video" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
  { label: "Internship", href: "#program" },
];

const CONNECT_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akshay-venkatesan-3b589b28a/",
    external: true,
  },
  { label: "Contact", href: "#enroll" },
];

export default function Footer() {
  return (
    <footer className="bg-embeddly-navy pt-14 pb-10 relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(46,90,255,0.12) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-embeddly-blue/30 to-transparent" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">

          {/* Brand Column */}
          <div className="md:col-span-5">
            <a href="#home" className="inline-block mb-4" aria-label="Embeddly Home">
              <Image
                src="/logo/NAVAHARISHEMBDDLY (1).png"
                alt="Embeddly Logo"
                width={150}
                height={40}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="text-embeddly-blue font-heading text-xs font-bold tracking-widest uppercase mb-4">
              Learn · Build · Create
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              A practical engineering platform for students who want to move from
              ideas to working hardware. Not another course catalogue — a place to
              build.
            </p>
            {/* EDDY tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-heading font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              EDDY · Your build companion
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h4 className="font-heading text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-embeddly-blue opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h4 className="font-heading text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 mb-6">
              {CONNECT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-embeddly-blue opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mentor quick link */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
              <div className="text-[10px] font-heading font-bold text-embeddly-blue uppercase tracking-widest mb-2">
                Mentor
              </div>
              <a
                href="https://akshayv.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-sm font-bold text-white hover:text-embeddly-blue transition-colors flex items-center justify-between group"
              >
                Akshay Venkatesan
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="text-slate-500 text-xs mt-0.5">CTO, SQUAROOTS · 4th Year ECE</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Embeddly. Built for engineers who build.
          </div>
          <div className="font-heading font-semibold text-slate-400 tracking-wider">
            DON&apos;T JUST LEARN IT. BUILD IT.
          </div>
        </div>
      </div>
    </footer>
  );
}
