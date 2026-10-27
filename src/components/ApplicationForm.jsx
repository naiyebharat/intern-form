"use client";

// ============================================================
// components/ApplicationForm.jsx — Full Formik + Yup form
// ============================================================

import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Loader2, AlertCircle, User, Mail,
  Phone, MapPin, GraduationCap, Briefcase, Link2, Calendar,
  Clock, MessageSquare, ShieldCheck, Sparkles
} from "lucide-react";
import { applicationSchema } from "@/lib/validation";
import FormField from "./FormField";
import {
  ROLE_OPTIONS, GENDER_OPTIONS, AVAILABILITY_OPTIONS, INDIAN_STATES
} from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" }
  }),
};

// Gradient section header
function SectionHeader({ icon: Icon, title, gradient, index }) {
  return (
    <motion.div variants={fadeUp} custom={index} initial="hidden" animate="visible"
      className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}>
        <Icon className="w-4.5 h-4.5 text-white" style={{ width: "18px", height: "18px" }} />
      </div>
      <h3 className="text-base font-bold text-slate-700">{title}</h3>
    </motion.div>
  );
}

export default function ApplicationForm({ selectedRole, onSuccess, onBack }) {
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      college: "",
      courseYear: "",
      role: selectedRole || "",
      skills: "",
      portfolioUrl: "",
      resumeUrl: "",
      startDate: "",
      availability: "",
      motivation: "",
      consent: false,
      website_url: "", // honeypot
    },
    validationSchema: applicationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitError("");
      try {
        const res = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await res.json();

        if (!res.ok) {
          if (res.status === 409) {
            setSubmitError(data.message || "You have already applied for this role.");
          } else if (res.status === 400 && data.fields) {
            setSubmitError("Please fix the highlighted errors and try again.");
          } else {
            setSubmitError(data.error || "Something went wrong. Please try again.");
          }
          return;
        }

        onSuccess({ fullName: values.fullName, role: values.role });
      } catch {
        setSubmitError("Network error. Please check your connection and try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Sync selectedRole prop
  useEffect(() => {
    if (selectedRole) {
      formik.setFieldValue("role", selectedRole);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole]);

  // On submit with errors: scroll to first invalid field
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await formik.validateForm();
    formik.setTouched(
      Object.keys(formik.values).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    );
    if (Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
      }
      return;
    }
    formik.handleSubmit(e);
  };

  const f = (name) => ({
    id: name,
    name,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.errors[name],
    touched: formik.touched[name],
  });

  return (
    <main className="relative min-h-screen pt-8 sm:pt-12 pb-16 px-4 sm:px-6" style={{ background: "#FAFAFF" }}>
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="animate-blob absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #7c3aed, #a855f7)" }} />
        <div className="animate-blob animation-delay-4000 absolute bottom-0 -left-24 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #2563eb, #06b6d4)" }} />
      </div>

      <div className="relative z-10 w-[92%] max-w-5xl mx-auto">
        {/* Top Navigation Row: Styled Back to Home Button & Program Badge */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, x: -3 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-violet-300 hover:bg-violet-50/70 text-slate-700 hover:text-violet-700 font-bold text-sm transition-all cursor-pointer group"
            aria-label="Back to home"
          >
            <div className="w-7 h-7 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center transition-colors group-hover:bg-violet-600 group-hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to Home</span>
          </motion.button>

          {/* Program Pill */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 border border-slate-200/80 text-xs font-bold text-slate-600 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Naiye Bharat · Batch 2026</span>
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl shadow-2xl border border-white/60 overflow-hidden"
          style={{ boxShadow: "0 24px 80px rgba(124,58,237,0.1)" }}
        >
          {/* Card Header */}
          <div className="relative px-8 pt-10 pb-8 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb, #059669)" }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center p-1.5 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png" alt="Naiye Bharat" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Internship Application</h1>
                <p className="text-white/85 text-sm mt-0.5 font-medium">Naiye Bharat · 3-Month Remote Program</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="px-6 sm:px-10 py-10 flex flex-col gap-10">
            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="website_url"
              value={formik.values.website_url}
              onChange={formik.handleChange}
              tabIndex={-1}
              aria-hidden="true"
              className="absolute -left-[9999px] opacity-0 pointer-events-none"
              autoComplete="off"
            />

            {/* ---- SECTION 1: Personal Info ---- */}
            <section aria-labelledby="section-personal">
              <SectionHeader icon={User} title="Personal Information"
                gradient="from-violet-500 to-purple-600" index={0} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible" className="sm:col-span-2">
                  <FormField label="Full Name" required placeholder="Your full name" {...f("fullName")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible">
                  <FormField label="Email Address" required type="email" placeholder="you@example.com" {...f("email")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible">
                  <FormField label="Phone Number" required type="tel" placeholder="10-digit mobile number" maxLength={10} {...f("phone")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible">
                  <FormField label="Gender" as="select" options={GENDER_OPTIONS} {...f("gender")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible">
                  <FormField label="Date of Birth" type="date" {...f("dateOfBirth")} />
                </motion.div>
              </div>
            </section>

            {/* ---- SECTION 2: Address ---- */}
            <section aria-labelledby="section-address">
              <SectionHeader icon={MapPin} title="Address"
                gradient="from-blue-500 to-sky-600" index={6} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <motion.div variants={fadeUp} custom={7} initial="hidden" animate="visible" className="sm:col-span-2">
                  <FormField label="Street / Area" required placeholder="House no., street, locality" {...f("street")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={8} initial="hidden" animate="visible">
                  <FormField label="City" required placeholder="Your city" {...f("city")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={9} initial="hidden" animate="visible">
                  <FormField label="State" required as="select" options={INDIAN_STATES} {...f("state")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={10} initial="hidden" animate="visible">
                  <FormField label="Pincode" required placeholder="6-digit pincode" maxLength={6} {...f("pincode")} />
                </motion.div>
              </div>
            </section>

            {/* ---- SECTION 3: Education ---- */}
            <section aria-labelledby="section-edu">
              <SectionHeader icon={GraduationCap} title="Education"
                gradient="from-emerald-500 to-teal-600" index={11} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <motion.div variants={fadeUp} custom={12} initial="hidden" animate="visible" className="sm:col-span-2">
                  <FormField label="College / University" required placeholder="e.g. Delhi University" {...f("college")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={13} initial="hidden" animate="visible" className="sm:col-span-2">
                  <FormField label="Course & Year of Study" required placeholder="e.g. B.Tech CSE, 3rd Year" {...f("courseYear")} />
                </motion.div>
              </div>
            </section>

            {/* ---- SECTION 4: Role & Skills ---- */}
            <section aria-labelledby="section-role">
              <SectionHeader icon={Briefcase} title="Role & Skills"
                gradient="from-orange-500 to-amber-500" index={14} />
              <div className="grid grid-cols-1 gap-5">
                <motion.div variants={fadeUp} custom={15} initial="hidden" animate="visible">
                  <FormField label="Role Applying For" required as="select" options={ROLE_OPTIONS} {...f("role")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={16} initial="hidden" animate="visible">
                  <FormField label="Key Skills" required as="textarea"
                    placeholder="List your relevant skills (comma-separated or as sentences)&#10;e.g. React.js, Node.js, MongoDB, Problem Solving"
                    {...f("skills")} />
                </motion.div>
              </div>
            </section>

            {/* ---- SECTION 5: Links ---- */}
            <section aria-labelledby="section-links">
              <SectionHeader icon={Link2} title="Portfolio & Links (Optional)"
                gradient="from-pink-500 to-rose-500" index={17} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <motion.div variants={fadeUp} custom={18} initial="hidden" animate="visible">
                  <FormField label="Portfolio / GitHub / LinkedIn" type="url"
                    placeholder="https://github.com/username" {...f("portfolioUrl")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={19} initial="hidden" animate="visible">
                  <FormField label="Resume Link (Google Drive etc.)" type="url"
                    placeholder="https://drive.google.com/..." {...f("resumeUrl")} />
                </motion.div>
              </div>
            </section>

            {/* ---- SECTION 6: Availability ---- */}
            <section aria-labelledby="section-avail">
              <SectionHeader icon={Clock} title="Availability"
                gradient="from-indigo-500 to-violet-600" index={20} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <motion.div variants={fadeUp} custom={21} initial="hidden" animate="visible">
                  <FormField label="Preferred Start Date" required type="date" {...f("startDate")} />
                </motion.div>
                <motion.div variants={fadeUp} custom={22} initial="hidden" animate="visible">
                  <FormField label="Weekly Availability" required as="select" options={AVAILABILITY_OPTIONS} {...f("availability")} />
                </motion.div>
              </div>
            </section>

            {/* ---- SECTION 7: Motivation ---- */}
            <section aria-labelledby="section-motivation">
              <SectionHeader icon={MessageSquare} title="Your Motivation"
                gradient="from-teal-500 to-cyan-500" index={23} />
              <motion.div variants={fadeUp} custom={24} initial="hidden" animate="visible">
                <FormField
                  label="Why do you want to join Naiye Bharat?"
                  required
                  as="textarea"
                  placeholder="Tell us about your goals, why this internship excites you, and what you hope to contribute (min 30 characters)"
                  maxChars={2000}
                  {...f("motivation")}
                />
                <p className="text-xs text-slate-400 mt-1">Minimum 30 characters · Be specific and genuine!</p>
              </motion.div>
            </section>

            {/* ---- SECTION 8: Consent ---- */}
            <section aria-labelledby="section-consent">
              <SectionHeader icon={ShieldCheck} title="Declaration & Consent"
                gradient="from-rose-500 to-pink-500" index={25} />
              <motion.div variants={fadeUp} custom={26} initial="hidden" animate="visible">
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formik.touched.consent && formik.errors.consent
                    ? "border-red-300 bg-red-50"
                    : formik.values.consent
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-200 bg-slate-50 hover:border-violet-300"
                }`}>
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formik.values.consent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-4 h-4 rounded accent-violet-600 cursor-pointer flex-shrink-0"
                    aria-describedby={formik.touched.consent && formik.errors.consent ? "consent-error" : undefined}
                  />
                  <span className="text-sm text-slate-700 leading-relaxed">
                    I confirm that all information provided above is accurate and truthful. I agree to be
                    contacted by the Naiye Bharat team regarding my application via email or phone.
                    <span className="text-red-400 ml-1">*</span>
                  </span>
                </label>
                <AnimatePresence>
                  {formik.touched.consent && formik.errors.consent && (
                    <motion.p id="consent-error" role="alert"
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-1.5 text-red-500 text-xs font-medium mt-2">
                      <AlertCircle className="w-3.5 h-3.5" /> {formik.errors.consent}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </section>

            {/* ---- Submit Error ---- */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{submitError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---- Submit Button ---- */}
            <motion.div variants={fadeUp} custom={27} initial="hidden" animate="visible">
              <motion.button
                type="submit"
                disabled={formik.isSubmitting}
                whileHover={!formik.isSubmitting ? { scale: 1.02, boxShadow: "0 12px 40px rgba(124,58,237,0.4)" } : {}}
                whileTap={!formik.isSubmitting ? { scale: 0.98 } : {}}
                className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
                aria-label="Submit application"
              >
                {formik.isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting your application…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Submit Application
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
              <p className="text-center text-xs text-slate-400 mt-3">
                Your information is kept confidential and will only be used for internship purposes.
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
