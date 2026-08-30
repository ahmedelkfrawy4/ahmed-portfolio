"use client";

import { motion } from "motion/react";
import { Linkedin, Quote } from "lucide-react";
import CountUp from "./CountUp";
import AuroraField from "./AuroraField";
import ShinyText from "./ShinyText";

const stats = [
  { value: "+30%", label: "sales lift · MTN" },
  { value: "94%", label: "user satisfaction" },
  { value: "5+", label: "years designing" },
  { value: "6", label: "teams shipped with" },
  { value: "4", label: "sectors covered" },
  { value: "7", label: "stations on the train" },
];

type Praise = {
  name: string;
  role: string;
  relation: string;
  initials: string;
  href: string;
  accent: string;
  quote: string;
};

// Real LinkedIn recommendations — name links to each person's profile.
const praise: Praise[] = [
  {
    name: "Amr Ayad",
    role: "Software Team Leader",
    relation: "managed Ahmed directly",
    initials: "AA",
    href: "https://www.linkedin.com/in/amrahmedmohmed/",
    accent: "#F5B841",
    quote:
      "As Ahmed's direct manager, I was consistently impressed by his professionalism, creative problem-solving, and eagerness to improve. He brings fresh ideas and a positive, solutions-focused mindset to every challenge — a rare balance of technical skill, initiative, and team spirit. Highly recommended!",
  },
  {
    name: "Ahmed Esmail",
    role: "Software Engineer · Frontend",
    relation: "same team · 2025",
    initials: "AE",
    href: "https://www.linkedin.com/in/ahmed-esmail-a28152239/",
    accent: "#FFD6C4",
    quote:
      "One of the most talented UI/UX designers I've collaborated with. He translates complex requirements into clean, intuitive, visually stunning designs, with a deep understanding of user behavior. Detail-oriented and open to feedback — if you want someone who can elevate your product through smart, user-focused design, I highly recommend him.",
  },
  {
    name: "Youssef Alaa Omar",
    role: "Security Engineer @ Roma MPH",
    relation: "same team",
    initials: "YO",
    href: "https://www.linkedin.com/in/youssef-alaa-omar/",
    accent: "#D4FF3A",
    quote:
      "Truly a talented UI/UX designer. He understands user needs and translates them into intuitive, appealing designs that balance usability and aesthetics. Collaborative, open to feedback, and full of creative solutions that add real value.",
  },
  {
    name: "Mazin Islam",
    role: "Frontend Engineer @ Robusta Studio",
    relation: "same team · 2025",
    initials: "MI",
    href: "https://www.linkedin.com/in/mazin-islam-88658b22b/",
    accent: "#F5B841",
    quote:
      "I'm consistently impressed by Ahmed's professionalism and innovative thinking. His dedication to continuous learning shines through in his work — it's inspiring to collaborate with someone so passionate and skilled.",
  },
  {
    name: "Hesham Gamal",
    role: "Senior Frontend Developer @ BG",
    relation: "same team · 2022",
    initials: "HG",
    href: "https://www.linkedin.com/in/shypoup/",
    accent: "#FFD6C4",
    quote:
      "Very talented and a genuinely hard worker. He's clever about communicating with developers and shaping his work so it's easy to build.",
  },
  {
    name: "Muhammad ElZedy",
    role: "Senior DevOps Engineer @ VOIS",
    relation: "cross-team collaborator",
    initials: "ME",
    href: "https://www.linkedin.com/in/mohamed-el-zedy/",
    accent: "#D4FF3A",
    quote:
      "A talented UX/UI designer with a great eye for detail and strong user empathy. He combines creativity with practical thinking, always delivering clean, intuitive, impactful designs. A pleasure to collaborate with — highly recommended.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="praise"
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-plum)] text-[var(--color-cream)]"
    >
      {/* Big numbers grid */}
      <div className="relative px-5 md:px-8 pt-24 md:pt-32 pb-16 md:pb-20">
        <AuroraField />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <p className="mono mb-4">
            <ShinyText base="#F5B841">the numbers · proof</ShinyText>
          </p>
          <h2 className="display text-5xl md:text-7xl mb-14 max-w-3xl">
            Real outcomes, not pretty <span className="italic">screenshots</span>.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--color-cream)]/10 border border-[var(--color-cream)]/10 rounded-[28px] overflow-hidden">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-[var(--color-plum)] p-8 md:p-12 hover:bg-[#3A2554] transition-colors"
              >
                <div className="display text-6xl md:text-8xl mb-3 text-[var(--color-ochre)] tabular-nums">
                  <CountUp value={s.value} />
                </div>
                <div className="mono text-[var(--color-cream)]/70">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials wall — real LinkedIn recommendations */}
      <div className="border-t border-[var(--color-cream)]/10 px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="mono text-[var(--color-ochre)] mb-4">
                the words · people I&rsquo;ve worked with
              </p>
              <h2 className="display text-5xl md:text-7xl max-w-3xl">
                What teammates <span className="italic">say</span>.
              </h2>
            </div>
            <p className="max-w-xs text-[var(--color-cream)]/70">
              Engineers, a manager, and cross-team partners on what it&rsquo;s
              like to build with me. Every name links to LinkedIn.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
            {praise.map((p, i) => (
              <motion.figure
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="break-inside-avoid mb-5 rounded-[24px] border border-[var(--color-cream)]/15 bg-[#3A2554]/50 p-6 md:p-7"
              >
                <Quote
                  className="size-6 mb-3"
                  style={{ color: p.accent }}
                  aria-hidden
                />
                <blockquote className="text-[15px] md:text-base leading-relaxed text-[var(--color-cream)]/90">
                  {p.quote}
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-[var(--color-cream)]/10 flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full display text-sm"
                    style={{ backgroundColor: p.accent, color: "#2B1B3D" }}
                    aria-hidden
                  >
                    {p.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="link-underline display text-lg leading-tight inline-flex items-center gap-1.5"
                    >
                      {p.name}
                      <Linkedin className="size-3.5 opacity-70" />
                    </a>
                    <span className="block text-xs text-[var(--color-cream)]/70 mt-0.5">
                      {p.role} · {p.relation}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
