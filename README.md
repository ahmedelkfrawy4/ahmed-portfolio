# Portfolio

Personal portfolio for [Your Name] — product designer.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config in `app/globals.css`)
- Motion (Framer Motion successor) — installed, ready to wire up
- Lenis — smooth scroll, ready to wire up
- Lucide — icons
- next/font — Inter (body) + Instrument Serif (display)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

```
app/
  layout.tsx          # Root layout, fonts, metadata
  page.tsx            # Homepage — composes section components
  globals.css         # Tailwind + design tokens
components/
  Nav.tsx
  Hero.tsx
  SelectedWork.tsx
  AboutPreview.tsx
  Services.tsx
  Process.tsx
  Testimonials.tsx
  ContactCTA.tsx
  Footer.tsx
content/
  copy.md             # Brand copy deck — drop into Figma + replace bracketed values
```

## Next steps (in order)

1. **Replace placeholders** — `[Your Name]`, `[City]`, etc. throughout `components/` and `app/layout.tsx`.
2. **Add real projects** — edit `components/SelectedWork.tsx` `projects` array.
3. **Build case study pages** — create `app/work/[slug]/page.tsx`.
4. **Add inner pages** — `/about`, `/services`, `/contact`.
5. **Pull copy from `content/copy.md`** as you build each page.
6. **Add motion** — wire Motion + Lenis into Hero and section reveals.
7. **Connect a CMS** when you have 3+ case studies — Sanity recommended.
8. **Deploy to Vercel.**

## Design tokens

All defined in `app/globals.css` under `@theme`:

- Colors auto-switch with `prefers-color-scheme`
- Fonts via CSS variables `--font-inter`, `--font-instrument-serif`
- Custom utilities: `.serif`, `.mono`
- Custom radius: `var(--radius-card)`, `var(--radius-pill)`
- Easing: `var(--ease-out-quart)`

## Deployment

Push to GitHub → import on [vercel.com](https://vercel.com). Zero config.
