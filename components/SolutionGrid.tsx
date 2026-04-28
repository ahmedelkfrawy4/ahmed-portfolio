"use client";

import { motion } from "motion/react";
import {
  Smartphone,
  LayoutDashboard,
  Layers,
  Boxes,
  Palette,
  PencilRuler,
  Network,
  Accessibility,
  RefreshCw,
  Type,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

function iconForSolution(text: string): LucideIcon {
  const t = text.toLowerCase();
  if (/dashboard|admin|panel|operator|ovr/.test(t)) return LayoutDashboard;
  if (/mobile|phone|app|tap target|on-the-go/.test(t)) return Smartphone;
  if (/design system|tokens|components|library|design language/.test(t))
    return Boxes;
  if (/typography|font|type|words|jargon/.test(t)) return Type;
  if (/accessibility|a11y|big target|essential|stripped|calm/.test(t))
    return Accessibility;
  if (/research|interview|persona|stakeholder/.test(t)) return Users;
  if (/wireframe|sketch|low-fi/.test(t)) return PencilRuler;
  if (/iterate|test|sprint|review|usability|cycle/.test(t)) return RefreshCw;
  if (/architecture|ia|journey|flow/.test(t)) return Network;
  if (/ui|hi-fi|high-fidelity|visual|brand|color|palette/.test(t)) return Palette;
  if (/parallel|shared|foundation|surfaces/.test(t)) return Layers;
  return Sparkles;
}

export default function SolutionGrid({
  items,
  accent,
}: {
  items: string[];
  accent: string;
}) {
  return (
    <div className="space-y-4 md:space-y-5">
      {items.map((item, i) => {
        const Icon = iconForSolution(item);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
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
            {/* Left accent bar */}
            <span
              aria-hidden
              className="absolute left-0 top-0 bottom-0 w-1.5"
              style={{ backgroundColor: accent }}
            />
            <div className="relative pl-6 md:pl-9 pr-5 md:pr-7 py-6 md:py-8 grid grid-cols-[1fr_auto] gap-5 md:gap-7 items-center">
              <div>
                <p className="mono uppercase text-[10px] tracking-[0.22em] text-[var(--color-fg-muted)] mb-3">
                  Solution · 0{i + 1}
                </p>
                <p className="display text-xl md:text-[26px] leading-[1.3] text-[var(--color-fg)]">
                  {item}
                </p>
              </div>
              <div
                className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl shrink-0"
                style={{ backgroundColor: `${accent}33` }}
              >
                <Icon
                  className="size-6 md:size-7 text-[var(--color-fg)]"
                  strokeWidth={1.6}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
