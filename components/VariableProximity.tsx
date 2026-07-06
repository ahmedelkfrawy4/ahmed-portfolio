"use client";

import { useEffect, useRef } from "react";

/**
 * VariableProximity — reactbits.dev effect, re-skinned for the Cairo Sunset
 * portfolio. Each letter interpolates its variable-font axes (Fraunces wght)
 * based on how close the cursor is, so the word "breathes" under the pointer.
 *
 * Theme-neutral: it only touches font weight, never color or background, so it
 * behaves identically in light and dark. Respects prefers-reduced-motion.
 */

type Props = {
  label: string;
  /** Font-variation-settings when the cursor is far away. */
  from?: string;
  /** Font-variation-settings when the cursor is right on a letter. */
  to?: string;
  /** Radius (px) of the cursor's influence. */
  radius?: number;
  /** Falloff curve for the influence. */
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
};

// Parse "'wght' 400" style strings into a {axis: value} map.
function parseSettings(str: string): Record<string, number> {
  return Object.fromEntries(
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const match = s.match(/'([^']+)'\s+([\d.]+)/);
        return match ? [match[1], parseFloat(match[2])] : null;
      })
      .filter(Boolean) as [string, number][],
  );
}

export default function VariableProximity({
  label,
  from = "'wght' 340",
  to = "'wght' 900",
  radius = 120,
  falloff = "gaussian",
  className = "",
}: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pointer = useRef({ x: -9999, y: -9999 });
  const active = useRef(false);
  const rafRef = useRef<number>(0);

  const fromSettings = parseSettings(from);
  const toSettings = parseSettings(to);
  const axes = Object.keys(fromSettings);

  useEffect(() => {
    // Skip the effect entirely for reduced-motion users.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const calcFalloff = (dist: number) => {
      const n = Math.min(Math.max(1 - dist / radius, 0), 1);
      if (falloff === "exponential") return n * n;
      if (falloff === "gaussian")
        return Math.exp(-((dist / (radius / 2)) ** 2) / 2);
      return n;
    };

    const tick = () => {
      const letters = letterRefs.current;
      for (const el of letters) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(pointer.current.x - cx, pointer.current.y - cy);
        const t = dist > radius ? 0 : calcFalloff(dist);

        const settings = axes
          .map((axis) => {
            const value =
              fromSettings[axis] + (toSettings[axis] - fromSettings[axis]) * t;
            return `'${axis}' ${value.toFixed(1)}`;
          })
          .join(", ");
        el.style.fontVariationSettings = settings;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius, falloff, from, to]);

  // Preserve spaces; render each character in its own span so we can address it.
  // Screen readers read the real word once (sr-only); the split letters are
  // decorative and hidden from the a11y tree.
  let idx = 0;
  return (
    <span ref={containerRef} className={className} style={{ display: "inline" }}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {label.split("").map((char, i) => {
          if (char === " ") return <span key={i}>&nbsp;</span>;
          const myIdx = idx++;
          return (
            <span
              key={i}
              ref={(el) => {
                letterRefs.current[myIdx] = el;
              }}
              style={{
                display: "inline-block",
                fontVariationSettings: from,
                willChange: "font-variation-settings",
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
