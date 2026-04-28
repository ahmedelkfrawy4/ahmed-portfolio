export type ProjectStatus = "live" | "internal" | "in-progress" | "completed";

export type ProjectLink = { label: string; href: string };

export type ProjectMockup = {
  label: string;
  type: "phone" | "browser";
  image?: string;
  aspect?: string;
  moreCount?: number;
};

export type ProjectArtifact = {
  label: string;
  caption?: string;
  image: string;
  aspect?: string;
};

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
  hero: { bg: string; fg: string; accent: string; image?: string; imageAspect?: string };
  mockups: ProjectMockup[];
  artifacts?: ProjectArtifact[];
};

export const projects: Project[] = [
  {
    slug: "fittra-clinic",
    n: "01",
    name: "Fittra Clinic",
    client: "Fittra Clinic — بيت الأنوثة",
    sector: "Healthcare · Women's Wellness",
    year: "2024 — present",
    status: "live",
    services: ["UI/UX Design", "Web Design", "Brand UI", "Arabic-first / RTL"],
    tagline:
      "A calm, women-first wellness brand — designed Arabic-first.",
    overview:
      "Fittra Clinic is a women's wellness clinic that needed a digital presence as warm and trustworthy as the experience inside. The brief was Arabic-first by default, with a calm visual tone that turns first-time visitors into booked patients. Every surface — landing page, services, booking — had to feel like the same brand.",
    problem:
      "Most clinic sites in the region read as either over-clinical or over-decorative. Patients struggle to find services, booking flows are buried, and the brand voice rarely matches the calm in-clinic experience.",
    solution:
      "Designed an Arabic-first interface with generous spacing and warm brand colour. Put services and booking front-and-centre with a service architecture that scans fast. Threaded a consistent visual language from landing page to booking confirmation.",
    process: [
      "Stakeholder workshops with the Fittra clinic team to map tone and services",
      "Audit of regional clinic sites and women's wellness brands",
      "Information architecture for services, booking and content",
      "Wireframes → high-fidelity UI built Arabic-first / RTL",
      "Iterative reviews with the clinic team",
      "Hand-off with components, tokens and content guidelines",
    ],
    outcomes: ["Live in Arabic", "Warm clinic brand", "Clear booking flow"],
    liveLinks: [
      { label: "fittraclinic.com", href: "https://fittraclinic.com/ar" },
    ],
    hero: {
      bg: "#FBF7F0",
      fg: "#2B1B3D",
      accent: "#F5B841",
      image: "/projects/fittra-clinic/cover.jpg",
      imageAspect: "16 / 9",
    },
    mockups: [
      {
        label: "Signup",
        type: "browser",
        image: "/projects/fittra-clinic/signup.jpg",
        aspect: "3 / 2",
      },
      {
        label: "Profile",
        type: "browser",
        image: "/projects/fittra-clinic/profile.jpg",
        aspect: "3 / 2",
      },
      {
        label: "Gifts & promotions",
        type: "browser",
        image: "/projects/fittra-clinic/gifts.jpg",
        aspect: "3 / 2",
      },
      {
        label: "Discussion",
        type: "browser",
        image: "/projects/fittra-clinic/discussion.jpg",
        aspect: "3 / 2",
      },
      {
        label: "Calendar",
        type: "browser",
        image: "/projects/fittra-clinic/calendar.jpg",
        aspect: "3 / 2",
      },
      {
        label: "Course page",
        type: "browser",
        image: "/projects/fittra-clinic/course.jpg",
        aspect: "3 / 2",
      },
      {
        label: "+ 12 more screens",
        type: "browser",
        image: "/projects/fittra-clinic/course.jpg",
        aspect: "3 / 2",
        moreCount: 12,
      },
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
    services: [
      "UX Research",
      "Competitor Audit",
      "User Flows",
      "Mobile App Design",
      "Design System",
    ],
    tagline:
      "Clarity-first e-commerce — five clean tabs and one bold CTA per screen.",
    overview:
      "Brandi needed a mobile storefront for a market full of overloaded e-commerce apps. We started with a Double Diamond — a competitor audit across five regional players (Onelaty, Adidas, Ordary, Emaa, Ubuy), then narrowed to four sharp problem statements before designing a clarity-first home, a five-tab nav, and a three-step checkout. Every screen ships with one job and one bold CTA.",
    problem:
      "Users struggled to decide what to do on the home because the hero and promotions competed for attention. Navigation labels and icons varied, slowing wayfinding. Visual inconsistency and mixed languages increased cognitive load. Primary CTAs were not visually or positionally prioritized, hurting conversion.",
    solution:
      "Clarity-first home — one hero, one message, one bold CTA, one featured deals strip, one category grid. Unambiguous nav — icon + label, locked to five tabs (Home, Categories, Search, Favorites, Account). Consistent system — standardized deal cards, tighter brand palette, stronger heading hierarchy. Language discipline — single language per section with a clear locale switch. Conversion mechanic — sticky CTAs, three-step checkout, basic personalization.",
    process: [
      "Competitor audit across five regional e-commerce apps — Onelaty, Adidas, Ordary, Emaa, Ubuy",
      "Define — narrowed the audit into four sharp problem statements with measurable success criteria",
      "User flows — splash → onboarding → home, with branches for search, categories, brands, favorites, cart, login, signup, forgot-password and checkout",
      "Information architecture and low-fi wireframes for the clarity-first home and five-tab nav",
      "High-fidelity UI in the Brandi brand — standardized deal cards, sticky CTAs, three-step checkout",
      "Rapid A/B experiments — single hero vs stacked banners, icon-only vs icon+label nav, single-language vs mixed sections",
      "Implementation in four sprints — IA cleanup, visual system, sticky CTA + checkout + personalization, localization policy",
    ],
    outcomes: [
      "Live on Google Play",
      "5-tab navigation, locked",
      "3-step checkout",
      "Single-hero home pattern",
    ],
    liveLinks: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.brandiiq.app",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/ae/app/brandi/id6754631038",
      },
    ],
    hero: {
      bg: "#F5B841",
      fg: "#2B1B3D",
      accent: "#2B1B3D",
      image: "/projects/brandi/cover.jpg",
      imageAspect: "16 / 9",
    },
    mockups: [
      { label: "Sign in", type: "phone", image: "/projects/brandi/signin.jpg" },
      { label: "Category", type: "phone", image: "/projects/brandi/category.jpg" },
      { label: "Favorites", type: "phone", image: "/projects/brandi/favorites.jpg" },
      { label: "Orders", type: "phone", image: "/projects/brandi/orders.jpg" },
      { label: "Notifications", type: "phone", image: "/projects/brandi/notifications.jpg" },
      { label: "My address", type: "phone", image: "/projects/brandi/address.jpg" },
      { label: "Refer a friend", type: "phone", image: "/projects/brandi/refer.jpg" },
      { label: "Edit profile", type: "phone", image: "/projects/brandi/edit-profile.jpg" },
      {
        label: "+ 33 more screens",
        type: "phone",
        image: "/projects/brandi/category.jpg",
        moreCount: 33,
      },
    ],
    artifacts: [
      {
        label: "User flow",
        caption:
          "End-to-end flow — search, categories, brands, favorites, login/signup, checkout and account",
        image: "/projects/brandi/user-flow.jpg",
        aspect: "2800 / 2165",
      },
      {
        label: "Double Diamond — process",
        caption:
          "Discover · Define · Develop · Deliver — competitor audit, problem statements, design directions and the four-sprint implementation plan",
        image: "/projects/brandi/process-double-diamond.jpg",
        aspect: "1800 / 2311",
      },
      {
        label: "Competitor audit",
        caption:
          "Five regional e-commerce apps reviewed — strengths, recurring UX issues, and the recommendations we built Brandi against",
        image: "/projects/brandi/audit-report.jpg",
        aspect: "1079 / 2490",
      },
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
    client: "Alvatan Tours — Freelance",
    sector: "Travel & Tourism",
    year: "2023 — 2025",
    status: "completed",
    services: [
      "UX Research",
      "Mobile App Design",
      "Admin Dashboard",
      "Design System",
    ],
    tagline:
      "Discover, plan and go — one travel companion for tours, restaurants, shopping, and rides.",
    overview:
      "Baba Guide is designed as a single travel companion that unifies the fragmented tourist journey. Users pick a language, country and city on first open, then browse tours, restaurants, shopping, rent-a-car, chauffeur services and subway tickets in one place. Each listing shows price, availability, reviews and offers. A full admin dashboard lets the Alvatan Tours team manage countries, cities, companies, tours, chauffeurs, subway routes and users. Delivered as a complete design system covering 60+ mobile screens and a 15-screen web admin.",
    problem:
      "Tourists in Turkey juggle a dozen disconnected apps to plan a single trip — one for tours, another for transport, a third for restaurants, another for shopping. Listings are scattered, prices are opaque, and reviews live on separate platforms. Operators like Alvatan Tours had no unified way to publish their inventory and manage it.",
    solution:
      "One mobile app covering discovery, booking and reviews across every sector. A paired admin dashboard gives operators a single source of truth for their catalog. The design system threads a warm ochre brand through every surface, with calm typography and large tap targets that hold up for stressed, on-the-go travelers.",
    process: [
      "Stakeholder workshops with Alvatan Tours to map every sector and role",
      "Competitive audit of travel, transport and local-services apps in Turkey",
      "Information architecture for the mobile app (60+ screens) and admin (15+ views)",
      "Wireframes → high-fidelity UI in a single shared design system",
      "Iterative reviews with the client through a shipped Figma prototype",
      "Complete handoff — spec, tokens, components and screen-by-screen notes",
    ],
    outcomes: [
      "60+ mobile screens",
      "15+ admin views",
      "Unified design system",
      "Full design handoff",
    ],
    hero: {
      bg: "#FBF7F0",
      fg: "#2B1B3D",
      accent: "#F5B841",
      image: "/projects/baba-guide/cover.jpg",
      imageAspect: "16 / 9",
    },
    mockups: [
      { label: "Home", type: "phone", image: "/projects/baba-guide/home.png" },
      { label: "Search", type: "phone", image: "/projects/baba-guide/search.png" },
      {
        label: "Filters",
        type: "phone",
        image: "/projects/baba-guide/search-filters.png",
      },
      { label: "Map", type: "phone", image: "/projects/baba-guide/map.png" },
      {
        label: "Tour place",
        type: "phone",
        image: "/projects/baba-guide/tour-place.png",
      },
      {
        label: "Restaurant",
        type: "phone",
        image: "/projects/baba-guide/restaurant.png",
      },
      { label: "Reviews", type: "phone", image: "/projects/baba-guide/reviews.png" },
      { label: "Offers", type: "phone", image: "/projects/baba-guide/offers.png" },
      {
        label: "+ 60 more mobile screens",
        type: "phone",
        image: "/projects/baba-guide/home.png",
        moreCount: 60,
      },
      {
        label: "Admin — Admins",
        type: "browser",
        image: "/projects/baba-guide/admin-admins.png",
        aspect: "1024 / 768",
      },
      {
        label: "Admin — Users",
        type: "browser",
        image: "/projects/baba-guide/admin-users.png",
        aspect: "1024 / 768",
      },
      {
        label: "Admin — Cities",
        type: "browser",
        image: "/projects/baba-guide/admin-cities.png",
        aspect: "1024 / 768",
      },
      {
        label: "Admin — Companies",
        type: "browser",
        image: "/projects/baba-guide/admin-companies.png",
        aspect: "1024 / 768",
      },
      {
        label: "Admin — Tours",
        type: "browser",
        image: "/projects/baba-guide/admin-tour.png",
        aspect: "1024 / 768",
      },
      {
        label: "+ 15 more dashboard views",
        type: "browser",
        image: "/projects/baba-guide/admin-cities.png",
        aspect: "1024 / 768",
        moreCount: 15,
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
