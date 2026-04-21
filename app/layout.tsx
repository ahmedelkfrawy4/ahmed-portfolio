import type { Metadata } from "next";
import { Inter, Fraunces, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Script from "next/script";
import MotionProvider from "@/components/MotionProvider";

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
    default: "Ahmed Elkfrawy — UI/UX Designer",
    template: "%s · Ahmed Elkfrawy",
  },
  description:
    "UI/UX Designer with 3+ years crafting digital experiences across e-commerce, healthcare, education and fintech. Cairo · open to remote.",
  metadataBase: new URL("https://ahmedelkfrawy.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Ahmed Elkfrawy",
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
        <MotionProvider>
          <SmoothScroll />
          <Cursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
