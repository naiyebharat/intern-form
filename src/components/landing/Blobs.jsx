"use client";

export default function Blobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div
        className="animate-blob animation-delay-0 absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #7c3aed, #a855f7)" }}
      />
      <div
        className="animate-blob animation-delay-2000 absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #2563eb, #06b6d4)" }}
      />
      <div
        className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #059669, #10b981)" }}
      />
      <div
        className="animate-blob animation-delay-6000 absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #f43f5e, #f97316)" }}
      />
    </div>
  );
}
