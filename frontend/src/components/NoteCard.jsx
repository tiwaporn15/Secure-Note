import { useState } from 'react'

export default function NoteCard({ note, onDelete, onEdit, deleting, animDelay = 0 }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [hovered, setHovered] = useState(false)

  function formatDateTime(iso) {
    if (!iso) return ''
    const date = new Date(iso)
    const dateStr = date.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
    const timeStr = date.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' })
    return `${dateStr} at ${timeStr}`
  }

  const initial = (note.title || '?')[0].toUpperCase()

  return (
    <article
      style={{
        ...s.card,
        opacity: deleting ? 0.4 : 1,
        transform: deleting ? 'scale(0.97)' : hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 28px rgba(107,88,56,0.12)' : '0 2px 10px rgba(107,88,56,0.06)',
        animationDelay: `${animDelay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Warm accent bar */}
      <div style={s.accentBar} />

      <div style={s.top}>
        <div style={s.avatar}>{initial}</div>
        <div style={s.actions}>
          {confirmDelete ? (
            <div className="confirm-wrap" style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
              <span style={s.confirmText}>Delete?</span>
              <button onClick={() => onDelete(note.id)} disabled={deleting} style={{ ...s.actionBtn, ...s.confirmYes }}>
                {deleting ? '…' : 'Yes'}
              </button>
              <button onClick={() => setConfirmDelete(false)} style={{ ...s.actionBtn, ...s.confirmNo }}>
                No
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => onEdit(note)} style={s.editBtn} aria-label="Edit note">
                <EditIcon />
              </button>
              <button onClick={() => setConfirmDelete(true)} style={s.deleteBtn} aria-label="Delete note">
                <TrashIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={s.body}>
        <h3 style={s.title}>{note.title}</h3>
        <p style={s.content}>{note.content}</p>
      </div>

      <div style={s.footer}>
        <span style={s.date}>{formatDateTime(note.created)}</span>
        <span style={s.badge}>note</span>
      </div>
    </article>
  )
}

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
  </svg>
)

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

const s = {
  card: {
    background: 'white',
    border: '1px solid #F2EDE4',
    borderRadius: 14,
    padding: '0 0 0 0',           /* padding lives inside body/footer */
    display: 'flex', flexDirection: 'column', gap: 0,
    transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s',
    animation: 'fadeUp 0.4s cubic-bezier(0.4,0,0.2,1) both',
    overflow: 'hidden',
  },
  /* ✦ warm gradient accent bar — the key missing piece */
  accentBar: {
    height: 3,
    background: 'linear-gradient(90deg, #C4A882, #E8A850)',
    opacity: 0.7,
    flexShrink: 0,
  },
  top: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '1rem 1.1rem 0',
  },
  avatar: {
    width: 34, height: 34, borderRadius: 8,
    background: '#F5EDE2',          /* warm cream, not undefined var */
    color: '#8B6F47',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-serif)',
    fontSize: '1rem', fontWeight: 400, flexShrink: 0,
  },
  actions: { display: 'flex', alignItems: 'center', gap: '0.4rem' },
  editBtn: {
    background: 'none', border: '1px solid transparent',
    borderRadius: 7, color: '#9A9490',
    cursor: 'pointer', padding: '0.3rem 0.4rem', display: 'flex',
    transition: 'color 0.15s, border-color 0.15s',
  },
  deleteBtn: {
    background: 'none', border: '1px solid transparent',
    borderRadius: 7, color: '#9A9490',
    cursor: 'pointer', padding: '0.3rem 0.4rem', display: 'flex',
    transition: 'color 0.15s, border-color 0.15s',
  },
  confirmText: { fontSize: '0.75rem', color: '#6B5838', whiteSpace: 'nowrap' },
  actionBtn: {
    border: 'none', borderRadius: 5,
    padding: '0.2rem 0.55rem', fontSize: '0.73rem',
    fontWeight: 500, fontFamily: 'var(--font-sans)', cursor: 'pointer',
  },
  confirmYes: { background: '#B04040', color: '#fff' },
  confirmNo:  { background: '#F2EDE4', color: '#423D38' },
  body: {
    display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1,
    padding: '0.75rem 1.1rem 0.85rem',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.05rem', fontWeight: 600, color: '#1C1A19',
    lineHeight: 1.3,
    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
  },
  content: {
    fontSize: '0.82rem', color: '#6B6560', lineHeight: 1.65,
    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
    whiteSpace: 'pre-wrap',
  },
  footer: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0.6rem 1.1rem',
    borderTop: '1px solid #F2EDE4',
    background: '#FDFCF9',          /* slightly warmer than white */
    marginTop: 'auto',
  },
  date: { fontSize: '0.72rem', color: '#9A9490' },
  badge: {
    fontSize: '0.65rem', fontWeight: 500,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    color: '#8B7355',
    background: '#F2EDE4',          /* warm cream, no undefined token */
    padding: '0.15rem 0.5rem', borderRadius: 20,
  },
}