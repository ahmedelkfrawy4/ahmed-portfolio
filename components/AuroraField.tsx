"use client";

import { motion } from "motion/react";

/**
 * AuroraField — a slow, low-opacity drift of blurred color blobs. Built to sit
 * ONLY behind the always-dark color-blocked sections (plum Numbers, Footer),
 * where a moving background can't fight the light theme. Dependency-free (no
 * WebGL); reduced-motion users get a still field via the global MotionConfig.
 */

const blobs = [
  { color: "#F5B841", size: 460, x: "8%", y: "12%", dx: 40, dy: -30, dur: 18 },
  { color: "#FFD6C4", size: 380, x: "62%", y: "4%", dx: -50, dy: 40, dur: 22 },
  { color: "#D4FF3A", size: 320, x: "78%", y: "58%", dx: 30, dy: -40, dur: 20 },
  { color: "#F5B841", size: 300, x: "34%", y: "66%", dx: -35, dy: -25, dur: 24 },
];

export default function AuroraField({
  opacity = 0.16,
}: {
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity }}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 68%)`,
            filter: "blur(48px)",
          }}
          animate={{ x: [0, b.dx, 0], y: [0, b.dy, 0], scale: [1, 1.12, 1] }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.4,
          }}
        />
      ))}
    </div>
  );
}
