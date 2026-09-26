"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Zap,
  Users,
  Cpu,
  TrendingUp,
  User,
  Mail,
  Phone,
  BookOpen,
  Lock,
  Check,
  AlertCircle,
  FileText,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { ENROLL_BENEFITS, COURSE_PROGRAMS, ROADMAP_STEPS } from "@/data/courses";

const BENEFIT_ICONS = {
  Zap: Zap,
  Users: Users,
  Cpu: Cpu,
  TrendingUp: TrendingUp,
};

const STEP_ICONS = {
  FileText: FileText,
  BookOpen: BookOpen,
  Cpu: Cpu,
  Zap: Zap,
};

export default function Enrollment() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    courseInterest: "",
    companyWebsite: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canvasRef = useRef(null);

  const validate = () => {
    const errs = {};
    if (!formData.studentName.trim() || formData.studentName.trim().length < 2) {
      errs.studentName = "Please enter your full name";
    }
    if (
      !formData.studentEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail.trim())
    ) {
      errs.studentEmail = "Please enter a valid email address";
    }
    const digits = formData.studentPhone.replace(/\D/g, "");
    if (!digits || digits.length < 7) {
      errs.studentPhone = "Please enter your phone number";
    }
    if (!formData.courseInterest) {
      errs.courseInterest = "Please choose a course program";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.form) {
      setErrors((prev) => ({ ...prev, [name]: null, form: null }));
    }
  };

  // Launch celebratory confetti explosion on canvas
  const launchConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth || 400;
    canvas.height = parent.offsetHeight || 500;

    const colors = [
      "#1864FF",
      "#FFB735",
      "#10B981",
      "#6366F1",
      "#EC4899",
      "#38BDF8",
    ];
    const particles = [];
    const particleCount = 42;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.35,
        w: Math.random() * 8 + 5,
        h: Math.random() * 5 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 11,
        vy: (Math.random() - 0.85) * 11 - 2,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 14,
        opacity: 1,
        gravity: 0.28,
      });
    }

    let animationId;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let isAlive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.vr;
        p.opacity -= 0.012;

        if (p.opacity > 0) {
          isAlive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (isAlive) {
        animationId = requestAnimationFrame(render);
      }
    }
    render();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors((prev) => ({
          ...prev,
          form: data.error || "Submission failed. Please try again.",
        }));
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(launchConfetti, 100);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: "Network error. Please check your connection and try again.",
      }));
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      studentName: "",
      studentEmail: "",
      studentPhone: "",
      courseInterest: "",
      companyWebsite: "",
    });
    setErrors({});
  };

  return (
    <section id="enroll" className="py-20 sm:py-28 relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Tag */}
        <SectionHeading tag="ENROLL NOW" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Copy, Benefits & Workbench Visual */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h3 className="font-heading text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-slate-900 leading-[1.2] mb-4">
              Ready to Start{" "}
              <span className="bg-gradient-to-r from-embeddly-blue to-[#0042E0] bg-clip-text text-transparent">
                Building?
              </span>
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Join Embeddly and gain practical electronics and embedded systems
              skills that prepare you for real-world opportunities.
            </p>

            {/* 4 Benefit Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              {ENROLL_BENEFITS.map((benefit) => {
                const IconComponent = BENEFIT_ICONS[benefit.icon] || Zap;
                return (
                  <div
                    key={benefit.name}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-card-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-embeddly-blue-subtle text-embeddly-blue flex items-center justify-center flex-shrink-0 border border-embeddly-blue/15">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-heading text-sm font-bold text-slate-900 leading-snug">
                        {benefit.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {benefit.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Workbench Visual Card */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-card-lg p-2 sm:p-2.5 w-full">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100">
                <Image
                  src="/images/enroll-workbench.jpg"
                  alt="Electronics books, Arduino breadboard, and coffee desk"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 text-xs sm:text-sm font-heading font-bold text-slate-800 text-center border border-white/50">
                  Your Next Big Project Starts Here.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Elevated Modern Enrollment Form Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-card-lg p-6 sm:p-8 overflow-hidden min-h-[560px]">
              {!isSubmitted ? (
                <>
                  {/* Form Header */}
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-embeddly-blue-subtle text-embeddly-blue flex items-center justify-center mx-auto mb-3 border border-embeddly-blue/15 shadow-sm">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading text-2xl font-bold text-slate-900 mb-1">
                      Enrollment Form
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Take the first step towards a brighter engineering future.
                    </p>
                  </div>

                  {/* Form Body */}
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="studentName"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                      >
                        Full Name <span className="text-amber-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-xl border flex items-center transition-all duration-200 ${
                          errors.studentName
                            ? "border-red-400 ring-2 ring-red-100 shake-error"
                            : "border-slate-200 focus-within:border-embeddly-blue focus-within:ring-2 focus-within:ring-embeddly-blue/15"
                        }`}
                      >
                        <User className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          id="studentName"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          autoComplete="name"
                          className="w-full py-3.5 pl-11 pr-4 rounded-xl text-sm bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                      {errors.studentName && (
                        <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.studentName}</span>
                        </div>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="studentEmail"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                      >
                        Email Address <span className="text-amber-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-xl border flex items-center transition-all duration-200 ${
                          errors.studentEmail
                            ? "border-red-400 ring-2 ring-red-100 shake-error"
                            : "border-slate-200 focus-within:border-embeddly-blue focus-within:ring-2 focus-within:ring-embeddly-blue/15"
                        }`}
                      >
                        <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          id="studentEmail"
                          name="studentEmail"
                          value={formData.studentEmail}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          autoComplete="email"
                          className="w-full py-3.5 pl-11 pr-4 rounded-xl text-sm bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                      {errors.studentEmail && (
                        <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.studentEmail}</span>
                        </div>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="studentPhone"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                      >
                        Phone Number <span className="text-amber-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-xl border flex items-center transition-all duration-200 ${
                          errors.studentPhone
                            ? "border-red-400 ring-2 ring-red-100 shake-error"
                            : "border-slate-200 focus-within:border-embeddly-blue focus-within:ring-2 focus-within:ring-embeddly-blue/15"
                        }`}
                      >
                        <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="tel"
                          id="studentPhone"
                          name="studentPhone"
                          value={formData.studentPhone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          autoComplete="tel"
                          className="w-full py-3.5 pl-11 pr-4 rounded-xl text-sm bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                      {errors.studentPhone && (
                        <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.studentPhone}</span>
                        </div>
                      )}
                    </div>

                    {/* Course Interest Dropdown */}
                    <div>
                      <label
                        htmlFor="courseInterest"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                      >
                        Course Interest <span className="text-amber-500">*</span>
                      </label>
                      <div
                        className={`relative rounded-xl border flex items-center transition-all duration-200 ${
                          errors.courseInterest
                            ? "border-red-400 ring-2 ring-red-100 shake-error"
                            : "border-slate-200 focus-within:border-embeddly-blue focus-within:ring-2 focus-within:ring-embeddly-blue/15"
                        }`}
                      >
                        <BookOpen className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <select
                          id="courseInterest"
                          name="courseInterest"
                          value={formData.courseInterest}
                          onChange={handleChange}
                          className="w-full py-3.5 pl-11 pr-10 rounded-xl text-sm bg-transparent outline-none text-slate-900 appearance-none cursor-pointer"
                        >
                          <option value="" disabled>
                            Select a course program
                          </option>
                          {COURSE_PROGRAMS.map((course) => (
                            <option key={course} value={course}>
                              {course}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="w-4 h-4 text-slate-400 absolute right-4 pointer-events-none"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      {errors.courseInterest && (
                        <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.courseInterest}</span>
                        </div>
                      )}
                    </div>

                    {/* 🍯 Honeypot field (hidden from screen readers & users) */}
                    <div style={{ display: "none" }} aria-hidden="true">
                      <input
                        type="text"
                        name="companyWebsite"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.companyWebsite || ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Form-level Error Message */}
                    {errors.form && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errors.form}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        loading={isSubmitting}
                        className="w-full py-4 text-center"
                      >
                        {isSubmitting ? "Securing Your Seat..." : "Enroll Now"}
                      </Button>
                    </div>

                    {/* Security Note */}
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Your information is safe and secure with us.</span>
                    </div>
                  </form>
                </>
              ) : (
                /* Celebratory Success Confirmation State */
                <div className="relative py-8 flex flex-col items-center text-center">
                  <canvas
                    ref={canvasRef}
                    className="confetti-canvas absolute inset-0 pointer-events-none"
                  />

                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
                    Seat Reserved
                  </span>

                  <h4 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                    Welcome to Embeddly!
                  </h4>

                  <p className="text-sm sm:text-base text-slate-600 max-w-sm mb-6 leading-relaxed">
                    Congratulations,{" "}
                    <strong className="text-slate-900">
                      {formData.studentName || "Student"}
                    </strong>
                    ! Your application for{" "}
                    <strong className="text-slate-900">
                      {formData.courseInterest || "Electronics Course"}
                    </strong>{" "}
                    has been successfully received. Our admissions team will reach
                    out via email shortly.
                  </p>

                  <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-left space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-500 font-medium">Status</span>
                      <span className="text-emerald-600 font-bold">
                        Confirmed • Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-500 font-medium">Email</span>
                      <span className="text-slate-800 font-medium">
                        {formData.studentEmail}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                    showArrow={false}
                    className="w-full"
                  >
                    Submit Another Application
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4-Step Roadmap Flow Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white border border-slate-200 rounded-3xl shadow-card-sm max-w-5xl mx-auto mt-16 sm:mt-20">
          {ROADMAP_STEPS.map((step, idx) => {
            const IconComponent = STEP_ICONS[step.icon] || FileText;
            return (
              <div key={step.title} className="flex items-center gap-4 p-2">
                <div className="w-12 h-12 rounded-2xl bg-embeddly-blue-subtle text-embeddly-blue flex items-center justify-center flex-shrink-0 border border-embeddly-blue/15 font-heading font-bold text-lg">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold text-slate-900">
                    {step.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
