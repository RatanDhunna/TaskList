# TaskList deployment instructions

These files are replacements/additions for https://github.com/RatanDhunna/TaskList.
Copy them into the same paths in the repository, commit, and push to `main`.
Do not replace the existing Controllers, Schema, or package.json files.

## 1. MongoDB Atlas
- Create a cluster and database user, and configure network access for your Render backend.
- Copy the Atlas connection string. Keep it secret and do not commit `.env` files.
- If you use a broad network allowlist for a hosted service, use strong database credentials and least-privilege access.

## 2. Render (backend)
- New Web Service -> connect GitHub repo `RatanDhunna/TaskList`.
- Root Directory: `Backend`
- Build Command: `npm install`
- Start Command: `node index.js`
- Environment variables: `MONGODB_URI` = actual Atlas URI; `FRONTEND_URL` = your Netlify URL once known.
- Render sets PORT automatically. The code respects it.
- Deploy, then open https://YOUR-SERVICE.onrender.com/ and confirm JSON response.

## 3. Netlify (frontend)
- Import GitHub repository `RatanDhunna/TaskList`.
- The root `netlify.toml` sets base `Frontend/TaskList`, build `npm run build`, publish `dist`, and SPA redirects.
- Set environment variable `VITE_API_URL` = `https://YOUR-SERVICE.onrender.com` (no trailing slash).
- Deploy. Vite environment variables are compiled at build time, so redeploy after changes.

## 4. Finish
- Update Render `FRONTEND_URL` to the exact Netlify site origin, e.g. `https://YOUR-SITE.netlify.app` (no trailing slash), and redeploy/restart if necessary.
- Test create, read, edit, delete, search, and direct navigation/refresh of `/home` and `/search`.
- Never place MongoDB credentials in frontend environment variables.

## Local development
- In `Backend`, create `.env` with your local MONGODB_URI and optional `FRONTEND_URL=http://localhost:5173`.
- In `Frontend/TaskList`, create `.env` with `VITE_API_URL=http://localhost:3000`.
- Start backend with `npm run dev` and frontend with `npm run dev` in their respective directories.
