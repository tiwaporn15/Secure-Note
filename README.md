# SecureNote — Full-Stack Secure Notes Application

A modern, full-stack secure notes web application built with **React** (frontend) and **Node.js/Express** (backend) with cloud persistence via **PocketHost**.

## Key Features

- **Token-based Authentication** with duplicate username detection
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
12. [Contributing](#contributing)

---

## Project Overview

SecureNote is a demonstration of full-stack web development fundamentals, showcasing:

- **Frontend Architecture:** Component-based React with hooks (useState, useEffect), Virtual DOM, and unidirectional data flow
- **Backend Architecture:** Express.js API with middleware, authentication, and data validation
- **Communication:** HTTP/HTTPS with JSON payloads, custom Authorization headers
- **Deployment:** Containerized serverless functions on Vercel + PocketHost backend
- **Security:** Environment-based secret management, token authentication, HTTPS in production

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
| `backend/.env` | Secrets: `SECRET_TOKEN`, `POCKETHOST_TOKEN`, `PORT` |
| `frontend/App.jsx` | Auth state, page routing, token management |
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

### Optional but Recommended

- **Vercel CLI** — For local production testing
  ```bash
  npm install -g vercel
  ```

- **Postman or Thunder Client** — For API testing
  Download: [postman.com](https://www.postman.com)

---

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
# SECRET_TOKEN=your-secret-password-here
# POCKETHOST_TOKEN=your-pocketbase-token-here

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
2. **Login page appears** → Enter the password from `backend/.env` (value of `SECRET_TOKEN`)
3. **Click Login** → Token is validated, redirected to NotesPage
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

All endpoints (except `GET /api/notes`) require an `Authorization` header:

```http
Authorization: <SECRET_TOKEN>
```

Example with curl:
```bash
curl -H "Authorization: SecureNote-S3cr3t-K3y-2025" https://securenote-backend.onrender.com/api/notes
```

### Endpoints

#### 1. **POST /api/auth** — Login
Validate password and receive token.

**Request:**
```http
POST /api/auth HTTP/1.1
Host: securenote-backend.onrender.com
Content-Type: application/json

{
  "password": "SecureNote-S3cr3t-K3y-2025"
}
```

**Response (200 OK):**
```json
{
  "token": "SecureNote-S3cr3t-K3y-2025"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Invalid password"
}
```

**Use Case:** Frontend calls this during login, stores token in state.

---

#### 2. **GET /api/notes** — List All Notes
Retrieve all notes from the database.

**Request:**
```http
GET /api/notes HTTP/1.1
Host: securenote-backend.onrender.com
```

**Response (200 OK):**
```json
[
  {
    "id": "note_001",
    "title": "Shopping List",
    "content": "Milk, eggs, bread...",
    "created": "2026-03-29T10:00:00Z"
  },
  {
    "id": "note_002",
    "title": "Meeting Notes",
    "content": "Discussed Q2 roadmap...",
    "created": "2026-03-29T11:00:00Z"
  }
]
```

**No authentication required** for reading (public notes).

**Use Case:** Frontend calls on page load to populate notes grid.

---

#### 3. **POST /api/notes** — Create Note
Create a new note (requires authentication).

**Request:**
```http
POST /api/notes HTTP/1.1
Host: securenote-backend.onrender.com
Content-Type: application/json
Authorization: SecureNote-S3cr3t-K3y-2025

{
  "title": "New Note",
  "content": "This is the note content."
}
```

**Response (201 Created):**
```json
{
  "id": "note_new_id",
  "title": "New Note",
  "content": "This is the note content.",
  "created": "2026-03-29T12:00:00Z"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Title is required"
}
```

**Use Case:** Frontend calls on "Save" button click in ComposePanel.

---

#### 4. **PATCH /api/notes/:id** — Update Note
Update an existing note (requires authentication).

**Request:**
```http
PATCH /api/notes/note_001 HTTP/1.1
Host: securenote-backend.onrender.com
Content-Type: application/json
Authorization: SecureNote-S3cr3t-K3y-2025

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

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Note not found"
}
```

**Use Case:** Frontend calls when user submits changes in EditModal.

---

#### 5. **DELETE /api/notes/:id** — Delete Note
Delete a note by ID (requires authentication).

**Request:**
```http
DELETE /api/notes/note_001 HTTP/1.1
Host: securenote-backend.onrender.com
Authorization: SecureNote-S3cr3t-K3y-2025
```

**Response (200 OK):**
```json
{
  "message": "Note deleted successfully"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Note not found"
}
```

**Use Case:** Frontend calls when user clicks delete button on a NoteCard.

---

### Testing the API with cURL

```bash
# 1. Login
curl -X POST http://localhost:3001/api/auth \
  -H "Content-Type: application/json" \
  -d '{"password":"SecureNote-S3cr3t-K3y-2025"}'

# 2. Get all notes
curl http://localhost:3001/api/notes

# 3. Create a note (requires token)
curl -X POST http://localhost:3001/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: SecureNote-S3cr3t-K3y-2025" \
  -d '{"title":"Test Note","content":"Testing..."}'

# 4. Update a note (requires token)
curl -X PATCH http://localhost:3001/api/notes/note_id_here \
  -H "Content-Type: application/json" \
  -H "Authorization: SecureNote-S3cr3t-K3y-2025" \
  -d '{"title":"Updated Title","content":"Updated content..."}'

# 5. Delete a note
curl -X DELETE http://localhost:3001/api/notes/note_id_here \
  -H "Authorization: SecureNote-S3cr3t-K3y-2025"
```

### Testing with Postman

1. **Open Postman** → Create new request
2. **Set method** to POST, GET, or DELETE
3. **Set URL** to `http://localhost:3001/api/notes`
4. **Add headers:** 
   - `Content-Type: application/json`
   - `Authorization: SecureNote-S3cr3t-K3y-2025` (if needed)
5. **Add body** (for POST): `{"title":"...","content":"..."}`
6. **Send** → See response

---

## Environment Variables

### Backend (.env)

Create a `backend/.env` file with these variables:

```dotenv
# Server Configuration
PORT=3001

# Authentication Secret (used for login)
SECRET_TOKEN=SecureNote-S3cr3t-K3y-2025

# PocketHost Configuration
POCKETHOST_URL=https://your-instance.pockethost.io
POCKETHOST_TOKEN=your-pockethost-api-token-here
```

### Explanation

| Variable | Purpose | Example | Security |
|----------|---------|---------|----------|
| `PORT` | Which port the Express server listens on | `3001` | Public (shown in README) |
| `SECRET_TOKEN` | Password for authentication | `MySecureP@ssw0rd` | **Keep SECRET** |
| `POCKETHOST_TOKEN` | API key for database access | `pb_eyJhbGc...` | **Keep SECRET** |

### Loading Environment Variables

The `backend/server.js` loads them via `dotenv`:
```javascript
require('dotenv').config()  // Loads .env file into process.env

const port = process.env.PORT  // Access in code
const token = process.env.SECRET_TOKEN
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
   - Add:
     - `SECRET_TOKEN` = your password
     - `POCKETHOST_TOKEN` = your database token
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
   - Never hardcode SECRET_TOKEN in source code
   - Always use process.env.SECRET_TOKEN on backend
   - Never expose secrets in frontend code

2. **HTTPS in Production**
   - Development: HTTP (localhost is safe)
   - Production: HTTPS mandatory (encrypts tokens in transit)
   - Vercel provides free HTTPS via Let's Encrypt

3. **Token-Based Authentication**
   - Token stored in frontend React state (session-only)
   - Token sent in `Authorization` header of every authenticated request
   - Backend validates token before processing requests

4. **CORS Protection**
   - Development: Vite proxies requests (no CORS issues)
   - Production: Express sends `Access-Control-Allow-Origin` headers
   - Restricts requests to your domain only

5. **Input Validation**
   - Backend validates all input (title, content lengths)
   - Prevents invalid/malicious data from being saved
   - Returns 400 Bad Request if validation fails

### Security Implementation

**Backend Example:**
```javascript
// Middleware: Check Authorization header
app.post('/api/notes', (req, res) => {
  const token = req.headers.authorization
  
  // Validate token
  if (token !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
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

#### **Issue: Login fails with "Invalid password"**

**Solution:**
- Check `backend/.env` has correct `SECRET_TOKEN` value
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

4. **Verify Authorization header:**
   - DevTools → Network tab
   - Click the POST request to `/api/notes`
   - Check "Authorization" header has your token

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

#### **Issue: Component not rendering / blank page**

**Solution:**
```bash
# Check browser console for errors (F12)

# Check React version compatibility
npm list react

# If needed, update React:
npm update react react-dom

# Clear browser cache: Ctrl+Shift+Delete

# Restart frontend dev server:
# Press Ctrl+C in terminal, then:
npm run dev
```

---

#### **Issue: Blank page after login**

**Likely cause:** Frontend not receiving token correctly.

**Solution:**
1. **Check browser Console (F12):**
   - Look for JavaScript errors
   - Check Network tab → `/api/auth` request/response

2. **Verify backend returns token:**
   ```bash
   curl -X POST http://localhost:3001/api/auth \
     -H "Content-Type: application/json" \
     -d '{"password":"SecureNote-S3cr3t-K3y-2025"}'
   ```
   Should return: `{"token":"SecureNote-S3cr3t-K3y-2025"}`

3. **Check App.jsx token state update:**
   - Ensure `onLogin()` is called with token
   - Ensure token is stored in state

---

### Getting Help

**If issue persists:**

1. **Read the REPORT.md** for architecture details
2. **Check browser DevTools:**
   - Console tab for errors
   - Network tab to view requests/responses
   - Application tab to see stored data

3. **Read Express/React error messages carefully** — they usually pinpoint the issue

4. **Search Stack Overflow** with your exact error message

5. **Ask in communities:**
   - Reddit: r/learnprogramming, r/reactjs
   - Discord: Reactjs, Node.js servers
   - GitHub Issues (if this is on GitHub)

---

## Contributing

### How to Contribute

We welcome contributions! Here's how:

1. **Fork the repository** (create your own copy)
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** (code, docs, fixes)
4. **Test thoroughly:**
   ```bash
   # Ensure backend runs without errors
   npm run start

   # Ensure frontend runs without errors
   npm run dev

   # Test all API endpoints
   # Test UI changes in browser
   ```
5. **Commit with clear messages:**
   ```bash
   git commit -m "Add: amazing-feature description"
   ```
6. **Push to your fork:**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Create a Pull Request** on GitHub

### Contribution Ideas

- 🐛 **Bug fixes:** Find and fix issues
- 📚 **Documentation:** Improve README, comments, examples
- ✨ **Features:** Add new functionality
  - Dark mode toggle
  - Note categories/tags
  - Search/filter notes
  - Note sharing
- 🎨 **UI/UX:** Improve design, accessibility, animations
- ⚡ **Performance:** Optimize bundle size, API calls, rendering
- 🧪 **Testing:** Add unit tests, integration tests

### Code Standards

- **Format:** Use consistent spacing (2 spaces for JS/JSON)
- **Comments:** Explain "why", not "what" — code should be self-explanatory
- **Components:** Keep components focused and reusable
- **Naming:** Use descriptive names for variables, functions, components
- **Error Handling:** Always handle errors gracefully

---

## License

This project is licensed under the **MIT License** — see LICENSE file for details.

You're free to use, modify, and distribute this project provided you include the license notice.

---

## Additional Resources

### Learning Materials

- **React Official Docs:** https://react.dev
- **Express.js Guide:** https://expressjs.com
- **MDN Web Docs:** https://developer.mozilla.org
- **Full-Stack Developer Roadmap:** https://roadmap.sh/full-stack
- **PocketBase Documentation:** https://pocketbase.io/docs

### Related Projects

- **SecureNote API Docs:** See REPORT.md
- **Deployment Guide:** See vercel.json configuration
- **Architecture Details:** See REPORT.md (Component Architecture section)

---

## Support

**Have questions?**

- 📩 Email: support@example.com
- 💬 GitHub Discussions: [link to discussions]
- 🐛 Report bugs: GitHub Issues

---

## Acknowledgments

- **React Team** for the amazing frontend library
- **Express.js** for the simple, flexible backend framework
- **PocketBase/PocketHost** for easy cloud database
- **Vercel** for seamless deployment
- **Contributors** who improve this project

---

**Last Updated:** March 2026  
**Status:** ✅ Production Ready  
**Version:** 1.0.0
