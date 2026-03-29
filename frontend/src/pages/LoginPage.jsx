/**
 * LoginPage.jsx — Split-screen auth page
 * Runtime: Browser | Virtual DOM: React reconciler
 */
import { useState } from 'react'
import { API_BASE } from '../config'
import loginIllustration from '../assets/login-illustration.svg'

const QUOTES = [
  { text: 'Your thoughts, kept safe.', attr: 'SecureNote' },
  { text: 'Write without worry.', attr: 'SecureNote' },
  { text: 'Private by design.', attr: 'SecureNote' },
]

export default function LoginPage({ onLogin, onNavigate }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [show, setShow]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)  // Toggle between Login/Sign Up
  const [quoteIdx]              = useState(() => Math.floor(Math.random() * QUOTES.length))
  const quote = QUOTES[quoteIdx]

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!username.trim() || !password.trim()) {
      return setError('Please enter both username and password.')
    }

    if (isSignUp) {
      if (!confirmPassword.trim()) {
        return setError('Please confirm your password.')
      }
      if (password !== confirmPassword) {
        return setError('Passwords do not match.')
      }
    }

    setError('')
    setLoading(true)
    
    const endpoint = isSignUp ? '/register' : '/login'
    
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
        signal: AbortSignal.timeout(5000),
      })
      
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || `${isSignUp ? 'Sign up' : 'Login'} failed: ${res.status}`)
      }
      
      const data = await res.json()
      
      if (isSignUp) {
        // After sign up, show success and switch to login
        setError('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setIsSignUp(false)
      } else {
        // Login successful
        onLogin(username.trim())
      }
    } catch (err) {
      if (err.name === 'TimeoutError' || err.name === 'AbortError') {
        setError('Server is not responding. Is the backend running?')
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('Cannot reach the backend. Run: cd backend && npm start')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-root" style={{ backgroundImage: `url(${loginIllustration})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>

      {/* ── Navbar ── */}
      <nav style={s.navbar}>
        <div style={s.navContent}>
          {/* Logo */}
          <div style={s.navLogo}>
            <HeartIcon color="#1C1A19" />
            <span style={s.navLogoText}>SecureNote</span>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="nav-links-desktop" style={s.navLinksDesktop}>
            <button onClick={() => onNavigate('home')} style={s.navLink}>Home</button>
            <button onClick={() => onNavigate('about')} style={s.navLink}>About</button>
            <button onClick={() => onNavigate('contact')} style={s.navLink}>Contact</button>
            <button style={s.navActionBtn}>Log In</button>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button 
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)} 
            style={s.hamburger}
            aria-label="Toggle menu"
          >
            <HamburgerIcon />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="nav-mobile-menu" style={s.mobileMenu}>
            <button onClick={() => { onNavigate('home'); setMenuOpen(false); }} style={s.mobileLink}>Home</button>
            <button onClick={() => { onNavigate('about'); setMenuOpen(false); }} style={s.mobileLink}>About</button>
            <button onClick={() => { onNavigate('contact'); setMenuOpen(false); }} style={s.mobileLink}>Contact</button>
            <button style={s.mobileActionBtn}>Log In</button>
          </div>
        )}
      </nav>

      {/* ── Form panel (centered) ── */}
      <div className="login-right" style={{ ...s.loginContainer }}>
        <div style={s.card}>

          <div style={s.cardHeader}>
            <h1 style={s.cardTitle}>{isSignUp ? 'Create your account' : 'How was your day?'}</h1>
            <p style={s.cardSub}>
              {isSignUp 
                ? 'Set up your account and start sharing your thoughts.'
                : 'Log in to pour your heart out. Your thoughts are always safe with us.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.fieldGroup}>
              <label style={s.label} htmlFor="uname">Username</label>
              <div style={s.inputRow}>
                <span style={s.inputPre}><UserIcon /></span>
                <input
                  id="uname"
                  type="text"
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError('') }}
                  placeholder="Enter username"
                  style={{ ...s.input, ...(error ? s.inputErr : {}) }}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>

            <div style={s.fieldGroup}>
              <label style={s.label} htmlFor="pwd">Password</label>
              <div style={s.inputRow}>
                <span style={s.inputPre}><LockIcon /></span>
                <input
                  id="pwd"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="Enter password"
                  style={{ ...s.input, ...(error ? s.inputErr : {}) }}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button type="button" onClick={() => setShow(p => !p)} style={s.eyeBtn} aria-label="Toggle visibility">
                  {show ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div style={s.fieldGroup}>
                <label style={s.label} htmlFor="confirm">Confirm Password</label>
                <div style={s.inputRow}>
                  <span style={s.inputPre}><LockIcon /></span>
                  <input
                    id="confirm"
                    type={show ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); setError('') }}
                    placeholder="Confirm password"
                    style={{ ...s.input, ...(error ? s.inputErr : {}) }}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button type="button" onClick={() => setShow(p => !p)} style={s.eyeBtn} aria-label="Toggle visibility">
                    {show ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div style={s.errMsg}>
                <InfoIcon /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !username || !password || (isSignUp && !confirmPassword)}
              style={{ ...s.submitBtn, opacity: (!username || !password || (isSignUp && !confirmPassword) || loading) ? 0.55 : 1, cursor: (!username || !password || (isSignUp && !confirmPassword) || loading) ? 'not-allowed' : 'pointer' }}
            >
              {loading
                ? <><Spinner /> <span>{isSignUp ? 'Creating account…' : 'Logging in…'}</span></>
                : <><span>{isSignUp ? 'Create Account' : 'Log In'}</span> </>
              }
            </button>
          </form>

          {!isSignUp && (
            <p style={s.hintText}>
              Don't have an account? <button 
                type="button"
                onClick={() => { setIsSignUp(true); setError('') }}
                style={s.switchTabBtn}
              >
                Sign up
              </button>
            </p>
          )}

          {isSignUp && (
            <p style={s.hintText}>
              Already have an account? <button 
                type="button"
                onClick={() => { setIsSignUp(false); setError(''); setPassword(''); setConfirmPassword('') }}
                style={s.switchTabBtn}
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Icons ── */
const HeartIcon = ({ color = 'var(--brown-light)' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={color} stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)
const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const EyeOffIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const InfoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)
const Spinner = () => (
  <span style={{ width:14, height:14, border:'2px solid rgba(250,248,243,0.35)', borderTopColor:'var(--cream)', borderRadius:'50%', animation:'spin 0.6s linear infinite', display:'inline-block', flexShrink:0 }} />
)
const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

/* ── Styles (non-responsive only — responsive via CSS classes) ── */
const s = {
  navbar: { position:'fixed', top:0, left:0, right:0, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(10px)', borderBottom:'1px solid rgba(0,0,0,0.05)', zIndex:100 },
  navContent: { maxWidth:'1200px', margin:'0 auto', padding:'0 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', height:'64px' },
  navLogo: { display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer' },
  navLogoText: { fontFamily:'var(--font-serif)', fontSize:'1.2rem', fontWeight:600, color:'#3D3228', letterSpacing:'0.02em' },
  navLinksDesktop: { display:'flex', alignItems:'center', gap:'2rem' },
  navLink: { fontSize:'0.95rem', color:'#6B5838', textDecoration:'none', fontWeight:500, transition:'color 0.2s', cursor:'pointer', background:'none', border:'none', fontFamily:'var(--font-sans)' },
  navActionBtn: { background:'#B8956A', color:'white', border:'none', padding:'0.6rem 1.5rem', borderRadius:'8px', fontSize:'0.9rem', fontWeight:600, cursor:'pointer', transition:'background 0.2s' },
  hamburger: { display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer', color:'#2D251F' },
  mobileMenu: { display:'flex', flexDirection:'column', gap:'1rem', padding:'1rem 1.5rem', borderTop:'1px solid rgba(0,0,0,0.05)', background:'rgba(255,255,255,0.98)' },
  mobileLink: { fontSize:'0.95rem', color:'#5A4E43', textDecoration:'none', fontWeight:500, cursor:'pointer', background:'none', border:'none', fontFamily:'var(--font-sans)' },
  mobileActionBtn: { background:'#B8956A', color:'white', border:'none', padding:'0.6rem 1.5rem', borderRadius:'8px', fontSize:'0.9rem', fontWeight:600, cursor:'pointer', width:'100%' },

  leftContent: { position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:'2.5rem', width:'100%' },
  leftLogo: { display:'flex', alignItems:'center', gap:'0.6rem' },
  leftLogoText: { fontFamily:'var(--font-serif)', fontSize:'1.3rem', fontWeight:500, color:'var(--cream)', letterSpacing:'0.03em' },
  dividerLines: { display:'flex', flexDirection:'column', gap:'8px' },
  dividerLine: { height:'1px', background:'var(--brown-light)', borderRadius:'1px' },
  quote: { display:'flex', flexDirection:'column', gap:'1rem', animation:'fadeUp 0.7s var(--ease) 0.1s both' },
  quoteText: { fontFamily:'var(--font-serif)', fontSize:'clamp(1.5rem,3vw,2.1rem)', fontWeight:400, fontStyle:'italic', color:'var(--cream)', lineHeight:1.35 },
  quoteAttr: { fontSize:'0.72rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--brown-light)', fontStyle:'normal' },
  leftFooter: { display:'flex', gap:'8px' },
  dot: { width:6, height:6, borderRadius:'50%', background:'var(--brown-light)', opacity:0.5, display:'block', animation:'pulse-dot 2s ease-in-out infinite' },
  circle: { position:'absolute', borderRadius:'50%', border:'1px solid rgba(196,168,130,0.15)', pointerEvents:'none' },

  /* Mobile logo — only visible when left panel is hidden */
  mobileLogoWrap: { display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.5rem' },
  mobileLogoText: { fontFamily:'var(--font-serif)', fontSize:'1.2rem', fontWeight:500, color:'var(--charcoal)' },

  card: { width:'100%', maxWidth:'380px', display:'flex', flexDirection:'column', gap:'2rem', animation:'fadeUp 0.5s var(--ease) both', background:'white', padding:'2rem', borderRadius:'12px', boxShadow:'0 10px 40px rgba(0,0,0,0.1)', marginTop:'80px' },
  cardHeader: { display:'flex', flexDirection:'column', gap:'0.35rem' },
  cardTitle: { fontFamily:'var(--font-serif)', fontSize:'clamp(1.6rem,5vw,2.1rem)', fontWeight:500, color:'var(--charcoal)', lineHeight:1.15 },
  cardSub: { fontSize:'0.9rem', color:'var(--charcoal-3)', fontWeight:300 },
  
  form: { display:'flex', flexDirection:'column', gap:'1.25rem' },
  fieldGroup: { display:'flex', flexDirection:'column', gap:'0.5rem' },
  label: { fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--charcoal-2)' },
  inputRow: { position:'relative', display:'flex', alignItems:'center' },
  inputPre: { position:'absolute', left:'0.85rem', color:'var(--charcoal-4)', display:'flex', pointerEvents:'none' },
  input: { width:'100%', padding:'0.8rem 2.8rem 0.8rem 2.6rem', background:'var(--white)', border:'1.5px solid var(--cream-3)', borderRadius:'var(--radius-sm)', fontSize:'0.875rem', fontFamily:'var(--font-sans)', color:'var(--charcoal)', outline:'none', transition:'border-color 0.2s, box-shadow 0.2s', letterSpacing:'0.04em' },
  inputErr: { borderColor:'var(--red)', boxShadow:'0 0 0 3px rgba(176,64,64,0.1)' },
  eyeBtn: { position:'absolute', right:'0.85rem', background:'none', border:'none', cursor:'pointer', color:'var(--charcoal-4)', display:'flex', padding:'0.2rem', borderRadius:'4px' },
  errMsg: { display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.78rem', color:'var(--red)', animation:'slideDown 0.2s ease' },
  submitBtn: { display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', background:'#B8956A', color:'white', border:'none', borderRadius:'var(--radius-sm)', padding:'0.875rem 1.5rem', fontSize:'0.9rem', fontWeight:500, fontFamily:'var(--font-sans)', transition:'background 0.2s, box-shadow 0.2s', boxShadow:'var(--shadow-sm)', width:'100%' },
  loginContainer: { display:'flex', alignItems:'center', justifyContent:'center', width:'100%', minHeight:'100vh', position:'fixed', inset:0, zIndex:10 },
  arrow: { fontSize:'1.1rem' },
  hintText: { fontSize:'0.75rem', color:'var(--charcoal-4)', lineHeight:1.6 },
  switchTabBtn: { background:'none', border:'none', color:'#8B6F47', fontWeight:600, fontSize:'0.75rem', cursor:'pointer', textDecoration:'underline', padding:0 },
  code: { fontFamily:'monospace', background:'var(--cream-2)', padding:'0.1em 0.4em', borderRadius:'3px', fontSize:'0.85em', color:'var(--brown-dark)' },
}