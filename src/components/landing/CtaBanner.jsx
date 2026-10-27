"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CtaBanner({ onApplyClick }) {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6">
      <div className="w-[92%] max-w-[1440px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden py-16 px-8"
          style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb, #059669)" }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Applications are open now. Join hundreds of students building their careers with Naiye Bharat.
            </p>
            <motion.button
              onClick={() => onApplyClick()}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-white font-bold text-lg text-violet-700 shadow-2xl cursor-pointer"
            >
              Apply Now — It&apos;s Free! <ArrowRight className="w-5 h-5" />
            </motion.button>
            <p className="text-white/60 text-sm mt-6">No fees · 100% Remote · Certificate on completion</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
