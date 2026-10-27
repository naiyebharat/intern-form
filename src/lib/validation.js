// ============================================================
// lib/validation.js — Shared Yup schema (client + server)
// ============================================================
import * as Yup from "yup";

const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

export const applicationSchema = Yup.object({
  // Personal
  fullName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name is too long")
    .required("Full name is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number (starts with 6-9)")
    .required("Phone number is required"),

  gender: Yup.string()
    .oneOf(["Male", "Female", "Non-binary", "Prefer not to say", ""], "Invalid gender option")
    .optional(),

  dateOfBirth: Yup.string().optional(),

  // Address
  street: Yup.string()
    .min(3, "Please enter a valid address")
    .required("Street/Area is required"),

  city: Yup.string()
    .min(2, "Please enter a valid city")
    .required("City is required"),

  state: Yup.string().required("State is required"),

  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .required("Pincode is required"),

  // Education
  college: Yup.string()
    .min(3, "Please enter your college/university name")
    .required("College/University is required"),

  courseYear: Yup.string()
    .min(3, "Please specify your course and year of study")
    .required("Course and year of study is required"),

  // Role & Skills
  role: Yup.string()
    .oneOf(
      [
        "Backend Developer",
        "Frontend Developer",
        "App Developer",
        "Digital Marketing",
        "Video Editor",
        "Content Writer",
      ],
      "Please select a valid role"
    )
    .required("Please select a role to apply for"),

  skills: Yup.string()
    .min(5, "Please list at least one skill")
    .required("Key skills are required"),

  // Links
  portfolioUrl: Yup.string()
    .test("is-valid-url", "Please enter a valid URL (e.g. https://github.com/...)", (value) => {
      if (!value) return true; // Optional
      return urlRegex.test(value);
    })
    .optional(),

  resumeUrl: Yup.string()
    .test("is-valid-url", "Please enter a valid URL (e.g. Google Drive link)", (value) => {
      if (!value) return true; // Optional
      return urlRegex.test(value);
    })
    .optional(),

  // Availability
  startDate: Yup.string().required("Preferred start date is required"),

  availability: Yup.string().required("Please select your weekly availability"),

  // Motivation
  motivation: Yup.string()
    .min(30, "Please write at least 30 characters")
    .max(2000, "Please keep it under 2000 characters")
    .required("Please tell us why you want to join"),

  // Consent
  consent: Yup.boolean()
    .oneOf([true], "You must confirm and consent to proceed")
    .required("Consent is required"),

  // Honeypot (must be empty)
  website_url: Yup.string().max(0, "Bot detected"),
});
