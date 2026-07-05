import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, getProject } from "@/lib/projects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PhoneMock, BrowserMock } from "@/components/Mockups";
import CaseMotifs from "@/components/CaseMotifs";
import ProcessTimeline from "@/components/ProcessTimeline";
import SolutionGrid from "@/components/SolutionGrid";
import OverviewBlock from "@/components/OverviewBlock";
import ProblemList from "@/components/ProblemList";
import OutcomeBlock from "@/components/OutcomeBlock";
import ResponsivePairs from "@/components/ResponsivePairs";
import ArtifactsBlock from "@/components/ArtifactsBlock";

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

  // Prev/Next cycles only through finished, grid-visible case studies —
  // never routes a visitor into an unfinished placeholder page.
  const hidden = new Set(["magdi-yacoub", "injaz"]);
  const visible = projects.filter((p) => !hidden.has(p.slug));
  const vIdx = visible.findIndex((p) => p.slug === slug);
  const baseIdx = vIdx === -1 ? 0 : vIdx;
  const prev = visible[(baseIdx - 1 + visible.length) % visible.length];
  const next = visible[(baseIdx + 1) % visible.length];

  const overviewLines = splitToSentences(project.overview);
  const problemPoints = splitToSentences(project.problem);
  const solutionPoints = splitToSentences(project.solution);
  const phoneMockups = project.mockups.filter((m) => m.type === "phone");
  const browserMockups = project.mockups.filter((m) => m.type === "browser");
  const splitScreens = project.slug === "baba-guide";
  const gridScreens = project.slug === "fittra-clinic";

  return (
    <>
      <Nav />
      <main className="relative">
        {project.slug === "baba-guide" && <CaseMotifs />}
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
          <div className="mx-auto max-w-[1100px] text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 mb-12 md:mb-16 max-w-3xl mx-auto">
              <MetaCell label="Project" value={`${project.n} / 0${projects.length}`} />
              <MetaCell label="Client" value={project.client} />
              <MetaCell label="Year" value={project.year} />
              <MetaCell label="Services" value={project.services.join(", ")} />
            </div>
            <h1 className="display uppercase text-[clamp(3rem,11vw,9rem)] leading-[0.92] tracking-tight mb-6">
              {project.name}
            </h1>
            <p className="display italic text-xl md:text-3xl text-[var(--color-fg-muted)] max-w-3xl mx-auto leading-snug">
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
          <OverviewBlock lines={overviewLines} accent={project.hero.accent} />
        </CaseSection>

        {/* Problem */}
        <CaseSection label="Problem">
          <ProblemList items={problemPoints} accent={project.hero.accent} />
        </CaseSection>

        {/* Solution */}
        <CaseSection label="Solution">
          <SolutionGrid items={solutionPoints} accent={project.hero.accent} />
        </CaseSection>

        {/* Process */}
        <CaseSection label="Process">
          <ProcessTimeline
            steps={project.process}
            accent={project.hero.accent}
          />
        </CaseSection>

        {/* Flow & Artifacts */}
        {project.artifacts && project.artifacts.length > 0 && (
          <CaseSection label="Flow">
            <ArtifactsBlock
              artifacts={project.artifacts}
              accent={project.hero.accent}
            />
          </CaseSection>
        )}

        {/* Screens — split into Mobile + Admin for baba-guide, single Screens block otherwise */}
        {splitScreens ? (
          <>
            {phoneMockups.length > 0 && (
              <CaseSection label="Mobile">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
                  {phoneMockups.map((m) => (
                    <PhoneMock
                      key={m.label}
                      bg={project.hero.bg}
                      fg={project.hero.fg}
                      accent={project.hero.accent}
                      label={m.label}
                      image={m.image}
                      moreCount={m.moreCount}
                      themed
                    />
                  ))}
                </div>
              </CaseSection>
            )}
            {browserMockups.length > 0 && (
              <CaseSection label="Admin">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                  {browserMockups.map((m) => (
                    <BrowserMock
                      key={m.label}
                      bg={project.hero.bg}
                      fg={project.hero.fg}
                      accent={project.hero.accent}
                      label={m.label}
                      image={m.image}
                      aspect={m.aspect}
                      moreCount={m.moreCount}
                      themed
                    />
                  ))}
                </div>
              </CaseSection>
            )}
          </>
        ) : gridScreens ? (
          <>
            <CaseSection label="Screens">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {project.mockups.map((m, i) => (
                  <div
                    key={m.label}
                    className={
                      i === project.mockups.length - 1 ? "md:col-span-2" : ""
                    }
                  >
                    <BrowserMock
                      bg={project.hero.bg}
                      fg={project.hero.fg}
                      accent={project.hero.accent}
                      label={m.label}
                      image={m.image}
                      aspect={m.aspect}
                      moreCount={m.moreCount}
                      themed
                    />
                  </div>
                ))}
              </div>
            </CaseSection>
            <CaseSection label="Responsive">
              <ResponsivePairs
                bg={project.hero.bg}
                fg={project.hero.fg}
                accent={project.hero.accent}
                pairs={[
                  {
                    label: "Signup",
                    desktop: "/projects/fittra-clinic/signup.jpg",
                    mobile: "/projects/fittra-clinic/signup-mobile.jpg",
                  },
                  {
                    label: "Profile",
                    desktop: "/projects/fittra-clinic/profile.jpg",
                    mobile: "/projects/fittra-clinic/profile-mobile.jpg",
                  },
                  {
                    label: "Calendar",
                    desktop: "/projects/fittra-clinic/calendar.jpg",
                    mobile: "/projects/fittra-clinic/calendar-mobile.jpg",
                  },
                ]}
              />
            </CaseSection>
          </>
        ) : (
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
                      moreCount={m.moreCount}
                      themed
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
                    moreCount={m.moreCount}
                    themed
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
        )}

        {/* Outcome */}
        <CaseSection label="Outcome">
          <OutcomeBlock
            outcomes={project.outcomes}
            liveLinks={project.liveLinks}
            accent={project.hero.accent}
          />
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
    <section className="px-5 md:px-8 py-14 md:py-20 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-16">
        <div>
          <div className="md:sticky md:top-28">
            <p className="mono text-[var(--color-fg-subtle)] uppercase text-[10px] tracking-[0.2em] mb-3">
              Section
            </p>
            <p className="display uppercase text-2xl md:text-[28px] text-[var(--color-fg)] leading-[0.92]">
              {label}
            </p>
            <span
              aria-hidden
              className="block w-8 h-[2px] bg-[var(--color-fg)] opacity-50 mt-4"
            />
          </div>
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
