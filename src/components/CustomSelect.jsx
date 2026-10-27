"use client";

// ============================================================
// components/CustomSelect.jsx — Premium animated dropdown
// ============================================================

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Search } from "lucide-react";

export default function CustomSelect({
  id,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = "— Select —",
  error,
  touched,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);
  const searchRef = useRef(null);

  const showSearch = options.length > 8;
  const filtered = showSearch
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  const isError = touched && error;
  const isValid = touched && !error && value;

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
        // Trigger onBlur for Formik
        if (onBlur) onBlur({ target: { name: id, value } });
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [id, onBlur, value]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") { setOpen(false); setSearch(""); }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Focus search when opened
  useEffect(() => {
    if (open && showSearch && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open, showSearch]);

  const handleSelect = (opt) => {
    onChange({ target: { name: id, value: opt } });
    setOpen(false);
    setSearch("");
  };

  const triggerClass = `w-full h-[48px] flex items-center justify-between px-4 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer outline-none
    ${isError
      ? "border-red-300 bg-red-50 shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
      : isValid
      ? "border-emerald-400 bg-white shadow-[0_0_0_3px_rgba(16,185,129,0.12)]"
      : open
      ? "border-violet-500 bg-white shadow-[0_0_0_3px_rgba(124,58,237,0.15)]"
      : "border-slate-200 bg-white hover:border-violet-300"
    }`;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        className={triggerClass}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={id}
      >
        <span className={value ? "text-slate-800" : "text-slate-400 font-normal"}>
          {value || placeholder}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 rounded-2xl border border-slate-200 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(124,58,237,0.15), 0 4px 16px rgba(0,0,0,0.08)",
            }}
            role="listbox"
          >
            {/* Search bar for long lists */}
            {showSearch && (
              <div className="p-2 border-b border-slate-100">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
                  <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>
            )}

            {/* Options list */}
            <ul
              className="overflow-y-auto"
              style={{ maxHeight: "220px" }}
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-slate-400 text-center">No results found</li>
              ) : (
                filtered.map((opt) => {
                  const isSelected = value === opt;
                  return (
                    <motion.li
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      whileHover={{ backgroundColor: "rgba(124,58,237,0.06)" }}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors
                        ${isSelected ? "text-violet-700 font-semibold bg-violet-50" : "text-slate-700"}`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span>{opt}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
