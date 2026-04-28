"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowUpRight, ExternalLink, Lock, Clock } from "lucide-react";
import { useEffect, useRef } from "react";

type ProjectLink = {
  label: string;
  href: string | null;
  status?: "live" | "internal" | "in-progress";
};

type Project = {
  n: string;
  sector: string;
  name: string;
  pitch: string;
  problem: string;
  solution: string;
  metrics: string[];
  links?: ProjectLink[];
  bg: string;
  fg: string;
  accent: string;
  year: string;
};

const projects: Project[] = [
  {
    n: "01",
    sector: "Training · Self-Improvement · Fintech",
    name: "MTN",
    pitch: "Six platforms that help people grow.",
    problem:
      "A training & self-improvement company with five public platforms and an internal payment tool — all needing to feel like one brand while turning curiosity into committed learners.",
    solution:
      "Led design end-to-end: research, flows, wireframes, prototypes, a unified design system, and usability testing every sprint.",
    metrics: ["+30% sales", "94% satisfaction", "6 products live"],
    links: [
      { label: "fittraclinic.com", href: "https://fittraclinic.com/ar" },
      { label: "fittrastream.com", href: "https://fittrastream.com/en" },
      { label: "fittratraining.com", href: "https://www.fittratraining.com/ar" },
      { label: "mtninstitute.net", href: "https://mtninstitute.net/ar" },
      { label: "mtnpayment.com", href: "https://www.mtnpayment.com/en" },
      { label: "internal payment tool", href: null },
    ],
    bg: "#2B1B3D",
    fg: "#FBF7F0",
    accent: "#F5B841",
    year: "2024 – now",
  },
  {
    n: "02",
    sector: "E-commerce",
    name: "Brandi",
    pitch: "Baghdad to your basket.",
    problem:
      "Fragmented shopping experience — carts abandoned, stakeholders misaligned, no clear research loop.",
    solution:
      "Full UX process for a mobile-first storefront: stakeholder interviews, competitor analysis, personas, and iteration with the build team.",
    metrics: ["Full UX cycle", "Mobile-first", "Live on Play Store"],
    links: [
      {
        label: "Google Play · com.brandiiq.app",
        href: "https://play.google.com/store/apps/details?id=com.brandiiq.app",
      },
    ],
    bg: "#F5B841",
    fg: "#2B1B3D",
    accent: "#2B1B3D",
    year: "2025",
  },
  {
    n: "03",
    sector: "EdTech",
    name: "Injaz (with Sectors)",
    pitch: "Where students and tutors finally met on the same page.",
    problem:
      "Launching an online teaching platform from scratch across web and mobile — one visual language, two surfaces.",
    solution:
      "Contributed to the product launch with flows, UI, and responsive breakpoints. Kept the same language across surfaces.",
    metrics: ["0→1 launch", "Web + mobile", "Responsive system"],
    links: [{ label: "injazedu.co", href: "https://injazedu.co/" }],
    bg: "#D4FF3A",
    fg: "#2B1B3D",
    accent: "#2B1B3D",
    year: "2021 – 2022",
  },
  {
    n: "04",
    sector: "Healthcare",
    name: "Magdi Yacoub Heart Foundation",
    pitch: "Redesigning care — one complaint at a time.",
    problem:
      "Patients in crisis navigating a broken complaint management system. Staff buried in paperwork.",
    solution:
      "Redesigned the complaint management system, OVR system, and patient-support mobile interface. Calm, accessible, human.",
    metrics: ["3 products shipped", "Patient-first flows", "Pro-bono impact"],
    links: [
      { label: "complaint management", href: null },
      { label: "OVR system", href: null },
      { label: "patient-support app", href: null },
    ],
    bg: "#FFD6C4",
    fg: "#2B1B3D",
    accent: "#2B1B3D",
    year: "2022 – 2023",
  },
  {
    n: "05",
    sector: "Multi-sector",
    name: "Roma MPH",
    pitch: "Three sectors, one design language.",
    problem:
      "Multi-sector platforms — each with its own audience, each needing to feel coherent.",
    solution:
      "Executed the full design cycle from research to UI delivery across e-learning, e-commerce, and finance products. Designed Fittra Center — a global dashboard to control all Fittra platforms — and currently shipping the MTN Wallet feature.",
    metrics: ["3 sectors", "Full cycle", "Global dashboard"],
    links: [
      {
        label: "Fittra Center · global dashboard",
        href: null,
        status: "internal",
      },
      {
        label: "MTN Wallet · payment feature",
        href: null,
        status: "in-progress",
      },
    ],
    bg: "#FBF7F0",
    fg: "#2B1B3D",
    accent: "#F5B841",
    year: "2025 – now",
  },
  {
    n: "06",
    sector: "Freelance",
    name: "The Freelance Playground",
    pitch: "Healthcare, tourism, education, fashion — on tap.",
    problem: "Clients who need both audit and craft, not just pretty screens.",
    solution:
      "UI/UX audits, user testing, and product design across four industries since 2023. Currently designing a travel & tourism app from scratch.",
    metrics: ["4 industries", "Audits + craft", "Remote-ready"],
    links: [
      {
        label: "Baba Guide · travel & tourism app",
        href: null,
        status: "in-progress",
      },
    ],
    bg: "#2B1B3D",
    fg: "#FBF7F0",
    accent: "#D4FF3A",
    year: "2023 – now",
  },
];

function TiltCard({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-80, 80], [6, -6]);
  const rotY = useTransform(x, [-80, 80], [-6, 6]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const metricTextColor =
    p.bg === "#FBF7F0"
      ? "#2B1B3D"
      : p.accent === "#2B1B3D"
      ? "#FBF7F0"
      : "#2B1B3D";

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1200,
        backgroundColor: p.bg,
        color: p.fg,
      }}
      className="relative flex h-[580px] md:h-[620px] w-[320px] md:w-[440px] shrink-0 flex-col justify-between rounded-[32px] p-6 md:p-8 snap-center border border-[var(--color-border)]"
    >
      <div className="flex items-start justify-between">
        <span className="mono opacity-70">{p.sector}</span>
        <span className="mono opacity-70">{p.n} / 06</span>
      </div>

      <div>
        <h3 className="display text-[2.25rem] md:text-5xl mb-2 leading-[0.95]">
          {p.name}
        </h3>
        <p className="display italic text-xl md:text-2xl leading-tight opacity-90">
          {p.pitch}
        </p>
      </div>

      <div className="space-y-2 text-[13px] md:text-sm opacity-90">
        <p>
          <span className="mono opacity-70">Problem — </span>
          {p.problem}
        </p>
        <p>
          <span className="mono opacity-70">Approach — </span>
          {p.solution}
        </p>
      </div>

      {/* Links (when present) — public, internal, or in-progress */}
      {p.links && p.links.length > 0 && (() => {
        const statusOf = (l: ProjectLink) =>
          l.status ?? (l.href ? "live" : "internal");
        const live = p.links.filter((l) => statusOf(l) === "live").length;
        const internal = p.links.filter(
          (l) => statusOf(l) === "internal",
        ).length;
        const wip = p.links.filter(
          (l) => statusOf(l) === "in-progress",
        ).length;
        const parts: string[] = [];
        if (live) parts.push(`live · ${live}`);
        if (internal) parts.push(`${live ? "+" : ""}${internal} internal`);
        if (wip) parts.push(`${live || internal ? "+" : ""}${wip} in progress`);
        return (
          <div className="space-y-1.5">
            <p className="mono opacity-70">{parts.join(" · ")}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.links.map((l) => {
                const status = statusOf(l);
                if (status === "live" && l.href) {
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] transition-colors hover:opacity-80"
                      style={{ borderColor: p.accent, color: p.fg }}
                    >
                      <ExternalLink className="size-3" />
                      {l.label}
                    </a>
                  );
                }
                if (status === "in-progress") {
                  return (
                    <span
                      key={l.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-2.5 py-1 text-[11px]"
                      style={{ borderColor: p.accent, color: p.fg }}
                      title="In progress"
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span
                          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                          style={{ backgroundColor: p.accent }}
                        />
                        <span
                          className="relative inline-flex h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: p.accent }}
                        />
                      </span>
                      <Clock className="size-3 opacity-80" />
                      {l.label}
                    </span>
                  );
                }
                return (
                  <span
                    key={l.label}
                    className="inline-flex items-center gap-1 rounded-full border border-dashed px-2.5 py-1 text-[11px] opacity-70"
                    style={{ borderColor: p.accent, color: p.fg }}
                    title="Internal — not public"
                  >
                    <Lock className="size-3" />
                    {l.label}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })()}

      <div className="flex flex-wrap gap-1.5">
        {p.metrics.map((m) => (
          <span
            key={m}
            className="rounded-full px-2.5 py-1 text-[11px]"
            style={{
              backgroundColor: p.accent,
              color: metricTextColor,
            }}
          >
            {m}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="mono opacity-70">{p.year}</span>
        <span
          className="group inline-flex items-center gap-1.5 text-sm"
          data-cursor="hover"
        >
          {p.links?.some((l) => l.href)
            ? "Open the live work"
            : p.links?.some((l) => l.status === "in-progress")
            ? "Shipping soon"
            : p.links?.length
            ? "Internal — available on request"
            : "Case file"}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.article>
  );
}

export default function SelectedWork() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const movedRef = useRef(0);
  const velocitySamplesRef = useRef<{ x: number; t: number }[]>([]);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cancelMomentum = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    velocityRef.current = 0;
  };

  const startMomentum = () => {
    const el = scrollerRef.current;
    if (!el) return;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = now - prev;
      prev = now;
      el.scrollLeft += velocityRef.current * dt;
      // Decay ~6% per 16ms frame for a graceful glide
      velocityRef.current *= Math.pow(0.94, dt / 16);
      if (Math.abs(velocityRef.current) > 0.02) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        velocityRef.current = 0;
        rafRef.current = null;
        // Re-enable snap so it eases to the nearest card
        el.style.scrollSnapType = "";
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const stopDrag = () => {
    const el = scrollerRef.current;
    if (!el) return;
    if (!isDownRef.current) return;
    isDownRef.current = false;
    el.classList.remove("cursor-grabbing");
    el.classList.add("cursor-grab");
    el.style.userSelect = "";
    // Compute release velocity from the last few moves
    const samples = velocitySamplesRef.current;
    if (samples.length >= 2) {
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = last.t - first.t;
      if (dt > 0) {
        // Negative because scrollLeft moves opposite to drag direction
        velocityRef.current = -(last.x - first.x) / dt;
      }
    }
    velocitySamplesRef.current = [];
    // After a real drag, swallow the next click so chips don't fire
    if (movedRef.current > 5) {
      const swallow = (ev: MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();
        el.removeEventListener("click", swallow, true);
      };
      el.addEventListener("click", swallow, true);
    }
    movedRef.current = 0;
    // Glide if there's meaningful velocity, otherwise snap immediately
    if (Math.abs(velocityRef.current) > 0.05) {
      startMomentum();
    } else {
      el.style.scrollSnapType = "";
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    cancelMomentum(); // grabbing while spinning stops the glide
    isDownRef.current = true;
    movedRef.current = 0;
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
    velocitySamplesRef.current = [{ x: e.pageX, t: performance.now() }];
    el.classList.add("cursor-grabbing");
    el.classList.remove("cursor-grab");
    el.style.scrollSnapType = "none";
    el.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDownRef.current) return;
    const el = scrollerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - startXRef.current;
    movedRef.current = Math.max(movedRef.current, Math.abs(walk));
    el.scrollLeft = startScrollLeftRef.current - walk;
    // Track recent positions for velocity calculation
    const samples = velocitySamplesRef.current;
    samples.push({ x: e.pageX, t: performance.now() });
    if (samples.length > 6) samples.shift();
  };

  return (
    <section
      id="work"
      className="relative overflow-hidden py-24 md:py-32 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="mono text-[var(--color-fg-muted)] mb-3">
              case files · 01 – 06 · <span className="text-[var(--color-plum)]">8 live links</span>
            </p>
            <h2 className="display text-5xl md:text-7xl">
              Work I&rsquo;m <span className="italic">proud</span> of.
            </h2>
          </div>
          <p className="max-w-sm text-[var(--color-fg-muted)]">
            Six domains. Eight shipped products. Click any chip to open the
            live thing.
          </p>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="no-scrollbar flex gap-5 md:gap-7 overflow-x-auto px-5 md:px-8 snap-x snap-mandatory pb-6 cursor-grab select-none"
        style={{ scrollPaddingLeft: "20px" }}
      >
        <div className="shrink-0 w-0 md:w-[calc((100vw-1400px)/2)]" />
        {projects.map((p) => (
          <TiltCard key={p.n} p={p} />
        ))}
        <div className="shrink-0 w-5 md:w-10" />
      </div>

      <p className="mx-auto mt-6 max-w-[1400px] px-5 md:px-8 mono text-[var(--color-fg-muted)]">
        ← drag or scroll →
      </p>
    </section>
  );
}
