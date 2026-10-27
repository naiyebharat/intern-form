// ============================================================
// app/api/applications/route.js — POST (create) + GET (admin)
// Sends data to MongoDB + Google Sheets webhook
// ============================================================

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Application from "@/models/Application";
import { applicationSchema } from "@/lib/validation";

// ---- Simple in-memory rate limiter ----
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { firstRequest: now, count: 1 });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

function getClientIP(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ============================================================
// Google Sheets webhook — fire-and-forget (non-blocking)
// ============================================================
async function sendToGoogleSheets(data) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("⚠️ GOOGLE_SHEETS_WEBHOOK_URL is not set in .env.local — skipping Google Sheets sync.");
    return;
  }
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      redirect: "follow",
    });
    const resultText = await res.text();
    console.log(`✅ Google Sheets webhook response (${res.status}):`, resultText);
  } catch (err) {
    console.error("⚠️ Google Sheets webhook failed:", err.message);
  }
}

// ============================================================
// POST /api/applications — Create a new application
// ============================================================
export async function POST(request) {
  try {
    const ip = getClientIP(request);

    // Rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check — if website_url is filled, it's a bot
    if (body.website_url && body.website_url.trim() !== "") {
      // Silently return success to fool bots
      return NextResponse.json({ success: true }, { status: 201 });
    }

    // Server-side validation using shared Yup schema
    let validatedData;
    try {
      validatedData = await applicationSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (validationError) {
      const errors = {};
      validationError.inner?.forEach((err) => {
        errors[err.path] = err.message;
      });
      return NextResponse.json(
        { error: "Validation failed", fields: errors },
        { status: 400 }
      );
    }

    // Connect to MongoDB (if MONGODB_URI is set)
    let savedApplication = null;
    if (process.env.MONGODB_URI) {
      await connectDB();

      // Check for duplicate (same email + role)
      const existing = await Application.findOne({
        email: validatedData.email.toLowerCase(),
        role: validatedData.role,
      });

      if (existing) {
        return NextResponse.json(
          {
            error: "Duplicate application",
            message: `You have already applied for the ${validatedData.role} role with this email address.`,
          },
          { status: 409 }
        );
      }

      // Save to MongoDB
      const application = new Application({
        ...validatedData,
        email: validatedData.email.toLowerCase().trim(),
        ipAddress: ip,
      });
      savedApplication = await application.save();
    }

    // Send to Google Sheets (non-blocking — won't fail the request)
    sendToGoogleSheets({
      ...validatedData,
      email: validatedData.email.toLowerCase().trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully!",
        applicationId: savedApplication?._id || null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/applications error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// ============================================================
// GET /api/applications — Admin: retrieve all applications
// ============================================================
export async function GET(request) {
  try {
    const apiKey = request.headers.get("x-api-key");
    const expectedKey = process.env.ADMIN_API_KEY;

    if (!expectedKey) {
      return NextResponse.json(
        { error: "ADMIN_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    if (!apiKey || apiKey !== expectedKey) {
      return NextResponse.json(
        { error: "Unauthorized. Valid x-api-key header required." },
        { status: 401 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: "MONGODB_URI is not configured." },
        { status: 500 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

    const filter = {};
    if (role) filter.role = role;
    if (status) filter.status = status;

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-ipAddress"),
      Application.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: applications,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("GET /api/applications error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
