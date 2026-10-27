"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";
import { fadeUp } from "./SectionHeading";

// Smooth Count-Up Animation
function Counter({ value, inView }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value, 10) || 0;

  useEffect(() => {
    if (!inView) return;
    let frameId;
    // Dynamic duration: snappy for small numbers (3, 6), smooth for larger numbers (100, 500)
    const duration = target > 100 ? 1800 : target > 10 ? 1300 : 900;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic: fast initial momentum, soft landing
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target]);

  return <span>{count}</span>;
}

export default function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="relative z-10 py-10 px-4 sm:px-6">
      <div className="w-[92%] max-w-[1440px] mx-auto">
        <div
          className="glass-card rounded-3xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 border border-white/60"
          style={{ boxShadow: "0 8px 40px rgba(124,58,237,0.1)" }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i * 0.1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-center"
            >
              <div
                className="text-3xl sm:text-4xl font-extrabold mb-1"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                <Counter value={stat.value} inView={inView} />
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
