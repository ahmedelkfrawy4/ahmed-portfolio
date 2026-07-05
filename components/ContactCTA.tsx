"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Copy, Check, Mail, Phone, Linkedin, MapPin } from "lucide-react";

const EMAIL = "info@ahmedelkfrawy.com";
const PHONE = "+201093839772";
const PHONE_DISPLAY = "+20 109 383 9772";
const LINKEDIN = "https://www.linkedin.com/in/ahmedelkfrawy";

export default function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-ochre)] text-[var(--color-plum)]"
    >
      {/* floating paper plane */}
      <motion.svg
        className="absolute top-12 right-8 md:right-24 size-20 md:size-28 opacity-90"
        viewBox="0 0 64 64"
        initial={{ y: 0, rotate: -8 }}
        animate={{ y: [0, -12, 0], rotate: [-8, -2, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M4 32 L60 6 L44 58 L32 38 Z"
          fill="#2B1B3D"
          stroke="#2B1B3D"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M32 38 L60 6" stroke="#FBF7F0" strokeWidth="2" />
      </motion.svg>

      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-28 md:py-40">
        <p className="mono opacity-70 mb-6">the contact · chapter final</p>
        <h2 className="display text-[clamp(3.5rem,11vw,12rem)] mb-4">
          Let&rsquo;s make <span className="italic">something</span>.
        </h2>
        <p className="hand text-3xl md:text-4xl -rotate-2 mb-14">
          say hi — I reply fast ↓
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {/* Email */}
          <button
            onClick={copy}
            data-cursor="hover"
            className="group relative flex items-center justify-between rounded-[28px] border-2 border-[var(--color-plum)] bg-[var(--color-cream)]/70 p-6 md:p-7 text-left transition-all hover:bg-[var(--color-plum)] hover:text-[var(--color-cream)]"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-plum)] text-[var(--color-cream)] group-hover:bg-[var(--color-ochre)] group-hover:text-[var(--color-plum)]">
                <Mail className="size-5" />
              </span>
              <div>
                <div className="mono opacity-70 mb-1">email</div>
                <div className="display text-xl md:text-2xl">{EMAIL}</div>
              </div>
            </div>
            <span className="mono flex items-center gap-2">
              {copied ? (
                <>
                  <Check className="size-4" /> copied
                </>
              ) : (
                <>
                  <Copy className="size-4" /> copy
                </>
              )}
            </span>
          </button>

          {/* Phone */}
          <a
            href={`tel:${PHONE}`}
            data-cursor="hover"
            className="group flex items-center justify-between rounded-[28px] border-2 border-[var(--color-plum)] bg-[var(--color-cream)]/70 p-6 md:p-7 transition-all hover:bg-[var(--color-plum)] hover:text-[var(--color-cream)]"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-plum)] text-[var(--color-cream)] group-hover:bg-[var(--color-ochre)] group-hover:text-[var(--color-plum)]">
                <Phone className="size-5" />
              </span>
              <div>
                <div className="mono opacity-70 mb-1">phone</div>
                <div className="display text-xl md:text-2xl">
                  {PHONE_DISPLAY}
                </div>
              </div>
            </div>
            <span className="mono opacity-70">tap to call →</span>
          </a>

          {/* LinkedIn */}
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group flex items-center justify-between rounded-[28px] border-2 border-[var(--color-plum)] bg-[var(--color-cream)]/70 p-6 md:p-7 transition-all hover:bg-[var(--color-plum)] hover:text-[var(--color-cream)]"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-plum)] text-[var(--color-cream)] group-hover:bg-[var(--color-ochre)] group-hover:text-[var(--color-plum)]">
                <Linkedin className="size-5" />
              </span>
              <div>
                <div className="mono opacity-70 mb-1">linkedin</div>
                <div className="display text-xl md:text-2xl">
                  /in/ahmedelkfrawy
                </div>
              </div>
            </div>
            <span className="mono opacity-70">open ↗</span>
          </a>

          {/* Location */}
          <div className="flex items-center justify-between rounded-[28px] border-2 border-[var(--color-plum)] bg-[var(--color-cream)]/70 p-6 md:p-7">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-plum)] text-[var(--color-cream)]">
                <MapPin className="size-5" />
              </span>
              <div>
                <div className="mono opacity-70 mb-1">based in</div>
                <div className="display text-xl md:text-2xl">
                  Cairo · open to remote
                </div>
              </div>
            </div>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </div>
        </div>

        <p className="hand text-2xl md:text-3xl mt-14 rotate-1 opacity-80 max-w-2xl">
          — I reply to every email within 24h, weekdays. No funnels, no forms,
          just a person.
        </p>
      </div>
    </section>
  );
}
