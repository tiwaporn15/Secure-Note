/**
 * NoteCard.jsx — Individual note card component
 * Demonstrates React component mapping and conditional rendering.
 */
import { useState } from 'react'

export default function NoteCard({ note, onDelete, deleting, animDelay = 0 }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  function formatDate(iso) {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  // Derive initials from title for the colored avatar
  const initial = (note.title || '?')[0].toUpperCase()

  return (
    <article
      style={{
        ...s.card,
        opacity: deleting ? 0.4 : 1,
        transform: deleting ? 'scale(0.97)' : 'scale(1)',
        animationDelay: `${animDelay}ms`,
      }}
    >
      {/* Avatar */}
      <div style={s.top}>
        <div style={s.avatar}>{initial}</div>
        <div style={s.actions}>
          {confirmDelete ? (
            <div style={s.confirmWrap}>
              <span style={s.confirmText}>Delete?</span>
              <button onClick={() => onDelete(note.id)} disabled={deleting} style={{ ...s.actionBtn, ...s.confirmYes }}>
                {deleting ? '…' : 'Yes'}
              </button>
              <button onClick={() => setConfirmDelete(false)} style={{ ...s.actionBtn, ...s.confirmNo }}>
                No
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)} style={s.deleteBtn} aria-label="Delete note" title="Delete">
              <TrashIcon />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={s.body}>
        <h3 style={s.title}>{note.title}</h3>
        <p style={s.content}>{note.content}</p>
      </div>

      {/* Footer */}
      <div style={s.footer}>
        <span style={s.date}>{formatDate(note.created)}</span>
        <span style={s.badge}>note</span>
      </div>
    </article>
  )
}

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
)

const s = {
  card: {
    background: 'var(--white)',
    border: '1px solid var(--cream-3)',
    borderRadius: 'var(--radius-md)',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s',
    boxShadow: 'var(--shadow-sm)',
    animation: 'fadeUp 0.4s var(--ease) both',
    cursor: 'default',
  },
  top: { display:'flex', alignItems:'center', justifyContent:'space-between' },
  avatar: {
    width: 34, height: 34, borderRadius: 'var(--radius-sm)',
    background: 'var(--brown-faint)', color: 'var(--brown-dark)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600,
    flexShrink: 0,
  },
  actions: { display:'flex', alignItems:'center', gap:'0.4rem' },
  deleteBtn: {
    background:'none', border:'1px solid transparent', borderRadius:'var(--radius-sm)',
    color:'var(--charcoal-4)', cursor:'pointer', padding:'0.3rem 0.4rem',
    display:'flex', transition:'all 0.15s',
  },
  confirmWrap: { display:'flex', alignItems:'center', gap:'0.4rem', animation:'slideDown 0.15s ease' },
  confirmText: { fontSize:'0.75rem', color:'var(--charcoal-3)' },
  actionBtn: {
    border:'none', borderRadius:'4px', padding:'0.2rem 0.55rem',
    fontSize:'0.73rem', fontWeight:500, fontFamily:'var(--font-sans)', cursor:'pointer',
  },
  confirmYes: { background:'var(--red)', color:'var(--white)' },
  confirmNo:  { background:'var(--cream-2)', color:'var(--charcoal-2)' },
  body: { display:'flex', flexDirection:'column', gap:'0.5rem', flex:1 },
  title: {
    fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 500,
    color: 'var(--charcoal)', lineHeight: 1.3,
    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
  },
  content: {
    fontSize: '0.82rem', color: 'var(--charcoal-3)', lineHeight: 1.65,
    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
    whiteSpace: 'pre-wrap',
  },
  footer: { display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'0.5rem', borderTop:'1px solid var(--cream-2)', marginTop:'auto' },
  date: { fontSize:'0.72rem', color:'var(--charcoal-4)' },
  badge: { fontSize:'0.65rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--brown)', background:'var(--brown-faint)', padding:'0.15rem 0.5rem', borderRadius:'20px' },
}
