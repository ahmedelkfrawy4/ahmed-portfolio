"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { ArrowDown, MapPin } from "lucide-react";

const shapes = [
  {
    label: "curious",
    x: "6%",
    y: "8%",
    size: 130,
    color: "#F5B841",
    r: -6,
    shape: "rounded-[46%]",
  },
  {
    label: "systematic",
    x: "44%",
    y: "4%",
    size: 100,
    color: "#2B1B3D",
    r: 8,
    shape: "rounded-[32%]",
  },
  {
    label: "honest",
    x: "76%",
    y: "12%",
    size: 96,
    color: "#FFD6C4",
    r: -10,
    shape: "rounded-[55%_45%_60%_40%]",
  },
  {
    label: "playful",
    x: "62%",
    y: "44%",
    size: 140,
    color: "#FFD6C4",
    r: -4,
    shape: "rounded-full",
  },
  {
    label: "rapid",
    x: "30%",
    y: "38%",
    size: 110,
    color: "#D4FF3A",
    r: 14,
    shape: "rounded-[38%_62%_55%_45%]",
  },
  {
    label: "human",
    x: "8%",
    y: "60%",
    size: 120,
    color: "#D4FF3A",
    r: 10,
    shape: "rounded-[40%_60%_55%_45%]",
  },
  {
    label: "remote",
    x: "78%",
    y: "70%",
    size: 110,
    color: "#F5B841",
    r: -8,
    shape: "rounded-[60%_40%_45%_55%]",
  },
];

type ShapeHandle = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rect: () => DOMRect | null;
};

function ShapeNode({
  s,
  i,
  containerRef,
  registerRef,
  onDragStart,
  onDragEnd,
}: {
  s: (typeof shapes)[number];
  i: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  registerRef: (i: number, h: ShapeHandle) => void;
  onDragStart: (i: number) => void;
  onDragEnd: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerRef(i, {
      x,
      y,
      rect: () => ref.current?.getBoundingClientRect() ?? null,
    });
  }, [i, registerRef, x, y]);

  return (
    <motion.div
      ref={ref}
      drag
      dragConstraints={containerRef}
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
      onDragStart={() => onDragStart(i)}
      onDragEnd={onDragEnd}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94, cursor: "grabbing" }}
      initial={{ opacity: 0, rotate: s.r }}
      animate={{ opacity: 1, rotate: s.r }}
      transition={{
        duration: 0.7,
        delay: 0.1 * i,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-cursor="hover"
      data-invert-on-dark={s.color === "#2B1B3D" ? "true" : undefined}
      className={`absolute grid place-items-center cursor-grab select-none mix-blend-multiply ${s.shape}`}
      style={{
        x,
        y,
        width: `clamp(${Math.round(s.size * 0.55)}px, ${s.size / 3.5}vw + 30px, ${s.size}px)`,
        height: `clamp(${Math.round(s.size * 0.55)}px, ${s.size / 3.5}vw + 30px, ${s.size}px)`,
        left: s.x,
        top: s.y,
        backgroundColor: s.color,
      }}
    >
      <span
        className="display text-xl md:text-2xl"
        style={{
          color: s.color === "#2B1B3D" ? "#FBF7F0" : "#2B1B3D",
        }}
      >
        {s.label}
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handlesRef = useRef<(ShapeHandle | null)[]>(
    Array(shapes.length).fill(null),
  );
  const draggingIdxRef = useRef<number | null>(null);

  const registerRef = useCallback((i: number, h: ShapeHandle) => {
    handlesRef.current[i] = h;
  }, []);

  const onDragStart = useCallback((i: number) => {
    draggingIdxRef.current = i;
  }, []);
  const onDragEnd = useCallback(() => {
    draggingIdxRef.current = null;
  }, []);

  // Collision detection — push overlapping shapes apart each frame
  useAnimationFrame(() => {
    const handles = handlesRef.current;
    const cRect = containerRef.current?.getBoundingClientRect();
    if (!cRect) return;

    const rects = handles.map((h) => h?.rect() ?? null);

    for (let i = 0; i < handles.length; i++) {
      for (let j = i + 1; j < handles.length; j++) {
        const a = handles[i];
        const b = handles[j];
        const ra = rects[i];
        const rb = rects[j];
        if (!a || !b || !ra || !rb) continue;

        const cax = ra.left + ra.width / 2;
        const cay = ra.top + ra.height / 2;
        const cbx = rb.left + rb.width / 2;
        const cby = rb.top + rb.height / 2;

        const dx = cax - cbx;
        const dy = cay - cby;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;

        // Treat shapes as circles ~85% of their diagonal — comfortable visual collision
        const minDist = (Math.max(ra.width, ra.height) + Math.max(rb.width, rb.height)) * 0.5 * 0.88;

        if (dist < minDist) {
          const overlap = minDist - dist;
          const ux = dx / dist;
          const uy = dy / dist;
          const dragging = draggingIdxRef.current;

          if (dragging === i) {
            // i is being held — push j out of the way
            b.x.set(b.x.get() - ux * overlap);
            b.y.set(b.y.get() - uy * overlap);
          } else if (dragging === j) {
            a.x.set(a.x.get() + ux * overlap);
            a.y.set(a.y.get() + uy * overlap);
          } else {
            // Both idle — share the push
            a.x.set(a.x.get() + ux * overlap * 0.5);
            a.y.set(a.y.get() + uy * overlap * 0.5);
            b.x.set(b.x.get() - ux * overlap * 0.5);
            b.y.set(b.y.get() - uy * overlap * 0.5);
          }
        }
      }
    }
  });

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 md:px-8 pt-24 md:pt-28 pb-12 md:pb-16"
    >
      {/* top eyebrow row */}
      <div className="mx-auto mb-6 flex max-w-[1400px] items-center justify-between text-[var(--color-fg-muted)]">
        <div className="mono flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          Available · April 2026
        </div>
        <div className="mono hidden md:flex items-center gap-2">
          <MapPin className="size-3" /> Cairo, Egypt · open to remote
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: type */}
        <div className="lg:col-span-7">
          <p className="mono text-[var(--color-fg-muted)] mb-4">
            ui/ux designer · portfolio 2026
          </p>
          <h1 className="display text-[clamp(2.75rem,8.5vw,8rem)] leading-[1.04]">
            I design{" "}
            <span className="italic">digital</span>{" "}
            experiences that{" "}
            <span className="relative inline-block">
              <span className="relative z-10">sell</span>
              <svg
                className="absolute -bottom-1 left-0 h-3 w-full"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q 50 2 100 6 T 198 6"
                  stroke="#F5B841"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            , heal, and teach.
          </h1>

          <p className="mt-6 max-w-xl text-base md:text-lg text-[var(--color-fg-muted)] leading-relaxed">
            I&rsquo;m <span className="text-[var(--color-fg)] font-medium">Ahmed Elkfrawy</span>
            &nbsp;— UI/UX designer with 3+ years shipping interfaces across
            e-commerce, healthcare, education and fintech. Recent work at{" "}
            <span className="text-[var(--color-fg)] font-medium">MTN</span> drove
            a <span className="text-[var(--color-fg)] font-medium">30%</span> sales lift
            with <span className="text-[var(--color-fg)] font-medium">94%</span> user satisfaction.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-pill btn-primary">
              See selected work <span aria-hidden>→</span>
            </a>
            <a href="#contact" className="btn-pill btn-ghost">
              Book an intro call
            </a>
          </div>

          <p className="hand mt-5 text-[var(--color-fg-muted)] text-xl md:text-2xl">
            <span className="inline-block -rotate-3">
              p.s. every shape on the right is draggable — try it ↗
            </span>
          </p>
        </div>

        {/* Right: draggable shape playground */}
        <div className="relative lg:col-span-5 min-h-[340px] md:min-h-[420px]">
          <div
            ref={containerRef}
            className="absolute inset-0 rounded-[40px] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/40"
          >
            {shapes.map((s, i) => (
              <ShapeNode
                key={s.label}
                s={s}
                i={i}
                containerRef={containerRef}
                registerRef={registerRef}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))}

            {/* Note */}
            <div className="absolute bottom-4 right-5 rotate-2 pointer-events-none">
              <span className="mono text-[var(--color-fg-muted)]">
                [ drag me ]
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="mx-auto mt-8 flex max-w-[1400px] items-center gap-2 text-[var(--color-fg-muted)]"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="size-4" />
        <span className="mono">scroll</span>
      </motion.div>
    </section>
  );
}
