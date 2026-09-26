import Image from "next/image";
import { Quote, Layers, Cpu, Users, Award } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";
import { ABOUT_STATS } from "@/data/stats";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Tag */}
        <SectionHeading tag="ABOUT US" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Mission & Stat Cards */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-embeddly-blue-subtle border border-dashed border-[#BFD3FE] text-embeddly-blue font-heading text-xs font-bold tracking-wider uppercase mb-4">
              Our Mission
            </div>

            <h3 className="font-heading text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-slate-900 leading-[1.2] mb-6">
              Making Electronics Learning{" "}
              <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
                Practical, Accessible
              </span>{" "}
              and Exciting.
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Embeddly is an electronics education company focused on hands-on
              learning. We help students gain real-world skills in electronics,
              embedded systems, and IoT through practical courses, live projects,
              and expert mentorship.
            </p>

            {/* 3 Stat Cards in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
              {ABOUT_STATS.map((stat) => (
                <StatCard
                  key={stat.title}
                  target={stat.target}
                  suffix={stat.suffix}
                  title={stat.title}
                  sublabel={stat.sublabel}
                  icon={stat.icon}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Lab Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-card-lg p-2.5 sm:p-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <Image
                  src="/images/about-lab.jpg"
                  alt="Students building embedded robotics projects at Embeddly Lab"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />

                {/* Floating Student Quote Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-card-md border border-slate-200/80 flex items-start gap-3">
                  <Quote className="w-5 h-5 text-embeddly-blue flex-shrink-0 mt-0.5" />
                  <div className="font-heading text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                    Hands-on learning today. A smarter tomorrow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pills Strip */}
        <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl sm:rounded-full shadow-card-sm max-w-4xl mx-auto mt-16 sm:mt-20">
          <div className="inline-flex items-center gap-2 text-slate-900 font-semibold text-sm sm:text-base px-2">
            <Layers className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
            <span>Hands-on Learning</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <div className="inline-flex items-center gap-2 text-slate-900 font-semibold text-sm sm:text-base px-2">
            <Cpu className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
            <span>Real Projects</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <div className="inline-flex items-center gap-2 text-slate-900 font-semibold text-sm sm:text-base px-2">
            <Users className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
            <span>Expert Mentorship</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <div className="inline-flex items-center gap-2 text-slate-900 font-semibold text-sm sm:text-base px-2">
            <Award className="w-4 h-4 text-embeddly-blue flex-shrink-0" />
            <span>Career-Ready Skills</span>
          </div>
        </div>
      </div>
    </section>
  );
}
