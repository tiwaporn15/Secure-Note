/**
 * ContactPage.jsx — Contact information
 */

const HeartIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#B8956A" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M4 6l8 6 8-6"/>
  </svg>
)

const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.4rem' }}>
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

export default function ContactPage({ onNavigate }) {
  return (
    <div style={s.root}>
      {/* ── Nav ── */}
      <header style={s.nav}>
        <div style={s.navInner}>
          <div style={s.brand}>
            <HeartIcon size={18} />
            <span style={s.brandName}>SecureNote</span>
          </div>
          <div style={s.navRight}>
            <button onClick={() => onNavigate('home')} style={s.navLink}>Home</button>
            <button onClick={() => onNavigate('about')} style={s.navLink}>About</button>
            <button onClick={() => onNavigate('contact')} style={{ ...s.navLink, ...s.navLinkActive }}>Contact</button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main style={s.main}>
        <div style={s.container}>
          <div style={s.card}>
            <div style={s.header}>
              <h1 style={s.title}>Get in Touch</h1>
              <p style={s.subtitle}>Got questions or feedback about SecureNote? I'd love to hear from you!</p>
            </div>

            <div style={s.contactGrid}>
              {/* Email */}
              <div style={s.contactCard}>
                <div style={s.contactIcon}><EmailIcon /></div>
                <h3 style={s.contactTitle}>Email</h3>
                <p style={s.contactSub}>For inquiries and feedback</p>
                <a 
                  href="mailto:66010309@kmitl.ac.th" 
                  style={s.contactLink}
                >
                  66010309@kmitl.ac.th
                </a>
              </div>

              {/* LINE */}
              <div style={s.contactCard}>
                <div style={s.contactIcon}><ChatIcon /></div>
                <h3 style={s.contactTitle}>LINE</h3>
                <p style={s.contactSub}>Let's chat on LINE</p>
                <a 
                  href="https://line.me/ti/p/realtoon.twp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={s.contactLink}
                >
                    @realtoon.twp
                </a>
              </div>

              {/* Location */}
              <div style={s.contactCard}>
                <div style={s.contactIcon}><LocationIcon /></div>
                <h3 style={s.contactTitle}>Location</h3>
                <p style={s.contactSub}>Based at</p>
                <p style={s.contactValue}>
                  King Mongkut's Institute of Technology Ladkrabang<br/>
                  <span style={{ fontSize: '0.85rem', color: '#9A9490' }}>Thailand</span>
                </p>
              </div>

              {/* Response Time */}
              <div style={s.contactCard}>
                <div style={s.contactIcon}><ClockIcon /></div>
                <h3 style={s.contactTitle}>Response Time</h3>
                <p style={s.contactSub}>Usually replies within</p>
                <p style={s.contactValue}>24 hours</p>
              </div>
            </div>

            {/* Social Links */}
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Follow Me</h2>
              <div style={s.socialLinks}>
                <a href="#" style={s.socialBtn} title="Facebook">
                  <span>f</span>
                </a>
                <a href="#" style={s.socialBtn} title="Instagram">
                  <span>📷</span>
                </a>
                <a href="#" style={s.socialBtn} title="LinkedIn">
                  <span>in</span>
                </a>
                <a href="#" style={s.socialBtn} title="GitHub">
                  <span>⚙️</span>
                </a>
              </div>
            </div>

            {/* Message Section */}
            <div style={s.messageSection}>
              <h2 style={s.sectionTitle}>Send a Message</h2>
              <form style={s.form} onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! This is a demo form.') }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  style={s.input}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  style={s.input}
                  required
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  style={s.textarea}
                  required
                />
                <button type="submit" style={s.submitBtn}>
                  Send Message <SendIcon />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const s = {
  root: {
    minHeight: '100vh',
    background: '#FAF8F3',
    fontFamily: '"DM Sans", system-ui, sans-serif',
  },
  nav: {
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(255,255,255,0.93)',
    backdropFilter: 'blur(14px)',
    borderBottom: '1px solid rgba(139,111,71,0.2)',
    boxShadow: '0 1px 12px rgba(107,88,56,0.05)',
  },
  navInner: {
    maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem',
    height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '1rem',
  },
  brand: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  brandName: {
    fontFamily: '"DM Serif Display", Georgia, serif',
    fontSize: '1.15rem', fontWeight: 500,
    color: '#2D251F', letterSpacing: '0.02em',
  },
  navRight: { display: 'flex', alignItems: 'center', gap: '2rem' },
  navLink: {
    background: 'none', border: 'none',
    fontSize: '0.9rem', color: '#9A8970',
    cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
    transition: 'color 0.2s', padding: '0.25rem 0',
  },
  navLinkActive: {
    color: '#8B6F47',
    borderBottom: '2px solid #B8956A',
  },
  main: { padding: '3rem 1.5rem' },
  container: { maxWidth: 1000, margin: '0 auto' },
  card: {
    background: 'white',
    border: '1px solid rgba(170,140,100,0.2)',
    borderRadius: 16,
    padding: '2.5rem',
    boxShadow: '0 4px 20px rgba(107,88,56,0.07)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #F5EFE8',
  },
  title: {
    fontFamily: '"DM Serif Display", Georgia, serif',
    fontSize: '2rem', fontWeight: 400,   /* lighter */
    color: '#3D3228', marginBottom: '0.5rem',
  },
  subtitle: { fontSize: '0.95rem', color: '#9A8570', lineHeight: 1.6 },
  contactGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem', marginBottom: '2.5rem',
  },
  contactCard: {
    background: '#FAF8F3',
    padding: '1.35rem',
    borderRadius: 12,
    border: '1px solid #EDE5DB',
    textAlign: 'center',
  },
  contactIcon: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    marginBottom: '0.5rem',
    color: '#B8956A',
  },
  contactTitle: {
    fontFamily: '"DM Serif Display", Georgia, serif',
    fontSize: '1.05rem', fontWeight: 400,
    color: '#3D3228', marginBottom: '0.25rem',
  },
  contactSub: { fontSize: '0.8rem', color: '#9A8570', marginBottom: '0.65rem' },
  contactLink: {
    display: 'inline-block',
    color: '#B8956A', textDecoration: 'none',
    fontWeight: 600, fontSize: '0.9rem',
  },
  contactValue: { fontSize: '0.875rem', color: '#3D3228', fontWeight: 500 },
  section: { marginBottom: '2.5rem' },
  sectionTitle: {
    fontFamily: '"DM Serif Display", Georgia, serif',
    fontSize: '1.35rem', fontWeight: 400,
    color: '#3D3228', marginBottom: '1.25rem',
    textAlign: 'center',
  },
  socialLinks: { display: 'flex', justifyContent: 'center', gap: '0.85rem' },
  /* Rounded-rect to match app's button language, not circle */
  socialBtn: {
    width: 46, height: 46,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#B8956A', color: 'white',
    borderRadius: 10,              /* matches app buttons */
    textDecoration: 'none',
    fontSize: '1.1rem', fontWeight: 600,
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 3px 10px rgba(184,149,106,0.3)',
  },
  messageSection: {
    borderTop: '1px solid #EDE4D6',
    paddingTop: '2rem',
  },
  form: {
    display: 'flex', flexDirection: 'column', gap: '0.85rem',
    maxWidth: 600, margin: '0 auto',
  },
  /* Cream background + warm focus ring — consistent with all other inputs */
  input: {
    padding: '0.8rem 1rem',
    background: '#FAF8F3',
    border: '1.5px solid #E2D9CC',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontFamily: '"DM Sans", inherit',
    color: '#1C1A19',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  textarea: {
    padding: '0.8rem 1rem',
    background: '#FAF8F3',
    border: '1.5px solid #E2D9CC',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontFamily: '"DM Sans", inherit',
    color: '#1C1A19',
    outline: 'none',
    resize: 'vertical',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    lineHeight: 1.65,
  },
  /* Submit button matches all other primary buttons */
  submitBtn: {
    padding: '0.85rem 1.5rem',
    background: '#B8956A', color: 'white',
    border: 'none', borderRadius: 8,
    fontSize: '0.9rem', fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(184,149,106,0.35)',   /* was missing */
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
}
