import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Ahmed Elkfrawy — UI/UX Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`Font ${family} source not found`);
  const res = await fetch(match[1]);
  if (!res.ok) throw new Error(`Font ${family} fetch failed`);
  return res.arrayBuffer();
}

export default async function OgImage() {
  const imgBuffer = await readFile(
    path.join(process.cwd(), "public/ahmed.jpg")
  );
  const imgDataUrl = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`;

  const eyebrow = "UI/UX DESIGNER · CAIRO";
  const headline = "Ahmed Elkfrawy";
  const sub = "3+ years across healthcare, fintech, e-commerce & EdTech";
  const url = "ahmed-elkfrawy.netlify.app";

  let fraunces: ArrayBuffer | null = null;
  let inter: ArrayBuffer | null = null;
  try {
    [fraunces, inter] = await Promise.all([
      loadGoogleFont("Fraunces", 600, headline),
      loadGoogleFont("Inter", 500, eyebrow + sub + url),
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
          background: "#FBF7F0",
          display: "flex",
          padding: "80px",
          color: "#2B1B3D",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* acid-lime corner accent */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "#D4FF3A",
            boxShadow: "0 0 40px rgba(212,255,58,0.6)",
          }}
        />

        {/* Left — photo */}
        <div
          style={{
            width: 470,
            height: 470,
            marginRight: 60,
            display: "flex",
            flexShrink: 0,
            alignSelf: "center",
          }}
        >
          <img
            src={imgDataUrl}
            width={470}
            height={470}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 24,
              boxShadow: "0 20px 60px rgba(43,27,61,0.22)",
            }}
          />
        </div>

        {/* Right — text block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              color: "#6B5875",
              marginBottom: 28,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: 104,
              lineHeight: 0.96,
              fontWeight: 600,
              color: "#2B1B3D",
              marginBottom: 32,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.3,
              color: "#2B1B3D",
              opacity: 0.78,
              marginBottom: 40,
            }}
          >
            {sub}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 22,
              color: "#2B1B3D",
              marginTop: "auto",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#F5B841",
                marginRight: 14,
              }}
            />
            {url}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts:
        fraunces && inter
          ? [
              {
                name: "Fraunces",
                data: fraunces,
                style: "normal",
                weight: 600,
              },
              { name: "Inter", data: inter, style: "normal", weight: 500 },
            ]
          : undefined,
    }
  );
}
