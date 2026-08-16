import { ImageResponse } from "next/og";
import { getProject, projects } from "@/lib/projects";

export const alt = "Case study by Ahmed Elkfrawy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Build one share image per case study at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`Font ${family} source not found`);
  const res = await fetch(match[1]);
  if (!res.ok) throw new Error(`Font ${family} fetch failed`);
  return res.arrayBuffer();
}

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);

  // Fall back to brand cream if a slug somehow has no project.
  const bg = project?.hero.bg ?? "#FBF7F0";
  const fg = project?.hero.fg ?? "#2B1B3D";
  const accent = project?.hero.accent ?? "#F5B841";
  const eyebrow = (project?.sector ?? "Case Study").toUpperCase();
  const name = project?.name ?? "Case Study";
  const tagline = project?.tagline ?? "";
  const url = "ahmedelkfrawy.com";

  // Long names need a smaller headline so they don't overflow the card.
  const nameSize = name.length > 22 ? 78 : name.length > 14 ? 96 : 116;

  let fraunces: ArrayBuffer | null = null;
  let inter: ArrayBuffer | null = null;
  try {
    [fraunces, inter] = await Promise.all([
      loadGoogleFont("Fraunces", 600, name),
      loadGoogleFont("Inter", 500, eyebrow + tagline + url + "By Ahmed Elkfrawy"),
    ]);
  } catch {
    // fall back to system fonts if Google Fonts is unreachable at build
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          color: fg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* accent corner dot */}
        <div
          style={{
            position: "absolute",
            top: 44,
            right: 44,
            width: 18,
            height: 18,
            borderRadius: 999,
            background: accent,
            boxShadow: `0 0 44px ${accent}`,
          }}
        />

        {/* Top — sector eyebrow */}
        <div
          style={{
            fontSize: 22,
            letterSpacing: 5,
            opacity: 0.75,
            display: "flex",
          }}
        >
          {eyebrow}
        </div>

        {/* Middle — project name + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: nameSize,
              lineHeight: 0.98,
              fontWeight: 600,
              marginBottom: 28,
              maxWidth: 1000,
            }}
          >
            {name}
          </div>
          {tagline ? (
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.3,
                opacity: 0.82,
                maxWidth: 900,
                display: "flex",
              }}
            >
              {tagline}
            </div>
          ) : null}
        </div>

        {/* Bottom — author + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: accent,
                marginRight: 14,
              }}
            />
            By Ahmed Elkfrawy
          </div>
          <div style={{ opacity: 0.7 }}>{url}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts:
        fraunces && inter
          ? [
              { name: "Fraunces", data: fraunces, style: "normal", weight: 600 },
              { name: "Inter", data: inter, style: "normal", weight: 500 },
            ]
          : undefined,
    }
  );
}
