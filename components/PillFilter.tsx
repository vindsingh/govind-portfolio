'use client'

const options = [
  { id: 'everything', label: 'All' },
  { id: 'built', label: 'Projects' },
  { id: 'think', label: 'Process' },
  { id: 'who', label: 'About' },
]

interface PillFilterProps {
  selected: string
  onChange: (id: string) => void
}

export function PillFilter({ selected, onChange }: PillFilterProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      marginBottom: '48px',
      background: 'var(--bg-card)',
      borderRadius: '100px',
      padding: '4px',
      width: 'fit-content',
    }}>
      {options.map(option => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          style={{
            padding: '8px 20px',
            borderRadius: '100px',
            border: 'none',
            background: option.id === selected
              ? 'var(--bg)'
              : 'transparent',
            color: option.id === selected
              ? 'var(--text-primary)'
              : 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: option.id === selected ? '500' : '400',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: option.id === selected
              ? '0 1px 4px rgba(0,0,0,0.08)'
              : 'none',
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
