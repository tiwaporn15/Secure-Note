/**
 * NotesPage.jsx — Main notes dashboard
 * Warm cream aesthetic matching the LoginPage.
 */
import { useState, useEffect } from 'react'
import { API_BASE } from '../config'
import NoteCard from '../components/NoteCard'
import ComposePanel from '../components/ComposePanel'

// ─── Helper: Retry with exponential backoff ─────────────────────────────────
async function retryFetch(url, options = {}, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout
      
      const res = await fetch(url, {
        ...options,
        credentials: 'include',
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      return res
    } catch (err) {
      clearTimeout(timeoutId)
      const isLastAttempt = attempt === maxRetries - 1
      const isNetworkError = err.name === 'TypeError' || err.name === 'AbortError'
      
      // Only retry on network errors, not on HTTP errors
      if (isLastAttempt || !isNetworkError) throw err
      
      // Exponential backoff: 500ms, 1s, 2s
      const delay = Math.pow(2, attempt) * 500
      await new Promise(r => setTimeout(r, delay))
    }
  }
}

// ─── Helper: Format error messages ──────────────────────────────────────────
function formatErrorMessage(err) {
  const msg = err?.message || String(err)
  
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('AbortError')) {
    return '🌐 Network error — check your internet connection'
  }
  if (msg.includes('401') || msg.includes('Unauthorized')) {
    return '🔐 Session expired — please log in again'
  }
  if (msg.includes('403') || msg.includes('Forbidden')) {
    return '🚫 You don\'t have permission for this action'
  }
  if (msg.includes('404') || msg.includes('Not Found')) {
    return '⚠️ Note not found — it may have been deleted'
  }
  if (msg.includes('timeout') || msg.includes('Timeout')) {
    return '⏱️ Request took too long — server might be slow'
  }
  return `❌ ${msg}`
}

export default function NotesPage({ username, onLogout, onNavigate }) {
  const [notes, setNotes]             = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [deletingId, setDeletingId]   = useState(null)
  const [retryCount, setRetryCount]   = useState(0)

  // Admin always sees all notes
  const filteredNotes = notes

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`notes_${username}`, JSON.stringify(notes))
  }, [notes, username])

  useEffect(() => {
    // Try to restore from localStorage first
    const cached = localStorage.getItem(`notes_${username}`)
    if (cached) {
      try {
        setNotes(JSON.parse(cached))
      } catch (e) {
        console.warn('Failed to parse cached notes')
      }
    }
    loadNotes() // Then fetch fresh data
  }, [])

  // Auto-clear error after 6 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 6000)
      return () => clearTimeout(timer)
    }
  }, [error])

  async function loadNotes() {
    setLoading(true)
    setError('')
    setRetryCount(0)
    try {
      const res = await retryFetch(`${API_BASE}/notes`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      console.log('[loadNotes] API response:', data)  // DEBUG
      if (data && data.length > 0) {
        console.log('[loadNotes] First note fields:', Object.keys(data[0]))  // DEBUG
      }
      setNotes(data)
    } catch (err) {
      console.error('[loadNotes]', err)
      setError(formatErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(title, content) {
    setError('')
    try {
      const res = await retryFetch(`${API_BASE}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })
      if (res.status === 401) throw new Error('Unauthorized')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const newNote = await res.json()
      setNotes(prev => [newNote, ...prev])
      setShowCompose(false)
    } catch (err) {
      console.error('[handleCreate]', err)
      setError(formatErrorMessage(err))
    }
  }

  async function handleLogout() {
    setLoading(true)
    try {
      const res = await retryFetch(`${API_BASE}/logout`, { method: 'POST' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
    } catch (err) {
      console.error('[handleLogout]', err)
      setError(formatErrorMessage(err))
      setLoading(false)
      return
    }
    setLoading(false)
    onLogout()
  }

  async function handleDelete(id) {
    setDeletingId(id)
    try {
      const res = await retryFetch(`${API_BASE}/notes/${id}`, { method: 'DELETE' })
      if (res.status === 401) { setError('🔐 Session expired — please log in again'); return }
      if (!res.ok && res.status !== 404) { setError(formatErrorMessage(new Error(`HTTP ${res.status}`))); return }
      setNotes(prev => prev.filter(n => n.id !== id))
    } catch (err) {
      console.error('[handleDelete]', err)
      setError(formatErrorMessage(err))
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div style={s.root}>

      {/* ── Nav ── */}
      <header style={s.nav}>
        <div style={s.navInner}>

          {/* Brand */}
          <div style={s.brand}>
            <HeartIcon />
            <span style={s.brandName}>SecureNote</span>
          </div>

          {/* Right side */}
          <div style={s.navRight}>
            <div style={s.userChip}>
              <span style={s.userDot} />
              <span style={s.userName}>{username}</span>
            </div>
            <button onClick={loadNotes} style={s.ghostBtn} title="Refresh" aria-label="Refresh">
              <RefreshIcon />
            </button>
            <button onClick={handleLogout} style={s.signOutBtn} title="Logout" aria-label="Logout" className="logout-btn-desktop">
              <LogoutIcon />
              <span className="logout-text">Until next time</span>
            </button>
          </div>

        </div>
      </header>

      {/* ── Main ── */}
      <main style={s.main}>
        <div style={s.container}>

          {/* Error */}
          {error && (
            <div style={s.errorBanner}>
              <InfoIcon />
              <span style={{ flex: 1 }}>{error}</span>
              <button onClick={() => setError('')} style={s.dismissBtn} aria-label="Dismiss error">✕</button>
            </div>
          )}

          {/* Compose panel */}
          {showCompose && (
            <div style={{ marginBottom: '1.75rem', animation: 'slideDown 0.25s var(--ease)' }}>
              <ComposePanel onSave={handleCreate} onCancel={() => setShowCompose(false)} />
            </div>
          )}

          {/* Page header row */}
          <div style={s.pageHeader}>
            <div>
              <h2 style={s.pageTitle}>All Notes</h2>
              <p style={s.pageSub}>
                {loading
                  ? 'Gathering your memories…'
                  : filteredNotes.length === 0
                    ? 'No notes yet. Start creating!'
                    : `${filteredNotes.length} ${filteredNotes.length === 1 ? 'note' : 'notes'} kept safe`}
              </p>
            </div>
            {!showCompose && (
              <button onClick={() => setShowCompose(true)} style={s.addBtn}>
                <PlusIcon /> <span>Share your heart</span>
              </button>
            )}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div style={s.grid}>
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredNotes.length === 0 && !error && (
            <EmptyState onNew={() => setShowCompose(true)} />
          )}

          {/* Grid */}
          {!loading && filteredNotes.length > 0 && (
            <div style={s.grid}>
              {filteredNotes.map((note, idx) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={handleDelete}
                  deleting={deletingId === note.id}
                  currentUsername={username}
                  animDelay={idx * 50}
                />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function EmptyState({ onNew }) {
  return (
    <div style={es.wrap}>
      <div style={es.glyph}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#F6C697" stroke="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
      <h3 style={es.title}>Your story begins here</h3>
      <p style={es.body}>Pour your heart out. Every thought, every feeling, kept close and safe.</p>
      <button onClick={onNew} style={es.btn}><PlusIcon /> <span>Write what's in your heart</span></button>
    </div>
  )
}

function SkeletonCard() {
  const pulse = {
    background: 'linear-gradient(90deg, #F2EDE4 25%, #E2D9CC 50%, #F2EDE4 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s ease infinite',
    borderRadius: 4,
    display: 'block',
  }
  return (
    <div style={sk.card}>
      <div style={{ ...pulse, width: '55%', height: 16, marginBottom: 14 }} />
      <div style={{ ...pulse, width: '100%', height: 11, marginBottom: 7 }} />
      <div style={{ ...pulse, width: '85%', height: 11, marginBottom: 7 }} />
      <div style={{ ...pulse, width: '70%', height: 11, marginBottom: 22 }} />
      <div style={{ ...pulse, width: '38%', height: 9 }} />
    </div>
  )
}

/* ── Icons ─────────────────────────────────────────────────────────────────── */
const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#F6C697" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
)
const LogoutIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

/* ── Styles ─────────────────────────────────────────────────────────────────── */
const s = {
  root: {
    minHeight: '100vh',
    background: '#FAF8F3',              /* --cream */
    fontFamily: 'var(--font-sans)',
  },

  /* ── Navbar ── */
  nav: {
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(255,255,255,0.93)',
    backdropFilter: 'blur(14px)',
    borderBottom: '1px solid rgba(139,111,71,0.2)',
    boxShadow: '0 1px 12px rgba(107,88,56,0.06)',
  },
  navInner: {
    maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem',
    height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '1rem',
  },
  brand: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  brandName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.15rem', fontWeight: 500,
    color: '#1C1A19', letterSpacing: '0.02em',
  },

  navLinks: { display: 'flex', alignItems: 'center', gap: '1.5rem', flexGrow: 1 },
  navLink: { background: 'none', border: 'none', fontSize: '0.9rem', color: '#9A9490', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'color 0.2s' },

  navRight: { display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' },

  userChip: {
    display: 'flex', alignItems: 'center', gap: '0.45rem',
    background: '#F5EDE2',
    border: '1px solid rgba(139,111,71,0.3)',
    borderRadius: 20, padding: '0.3rem 0.85rem',
    fontSize: '0.8rem',
  },
  userDot: {
    width: 7, height: 7, borderRadius: '50%',
    background: '#5A9E78',
    boxShadow: '0 0 0 2px rgba(90,158,120,0.2)',
    flexShrink: 0,
  },
  userName: { fontWeight: 500, color: '#423D38' },
  adminBadge: {
    background: '#F6C697', color: '#7A4A12',
    borderRadius: 10, padding: '0.1em 0.5em',
    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em',
  },

  ghostBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'none', border: '1px solid rgba(139,111,71,0.4)',
    borderRadius: 8, padding: '0.4rem 0.55rem',
    color: '#6B5838', cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  signOutBtn: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    background: 'none', border: '1px solid rgba(139,111,71,0.4)',
    borderRadius: 8, padding: '0.4rem 0.55rem',
    fontSize: '0.8rem', fontFamily: 'inherit',
    color: '#6B5838', cursor: 'pointer',
    transition: 'border-color 0.2s, color 0.2s',
    whiteSpace: 'nowrap',
  },

  /* ── Main ── */
  main: { padding: '2.75rem 1.5rem 5rem' },
  container: { maxWidth: 1100, margin: '0 auto' },

  errorBanner: {
    display: 'flex', alignItems: 'center', gap: '0.6rem',
    background: '#FBF0F0', border: '1px solid rgba(176,64,64,0.2)',
    borderRadius: 10, padding: '0.8rem 1rem',
    marginBottom: '1.5rem', fontSize: '0.85rem', color: '#B04040',
    animation: 'slideDown 0.2s ease',
  },
  dismissBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#B04040', opacity: 0.65, padding: '0 0.2rem', fontSize: '0.9rem',
  },

  pageHeader: {
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem',
  },
  pageTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
    fontWeight: 400, color: '#1C1A19', lineHeight: 1.15,
  },
  pageSub: {
    fontSize: '0.85rem', color: '#9A9490',
    marginTop: '0.3rem', fontStyle: 'italic', letterSpacing: '0.01em',
  },

  addBtn: {
    display: 'flex', alignItems: 'center', gap: '0.45rem',
    background: '#B8956A', color: 'white',
    border: 'none', borderRadius: 10,
    padding: '0.7rem 1.3rem',
    fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit',
    cursor: 'pointer', flexShrink: 0,
    boxShadow: '0 4px 16px rgba(184,149,106,0.35)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
    gap: '1.1rem',
  },
}

const es = {
  wrap: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '0.9rem', padding: '5rem 1.5rem', textAlign: 'center',
  },
  glyph: { fontSize: '1.8rem', color: '#B8956A', lineHeight: 1 },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem', fontWeight: 400, color: '#6B5838',
  },
  body: {
    fontSize: '0.875rem', color: '#9A8570',
    maxWidth: 280, lineHeight: 1.7, fontStyle: 'italic',
  },
  btn: {
    display: 'flex', alignItems: 'center', gap: '0.45rem',
    marginTop: '0.5rem',
    background: '#B8956A', color: 'white',
    border: 'none', borderRadius: 10, padding: '0.7rem 1.4rem',
    fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit',
    cursor: 'pointer', boxShadow: '0 4px 14px rgba(184,149,106,0.3)',
  },
}

const sk = {
  card: {
    background: 'white',
    border: '1px solid #F2EDE4',
    borderRadius: 14, padding: '1.35rem', minHeight: 155,
  },
}
