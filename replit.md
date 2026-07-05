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
  - `src/components/layout/` — Header (with official logo), Footer
  - `src/components/LoadingScreen.tsx` — two-phase intro: "Initializing Trenex" loader with red glow + particles, then an "Enter Experience" gate screen with centered logo/headline/subheadline
  - `src/components/Particles.tsx` — reusable ambient floating-particle background, used on loading screen, Hero, and Contact
  - `src/components/sections/` — Hero, Services, Contact (more sections possible: Work/Portfolio)
  - `src/components/three/Scene.tsx` — shared React Three Fiber `<Canvas>` wrapper; build 3D compositions as children of this (not yet used on the page)
  - `src/animations/` — shared GSAP hook (`useGsapAnimation`) and Framer Motion variants (`variants.ts`)
  - `src/lib/gsap.ts` — GSAP instance with `ScrollTrigger` pre-registered; always import gsap from here, not directly from `gsap`
  - `src/lib/three-config.ts` — shared camera/DPR defaults for R3F scenes
  - `src/data/site.ts` — static site copy/content (headline, subheadline, services list), kept separate from components
  - `src/index.css` — dark luxury theme tokens: background `hsl(0 0% 2%)` (#050505), white text, red accent `hsl(0 100% 56%)` (#FF1F1F)
  - Official logo asset: `attached_assets/Trenex_Logo_1783248099260.svg`, imported via the `@assets` alias — do not recreate/redesign it, reuse the file directly

## Architecture decisions

- Dark luxury/futuristic theme (#050505 background, white text, #FF1F1F accent) is baked into the CSS theme tokens directly — there is no light/dark toggle, the site is always dark.
- Homepage flow: `LoadingScreen` (initializing → enter-experience gate) → Header/Hero/Services/Contact/Footer once entered.
- Hero uses GSAP for pointer-based parallax (glow + headline drift); Framer Motion handles entrance/hover animations elsewhere.
- No backend/OpenAPI spec set up for this artifact; it's a presentation-first static site.
- No team/founder/stock-people content per explicit brand direction — copy stays focused on the Trenex brand itself.

## Product

Premium futuristic one-page portfolio for Trenex Agency (a creative agency, not a freelancer site). Built: two-phase animated loading/enter-experience screen with the official logo, Hero with parallax + floating particles, Services (Graphic Design, Video Editing, Web Development) with glow/lift hover cards, and a minimal luxury Contact section.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
