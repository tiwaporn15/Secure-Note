/**
 * App.jsx — Root component
 * Runtime: Browser | Engine: V8 (Chrome) or SpiderMonkey (Firefox)
 *
 * Manages global auth state user login via username/password.
 * Session is stored in HTTP-only cookies by the server.
 */
import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import NotesPage from './pages/NotesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  // username and role live in React state — cleared when tab closes (no persistence)
  const [username, setUsername] = useState(null)
  const [role, setRole] = useState(null)
  const [page, setPage] = useState('home') // home | about | contact | notes

  const handleNavigate = (newPage) => {
    setPage(newPage)
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
    return <LoginPage onLogin={(user, userRole) => { setUsername(user); setRole(userRole); setPage('notes'); }} onNavigate={handleNavigate} />
  }

  // Logged in — default to notes page
  return <NotesPage username={username} role={role} onLogout={() => { setUsername(null); setRole(null); setPage('home'); }} onNavigate={handleNavigate} />
}
