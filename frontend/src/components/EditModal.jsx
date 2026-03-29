import { useState } from 'react'

export default function EditModal({ note, onSave, onCancel, saving = false }) {
  const [title, setTitle] = useState(note.title || '')
  const [content, setContent] = useState(note.content || '')
  const [error, setError] = useState('')

  function handleSave() {
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty')
      return
    }
    onSave(note.id, { title, content })
  }

  return (
    <>
      {/* Backdrop */}
      <div style={s.backdrop} onClick={onCancel} />

      {/* Modal */}
      <div style={s.modal}>
        <div style={s.header}>
          <h2 style={s.title}>Edit Note</h2>
          <button onClick={onCancel} style={s.closeBtn} aria-label="Close">✕</button>
        </div>

        <div style={s.body}>
          <label style={s.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setError('')
            }}
            placeholder="Note title"
            style={s.input}
            disabled={saving}
          />

          <label style={s.label}>Content</label>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setError('')
            }}
            placeholder="Note content"
            style={s.textarea}
            rows="8"
            disabled={saving}
          />

          {error && <div style={s.error}>{error}</div>}
        </div>

        <div style={s.footer}>
          <button onClick={onCancel} style={{ ...s.btn, ...s.cancelBtn }} disabled={saving}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ ...s.btn, ...s.saveBtn }} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
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
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    borderRadius: 12,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  header: {
    padding: '16px 20px',
    borderBottom: '1px solid #F2EDE4',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 600,
    color: '#2C1810',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#9A8A78',
    padding: '4px 8px',
    transition: 'color 0.2s',
  },
  body: {
    padding: '20px',
    overflowY: 'auto',
    flex: 1,
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#2C1810',
    marginBottom: '6px',
    marginTop: '12px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #E5DDD2',
    borderRadius: 8,
    fontSize: '14px',
    fontFamily: 'var(--font-sans)',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #E5DDD2',
    borderRadius: 8,
    fontSize: '14px',
    fontFamily: 'var(--font-sans)',
    boxSizing: 'border-box',
    resize: 'vertical',
    transition: 'border-color 0.2s',
  },
  error: {
    color: '#DC2626',
    fontSize: '13px',
    marginTop: '8px',
    padding: '8px 10px',
    background: '#FEE2E2',
    borderRadius: 6,
  },
  footer: {
    padding: '16px 20px',
    borderTop: '1px solid #F2EDE4',
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  btn: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: 6,
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  cancelBtn: {
    background: '#F5F1ED',
    color: '#2C1810',
  },
  saveBtn: {
    background: '#D97706',
    color: 'white',
  },
}
