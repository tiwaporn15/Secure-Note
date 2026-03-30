# SecureNote — Full-Stack Secure Notes Application

A modern, full-stack secure notes web application built with **React** (frontend) and **Node.js/Express** (backend) with cloud persistence via **PocketHost**.

## Key Features

- **Session-based Authentication** with HttpOnly cookies and duplicate username detection
- **Full CRUD Operations** (Create, Read, Update, Delete)
- **Real-time Search** by title and content
- **Smart Sorting** — date (newest/oldest) or name (A-Z)
- **Full Timestamps** with date and time display
- **Cloud Persistence** with PocketHost (survives server restart)
- **Loading States** with skeleton loaders
- **Professional Design** — 2 consolidated fonts (Cormorant Garamond + Raleway)
- **Efficient Code** — Reusable components, optimized rendering
- **Deployed on Vercel** with HTTPS

**Live Demo:** [https://secure-note-66010309.vercel.app](https://secure-note-66010309.vercel.app)  
**Frontend Dashboard:** [https://vercel.com/tiwaporn15s-projects/secure-note-66010309](https://vercel.com/tiwaporn15s-projects/secure-note-66010309)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Prerequisites](#prerequisites)
5. [Installation & Setup](#installation--setup)
6. [Development Workflow](#development-workflow)
7. [API Documentation](#api-documentation)
8. [Environment Variables](#environment-variables)
9. [Deployment](#deployment)
10. [Security](#security)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

SecureNote is a demonstration of full-stack web development fundamentals, showcasing:

- **Frontend Architecture:** Component-based React with hooks (useState, useEffect), Virtual DOM, and unidirectional data flow
- **Backend Architecture:** Express.js API with middleware, session-based authentication, and data validation
- **Communication:** HTTP/HTTPS with JSON payloads, HttpOnly session cookies
- **Deployment:** Vercel frontend + Render backend + PocketHost database
- **Security:** Environment-based secret management, session cookies, HTTPS in production

The application is designed as both a **functional utility** (actually usable note-taking app) and a **learning resource** (demonstrates core web development concepts).

### Use Cases

- **Students:** Learn full-stack development from a working example
- **Learners:** Understand how frontend and backend communicate
- **Developers:** Reference for authentication patterns, API design, and React patterns
- **Users:** Actually save and manage secure notes

---

## Project Structure

```
secure-note-app/
├── backend/                    # Node.js/Express server
│   ├── .env                    # Environment variables (NEVER commit)
│   ├── .env.example            # Template for .env (safe to commit)
│   ├── .gitignore              # Ignore .env, node_modules, logs
│   ├── server.js               # Express app, routes, middleware
│   ├── package.json            # Dependencies: express, dotenv, cors, etc.
│   ├── package-lock.json       # Lock file for reproducible builds
│   └── api/                    # Vercel serverless functions (optional)
│       ├── auth.js             # POST /api/auth
│       ├── notes.js            # GET/POST /api/notes
│       └── notes/[id].js       # PATCH/DELETE /api/notes/:id
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── pages/              # Page components (route views)
│   │   │   ├── LoginPage.jsx   # Authentication UI
│   │   │   ├── NotesPage.jsx   # Main notes grid, search, sort, compose
│   │   │   ├── AboutPage.jsx   # Project information
│   │   │   └── ContactPage.jsx # Contact information
│   │   │
│   │   ├── components/         # Reusable UI components
│   │   │   ├── NoteCard.jsx    # Single note display + edit/delete
│   │   │   ├── ComposePanel.jsx# New note creation form
│   │   │   ├── EditModal.jsx   # Edit existing note modal
│   │   │   ├── SearchBar.jsx   # Real-time search input (persistent)
│   │   │   └── SearchModal.jsx # Alternative search modal
│   │   │
│   │   ├── App.jsx             # Root component, routing, auth state
│   │   ├── main.jsx            # Entry point, React.createRoot()
│   │   ├── index.css           # Global styles with CSS variables
│   │   ├── config.js           # API endpoint configuration
│   │   └── assets/             # Images, fonts, etc.
│   │
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite bundler configuration
│   ├── package.json            # Dependencies: react, react-dom, etc.
│   ├── package-lock.json
│   └── .gitignore
│
├── REPORT.md                   # Technical report (full documentation)
├── DEPLOY_CHECKLIST.md         # Pre-deployment verification
├── README.md                   # This file
├── .gitignore                  # Root-level git ignore
└── vercel.json                 # Vercel deployment configuration
```

### File Responsibilities

| File/Folder | Purpose |
|-------------|---------|
| `backend/server.js` | API routes, middleware, PocketHost integration |
| `backend/.env` | Secrets: `POCKETHOST_TOKEN`, `PORT`, `FRONTEND_URL` |
| `frontend/App.jsx` | Auth state, page routing, session management |
| `frontend/pages/` | Full-page components (LoginPage, NotesPage) |
| `frontend/components/` | Reusable UI blocks (NoteCard, ComposePanel) |
| `vercel.json` | Build & environment variable settings |

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.x | UI library, component model, hooks |
| **Vite** | 5.x | Lightning-fast bundler, dev server |
| **JavaScript (ES6+)** | — | Language, async/await, destructuring |
| **CSS3** | — | Styling, animations, responsive design |

**Key Libraries:**
- `react` — Component framework
- `react-dom` — React rendering engine
- `axios` or `fetch API` — HTTP requests (alternatively)

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18.x LTS | JavaScript runtime, package manager |
| **Express.js** | 4.x | Web server framework |
| **dotenv** | — | Environment variable management |
| **CORS** | — | Cross-Origin Resource Sharing middleware |

**Key Libraries:**
- `express` — HTTP server
- `dotenv` — Load `.env` files into `process.env`
- `cors` — Handle CORS in production
- `body-parser` (built-in) — Parse JSON payloads

### Infrastructure

| Service | Purpose | Cost |
|---------|---------|------|
| **Vercel** | Frontend hosting + serverless backend | Free tier available |
| **PocketHost** | Cloud database (PocketBase) | Free tier available |
| **GitHub** | Source control, CI/CD trigger | Free |

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js v18 or higher**
  ```bash
  node --version  # Should be v18.0.0 or higher
  ```

- **npm v9 or higher** (comes with Node.js)
  ```bash
  npm --version  # Should be v9.0.0 or higher
  ```

- **Git** (for version control)
  ```bash
  git --version
  ```

- **A text editor** (VS Code, Sublime, etc.)

- **A modern web browser** (Chrome, Firefox, Edge, Safari)



## Installation and Setup

### Step 1: Clone or Download the Repository

```bash
# Clone from GitHub (if hosted there)
git clone https://github.com/yourusername/secure-note-app.git
cd secure-note-app

# OR: Download as ZIP and extract
# Then: cd secure-note-app
```

### Step 2: Backend Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env
# OR manually create .env with content below:
# PORT=3001
# POCKETHOST_TOKEN=pb_your_token_here
# FRONTEND_URL=https://secure-note-66010309.vercel.app

# 3. Edit .env with your actual secrets
# (Use a text editor, NEVER commit this file)

# 4. Start the backend server
npm start
# Expected output:
# Server running on http://localhost:3001
```

**Backend Checklist:**
- npm install completed without errors
- .env file created with all three variables
- Server started on http://localhost:3001
- No errors in terminal output

### Step 3: Frontend Setup (new terminal window)

```bash
# Navigate to frontend (from project root)
cd frontend

# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# Expected output:
# Local: http://localhost:5173
# opening browser...
```

**Frontend Checklist:**
- npm install completed without errors
- Dev server started on http://localhost:5173
- Browser opened automatically
- See login page (should show input field for password)

### Step 4: Test the Application

1. **Open browser** → http://localhost:5173
2. **Login page appears** → Create an account or log in with existing credentials
3. **Click Login** → Session is created, redirected to NotesPage
4. **Create a note** → Title + Content → Click Save
5. **Note appears** → In grid above the form
6. **Delete a note** → Click delete button, confirm
7. **Logout** → Redirected back to login page

If all steps work, your local setup is complete!

---

## Development Workflow

### Running Both Servers Locally

You need **two terminal windows**:

**Terminal 1: Backend**
```bash
cd backend
npm start
# Keep this running, shows: "Server running on http://localhost:3001"
```

**Terminal 2: Frontend**
```bash
cd frontend
npm run dev
# Keep this running, shows: "Local: http://localhost:5173"
```

**Terminal 3 (optional): Git/other commands**
```bash
cd secure-note-app
# Use for git commits, installs, etc.
```

### Development Mode Features

- **Hot Module Replacement (HMR):** Edit React files → automatically reload in browser
- **API Proxy:** Frontend requests to `/api/*` are automatically forwarded to `localhost:3001`
- **CORS bypass:** Vite dev server proxies requests (no CORS errors)
- **Source maps:** Error messages point to original JSX/JS files (not minified)

### File Editing Cycle

1. **Edit** a component in `frontend/src/pages/*.jsx` or `frontend/src/components/*.jsx`
2. **Save** the file (Ctrl+S)
3. **Watch** browser automatically refresh with changes
4. **Test** the new behavior in browser

**Same for backend:**
1. **Edit** `backend/server.js`
2. **Save** the file
3. **Restart** the backend server (Ctrl+C, then `npm start`)
4. **Test** the API with Postman or browser DevTools

### Common Development Commands

```bash
# Install a new package (frontend example)
cd frontend
npm install axios

# Install a dev-only package
npm install --save-dev @vitejs/plugin-react

# Update all packages to latest versions
npm update

# Check for outdated packages
npm outdated

# View installed packages and versions
npm list
```

---

## API Documentation

### Base URL

| Environment | Frontend | Backend |
|-------------|----------|----------|
| **Development** | http://localhost:5173 | http://localhost:3001 |
| **Production** | https://secure-note-66010309.vercel.app | https://securenote-backend.onrender.com |

### Authentication

All endpoints require a valid session cookie (set automatically during login):

```http
Cookie: sessionId=session_1234567890_abc123
```

Example with curl (preserves cookies):
```bash
curl -b cookies.txt -c cookies.txt https://securenote-backend.onrender.com/api/notes
```

### Endpoints

#### 1. **POST /api/register** — Create Account
Create a new user account.

**Request:**
```http
POST /api/register HTTP/1.1
Host: securenote-backend.onrender.com
Content-Type: application/json

{
  "username": "alice",
  "password": "MySecurePassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "Account created successfully!",
  "username": "alice"
}
```

**Response (409 Conflict):**
```json
{
  "error": "Username already exists"
}
```

---

#### 2. **POST /api/login** — Login & Create Session
Authenticate with username/password and receive a session cookie.

**Request:**
```http
POST /api/login HTTP/1.1
Host: securenote-backend.onrender.com
Content-Type: application/json

{
  "username": "alice",
  "password": "MySecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "username": "alice"
}
```

Sets HttpOnly cookie: `sessionId=session_173...` automatically.

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized",
  "message": "Invalid username or password"
}
```

**Use Case:** Frontend calls during login; browser automatically stores cookie.

---

#### 3. **GET /api/me** — Restore Session
Check if user has an active session (called on page refresh).

**Request:**
```http
GET /api/me HTTP/1.1
Host: securenote-backend.onrender.com
Cookie: sessionId=session_173...
```

**Response (200 OK):**
```json
{
  "username": "alice"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Not authenticated"
}
```

**Use Case:** Frontend calls on App mount to restore login state.

---

#### 4. **GET /api/notes** — List All Notes
Retrieve all notes (requires session).

**Request:**
```http
GET /api/notes HTTP/1.1
Host: securenote-backend.onrender.com
Cookie: sessionId=session_173...
```

**Response (200 OK):**
```json
[
  {
    "id": "note_001",
    "title": "Shopping List",
    "content": "Milk, eggs, bread...",
    "created": "2026-03-29T10:00:00Z"
  }
]
```

---

#### 5. **POST /api/notes** — Create Note
Create a new note (requires session).

**Request:**
```http
POST /api/notes HTTP/1.1
Host: securenote-backend.onrender.com
Content-Type: application/json
Cookie: sessionId=session_173...

{
  "title": "New Note",
  "content": "This is the note content."
}
```

**Response (201 Created):**
```json
{
  "id": "note_abc123",
  "title": "New Note",
  "content": "This is the note content.",
  "created": "2026-03-29T12:00:00Z"
}
```

---

#### 6. **PATCH /api/notes/:id** — Update Note
Update an existing note (requires session).

**Request:**
```http
PATCH /api/notes/note_001 HTTP/1.1
Host: securenote-backend.onrender.com
Content-Type: application/json
Cookie: sessionId=session_173...

{
  "title": "Updated Title",
  "content": "Updated content here..."
}
```

**Response (200 OK):**
```json
{
  "id": "note_001",
  "title": "Updated Title",
  "content": "Updated content here...",
  "created": "2026-03-29T10:00:00Z"
}
```

---

#### 7. **DELETE /api/notes/:id** — Delete Note
Delete a note by ID (requires session).

**Request:**
```http
DELETE /api/notes/note_001 HTTP/1.1
Host: securenote-backend.onrender.com
Cookie: sessionId=session_173...
```

**Response (200 OK):**
```json
{
  "message": "Note deleted successfully"
}
```

---

#### 8. **POST /api/logout** — End Session
Clear the session cookie.

**Request:**
```http
POST /api/logout HTTP/1.1
Host: securenote-backend.onrender.com
Cookie: sessionId=session_173...
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

Clears cookie automatically.

---

### Testing the API with cURL

```bash
# 1. Register
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"MySecurePassword123"}'

# 2. Login (save cookies)
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username":"alice","password":"MySecurePassword123"}'

# 3. Get all notes (use saved cookies)
curl http://localhost:3001/api/notes -b cookies.txt

# 4. Create a note (requires session)
curl -X POST http://localhost:3001/api/notes \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Test Note","content":"Testing..."}'

# 5. Update a note
curl -X PATCH http://localhost:3001/api/notes/note_id_here \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Updated Title"}'

# 6. Delete a note
curl -X DELETE http://localhost:3001/api/notes/note_id_here \
  -b cookies.txt

# 7. Logout
curl -X POST http://localhost:3001/api/logout \
  -b cookies.txt
```

### Testing with Postman

1. **Open Postman** → Create new request
2. **Set method** to POST, GET, or DELETE
3. **Set URL** to `http://localhost:3001/api/notes`
4. **Add headers:** 
   - `Content-Type: application/json`
   - Add session cookie (use Cookies tab in Postman after login)
5. **Add body** (for POST): `{"title":"...","content":"..."}`
6. **Send** → See response

---

## Environment Variables

### Backend (.env)

Create a `backend/.env` file with these variables:

```dotenv
# Server Configuration
PORT=3001

# PocketHost API Token
POCKETHOST_TOKEN=pb_XXXXXXXXXXXXXXXXXXXX

# Frontend URL (for CORS)
FRONTEND_URL=https://secure-note-66010309.vercel.app
```

### Explanation

| Variable | Purpose | Example | Security |
|----------|---------|---------|----------|
| `PORT` | Which port the Express server listens on | `3001` | Public (shown in README) |
| `POCKETHOST_TOKEN` | Bearer token for PocketHost REST API | `pb_XXXXXXXXXXXXXXXXXXXX` | **Keep SECRET** |
| `FRONTEND_URL` | Deployed frontend origin (for CORS) | `https://secure-note...` | Public but specific |

### Loading Environment Variables

The `backend/server.js` loads them via `dotenv`:
```javascript
require('dotenv').config()  // Loads .env file into process.env

const port = process.env.PORT  // Access in code
const token = process.env.POCKETHOST_TOKEN
const pbToken = process.env.POCKETHOST_TOKEN
```

NEVER Commit .env

The `.gitignore` file must include:
```
.env
.env.local
.env.*.local
node_modules/
dist/
```

**If** `.env` is accidentally committed:
1. **Rotate all secrets immediately** (change passwords/tokens)
2. **Force push** to remove from history: `git push --force-with-lease`
3. **Alert** your team

---

## Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/secure-note-app.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel auto-detects `vercel.json` configuration

3. **Set Environment Variables**
   - Vercel Dashboard → Project Settings → Environment Variables
   - Add `POCKETHOST_TOKEN` and `FRONTEND_URL`
   - Apply to all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy" button
   - Wait for build to complete (~2 minutes)
   - Frontend live at: **https://secure-note-66010309.vercel.app**
   - Backend live at: **https://securenote-backend.onrender.com**

### Local Vercel Testing

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Test locally in production mode
vercel dev
# Opens http://localhost:3000
```

### Production Checklist

- Environment variables set in Vercel dashboard
- .env file is in .gitignore (never committed)
- vercel.json configured correctly
- Secrets are rotated/unique (not the same as development)
- HTTPS enforced (automatic on Vercel)
- Frontend and backend on same domain (no CORS)

---

## Security

### Key Principles

1. **Secrets in Environment Variables Only**
   - Never hardcode POCKETHOST_TOKEN in source code
   - Always use process.env.POCKETHOST_TOKEN on backend
   - Never expose secrets in frontend code

2. **HTTPS in Production**
   - Development: HTTP (localhost is safe)
   - Production: HTTPS mandatory (encrypts session cookies in transit)
   - Vercel provides free HTTPS via Let's Encrypt

3. **Session-Based Authentication**
   - Session cookie (HttpOnly) set by backend on login
   - Cookie sent automatically with every request
   - Backend validates session before processing requests
   - Browser cannot read cookie via JavaScript (XSS protection)

4. **CORS Protection**
   - Development: Vite proxies requests (no CORS issues)
   - Production: Express validates FRONTEND_URL origin
   - Restricts cookie sharing to your domain only

5. **Input Validation**
   - Backend validates all input (title, content, username)
   - Prevents invalid/malicious data from being saved
   - Returns 400 Bad Request if validation fails

### Security Implementation

**Backend Example:**
```javascript
// Middleware: Check session
app.post('/api/notes', requireSession, (req, res) => {
  const user = req.session.username
  
  // Validate input
  const { title, content } = req.body
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content required' })
  }
  
  // Process request safely
  // ...
})
```

---

## Troubleshooting

### Common Issues and Solutions

#### Backend fails to start with npm error

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

**If still fails:**
- Check Node.js version: `node --version` (should be v18+)
- Check internet connection
- Try with `npm install --verbose` to see detailed errors

---

#### **Issue: `PORT 3001 already in use`**

Backend won't start — another service is using port 3001.

**Solution:**
```bash
# Find process using port 3001
# On Windows:
netstat -ano | findstr :3001

# On Mac/Linux:
lsof -i :3001

# Kill the process (replace PID with actual number)
kill -9 PID

# Then restart backend
npm start
```

**Alternative:** Change port in `.env`:
```
PORT=3002
```
Then restart and update frontend proxy settings.

---

#### **Issue: Login fails**

**Solution:**
- Verify username and password are correct
- Check backend is running: http://localhost:3001
- Check network tab in DevTools for 401 response
- Clear browser cookies and try again
- Check you're entering the exact same password
- Verify no extra spaces: `"SecureNote-S3cr3t-K3y-2025"` ← note the hyphens
- Restart backend server after changing `.env`

---

#### **Issue: Notes don't save or show "Network error"**

**Solution:**
1. **Check both servers running:**
   ```bash
   # Backend: http://localhost:3001/api/notes should return JSON
   # Frontend: http://localhost:5173 should load
   ```

2. **Check console for errors:**
   - Frontend: Open DevTools (F12) → Console tab
   - Backend: Check terminal output

3. **Check PocketHost credentials:**
   - Log in to pockethost.io
   - Verify API token is valid
   - Check database has `notes` table

4. **Verify session cookie:**
   - DevTools → Application → Cookies
   - Check `sessionId` cookie is present
   - Or: DevTools → Network tab → POST /api/notes → Cookies tab

---

#### **Issue: CORS errors in browser console**

```
Access to XMLHttpRequest at 'http://localhost:3001/api/notes'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution (Development):**
- Vercel proxy should handle this automatically
- Check `frontend/vite.config.js` has correct proxy settings:
  ```javascript
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
  ```

**Solution (Production):**
- Ensure backend sends CORS headers
- Vercel deployment should have both on same domain — no CORS needed

---

## License

This project is licensed under the **MIT License** — see LICENSE file for details.

You're free to use, modify, and distribute this project provided you include the license notice.

---

**Last Updated:** March 2026  
**Status:** Production Ready  
**Version:** 1.0.0
