"use client";

import { motion } from "motion/react";
import {
  Search,
  Layers,
  Users,
  Sparkles,
  Pin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Group = {
  n: string;
  title: string;
  blurb: string;
  bg: string;
  fg: string;
  accent: string;
  pin: string;
  icon: LucideIcon;
  hand: string;
  chips: { label: string; pinned?: boolean; tilt?: number }[];
};

const groups: Group[] = [
  {
    n: "01",
    title: "Tools",
    blurb:
      "Where I actually live. Figma since 2020, XD since the start. Component libraries, auto-layout, variants — all the boring sharp stuff.",
    bg: "#2B1B3D",
    fg: "#FBF7F0",
    accent: "#F5B841",
    pin: "#D4FF3A",
    icon: Sparkles,
    hand: "daily driver since 2020",
    chips: [
      { label: "Figma", pinned: true, tilt: -2 },
      { label: "Adobe XD", tilt: 3 },
      { label: "Auto-layout", tilt: -1 },
      { label: "Variants", tilt: 2 },
      { label: "Tokens", tilt: -3 },
    ],
  },
  {
    n: "02",
    title: "Research",
    blurb:
      "The part most designers skip. I run interviews, audit competitors, map personas, and watch real people break my prototypes — every sprint.",
    bg: "#FFD6C4",
    fg: "#2B1B3D",
    accent: "#2B1B3D",
    pin: "#F5B841",
    icon: Search,
    hand: "the part most skip",
    chips: [
      { label: "user research", pinned: true, tilt: -2 },
      { label: "usability testing", tilt: 3 },
      { label: "competitor analysis", tilt: -1 },
      { label: "persona mapping", tilt: 2 },
      { label: "stakeholder interviews", tilt: -3 },
    ],
  },
  {
    n: "03",
    title: "Craft",
    blurb:
      "The visible work. Design systems that don't rot, interaction details that feel right, responsive UI that actually responds.",
    bg: "#F5B841",
    fg: "#2B1B3D",
    accent: "#2B1B3D",
    pin: "#FFD6C4",
    icon: Layers,
    hand: "the visible 10%",
    chips: [
      { label: "design systems", pinned: true, tilt: -2 },
      { label: "visual design", tilt: 3 },
      { label: "interaction design", tilt: -1 },
      { label: "responsive design", tilt: 2 },
      { label: "prototyping", tilt: -3 },
    ],
  },
  {
    n: "04",
    title: "Team",
    blurb:
      "Where the work actually ships. Sprint by sprint, with PMs and engineers, in standups, in Slack threads, in async docs.",
    bg: "#D4FF3A",
    fg: "#2B1B3D",
    accent: "#2B1B3D",
    pin: "#FFD6C4",
    icon: Users,
    hand: "ship together or not at all",
    chips: [
      { label: "agile", pinned: true, tilt: -2 },
      { label: "sprint planning", tilt: 3 },
      { label: "stakeholder mgmt", tilt: -1 },
      { label: "cross-functional", tilt: 2 },
      { label: "design hand-off", tilt: -3 },
    ],
  },
];

function Chip({
  label,
  pinned,
  tilt = 0,
  pinColor,
  fg,
  borderColor,
}: {
  label: string;
  pinned?: boolean;
  tilt?: number;
  pinColor: string;
  fg: string;
  borderColor: string;
}) {
  return (
    <motion.span
      drag
      dragElastic={0.6}
      dragTransition={{ bounceStiffness: 380, bounceDamping: 18 }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
      whileTap={{ scale: 0.94, cursor: "grabbing" }}
      initial={{ rotate: tilt }}
      animate={{ rotate: tilt }}
      data-cursor="hover"
      style={{
        color: fg,
        borderColor: borderColor,
        backgroundColor: pinned ? pinColor : "transparent",
      }}
      className="relative inline-flex cursor-grab select-none items-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 text-sm font-medium"
    >
      {pinned && (
        <Pin
          className="size-3 -ml-0.5"
          style={{ color: fg, fill: fg }}
        />
      )}
      {label}
    </motion.span>
  );
}

function GroupCard({ g, span }: { g: Group; span: string }) {
  const Icon = g.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`relative flex flex-col justify-between overflow-hidden rounded-[28px] p-7 md:p-9 ${span}`}
      style={{ backgroundColor: g.bg, color: g.fg }}
    >
      {/* Top: number + icon */}
      <div className="flex items-start justify-between">
        <span className="mono opacity-70">{g.n} · {g.title.toLowerCase()}</span>
        <span
          className="grid h-10 w-10 place-items-center rounded-full"
          style={{ backgroundColor: g.accent + "33", color: g.accent }}
        >
          <Icon className="size-4" />
        </span>
      </div>

      {/* Middle: title + blurb */}
      <div className="mt-10 mb-8">
        <h3 className="display text-5xl md:text-6xl mb-3 leading-[0.95]">
          {g.title}
        </h3>
        <p className="text-sm md:text-base opacity-80 max-w-md leading-relaxed">
          {g.blurb}
        </p>
      </div>

      {/* Bottom: chips */}
      <div className="flex flex-wrap gap-2">
        {g.chips.map((c) => (
          <Chip
            key={c.label}
            label={c.label}
            pinned={c.pinned}
            tilt={c.tilt}
            pinColor={g.pin}
            fg={g.fg}
            borderColor={g.fg}
          />
        ))}
      </div>

      {/* Handwritten corner note */}
      <span
        className="hand absolute -bottom-1 right-5 text-2xl rotate-[-4deg] pointer-events-none"
        style={{ color: g.fg, opacity: 0.5 }}
      >
        {g.hand}
      </span>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section
      id="toolbelt"
      className="force-light relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-cream)] px-5 md:px-8 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 md:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="mono text-[var(--color-fg-muted)] mb-3">
              the toolbelt · workshop view
            </p>
            <h2 className="display text-5xl md:text-7xl leading-[0.96]">
              Everything I work <span className="italic">with</span>.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            <p className="text-[var(--color-fg-muted)] max-w-md">
              Four zones, sharpened over three years across telecom,
              healthcare, e-commerce and EdTech. Each chip is draggable —
              <span className="hand text-2xl text-[var(--color-fg)]">
                {" "}fling one ↗
              </span>
            </p>
          </div>
        </div>

        {/* Bento grid: 7 cols x 2 rows
            Row 1: Tools (3) + Research (4)
            Row 2: Craft (4)   + Team (3)     */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-5">
          <GroupCard g={groups[0]} span="md:col-span-3 md:min-h-[440px]" />
          <GroupCard g={groups[1]} span="md:col-span-4 md:min-h-[440px]" />
          <GroupCard g={groups[2]} span="md:col-span-4 md:min-h-[440px]" />
          <GroupCard g={groups[3]} span="md:col-span-3 md:min-h-[440px]" />
        </div>

        {/* Footer note */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[var(--color-fg-muted)]">
          <p className="mono">
            <span className="inline-block h-2 w-2 mr-2 rounded-full bg-[var(--color-fg)] align-middle" />
            pinned = primary · others = supporting
          </p>
          <p className="hand text-xl text-[var(--color-fg)] -rotate-1">
            chips bounce back if you let go ✺
          </p>
        </div>
      </div>
    </section>
  );
}
