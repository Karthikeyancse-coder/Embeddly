"use client";

import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const MORNING_SLOTS = [
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "11:00 AM",
  "11:15 AM",
  "11:30 AM",
  "11:45 AM",
];

const AFTERNOON_SLOTS = [
  "12:00 PM",
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "1:00 PM",
  "1:15 PM",
  "1:30 PM",
  "1:45 PM",
  "2:00 PM",
  "2:15 PM",
  "2:30 PM",
  "2:45 PM",
  "3:00 PM",
  "3:15 PM",
  "3:30 PM",
  "3:45 PM",
];

const EVENING_SLOTS = [
  "4:00 PM",
  "4:15 PM",
  "4:30 PM",
  "4:45 PM",
  "5:00 PM",
  "5:15 PM",
  "5:30 PM",
  "5:45 PM",
  "6:00 PM",
  "6:15 PM",
  "6:30 PM",
  "6:45 PM",
  "7:00 PM",
  "7:15 PM",
  "7:30 PM",
];

const PARTS_OF_DAY = [
  {
    id: "morning",
    icon: "🌅",
    label: "Morning",
    range: "10:00 AM – 11:45 AM",
    slots: MORNING_SLOTS,
  },
  {
    id: "afternoon",
    icon: "☀️",
    label: "Afternoon",
    range: "12:00 PM – 3:45 PM",
    slots: AFTERNOON_SLOTS,
  },
  {
    id: "evening",
    icon: "🌙",
    label: "Evening",
    range: "4:00 PM – 7:30 PM",
    slots: EVENING_SLOTS,
  },
];

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);

  // Default to October 2026 calendar view
  const [currentMonth, setCurrentMonth] = useState(() => new Date(2026, 9, 1));
  const [selectedDate, setSelectedDate] = useState(() => new Date(2026, 9, 5));

  // Time state: Part of Day selection + Time slot selection
  const [selectedPartOfDay, setSelectedPartOfDay] = useState(null); // 'morning' | 'afternoon' | 'evening' | null
  const [selectedTime, setSelectedTime] = useState("");

  // Form details state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset success state if modal reopens
  useEffect(() => {
    if (isOpen && isSuccess) {
      setIsSuccess(false);
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calendar helpers
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-indexed (9 = October)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Trailing previous month days to fill start of grid
  const prevMonthDays = Array.from({ length: firstDayOfMonth }).map(
    (_, i) => daysInPrevMonth - firstDayOfMonth + 1 + i
  );

  // Next month leading days to complete full grid
  const totalGridCells = firstDayOfMonth + daysInMonth;
  const trailingCells = totalGridCells % 7 === 0 ? 0 : 7 - (totalGridCells % 7);
  const nextMonthDays = Array.from({ length: trailingCells }).map((_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Keep dates before Oct 1, 2026 disabled
  const isPastDay = (day) => {
    const checkDate = new Date(year, month, day);
    const minDate = new Date(2026, 9, 1);
    return checkDate < minDate;
  };

  const handleDateSelect = (day) => {
    const chosen = new Date(year, month, day);
    setSelectedDate(chosen);
  };

  // Format date helper: "Mon, Oct 5, 2026"
  const formattedFullDateString = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  // Format date helper for Time/Details: "Wed, Oct 7 · IST"
  const formattedShortDateString = selectedDate
    ? `${selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })} · IST`
    : "";

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Active part of day data
  const currentPod = PARTS_OF_DAY.find((p) => p.id === selectedPartOfDay);

  // Step 3 validation & submit
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Valid email ID is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-[460px] sm:max-w-[480px] bg-white rounded-3xl shadow-[0_20px_50px_-15px_rgba(15,23,42,0.18)] border border-slate-200/80 overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top Header: 1 Date → 2 Time → 3 Details + Close × ── */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 bg-white">
          <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-medium">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                step === 1
                  ? "text-[#2E5AFF] font-bold"
                  : step > 1
                  ? "text-[#2E5AFF] font-semibold hover:underline"
                  : "text-slate-400"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  step === 1
                    ? "bg-[#2E5AFF] text-white"
                    : step > 1
                    ? "bg-[#2E5AFF]/15 text-[#2E5AFF]"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                1
              </span>
              <span>Date</span>
            </button>

            <span className="text-slate-300 font-light select-none">→</span>

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => {
                if (selectedDate) setStep(2);
              }}
              disabled={!selectedDate}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                step === 2
                  ? "text-[#2E5AFF] font-bold"
                  : step > 2
                  ? "text-[#2E5AFF] font-semibold hover:underline"
                  : "text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  step === 2
                    ? "bg-[#2E5AFF] text-white"
                    : step > 2
                    ? "bg-[#2E5AFF]/15 text-[#2E5AFF]"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                2
              </span>
              <span>Time</span>
            </button>

            <span className="text-slate-300 font-light select-none">→</span>

            {/* Step 3 */}
            <button
              type="button"
              onClick={() => {
                if (selectedDate && selectedTime) setStep(3);
              }}
              disabled={!selectedDate || !selectedTime}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                step === 3
                  ? "text-[#2E5AFF] font-bold"
                  : "text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  step === 3
                    ? "bg-[#2E5AFF] text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                3
              </span>
              <span>Details</span>
            </button>
          </div>

          {/* Close × Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Scrollable Body Area ── */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* SUCCESS SCREEN */}
          {isSuccess ? (
            <div className="py-8 text-center animate-in fade-in zoom-in-95">
              <div className="w-14 h-14 mx-auto mb-3.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-xl font-extrabold text-slate-900 mb-1.5">
                Appointment Booked!
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xs mx-auto mb-5">
                Your 15-minute consultation call has been scheduled successfully.
              </p>
              <div className="inline-block bg-[#EEF4FF] border border-[#D5E2FC] rounded-2xl px-5 py-3 mb-5 text-center shadow-xs">
                <div className="font-heading font-extrabold text-[#2E5AFF] text-sm sm:text-base">
                  {selectedDate?.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · {selectedTime} IST
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  15-min free consultation call
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-5 max-w-xs mx-auto">
                A calendar invitation and WhatsApp reminder have been recorded for {formData.name}.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-7 py-2.5 rounded-full bg-[#2E5AFF] hover:bg-[#1E42D9] text-white font-heading font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* ══════════════════════════════════════════════════
                  STEP 1: DATE
              ══════════════════════════════════════════════════ */}
              {step === 1 && (
                <div className="animate-in fade-in duration-200">
                  {/* Month & Year centered with < on left and > on right */}
                  <div className="flex items-center justify-between mb-5 px-1">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight text-center">
                      {monthNames[month]}, {year}
                    </h3>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Clean 7-column calendar grid */}
                  <div className="w-full">
                    {/* Weekday Labels */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2.5">
                      <div>Sun</div>
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                    </div>

                    {/* Date Grid */}
                    <div className="grid grid-cols-7 gap-y-1.5 gap-x-1 text-center">
                      {/* Previous-month dates (muted/light gray) */}
                      {prevMonthDays.map((d) => (
                        <div
                          key={`prev-${d}`}
                          className="h-9 w-9 sm:h-10 sm:w-10 mx-auto flex items-center justify-center text-xs sm:text-sm font-normal text-slate-300 select-none"
                        >
                          {d}
                        </div>
                      ))}

                      {/* Current month dates */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const thisDate = new Date(year, month, dayNum);
                        const isSelected = isSameDay(selectedDate, thisDate);
                        const past = isPastDay(dayNum);

                        return (
                          <button
                            key={`day-${dayNum}`}
                            type="button"
                            disabled={past}
                            onClick={() => handleDateSelect(dayNum)}
                            className={`h-9 w-9 sm:h-10 sm:w-10 mx-auto rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-center cursor-pointer ${
                              isSelected
                                ? "bg-[#2E5AFF] text-white font-bold shadow-md shadow-[#2E5AFF]/30 scale-105"
                                : past
                                ? "text-slate-300 cursor-not-allowed select-none"
                                : "text-slate-800 hover:bg-slate-100 hover:text-[#2E5AFF]"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}

                      {/* Next-month dates (muted/light gray) */}
                      {nextMonthDays.map((d) => (
                        <div
                          key={`next-${d}`}
                          className="h-9 w-9 sm:h-10 sm:w-10 mx-auto flex items-center justify-center text-xs sm:text-sm font-normal text-slate-300 select-none"
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 1 Bottom Area */}
                  <div className="border-t border-slate-100 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs sm:text-sm text-slate-500 font-medium">
                      Selected:{" "}
                      <span className="font-bold text-slate-900">
                        {formattedFullDateString}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(2);
                        setSelectedPartOfDay(null);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2E5AFF] hover:bg-[#1E42D9] text-white font-heading font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(46,90,255,0.3)] hover:shadow-[0_6px_20px_rgba(46,90,255,0.4)] transition-all cursor-pointer"
                    >
                      Continue to Time →
                    </button>
                  </div>
                </div>
              )}

              {/* ══════════════════════════════════════════════════
                  STEP 2: TIME
              ══════════════════════════════════════════════════ */}
              {step === 2 && (
                <div className="animate-in fade-in duration-200">
                  {/* Step 2 Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-1">
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      Choose a time
                    </h3>
                    <span className="text-xs font-bold text-[#2E5AFF] bg-[#EEF4FF] border border-[#D5E2FC] px-3 py-1 rounded-full shrink-0">
                      {formattedShortDateString}
                    </span>
                  </div>

                  {/* ── Sub-screen A: Part of Day Selection ── */}
                  {!selectedPartOfDay ? (
                    <div>
                      <div className="mb-4">
                        <h4 className="font-heading text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                          Part of day
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          When would you like to talk?
                        </p>
                      </div>

                      {/* Exactly 3 large selectable cards */}
                      <div className="space-y-3">
                        {PARTS_OF_DAY.map((pod) => (
                          <button
                            key={pod.id}
                            type="button"
                            onClick={() => {
                              setSelectedPartOfDay(pod.id);
                              if (!pod.slots.includes(selectedTime)) {
                                setSelectedTime("");
                              }
                            }}
                            className="w-full p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 bg-white hover:border-[#2E5AFF] hover:bg-[#EEF4FF]/25 hover:shadow-xs transition-all duration-150 flex items-center justify-between text-left cursor-pointer group"
                          >
                            <div className="flex items-center gap-3.5">
                              <span className="text-2xl sm:text-3xl select-none">{pod.icon}</span>
                              <div>
                                <div className="font-heading font-bold text-slate-900 group-hover:text-[#2E5AFF] text-base transition-colors">
                                  {pod.label}
                                </div>
                                <div className="text-xs text-slate-500 font-normal mt-0.5">
                                  {pod.range}
                                </div>
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#2E5AFF] group-hover:text-white text-slate-400 flex items-center justify-center transition-all">
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Bottom navigation */}
                      <div className="border-t border-slate-100 mt-6 pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>← Back to Date</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── Sub-screen B: Available 15-Minute Slots for Selected Period ── */
                    <div className="animate-in fade-in duration-200">
                      {/* Return to Part of day link */}
                      <button
                        type="button"
                        onClick={() => setSelectedPartOfDay(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#2E5AFF] mb-3 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>← Back to Part of day</span>
                      </button>

                      {/* Period Header */}
                      <div className="mb-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl select-none">{currentPod?.icon}</span>
                          <div>
                            <div className="font-heading font-bold text-slate-900 text-sm">
                              {currentPod?.label}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {currentPod?.range}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedPartOfDay(null)}
                          className="text-xs font-semibold text-[#2E5AFF] hover:underline cursor-pointer px-2 py-1"
                        >
                          Change
                        </button>
                      </div>

                      {/* 15-minute slots in clean grid */}
                      <div className="grid grid-cols-4 gap-2">
                        {currentPod?.slots.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => handleTimeSelect(time)}
                              className={`h-10 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center justify-center cursor-pointer border ${
                                isSelected
                                  ? "bg-[#2E5AFF] text-white border-[#2E5AFF] font-bold shadow-md shadow-[#2E5AFF]/30 scale-102"
                                  : "bg-slate-50/70 border-slate-200/80 text-slate-800 hover:bg-white hover:border-[#2E5AFF] hover:text-[#2E5AFF]"
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>

                      {/* Step 2 Bottom Navigation */}
                      <div className="border-t border-slate-100 mt-6 pt-4 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedPartOfDay(null)}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>← Back</span>
                        </button>

                        <button
                          type="button"
                          disabled={!selectedTime}
                          onClick={() => setStep(3)}
                          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#2E5AFF] hover:bg-[#1E42D9] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-heading font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(46,90,255,0.3)] hover:shadow-[0_6px_20px_rgba(46,90,255,0.4)] transition-all cursor-pointer"
                        >
                          Continue to Details →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ══════════════════════════════════════════════════
                  STEP 3: DETAILS
              ══════════════════════════════════════════════════ */}
              {step === 3 && (
                <div className="animate-in fade-in duration-200">
                  {/* Step 3 Header */}
                  <div className="mb-4">
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug mb-1">
                      Check if This Program Fits Your Career Goal
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Share your details. Our team will help you understand the roadmap, course structure, and whether this is suitable for your current level and career goals.
                    </p>
                  </div>

                  {/* Selected Appointment Preview Card */}
                  <div className="mb-5 bg-gradient-to-r from-[#EEF4FF] via-white to-[#F8FAFC] border border-[#D5E2FC] rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#2E5AFF] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <CalendarIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-heading font-extrabold text-slate-900 text-xs sm:text-sm">
                          {selectedDate?.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          · {selectedTime || "10:15 AM"} IST
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                          15-min free consultation call
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-bold text-[#2E5AFF] hover:underline cursor-pointer px-1.5 py-0.5"
                    >
                      Change
                    </button>
                  </div>

                  {/* Clean Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                          errors.name
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200 focus:border-[#2E5AFF] focus:ring-2 focus:ring-[#2E5AFF]/15"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone Number (WhatsApp) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                          errors.phone
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200 focus:border-[#2E5AFF] focus:ring-2 focus:ring-[#2E5AFF]/15"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email ID */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email ID <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                          errors.email
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200 focus:border-[#2E5AFF] focus:ring-2 focus:ring-[#2E5AFF]/15"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.email}</p>
                      )}
                    </div>

                    {/* Step 3 Bottom Navigation: ← Back and Book Appointment */}
                    <div className="border-t border-slate-100 mt-5 pt-4 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#2E5AFF] hover:bg-[#1E42D9] text-white font-heading font-bold text-xs sm:text-sm shadow-[0_8px_24px_rgba(46,90,255,0.3)] hover:shadow-[0_12px_32px_rgba(46,90,255,0.45)] transition-all duration-300 cursor-pointer text-center"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
