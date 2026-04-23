"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ArrowUpRight, Lock, Clock, Radio, CheckCircle2 } from "lucide-react";
import { projects } from "@/lib/projects";
import { PhoneMock, BrowserMock } from "@/components/Mockups";

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
      <span className="mono inline-flex items-center gap-1.5 rounded-full border border-[var(--color-fg)]/30 px-2.5 py-1 text-[var(--color-fg-muted)]">
        <Lock className="size-3" />
        internal
      </span>
    );
  }
  if (status === "completed") {
    return (
      <span className="mono inline-flex items-center gap-1.5 rounded-full border border-[var(--color-ochre)] bg-[var(--color-ochre)]/15 px-2.5 py-1 text-[var(--color-fg)]">
        <CheckCircle2 className="size-3" />
        completed
      </span>
    );
  }
  return (
    <span className="mono inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--color-ochre)] px-2.5 py-1 text-[var(--color-fg)]">
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
    >
      <Link
        href={`/projects/${p.slug}`}
        data-cursor="hover"
        className="group block focus:outline-none"
      >
        <motion.article
          onMouseMove={onMove}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] border border-[var(--color-border)]"
          style={{ backgroundColor: p.hero.bg, color: p.hero.fg }}
        >
          {/* Visual area */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* Spotlight overlay (cursor-follow) */}
            <motion.div
              aria-hidden
              className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: spotlight }}
            />
            {/* Mockup */}
            <motion.div
              className="absolute inset-0 grid place-items-center px-10 pt-10 pb-4"
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-full max-w-[55%]">
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
            {/* Year + n badge */}
            <span className="absolute top-5 left-5 mono opacity-70">
              {p.n} · {p.year}
            </span>
            <span className="absolute top-5 right-5">
              <StatusPill status={p.status} />
            </span>
          </div>

          {/* Footer info */}
          <div className="relative px-6 md:px-7 pb-6 md:pb-7 pt-2">
            <p className="mono opacity-70 mb-2">{p.client}</p>
            <h3 className="display text-3xl md:text-4xl mb-2 leading-[0.98]">
              {p.name}
            </h3>
            <p className="display italic text-base md:text-lg opacity-90 mb-5 max-w-md">
              {p.tagline}
            </p>

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

              {/* Reveal pill on hover */}
              <motion.span
                initial={{ x: 8, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="absolute bottom-6 right-6 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: p.hero.accent, color: p.hero.bg === "#FBF7F0" ? "#2B1B3D" : "#2B1B3D" }}
              >
                Open case
                <ArrowUpRight className="size-3" />
              </motion.span>
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((p, i) => (
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
