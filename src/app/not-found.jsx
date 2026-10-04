import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-900 px-4 text-center">
      <div className="font-mono text-xs font-bold text-[#2E5AFF] tracking-widest uppercase mb-2">
        404 // NOT FOUND
      </div>
      <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
        Page Not Found
      </h2>
      <p className="text-slate-600 text-sm max-w-md mb-6">
        The requested page does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#2E5AFF] text-white font-mono text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
      >
        Return Home
      </Link>
    </div>
  );
}
