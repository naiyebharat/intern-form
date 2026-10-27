"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  }),
};

export default function SectionHeading({ badge, title, subtitle, gradient }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div ref={ref} className="text-center mb-14" initial="hidden" animate={inView ? "visible" : "hidden"}>
      {badge && (
        <motion.span
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border"
          style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.2)", color: "#7c3aed" }}
        >
          <Sparkles className="w-3.5 h-3.5" /> {badge}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
        style={{
          background: gradient || "linear-gradient(135deg, #1e1b4b, #7c3aed, #2563eb)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} custom={2} className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
