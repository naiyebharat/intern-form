"use client";

import { BENEFITS } from "@/lib/constants";
import {
  Home, Award, FileText, Code2, Users, Clock, Zap, Network, TrendingUp,
  Server, Monitor, Smartphone, BarChart3, Video, PenTool, Send, Search,
  UserCheck, Rocket, Star, MapPin, Calendar, CheckCircle2, Sparkles
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const ICONS = {
  Home, Award, FileText, Code2, Users, Clock, Zap, Network, TrendingUp,
  Server, Monitor, Smartphone, BarChart3, Video, PenTool, Send, Search,
  UserCheck, Rocket, Star, MapPin, Calendar, CheckCircle2, Sparkles
};

function BenefitCard({ benefit }) {
  const Icon = ICONS[benefit.icon] || Star;
  return (
    <div
      className="glass-card rounded-2xl p-5 border border-white/80 flex gap-4 items-start w-[330px] sm:w-[380px] flex-shrink-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ boxShadow: "0 8px 30px rgba(124,58,237,0.06)" }}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-md`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-left">
        <h4 className="font-bold text-slate-800 mb-1 text-base">{benefit.title}</h4>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2">{benefit.description}</p>
      </div>
    </div>
  );
}

export default function BenefitsSection() {
  const row1 = BENEFITS.slice(0, 5);
  const row2 = BENEFITS.slice(4);

  return (
    <section className="relative z-10 py-20 overflow-hidden">
      <div className="w-[92%] max-w-[1440px] mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Why Join Us"
          title="Everything You Get"
          subtitle="A complete internship experience designed to accelerate your career from day one."
          gradient="linear-gradient(135deg, #f43f5e, #f97316, #eab308)"
        />
      </div>

      {/* Marquee Row 1 (Right to Left) */}
      <div className="w-full overflow-hidden marquee-mask py-3">
        <div className="animate-marquee-left flex gap-5">
          {[...row1, ...row1, ...row1, ...row1].map((benefit, idx) => (
            <BenefitCard key={`r1-${idx}`} benefit={benefit} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Left to Right) */}
      <div className="w-full overflow-hidden marquee-mask py-3 mt-2">
        <div className="animate-marquee-right flex gap-5">
          {[...row2, ...row2, ...row2, ...row2].map((benefit, idx) => (
            <BenefitCard key={`r2-${idx}`} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}
