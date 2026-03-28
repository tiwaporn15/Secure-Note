/**
 * AboutPage.jsx — About the creator
 */

const HeartIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#B8956A" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const PersonIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
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
          <div className="nav-right" style={s.navRight}>
            <button onClick={() => onNavigate('home')} style={s.navLink}>Home</button>
            <button onClick={() => onNavigate('about')} style={{ ...s.navLink, fontWeight: 600, color: '#F6C697' }}>About</button>
            <button onClick={() => onNavigate('contact')} style={s.navLink}>Contact</button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main style={s.main}>
        <div style={s.container}>
          <div style={s.card}>
            <div style={s.header}>
              <div style={s.avatar}><PersonIcon /></div>
              <h1 style={s.name}>Tiwaporn Panpomchuen</h1>
              <p style={s.title}>Full-Stack Developer | Student</p>
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
                {/* <div style={s.infoRow}>
                  <span style={s.label}>Program:</span>
                  <span style={s.value}>Information Technology</span>
                </div> */}
              </div>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>About SecureNote</h2>
              <p style={s.description}>
                SecureNote is a full-stack web application created as an academic project to demonstrate modern web development principles. 
                Built with React, Node.js, and Express, it showcases secure authentication, RESTful API design, and cloud data persistence using PocketHost.
              </p>
              <p style={s.description}>
                The application emphasizes user privacy, data security, and a pleasant user experience with romantic, warm aesthetic design.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Tech Stack</h2>
              <div style={s.techStack}>
                <div style={s.tech}>
                  <span style={s.techIcon}>⚛️</span>
                  <span>React.js + Vite</span>
                </div>
                <div style={s.tech}>
                  <span style={s.techIcon}>🟢</span>
                  <span>Node.js + Express</span>
                </div>
                <div style={s.tech}>
                  <span style={s.techIcon}>🗄️</span>
                  <span>PocketBase (PocketHost)</span>
                </div>
                <div style={s.tech}>
                  <span style={s.techIcon}>🔐</span>
                  <span>Session Authentication</span>
                </div>
              </div>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Key Features</h2>
              <ul style={s.featureList}>
                <li>Create, read, and delete secure notes</li>
                <li>Session-based authentication with role-based access</li>
                <li>Cloud persistence with PocketHost API</li>
                <li>Admin panel for managing all notes</li>
                <li>Loading states and network error recovery</li>
                <li>Warm, cream aesthetic UI design</li>
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
    background: '#FEFBF7',
    fontFamily: 'var(--font-sans)',
  },
  nav: {
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(255,255,255,0.93)',
    backdropFilter: 'blur(14px)',
    borderBottom: '1px solid rgba(170,140,100,0.2)',
    boxShadow: '0 1px 12px rgba(45,37,31,0.04)',
  },
  navInner: {
    maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem',
    height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '1rem',
  },
  brand: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  star: { fontSize: '1.2rem' },
  brandName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.15rem', fontWeight: 600,
    color: '#2D251F', letterSpacing: '0.02em',
  },
  navRight: { display: 'flex', alignItems: 'center', gap: '2rem' },
  navLink: { 
    background: 'none', border: 'none', 
    fontSize: '0.95rem', color: '#9A8570',
    cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'var(--font-sans)',
    fontWeight: 500,
  },
  main: { padding: '3rem 1.5rem' },
  container: { maxWidth: 900, margin: '0 auto' },
  card: {
    background: 'white',
    border: '1px solid rgba(170,140,100,0.2)',
    borderRadius: 16,
    padding: '2.5rem',
    boxShadow: '0 4px 20px rgba(45,37,31,0.07)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #F5EFE8',
  },
  avatar: { 
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    marginBottom: '1rem',
    color: '#B8956A',
  },
  name: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2rem', fontWeight: 700,
    color: '#3D3228', lineHeight: 1.2,
  },
  title: { fontSize: '1.1rem', color: '#9A8570', marginTop: '0.5rem' },
  section: { marginBottom: '2rem' },
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.5rem', fontWeight: 600,
    color: '#3D3228', marginBottom: '1rem',
  },
  infoBlock: { 
    background: '#FEFBF7',
    padding: '1.5rem',
    borderRadius: 10,
    border: '1px solid #EDE5DB',
  },
  infoRow: {
    display: 'flex', gap: '1rem',
    marginBottom: '0.75rem',
    fontSize: '0.95rem',
  },
  label: { fontWeight: 600, color: '#745C4E', minWidth: '120px' },
  value: { color: '#3D3228' },
  description: {
    fontSize: '0.95rem', color: '#745C4E',
    lineHeight: 1.8, marginBottom: '1rem',
  },
  techStack: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  tech: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '1rem',
    background: '#F5EDE2', borderRadius: 8,
    border: '1px solid #E0D5C8',
    fontSize: '0.9rem', color: '#745C4E',
  },
  techIcon: { fontSize: '1.2rem' },
  featureList: {
    listStyle: 'none',
    display: 'flex', flexDirection: 'column', gap: '0.75rem',
    fontSize: '0.95rem', color: '#745C4E',
    lineHeight: 1.8,
  },
}
