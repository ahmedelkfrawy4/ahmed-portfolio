"use client";

import { motion } from "motion/react";

export default function OverviewBlock({
  lines,
  accent,
}: {
  lines: string[];
  accent: string;
}) {
  if (!lines.length) return null;
  const [lead, ...rest] = lines;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-[var(--color-border)]"
      style={{ backgroundColor: `${accent}10` }}
    >
      {/* Top accent stripe */}
      <span
        aria-hidden
        className="absolute left-0 right-0 top-0 h-1.5"
        style={{ backgroundColor: accent }}
      />
      {/* Floating accent dot in corner */}
      <span
        aria-hidden
        className="absolute bottom-5 right-6 h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: accent }}
      />
      <div className="relative px-6 md:px-10 py-8 md:py-12">
        <p className="mono uppercase text-[10px] tracking-[0.22em] text-[var(--color-fg-muted)] mb-5">
          Overview
        </p>
        {/* Lead sentence — bigger pull-quote */}
        <p className="display text-2xl md:text-[34px] leading-[1.22] text-[var(--color-fg)] mb-6">
          {lead}
        </p>
        {/* Rest of overview */}
        {rest.length > 0 && (
          <div className="space-y-3 md:space-y-4 max-w-[680px]">
            {rest.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]"
              >
                {line}
              </motion.p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
