"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * CountUp — reactbits.dev effect rebuilt on the site's Motion stack.
 * Rolls a number up from zero the first time it scrolls into view. Accepts the
 * full display string (e.g. "+30%", "3+", "94%") and preserves any prefix /
 * suffix around the number. Respects prefers-reduced-motion (shows the final
 * value immediately).
 */

// Split "+30%" into { prefix: "+", num: 30, suffix: "%", decimals: 0 }.
function parseValue(value: string) {
  const match = value.match(/^([^\d.-]*)(-?\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", num: NaN, suffix: value, decimals: 0 };
  const [, prefix, rawNum, suffix] = match;
  const clean = rawNum.replace(/,/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  return { prefix, num: parseFloat(clean), suffix, decimals };
}

export default function CountUp({
  value,
  duration = 1.6,
}: {
  value: string;
  duration?: number;
}) {
  const { prefix, num, suffix, decimals } = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (isNaN(num)) return;
    if (!inView) return;
    if (reduced) {
      setDisplay(num);
      return;
    }
    const controls = animate(0, num, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, num, duration, reduced]);

  // If we couldn't parse a number, just render the raw string.
  if (isNaN(num)) {
    return <span ref={ref}>{value}</span>;
  }

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
