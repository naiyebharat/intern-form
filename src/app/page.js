"use client";

// ============================================================
// app/page.js — Main screen controller
// ============================================================

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import WelcomeScreen from "@/screens/WelcomeScreen";
import ApplicationForm from "@/components/ApplicationForm";
import SuccessScreen from "@/components/SuccessScreen";

const slideVariants = {
  enterFromRight: { x: "100%", opacity: 0 },
  enterFromLeft: { x: "-100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: "-100%", opacity: 0 },
  exitToRight: { x: "100%", opacity: 0 },
};

export default function Home() {
  const [screen, setScreen] = useState("welcome"); // "welcome" | "form" | "success"
  const [selectedRole, setSelectedRole] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  const goToForm = (role = "") => {
    setDirection(1);
    setSelectedRole(role);
    setScreen("form");
  };

  const goToWelcome = () => {
    setDirection(-1);
    setScreen("welcome");
  };

  const goToSuccess = (data) => {
    setDirection(1);
    setSubmittedData(data);
    setScreen("success");
  };

  const resetAndReapply = () => {
    setDirection(0);
    setSubmittedData(null);
    setSelectedRole("");
    setScreen("form");
  };

  const getVariants = (dir) => ({
    initial: dir >= 0 ? { x: "100%", opacity: 0 } : { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: dir >= 0 ? { x: "-100%", opacity: 0 } : { x: "100%", opacity: 0 },
  });

  const v = getVariants(direction);

  return (
    <div className="min-h-screen" style={{ background: "#FAFAFF" }}>
      <Navbar onApplyClick={() => goToForm()} currentScreen={screen} />

      <AnimatePresence mode="wait">
        {screen === "welcome" && (
          <motion.div
            key="welcome"
            initial={v.initial}
            animate={v.animate}
            exit={v.exit}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <WelcomeScreen onApplyClick={goToForm} />
          </motion.div>
        )}

        {screen === "form" && (
          <motion.div
            key="form"
            initial={v.initial}
            animate={v.animate}
            exit={v.exit}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ApplicationForm
              selectedRole={selectedRole}
              onSuccess={goToSuccess}
              onBack={goToWelcome}
            />
          </motion.div>
        )}

        {screen === "success" && (
          <motion.div
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <SuccessScreen
              data={submittedData}
              onReapply={resetAndReapply}
              onHome={goToWelcome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
