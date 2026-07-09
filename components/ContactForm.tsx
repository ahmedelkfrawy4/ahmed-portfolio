"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Web3Forms access keys are public by design (they only allow sending mail to
  // the owner's inbox). Env var wins if set; otherwise this baked-in fallback
  // keeps the live build working without any Netlify config.
  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
    "342803e8-18ac-439a-8a3f-faf4dcdb0676";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — a bot filling this hidden field means spam; silently "succeed".
    if (data.botcheck) {
      setStatus("sent");
      return;
    }

    if (!accessKey) {
      setStatus("error");
      setError("Form isn't connected yet — set your Web3Forms key.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New message from ${data.name || "your site"}`,
          from_name: "ahmedelkfrawy.com",
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Try emailing me directly.");
      }
    } catch {
      setStatus("error");
      setError("Couldn't send right now. Try emailing me directly.");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-start gap-3 rounded-[28px] border-2 border-[var(--color-plum)] bg-[var(--color-cream)]/70 p-8 md:p-10"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-plum)] text-[var(--color-ochre)]">
          <Check className="size-6" />
        </span>
        <h3 className="display text-3xl md:text-4xl">Message sent.</h3>
        <p className="hand text-2xl -rotate-1">talk soon — I reply within 24h ✦</p>
      </motion.div>
    );
  }

  const fieldClass =
    "w-full rounded-2xl border-2 border-[var(--color-plum)]/40 bg-[var(--color-cream)]/60 px-4 py-3.5 text-[var(--color-plum)] placeholder:text-[var(--color-plum)]/45 transition-colors focus:border-[var(--color-plum)] focus:bg-[var(--color-cream)]";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[28px] border-2 border-[var(--color-plum)] bg-[var(--color-cream)]/70 p-6 md:p-8"
    >
      {/* honeypot — hidden from humans, tempting to bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <label className="block">
          <span className="mono opacity-70 mb-2 block">your name</span>
          <input
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            data-cursor="hover"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mono opacity-70 mb-2 block">your email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="jane@studio.com"
            data-cursor="hover"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block mb-5">
        <span className="mono opacity-70 mb-2 block">the message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell me about the project…"
          data-cursor="hover"
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor="hover"
          className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-plum)] px-7 py-4 font-medium text-[var(--color-cream)] transition-all hover:bg-[var(--color-plum)]/90 hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> sending…
            </>
          ) : (
            <>
              send it
              <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>

        {status === "error" && (
          <span className="mono text-red-700/90">{error}</span>
        )}
      </div>
    </form>
  );
}
