"use client";

// ============================================================
// components/Navbar.jsx — Sticky glass navbar
// ============================================================

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function Navbar({ onApplyClick, currentScreen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-violet-100/50 border-b border-violet-100"
          : "bg-white/60 backdrop-blur-md border-b border-white/40"
      }`}
    >
      <div className="w-[92%] max-w-[1440px] mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2.5 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Real Logo Image */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-100 flex items-center justify-center p-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY.logo}
                alt={COMPANY.name}
                className="w-full h-full object-contain"
              />
            </div>
            {/* Company name */}
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-800 leading-tight">
                {COMPANY.name}
              </span>
              <span className="hidden sm:block text-[9px] text-slate-400 font-semibold tracking-wider uppercase">
                {COMPANY.tagline}
              </span>
            </div>
          </motion.div>


          {/* Right side */}
          <div className="flex items-center gap-3">
            {currentScreen !== "welcome" && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden sm:inline-flex items-center gap-1 text-sm text-violet-600 font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Applications Open
              </motion.span>
            )}

            {/* Apply Now CTA */}
            {currentScreen === "welcome" && (
              <motion.button
                onClick={onApplyClick}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(124,58,237,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                }}
                aria-label="Open application form"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <Sparkles className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Apply Now</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
