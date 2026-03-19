import { useState, useRef, useEffect } from 'react'

export default function ComposePanel({ onSave, onCancel }) {
  const [title, setTitle]     = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const titleRef = useRef(null)

  useEffect(() => { titleRef.current?.focus() }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return setError('Please add a title.')
    if (!content.trim()) return setError('Please add some content.')
    setError('')
    setLoading(true)
    try {
      await onSave(title.trim(), content.trim())
    } catch (err) {
      setError(err.message || 'Failed to save note.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.panel}>
      <div style={s.header}>
        <h3 style={s.title}>New Note</h3>
        <button onClick={onCancel} style={s.closeBtn} aria-label="Close">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="compose-form">
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={e => { setTitle(e.target.value); setError('') }}
          placeholder="Note title…"
          style={s.titleInput}
          maxLength={120}
        />
        <textarea
          value={content}
          onChange={e => { setContent(e.target.value); setError('') }}
          placeholder="Write your note here…"
          style={s.contentInput}
          rows={5}
        />
        {error && (
          <div style={s.errMsg}>
            <InfoIcon /> {error}
          </div>
        )}
        <div className="compose-footer">
          <span style={s.charCount}>{content.length} chars</span>
          <div className="compose-btn-row">
            <button type="button" onClick={onCancel} style={s.cancelBtn}>Cancel</button>
            <button
              type="submit"
              disabled={loading || !title || !content}
              style={{ ...s.saveBtn, opacity:(!title||!content||loading)?0.5:1, cursor:(!title||!content||loading)?'not-allowed':'pointer' }}
            >
              {loading ? <><Spinner/> Saving…</> : <><SaveIcon/> Save Note</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const InfoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0}}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)
const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
)
const Spinner = () => (
  <span style={{width:13,height:13,border:'2px solid rgba(250,248,243,0.35)',borderTopColor:'var(--cream)',borderRadius:'50%',animation:'spin 0.6s linear infinite',display:'inline-block',flexShrink:0}} />
)

const s = {
  panel: { background:'var(--white)', border:'1px solid var(--cream-3)', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-md)', overflow:'hidden' },
  header: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 1.25rem 0.75rem', borderBottom:'1px solid var(--cream-2)' },
  title: { fontFamily:'var(--font-serif)', fontSize:'1.1rem', fontWeight:500, color:'var(--charcoal)' },
  closeBtn: { background:'none', border:'none', cursor:'pointer', color:'var(--charcoal-4)', fontSize:'1rem', padding:'0.2rem 0.4rem', borderRadius:'4px' },
  titleInput: { width:'100%', padding:'0.65rem 0.75rem', background:'var(--cream)', border:'1.5px solid var(--cream-3)', borderRadius:'var(--radius-sm)', fontSize:'0.95rem', fontFamily:'var(--font-serif)', fontWeight:500, color:'var(--charcoal)', outline:'none', transition:'border-color 0.2s', boxSizing:'border-box' },
  contentInput: { width:'100%', padding:'0.65rem 0.75rem', background:'var(--cream)', border:'1.5px solid var(--cream-3)', borderRadius:'var(--radius-sm)', fontSize:'0.875rem', fontFamily:'var(--font-sans)', color:'var(--charcoal)', outline:'none', resize:'vertical', lineHeight:1.65, transition:'border-color 0.2s', boxSizing:'border-box' },
  errMsg: { display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.78rem', color:'var(--red)', animation:'slideDown 0.2s ease' },
  charCount: { fontSize:'0.72rem', color:'var(--charcoal-4)' },
  cancelBtn: { background:'none', border:'1px solid var(--cream-3)', borderRadius:'var(--radius-sm)', padding:'0.5rem 1rem', fontSize:'0.82rem', fontFamily:'var(--font-sans)', color:'var(--charcoal-3)', cursor:'pointer' },
  saveBtn: { display:'flex', alignItems:'center', gap:'0.4rem', background:'var(--charcoal)', color:'var(--cream)', border:'none', borderRadius:'var(--radius-sm)', padding:'0.5rem 1.1rem', fontSize:'0.82rem', fontWeight:500, fontFamily:'var(--font-sans)', transition:'all 0.2s', whiteSpace:'nowrap' },
}