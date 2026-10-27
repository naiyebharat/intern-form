// ============================================================
// models/Application.js — Mongoose Model
// ============================================================

import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    // Personal Info
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    gender: { type: String, trim: true },
    dateOfBirth: { type: String, trim: true },

    // Address
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },

    // Education
    college: { type: String, required: true, trim: true },
    courseYear: { type: String, required: true, trim: true },

    // Role & Skills
    role: { type: String, required: true, trim: true },
    skills: { type: String, required: true, trim: true },

    // Links (optional)
    portfolioUrl: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },

    // Availability
    startDate: { type: String, required: true, trim: true },
    availability: { type: String, required: true, trim: true },

    // Motivation
    motivation: { type: String, required: true, trim: true },

    // Meta
    consent: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected", "selected"],
      default: "pending",
    },
    ipAddress: { type: String },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Compound index: one application per email+role combination
ApplicationSchema.index({ email: 1, role: 1 }, { unique: true });

// Prevent model re-registration during hot reload
const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);

export default Application;
