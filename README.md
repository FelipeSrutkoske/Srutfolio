# Srutfolio — Portfólio Técnico de Felipe Srutkoske

Portfólio bilíngue (`PT` / `EN`) construído em **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS** e **Three.js**, estruturado para apresentar arquitetura de software, decisões técnicas com trade-offs e experiência real em produção.

- **Site:** [felipesrutkoske.dev](https://felipesrutkoske.dev)
- **Perfil:** Backend & Fullstack Engineer (Node.js, TypeScript, Go & Linux)

## Arquitetura e Decisões Técnicas

- **App Router com geração estática por locale (`next-intl`):** rotas `/pt`, `/en`, `/pt/projects/[slug]` e `/en/projects/[slug]` pré-renderizadas via `generateStaticParams`.
- **Robô 3D interativo em Three.js (`components/webgl/hero-robot-3d.tsx`):** modelagem procedural com iluminação de estúdio (`RoomEnvironment` + `ACESFilmicToneMapping` + `MeshPhysicalMaterial`), rastreamento suave com limites de ângulo, piscada natural, balão de fala PT/EN e pausa automática fora da viewport (`IntersectionObserver`).
- **Diagramas vetoriais reais (`components/project-blueprint.tsx`):** cada projeto destacado (`VehiGo`, `go-vit`, `TrackIt`, `Look4`) usa diagramas arquiteturais em SVG acompanhados de um inspetor de camadas e registro de decisões no formato *Decisão → Por quê → Trade-off*.
- **SEO & Compartilhamento:** `generateMetadata` próprio por case study, imagem OpenGraph gerada dinamicamente (`app/[locale]/opengraph-image.tsx`), `sitemap.ts` cobrindo todos os locales e projetos, e JSON-LD `Person`.

## Estrutura Principal

```text
app/
  [locale]/
    layout.tsx                 # Fontes, metadata, JSON-LD Person
    page.tsx                   # Home (Hero 3D, Projetos, Produção, Stack, Contato)
    opengraph-image.tsx        # OG image dinâmica (next/og)
    projects/[slug]/page.tsx   # Case studies com diagrama + decisões/trade-offs
  sitemap.ts                   # Sitemap localizado (home + case studies)
components/
  webgl/hero-robot-3d.tsx      # Robô 3D interativo em Three.js (zero dependências de terceiros)
  project-blueprint.tsx        # Diagramas arquiteturais SVG por projeto
  architecture-diagram.tsx     # Inspetor interativo de camadas
  sections/                    # Hero, SelectedWorks, ProductionExperience, EngineeringProof, AboutContact
data/
  profile.ts · projects.ts · experience.ts · skills.ts
messages/
  pt.json · en.json
```

## Executando Localmente

```bash
pnpm install
pnpm dev
```

Verificações de qualidade:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```
