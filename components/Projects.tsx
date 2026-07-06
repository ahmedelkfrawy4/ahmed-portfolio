"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ArrowUpRight, Lock, Clock, Radio, CheckCircle2 } from "lucide-react";
import { projects } from "@/lib/projects";
import { PhoneMock, BrowserMock } from "@/components/Mockups";

// Pick plum or cream text so it stays legible on any accent color (some cards
// use a plum accent, which made the plum-on-plum pill text invisible).
function readableOn(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#2B1B3D" : "#FBF7F0";
}

function StatusPill({ status }: { status: typeof projects[number]["status"] }) {
  if (status === "live") {
    return (
      <span className="mono inline-flex items-center gap-1.5 rounded-full bg-[var(--color-acid)] text-[var(--color-plum)] px-2.5 py-1">
        <Radio className="size-3" />
        live
      </span>
    );
  }
  if (status === "internal") {
    return (
      <span
        className="mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[var(--color-plum)] backdrop-blur-sm"
        style={{
          borderColor: "rgba(43,27,61,0.4)",
          backgroundColor: "rgba(251,247,240,0.7)",
        }}
      >
        <Lock className="size-3" />
        internal
      </span>
    );
  }
  if (status === "completed") {
    return (
      <span
        className="mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[var(--color-plum)] backdrop-blur-sm"
        style={{
          borderColor: "#F5B841",
          backgroundColor: "rgba(245,184,65,0.85)",
        }}
      >
        <CheckCircle2 className="size-3" />
        completed
      </span>
    );
  }
  return (
    <span
      className="mono inline-flex items-center gap-1.5 rounded-full border border-dashed px-2.5 py-1 text-[var(--color-plum)] backdrop-blur-sm"
      style={{
        borderColor: "#F5B841",
        backgroundColor: "rgba(251,247,240,0.7)",
      }}
    >
      <Clock className="size-3" />
      in progress
    </span>
  );
}

function ProjectCard({
  p,
  i,
}: {
  p: (typeof projects)[number];
  i: number;
}) {
  // Spotlight that follows the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const spotlight = useMotionTemplate`radial-gradient(450px circle at ${mx}px ${my}px, rgba(255,255,255,0.10), transparent 60%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link
        href={`/projects/${p.slug}`}
        data-cursor="hover"
        className="group block h-full focus:outline-none"
      >
        <motion.article
          onMouseMove={onMove}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full flex flex-col overflow-hidden rounded-[28px] border border-[var(--color-border)]"
          style={{ backgroundColor: p.hero.bg, color: p.hero.fg }}
        >
          {/* Visual area — 16:9 to match the cover artwork natively */}
          <div className="relative aspect-[16/9] overflow-hidden">
            {/* Spotlight overlay (cursor-follow) */}
            <motion.div
              aria-hidden
              className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: spotlight }}
            />
            {/* Cover image (when provided) or generic mockup */}
            {p.hero.image ? (
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={p.hero.image}
                  alt={`${p.name} cover`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <motion.div
                className="absolute inset-0 grid place-items-center px-10 py-6"
                whileHover={{ scale: 1.04, y: -8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-full max-w-[42%]">
                  {p.mockups[0]?.type === "browser" ? (
                    <BrowserMock
                      bg={p.hero.bg}
                      fg={p.hero.fg}
                      accent={p.hero.accent}
                    />
                  ) : (
                    <PhoneMock
                      bg={p.hero.bg}
                      fg={p.hero.fg}
                      accent={p.hero.accent}
                    />
                  )}
                </div>
              </motion.div>
            )}
            <span className="absolute top-5 right-5 z-20">
              <StatusPill status={p.status} />
            </span>
          </div>

          {/* Footer info — flex-col so chips row pins to bottom across cards */}
          <div className="relative flex flex-col flex-1 px-6 md:px-7 pt-5 pb-6 md:pb-7">
            <p className="mono opacity-70 mb-2">{p.client}</p>
            <h3 className="display text-3xl md:text-4xl mb-2 leading-[0.98]">
              {p.name}
            </h3>
            <p className="display italic text-base md:text-lg opacity-90 max-w-md">
              {p.tagline}
            </p>

            {/* Spacer that grows so the row below sits at the bottom */}
            <div className="flex-1 min-h-5" />

            {/* Services chips + arrow */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {p.services.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-2.5 py-1 text-[11px] border"
                    style={{ borderColor: p.hero.fg, opacity: 0.8 }}
                  >
                    {s}
                  </span>
                ))}
                {p.services.length > 2 && (
                  <span className="mono opacity-60 self-center">
                    +{p.services.length - 2}
                  </span>
                )}
              </div>

              {/* Reveal pill — sits opposite the chips, slides in on card hover */}
              <span
                className="shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                style={{
                  backgroundColor: p.hero.accent,
                  color: readableOn(p.hero.accent),
                }}
              >
                Open case
                <ArrowUpRight className="size-3" />
              </span>
            </div>
          </div>

          {/* Bottom progress line that fills on hover */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1 origin-left"
            style={{ backgroundColor: p.hero.accent }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-[var(--color-border)] px-5 md:px-8 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <p className="mono text-[var(--color-fg-muted)] mb-3">
              projects · design + process
            </p>
            <h2 className="display text-5xl md:text-7xl leading-[0.96]">
              Pick a card. <span className="italic">Open the case.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="text-base md:text-lg text-[var(--color-fg-muted)] max-w-md">
              Each card opens a full case study — brief, problem, solution,
              process, screens, and outcomes. Hover to feel them, click to
              read.
            </p>
          </div>
        </div>

        {/* Cards grid — Magdi & Injaz hidden from grid for now (detail pages still live) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects
            .filter((p) => p.slug !== "magdi-yacoub" && p.slug !== "injaz")
            .map((p, i) => (
              <ProjectCard key={p.slug} p={p} i={i} />
            ))}
        </div>

        {/* Footer note */}
        <p className="hand text-2xl md:text-3xl text-[var(--color-fg)] mt-12 -rotate-1">
          want a deep-dive on something not listed? <a href="#contact" className="text-[var(--color-fg-muted)] link-underline">just ask ↗</a>
        </p>
      </div>
    </section>
  );
}
