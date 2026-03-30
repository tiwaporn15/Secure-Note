import { useState, useEffect } from 'react'
import { API_BASE } from '../config'
import loginBackground from '../assets/login-illustration.svg'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --card: #ffffff;
    --tan: #c4a97d;
    --tan-btn: #c8aa82;
    --tan-hover: #b59568;
    --text-dark: #1a1a1a;
    --text-mid: #555;
    --text-light: #888;
    --border: #e0dbd0;
    --input-bg: #fafaf8;
    --shadow: 0 8px 40px rgba(0,0,0,0.10);
  }

  html, body { height: 100%; font-family: 'DM Sans', sans-serif; }

  .sn-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* NAVBAR (match About/Contact styling) */
  .sn-nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(255,255,255,0.93);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(139,111,71,0.2);
    box-shadow: 0 1px 12px rgba(107,88,56,0.05);
  }
  .sn-nav-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .sn-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .sn-brand-name {
    font-family: 'DM Serif Display', serif;
    font-size: 1.15rem;
    font-weight: 500;
    color: #2D251F;
    letter-spacing: 0.02em;
  }
  .sn-nav-right {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .sn-nav-link {
    background: none;
    border: none;
    font-size: 0.9rem;
    color: #9A8570;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    transition: color 0.2s;
    padding: 0.25rem 0;
  }
  .sn-nav-link:hover { color: #6b5838; }
  .sn-nav-link.active {
    color: #8B6F47;
    border-bottom: 2px solid #B8956A;
    padding-bottom: 0;
  }

  /* MAIN AREA */
  .sn-main {
    flex: 1;
    display: flex; align-items: center; justify-content: center;
    padding: 80px 24px 40px;
    position: relative;
  }


  /* CARD */
  .sn-card {
    background: var(--card);
    border-radius: 16px;
    padding: 52px 52px 44px;
    width: 100%; max-width: 440px;
    box-shadow: var(--shadow);
    position: relative; z-index: 10;
    animation: snFadeUp 0.5s ease both;
  }
  @keyframes snFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sn-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2rem; line-height: 1.15;
    color: var(--text-dark);
    margin-bottom: 10px;
  }
  .sn-sub {
    font-size: 0.88rem; color: var(--text-light);
    line-height: 1.6; margin-bottom: 36px;
  }

  /* FIELD */
  .sn-field { margin-bottom: 22px; }
  .sn-label {
    display: block;
    font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.1em; color: var(--text-mid);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .sn-input-wrap { position: relative; display: flex; align-items: center; }
  .sn-input-icon {
    position: absolute; left: 14px;
    color: #bbb; pointer-events: none;
    width: 16px; height: 16px;
  }
  .sn-input {
    width: 100%;
    padding: 13px 44px 13px 40px;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    background: var(--input-bg);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.93rem; color: var(--text-dark);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .sn-input::placeholder { color: #bbb; }
  .sn-input:focus {
    border-color: var(--tan);
    box-shadow: 0 0 0 3px rgba(196,169,125,0.15);
  }
  .sn-toggle-pw {
    position: absolute; right: 14px;
    background: none; border: none; cursor: pointer;
    color: #bbb; padding: 0;
    display: flex; align-items: center;
    transition: color 0.2s;
  }
  .sn-toggle-pw:hover { color: var(--tan); }

  /* BUTTON */
  .sn-btn {
    display: block; width: 100%;
    margin-top: 30px;
    padding: 14px;
    background: var(--tan-btn);
    color: #fff;
    border: none; border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .sn-btn:hover { background: var(--tan-hover); transform: translateY(-1px); }
  .sn-btn:active { transform: translateY(0); }
  .sn-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* SIGN UP */
  .sn-signup {
    margin-top: 24px;
    text-align: center;
    font-size: 0.85rem; color: var(--text-light);
  }
  .sn-signup a {
    color: var(--text-dark);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
  .sn-signup a:hover { color: var(--tan-hover); }

  .sn-helper-row {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.78rem;
    color: var(--text-mid);
  }
  .sn-helper-row button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: var(--tan);
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .sn-helper-row button:hover { color: var(--tan-hover); }

  .sn-status {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 0.85rem;
    line-height: 1.4;
    margin-bottom: 20px;
  }
  .sn-status.success {
    background: #f2fbf6;
    border-color: #b8dec7;
    color: #1e5836;
  }
  .sn-status.error {
    background: #fff5f5;
    border-color: #f2b8b5;
    color: #8f1e1e;
  }
  .sn-status.info {
    background: #fffaf1;
    border-color: #f5d7a7;
    color: #7b4a0e;
  }
`;

/* ── SVG ICONS ── */
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const HeartIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#B8956A" stroke="none" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

/* ── MAIN COMPONENT ── */
export default function LoginPage({ onLogin, onNavigate }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const pageBackgroundStyle = {
    backgroundImage: `url(${loginBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  useEffect(() => {
    if (!status) return
    const timer = setTimeout(() => setStatus(null), 4500)
    return () => clearTimeout(timer)
  }, [status])

  const handleNav = (target) => (event) => {
    event.preventDefault()
    onNavigate?.(target)
  }

  const handleDemoFill = (event) => {
    event.preventDefault()
    setUsername('admin')
    setPassword('admin123')
    setStatus({ type: 'info', message: 'เติมบัญชีเดโม่ admin / admin123 ให้แล้วค่ะ' })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!username.trim() || !password) {
      setStatus({ type: 'error', message: 'กรุณากรอก Username และ Password ให้ครบค่ะ' })
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: username.trim(), password }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.message || 'ไม่สามารถเข้าสู่ระบบได้ในขณะนี้')
      }

      setStatus({ type: 'success', message: 'เข้าสู่ระบบสำเร็จ กำลังพาไปยังหน้าบันทึกค่ะ' })
      onLogin?.(data.username || username.trim())
    } catch (err) {
      const friendly = err.message.includes('Failed to fetch')
        ? 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่อีกครั้ง'
        : err.message
      setStatus({ type: 'error', message: friendly })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{styles}</style>

      <div className="sn-page" style={pageBackgroundStyle}>
        {/* NAVBAR */}
        <header className="sn-nav">
          <div className="sn-nav-inner">
            <div className="sn-brand">
              <HeartIcon size={18} />
              <span className="sn-brand-name">SecureNote</span>
            </div>
            <div className="sn-nav-right">
              <button type="button" className="sn-nav-link" onClick={handleNav('home')}>
                Home
              </button>
              <button type="button" className="sn-nav-link" onClick={handleNav('about')}>
                About
              </button>
              <button type="button" className="sn-nav-link" onClick={handleNav('contact')}>
                Contact
              </button>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="sn-main">

          {/* LOGIN CARD */}
          <div className="sn-card">
            <h1 className="sn-title">How was your day?</h1>
            <p className="sn-sub">Log in to pour your heart out. Your thoughts are always safe with us.</p>

            {status && (
              <div className={`sn-status ${status.type}`} role="status">
                {status.message}
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* Username */}
              <div className="sn-field">
                <label className="sn-label" htmlFor="sn-username">Username</label>
                <div className="sn-input-wrap">
                  <span className="sn-input-icon"><IconUser /></span>
                  <input
                    id="sn-username"
                    className="sn-input"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="sn-field">
                <label className="sn-label" htmlFor="sn-password">Password</label>
                <div className="sn-input-wrap">
                  <span className="sn-input-icon"><IconLock /></span>
                  <input
                    id="sn-password"
                    className="sn-input"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    className="sn-toggle-pw"
                    onClick={() => setShowPw((p) => !p)}
                    type="button"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>

              <div className="sn-helper-row">
                <button type="button" onClick={handleNav('contact')}>
                  ลืมรหัสผ่าน?
                </button>
                <button type="button" onClick={handleDemoFill}>
                  ใช้บัญชีเดโม่
                </button>
              </div>

              <button className="sn-btn" type="submit" disabled={loading}>
                {loading ? 'กำลังเข้าสู่ระบบ…' : 'Log In'}
              </button>
            </form>

            <p className="sn-signup">
              Don't have an account?{' '}
              <a href="#signup" onClick={handleNav('about')}>
                Sign up
              </a>
            </p>
          </div>

        </main>
      </div>
    </>
  )
}
