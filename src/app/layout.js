// ============================================================
// app/layout.js — Root layout with metadata + fonts
// ============================================================

import "./globals.css";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: `${COMPANY.name} Internship Program — Apply Now`,
  description: `Join the ${COMPANY.name} 3-Month Internship Program. 100% remote, real-world projects, mentorship, certificate, and LOR. Apply now for Backend, Frontend, App Dev, Digital Marketing, Video Editing, and Content Writing roles.`,
  keywords: [
    "Naiye Bharat internship",
    "remote internship India",
    "internship certificate",
    "tech internship",
    "digital marketing internship",
    "work from home internship",
  ],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: `${COMPANY.name} Internship Program`,
    description: "3-Month Remote Internship — Real Projects, Certificate & Mentorship. Apply Now!",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
