// ============================================================
// lib/mongodb.js — Cached Mongoose connection for Next.js
// ============================================================

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn(
    "⚠️  MONGODB_URI is not set. Database features will not work. " +
      "Copy .env.example to .env.local and fill in your MongoDB URI."
  );
}

/**
 * Global cache to prevent multiple connections during hot reload in development
 * and across serverless function invocations.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI environment variable is not set. " +
        "Please add it to your .env.local file."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("✅ MongoDB connected successfully");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
