"use client";

// ============================================================
// screens/WelcomeScreen.jsx — Modular Landing Page
// ============================================================

import Blobs from "@/components/landing/Blobs";
import HeroSection from "@/components/landing/HeroSection";
import StatsStrip from "@/components/landing/StatsStrip";
import CertificateSection from "@/components/landing/CertificateSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import RolesSection from "@/components/landing/RolesSection";
import ProcessTimeline from "@/components/landing/ProcessTimeline";
import CommunityBanner from "@/components/landing/CommunityBanner";
import FaqSection from "@/components/landing/FaqSection";
import CtaBanner from "@/components/landing/CtaBanner";
import Footer from "@/components/landing/Footer";

export default function WelcomeScreen({ onApplyClick }) {
  return (
    <main className="relative overflow-hidden pt-16">
      {/* Ambient Animated Blobs */}
      <Blobs />

      {/* 1. Hero Section (New flowchart hero image, smooth vertical bounce, hidden on mobile) */}
      <HeroSection onApplyClick={onApplyClick} />

      {/* 2. Stats Strip (Live count-up numbers animation) */}
      <StatsStrip />

      {/* 3. Certificate Showcase (Moved directly below Hero & Stats) */}
      <CertificateSection onApplyClick={onApplyClick} />

      {/* 4. Benefits (Two-row infinite horizontal marquee) */}
      <BenefitsSection />

      {/* 5. Open Roles (Flush-fit image cards matching smepaisa.com reference) */}
      <RolesSection onApplyClick={onApplyClick} />

      {/* 6. Process Timeline (Spaced cards, connector branch lines, top colored border, gradient background) */}
      <ProcessTimeline />

      {/* 7. Community & Mission Banner */}
      <CommunityBanner />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Final Call to Action Banner */}
      <CtaBanner onApplyClick={onApplyClick} />

      {/* 10. Footer with Logo & Contact Details */}
      <Footer />
    </main>
  );
}
