"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";
import SectionHeading, { fadeUp } from "./SectionHeading";

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index * 0.05}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="glass-card rounded-2xl overflow-hidden border border-white/60 mb-3"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-violet-50/50 transition-colors cursor-pointer select-none"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-800 text-base">{item.question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center"
        >
          <ChevronDown className="w-4 h-4 text-violet-600" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-violet-100/60 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6">
      <div className="w-[92%] max-w-5xl mx-auto">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before applying."
          gradient="linear-gradient(135deg, #f43f5e, #f97316)"
        />
        <div>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
