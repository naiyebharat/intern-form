"use client";

import { motion } from "framer-motion";
import { Award, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function CertificateSection({ onApplyClick }) {
  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 overflow-hidden">
      <div className="w-[92%] max-w-[1440px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-white/80 glass-card shadow-2xl shadow-violet-200/40">
          {/* Ambient glow backgrounds */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Crispy Copy & Punchlines */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-6 border border-amber-200 bg-amber-50/90 text-amber-700 shadow-sm"
              >
                <Award className="w-4 h-4 text-amber-600" />
                Verified Credential & Industry Recognition
              </motion.div>

              {/* Big Crispy Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.08] mb-4 tracking-tight"
              >
                Next is{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  You.
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl mt-1 text-slate-700 font-extrabold">
                  Now it&apos;s your turn.
                </span>
              </motion.h2>

              {/* Punchy Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl font-medium"
              >
                Don&apos;t just complete an internship — walk away with an{" "}
                <strong className="text-slate-800 font-semibold">industry-accredited credential</strong> that commands
                respect. Put proof behind your skills and get noticed by top hiring managers.
              </motion.p>

              {/* Value Props / Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9 w-full">
                {[
                  {
                    title: "QR-Verified Authenticity",
                    desc: "Tamper-proof certificate with unique credential ID recruiters can verify in seconds.",
                    icon: ShieldCheck,
                    color: "text-emerald-600 bg-emerald-50 border-emerald-200/60"
                  },
                  {
                    title: "Official LOR Available",
                    desc: "Personalized Letter of Recommendation from Naiye Bharat leadership for top performers.",
                    icon: Award,
                    color: "text-amber-600 bg-amber-50 border-amber-200/60"
                  },
                  {
                    title: "LinkedIn Ready",
                    desc: "1-click sharable digital credential to flaunt your milestone directly on LinkedIn.",
                    icon: Sparkles,
                    color: "text-violet-600 bg-violet-50 border-violet-200/60"
                  },
                  {
                    title: "100% Free Credential",
                    desc: "Zero hidden charges, zero certificate fees. Earned purely through your real contribution.",
                    icon: CheckCircle2,
                    color: "text-blue-600 bg-blue-50 border-blue-200/60"
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.08 }}
                    className="p-3.5 rounded-2xl bg-white/80 border border-slate-100 shadow-sm flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${item.color}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 leading-tight mb-0.5">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={() => onApplyClick()}
                  whileHover={{ scale: 1.04, boxShadow: "0 12px 35px rgba(124,58,237,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-base shadow-xl cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
                >
                  <span>Claim Your Certificate — Apply Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>

            {/* Right Column: 3D Certificate Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-6 relative flex items-center justify-center"
            >
              {/* Glowing background aura */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-violet-600/25 via-amber-500/20 to-blue-500/25 blur-3xl -z-10 rounded-3xl" />

              {/* Certificate Frame */}
              <div className="relative w-full max-w-[560px] rounded-3xl p-3 sm:p-4 bg-white/85 backdrop-blur-xl border border-white shadow-2xl shadow-violet-200/60 overflow-hidden group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/certificate-preview.jpg"
                    alt="Naiye Bharat Official Verified Internship Certificate"
                    className="w-full h-full object-contain sm:object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Floating verification badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute hidden bottom-6 left-6 glass-card px-4 py-2.5 rounded-2xl border border-white/90 shadow-xl flex items-center gap-2.5 backdrop-blur-md"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Government & MSME Aligned
                    </p>
                    <p className="text-xs font-black text-slate-800">100% Verified Certificate</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
