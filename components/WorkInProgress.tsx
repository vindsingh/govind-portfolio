'use client'

import { useState, useEffect } from 'react'

export function WorkInProgress() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('wip-dismissed')
    if (!dismissed) setVisible(true)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('wip-dismissed', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'var(--text-primary)',
      color: 'var(--bg)',
      borderRadius: '100px',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '13px',
      fontFamily: 'var(--font-body)',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    }}>
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#8fbc8f',
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      <span style={{ color: '#aaa' }}>
        Always building.
      </span>
      <span>The work shown here is a start, not a summary.</span>
      <button
        onClick={dismiss}
        style={{
          color: '#666',
          fontSize: '16px',
          lineHeight: 1,
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: '0 0 0 4px',
          fontFamily: 'var(--font-body)',
        }}
      >
        ×
      </button>
    </div>
  )
}
