import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Script from "next/script";
import MotionProvider from "@/components/MotionProvider";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ahmed Elkfrawy — UI/UX Designer in Cairo",
    template: "%s · Ahmed Elkfrawy",
  },
  description:
    "Ahmed Elkfrawy is a UI/UX designer in Cairo with 3+ years crafting digital experiences across e-commerce, healthcare, education and fintech. Available for remote work.",
  metadataBase: new URL("https://ahmedelkfrawy.com"),
  applicationName: "Ahmed Elkfrawy Portfolio",
  authors: [{ name: "Ahmed Elkfrawy", url: "https://ahmedelkfrawy.com" }],
  creator: "Ahmed Elkfrawy",
  publisher: "Ahmed Elkfrawy",
  keywords: [
    "Ahmed Elkfrawy",
    "UI/UX designer",
    "UI designer Cairo",
    "UX designer Egypt",
    "product designer",
    "web design",
    "mobile app design",
    "Arabic UI design",
    "portfolio",
    "freelance UI/UX designer",
  ],
  category: "design",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Ahmed Elkfrawy",
    url: "https://ahmedelkfrawy.com",
    title: "Ahmed Elkfrawy — UI/UX Designer in Cairo",
    description:
      "UI/UX Designer with 3+ years crafting digital experiences across e-commerce, healthcare, education and fintech. Cairo · open to remote.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Elkfrawy — UI/UX Designer in Cairo",
    description:
      "UI/UX Designer with 3+ years crafting digital experiences across e-commerce, healthcare, education and fintech. Cairo · open to remote.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF7F0" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0B14" },
  ],
  colorScheme: "light dark",
};

// Person + ProfilePage schema — the strongest signal for owning the
// "Ahmed Elkfrawy" search result and appearing in Google's Knowledge Graph.
const personLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": "https://ahmedelkfrawy.com/#person",
    name: "Ahmed Elkfrawy",
    givenName: "Ahmed",
    familyName: "Elkfrawy",
    url: "https://ahmedelkfrawy.com",
    image: "https://ahmedelkfrawy.com/ahmed.jpg",
    jobTitle: "UI/UX Designer",
    description:
      "UI/UX designer with 3+ years crafting digital experiences across e-commerce, healthcare, education and fintech.",
    email: "mailto:info@ahmedelkfrawy.com",
    telephone: "+201093839772",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    knowsAbout: [
      "UI Design",
      "UX Design",
      "Product Design",
      "Web Design",
      "Mobile App Design",
      "Design Systems",
      "Arabic-first / RTL Design",
      "Prototyping",
      "User Research",
    ],
    sameAs: ["https://www.linkedin.com/in/ahmedelkfrawy"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&m)){document.documentElement.classList.add('dark');}}catch(e){}`}
        </Script>
      </head>
      <body className="grain" suppressHydrationWarning>
        <JsonLd data={personLd} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-full focus:bg-[var(--color-fg)] focus:px-5 focus:py-2.5 focus:font-medium focus:text-[var(--color-bg)]"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll />
          <Cursor />
          {children}
        </MotionProvider>
        <Script
          id="cf-web-analytics"
          strategy="afterInteractive"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "fd9e3f4aff7c4350b5444775b18b7421"}'
        />
      </body>
    </html>
  );
}
