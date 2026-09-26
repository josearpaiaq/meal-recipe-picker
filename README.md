# Healthy Meal Picker

A frontend-only web app that suggests one healthy, tasty meal at a time and guides you through cooking it step by step. It's a personal tool: no accounts, no backend, and all user data stays on the device (localStorage).

## Features

- **Meal picker**: one suggestion at a time for breakfast, lunch or dinner (the default tab follows the time of day), with a max-time filter and "Something else" to rotate through candidates.
- **Recipe detail**: time, effort, servings, a "balanced plate" breakdown (veg, protein, grain, fat), an ingredient checklist and numbered steps.
- **Cooking mode**: step-by-step view with per-step timers, a segmented progress bar and screen wake lock. One active session at a time, with a confirm dialog before replacing it.
- **Global timer bubble**: running timers stay visible across the app and survive navigation, reloads and closing the tab. Sound and vibration fire when a timer finishes.
- **Favorites and history**: save recipes, log what you cooked and rate it 1–5. Suggestions rank favorites and higher-rated recipes first and skip anything cooked in the last 3 days.
- **Week planner**: a 7-day × 3-meal grid with "Fill empty slots" and a shopping list derived from the plan, grouped by aisle.
- **Pantry**: list what you have on hand; recipes that use more pantry items rank higher.
- **Bilingual**: English (default) and Spanish, for both UI and recipe content.
- **Responsive and installable**: bottom nav on phone, side nav on desktop, and a web app manifest so it installs to the home screen.

## Tech stack

| Concern         | Choice                                     |
| --------------- | ------------------------------------------ |
| Framework       | Next.js 16 (App Router), TypeScript strict |
| Styling         | Tailwind CSS v4, tokens via `@theme`       |
| i18n            | next-intl, locale-prefixed routes          |
| Client state    | Zustand with `persist` (localStorage)      |
| Data validation | Zod                                        |
| Tests           | Vitest + React Testing Library             |
| Lint / format   | ESLint + Prettier                          |
| Package manager | pnpm                                       |

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). It redirects to `/en`; use the EN / ES switch to change language.

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | Start the dev server               |
| `pnpm build`        | Production build                   |
| `pnpm start`        | Serve the production build         |
| `pnpm lint`         | Run ESLint                         |
| `pnpm typecheck`    | Generate route types and run `tsc` |
| `pnpm test`         | Run the test suite once            |
| `pnpm test:watch`   | Run tests in watch mode            |
| `pnpm format`       | Format with Prettier               |
| `pnpm format:check` | Check formatting                   |

To regenerate the PWA icons in `public/icons`: `node scripts/generate-icons.mjs`.

## Project structure

The code is organized by feature. Route files compose features; features own their UI, state and logic; shared code knows nothing about features.

```
src/
  app/[locale]/        routes: picker, recipes/[id], recipes/[id]/cook, week, saved, pantry
  features/
    recipes/           types, Zod schema, curated recipe data, repository, components
    picker/            suggest() ranking logic and picker screen
    cooking/           session store, timers, wake lock, cooking mode, timer bubble
    favorites/         favorites, history and ratings
    planner/           week plan, fill-week logic, shopping list
    pantry/            pantry list
  shared/              UI primitives (Button, Chip, Dialog, nav...), hooks, helpers
  i18n/                next-intl routing and request config
  styles/globals.css   Tailwind and design tokens
messages/              en.json, es.json (UI strings)
docs/                  frontend spec
```

Conventions:

- Other code imports a feature only through its public `index.ts` (`@/features/<name>`).
- Business logic lives in pure functions under each feature's `lib/`, with unit tests next to them.
- Recipe data is read only through `features/recipes/repository.ts`.
- Derived values (shopping list, remaining time, suggestions) are computed, never stored.
- Timers are stored as `endsAt` timestamps and read from one shared ticking clock (`useNow`).

## Data

Recipes are a curated set stored as TypeScript files in `src/features/recipes/data/`, one per recipe, with English and Spanish text. A test validates every recipe against the Zod schema. Images live in `public/recipes/`.

User data is persisted per feature in localStorage:

| Store     | Key               | Holds                              |
| --------- | ----------------- | ---------------------------------- |
| cooking   | `mp.cooking.v1`   | active cooking session             |
| favorites | `mp.favorites.v1` | favorite ids, history, ratings     |
| planner   | `mp.planner.v1`   | week plans, checked shopping items |
| pantry    | `mp.pantry.v1`    | pantry ingredient keys             |

## Known limitations

- Timers that finish while the browser is in the background or the phone is locked don't alert; the bubble shows them as finished when you return.
- Screen wake lock depends on browser support.
- All data is per device and browser, so clearing site data erases it.

See [`docs/Healthy Meal Picker — Frontend Spec.md`](docs/Healthy%20Meal%20Picker%20%E2%80%94%20Frontend%20Spec.md) for the full spec.
