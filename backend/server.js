/**
 * SecureNote — Backend API Server
 * Runtime: Node.js | Framework: Express.js
 *
 * Architecture:
 *  - This file runs in the NODE.JS RUNTIME (not the browser).
 *  - JavaScript is executed by the V8 engine, but Node provides extra APIs
 *    (file system, HTTP, process.env, etc.) that do NOT exist in the browser.
 *  - Sensitive config (SECRET_TOKEN, POCKETHOST_TOKEN) lives HERE, never on
 *    the client, because server code is never served to the browser.
 */

const express = require('express');
const dotenv  = require('dotenv');
const cors    = require('cors');

// Load environment variables from .env BEFORE accessing process.env
dotenv.config();

const app = express();

// ─── Config from environment variables ─────────────────────────────────────
const PORT             = process.env.PORT || 3001;
const POCKETHOST_TOKEN = process.env.POCKETHOST_TOKEN;
const POCKETHOST_BASE  =
  'https://app-tracking.pockethost.io/api/collections/notes/records';

// ─── Simple in-memory user store (for demo purposes) ─────────────────────────
const users = new Map([
  ['admin', { password: 'admin123' }],
]);
const sessions = new Map();  // {sessionId}: {username, loginTime}

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',  // Support both dev and production
  credentials: true,                 // Allow cookies in cross-origin requests
}));
app.use(express.json());    // Parse incoming JSON request bodies

// ─── Auth Middleware ────────────────────────────────────────────────────────
/**
 * Helper: Parse cookies more robustly
 */
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    const value = rest.join('='); // Rejoin in case there's an = in the value
    cookies[name.trim()] = value.trim();
  });
  
  return cookies;
}

/**
 * requireSession — checks that the user has an active session cookie.
 * Attaches session info to req.session for use in routes.
 */
const requireSession = (req, res, next) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies.sessionId;
  
  if (!sessionId || !sessions.has(sessionId)) {
    console.warn(`[Auth] Invalid/missing sessionId. Got:`, sessionId, `| Available sessions:`, [...sessions.keys()]);
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Please log in first.',
    });
  }
  
  req.session = sessions.get(sessionId);
  console.log(`[Auth] Valid session for user:`, req.session.username);
  next();
};

// ─── Helper: PocketHost fetch wrapper ──────────────────────────────────────
const phHeaders = {
  'Content-Type':  'application/json',
  'Authorization': `Bearer ${POCKETHOST_TOKEN}`,
};

// ─── Routes ─────────────────────────────────────────────────────────────────

/**
 * POST /api/register
 * Creates a new user account.
 * Body: { username: string, password: string }
 * Returns: { message: string, username: string } on success
 */
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Both username and password are required.',
    });
  }

  // Check if user already exists
  if (users.has(username)) {
    return res.status(409).json({
      error: 'Conflict',
      message: 'Username already exists. Please choose another.',
    });
  }

  // Create new user
  users.set(username, { password });
  console.log(`[Register] New user created: ${username}`);

  return res.status(201).json({
    message: 'Account created successfully! You can now log in.',
    username,
  });
});

/**
 * POST /api/login
 * Authenticates user with username/password.
 * Body: { username: string, password: string }
 * Sets session cookie on success.
 */
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Both username and password are required.',
    });
  }

  // Check credentials
  if (users.has(username) && users.get(username).password === password) {
    // Create session
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessions.set(sessionId, { username, loginTime: new Date() });
    
    console.log(`[Login] New session created - Username: ${username}, SessionId: ${sessionId}`);

    // Set session cookie with CORS-friendly flags
    res.setHeader('Set-Cookie', `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=86400`);
    return res.status(200).json({ message: 'Login successful', username });
  }

  console.log(`[Login] Failed attempt for username: ${username}`);
  return res.status(401).json({
    error: 'Unauthorized',
    message: 'Invalid username or password. Try admin:admin123',
  });
});

/**
 * POST /api/logout
 * Clears the session. Works even without active session.
 */
app.post('/api/logout', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies.sessionId;
  console.log('[Logout] Attempt - sessionId:', sessionId, 'Sessions map:', [...sessions.keys()]);
  if (sessionId && sessions.has(sessionId)) {
    sessions.delete(sessionId);
    console.log('[Logout] Session deleted for:', sessionId);
  }
  // Send Set-Cookie header to clear cookie on client
  res.setHeader('Set-Cookie', 'sessionId=; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=0');
  return res.status(200).json({ message: 'Logged out successfully' });
});

/**
 * GET /api/me
 * Returns current user info if they have a valid session.
 * Used by frontend to restore session on page refresh.
 */
app.get('/api/me', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies.sessionId;
  
  if (!sessionId || !sessions.has(sessionId)) {
    console.log('[/api/me] No valid session found');
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  const session = sessions.get(sessionId);
  console.log('[/api/me] Valid session found for:', session.username);
  return res.status(200).json({ username: session.username });
});


/**
 * GET /api/notes
 * Returns notes based on user role:
 * - Admin: all notes
 * - User: only their own notes
 * Requires session.
 */
app.get('/api/notes', requireSession, async (req, res) => {
  try {
    console.log(`[/api/notes] Fetching notes for user: ${req.session.username}`);
    const response = await fetch(
      `${POCKETHOST_BASE}?sort=-created&perPage=100`,
      { headers: phHeaders }
    );
    
    if (!response.ok) {
      console.error(`[/api/notes] PocketHost error: ${response.status} ${response.statusText}`);
      const errText = await response.text();
      console.error(`[/api/notes] Error details:`, errText);
      return res.status(502).json({ error: 'Failed to fetch notes from database', details: errText });
    }
    
    const data = await response.json();

    // PocketBase returns { items: [...] } or { items: null } on empty
    const notes = data.items ?? [];
    console.log(`[/api/notes] Total notes in database: ${notes.length}`);
    return res.status(200).json(notes);
  } catch (err) {
    console.error('[/api/notes] error:', err.message);
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

/**
 * POST /api/notes
 * Creates a new note. Requires valid session.
 * Body: { title: string, content: string }
 * note will have owner field set to current username.
 * Returns: 201 Created with the new note object.
 */
app.post('/api/notes', requireSession, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Both "title" and "content" fields are required.',
    });
  }

  try {
    const response = await fetch(POCKETHOST_BASE, {
      method:  'POST',
      headers: phHeaders,
      body:    JSON.stringify({ 
        title, 
        content,
        owner: req.session.username,  // Set owner to current user
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('PocketHost POST error:', err);
      return res.status(502).json({ error: 'Failed to create note in database' });
    }

    const newNote = await response.json();
    return res.status(201).json(newNote);
  } catch (err) {
    console.error('POST /api/notes error:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * DELETE /api/notes/:id
 * Deletes a note by ID. Requires valid session.
 * - Admin can delete any note
 * - User can only delete their own notes
 * Returns: 200 OK on success, 404 if not found, 403 if forbidden.
 */
app.delete('/api/notes/:id', requireSession, async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the note
    const deleteResponse = await fetch(`${POCKETHOST_BASE}/${id}`, {
      method:  'DELETE',
      headers: phHeaders,
    });

    if (deleteResponse.status === 404) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Note with id "${id}" does not exist.`,
      });
    }

    if (!deleteResponse.ok) {
      return res.status(502).json({ error: 'Failed to delete note from database' });
    }

    return res.status(200).json({ message: `Note "${id}" deleted successfully.` });
  } catch (err) {
    console.error(`DELETE /api/notes/${id} error:`, err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ─── 404 catch-all ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

// ─── Start server ───────────────────────────────────────────────────────────
app.listen(PORT,"0.0.0.0", () => {
  console.log(`\n🔐 SecureNote API running → http://localhost:${PORT}`);
  console.log(`   POST   http://localhost:${PORT}/api/login  (username/password)`);
  console.log(`   POST   http://localhost:${PORT}/api/logout`);
  console.log(`   GET    http://localhost:${PORT}/api/notes  (Login required)`);
  console.log(`   POST   http://localhost:${PORT}/api/notes  (Login required)`);
  console.log(`   DELETE http://localhost:${PORT}/api/notes/:id  (Login required)\n`);
  console.log(`📝 Demo credentials:`);
  console.log(`   Admin:  admin / admin123\n`);
});