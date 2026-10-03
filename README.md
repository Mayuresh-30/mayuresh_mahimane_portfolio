# Mayuresh Mahimane — AI Full Stack Developer Portfolio

A responsive portfolio built with React, TypeScript, and Vite, with a FastAPI backend and MySQL content store. It includes project, skills, experience, education, and contact sections. The public API is read-only; there is no login or admin editor.

## Stack

- React 19, TypeScript, Vite, Framer Motion
- Python 3.11+, FastAPI, SQLAlchemy, Alembic
- MySQL

## Run locally (Windows)

Requirements: Node.js 20+, pnpm 10.18.0, Python 3.11+, and a MySQL Server. MySQL Workbench can connect to the server but does not replace it.

1. Create the database in MySQL Workbench:

   ```sql
   CREATE DATABASE portfolioConn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your local MySQL credentials. Keep `.env` private.

3. Install Python packages and create the schema/content:

   ```powershell
   py -3 -m venv .venv
   .\.venv\Scripts\Activate.ps1
   python -m pip install -r requirements.txt
   pnpm db:migrate
   pnpm db:seed
   ```

4. Install frontend packages and start both services:

   ```powershell
   corepack prepare pnpm@10.18.0 --activate
   pnpm install
   pnpm dev
   ```

   Open <http://localhost:3000>. The API is on port 8000. The seed command loads starter content; running it again overwrites matching starter records.

## API

- `GET /api/health` — API and database status
- `GET /api/profile` — profile, experience, education, and contact links
- `GET /api/skills` — visible skills
- `GET /api/projects` — published projects; filter with `?status=working`, `?status=deployed`, or `?status=completed`

## Project checks

```powershell
pnpm check
pnpm build
python -m compileall portfolio_api
```
