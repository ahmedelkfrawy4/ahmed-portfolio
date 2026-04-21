export type ProjectStatus = "live" | "internal" | "in-progress";

export type ProjectLink = { label: string; href: string };

export type ProjectMockup = { label: string; type: "phone" | "browser" };

export type Project = {
  slug: string;
  n: string;
  name: string;
  client: string;
  sector: string;
  year: string;
  status: ProjectStatus;
  services: string[];
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  process: string[];
  outcomes: string[];
  liveLinks?: ProjectLink[];
  hero: { bg: string; fg: string; accent: string };
  mockups: ProjectMockup[];
};

export const projects: Project[] = [
  {
    slug: "mtn",
    n: "01",
    name: "MTN Platform Suite",
    client: "MTN — Training & Self-Improvement",
    sector: "Training · Fintech · Education",
    year: "2024 — present",
    status: "live",
    services: ["UI/UX Design", "Design System", "Research", "Mobile + Web"],
    tagline:
      "Six platforms, one design language — and a 30% sales lift to prove it.",
    overview:
      "MTN runs five public platforms (Fittra Clinic, Fittra Stream, Fittra Training, MTN Institute, MTN Payment) plus an internal payment tool. Each had its own audience — patients, learners, fitness fans, paying customers — and none of them felt like the same brand. My job: unify them, ship them, and make them sell.",
    problem:
      "Fragmented platforms with inconsistent flows. Users dropped off mid-onboarding because every product felt like a different company. The internal team had no shared design system to lean on.",
    solution:
      "Built one unified design system from the ground up — typography, color, components, motion, the lot. Then redesigned each platform end-to-end against it: research → wireframes → prototypes → usability tests every sprint.",
    process: [
      "Stakeholder interviews across each product team to map shared needs",
      "Competitive audits per vertical (training, payment, learning, healthcare)",
      "Design tokens + foundational components in Figma — shared library",
      "Per-platform redesign sprints, each shipped with usability tests",
      "Accessibility pass — color contrast, target sizes, motion preferences",
      "Hand-off + maintenance docs for the engineering team",
    ],
    outcomes: ["+30% sales lift", "94% user satisfaction", "6 products live"],
    liveLinks: [
      { label: "MTN Payment", href: "https://www.mtnpayment.com/en" },
      { label: "MTN Institute", href: "https://mtninstitute.net/ar" },
      { label: "Fittra Training", href: "https://www.fittratraining.com/ar" },
      { label: "Fittra Stream", href: "https://fittrastream.com/en" },
      { label: "Fittra Clinic", href: "https://fittraclinic.com/ar" },
    ],
    hero: { bg: "#2B1B3D", fg: "#FBF7F0", accent: "#F5B841" },
    mockups: [
      { label: "Onboarding flow", type: "phone" },
      { label: "Dashboard", type: "browser" },
      { label: "Payment sheet", type: "phone" },
      { label: "Course player", type: "browser" },
    ],
  },
  {
    slug: "magdi-yacoub",
    n: "02",
    name: "Magdi Yacoub Patient-Care Suite",
    client: "Magdi Yacoub Heart Foundation",
    sector: "Healthcare",
    year: "2022 — 2023",
    status: "internal",
    services: ["UI/UX Design", "Mobile App", "Internal Systems"],
    tagline: "Calm interfaces for people in crisis — not clever ones.",
    overview:
      "A non-profit heart foundation in Aswan needed to fix the way patients submit complaints, the way staff log internal incidents (OVR), and how patients access support on mobile. None of these are 'fun' problems. All of them are critical.",
    problem:
      "The existing complaint system was unusable when patients were already stressed. Staff drowned in paperwork. There was no patient-facing app at all.",
    solution:
      "Designed three products in parallel — a redesigned complaint flow, an internal OVR system for staff, and a patient-support mobile interface. Stripped every screen to its essential action. Used calm typography, big targets, no jargon.",
    process: [
      "Field research with patients and frontline staff",
      "Audit of the existing complaint system — what was failing and why",
      "Information architecture for the OVR (Occurrence Variance Reporting) system",
      "Mobile-first patient app with accessibility-first patterns",
      "Iterated wireframes with foundation stakeholders, then high-fidelity",
      "Hand-off with usage guidelines for the in-house team",
    ],
    outcomes: ["3 products shipped", "Patient-first flows", "Pro-bono impact"],
    hero: { bg: "#FFD6C4", fg: "#2B1B3D", accent: "#2B1B3D" },
    mockups: [
      { label: "Complaint flow", type: "phone" },
      { label: "OVR dashboard", type: "browser" },
      { label: "Patient app — home", type: "phone" },
      { label: "Support details", type: "phone" },
    ],
  },
  {
    slug: "brandi",
    n: "03",
    name: "Brandi Mobile App",
    client: "Brandi — E-commerce",
    sector: "E-commerce · Mobile",
    year: "2025",
    status: "live",
    services: ["UX Research", "Mobile App Design", "Persona Mapping"],
    tagline: "Baghdad to your basket — a mobile-first storefront.",
    overview:
      "Brandi needed to launch their e-commerce app in a market with fragmented shopping habits. We had to do real research before opening Figma — interviewing buyers, mapping personas, auditing competitors.",
    problem:
      "Fragmented shopping experience, abandoned carts, misaligned stakeholders, no clear research loop.",
    solution:
      "Ran the full UX cycle: stakeholder interviews, competitor audit, personas, then mobile-first flows. Iterated weekly with the build team until it was on the Play Store.",
    process: [
      "Stakeholder workshops to align on KPIs and constraints",
      "Local-market competitor audit",
      "5 user interviews → 3 personas",
      "Information architecture + low-fi wireframes",
      "High-fidelity UI in line with the brand identity",
      "Two rounds of usability tests pre-launch",
    ],
    outcomes: ["Live on Google Play", "Full UX cycle", "Mobile-first"],
    liveLinks: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.brandiiq.app",
      },
    ],
    hero: { bg: "#F5B841", fg: "#2B1B3D", accent: "#2B1B3D" },
    mockups: [
      { label: "Home", type: "phone" },
      { label: "Product detail", type: "phone" },
      { label: "Cart + checkout", type: "phone" },
    ],
  },
  {
    slug: "injaz",
    n: "04",
    name: "Injaz",
    client: "Sectors",
    sector: "EdTech",
    year: "2021 — 2022",
    status: "live",
    services: ["UI/UX Design", "Web + Mobile", "Design System"],
    tagline: "Where students and tutors finally met on the same page.",
    overview:
      "An online teaching platform built from scratch — the brief was: students need to find tutors fast; tutors need to teach without fighting the tool.",
    problem:
      "Two audiences, two surfaces (web + mobile), one product. Each side needed its own flow, but the product needed to feel like one thing.",
    solution:
      "Designed parallel student / tutor flows on shared visual foundations. Web for tutors (deep tooling), mobile-first for students (browse + book).",
    process: [
      "Mapped both audiences as separate journeys",
      "Defined the shared design language across web + mobile",
      "Wireframed the booking + class flow end-to-end",
      "High-fidelity UI with handoff specs",
      "Supported the engineering launch",
    ],
    outcomes: ["0→1 launch", "Web + mobile", "Responsive system"],
    liveLinks: [{ label: "injazedu.co", href: "https://injazedu.co/" }],
    hero: { bg: "#D4FF3A", fg: "#2B1B3D", accent: "#2B1B3D" },
    mockups: [
      { label: "Student home", type: "browser" },
      { label: "Tutor dashboard", type: "browser" },
      { label: "Mobile booking", type: "phone" },
    ],
  },
  {
    slug: "baba-guide",
    n: "05",
    name: "Baba Guide",
    client: "Freelance",
    sector: "Travel & Tourism",
    year: "2026",
    status: "in-progress",
    services: ["UX Research", "Mobile App Design"],
    tagline: "A travel & tourism app — designed from scratch.",
    overview:
      "Currently in design. Baba Guide is a freelance project — a travel & tourism mobile app being shaped through interviews, research, and iterative wireframes.",
    problem:
      "Travelers need a calm, locally-aware guide that doesn't feel like a directory. The challenge is building trust + utility in the same interface.",
    solution:
      "Designing the product from the ground up — research-first, persona-driven, mobile-first.",
    process: [
      "Field research with travelers in target regions",
      "Persona mapping + competitive landscape",
      "Information architecture (in progress)",
      "Wireframes (in progress)",
      "High-fidelity UI (next phase)",
    ],
    outcomes: ["In design", "Travel & tourism", "Mobile-first"],
    hero: { bg: "#FFD6C4", fg: "#2B1B3D", accent: "#F5B841" },
    mockups: [
      { label: "Discover", type: "phone" },
      { label: "Trip detail", type: "phone" },
      { label: "Saved places", type: "phone" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
