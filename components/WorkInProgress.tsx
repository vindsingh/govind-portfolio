'use client'

import { useState, useEffect } from 'react'

export function WorkInProgress() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('wip-dismissed')
    if (!dismissed) {
      setTimeout(() => setVisible(true), 800)
    }
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('wip-dismissed', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <div
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 998,
          background: 'transparent',
        }}
      />
      <div style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999,
        background: 'var(--text-primary)',
        color: 'var(--bg)',
        borderRadius: '100px',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '13px',
        fontFamily: 'var(--font-body)',
        whiteSpace: 'nowrap',
        maxWidth: 'calc(100vw - 48px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
        animation: 'slideUp 0.3s ease',
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#8fbc8f',
          display: 'inline-block',
          flexShrink: 0,
        }} />
        <span style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          Always building. The work shown here is a start, not a summary.
        </span>
        <button
          onClick={dismiss}
          style={{
            color: '#888',
            fontSize: '18px',
            lineHeight: 1,
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: '0',
            flexShrink: 0,
            fontFamily: 'var(--font-body)',
          }}
        >
          ×
        </button>
      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  )
}
