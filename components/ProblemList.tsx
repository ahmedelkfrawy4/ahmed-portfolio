"use client";

import { motion } from "motion/react";
import {
  AlertTriangle,
  Unplug,
  Brain,
  FilePen,
  Shuffle,
  CircleOff,
  HeartCrack,
  ShieldAlert,
  MessageCircleQuestion,
  type LucideIcon,
} from "lucide-react";

function iconForProblem(text: string): LucideIcon {
  const t = text.toLowerCase();
  if (/fragmented|disconnect|broken|scatter|inconsistent|mismatched/.test(t))
    return Unplug;
  if (/abandoned|drop|lost|misalign/.test(t)) return Shuffle;
  if (/confusing|complicated|complex|cognitive|overwhelm/.test(t)) return Brain;
  if (/jargon|unclear|opaque|hidden/.test(t)) return MessageCircleQuestion;
  if (/paperwork|manual|drowning|buried/.test(t)) return FilePen;
  if (/no [a-z]+ system|no shared|no clear|no [a-z]+ flow|no patient/.test(t))
    return CircleOff;
  if (/crisis|stress|urgent|critical/.test(t)) return HeartCrack;
  if (/unusable|failing|fail|broken/.test(t)) return ShieldAlert;
  return AlertTriangle;
}

export default function ProblemList({
  items,
  accent,
}: {
  items: string[];
  accent: string;
}) {
  return (
    <div className="space-y-4 md:space-y-5">
      {items.map((item, i) => {
        const Icon = iconForProblem(item);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-2xl border border-[var(--color-border)]"
            style={{ backgroundColor: `${accent}14` }}
          >
            {/* Right accent bar (mirror of Solution) */}
            <span
              aria-hidden
              className="absolute right-0 top-0 bottom-0 w-1.5"
              style={{ backgroundColor: accent }}
            />
            <div className="relative pl-5 md:pl-7 pr-6 md:pr-9 py-6 md:py-8 grid grid-cols-[auto_1fr] gap-5 md:gap-7 items-center">
              <div
                className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl shrink-0"
                style={{ backgroundColor: `${accent}33` }}
              >
                <Icon
                  className="size-6 md:size-7 text-[var(--color-fg)]"
                  strokeWidth={1.6}
                />
              </div>
              <div>
                <p className="mono uppercase text-[10px] tracking-[0.22em] text-[var(--color-fg-muted)] mb-3">
                  Problem · 0{i + 1}
                </p>
                <p className="display text-xl md:text-[26px] leading-[1.3] text-[var(--color-fg)]">
                  {item}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
