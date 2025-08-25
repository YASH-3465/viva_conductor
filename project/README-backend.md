
# Project (Frontend) + Simple Backend (Vercel serverless functions)

This bundle contains your original frontend (in `/project`) and a minimal backend implemented as Vercel-style serverless functions under `/project/api`.

## What I added
- `project/api/login.js` - POST { email, password } -> returns basic token and user
- `project/api/students.js` - GET list, POST add student
- `project/api/sessions.js` - GET list, POST create session
- `project/api/results.js` - GET list, POST save result
- `project/db.json` - simple file-based datastore (used by the API)
- `project/vercel.json` - Vercel config to expose the serverless functions
- `project/README-backend.md` - short developer notes and how to call the APIs

## How the API works
- Each file in `/api` is a Node.js serverless function. They read/write `db.json` in the project root.
- Authentication is intentionally minimal (base64 token of user info). Replace with JWT + secure password hashing for production.

## Local testing
You can test the serverless functions locally using `vercel dev` (install Vercel CLI).

1. Install Vercel CLI
   ```bash
   npm i -g vercel
   ```
2. From the `project` folder run:
   ```bash
   vercel dev
   ```
   This will serve the frontend and the `/api` endpoints.

Example curl:
```bash
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email":"student@example.com","password":"studentpass"}'
```

## Deploying to Vercel
1. Create a Vercel account and connect your Git repo or drag-and-drop this project folder in the Vercel dashboard.
2. Vercel will detect `vercel.json` and expose the serverless functions in `/api`.
3. After deploy, your API endpoints will be at:
   `https://<your-deployment>.vercel.app/api/login`, etc.

## Notes and next steps
- Move from file-based db to a real DB (Postgres, MongoDB). For Vercel, use PlanetScale, Supabase, or Neon.
- Replace the mock token with JWT (`jsonwebtoken`) and hash passwords with `bcrypt`.
- Harden CORS and validation.
