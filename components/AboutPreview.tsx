"use client";

import { motion } from "motion/react";
import Image from "next/image";

type Polaroid =
  | {
      type: "photo";
      src: string;
      alt: string;
      caption: string;
      r: number;
      bg: string;
    }
  | {
      type: "text";
      label: string;
      caption: string;
      r: number;
      bg: string;
    };

const polaroids: Polaroid[] = [
  {
    type: "photo",
    src: "/ahmed.jpg",
    alt: "Ahmed Elkfrawy",
    caption: "the designer ✺",
    r: -4,
    bg: "#FBF7F0",
  },
  {
    type: "text",
    label: "Alexandria → Cairo",
    caption: "currently here ✺",
    r: 6,
    bg: "#F5B841",
  },
  {
    type: "text",
    label: "Figma is home.",
    caption: "tool of choice",
    r: -3,
    bg: "#FFD6C4",
  },
  {
    type: "text",
    label: "3+ years · 6 teams · 4 sectors.",
    caption: "track record",
    r: 7,
    bg: "#D4FF3A",
  },
];

// Desktop scatter positions (top, left in px) — a loose 2×2 so no card
// covers the one beneath it and every caption stays readable.
const FAN = [
  { t: 0, l: 0 },
  { t: 60, l: 250 },
  { t: 330, l: 30 },
  { t: 390, l: 270 },
];

export default function AboutPreview() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-5 md:px-8 py-24 md:py-32 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Narrative */}
        <div className="lg:col-span-7">
          <p className="mono text-[var(--color-fg-muted)] mb-4">
            about · the operating system
          </p>
          <h2 className="display text-5xl md:text-7xl mb-8">
            The quiet <span className="italic">translator</span> between users and teams.
          </h2>
          <div className="space-y-5 text-lg md:text-xl text-[var(--color-fg-muted)] leading-relaxed max-w-2xl">
            <p>
              I&rsquo;m Ahmed. For three years I&rsquo;ve been turning messy
              research into interfaces that <span className="text-[var(--color-fg)]">move the
              needle</span>.
            </p>
            <p>
              At <span className="text-[var(--color-fg)] font-medium">MTN</span>, that
              meant a platform that lifted sales <span className="text-[var(--color-fg)] font-medium">30%</span>{" "}
              and held a <span className="text-[var(--color-fg)] font-medium">94%</span>{" "}
              satisfaction score. At the{" "}
              <span className="text-[var(--color-fg)] font-medium">Magdi Yacoub Heart Foundation</span>,
              it meant rebuilding a complaint system for patients in crisis.
            </p>
            <p>
              Different stakes, same job:{" "}
              <span className="display italic text-[var(--color-fg)]">
                ship the human-centered version
              </span>
              .
            </p>
          </div>

          <p className="hand mt-10 text-3xl text-[var(--color-fg)] -rotate-2">
            research → wireframes → UI → ship → measure → repeat
          </p>
        </div>

        {/* Polaroids — stacked fan on desktop, scatter grid on mobile */}
        <div className="relative lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-5 lg:block lg:min-h-[760px]">
          {polaroids.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.r }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 20 }}
              className="force-light paper relative w-full p-3 pb-8 rounded-md sm:p-4 sm:pb-10 lg:absolute lg:w-56 lg:top-[var(--pt)] lg:left-[var(--pl)]"
              style={
                {
                  backgroundColor: p.bg,
                  zIndex:
                    polaroids.length - i + (p.type === "photo" ? 10 : 0),
                  "--pt": `${FAN[i].t + 10}px`,
                  "--pl": `${FAN[i].l + 10}px`,
                } as React.CSSProperties
              }
              data-cursor="hover"
            >
              {p.type === "photo" ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[var(--color-plum)]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="288px"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] w-full rounded-sm bg-[var(--color-plum)]/90 grid place-items-center">
                  <span className="display italic text-[var(--color-cream)] text-xl md:text-2xl text-center px-3 leading-tight">
                    {p.label}
                  </span>
                </div>
              )}
              <p className="hand mt-3 text-xl text-[var(--color-fg)] text-center">
                {p.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
