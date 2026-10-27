// ============================================================
// lib/constants.js — Edit all site content here
// ============================================================

export const COMPANY = {
  name: "Naiye Bharat",
  tagline: "Right Way, Right Lawyer, Right Time",
  email: "naiyebharat@gmail.com",
  phone: "+91 85120 05097",
  address: "Dronacharya group of institutions, B-27, Knowledge Park-III, incubation center, Greater Noida, Uttar Pradesh",
  website: "www.naiyebharat.in",
  logo: "/images/logo.png",
  instagram: "#",
  linkedin: "#",
  twitter: "#",
};

export const PROGRAM = {
  duration: "3 Months",
  type: "100% Remote",
  certificate: true,
  stipend: null, // Set to e.g. "5,000/month" if applicable, or leave null
  startDate: "Flexible",
  batchName: "2026",
};

export const STATS = [
  { value: "3", suffix: " Months", label: "Program Duration", icon: "clock" },
  { value: "100", suffix: "%", label: "Work From Home", icon: "home" },
  { value: "6", suffix: "+", label: "Open Roles", icon: "briefcase" },
  { value: "500", suffix: "+", label: "Alumni Network", icon: "users" },
];

export const BENEFITS = [
  {
    id: "wfh",
    title: "Work From Home",
    description: "Complete flexibility to work from anywhere in India. No relocation needed — just your laptop and WiFi.",
    icon: "Home",
    gradient: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
  },
  {
    id: "certificate",
    title: "Internship Certificate",
    description: "Receive an official Naiye Bharat internship certificate on successful completion, valued by top recruiters.",
    icon: "Award",
    gradient: "from-amber-500 to-orange-500",
    bg: "from-amber-50 to-orange-50",
  },
  {
    id: "lor",
    title: "Letter of Recommendation",
    description: "Top performers receive a personalized Letter of Recommendation from our leadership team.",
    icon: "FileText",
    gradient: "from-emerald-500 to-teal-500",
    bg: "from-emerald-50 to-teal-50",
  },
  {
    id: "projects",
    title: "Real-World Projects",
    description: "Work on live, production-level projects that you can proudly showcase in your portfolio.",
    icon: "Code2",
    gradient: "from-blue-500 to-sky-500",
    bg: "from-blue-50 to-sky-50",
  },
  {
    id: "mentorship",
    title: "1-on-1 Mentorship",
    description: "Get dedicated mentorship from industry professionals who guide your growth every step of the way.",
    icon: "Users",
    gradient: "from-pink-500 to-rose-500",
    bg: "from-pink-50 to-rose-50",
  },
  {
    id: "flexible",
    title: "Flexible Timings",
    description: "Balance your studies and internship with our student-friendly flexible schedule.",
    icon: "Clock",
    gradient: "from-indigo-500 to-violet-500",
    bg: "from-indigo-50 to-violet-50",
  },
  {
    id: "skills",
    title: "Skill Building",
    description: "Level up your technical and soft skills with structured learning paths and workshops.",
    icon: "Zap",
    gradient: "from-yellow-500 to-amber-500",
    bg: "from-yellow-50 to-amber-50",
  },
  {
    id: "networking",
    title: "Networking",
    description: "Connect with a vibrant community of like-minded peers, mentors, and industry leaders.",
    icon: "Network",
    gradient: "from-teal-500 to-cyan-500",
    bg: "from-teal-50 to-cyan-50",
  },
  {
    id: "growth",
    title: "Performance Opportunities",
    description: "Outstanding interns get opportunities for extended engagements and referrals.",
    icon: "TrendingUp",
    gradient: "from-rose-500 to-pink-500",
    bg: "from-rose-50 to-pink-50",
  },
];

export const ROLES = [
  {
    id: "backend",
    title: "Backend Developer",
    description: "Build robust APIs, manage databases, and architect scalable server-side systems for our products.",
    skills: ["Node.js", "Python", "MongoDB", "REST APIs", "SQL"],
    image: "/images/role-backend.png",
    icon: "Server",
    gradient: "from-violet-600 to-indigo-600",
    bg: "from-violet-50 to-indigo-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Craft stunning, responsive UIs and deliver seamless user experiences using modern web technologies.",
    skills: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "Figma"],
    image: "/images/role-frontend.png",
    icon: "Monitor",
    gradient: "from-blue-600 to-sky-500",
    bg: "from-blue-50 to-sky-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    id: "app",
    title: "App Developer",
    description: "Design and develop cross-platform mobile applications with React Native reaching millions of users.",
    skills: ["React Native"],
    image: "/images/role-app.png",
    icon: "Smartphone",
    gradient: "from-emerald-600 to-teal-500",
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "Grow our brand presence across digital channels through data-driven campaigns and creative strategy.",
    skills: ["SEO", "Social Media", "Google Ads", "Analytics", "Content Strategy"],
    image: "/images/role-marketing.png",
    icon: "BarChart3",
    gradient: "from-orange-500 to-amber-500",
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    id: "video",
    title: "Video Editor",
    description: "Produce engaging video content that tells the Naiye Bharat story and connects with our audience.",
    skills: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Graphics", "Color Grading"],
    image: "/images/role-video.png",
    icon: "Video",
    gradient: "from-pink-600 to-rose-500",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-200",
    badge: "bg-pink-100 text-pink-700",
  },
  {
    id: "content",
    title: "Content Writer",
    description: "Shape narratives, write compelling copy, and build content that resonates with a new India.",
    skills: ["SEO Writing", "Copywriting", "Research", "Blogging", "Social Media Copy"],
    image: "/images/role-content.png",
    icon: "PenTool",
    gradient: "from-amber-500 to-yellow-500",
    bg: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
];

export const ROLE_OPTIONS = ROLES.map((r) => r.title);

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Apply Online",
    description: "Fill out our quick, premium application form with your details, skills, and motivation.",
    icon: "Send",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    step: "02",
    title: "Screening",
    description: "Our team reviews your application and shortlisted candidates receive a brief task or interview.",
    icon: "Search",
    gradient: "from-blue-500 to-sky-600",
  },
  {
    step: "03",
    title: "Onboarding",
    description: "Selected interns get a welcome kit, team introduction, tool access, and project briefing.",
    icon: "UserCheck",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    step: "04",
    title: "Start Internship",
    description: "Begin your 3-month journey, contribute to real projects, and grow with the Naiye Bharat family.",
    icon: "Rocket",
    gradient: "from-orange-500 to-amber-600",
  },
];

export const FAQS = [
  {
    question: "Is this internship paid?",
    answer:
      "Currently, this is a learning-focused internship. We provide a rich experience with mentorship, real projects, certificate, and LOR. Stipend information, if applicable, will be communicated during onboarding.",
  },
  {
    question: "Can I apply for multiple roles?",
    answer:
      "You can submit one application per role. If you are interested in more than one role, please submit separate applications for each.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "No prior professional experience is required. We welcome freshers, students, and early-career individuals who are passionate and eager to learn.",
  },
  {
    question: "Is this internship remote?",
    answer:
      "Yes, 100% remote. You can work from anywhere in India as long as you have a stable internet connection and meet your weekly commitment hours.",
  },
  {
    question: "What is the minimum weekly commitment?",
    answer:
      "We recommend a minimum of 15-20 hours per week. The exact availability is captured in your application and discussed during onboarding.",
  },
  {
    question: "When will I hear back after applying?",
    answer:
      "Our team typically reviews applications within 7-10 working days. You will receive an email update regarding your application status.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Yes! All interns who successfully complete the 3-month program receive an official Naiye Bharat Internship Certificate. Top performers also receive a Letter of Recommendation.",
  },
  {
    question: "What tools will I need?",
    answer:
      "A laptop/desktop with internet access. Role-specific tools (e.g., VSCode, Figma, Premiere Pro) will be listed in your onboarding kit.",
  },
];

export const AVAILABILITY_OPTIONS = [
  "Less than 10 hours/week",
  "10-15 hours/week",
  "15-20 hours/week",
  "20-30 hours/week",
  "30+ hours/week (Full-time equivalent)",
];

export const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say"];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh",
  "Puducherry", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
];
