"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * ScrollReveal — reactbits.dev effect rebuilt on the site's Motion stack.
 * A headline is split into words; each word rises + un-blurs as the section
 * scrolls through the viewport. Theme-neutral (only opacity/blur/transform),
 * so it reads the same in light and dark and respects reduced-motion via the
 * app-wide <MotionConfig reducedMotion="user">.
 *
 * Pass plain text via `text`, or rich children (to keep an <em>/italic word)
 * via `children` — children are revealed as one group with the same motion.
 */

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Floor opacity at 0.85 so the resting (pre-scroll) text still passes WCAG
  // contrast; the reveal reads through the blur + slide instead of a fade.
  const opacity = useTransform(progress, range, [0.85, 1]);
  const y = useTransform(progress, range, [22, 0]);
  const blur = useTransform(progress, range, [10, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.span
      style={{ opacity, y, filter, display: "inline-block", willChange: "opacity, transform, filter" }}
      className="mr-[0.25em]"
    >
      {children}
    </motion.span>
  );
}

export default function ScrollReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // A word wrapped in *asterisks* renders italic (keeps display accents).
        const italic = word.startsWith("*") && word.endsWith("*");
        const clean = italic ? word.slice(1, -1) : word;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {italic ? <span className="italic">{clean}</span> : clean}
          </Word>
        );
      })}
    </span>
  );
}
