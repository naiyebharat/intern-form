"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Home, Award } from "lucide-react";
import { PROGRAM } from "@/lib/constants";

export default function HeroSection({ onApplyClick }) {
  return (
    <section className="relative z-10 min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-10 lg:py-16">
      <div className="w-[92%] max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Text & CTAs (col-span-12 on mobile, col-span-6 on desktop) */}
        <div className="w-full lg:col-span-6 flex flex-col items-start text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-violet-200 bg-violet-50/90 shadow-sm"
            style={{ color: "#7c3aed" }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Applications Open — {PROGRAM.batchName}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight"
          >
            <span className="block text-slate-800">Welcome to</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb, #059669)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Naiye Bharat
            </span>
            <span className="block text-slate-800 text-3xl sm:text-5xl lg:text-5xl xl:text-6xl mt-2 font-bold">
              Internship Program
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed"
          >
            A 3–month, 100% remote internship program designed to give you real-world experience, mentorship, and a certified proof of your skills — shaping tomorrow&apos;s India, one intern at a time.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={() => onApplyClick()}
              whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white text-base shadow-xl cursor-pointer"
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.a
              href="#roles"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-slate-700 bg-white/90 border border-slate-200 backdrop-blur hover:border-violet-300 hover:text-violet-700 transition-colors shadow-sm cursor-pointer"
            >
              Explore Roles <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center gap-3"
          >
            {[
              { icon: Clock, text: "3 Month Program", color: "from-violet-500 to-purple-500" },
              { icon: Home, text: "Work From Home", color: "from-blue-500 to-sky-500" },
              { icon: Award, text: "Certificate", color: "from-emerald-500 to-teal-500" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-card border border-white/80 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm"
              >
                <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                  <badge.icon className="w-3.5 h-3.5 text-white" />
                </div>
                {badge.text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Hidden on phone/mobile screens, visible on desktop (hidden lg:flex) with smooth continuous vertical bounce animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex lg:col-span-6 relative w-full items-center justify-center"
        >
          {/* Glowing background aura with soft pulse */}
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              opacity: [0.55, 0.8, 0.55],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-violet-600/20 via-blue-500/20 to-emerald-400/20 blur-2xl -z-10"
          />

          {/* Large Image Card with Continuous Smooth Vertical Bounce Animation */}
          <motion.div
            animate={{
              y: [0, -16, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-[460px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-white/90 group bg-slate-900/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-internship.jpg"
              alt="Naiye Bharat Internship Program Workflow"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Info Bar inside image */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-xs sm:text-sm font-semibold backdrop-blur-md bg-black/40 px-4 sm:px-5 py-3 rounded-2xl border border-white/20 shadow-lg">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                Live Remote Internship
              </span>
              <span className="text-violet-200 font-bold">Applications Open 2026</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
