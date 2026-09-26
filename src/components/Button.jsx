import { cn } from "@/lib/utils";

export default function Button({
  children,
  variant = "amber",
  className = "",
  showArrow = true,
  loading = false,
  href,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 font-heading text-[1rem] font-bold rounded-full transition-all duration-300 cursor-pointer select-none";

  const variants = {
    amber:
      "bg-gradient-to-r from-embeddly-amber to-embeddly-amber-hover text-slate-900 shadow-amber-glow hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,176,32,0.45)] hover:from-[#FFB938] hover:to-[#FFA812] active:translate-y-0 px-7 py-3.5",
    secondary:
      "bg-white text-slate-900 border-[1.5px] border-embeddly-border-light shadow-card-sm hover:-translate-y-0.5 hover:border-embeddly-blue hover:text-embeddly-blue hover:shadow-card-md px-6 py-3",
  };

  const content = (
    <>
      {loading ? (
        <svg
          className="w-5 h-5 animate-spin mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
        </svg>
      ) : null}
      <span>{children}</span>
      {showArrow && !loading && (
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseStyles, variants[variant], "group", className)}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], "group", className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {content}
    </button>
  );
}
