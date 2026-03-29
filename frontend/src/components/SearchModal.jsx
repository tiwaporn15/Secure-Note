import { useState, useRef, useEffect } from 'react'

export default function SearchModal({ initialQuery = '', onSearch, onClose }) {
  const [query, setQuery] = useState(initialQuery)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(query)
    onClose()
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div style={s.backdrop} onClick={onClose} />

      {/* Modal */}
      <div style={s.modal}>
        <div style={s.header}>
          <h2 style={s.title}>Search Notes</h2>
          <button onClick={onClose} style={s.closeBtn} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.body}>
            <label style={s.label}>Search by title or content</label>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type something..."
              style={s.input}
              autoComplete="off"
            />
            <p style={s.hint}>
              Press <kbd>Enter</kbd> to search or <kbd>Esc</kbd> to close
            </p>
          </div>

          <div style={s.footer}>
            <button type="button" onClick={onClose} style={{ ...s.btn, ...s.cancelBtn }}>
              Cancel
            </button>
            <button type="submit" style={{ ...s.btn, ...s.searchBtn }}>
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

const s = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(44, 24, 16, 0.4)',
    zIndex: 999,
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #FDFCF9 0%, #FAF8F3 100%)',
    borderRadius: 16,
    boxShadow: '0 20px 60px rgba(107, 88, 56, 0.25), 0 0 40px rgba(184, 149, 106, 0.1)',
    border: '1px solid #F2EDE4',
    zIndex: 1000,
    maxWidth: '480px',
    width: '90%',
    animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  header: {
    padding: '20px 24px',
    borderBottom: '2px solid #F2EDE4',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(90deg, rgba(184, 149, 106, 0.08) 0%, transparent 100%)',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 700,
    color: '#2C1810',
    letterSpacing: '-0.02em',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#B8956A',
    padding: '4px 8px',
    transition: 'color 0.2s, transform 0.2s',
    borderRadius: 4,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    padding: '24px',
  },
  label: {
    display: 'block',
    fontSize: '15px',
    fontWeight: 700,
    color: '#6B5838',
    marginBottom: '12px',
    letterSpacing: '0.01em',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #E5DDD2',
    borderRadius: 10,
    fontSize: '15px',
    fontFamily: 'var(--font-sans)',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
    outline: 'none',
    background: '#FDFCF9',
    boxShadow: '0 2px 8px rgba(107, 88, 56, 0.05)',
  },
  hint: {
    fontSize: '13px',
    color: '#9A9490',
    marginTop: '10px',
    marginBottom: 0,
    fontStyle: 'italic',
  },
  footer: {
    padding: '16px 24px',
    borderTop: '2px solid #F2EDE4',
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    background: 'linear-gradient(90deg, transparent 0%, rgba(184, 149, 106, 0.04) 100%)',
  },
  btn: {
    padding: '11px 18px',
    border: 'none',
    borderRadius: 8,
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: '0.02em',
  },
  cancelBtn: {
    background: '#F5F1ED',
    color: '#6B5838',
    border: '1px solid #E5DDD2',
  },
  searchBtn: {
    background: 'linear-gradient(135deg, #B8956A 0%, #A67C52 100%)',
    color: 'white',
    boxShadow: '0 4px 16px rgba(184, 149, 106, 0.35)',
  },
}
