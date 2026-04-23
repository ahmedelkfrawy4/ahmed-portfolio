import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, getProject } from "@/lib/projects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PhoneMock, BrowserMock } from "@/components/Mockups";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Not found" };
  return {
    title: p.name,
    description: p.tagline,
  };
}

function splitToSentences(text: string) {
  return text
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];

  const overviewLines = splitToSentences(project.overview);
  const problemPoints = splitToSentences(project.problem);
  const solutionPoints = splitToSentences(project.solution);

  return (
    <>
      <Nav />
      <main>
        {/* Back link */}
        <div className="px-5 md:px-8 pt-28 md:pt-32">
          <div className="mx-auto max-w-[1100px]">
            <Link
              href="/#projects"
              data-cursor="hover"
              className="mono inline-flex items-center gap-2 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              back to all projects
            </Link>
          </div>
        </div>

        {/* Header — meta row on top, big title, tagline underneath */}
        <header className="px-5 md:px-8 pt-10 pb-14 md:pb-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 mb-12 md:mb-16 max-w-3xl">
              <MetaCell label="Project" value={`${project.n} / 0${projects.length}`} />
              <MetaCell label="Client" value={project.client} />
              <MetaCell label="Year" value={project.year} />
              <MetaCell label="Services" value={project.services.join(", ")} />
            </div>
            <h1 className="display uppercase text-[clamp(3rem,11vw,9rem)] leading-[0.92] tracking-tight mb-6">
              {project.name}
            </h1>
            <p className="display italic text-xl md:text-3xl text-[var(--color-fg-muted)] max-w-3xl leading-snug">
              {project.tagline}
            </p>
          </div>
        </header>

        {/* Hero visual — real promo render if provided, otherwise mockup grid */}
        <section className="px-5 md:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div
              className="relative rounded-[28px] overflow-hidden p-6 md:p-10"
              style={{ backgroundColor: project.hero.bg, color: project.hero.fg }}
            >
              {project.hero.image ? (
                <div
                  className="relative w-full overflow-hidden rounded-2xl"
                  style={{ aspectRatio: project.hero.imageAspect ?? "16 / 10" }}
                >
                  <Image
                    src={project.hero.image}
                    alt={`${project.name} hero`}
                    fill
                    priority
                    sizes="(min-width: 1100px) 1040px, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
                  {project.mockups.slice(0, 3).map((m, i) =>
                    m.type === "browser" ? (
                      <div
                        key={m.label}
                        className={
                          i === 0
                            ? "col-span-2 md:col-span-2"
                            : "col-span-2 md:col-span-1"
                        }
                      >
                        <BrowserMock
                          bg={project.hero.bg}
                          fg={project.hero.fg}
                          accent={project.hero.accent}
                        />
                      </div>
                    ) : (
                      <PhoneMock
                        key={m.label}
                        bg={project.hero.bg}
                        fg={project.hero.fg}
                        accent={project.hero.accent}
                      />
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Overview — sidebar label + sentence-per-line body */}
        <CaseSection label="Overview">
          <div className="space-y-5">
            {overviewLines.map((line, i) => (
              <p
                key={i}
                className="display text-xl md:text-[28px] leading-[1.35]"
              >
                {line}
              </p>
            ))}
          </div>
        </CaseSection>

        {/* Problem */}
        <CaseSection label="Problem">
          <BulletList items={problemPoints} />
        </CaseSection>

        {/* Solution */}
        <CaseSection label="Solution">
          <BulletList items={solutionPoints} />
        </CaseSection>

        {/* Process */}
        <CaseSection label="Process">
          <ol className="space-y-5">
            {project.process.map((step, i) => (
              <li
                key={step}
                className="flex gap-5 border-b border-[var(--color-border)] pb-5 last:border-b-0"
              >
                <span className="mono text-[var(--color-fg-subtle)] shrink-0 w-8 mt-1">
                  0{i + 1}
                </span>
                <span className="display text-lg md:text-xl leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </CaseSection>

        {/* Screens */}
        <CaseSection label="Screens">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
            {project.mockups.map((m) =>
              m.type === "browser" ? (
                <div key={m.label} className="col-span-2 md:col-span-3">
                  <BrowserMock
                    bg={project.hero.bg}
                    fg={project.hero.fg}
                    accent={project.hero.accent}
                    label={m.label}
                    image={m.image}
                    aspect={m.aspect}
                  />
                </div>
              ) : (
                <PhoneMock
                  key={m.label}
                  bg={project.hero.bg}
                  fg={project.hero.fg}
                  accent={project.hero.accent}
                  label={m.label}
                  image={m.image}
                />
              ),
            )}
          </div>
          {!project.mockups.some((m) => m.image) && (
            <p className="mono text-[var(--color-fg-subtle)] mt-6 text-sm">
              — placeholder mockups · final screenshots will replace these
            </p>
          )}
        </CaseSection>

        {/* Outcome */}
        <CaseSection label="Outcome">
          <div className="flex flex-wrap gap-3 mb-8">
            {project.outcomes.map((o) => (
              <span
                key={o}
                className="rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] px-4 py-2 text-base font-medium"
              >
                {o}
              </span>
            ))}
          </div>
          {project.liveLinks && project.liveLinks.length > 0 && (
            <div className="mt-6">
              <p className="mono text-[var(--color-fg-muted)] mb-3 text-sm uppercase tracking-wide">
                See it live
              </p>
              <div className="flex flex-wrap gap-3">
                {project.liveLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-fg)] text-[var(--color-fg)] px-4 py-2 text-sm hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] transition-colors"
                  >
                    <ExternalLink className="size-3.5" />
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </CaseSection>

        {/* Prev / Next */}
        <section className="px-5 md:px-8 py-16 md:py-20 border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link
              href={`/projects/${prev.slug}`}
              data-cursor="hover"
              className="group block rounded-[24px] border border-[var(--color-border)] p-6 md:p-7 hover:bg-[var(--color-surface)] transition-colors"
            >
              <p className="mono text-[var(--color-fg-muted)] mb-2 flex items-center gap-2 text-sm uppercase tracking-wide">
                <ArrowLeft className="size-3.5" />
                Previous
              </p>
              <p className="display text-2xl md:text-3xl leading-tight">
                {prev.name}
              </p>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              data-cursor="hover"
              className="group block rounded-[24px] border border-[var(--color-border)] p-6 md:p-7 hover:bg-[var(--color-surface)] transition-colors text-right md:text-left"
            >
              <p className="mono text-[var(--color-fg-muted)] mb-2 flex items-center gap-2 md:justify-end text-sm uppercase tracking-wide">
                Next
                <ArrowUpRight className="size-3.5" />
              </p>
              <p className="display text-2xl md:text-3xl leading-tight md:text-right">
                {next.name}
              </p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mono text-[var(--color-fg-subtle)] uppercase text-[11px] tracking-[0.12em] mb-2">
        {label}
      </p>
      <p className="text-sm md:text-base text-[var(--color-fg)] leading-snug">
        {value}
      </p>
    </div>
  );
}

function CaseSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 md:px-8 py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-16">
        <div>
          <p className="mono text-[var(--color-fg-muted)] uppercase text-[11px] tracking-[0.14em] md:sticky md:top-28">
            {label}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-4 border-b border-[var(--color-border)] pb-5 last:border-b-0"
        >
          <span className="mono text-[var(--color-fg-subtle)] shrink-0 mt-2 text-sm">
            0{i + 1}
          </span>
          <span className="display text-xl md:text-[26px] leading-[1.35]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
