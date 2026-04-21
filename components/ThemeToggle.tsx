"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      saved === "dark" ||
      (saved === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)] transition-colors hover:bg-[var(--color-surface)]"
      data-cursor="hover"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? (dark ? "moon" : "sun") : "placeholder"}
          initial={{ y: -14, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 14, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 grid place-items-center"
        >
          {mounted ? (
            dark ? (
              <Moon className="size-4" />
            ) : (
              <Sun className="size-4" />
            )
          ) : (
            <Sun className="size-4 opacity-0" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
