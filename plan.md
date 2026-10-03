# Mayuresh Mahimane — AI Full Stack Developer Portfolio Plan

## Goal

Build a polished, responsive portfolio for Mayuresh Mahimane, presented as an **AI Full Stack Developer**, showcasing full-stack Java and React experience alongside Python AI projects and current learning in LLMs, RAG, and vector databases. Use the supplied portrait as the only site photo for now; do not add project screenshots. Build a working local-development experience with a React frontend, FastAPI backend, and MySQL support. **Do not use or require Docker.** Do not install PostgreSQL or a new database server. A public deployment is not requested.

## Profile and content

- Display name: **Mayuresh Mahimane**.
- Role/headline: **AI Full Stack Developer**.
- Bio: “I’m an AI Full Stack Developer blending solid software engineering with practical AI. I build end-to-end applications—from responsive React experiences and Java/Python APIs to LLM-powered tools—and explore RAG and vector databases to make AI features useful, reliable, and accessible.” This keeps current learning interests framed as exploration rather than overstated expertise.
- Use the portrait the user supplied, stored as a project media asset. No generated substitute.
- Display the resume email `mayureshmahimane3005@gmail.com`, LinkedIn `https://www.linkedin.com/in/mayuresh-mahimane-0895b730b/`, and GitHub `https://github.com/Mayuresh-30`. Do not display the resume phone number.
- Sections: Hero, About, Skills, Experience, Education, Projects, Contact.
- Skills from the resume: Java, SQL, JavaScript, Python; Spring Boot, Spring Security, Spring Data JPA, Hibernate, React; MySQL, MongoDB; Git, GitHub, Maven, IntelliJ IDEA, Postman. Show AI, LLMs, RAG, and vector databases separately as **Currently Exploring**.
- Experience: Full Stack Developer at TechnoHacks Solutions Pvt. Ltd. (Remote), June–July 2026, summarized accurately from the resume.
- Education: B.Sc. Computer Science, Shri Shivaji Science And Arts College, Chikhli; graduated 2026; CGPA 7.25/10.

## Featured projects

Use concise summaries grounded in each repository README. Do not invent live links. No project card has an image. Only Resume Screening AI was explicitly marked Working; provisionally mark the other three GitHub-only projects Completed and allow statuses to be changed.

1. **AI Page Summarizer Chrome Extension** — Completed — `https://github.com/Mayuresh-30/ai-page-summarizer`. Extracts the current webpage, generates a concise AI summary, and supports follow-up questions through chat. Tags: React, JavaScript, Chrome Extension APIs, HTML, CSS, AI.
2. **Resume Screening AI** — Working — `https://github.com/Mayuresh-30/resume-screening-ai`. Parses PDF/DOCX resumes and job descriptions, extracts structured candidate details, and uses a Groq-integrated LLM to score job fit out of 100 and rank candidates. Tags: Python, Groq, LLM, Pydantic, PDF/DOCX. No image.
3. **Full Stack E-Commerce** — Completed — `https://github.com/Mayuresh-30/Full-Stack-E-commerce`. Java/Spring Boot and React/Vite commerce app with JWT auth, product browsing/search/filtering/pagination, product detail, and session-ID cart. Tags: Java, Spring Boot, Spring Security, JWT, MySQL, React, Vite, Tailwind CSS.
4. **Authentication System** — Completed — `https://github.com/Mayuresh-30/AuthenticationSystem`. Spring Boot/Spring Security and React app with registration/login, protected views, JWT access/refresh-token flow, and authenticated user info. Tags: Java, Spring Boot, Spring Security, JWT, React, Vite, Axios, React Router.

Statuses are Working, Deployed, or Completed. Working/Completed cards open their GitHub repository; Deployed cards open their live URL. No live URLs have been provided, so none starts as Deployed. External links open safely in a new tab.

## Technical approach

- **Frontend:** React + TypeScript + Vite, reusable page sections/components, Simple Icons technology marks with readable labels, and Framer Motion for restrained transitions. Support responsive mobile layout, keyboard access, visible focus, and `prefers-reduced-motion`.
- **Backend:** Python + FastAPI + Pydantic + SQLAlchemy 2.x + Alembic. FastAPI exposes read-only `/api/health`, `/api/profile`, `/api/projects`, and `/api/skills` endpoints. During local development, Vite serves the site on port 3000 and proxies `/api` to FastAPI on port 8000. This runs with ordinary Node/Python commands and virtual environments—**no Docker installation or container build**.
- **Database:** MySQL tables for profile, projects, skills, and project_skills. Use integer IDs and omit project slug. Project image path is nullable; all initial project image values are empty. Store the portrait as a media asset and retain its path in profile data, not image bytes in MySQL.
- **MySQL availability:** Use an environment-based connection string, with a clearly marked password placeholder such as `yourPassword` in `.env.example`; the user will replace it with their own local MySQL password. Never commit real passwords or embed credentials in frontend code. Do not install PostgreSQL or a database server. If MySQL is not reachable in the current preview sandbox, serve initial records from versioned JSON seed content until a local MySQL connection is configured; state clearly that persistence is not connected in that mode. PostgreSQL migration is a future task and dialect differences must be tested.
- **Content editing:** Do not provide a web admin or write API for this public portfolio. Maintain the database content through MySQL Workbench or edit the versioned seed JSON.
- **Serving:** provide `pnpm dev` for Vite and documented Python commands (or a convenience script) for FastAPI; Vite proxies API requests to the backend. Build frontend assets separately for later deployment if needed, without Docker. Provide `/manus-routes.json` for `/` before starting Preview.

## Project structure

```text
/home/ubuntu/mayuresh/
├── README.md                      # No-Docker setup, local run, MySQL and read-only API instructions
├── plan.md                        # Design and implementation decisions
├── package.json / pnpm-lock.yaml  # React/Vite/TypeScript dependencies and scripts
├── requirements.txt               # FastAPI, Uvicorn, SQLAlchemy, MySQL driver, Alembic
├── .env.example                   # Placeholder only, including `yourPassword`; never real credentials
├── .gitignore                     # Exclude .env, caches, local files and generated assets
├── index.html                     # Vite document
├── vite.config.ts                 # Dev server and /api proxy to FastAPI port 8000
├── public/
│   ├── manus-routes.json          # Website route declaration
│   └── favicon.svg                # MM monogram
├── src/
│   ├── main.tsx                   # React bootstrap
│   ├── App.tsx                    # Page composition and routing
│   ├── data/portfolio.ts          # Typed fallback records for preview
│   ├── components/                # Header, skill/project cards, badges, filters
│   ├── sections/                  # Hero, About, Skills, Experience, Education, Projects, Contact
│   ├── lib/api.ts                 # Same-origin API client and models
│   └── styles/                    # Theme, typography, responsive layout, motion
├── portfolio_api/
│   ├── main.py                    # FastAPI routes and health endpoint
│   ├── database.py                # Environment-based MySQL setup
│   ├── models.py                  # SQLAlchemy tables without slug
│   ├── routes/                    # Public read-only endpoints
│   └── migrations/                # Alembic revisions
└── seed/portfolio.json            # Preview content if MySQL is unavailable
```

## Visual direction

- **Design movement:** calm technical editorial, combining Swiss-inspired typography and intentional spacing with a subtle cybernetic accent.
- **Core principles:** let the work lead; keep hierarchy clear and breathing room generous; make project status/tech/link behavior explicit; keep motion purposeful and accessible.
- **Color philosophy:** deep blue-green charcoal for calm focus, layered slate surfaces for depth, warm off-white text for comfortable reading, soft mint as a reassuring technical signature, and limited periwinkle for AI accents. Tokens: background `#0B1115`, surface `#111B20`, raised surface `#1A282D`, text `#E7F1EE`, muted text `#9DAFAC`, mint `#73D7C2`, secondary `#A5B7FF`.
- **Layout:** offset left-aligned hero with text and portrait; categorized horizontal skill bands; compact experience timeline; editorial project cards rather than a dense dashboard grid; single-column mobile flow.
- **Signature elements:** an `MM` monogram with a small orbit dot; thin mint timeline/connector rules; subdued status pills and monospaced metadata.
- **Interactions and animation:** useful hover/focus feedback; one-time hero fade/slide; small staggered section/card reveals; subtle project-card elevation; quick filter transitions; short mobile-menu transition; respect reduced motion.
- **Typography:** Space Grotesk for display, Inter for body/UI, JetBrains Mono for small technical labels, with fallbacks.
- **Brand essence:** “Full-stack engineering with a practical AI edge.” Personality: calm, curious, dependable.
- **Brand voice examples:** “AI ideas, built into useful software.” and “From responsive interfaces to LLM-powered tools.”
- **Wordmark:** custom inline `MM` ligature and orbital dot paired with the full name.
- **Signature brand color:** soft mint `#73D7C2`.

## Implementation and verification

1. Set up React/TypeScript/Vite and FastAPI source, local run scripts, route manifest, content seed, and safe environment example.
2. Add the user-provided portrait to project storage and build the complete responsive public portfolio with README-based project descriptions and technology icons.
3. Add MySQL SQLAlchemy models/migrations, read-only public API responses, and seed fallback when local MySQL is unreachable.
4. Run Vite and FastAPI without Docker, verify the preview, API response and route manifest, and inspect desktop/mobile rendering. Run frontend and backend checks and resolve actionable errors.

## Assumptions and risks

- The three projects without explicit status were provisionally set to Completed; the user can change them.
- No live links were supplied, so none is marked Deployed.
- The user-approved resume email is displayed; phone number is not.
- The local MySQL server may not be reachable from the managed preview sandbox. Use seed content there until a reachable MySQL configuration is supplied; do not claim active persistence prematurely.
- `.env.example` may contain the literal placeholder `yourPassword`, but no real credentials. Public APIs expose no write operations.
- The app will run locally using Vite and Python/FastAPI; no Docker is installed or required, and no public deployment is performed.
