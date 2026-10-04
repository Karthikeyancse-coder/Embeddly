"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-900 px-4 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 font-mono text-xs font-semibold uppercase mb-4">
        Application Error
      </div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-slate-600 text-sm max-w-md mb-6">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full bg-[#2E5AFF] text-white font-mono text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
