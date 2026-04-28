"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Artifact = {
  label: string;
  caption?: string;
  image: string;
  aspect?: string;
};

export default function ArtifactsBlock({
  artifacts,
  accent,
}: {
  artifacts: Artifact[];
  accent: string;
}) {
  return (
    <div className="space-y-10 md:space-y-14">
      {artifacts.map((a, i) => (
        <motion.figure
          key={a.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-2xl border border-[var(--color-border)]"
          style={{ backgroundColor: `${accent}10` }}
        >
          {/* Top accent stripe */}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-0 h-1.5 z-10"
            style={{ backgroundColor: accent }}
          />
          <div className="px-5 md:px-7 pt-7 md:pt-8 pb-5">
            <p className="mono uppercase text-[10px] tracking-[0.22em] text-[var(--color-fg-muted)] mb-2">
              Artifact · 0{i + 1}
            </p>
            <p className="display text-lg md:text-xl text-[var(--color-fg)] leading-tight">
              {a.label}
            </p>
            {a.caption && (
              <p className="text-sm md:text-base text-[var(--color-fg-muted)] mt-2 max-w-2xl leading-relaxed">
                {a.caption}
              </p>
            )}
          </div>
          <div
            className="relative w-full bg-[var(--color-bg)]"
            style={{ aspectRatio: a.aspect ?? "16 / 9" }}
          >
            <Image
              src={a.image}
              alt={a.label}
              fill
              sizes="(min-width: 1100px) 1040px, 100vw"
              className="object-contain"
            />
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
