# srikanth-site

Personal portfolio site for Srikanth Katta — engineer & explorer. A fully static
[Next.js](https://nextjs.org) (App Router) site with motion, an interactive
expedition route, and an editorial logbook. No backend or database — all content
lives in `src/content/`.

## Tech

- **Next.js 16** (App Router, static export of every route)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion** for animation, **Lenis** for smooth scroll
- Fonts: Inter, Fraunces, JetBrains Mono (via `next/font`)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm run start` (serve the
build), `npm run lint`.

## Content

Editable site data is plain TypeScript — no CMS:

- `src/content/site.ts` — bio, projects, expedition waypoints, after-hours, gallery
- `src/content/posts.ts` — long-form logbook entries

Images and video live in `public/`.

## Deploy (Vercel)

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). It
auto-detects Next.js — no configuration or environment variables required. Every
page is prerendered as static HTML, so it deploys to Vercel's edge with no server
runtime.
