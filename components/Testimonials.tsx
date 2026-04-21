"use client";

import { motion } from "motion/react";

const stats = [
  { value: "+30%", label: "sales lift · MTN" },
  { value: "94%", label: "user satisfaction" },
  { value: "3+", label: "years designing" },
  { value: "6", label: "teams shipped with" },
  { value: "4", label: "sectors covered" },
  { value: "7", label: "stations on the train" },
];

// Marquee words
const words = [
  "research", "wireframes", "user flows", "prototypes",
  "design systems", "usability testing", "responsive UI",
  "competitor audits", "persona mapping", "interaction design",
  "stakeholder interviews", "sprint planning", "visual design",
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-plum)] text-[var(--color-cream)]">
      {/* Big numbers grid */}
      <div className="px-5 md:px-8 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="mono text-[var(--color-ochre)] mb-4">
            the numbers · proof
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
                <div className="display text-6xl md:text-8xl mb-3 text-[var(--color-ochre)]">
                  {s.value}
                </div>
                <div className="mono text-[var(--color-cream)]/70">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-t border-[var(--color-cream)]/10 py-8 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex items-center gap-10 pr-10">
              {words.map((w, i) => (
                <span key={`${copy}-${w}`} className="flex items-center gap-10">
                  <span
                    className={`display text-5xl md:text-7xl ${
                      i % 2 === 0 ? "italic" : ""
                    }`}
                    style={{
                      color: i % 3 === 0 ? "#F5B841" : i % 3 === 1 ? "#FFD6C4" : "#D4FF3A",
                    }}
                  >
                    {w}
                  </span>
                  <span className="text-[var(--color-ochre)] display text-5xl md:text-7xl">
                    ✺
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
