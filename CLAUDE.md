# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start Next.js dev server
pnpm build            # Production build (also writes version.json)
pnpm lint             # ESLint with auto-fix
pnpm prettier-write   # Format all files
```

## Environment Setup

Copy `.env.example` to `.env.local` and fill in:

- `TMDB_API_KEY` — required for all API calls
- `JWT_SECRET` — required for session encryption

## Architecture

**Next.js 16 / React 19 app (App Router)** for discovering movies and TV shows via the TMDb API.

### Data Flow

```
TMDb API → Axios (TMDBApi w/ Bearer token) → /services → DTO parsers → Server Components → UI
```

- All data fetching happens in **React Server Components** — no client-side data stores (no Redux/Zustand).
- External TMDb DTOs live in `/models/dto` (snake_case); internal models in `/models` (camelCase). Parsers in
  `/services/parse-service.ts` convert between them.
- API endpoint templates use `url-template` with parameterized paths (e.g., `{?page,region}`). Routes defined in
  `/config/api-routes.ts`.

### Session / Auth

- On mount, `SessionProvider` detects user country via geo IP, creates a TMDb guest session, encrypts both into a JWT (
  via `jose`), and stores it in a secure HTTP-only cookie (12h TTL).
- Session data: `userId`, `locale`, `tmdbToken`.

### UI

- **shadcn/ui** (new-york style) + **Tailwind CSS v4** with CSS variables for theming.
- Dark theme default via `next-themes`. Theme/session/service-worker providers are in `/components/providers`.
- PWA-ready: standalone build output, service worker, pull-to-refresh gesture support.
- Path alias: `@/` maps to the repository root.

### Key Directories

| Path                    | Purpose                                                          |
|-------------------------|------------------------------------------------------------------|
| `/app`                  | Next.js App Router pages and layouts                             |
| `/services`             | TMDb API clients and data-fetching functions                     |
| `/models`               | TypeScript types/interfaces and `/models/dto` for raw API shapes |
| `/components`           | UI components (shadcn/ui-based)                                  |
| `/components/providers` | React context providers                                          |
| `/hooks`                | Custom React hooks                                               |
| `/lib`                  | Utilities (TMDB image loader, etc.)                              |
| `/config`               | API route templates                                              |