import { cn } from "@/lib/utils";

export default function SectionHeading({
  tag,
  title,
  highlight,
  subtitle,
  className = "",
  center = true,
}) {
  return (
    <div
      className={cn(
        "mb-12",
        center ? "text-center max-w-[720px] mx-auto" : "max-w-[720px]",
        className
      )}
    >
      {/* Circuit Chip Tag Motif */}
      {tag && (
        <div
          className={cn(
            "flex items-center gap-4 mb-4",
            center ? "justify-center" : "justify-start"
          )}
        >
          <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent to-[#C6D8FF]" />
          <svg
            className="w-5 h-5 text-embeddly-blue flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="5" y="5" width="14" height="14" rx="3" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
          </svg>
          <span className="font-heading text-[0.82rem] font-bold tracking-[0.18em] uppercase text-embeddly-blue">
            {tag}
          </span>
          <div className="h-[1.5px] w-12 bg-gradient-to-l from-transparent to-[#C6D8FF]" />
        </div>
      )}

      {/* Main Title */}
      {title && (
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-slate-900 leading-[1.2] mb-4">
          {title}{" "}
          {highlight && (
            <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
