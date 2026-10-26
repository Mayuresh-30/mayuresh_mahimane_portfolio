# Mayuresh Mahimane Portfolio — Frontend-Only Plan

## Goal

Build and publish a polished, responsive portfolio as a static website using React, TypeScript, and Vite. The portfolio is a public presentation of Mayuresh's profile, skills, experience, education, projects, and contact links. It does not need a server-side application, database, login, admin editor, or visitor data storage.

The content is maintained in the repository and shipped with the frontend. Visitors load the site and its content from static files; the browser handles display and interactions. No Docker or Python runtime is needed to develop or deploy the site.

## Scope and principles

- Keep the existing portfolio sections and visual identity: Hero, About, Skills, Experience, Projects, Education, and Contact.
- Preserve responsive design, accessible navigation and controls, keyboard focus visibility, and support for `prefers-reduced-motion`.
- Keep project status filtering in the browser.
- Use direct `mailto:`, GitHub, LinkedIn, and project links. Do not add a message-submission form unless a separate form provider or backend is deliberately chosen.
- Do not add authentication, an admin interface, a database, a write API, analytics, or other visitor-data processing as part of this plan.
- Treat all data shipped to the browser as public. Never put credentials, API keys, or private information in portfolio content.
- Keep project claims accurate and avoid inventing live deployments, metrics, or capabilities.

## Source of truth and content flow

### Canonical content

`src/data/portfolio.json` is the single authoritative source for visitor-facing portfolio facts:

- Profile: name, headline, bio, portrait path, email, and social URLs.
- Experience and education records.
- Skills, categories, icon keys, and ordering.
- Projects, descriptions, statuses, repository/live URLs, technologies, and ordering.

Move the existing `seed/portfolio.json` to `src/data/portfolio.json` as part of the frontend-only conversion. The current `seed` name implies database seeding; it should no longer be used once the JSON is the actual site content source. Update imports and any asset references when moving it.

`src/data/portfolio.ts` remains the TypeScript boundary for this content: define and export the portfolio types, import the JSON, and expose a typed portfolio value for the app. It should not contain a second copy of portfolio records. Keep the JSON shape aligned with the types, and fix type/build errors when content fields change.

### Content-to-page flow

1. The owner edits `src/data/portfolio.json` to update portfolio facts.
2. The app imports that JSON through `src/data/portfolio.ts`.
3. `src/App.tsx` passes the relevant profile, skills, experience, education, and projects into the existing page sections.
4. Sections render the supplied content. UI-only presentation details (layout, labels, animation, decorative principles) may stay in components; biographical facts should not be duplicated in component constants.
5. Project filters and other simple interactions run locally in the browser and do not make API requests.
6. `pnpm build` type-checks and bundles the React app and JSON into `dist/`.
7. A static host serves the generated files. After changing content, rebuild and redeploy to publish the update.

The JSON is the source of truth; the browser bundle and `dist/` are generated outputs, not independent editable content stores. No runtime API request, database lookup, or network connection is required to display portfolio content.

### Content ownership and consistency

- Store each fact once in the JSON and render it wherever needed. For example, use the profile bio as the biography source rather than maintaining a separate, conflicting paragraph in the About section.
- Keep presentation-only copy in components only when it is not a personal fact that belongs in the portfolio data.
- Keep portrait and other static assets in `public/` (or another Vite-served asset location) and reference them with paths that work in the deployed site.
- Keep project statuses limited to `working`, `deployed`, or `completed`. A project marked `deployed` must have a real live URL; otherwise use the repository link where available.
- Do not duplicate JSON into TypeScript constants, a second data file, a CMS, or a database.

## Portfolio content

The current JSON contains the profile, skills, projects, experience, and education. Preserve and maintain those records as the canonical content; update facts only from information confirmed by the owner.

The initial featured projects are:

1. **AI Page Summarizer** — Completed; GitHub repository. A Chrome extension that summarizes the current webpage and supports follow-up questions.
2. **Resume Screening AI** — Working; GitHub repository. Parses resumes and job descriptions and uses an LLM to score and rank candidates.
3. **Full Stack E-Commerce** — Completed; GitHub repository. A Java/Spring Boot and React storefront with product discovery and cart features.
4. **Authentication System** — Completed; GitHub repository. A Spring Boot and React application demonstrating registration, login, protected pages, and JWT flows.

These statuses and descriptions are owner-maintained portfolio data, not behavior inferred from the frontend. No live URLs should be added until supplied and verified.

## What to keep

- React, React DOM, TypeScript, and Vite.
- Existing `src/App.tsx`, `src/main.tsx`, section components, reusable components, and CSS, subject to removing obsolete API/data-status behavior.
- `framer-motion` for restrained animation and `lucide-react` / `simple-icons` for icons, where currently used.
- `src/data/portfolio.ts` for the shared content types and JSON import.
- The canonical portfolio JSON (moved from `seed/` into `src/data/`).
- The supplied profile image and other assets actually referenced by the site.
- Static public files such as `index.html`, the favicon, and `public/manus-routes.json` if required by the hosting/preview environment.
- Frontend build, type-check, and preview scripts.

## What to remove or stop using

As part of implementing this plan, remove backend-only infrastructure and its setup burden:

- `portfolio_api/` including FastAPI routes, database access, SQLAlchemy models, and the MySQL seed script.
- Database configuration and migration files: `alembic.ini` and `portfolio_api/migrations/`.
- `requirements.txt` and Python/backend environment setup, provided no other project tooling depends on them.
- Database environment files or examples, such as `.env.example`, if they exist solely for MySQL.
- The `dev:api`, `db:migrate`, and `db:seed` scripts in `package.json`; make `pnpm dev` start Vite alone.
- `concurrently` if it is no longer used by any remaining script.
- The `/api` proxy from `vite.config.ts`.
- `src/lib/api.ts` and all API fetches, health checks, database state, fallback status messaging, and related loading/error states.
- README instructions for Python, MySQL, Alembic, API endpoints, and database seeding.

Do not remove or rename files only because they appear in the list above if inspection finds another active dependency on them. Confirm references and keep unrelated tooling intact.

## Frontend architecture and behavior

- **Application:** One React page composed from the existing sections and components.
- **Data:** Locally imported JSON, typed at the frontend boundary, with no dynamic remote content loading.
- **Navigation:** In-page links to the portfolio sections.
- **Projects:** Render records from the JSON, filter by status in component state, and link to the repository or verified live URL.
- **Contact:** Use `mailto:` for email and external links for GitHub and LinkedIn. No contact data is submitted to this site.
- **Assets:** Bundle or serve the portrait, favicon, and any used local assets as static files.
- **Motion and accessibility:** Retain useful motion and interaction feedback while honoring reduced-motion preferences and supporting keyboard users.
- **Failure behavior:** A missing or malformed bundled content file should be caught by TypeScript/build validation rather than hidden behind a runtime database fallback.

## Development, build, and deployment flow

### Local development

Requirements: Node.js and the repository's package manager (`pnpm`, currently pinned in `package.json`).

1. Install JavaScript dependencies with `pnpm install`.
2. Start the Vite development server with `pnpm dev`.
3. Open the local URL printed by Vite.
4. Edit source files or `src/data/portfolio.json`; Vite refreshes the local page.

There is no need to install Python, start a database, create a `.env` file, run migrations, seed data, or start a second service.

### Validation and production output

- `pnpm check` validates TypeScript.
- `pnpm build` runs the type-check and creates the production website in `dist/`.
- `pnpm preview` serves the built output locally for a production-like check.
- Deploy the contents of `dist/` to a static hosting provider. Configure the host to serve `index.html` for the root route; if additional client-side routes are introduced later, configure an appropriate static-host fallback.

Content-update flow:

`Edit src/data/portfolio.json` → `pnpm check` / `pnpm build` → review with `pnpm preview` → publish `dist/`.

No separate content synchronization step is required.

## Project structure

```text
mayuresh_mahimane_portfolio/
├── README.md                     # Frontend-only setup, checks, and static deployment
├── plan.md                       # This plan and architectural decisions
├── package.json                  # Frontend scripts and dependencies
├── pnpm-lock.yaml                # Locked JavaScript dependency versions
├── index.html                    # Vite HTML entry point
├── vite.config.ts                # Vite development/build configuration; no API proxy
├── public/
│   ├── favicon.svg
│   ├── manus-routes.json         # Keep if required by the preview environment
│   └── ...                       # Referenced static assets, including the portrait
└── src/
    ├── App.tsx                   # Page composition using the bundled portfolio data
    ├── main.tsx                  # React bootstrap
    ├── styles.css                # Site styling and responsive behavior
    ├── data/
    │   ├── portfolio.json        # Canonical content source of truth
    │   └── portfolio.ts          # Shared types and typed JSON export
    ├── components/               # Shared presentation components
    └── sections/                 # Hero, About, Skills, Experience, Projects, Education, Contact
```

Generated `dist/`, installed dependencies, and local caches are build/runtime outputs, not sources of truth.

## Visual direction

- **Design movement:** Calm technical editorial, combining clear typography and generous spacing with a subtle technical accent.
- **Core principles:** Let the work lead; keep hierarchy clear; make project status, technologies, and link behavior easy to understand; keep motion purposeful and accessible.
- **Color palette:** Deep blue-green charcoal background (`#0B1115`), layered slate surfaces (`#111B20`, `#1A282D`), warm off-white text (`#E7F1EE`), muted text (`#9DAFAC`), mint accent (`#73D7C2`), and limited periwinkle (`#A5B7FF`).
- **Layout:** Offset hero with text and portrait; categorized skill bands; compact experience timeline; editorial project cards; single-column mobile flow.
- **Signature details:** MM monogram, subtle orbit motif, thin mint timeline rules, subdued status pills, and monospaced metadata.
- **Motion:** Restrained section reveals, hover/focus feedback, and project-filter transitions; respect reduced-motion preferences.
- **Typography:** Space Grotesk for display, Inter for body/UI, and JetBrains Mono for technical labels, with suitable fallbacks.
- **Brand essence:** “Full-stack engineering with a practical AI edge.” Calm, curious, and dependable.

## Implementation sequence

1. Move the JSON content from `seed/portfolio.json` to `src/data/portfolio.json`, keep the types in `src/data/portfolio.ts`, and verify the content shape and asset paths.
2. Make the app render directly from the imported portfolio data; remove API loading, database status state, and the MySQL preview notice. Ensure biography facts are sourced consistently from the JSON.
3. Remove backend/database configuration, dependencies, scripts, and the Vite API proxy after checking for remaining references.
4. Update the README and this plan to describe frontend-only development and static deployment.
5. Run the frontend type-check and production build. Preview the built site and verify all sections, project filters, contact links, portrait, responsive layout, and reduced-motion behavior.

## Assumptions and future changes

- Portfolio facts and links are public and approved for display.
- The owner is comfortable publishing changes by rebuilding and redeploying rather than editing through an admin panel.
- No backend is required unless a future feature needs private data, message processing, dynamic user-specific content, or persistent writes.
- If a contact form or frequently updated CMS is needed later, treat it as a separate architectural decision and choose a trusted provider or backend deliberately; do not add database infrastructure preemptively.
