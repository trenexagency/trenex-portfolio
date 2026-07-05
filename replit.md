# Trenex Agency

A premium animated agency portfolio website built with React, GSAP, Framer Motion, and React Three Fiber (Three.js) for immersive 3D visuals.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Trenex Agency frontend: React + Vite (client-only, no backend yet), Tailwind CSS, GSAP, Framer Motion, React Three Fiber + Three.js

## Where things live

- `artifacts/trenex-agency/` — the portfolio site (React + Vite artifact, served at `/`)
  - `src/components/layout/` — Header, Footer
  - `src/components/LoadingScreen.tsx` — animated intro loader with progress bar + "Enter Experience" gate
  - `src/components/sections/` — Hero, Services (more sections to come: About, Work, Contact)
  - `src/components/three/Scene.tsx` — shared React Three Fiber `<Canvas>` wrapper; build 3D compositions as children of this (not yet used on the page)
  - `src/animations/` — shared GSAP hook (`useGsapAnimation`) and Framer Motion variants (`variants.ts`)
  - `src/lib/gsap.ts` — GSAP instance with `ScrollTrigger` pre-registered; always import gsap from here, not directly from `gsap`
  - `src/lib/three-config.ts` — shared camera/DPR defaults for R3F scenes
  - `src/data/site.ts` — static site copy/content (tagline, services list), kept separate from components
  - `src/index.css` — dark luxury theme tokens: black background, white text, red accent `hsl(0 100% 56%)` (#FF1F1F)

## Architecture decisions

- Dark luxury theme (black/white/red #FF1F1F) is baked into the CSS theme tokens directly — there is no light/dark toggle, the site is always dark.
- Homepage flow: `LoadingScreen` gates the page behind an animated intro + "Enter Experience" button before revealing Header/Hero/Services.
- No backend/OpenAPI spec set up for this artifact; it's a presentation-first static site.

## Product

Premium animated one-page portfolio for Trenex Agency. Built so far: animated loading screen with "Enter Experience" gate, Hero section, and Services section (Graphic Design, Video Editing, Web Development). Still to build: additional sections (About/Work/Contact) and 3D visuals via the R3F scene wrapper.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
