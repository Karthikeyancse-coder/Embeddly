"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import AccordionGallery from "@/components/AccordionGallery";
import LightboxModal from "@/components/LightboxModal";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "@/data/gallery";
import { Layers, Cpu, Users, Zap } from "lucide-react";

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxItem, setLightboxItem] = useState(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Tag */}
        <SectionHeading
          tag="PHOTO GALLERY"
          title="A Look Inside"
          highlight="Embeddly"
          subtitle="Moments from our classrooms, workshops, and student projects. Real people, real learning, real hardware."
        />

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`font-heading text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "bg-embeddly-blue text-white shadow-blue-glow scale-105"
                    : "bg-white text-slate-600 hover:text-embeddly-blue border border-slate-200 hover:border-embeddly-blue/40 shadow-sm"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Accordion Gallery Row from React Bits */}
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

        {/* Community Testimonial Quote */}
        <div className="text-center mt-12 sm:mt-14">
          <p className="font-heading text-lg sm:text-xl font-medium text-slate-600 italic">
            “More than a classroom, it’s a community of builders.”
          </p>
        </div>

        {/* Feature Pills Strip */}
        <div className="w-full flex justify-center mt-8 sm:mt-10 px-2 sm:px-0">
          <div className="grid grid-cols-2 max-[360px]:grid-cols-1 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-5 md:flex md:flex-row md:items-center md:justify-center md:flex-nowrap md:gap-5 lg:gap-7 px-5 sm:px-7 py-4 bg-white border border-slate-200 rounded-2xl md:rounded-full shadow-card-sm w-full max-w-sm sm:max-w-md md:w-fit md:max-w-full">
            <div className="flex items-center gap-2.5 text-slate-900 font-semibold text-[13.5px] sm:text-sm lg:text-base leading-[1.3] min-w-0">
              <Layers className="w-5 h-5 text-embeddly-blue shrink-0" />
              <span className="md:whitespace-nowrap">Hands-on Learning</span>
            </div>

            <div className="hidden md:block w-px h-5 bg-slate-200 flex-shrink-0" />

            <div className="flex items-center gap-2.5 text-slate-900 font-semibold text-[13.5px] sm:text-sm lg:text-base leading-[1.3] min-w-0">
              <Cpu className="w-5 h-5 text-embeddly-blue shrink-0" />
              <span className="md:whitespace-nowrap">Real-World Projects</span>
            </div>

            <div className="hidden md:block w-px h-5 bg-slate-200 flex-shrink-0" />

            <div className="flex items-center gap-2.5 text-slate-900 font-semibold text-[13.5px] sm:text-sm lg:text-base leading-[1.3] min-w-0">
              <Users className="w-5 h-5 text-embeddly-blue shrink-0" />
              <span className="md:whitespace-nowrap">Supportive Community</span>
            </div>

            <div className="hidden md:block w-px h-5 bg-slate-200 flex-shrink-0" />

            <div className="flex items-center gap-2.5 text-slate-900 font-semibold text-[13.5px] sm:text-sm lg:text-base leading-[1.3] min-w-0">
              <Zap className="w-5 h-5 text-embeddly-blue shrink-0" />
              <span className="md:whitespace-nowrap">Brighter Futures</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={!!lightboxItem}
        onClose={() => setLightboxItem(null)}
        item={lightboxItem}
      />
    </section>
  );
}
