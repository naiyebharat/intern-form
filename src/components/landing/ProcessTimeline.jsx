"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Search, UserCheck, Rocket } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

const ICONS = {
  Send,
  Search,
  UserCheck,
  Rocket
};

const PHASE_STYLES = [
  {
    // Phase 1 - Violet
    badge: "bg-violet-100/90 text-violet-700 border-violet-200",
    topBorder: "border-t-violet-500",
    cardBorder: "border-violet-100/80",
    cardBg: "bg-gradient-to-br from-violet-50/85 via-white to-purple-50/45",
    shadow: "shadow-xl shadow-violet-500/10 hover:shadow-2xl hover:shadow-violet-500/20",
    nodeBorder: "border-violet-400 text-violet-600 bg-white shadow-violet-200",
    nodeDot: "bg-violet-500",
    connectorLine: "border-violet-300/80",
    hoverTitle: "group-hover:text-violet-600",
  },
  {
    // Phase 2 - Blue
    badge: "bg-blue-100/90 text-blue-700 border-blue-200",
    topBorder: "border-t-blue-500",
    cardBorder: "border-blue-100/80",
    cardBg: "bg-gradient-to-br from-blue-50/85 via-white to-sky-50/45",
    shadow: "shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20",
    nodeBorder: "border-blue-400 text-blue-600 bg-white shadow-blue-200",
    nodeDot: "bg-blue-500",
    connectorLine: "border-blue-300/80",
    hoverTitle: "group-hover:text-blue-600",
  },
  {
    // Phase 3 - Emerald
    badge: "bg-emerald-100/90 text-emerald-700 border-emerald-200",
    topBorder: "border-t-emerald-500",
    cardBorder: "border-emerald-100/80",
    cardBg: "bg-gradient-to-br from-emerald-50/85 via-white to-teal-50/45",
    shadow: "shadow-xl shadow-emerald-500/10 hover:shadow-2xl hover:shadow-emerald-500/20",
    nodeBorder: "border-emerald-400 text-emerald-600 bg-white shadow-emerald-200",
    nodeDot: "bg-emerald-500",
    connectorLine: "border-emerald-300/80",
    hoverTitle: "group-hover:text-emerald-600",
  },
  {
    // Phase 4 - Amber / Orange
    badge: "bg-amber-100/90 text-amber-700 border-amber-200",
    topBorder: "border-t-amber-500",
    cardBorder: "border-amber-100/80",
    cardBg: "bg-gradient-to-br from-amber-50/85 via-white to-orange-50/45",
    shadow: "shadow-xl shadow-amber-500/10 hover:shadow-2xl hover:shadow-amber-500/20",
    nodeBorder: "border-amber-400 text-amber-600 bg-white shadow-amber-200",
    nodeDot: "bg-amber-500",
    connectorLine: "border-amber-300/80",
    hoverTitle: "group-hover:text-amber-600",
  },
];

function TimelineItem({ step, index }) {
  const isEven = index % 2 === 0;
  const Icon = ICONS[step.icon] || Rocket;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const style = PHASE_STYLES[index % PHASE_STYLES.length];

  return (
    <div ref={ref} className="relative mb-16 sm:mb-20 last:mb-0">
      {/* Central Node for Desktop (md:flex) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
        <div
          className={`relative w-12 h-12 rounded-full border-2 ${style.nodeBorder} shadow-lg flex items-center justify-center group transition-transform duration-300 hover:scale-110`}
        >
          <Icon className="w-5 h-5" />
          <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full ${style.nodeDot} border-2 border-white`} />
        </div>
      </div>

      {/* Node for Mobile (< md) */}
      <div className="md:hidden absolute left-4 top-8 -translate-x-1/2 z-20 flex items-center justify-center">
        <div className={`w-9 h-9 rounded-full ${style.nodeBorder} border-2 shadow-md flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Desktop Grid Layout: 2 Columns with Generous Separation and Connector Lines */}
      <div className="hidden md:grid md:grid-cols-2 items-center">
        {/* Left Column Slot (Even indexes) */}
        <div className="relative pr-12 lg:pr-16 flex justify-end">
          {isEven && (
            <div className="relative w-full max-w-[500px]">
              {/* Horizontal Branch Connector Line from Card to Central Node */}
              <div
                className={`absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 w-12 lg:w-16 border-t-2 border-dashed ${style.connectorLine} z-10`}
              >
                {/* Small indicator dot at card junction */}
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${style.nodeDot}`} />
              </div>

              {/* Card with Top Colored Border Accent & Soft Gradient Background */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -4 }}
                className={`relative w-full rounded-3xl p-7 sm:p-8 border ${style.cardBorder} border-t-4 ${style.topBorder} ${style.cardBg} ${style.shadow} backdrop-blur-xl text-left group transition-all duration-300`}
              >
                {/* Top Header: Phase Badge & Step Indicator */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border ${style.badge}`}>
                    Phase {step.step}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Step {step.step} of 04</span>
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-bold text-slate-800 mb-2.5 tracking-tight ${style.hoverTitle} transition-colors`}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>
          )}
        </div>

        {/* Right Column Slot (Odd indexes) */}
        <div className="relative pl-12 lg:pl-16 flex justify-start">
          {!isEven && (
            <div className="relative w-full max-w-[500px]">
              {/* Horizontal Branch Connector Line from Central Node to Card */}
              <div
                className={`absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 w-12 lg:w-16 border-t-2 border-dashed ${style.connectorLine} z-10`}
              >
                {/* Small indicator dot at card junction */}
                <span className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${style.nodeDot}`} />
              </div>

              {/* Card with Top Colored Border Accent & Soft Gradient Background */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -4 }}
                className={`relative w-full rounded-3xl p-7 sm:p-8 border ${style.cardBorder} border-t-4 ${style.topBorder} ${style.cardBg} ${style.shadow} backdrop-blur-xl text-left group transition-all duration-300`}
              >
                {/* Top Header: Phase Badge & Step Indicator */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border ${style.badge}`}>
                    Phase {step.step}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Step {step.step} of 04</span>
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-bold text-slate-800 mb-2.5 tracking-tight ${style.hoverTitle} transition-colors`}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Single Column Layout */}
      <div className="md:hidden pl-10 pr-2">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`relative rounded-2xl p-5 sm:p-6 border ${style.cardBorder} border-t-4 ${style.topBorder} ${style.cardBg} ${style.shadow} text-left`}
        >
          {/* Mobile horizontal branch line */}
          <div className={`absolute -left-6 top-8 w-6 border-t-2 border-dashed ${style.connectorLine}`} />

          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border ${style.badge}`}>
              Phase {step.step}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Step {step.step} of 04</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1.5">{step.title}</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{step.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProcessTimeline() {
  const ref = useRef(null);

  return (
    <section ref={ref} className="relative z-10 py-24 px-4 sm:px-6">
      <div className="w-[92%] max-w-[1300px] mx-auto">
        <SectionHeading
          badge="The Journey"
          title="How It Works"
          subtitle="From application to internship in 4 simple, transparent phases."
          gradient="linear-gradient(135deg, #7c3aed, #2563eb)"
        />

        <div className="relative mt-16 sm:mt-20">
          {/* Central Vertical Timeline Line (Desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 rounded-full"
            style={{ background: "linear-gradient(180deg, #c4b5fd, #93c5fd, #6ee7b7, #fcd34d)" }}
          />

          {/* Left Vertical Timeline Line (Mobile) */}
          <div
            className="md:hidden absolute left-4 top-4 bottom-4 w-0.5 -translate-x-1/2 rounded-full"
            style={{ background: "linear-gradient(180deg, #c4b5fd, #93c5fd, #6ee7b7, #fcd34d)" }}
          />

          {/* Timeline Steps */}
          {PROCESS_STEPS.map((step, i) => (
            <TimelineItem key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
