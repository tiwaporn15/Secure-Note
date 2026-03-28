# Deploy Checklist: Frontend to Vercel & Backend to Render

## ✅ Fase 1: Code Preparation (COMPLETED)
- [x] Fixed Cookie settings: `SameSite=None; Secure` in server.js (login & logout)
- [x] Updated CORS: Now uses `process.env.FRONTEND_URL` instead of hardcoded localhost
- [x] Updated config.js: Now uses `VITE_API_BASE` environment variable
- [x] Created .env.example for backend configuration reference

## 📋 Fase 2: Deploy Backend to Render
1. ( ) Go to https://render.com and sign in
2. ( ) Click **New +** → **Web Service**
3. ( ) Connect GitHub account and select the repository
4. ( ) Configure service:
   - Name: `securenote-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. ( ) Add Environment Variables:
   - `PORT`: `3001`
   - `POCKETHOST_TOKEN`: `20260301eink` (from your .env)
   - `FRONTEND_URL`: *(leave empty for now)*
6. ( ) Click **Create Web Service**
7. ( ) **Copy the Backend URL** when deployment finishes (e.g., `https://securenote-backend.onrender.com`)

## 📋 Fase 3: Deploy Frontend to Vercel
1. ( ) Go to https://vercel.com and sign in
2. ( ) Click **Add New...** → **Project**
3. ( ) Import frontend repository from GitHub
4. ( ) Configure Environment Variables:
   - Name: `VITE_API_BASE`
   - Value: `https://securenote-backend.onrender.com/api` (paste Backend URL + /api)
5. ( ) Click **Deploy**
6. ( ) **Copy the Frontend URL** when deployment finishes (e.g., `https://your-app.vercel.app`)

## 📋 Fase 4: Update Render with Frontend URL
1. ( ) Go back to Render Backend project
2. ( ) Go to **Environment** tab
3. ( ) Find `FRONTEND_URL` variable
4. ( ) Set value to: `https://your-app.vercel.app` (from Fase 3)
5. ( ) Save (Render auto-restarts the service)

## 🧪 Testing
After all steps:
- ( ) Visit your Vercel Frontend URL
- ( ) Try logging in with: `user123` / `password123`
- ( ) Check that cookies are being sent in requests
- ( ) Verify notes can be created and retrieved
