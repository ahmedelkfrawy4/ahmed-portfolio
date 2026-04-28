"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

type LiveLink = { label: string; href: string };

export default function OutcomeBlock({
  outcomes,
  liveLinks,
  accent,
}: {
  outcomes: string[];
  liveLinks?: LiveLink[];
  accent: string;
}) {
  const cols =
    outcomes.length <= 2
      ? "md:grid-cols-2"
      : outcomes.length === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-2 lg:grid-cols-4";
  return (
    <div className="space-y-8 md:space-y-10">
      {/* Outcome stat tiles */}
      <div className={`grid grid-cols-1 ${cols} gap-4 md:gap-5`}>
        {outcomes.map((o, i) => (
          <motion.div
            key={o}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-6 md:p-7 min-h-[120px] flex items-end"
            style={{ backgroundColor: `${accent}14` }}
          >
            {/* Top accent stripe */}
            <span
              aria-hidden
              className="absolute left-0 right-0 top-0 h-1.5"
              style={{ backgroundColor: accent }}
            />
            <div>
              <p className="mono uppercase text-[10px] tracking-[0.22em] text-[var(--color-fg-muted)] mb-3">
                Outcome · 0{i + 1}
              </p>
              <p className="display text-xl md:text-2xl leading-[1.15] text-[var(--color-fg)]">
                {o}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live links */}
      {liveLinks && liveLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="mono text-[var(--color-fg-muted)] mb-3 text-xs uppercase tracking-[0.2em]">
            See it live
          </p>
          <div className="flex flex-wrap gap-3">
            {liveLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-[var(--color-fg)] hover:text-[var(--color-bg)] transition-colors"
                style={{ borderColor: accent }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = accent)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <ExternalLink className="size-3.5" />
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
