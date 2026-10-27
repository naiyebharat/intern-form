"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Code2, Server, Smartphone, BarChart3, Video, PenTool } from "lucide-react";
import { ROLES } from "@/lib/constants";
import SectionHeading, { fadeUp } from "./SectionHeading";

const ICONS = {
  Code2,
  Server,
  Smartphone,
  BarChart3,
  Video,
  PenTool
};

function RoleCard({ role, onApply }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const Icon = ICONS[role.icon] || Code2;

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -6 }}
      className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 bg-white/90 flex flex-col cursor-default group transition-all duration-300 shadow-md hover:shadow-2xl"
    >
      {/* Flush-Fit Top Image Banner (No nested boxes, completely flush with top & edges) */}
      {role.image && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={role.image}
            alt={role.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Card Content Body */}
      <div className="relative px-6 pb-6 pt-2 flex flex-col flex-1">
        {/* Floating Overlapping Icon Badge */}
        <div className="-mt-8 mb-3 w-12 h-12 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center flex-shrink-0 z-10">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white shadow-sm`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2 group-hover:text-violet-600 transition-colors">
          {role.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">
          {role.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {role.skills.map((skill) => (
            <span key={skill} className={`text-xs px-2.5 py-1 rounded-full font-semibold ${role.badge}`}>
              {skill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => onApply(role.title)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-3.5 rounded-2xl text-white text-sm font-semibold bg-gradient-to-r ${role.gradient} flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer`}
        >
          Apply for this Role <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function RolesSection({ onApplyClick }) {
  return (
    <section id="roles" className="relative z-10 py-20 px-4 sm:px-6">
      <div className="w-[92%] max-w-[1440px] mx-auto">
        <SectionHeading
          badge="Open Positions"
          title="Choose Your Role"
          subtitle="6 exciting roles open for talented and passionate students across India."
          gradient="linear-gradient(135deg, #059669, #2563eb, #7c3aed)"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROLES.map((role) => (
            <RoleCard key={role.id} role={role} onApply={onApplyClick} />
          ))}
        </div>
      </div>
    </section>
  );
}
