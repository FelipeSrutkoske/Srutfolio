import { ImageResponse } from "next/og";

import { routing } from "@/i18n";
import { profile } from "@/data/profile";

export const alt = "Felipe Srutkoske — Backend & Fullstack Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  const headline = isEn
    ? "Backend & fullstack engineering for production systems."
    : "Engenharia backend e fullstack para sistemas em produção.";

  const availability = isEn
    ? "OPEN TO REMOTE ROLES · BRAZIL & INTERNATIONAL"
    : "DISPONÍVEL PARA VAGAS REMOTAS · BRASIL & INTERNACIONAL";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F4F2ED",
          color: "#0E0E0D",
          padding: "56px 64px",
          border: "12px solid #0E0E0D",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #0E0E0D",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            SRUTKOSKE
            <span style={{ color: "#B37E06" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: "#E0A714",
              color: "#0E0E0D",
              padding: "8px 16px",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.06em",
            }}
          >
            {availability}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#52504A",
              lineHeight: 1.4,
            }}
          >
            {`${profile.name} · ${profile.focusLine} · PostgreSQL / MySQL / Oracle · Redis · Docker`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid rgba(14, 14, 13, 0.2)",
            paddingTop: "20px",
            fontSize: 18,
            color: "#52504A",
          }}
        >
          <span>felipesrutkoske.dev</span>
          <span style={{ color: "#0E0E0D", fontWeight: 700 }}>
            github.com/FelipeSrutkoske
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
