/**
 * App.jsx — Root component
 * Runtime: Browser | Engine: V8 (Chrome) or SpiderMonkey (Firefox)
 *
 * Manages global auth state user login via username/password.
 * Session is stored in HTTP-only cookies by the server.
 */
import { useState, useEffect } from 'react'
import { API_BASE } from './config'
import LoginPage from './pages/LoginPage'
import NotesPage from './pages/NotesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  // username lives in React state — cleared when tab closes (no persistence)
  const [username, setUsername] = useState(null)
  const [page, setPage] = useState('home') // home | about | contact | notes
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  // On mount, check if user has an active session
  useEffect(() => {
    async function restoreSession() {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)
        
        const res = await fetch(`${API_BASE}/me`, {
          credentials: 'include',
          signal: controller.signal,
        })
        
        clearTimeout(timeoutId)
        
        if (res.ok) {
          const data = await res.json()
          setUsername(data.username)
          setPage('notes')
          console.log('[App] Session restored for user:', data.username)
        } else {
          console.log('[App] No active session, showing login page')
        }
      } catch (err) {
        console.log('[App] Session check failed:', err.message)
      } finally {
        setIsCheckingSession(false)
      }
    }
    
    restoreSession()
  }, [])

  const handleNavigate = (newPage) => {
    setPage(newPage)
  }

  // Show loading state while checking session
  if (isCheckingSession) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--cream)', color: 'var(--charcoal)' }}>Loading...</div>
  }

  // Show about/contact pages regardless of auth status
  if (page === 'about') {
    return <AboutPage onNavigate={handleNavigate} />
  }
  if (page === 'contact') {
    return <ContactPage onNavigate={handleNavigate} />
  }

  // Not logged in — show login page with navigation
  if (!username) {
    return <LoginPage onLogin={(user) => { setUsername(user); setPage('notes'); }} onNavigate={handleNavigate} />
  }

  // Logged in — default to notes page
  return <NotesPage username={username} onLogout={() => { setUsername(null); setPage('home'); }} onNavigate={handleNavigate} />
}
