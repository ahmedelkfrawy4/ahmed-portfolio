import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // next/prev for footer navigation
  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next =
    idx < projects.length - 1 ? projects[idx + 1] : projects[0];

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

        {/* Header */}
        <header className="px-5 md:px-8 pt-10 pb-12 md:pb-16">
          <div className="mx-auto max-w-[1100px]">
            <div className="mono text-[var(--color-fg-muted)] mb-5 flex flex-wrap gap-x-4 gap-y-1">
              <span className="text-[var(--color-fg)]">
                {project.n} / 0{projects.length}
              </span>
              <span>{project.client}</span>
              <span>· {project.year}</span>
              <span>· {project.sector}</span>
            </div>
            <h1 className="display text-[clamp(2.75rem,8vw,7rem)] leading-[1.02] mb-4">
              {project.name}
            </h1>
            <p className="display italic text-2xl md:text-4xl text-[var(--color-fg-muted)] max-w-3xl leading-snug">
              {project.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Hero visual block */}
        <section className="px-5 md:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div
              className="relative rounded-[28px] overflow-hidden p-8 md:p-14"
              style={{ backgroundColor: project.hero.bg, color: project.hero.fg }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="mono opacity-70 mb-3">overview</p>
                  <p className="display text-2xl md:text-3xl leading-[1.15]">
                    {project.overview}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto md:ml-auto md:mr-0 w-full">
                  {project.mockups.slice(0, 2).map((m) =>
                    m.type === "browser" ? (
                      <div key={m.label} className="col-span-2">
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
              </div>
            </div>
          </div>
        </section>

        {/* Problem + Solution */}
        <section className="px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="rounded-[24px] border border-[var(--color-border)] p-6 md:p-8">
                <p className="mono text-[var(--color-fg-muted)] mb-3">
                  the problem
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div
                className="rounded-[24px] p-6 md:p-8"
                style={{
                  backgroundColor: project.hero.accent,
                  color:
                    project.hero.accent === "#2B1B3D" ? "#FBF7F0" : "#2B1B3D",
                }}
              >
                <p className="mono opacity-70 mb-3">the solution</p>
                <p className="text-base md:text-lg leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="px-5 md:px-8 py-16 md:py-24 border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-[1100px]">
            <p className="mono text-[var(--color-fg-muted)] mb-3">the process</p>
            <h2 className="display text-4xl md:text-6xl mb-10 leading-[0.98]">
              How it actually <span className="italic">went</span>.
            </h2>
            <ol className="space-y-4">
              {project.process.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-5 border-b border-[var(--color-border)] pb-4"
                >
                  <span className="mono text-[var(--color-fg-subtle)] shrink-0 w-8 mt-1">
                    0{i + 1}
                  </span>
                  <span className="text-lg md:text-xl text-[var(--color-fg)] leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Mockup gallery */}
        <section className="px-5 md:px-8 py-16 md:py-24 border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-[1100px]">
            <p className="mono text-[var(--color-fg-muted)] mb-3">
              screens & deliverables
            </p>
            <h2 className="display text-4xl md:text-6xl mb-10 leading-[0.98]">
              The <span className="italic">work</span>.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
              {project.mockups.map((m) =>
                m.type === "browser" ? (
                  <div key={m.label} className="col-span-2 md:col-span-2">
                    <BrowserMock
                      bg={project.hero.bg}
                      fg={project.hero.fg}
                      accent={project.hero.accent}
                      label={m.label}
                    />
                  </div>
                ) : (
                  <PhoneMock
                    key={m.label}
                    bg={project.hero.bg}
                    fg={project.hero.fg}
                    accent={project.hero.accent}
                    label={m.label}
                  />
                ),
              )}
            </div>
            <p className="mono text-[var(--color-fg-subtle)] mt-8">
              — placeholder mockups · final screenshots will replace these
            </p>
          </div>
        </section>

        {/* Outcomes + live links */}
        <section className="px-5 md:px-8 py-16 md:py-24 border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-[1100px]">
            <p className="mono text-[var(--color-fg-muted)] mb-3">
              the outcome
            </p>
            <h2 className="display text-4xl md:text-6xl mb-10 leading-[0.98]">
              What <span className="italic">happened</span> after.
            </h2>
            <div className="flex flex-wrap gap-3 mb-10">
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
              <div>
                <p className="mono text-[var(--color-fg-muted)] mb-3">
                  see it live
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
          </div>
        </section>

        {/* Prev / Next nav */}
        <section className="px-5 md:px-8 py-16 md:py-20 border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link
              href={`/projects/${prev.slug}`}
              data-cursor="hover"
              className="group block rounded-[24px] border border-[var(--color-border)] p-6 md:p-7 hover:bg-[var(--color-surface)] transition-colors"
            >
              <p className="mono text-[var(--color-fg-muted)] mb-2 flex items-center gap-2">
                <ArrowLeft className="size-3.5" />
                previous
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
              <p className="mono text-[var(--color-fg-muted)] mb-2 flex items-center gap-2 md:justify-end">
                next
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
