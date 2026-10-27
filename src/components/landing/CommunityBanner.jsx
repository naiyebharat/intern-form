"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Users, TrendingUp } from "lucide-react";

export default function CommunityBanner() {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6">
      <div className="w-[92%] max-w-[1440px] mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center"
          style={{ background: "linear-gradient(135deg, #ede9fe, #dbeafe, #d1fae5)" }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at top left, #a78bfa40, transparent 60%), radial-gradient(ellipse at bottom right, #6ee7b740, transparent 60%)"
            }}
          />
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6 mx-auto shadow-xl"
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4"
            >
              Built for{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Students, by Professionals
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Naiye Bharat was created with one mission — to bridge the gap between college learning and real-world
              industry demands. Join a community that truly invests in your growth.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Globe, title: "Pan-India Community", desc: "Interns from 20+ states" },
                { icon: Users, title: "Expert Mentors", desc: "Industry professionals as guides" },
                { icon: TrendingUp, title: "Career Growth", desc: "Real impact, real portfolio" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-5 border border-white/70"
                >
                  <item.icon className="w-7 h-7 mb-3 mx-auto" style={{ color: "#7c3aed" }} />
                  <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
