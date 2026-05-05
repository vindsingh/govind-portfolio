'use client'

import { useState, useEffect } from 'react'

export function WorkInProgress() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('wip-dismissed')
    if (!dismissed) {
      setTimeout(() => setVisible(true), 600)
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
          background: 'rgba(0,0,0,0.25)',
          zIndex: 998,
          animation: 'fadeIn 0.2s ease',
        }}
      />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        background: 'var(--bg)',
        border: '0.5px solid var(--border)',
        borderRadius: '20px',
        padding: '36px',
        width: 'min(440px, calc(100vw - 48px))',
        boxShadow: '0 24px 64px rgba(0,0,0,0.10)',
        animation: 'dialogIn 0.25s ease',
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#8fbc8f',
              display: 'inline-block',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
            }}>
              In progress
            </span>
          </div>
          <button
            onClick={dismiss}
            style={{
              color: 'var(--text-muted)',
              fontSize: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '0',
              fontFamily: 'var(--font-body)',
            }}
          >
            ×
          </button>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(20px, 4vw, 26px)',
          fontWeight: '500',
          letterSpacing: '-0.02em',
          lineHeight: '1.2',
          color: 'var(--text-primary)',
          marginBottom: '12px',
        }}>
          Always building.
        </h2>

        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          fontFamily: 'var(--font-body)',
          marginBottom: '28px',
        }}>
          The work shown here is a start, not a summary.
          More projects and thinking coming soon.
        </p>

        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
        }}>
          {['Falcon', 'CPKC', 'FOR/M', 'More soon...'].map((item, i) => (
            <span
              key={item}
              style={{
                padding: '6px 12px',
                borderRadius: '100px',
                border: '0.5px solid var(--border)',
                fontSize: '12px',
                color: i === 3 ? 'var(--text-muted)' : 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                background: i === 3 ? 'transparent' : 'var(--bg-card)',
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          onClick={dismiss}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '12px',
            background: 'var(--text-primary)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: '100px',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            fontWeight: '500',
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
        >
          Got it
        </button>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dialogIn {
          from { opacity: 0; transform: translate(-50%, -48%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  )
}
