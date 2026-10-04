"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#F8FAFC] text-slate-900 font-sans min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
        <button
          onClick={() => reset()}
          className="px-6 py-2 rounded-full bg-[#2E5AFF] text-white font-medium"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
