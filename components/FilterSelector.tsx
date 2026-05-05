'use client'

import { useState } from 'react'

const options = [
  { id: 'everything', label: 'Everything' },
  { id: 'built', label: 'What I\'ve built' },
  { id: 'think', label: 'How I think' },
  { id: 'who', label: 'Who I am' },
]

interface FilterSelectorProps {
  selected: string
  onChange: (id: string) => void
}

export function FilterSelector({ selected, onChange }: FilterSelectorProps) {
  const [open, setOpen] = useState(false)
  const current = options.find(o => o.id === selected) || options[0]

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '48px',
      }}>
        <span style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.02em',
        }}>
          I work in
        </span>

        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            border: '0.5px solid var(--text-primary)',
            borderRadius: '100px',
            background: 'var(--text-primary)',
            color: 'var(--bg)',
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '0.01em',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {current.label}
          <span style={{
            display: 'inline-block',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            fontSize: '10px',
          }}>▼</span>
        </button>
      </div>

      {open && (
        <div style={{
          position: 'absolute',
          top: '44px',
          left: '72px',
          background: 'var(--bg)',
          border: '0.5px solid var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
          zIndex: 50,
          minWidth: '200px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}>
          {options.map(option => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id)
                setOpen(false)
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '12px 20px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: option.id === selected
                  ? 'var(--text-primary)'
                  : 'var(--text-secondary)',
                fontWeight: option.id === selected ? '500' : '400',
                background: option.id === selected
                  ? 'var(--bg-card)'
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.background = 'var(--bg-card)')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.background =
                  option.id === selected ? 'var(--bg-card)' : 'transparent')
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
