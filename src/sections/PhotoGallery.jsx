"use client";

import { useState } from "react";
import AccordionGallery from "@/components/AccordionGallery";
import LightboxModal from "@/components/LightboxModal";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "@/data/gallery";

const CATEGORY_LABELS = {
  all: "Everything",
  classrooms: "Classrooms",
  workshops: "Workshops",
  projects: "Projects",
  events: "Events",
};

const CONTEXT_LABELS = [
  "Circuit Assembly",
  "PCB Debugging",
  "Firmware Testing",
  "Prototype Assembly",
  "Hardware Experiment",
];

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxItem, setLightboxItem] = useState(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 relative bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-end mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-widest uppercase mb-5">
              Build Gallery
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-[1.15] tracking-tight">
              Things We&apos;ve Built.{" "}
              <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent block mt-0.5">
                Things We&apos;ve Learned.
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`font-heading text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? "bg-embeddly-blue text-white shadow-blue-glow"
                      : "bg-[#F7F9FC] text-slate-600 hover:text-embeddly-blue border border-slate-200 hover:border-embeddly-blue/40"
                  }`}
                >
                  {CATEGORY_LABELS[cat.id] || cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Context labels strip */}
        <div className="flex flex-wrap gap-2 mb-7">
          {CONTEXT_LABELS.map((label) => (
            <span
              key={label}
              className="text-[11px] font-heading font-semibold text-slate-500 bg-[#F7F9FC] border border-slate-200 px-3 py-1 rounded-full"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Accordion Gallery */}
        <div className="w-full max-w-full overflow-hidden">
          <AccordionGallery
            items={filteredItems}
            defaultIndex={Math.min(2, Math.max(0, filteredItems.length - 1))}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#2E5AFF"
            overlayColor="#060010"
            textColor="#ffffff"
            height={460}
            gap={12}
            radius={20}
            grayscale={true}
            showLabels={true}
            onItemClick={(item) => setLightboxItem(item)}
          />
        </div>

        {/* Community quote */}
        <div className="text-center mt-12 sm:mt-14">
          <p className="font-heading text-lg sm:text-xl font-medium text-slate-500 italic">
            &quot;More than a classroom, it&apos;s a community of builders.&quot;
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <LightboxModal
        isOpen={!!lightboxItem}
        onClose={() => setLightboxItem(null)}
        item={lightboxItem}
      />
    </section>
  );
}
