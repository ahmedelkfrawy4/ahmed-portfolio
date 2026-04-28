"use client";

import Image from "next/image";

export function PhoneMock({
  bg,
  fg,
  accent,
  label,
  image,
  moreCount,
  themed,
}: {
  bg: string;
  fg: string;
  accent: string;
  label?: string;
  image?: string;
  moreCount?: number;
  themed?: boolean;
}) {
  const frameBorder = themed ? "var(--color-fg)" : fg;
  const frameBg = themed ? "var(--color-bg)" : bg;
  if (image) {
    if (moreCount) {
      return (
        <div className="relative">
          <div className="relative">
            {/* Ghost stack — two faint frames offset behind to imply depth */}
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-[36px] border-[6px] opacity-30"
              style={{ borderColor: frameBorder, backgroundColor: frameBg }}
            />
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-1.5 -translate-y-1.5 rounded-[36px] border-[6px] opacity-60"
              style={{ borderColor: frameBorder, backgroundColor: frameBg }}
            />
            <div
              className="relative w-full overflow-hidden rounded-[36px] border-[6px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] dark:shadow-[0_20px_60px_-15px_rgba(245,241,234,0.18)]"
              style={{
                borderColor: frameBorder,
                backgroundColor: frameBg,
                aspectRatio: "1179 / 2556",
              }}
            >
              <Image
                src={image}
                alt={label ?? "screen"}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
              {/* Brand wash — accent gradient over the screenshot */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${accent}1A 0%, ${accent}CC 55%, ${accent}F2 100%)`,
                }}
              />
              {/* Glass badge with the +N */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div
                  className="flex flex-col items-center gap-1.5 rounded-[24px] px-6 py-5 backdrop-blur-md border"
                  style={{
                    backgroundColor: "rgba(251,247,240,0.6)",
                    borderColor: `${fg}33`,
                    boxShadow: "0 30px 60px -20px rgba(0,0,0,0.35)",
                  }}
                >
                  <span
                    className="display leading-none text-5xl md:text-6xl"
                    style={{ color: fg }}
                  >
                    +{moreCount}
                  </span>
                  <span
                    className="mono uppercase tracking-[0.16em] text-[10px] md:text-[11px] text-center"
                    style={{ color: fg, opacity: 0.85 }}
                  >
                    more mobile screens
                  </span>
                </div>
              </div>
              {/* Brand pip — small dot in deep brand color */}
              <span
                aria-hidden
                className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: fg }}
              />
            </div>
          </div>
          {label && (
            <span className="mono mt-3 block text-[var(--color-fg-subtle)] text-sm">
              {label}
            </span>
          )}
        </div>
      );
    }
    return (
      <div className="relative">
        <div
          className="relative w-full overflow-hidden rounded-[36px] border-[6px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_60px_-15px_rgba(245,241,234,0.15)]"
          style={{
            borderColor: frameBorder,
            backgroundColor: frameBg,
            aspectRatio: "1179 / 2556",
          }}
        >
          <Image
            src={image}
            alt={label ?? "screen"}
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover object-top"
          />
        </div>
        {label && (
          <span className="mono mt-3 block text-[var(--color-fg-subtle)] text-sm">
            {label}
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="relative">
      <div
        className="relative aspect-[9/16] w-full overflow-hidden rounded-[28px] border-[6px]"
        style={{ borderColor: fg, backgroundColor: bg }}
      >
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 h-1.5 w-16 rounded-full"
          style={{ backgroundColor: fg, opacity: 0.4 }}
        />
        <div className="absolute top-7 left-4 right-4">
          <div
            className="h-2 w-16 rounded-full mb-3"
            style={{ backgroundColor: fg, opacity: 0.55 }}
          />
          <div
            className="h-3.5 w-32 rounded-full mb-2"
            style={{ backgroundColor: fg, opacity: 0.85 }}
          />
          <div
            className="h-3 w-20 rounded-full"
            style={{ backgroundColor: fg, opacity: 0.4 }}
          />
        </div>
        <div
          className="absolute top-32 left-4 right-4 rounded-2xl p-3"
          style={{ backgroundColor: accent, opacity: 0.95 }}
        >
          <div
            className="h-2 w-12 rounded-full mb-2"
            style={{ backgroundColor: bg, opacity: 0.65 }}
          />
          <div
            className="h-3 w-24 rounded-full mb-1"
            style={{ backgroundColor: bg, opacity: 0.95 }}
          />
          <div
            className="h-2 w-20 rounded-full"
            style={{ backgroundColor: bg, opacity: 0.55 }}
          />
        </div>
        <div className="absolute top-56 left-4 right-4 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-2 items-center">
              <div
                className="h-7 w-7 rounded-md shrink-0"
                style={{ backgroundColor: fg, opacity: 0.18 }}
              />
              <div className="flex-1 space-y-1.5">
                <div
                  className="h-2 w-full rounded-full"
                  style={{ backgroundColor: fg, opacity: 0.4 }}
                />
                <div
                  className="h-2 w-2/3 rounded-full"
                  style={{ backgroundColor: fg, opacity: 0.25 }}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className="absolute bottom-3 left-4 right-4 h-10 rounded-full flex items-center justify-around px-3"
          style={{ backgroundColor: fg, opacity: 0.92 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: bg, opacity: i === 0 ? 1 : 0.4 }}
            />
          ))}
        </div>
      </div>
      {label && (
        <span className="mono mt-2 block text-[var(--color-fg-subtle)]">
          {label}
        </span>
      )}
    </div>
  );
}

export function BrowserMock({
  bg,
  fg,
  accent,
  label,
  image,
  aspect,
  moreCount,
  themed,
}: {
  bg: string;
  fg: string;
  accent: string;
  label?: string;
  image?: string;
  aspect?: string;
  moreCount?: number;
  themed?: boolean;
}) {
  const frameBorder = themed ? "var(--color-fg)" : fg;
  const frameBg = themed ? "var(--color-bg)" : bg;
  if (image) {
    const ratio = aspect ?? "1024 / 768";
    return (
      <div className="relative">
        {moreCount ? (
          <div className="relative">
            {/* Ghost stack — two faint frames offset behind to imply depth */}
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-2xl border-[3px] opacity-30"
              style={{ borderColor: frameBorder, backgroundColor: frameBg }}
            />
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-1.5 -translate-y-1.5 rounded-2xl border-[3px] opacity-60"
              style={{ borderColor: frameBorder, backgroundColor: frameBg }}
            />
            <div
              className="relative w-full overflow-hidden rounded-2xl border-[3px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] dark:shadow-[0_20px_60px_-15px_rgba(245,241,234,0.18)]"
              style={{
                borderColor: frameBorder,
                backgroundColor: frameBg,
                aspectRatio: ratio,
              }}
            >
              <Image
                src={image}
                alt={label ?? "screen"}
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover object-top"
              />
              {/* Brand wash — accent gradient over the screenshot */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${accent}1A 0%, ${accent}CC 55%, ${accent}F2 100%)`,
                }}
              />
              {/* Glass badge with the +N */}
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <div
                  className="flex flex-col items-center gap-1.5 rounded-[28px] px-10 py-7 backdrop-blur-md border"
                  style={{
                    backgroundColor: "rgba(251,247,240,0.6)",
                    borderColor: `${fg}33`,
                    boxShadow: "0 30px 60px -20px rgba(0,0,0,0.35)",
                  }}
                >
                  <span
                    className="display leading-none text-6xl md:text-7xl"
                    style={{ color: fg }}
                  >
                    +{moreCount}
                  </span>
                  <span
                    className="mono uppercase tracking-[0.18em] text-[11px] md:text-xs"
                    style={{ color: fg, opacity: 0.85 }}
                  >
                    more dashboard views
                  </span>
                </div>
              </div>
              {/* Brand pip — small dot in deep brand color */}
              <span
                aria-hidden
                className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: fg }}
              />
            </div>
          </div>
        ) : (
          <div
            className="relative w-full overflow-hidden rounded-2xl border-[3px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_60px_-15px_rgba(245,241,234,0.15)]"
            style={{
              borderColor: frameBorder,
              backgroundColor: frameBg,
              aspectRatio: ratio,
            }}
          >
            <Image
              src={image}
              alt={label ?? "screen"}
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}
        {label && (
          <span className="mono mt-3 block text-[var(--color-fg-subtle)] text-sm">
            {label}
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="relative">
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border-[3px]"
        style={{ borderColor: fg, backgroundColor: bg }}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-2"
          style={{ backgroundColor: fg }}
        >
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: bg, opacity: 0.5 }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: bg, opacity: 0.5 }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: bg, opacity: 0.5 }} />
          </div>
          <div
            className="ml-3 flex-1 h-3 rounded-full max-w-[60%]"
            style={{ backgroundColor: bg, opacity: 0.18 }}
          />
        </div>
        <div className="flex items-center justify-between px-5 pt-4">
          <div
            className="h-3 w-16 rounded-full"
            style={{ backgroundColor: fg, opacity: 0.85 }}
          />
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2 w-8 rounded-full"
                style={{ backgroundColor: fg, opacity: 0.45 }}
              />
            ))}
          </div>
        </div>
        <div className="px-5 mt-5">
          <div
            className="h-3 w-20 rounded-full mb-2"
            style={{ backgroundColor: fg, opacity: 0.4 }}
          />
          <div
            className="h-5 w-3/4 rounded-full mb-2"
            style={{ backgroundColor: fg, opacity: 0.85 }}
          />
          <div
            className="h-3 w-2/3 rounded-full"
            style={{ backgroundColor: fg, opacity: 0.4 }}
          />
        </div>
        <div className="absolute bottom-4 left-5 right-5 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 rounded-lg p-2"
              style={{
                backgroundColor: i === 1 ? accent : fg,
                opacity: i === 1 ? 1 : 0.18,
              }}
            >
              <div
                className="h-1.5 w-full rounded-full mb-1"
                style={{ backgroundColor: bg, opacity: i === 1 ? 0.6 : 0 }}
              />
              <div
                className="h-1.5 w-2/3 rounded-full"
                style={{ backgroundColor: bg, opacity: i === 1 ? 0.85 : 0 }}
              />
            </div>
          ))}
        </div>
      </div>
      {label && (
        <span className="mono mt-2 block text-[var(--color-fg-subtle)]">
          {label}
        </span>
      )}
    </div>
  );
}
