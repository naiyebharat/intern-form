"use client";

// ============================================================
// components/SuccessScreen.jsx — Celebration screen after submit
// ============================================================

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Sparkles, CheckCircle2, Mail } from "lucide-react";
import { COMPANY } from "@/lib/constants";

// ---- Confetti particle ----
function Particle({ x, y, color, delay, size }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      initial={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      animate={{
        opacity: 0,
        scale: [1, 1.5, 0],
        y: [0, -120, -200],
        rotate: [0, 180, 360],
        x: [0, (Math.random() - 0.5) * 100],
      }}
      transition={{ duration: 2.5, delay, ease: "easeOut" }}
    />
  );
}

// Generate confetti particles
const COLORS = ["#7c3aed", "#2563eb", "#059669", "#f43f5e", "#f97316", "#eab308", "#ec4899", "#06b6d4"];
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: 10 + Math.random() * 40,
  color: COLORS[i % COLORS.length],
  delay: Math.random() * 0.8,
  size: 6 + Math.random() * 10,
}));

// ---- Animated checkmark SVG ----
function AnimatedCheck() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
      className="relative mx-auto w-28 h-28"
    >
      {/* Outer glow ring */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3), transparent)" }}
      />
      {/* Circle */}
      <div className="relative w-28 h-28 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb, #059669)" }}>
        {/* SVG check */}
        <svg viewBox="0 0 52 52" className="w-14 h-14" fill="none" stroke="white" strokeWidth="3.5"
          strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d="M14 26 L22 34 L38 18"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

export default function SuccessScreen({ data, onReapply, onHome }) {
  const containerRef = useRef(null);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-24"
      style={{ background: "#FAFAFF" }} ref={containerRef}>

      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="animate-blob absolute top-1/4 -left-32 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #7c3aed, #a855f7)" }} />
        <div className="animate-blob animation-delay-2000 absolute bottom-1/4 -right-32 w-72 h-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #059669, #10b981)" }} />
      </div>

      {/* Confetti particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-20" aria-hidden="true">
        {PARTICLES.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* Main content card */}
      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          className="glass-card rounded-3xl border border-white/60 overflow-hidden text-center"
          style={{ boxShadow: "0 32px 80px rgba(124,58,237,0.15)" }}
        >
          {/* Top gradient strip */}
          <div className="h-2 w-full"
            style={{ background: "linear-gradient(90deg, #7c3aed, #2563eb, #059669, #f43f5e, #f97316)" }} />

          <div className="px-8 pt-12 pb-10 flex flex-col items-center gap-6">
            {/* Animated checkmark */}
            <AnimatedCheck />

            {/* Heading */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }} className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2563eb, #059669)",
                  backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>
                Application Submitted!
              </h1>
              <p className="text-slate-500 text-base leading-relaxed">
                Thank you for applying to the <strong className="text-slate-700">Naiye Bharat</strong> internship program.
                Our team will review your application and get back to you soon!
              </p>
            </motion.div>

            {/* Applicant summary card */}
            {data && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full rounded-2xl p-5 border border-violet-100"
                style={{ background: "linear-gradient(135deg, #f5f3ff, #eff6ff)" }}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}>
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Applicant</p>
                      <p className="text-slate-800 font-bold text-lg leading-tight">{data.fullName}</p>
                    </div>
                  </div>
                  <div className="h-px bg-violet-100" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Role Applied For</p>
                      <p className="text-slate-800 font-bold">{data.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* What happens next */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="w-full rounded-2xl p-5 bg-amber-50 border border-amber-200 text-left">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-semibold text-sm mb-1">What happens next?</p>
                  <p className="text-amber-700 text-xs leading-relaxed">
                    Our team will review your application within <strong>7–10 working days</strong>.
                    You will receive an email with the next steps. Keep an eye on your inbox!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }} className="flex flex-col sm:flex-row gap-3 w-full">
              <motion.button
                onClick={onReapply}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
                aria-label="Submit another application"
              >
                <RefreshCw className="w-4 h-4" />
                Submit Another Response
              </motion.button>
              <motion.button
                onClick={onHome}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-slate-600 font-semibold text-sm bg-white border border-slate-200 hover:border-violet-300 hover:text-violet-600 transition-colors"
                aria-label="Back to home page"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </motion.button>
            </motion.div>

            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} {COMPANY.name} · All the best! 🌟
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
