"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stations = [
  {
    year: "2020",
    where: "ITI Alexandria",
    role: "UI/UX Design Programme",
    outcomes: [
      "Intensive UI/UX training",
      "Research → UI pipeline",
      "Portfolio foundations",
    ],
    tag: "education",
    bg: "#FFD6C4",
  },
  {
    year: "2021 – 2022",
    where: "Sectors",
    role: "UI/UX Designer · Cairo",
    outcomes: [
      "Websites + mobile apps",
      "Online teaching platform launch",
      "Design × dev collaboration",
    ],
    tag: "edtech",
    bg: "#D4FF3A",
  },
  {
    year: "2022 – 2023",
    where: "Magdi Yacoub Heart Foundation",
    role: "UI/UX Designer · Aswan",
    outcomes: [
      "Complaint management redesign",
      "OVR system",
      "Patient-support mobile interface",
    ],
    tag: "healthcare",
    bg: "#FBF7F0",
  },
  {
    year: "2023 – now",
    where: "Freelance",
    role: "UI/UX Designer · Alexandria",
    outcomes: [
      "Healthcare · tourism · edu · fashion",
      "UI/UX audits",
      "User testing on real products",
    ],
    tag: "independent",
    bg: "#F5B841",
  },
  {
    year: "2024 – now",
    where: "MTN",
    role: "UI/UX Designer · Cairo",
    outcomes: [
      "+30% sales lift",
      "94% user satisfaction",
      "Unified design system",
    ],
    tag: "training & self-improvement",
    bg: "#2B1B3D",
    invert: true,
  },
  {
    year: "Aug – Dec 2025",
    where: "Brandi",
    role: "UX/UI Designer · Baghdad (part-time)",
    outcomes: [
      "Mobile e-commerce app",
      "Stakeholder interviews",
      "Competitor analysis",
    ],
    tag: "e-commerce",
    bg: "#FFD6C4",
  },
  {
    year: "Feb 2025 – now",
    where: "Roma MPH",
    role: "UX/UI Designer · Cairo",
    outcomes: [
      "E-learning, e-commerce, fintech",
      "Full cycle: research → UI",
      "PM + dev partnership",
    ],
    tag: "multi-sector",
    bg: "#D4FF3A",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const calc = () => {
      const el = trackRef.current;
      if (!el) return;
      const distance = Math.max(0, el.scrollWidth - window.innerWidth);
      setMaxTranslate(distance);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 0.9], [0, -maxTranslate]);

  return (
    <section
      id="experience"
      ref={ref}
      className="experience-bg relative border-t border-[var(--color-border)]"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8 pt-28 md:pt-32">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="mono text-[var(--color-fg-muted)] mb-3">
                experience · the train line
              </p>
              <h2 className="display text-5xl md:text-7xl">
                Seven <span className="italic">stations</span>, one designer.
              </h2>
            </div>
            <p className="mono text-[var(--color-fg-muted)]">
              keep scrolling →
            </p>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-10 flex items-center gap-6 md:gap-8"
        >
          {/* Leading spacer that matches the title's left start position */}
          <div className="shrink-0 w-[max(20px,calc((100vw-1400px)/2+20px))] md:w-[max(32px,calc((100vw-1400px)/2+32px))]" />
          {stations.map((s, i) => (
            <div key={s.where} className="flex items-center gap-6 md:gap-8">
              {/* Card */}
              <motion.article
                whileHover={{ y: -6 }}
                className="relative flex h-[360px] w-[300px] md:w-[360px] shrink-0 flex-col justify-between rounded-[28px] border border-[var(--color-border)] p-6 md:p-7"
                style={{
                  backgroundColor: s.bg,
                  color: s.invert ? "#FBF7F0" : "#2B1B3D",
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="mono opacity-70">{s.tag}</span>
                  <span className="mono opacity-70">
                    stop {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="mono mb-2 opacity-80">{s.year}</p>
                  <h3 className="display text-3xl md:text-4xl leading-[0.95] mb-1">
                    {s.where}
                  </h3>
                  <p className="text-sm opacity-80">{s.role}</p>
                </div>
                <ul className="space-y-1.5 text-sm">
                  {s.outcomes.map((o) => (
                    <li key={o} className="flex gap-2">
                      <span className="opacity-60">→</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>

              {/* Track between cards */}
              {i < stations.length - 1 && (
                <div className="flex items-center">
                  <div className="h-0.5 w-16 md:w-24 bg-[var(--color-fg)]/25 rounded-full" />
                  <div className="h-3 w-3 rounded-full bg-[var(--color-fg)]" />
                  <div className="h-0.5 w-16 md:w-24 bg-[var(--color-fg)]/25 rounded-full" />
                </div>
              )}
            </div>
          ))}
          <div className="w-[20vw] shrink-0" />
        </motion.div>

        {/* Progress bar */}
        <div className="mt-auto px-5 md:px-8 pb-10">
          <div className="mx-auto max-w-[1400px]">
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-[var(--color-fg)]/15">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                className="absolute inset-0 bg-[var(--color-acid)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
