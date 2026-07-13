'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    label: '',
    visible: false,
  })
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      // Walk up the DOM tree to find data-cursor attribute
      let el = e.target as Element | null
      let label = ''
      while (el && el !== document.body) {
        const attr = el.getAttribute('data-cursor')
        if (attr) {
          label = attr
          break
        }
        el = el.parentElement
      }

      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        setState({ x: e.clientX, y: e.clientY, label, visible: !!label })
      })
    }

    const leave = () => setState(s => ({ ...s, visible: false }))

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  if (!state.visible || !state.label) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: state.x + 14,
        top: state.y + 14,
        zIndex: 99999,
        pointerEvents: 'none',
        background: '#000000',
        borderRadius: '3px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        // Fixed width so marquee has a container to scroll within
        width: '140px',
        padding: '6px 0',
      }}
    >
      <style>{`
        @keyframes cursor-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        key={state.label}
        style={{
          display: 'inline-flex',
          animation: 'cursor-marquee 3s linear infinite',
          // Double the text so it loops seamlessly
        }}
      >
        <span style={{
          fontFamily: 'var(--font-fragment-mono)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          paddingRight: '32px', // gap between repetitions
        }}>
          {state.label}
        </span>
        <span style={{
          fontFamily: 'var(--font-fragment-mono)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          paddingRight: '32px',
        }}>
          {state.label}
        </span>
      </div>
    </div>
  );
}
