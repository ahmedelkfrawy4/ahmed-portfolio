"use client";

import { motion } from "motion/react";
import {
  Users,
  Search,
  Network,
  PencilRuler,
  Layers,
  Boxes,
  RefreshCw,
  FileCheck,
  Accessibility,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

function iconForStep(text: string): LucideIcon {
  const t = text.toLowerCase();
  if (/hand-?off|hand off|spec|deliver|documentation|maintenance|guidelines/.test(t))
    return FileCheck;
  if (/launch|ship/.test(t)) return Rocket;
  if (/accessibility|a11y/.test(t)) return Accessibility;
  if (/iterat|test|review|usability|sprint/.test(t)) return RefreshCw;
  if (/design system|tokens|components|library/.test(t)) return Boxes;
  if (/high-fidelity|hi-fi|ui design|high fidelity/.test(t)) return Layers;
  if (/wireframe|sketch|low-fi|low fidelity/.test(t)) return PencilRuler;
  if (/information architecture|architecture|flow|journey/.test(t)) return Network;
  if (/competitor|audit|research|interview|persona/.test(t)) return Search;
  if (/stakeholder|workshop|user|patient|customer|client|team|map every/.test(t))
    return Users;
  return Sparkles;
}

export default function ProcessTimeline({
  steps,
  accent,
}: {
  steps: string[];
  accent: string;
}) {
  return (
    <div className="relative">
      {steps.map((step, i) => {
        const Icon = iconForStep(step);
        const isLast = i === steps.length - 1;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* The branded card */}
            <div
              className="relative overflow-hidden rounded-2xl border border-[var(--color-border)]"
              style={{ backgroundColor: `${accent}14` }}
            >
              {/* Top accent stripe — signature of the page */}
              <span
                aria-hidden
                className="absolute left-0 right-0 top-0 h-1.5"
                style={{ backgroundColor: accent }}
              />
              <div className="relative px-5 md:px-7 py-5 md:py-7 grid grid-cols-[auto_1fr] gap-5 md:gap-6 items-center">
                <div
                  className="relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl shrink-0"
                  style={{ backgroundColor: `${accent}33` }}
                >
                  <Icon
                    className="size-6 text-[var(--color-fg)]"
                    strokeWidth={1.6}
                  />
                </div>
                <div>
                  <p className="mono uppercase text-[10px] tracking-[0.22em] text-[var(--color-fg-muted)] mb-2">
                    Process · 0{i + 1}
                  </p>
                  <p className="display text-lg md:text-[22px] leading-[1.3] text-[var(--color-fg)]">
                    {step}
                  </p>
                </div>
              </div>
            </div>
            {/* Connector tendon to the next card — preserves the "flow" feel */}
            {!isLast && (
              <div className="flex pl-[34px] md:pl-[42px] my-2.5">
                <span
                  aria-hidden
                  className="block w-[2px] h-6 rounded-full"
                  style={{ backgroundColor: accent, opacity: 0.55 }}
                />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
