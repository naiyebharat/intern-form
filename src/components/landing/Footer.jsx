"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200/80 bg-white/70 backdrop-blur-md pt-12 pb-8 px-4 sm:px-6">
      <div className="w-[92%] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200/70">
          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={COMPANY.logo}
                  alt={COMPANY.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight">
                  {COMPANY.name}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {COMPANY.tagline}
                </p>
              </div>
            </div>
            <p className="text-slate-500 text-sm max-w-sm mt-1 leading-relaxed">
              Empowering students across India with certified hands-on internship programs, live mentorship, and career growth.
            </p>
          </div>

          {/* Contact details */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Contact Us
            </h4>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-violet-600 transition-colors font-medium"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span>{COMPANY.email}</span>
            </a>
            <a
              href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-violet-600 transition-colors font-semibold"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span>{COMPANY.phone}</span>
            </a>
          </div>

          {/* Address */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Incubation Center
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <p>{COMPANY.address}</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            100% Remote · Certified Internship Program
          </p>
        </div>
      </div>
    </footer>
  );
}
