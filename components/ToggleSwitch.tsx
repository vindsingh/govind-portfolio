'use client'

import { createContext, useContext, useState } from 'react'

type ViewMode = 'curious' | 'standard'

interface ToggleContextType {
  mode: ViewMode
  toggle: () => void
}

const ToggleContext = createContext<ToggleContextType>({
  mode: 'curious',
  toggle: () => {},
})

export function ToggleProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ViewMode>('curious')
  const toggle = () => setMode(m => m === 'curious' ? 'standard' : 'curious')

  return (
    <ToggleContext.Provider value={{ mode, toggle }}>
      {children}
    </ToggleContext.Provider>
  )
}

export function useToggle() {
  return useContext(ToggleContext)
}

export function ToggleSwitch() {
  const { mode, toggle } = useToggle()
  const isStandard = mode === 'standard'

  return (
    <button
      onClick={toggle}
      aria-label="Toggle view mode"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px 0',
      }}
    >
      <span style={{
        fontSize: '12px',
        letterSpacing: '0.04em',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-body)',
        textTransform: 'uppercase',
      }}>
        {isStandard ? 'Standard' : 'Curious'}
      </span>

      <div style={{
        width: '40px',
        height: '22px',
        borderRadius: '100px',
        background: isStandard ? 'var(--text-primary)' : 'var(--border)',
        position: 'relative',
        transition: 'background 0.25s ease',
      }}>
        <div style={{
          position: 'absolute',
          top: '3px',
          left: isStandard ? '21px' : '3px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: isStandard ? 'var(--bg)' : 'var(--text-secondary)',
          transition: 'left 0.25s ease',
        }} />
      </div>
    </button>
  )
}
