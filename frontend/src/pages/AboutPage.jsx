/**
 * AboutPage.jsx — About the creator
 */

const HeartIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#B8956A" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

/* ✦ Monogram avatar — personal, warm, on-brand */
const MonogramAvatar = ({ name }) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div style={{
      width: 80, height: 80, borderRadius: '50%',
      background: '#F5EDE2',
      border: '2px solid #E0D5C8',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-serif)',
      fontSize: '1.9rem', fontWeight: 400, color: '#8B6F47',
      letterSpacing: '0.02em',
      boxShadow: '0 4px 16px rgba(184,149,106,0.18)',
    }}>
      {initials}
    </div>
  )
}

/* ✦ Warm dot bullet for feature list */
const WarmDot = () => (
  <svg width="7" height="7" viewBox="0 0 7 7" style={{ flexShrink: 0, marginTop: '0.45rem' }}>
    <circle cx="3.5" cy="3.5" r="3.5" fill="#C4A882"/>
  </svg>
)

export default function AboutPage({ onNavigate }) {
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
            <button onClick={() => onNavigate('about')} style={{ ...s.navLink, ...s.navLinkActive }}>About</button>
            <button onClick={() => onNavigate('contact')} style={s.navLink}>Contact</button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main style={s.main}>
        <div style={s.container}>
          <div style={s.card}>
            <div style={s.header}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <MonogramAvatar name="Tiwaporn Panpomchuen" />
              </div>
              <h1 style={s.name}>Tiwaporn Panpomchuen</h1>
              <p style={s.title}>Full-Stack Developer · Student</p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Educational Background</h2>
              <div style={s.infoBlock}>
                <div style={s.infoRow}>
                  <span style={s.label}>University:</span>
                  <span style={s.value}>King Mongkut's Institute of Technology Ladkrabang</span>
                </div>
                <div style={s.infoRow}>
                  <span style={s.label}>Faculty:</span>
                  <span style={s.value}>School of Engineering</span>
                </div>
                <div style={s.infoRow}>
                  <span style={s.label}>Student ID:</span>
                  <span style={s.value}>66010309</span>
                </div>
              </div>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>About SecureNote</h2>
              <p style={s.description}>
                SecureNote is a full-stack web application created as an academic project to demonstrate modern web development principles.
                Built with React, Node.js, and Express, it showcases secure authentication, RESTful API design, and cloud data persistence using PocketHost.
              </p>
              <p style={s.description}>
                The application emphasizes user privacy, data security, and a pleasant user experience with a warm, journal-like aesthetic.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Tech Stack</h2>
              <div style={s.techStack}>
                {[
                  { icon: '⚛️', label: 'React.js + Vite' },
                  { icon: '🟢', label: 'Node.js + Express' },
                  { icon: '🗄️', label: 'PocketBase (PocketHost)' },
                  { icon: '🔐', label: 'Session Authentication' },
                ].map(({ icon, label }) => (
                  <div key={label} style={s.tech}>
                    <span style={s.techIcon}>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Key Features</h2>
              <ul style={s.featureList}>
                {[
                  'Create, read, and delete secure notes',
                  'Session-based authentication with role-based access',
                  'Cloud persistence with PocketHost API',
                  'Admin panel for managing all notes',
                  'Loading states and network error recovery',
                  'Warm, cream aesthetic UI design',
                ].map(item => (
                  <li key={item} style={s.featureItem}>
                    <WarmDot />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
    fontFamily: 'var(--font-serif)',
    fontSize: '1.15rem', fontWeight: 500,
    color: '#2D251F', letterSpacing: '0.02em',
  },
  navRight: { display: 'flex', alignItems: 'center', gap: '2rem' },
  navLink: {
    background: 'none', border: 'none',
    fontSize: '0.9rem', color: '#9A8570',
    cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 500,
    transition: 'color 0.2s',
    padding: '0.25rem 0',
  },
  /* Active: warm underline, no hardcoded color clash */
  navLinkActive: {
    color: '#8B6F47',
    borderBottom: '2px solid #B8956A',
    paddingBottom: '0',
  },
  main: { padding: '3rem 1.5rem' },
  container: { maxWidth: 900, margin: '0 auto' },
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
  name: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.8rem', fontWeight: 400,  /* lighter — serif doesn't need bold */
    color: '#3D3228', lineHeight: 1.2, marginBottom: '0.4rem',
  },
  title: { fontSize: '0.95rem', color: '#9A8570', marginTop: '0.4rem', fontStyle: 'italic' },
  section: { marginBottom: '2rem' },
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.35rem', fontWeight: 400,   /* 400, not 600 — consistent with app */
    color: '#3D3228', marginBottom: '1rem',
  },
  infoBlock: {
    background: '#FAF8F3',
    padding: '1.25rem 1.5rem',
    borderRadius: 10,
    border: '1px solid #EDE5DB',
  },
  infoRow: {
    display: 'flex', gap: '1rem',
    marginBottom: '0.65rem',
    fontSize: '0.9rem',
  },
  label: { fontWeight: 500, color: '#8B6F47', minWidth: '110px' },
  value: { color: '#3D3228' },
  description: {
    fontSize: '0.9rem', color: '#745C4E',
    lineHeight: 1.8, marginBottom: '0.85rem',
  },
  techStack: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '0.85rem',
  },
  tech: {
    display: 'flex', alignItems: 'center', gap: '0.65rem',
    padding: '0.85rem 1rem',
    background: '#FAF8F3', borderRadius: 8,
    border: '1px solid #EDE5DB',
    fontSize: '0.875rem', color: '#6B5838',
  },
  techIcon: { fontSize: '1.1rem' },
  /* Feature list with warm dots instead of plain <li> */
  featureList: {
    listStyle: 'none',
    display: 'flex', flexDirection: 'column', gap: '0.6rem',
  },
  featureItem: {
    display: 'flex', alignItems: 'flex-start', gap: '0.65rem',
    fontSize: '0.9rem', color: '#745C4E', lineHeight: 1.7,
  },
}
