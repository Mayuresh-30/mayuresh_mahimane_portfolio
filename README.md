# Mayuresh Mahimane — AI Full Stack Developer Portfolio

A responsive, static portfolio built with React, TypeScript, and Vite. Profile, skills, experience, education, and project content are bundled from one JSON source file; no backend, database, or runtime API is required.

## Stack

- React 19 and TypeScript
- Vite
- Framer Motion, Lucide, and Simple Icons

## Source of truth

Edit [`src/data/portfolio.json`](./src/data/portfolio.json) to update profile details, skills, experience, education, projects, and links. `src/data/portfolio.ts` defines the TypeScript types and exports this JSON to the app. The rendered page and `dist/` production output are generated from that source; do not maintain a separate copy of the content.

Static images and icons are kept under `public/` and referenced by their public URL paths. All content shipped to the browser is public—do not place passwords, API keys, or private information in the JSON.

## Run locally (Windows)

Requirements: Node.js 20+ (npm is included). The project pins pnpm 10.18.0 in `package.json`.

```powershell
npx --yes pnpm@10.18.0 install
npx --yes pnpm@10.18.0 dev
```

Open <http://localhost:3000>. Vite serves the website and refreshes it as you edit files. There is no Python environment, database, `.env` file, or second service to start.

## Check and build

```powershell
npx --yes pnpm@10.18.0 check
npx --yes pnpm@10.18.0 build
npx --yes pnpm@10.18.0 preview
```

`pnpm build` type-checks the app and creates the static site in `dist/`. `pnpm preview` serves the production build locally, normally at <http://localhost:4173>.

## Publish

Deploy the contents of `dist/` to a static hosting provider. The site can be hosted without an application server or database. After changing portfolio content, rebuild and redeploy `dist/` to publish the update.

Email links open the visitor's email application using `mailto:`; GitHub, LinkedIn, and project links navigate directly to their destinations. The site does not submit or store contact messages.
