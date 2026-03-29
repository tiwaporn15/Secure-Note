export default function SearchBar({ query, onQueryChange, onClear }) {
  return (
    <div style={s.wrapper}>
      <SearchIcon />
      <input
        type="text"
        placeholder="Search notes by title or content..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        style={s.input}
      />
      {query && (
        <button
          onClick={onClear}
          style={s.clearBtn}
          aria-label="Clear search"
          title="Clear"
        >
          ✕
        </button>
      )}
    </div>
  )
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A9490" strokeWidth="2" style={{ flexShrink: 0 }}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const s = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    background: 'white',
    border: '1.5px solid #E5DDD2',
    borderRadius: 8,
    padding: '0.6rem 0.9rem',
    marginBottom: '1.5rem',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(107, 88, 56, 0.06)',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '0.9rem',
    color: '#2C1810',
    fontFamily: 'var(--font-sans)',
    background: 'none',
    padding: '0.1rem 0',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9A9490',
    padding: '0.2rem 0.3rem',
    fontSize: '1rem',
    transition: 'color 0.2s',
    flexShrink: 0,
  },
}
