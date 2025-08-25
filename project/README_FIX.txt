
# Fixed Project: Frontend (Vite React) + Vercel Serverless API

## What I changed
1. **Vercel serverless functions** converted to ESM with `export default (req, res)` and proper imports.
2. **DB path fixed** for serverless runtime: `process.cwd()/db.json`.
3. **Vercel routing** updated to serve the built SPA from `/dist` and handle client-side routes:
   - `/api/*` -> serverless functions
   - Files with dots (`/(.*\..*)`) -> `/dist/$1`
   - All other paths -> `/dist/index.html` (SPA fallback)

## How to run locally
1. `cd project`
2. `npm install`
3. `npm run dev`
   - Your app runs at `http://localhost:5173`

> The mock backend uses `project/db.json`. The API functions are designed for **Vercel** serverless. For local dev, your UI works fully in-memory. If you want to run APIs locally, deploy to Vercel or run a small Node adapter.

## How to deploy on Vercel
1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. Import into **Vercel**.
3. Confirm the following (Vercel usually auto-detects):
   - **Root directory**: `project`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Node.js version: 18
4. Click **Deploy**.

### API endpoints (serverless)
- `POST /api/login` — expects JSON body for student/mentor login (stored in `db.json`).
- `GET /api/students` — list students from `db.json`.
- `POST /api/students` — add a new student (auto-increment `id`).

## Notes
- Do not move `db.json` out of the project root; serverless functions reference it via `process.cwd()`.
- If you refresh on a client route (e.g., `/dashboard`), the SPA fallback in `vercel.json` serves `index.html` correctly.
