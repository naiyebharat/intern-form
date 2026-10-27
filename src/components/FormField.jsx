"use client";

// ============================================================
// components/FormField.jsx — Reusable field with animations
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import CustomSelect from "./CustomSelect";

export default function FormField({
  id,
  label,
  type = "text",
  as = "input",       // "input" | "select" | "textarea"
  options = [],
  error,
  touched,
  required = false,
  maxChars,
  ...props
}) {
  const [shaking, setShaking] = useState(false);

  const handleBlur = (e) => {
    if (props.onBlur) props.onBlur(e);
    if (error) {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  };

  const isError = touched && error;
  const isValid = touched && !error && props.value !== "" && props.value !== undefined && props.value !== false;

  const baseInputClass = `w-full h-[48px] px-4 rounded-xl border text-slate-800 text-sm font-medium transition-all duration-200 bg-white outline-none
    placeholder:text-slate-400 placeholder:font-normal
    ${isError
      ? "border-red-300 bg-red-50 shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
      : isValid
      ? "border-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]"
      : "border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)]"
    }`;

  return (
    <div className={`flex flex-col gap-1.5 ${shaking ? "shake" : ""}`}>
      {/* Label */}
      <label htmlFor={id} className="flex items-center gap-1 text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-400 text-xs">*</span>}
        {isValid && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </motion.span>
        )}
      </label>

      {/* Render appropriate field type */}
      {as === "select" ? (
        /* Premium custom dropdown */
        <CustomSelect
          id={id}
          options={options}
          error={error}
          touched={touched}
          {...props}
        />
      ) : as === "textarea" ? (
        /* Textarea */
        <div className="relative">
          <textarea
            id={id}
            className={`w-full p-4 rounded-xl border text-slate-800 text-sm font-medium transition-all duration-200 bg-white outline-none resize-none min-h-[120px] placeholder:text-slate-400 placeholder:font-normal ${
              isError
                ? "border-red-300 bg-red-50 shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
                : isValid
                ? "border-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]"
                : "border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)]"
            }`}
            {...props}
            onBlur={handleBlur}
            aria-invalid={isError ? "true" : "false"}
            aria-describedby={isError ? `${id}-error` : undefined}
          />
          {maxChars && (
            <div className={`absolute bottom-2 right-3 text-xs font-medium pointer-events-none ${
              (props.value?.length || 0) < 30 ? "text-red-400" : "text-slate-400"
            }`}>
              {props.value?.length || 0}/{maxChars}
            </div>
          )}
        </div>
      ) : type === "date" ? (
        /* Date input — exact 48px height matching all fields, entire box clickable */
        <div
          className={`relative flex items-center h-[48px] rounded-xl border text-slate-800 text-sm font-medium transition-all duration-200 bg-white cursor-pointer ${
            isError
              ? "border-red-300 bg-red-50 shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
              : isValid
              ? "border-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]"
              : "border-slate-200 hover:border-violet-300 focus-within:border-violet-500 focus-within:shadow-[0_0_0_3px_rgba(124,58,237,0.15)]"
          }`}
          onClick={() => {
            const el = document.getElementById(id);
            if (el?.showPicker) el.showPicker();
            else el?.focus();
          }}
        >
          <input
            id={id}
            type="date"
            className="w-full h-full px-4 bg-transparent outline-none text-sm font-medium text-slate-800 cursor-pointer"
            style={{ colorScheme: "light" }}
            {...props}
            onBlur={handleBlur}
            aria-invalid={isError ? "true" : "false"}
            aria-describedby={isError ? `${id}-error` : undefined}
          />
        </div>
      ) : (
        /* Regular input */
        <input
          id={id}
          type={type}
          className={baseInputClass}
          {...props}
          onBlur={handleBlur}
          aria-invalid={isError ? "true" : "false"}
          aria-describedby={isError ? `${id}-error` : undefined}
        />
      )}

      {/* Animated error message */}
      <AnimatePresence>
        {isError && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-red-500 text-xs font-medium overflow-hidden"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
