"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Magnet from "./Magnet";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Toolbelt", href: "/#toolbelt" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4 md:pt-5"
      >
        <div className="nav-pill mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/85 px-3 md:px-6 py-2 md:py-2.5 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2">
            <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-[var(--color-fg)] ring-offset-1 ring-offset-[var(--color-bg)]">
              <Image
                src="/ahmed.jpg"
                alt="Ahmed Elkfrawy"
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="display text-base md:text-xl">Ahmed Elkfrawy</span>
            <span className="mono ml-2 hidden md:inline text-[var(--color-fg-muted)]">
              · UI/UX
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-underline text-sm text-[var(--color-fg)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Magnet>
              <Link
                href="/#contact"
                className="btn-pill btn-primary text-xs md:text-sm !py-2 !px-3 md:!py-2.5 md:!px-5"
              >
                Say hi<span aria-hidden className="hidden md:inline">→</span>
              </Link>
            </Magnet>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-haspopup="dialog"
              className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)]"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-[var(--color-plum)]/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="force-light relative mx-4 mt-4 rounded-[28px] bg-[var(--color-cream)] p-6 border border-[var(--color-border)]"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="display text-2xl">menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-plum)] text-[var(--color-cream)]"
                >
                  <X className="size-4" />
                </button>
              </div>
              <nav className="flex flex-col divide-y divide-[var(--color-border)]">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="display text-4xl py-4 flex items-baseline justify-between"
                  >
                    <span>{l.label}</span>
                    <span className="mono text-[var(--color-fg-muted)]">
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>
              <p className="hand text-2xl text-[var(--color-fg)] mt-6 -rotate-1">
                info@ahmedelkfrawy.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
