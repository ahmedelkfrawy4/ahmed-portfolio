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
    "Ahmed Elkfrawy is a UI/UX designer in Cairo — user experience (UX), user interface (UI) and product design across healthcare, e-commerce, education and fintech. Open to freelance and remote work.",
  metadataBase: new URL("https://ahmedelkfrawy.com"),
  applicationName: "Ahmed Elkfrawy Portfolio",
  authors: [{ name: "Ahmed Elkfrawy", url: "https://ahmedelkfrawy.com" }],
  creator: "Ahmed Elkfrawy",
  publisher: "Ahmed Elkfrawy",
  keywords: [
    "Ahmed Elkfrawy",
    "UI/UX designer",
    "UI/UX designer Cairo",
    "UX designer",
    "UX designer Cairo",
    "user experience designer",
    "UI designer",
    "user interface designer",
    "product designer",
    "product designer Cairo",
    "freelance UI/UX designer",
    "Arabic UI designer",
    "RTL designer",
    "web design",
    "mobile app design",
    "healthcare app designer",
    "portfolio",
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
      "UI/UX Designer with 5+ years crafting digital experiences across e-commerce, healthcare, education and fintech. Cairo · open to remote.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Elkfrawy — UI/UX Designer in Cairo",
    description:
      "UI/UX Designer with 5+ years crafting digital experiences across e-commerce, healthcare, education and fintech. Cairo · open to remote.",
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
    jobTitle: [
      "UI/UX Designer",
      "User Experience (UX) Designer",
      "User Interface (UI) Designer",
      "Product Designer",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "UI/UX Designer",
      occupationLocation: {
        "@type": "City",
        name: "Cairo, Egypt",
      },
      skills:
        "User experience design, user interface design, product design, design systems, prototyping, user research, Arabic-first / RTL design",
    },
    description:
      "UI/UX designer with 5+ years crafting digital experiences across e-commerce, healthcare, education and fintech.",
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
    sameAs: [
      "https://www.linkedin.com/in/ahmedelkfrawy",
      "https://www.behance.net/ahmedelkfrawy",
      "https://dribbble.com/AhmedElkfrawy",
      "https://www.instagram.com/aelkfrawy/",
    ],
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
        <Script
          id="ga4-src"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-JPVQSZN8FZ"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-JPVQSZN8FZ');`}
        </Script>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "y6w0kdoyqo");`}
        </Script>
      </body>
    </html>
  );
}
