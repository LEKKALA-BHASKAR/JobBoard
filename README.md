# Postline — a curated job board

Postline is a fully client-side job board built as a portfolio-grade React
application. It ships with a hand-crafted UI, real seeded content (44 listings
across 14 real companies), URL-synced filters, per-page SEO, dark mode,
route-based code splitting, and a swap-in-ready service layer so a real
backend can replace `localStorage` in one file.



## Feature list

- **Home** — hero with working search, featured/recent listings, live stats
  (jobs, companies, remote %) computed from real data, category grid, CTA.
- **Jobs page** — debounced full-text search across title, company, skill,
  location, and summary. Combinable filters (category, workplace, employment
  type, experience, salary range, location) that reflect into the URL so any
  view is shareable. Sortable by latest, oldest, salary, and company. Real
  pagination (12 per page) with a page-window control. Empty state with a
  "clear filters" action. Skeletons on initial and filter loads.
- **Job details** — full description, responsibilities, requirements, benefits,
  skills, company card, similar roles (shared category + skills), share button,
  and a working apply flow with a confirmation state. 404 fallback for unknown
  ids.
- **Post job** — React Hook Form + Zod. Field-level errors, salary cross-field
  validation (`min < max`), URL validation for logo/website, tag input with
  paste-splitting for skills, ordered bullet inputs for responsibilities/
  requirements/benefits.
- **Edit job** — reuses the same form + schema; correctly pre-fills and updates
  in place.
- **Delete job** — confirmation modal, removes from listings, bookmarks, and
  "my jobs" atomically.
- **Bookmarks** — persistent per-browser bookmarks. Add/remove from the card,
  the details page, or the bookmarks list. Toasts confirm every change.
- **My posts** — every job you post is tagged as yours; edit/delete affordances
  only appear for those roles.
- **Theming** — light/dark, respects `prefers-color-scheme` on first load,
  persists, and applies pre-paint via a small inline script so there is no
  flash of the wrong theme on reload.
- **Toasts** — a single toast system used for bookmarks, posts, edits,
  deletes, apply confirmations, and share actions.
- **404** — custom SVG illustration and working "back home" actions.
- **A11y** — semantic HTML, `aria-label`s on icon-only buttons, focus rings
  everywhere, focus trap in modals, keyboard-reachable filters and pagination,
  skip-to-content link.

## Tech stack

- **React 19** — Function components, `useReducer` + Context (no Redux).
- **Vite 8** — With `@vitejs/plugin-react` and Tailwind v4's Vite plugin.
- **Tailwind CSS v4** — using the new `@theme` and CSS-first token API. All
  colors, radii, and shadows are theme-aware tokens; nothing is hardcoded per
  component.
- **React Router v7** — file-free router config in `src/router.jsx` with
  `React.lazy` + `Suspense` per route.
- **React Hook Form + Zod** — one schema (`src/utils/jobSchema.js`) drives
  both Post and Edit.
- **Framer Motion** — used for toast/modal animation and hero fade-in only.
- **Lucide React** — icons.
- **react-helmet-async** — per-page `<title>`, meta description, OpenGraph.
- **ESLint + Prettier** — CI runs `npm run lint` with `--max-warnings=0`.

Why Tailwind v4? It landed stable, its CSS-first tokens map cleanly onto our
dark/light design system, and the Vite plugin skips PostCSS entirely.

## Folder structure

```
src/
  components/          Reusable, presentational primitives (Button, Input, JobCard, …)
  pages/               Route-level components
  layouts/             AppLayout, Navbar, Footer
  hooks/               useDebounce
  context/             ThemeContext, JobsContext, ToastContext
  services/            jobsService.js — the ONLY file that touches localStorage
  utils/               format, jobsFilter, jobSchema, urlFilters, cn — pure fns
  constants/           enums (categories, employment types, page size), storage keys
  data/                companies.js + seedJobs.js (44 hand-written listings)
  router.jsx           Route config with React.lazy code splitting
  main.jsx             Providers + RouterProvider
  index.css            Tailwind v4 entry + design tokens
```

The critical separation of concerns:

- **Filtering, sorting, pagination, similar-job scoring, and stats** are all
  pure functions in `src/utils/jobsFilter.js`. Components pass raw jobs +
  filter state in and get an array out. Trivially unit-testable.
- **`services/jobsService.js`** is the only file that reads or writes
  `localStorage`. Everything else uses the async API it exposes
  (`getJobs`, `createJob`, `toggleBookmark`, …). To replace with a REST or
  GraphQL backend, rewrite that one file — no components change.

## Local setup

```bash
# Node 18+ recommended (CI runs on 20)
npm install
npm run dev      # http://localhost:5173
npm run lint     # ESLint, --max-warnings=0
npm run build    # Production build → dist/
npm run preview  # Preview the built site
```

## Screenshots

Add screenshots to `docs/screenshots/` and reference them from this README:

- `home.png` — hero + featured/recent
- `jobs.png` — Jobs page with a couple of filters active, showing a sidebar,
  a card, and the page control
- `job-details.png` — Details page with the apply modal open
- `post-job.png` — Post-job form scrolled to show the tag input + bullets
- `dark.png` — Any page in dark mode, to show contrast

To capture: run `npm run dev`, use your OS screenshot tool at 1440px wide.
For dark mode, click the moon icon in the nav.

## Deploying to Vercel

The repo is Vercel-zero-config for Vite, and also includes an explicit
`vercel.json` that spells out the framework, build command, output directory,
and SPA rewrite for React Router.

1. Push this repo to GitHub.
2. In Vercel, "Import Project" and select the repo.
3. Framework preset: **Vite** (auto-detected). Build command: `npm run build`.
   Output directory: `dist`. No environment variables required.
4. Every push to a PR gets a preview URL; pushes to `main` deploy to prod.

## Future improvements

Real product thinking, not filler:

- **Backend**. Swap `services/jobsService.js` for a REST or GraphQL client
  (Postgres + Prisma is a natural fit). The service surface is intentionally
  the same shape a real API would have. Add optimistic updates + rollback.
- **Auth**. Add employer accounts (Clerk / Auth.js) so "my posts" is
  per-user, not per-browser. Gate `/post-job` and edit/delete affordances.
- **Employer dashboards**. Analytics on listing views, applicant counts,
  and conversion funnels — you already have the shape of the data.
- **Applicant tracking**. The apply modal is scaffolded end-to-end. Wire it
  to an `applications` table, add ATS-style stages, notifications.
- **Server-side rendering**. Move to Next.js / Remix for SSR + edge caching
  for public listings; keep the same `services/` seams for the DB call.
- **Payments**. Charge employers for featured placements — the "featured"
  ranking logic already exists as a pure function.
- **Full-text search**. Replace the naive `matchesSearch` with Postgres FTS,
  Meilisearch, or Algolia. `jobsFilter.js` isolates the change to one file.
- **Testing**. `utils/jobsFilter.js` and `utils/format.js` are pure and beg
  for Vitest coverage. Add Playwright smoke tests for the golden path.
- **Design polish**. Add a keyboard-driven command palette (⌘K to search
  and jump), skeleton shimmer for search results, and per-role OG images.

## License

MIT — this is a portfolio project, use as you like.
# JobBoard
