"use client";

import { motion } from "motion/react";

type ShapeKey = "compass" | "plane" | "map" | "dome" | "castle";

const motifs: ReadonlyArray<{
  shape: ShapeKey;
  top: string;
  left: string;
  size: number;
  rotate: number;
  duration: number;
  delay: number;
}> = [
  { shape: "compass", top: "3%", left: "4%", size: 130, rotate: -8, duration: 22, delay: 0 },
  { shape: "plane", top: "12%", left: "86%", size: 110, rotate: 18, duration: 26, delay: 0.8 },
  { shape: "dome", top: "30%", left: "2%", size: 150, rotate: 0, duration: 27, delay: 0.4 },
  { shape: "map", top: "44%", left: "88%", size: 120, rotate: -4, duration: 24, delay: 1.6 },
  { shape: "castle", top: "60%", left: "5%", size: 150, rotate: -6, duration: 28, delay: 1.2 },
  { shape: "plane", top: "72%", left: "84%", size: 100, rotate: -22, duration: 25, delay: 0.2 },
  { shape: "compass", top: "85%", left: "8%", size: 110, rotate: 6, duration: 26, delay: 1.8 },
  { shape: "dome", top: "92%", left: "82%", size: 140, rotate: 0, duration: 28, delay: 0.6 },
];

export default function CaseMotifs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {motifs.map((m, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, rotate: m.rotate }}
          animate={{
            y: [0, -18, 0, 14, 0],
            rotate: [m.rotate, m.rotate + 3, m.rotate - 2, m.rotate + 1, m.rotate],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: m.top,
            left: m.left,
            width: m.size,
            height: m.size,
            color: "#F5B841",
            opacity: 0.28,
          }}
        >
          <Shape kind={m.shape} />
        </motion.div>
      ))}
    </div>
  );
}

function Shape({ kind }: { kind: ShapeKey }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (kind === "compass") {
    return (
      <svg viewBox="0 0 100 100" {...stroke}>
        <circle cx="50" cy="50" r="42" />
        <circle cx="50" cy="50" r="32" />
        <path d="M50 12 L50 22 M50 78 L50 88 M12 50 L22 50 M78 50 L88 50" />
        <path d="M50 25 L57 50 L50 45 L43 50 Z" fill="currentColor" />
        <path d="M50 75 L43 50 L50 55 L57 50 Z" />
        <circle cx="50" cy="50" r="2.5" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "plane") {
    return (
      <svg viewBox="0 0 100 100" {...stroke}>
        <path d="M50 10 L53 40 L90 55 L90 62 L53 55 L53 78 L62 84 L62 90 L50 87 L38 90 L38 84 L47 78 L47 55 L10 62 L10 55 L47 40 Z" />
      </svg>
    );
  }
  if (kind === "map") {
    return (
      <svg viewBox="0 0 100 100" {...stroke}>
        <path d="M10 24 L36 18 L64 26 L90 20 L90 76 L64 82 L36 74 L10 80 Z" />
        <path d="M36 18 L36 74 M64 26 L64 82" />
        <circle cx="50" cy="48" r="4" fill="currentColor" />
        <path d="M50 52 L50 64" />
      </svg>
    );
  }
  if (kind === "dome") {
    return (
      <svg viewBox="0 0 100 100" {...stroke}>
        <path d="M50 8 L50 18" />
        <circle cx="50" cy="14" r="2" fill="currentColor" />
        <path d="M22 88 L22 50 Q22 26 50 26 Q78 26 78 50 L78 88 Z" />
        <path d="M40 88 L40 64 Q40 56 50 56 Q60 56 60 64 L60 88" />
        <path d="M30 50 L30 88 M70 50 L70 88" />
      </svg>
    );
  }
  // castle
  return (
    <svg viewBox="0 0 100 100" {...stroke}>
      <path d="M14 88 L14 44 L22 44 L22 36 L30 36 L30 44 L38 44 L38 36 L46 36 L46 44 L54 44 L54 36 L62 36 L62 44 L70 44 L70 36 L78 36 L78 44 L86 44 L86 88 Z" />
      <path d="M40 88 L40 66 Q40 60 50 60 Q60 60 60 66 L60 88" />
      <path d="M30 56 L30 76 M70 56 L70 76" />
    </svg>
  );
}
