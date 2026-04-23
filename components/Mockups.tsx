"use client";

import Image from "next/image";

export function PhoneMock({
  bg,
  fg,
  accent,
  label,
  image,
}: {
  bg: string;
  fg: string;
  accent: string;
  label?: string;
  image?: string;
}) {
  if (image) {
    return (
      <div className="relative">
        <div
          className="relative w-full overflow-hidden rounded-[36px] border-[6px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
          style={{
            borderColor: fg,
            backgroundColor: bg,
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
}: {
  bg: string;
  fg: string;
  accent: string;
  label?: string;
  image?: string;
  aspect?: string;
}) {
  if (image) {
    return (
      <div className="relative">
        <div
          className="relative w-full overflow-hidden rounded-2xl border-[3px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
          style={{
            borderColor: fg,
            backgroundColor: bg,
            aspectRatio: aspect ?? "1024 / 768",
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
