"use client";

/**
 * ShinyText — reactbits.dev sheen for small labels. A bright band sweeps across
 * the text on a slow loop. Because it clips a gradient to the glyphs, it needs
 * an explicit base color (`color:transparent` would swallow currentColor). Best
 * on the ochre eyebrows over the dark plum sections, where the sweep reads
 * clearly. The `shine` keyframes live in globals.css; reduced-motion users get
 * plain static text (see the media query there).
 */

export default function ShinyText({
  children,
  base = "#F5B841",
  className = "",
  speed = 4,
}: {
  children: string;
  /** Base text color the sweep rides over. */
  base?: string;
  className?: string;
  /** Seconds per sweep. */
  speed?: number;
}) {
  return (
    <span
      className={`shiny ${className}`}
      style={
        {
          "--shiny-base": base,
          animationDuration: `${speed}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
