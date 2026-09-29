'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    label: '',
    visible: false,
  });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      let el = e.target as HTMLElement | null;
      let label = '';
      let cardEl: HTMLElement | null = null;

      while (el && el !== document.body) {
        const attr = el.getAttribute('data-cursor');
        if (attr) {
          label = attr;
          cardEl = el;
          break;
        }
        el = el.parentElement;
      }

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (!label || !cardEl) {
          setState((s) => ({ ...s, visible: false }));
          return;
        }

        const rect = cardEl.getBoundingClientRect();
        const pillW = 120;
        const pillH = 28;

        const targetX = e.clientX + 12;
        const targetY = e.clientY + 12;

        const clampedX = Math.max(rect.left + 10, Math.min(targetX, rect.right - pillW - 10));
        const clampedY = Math.max(rect.top + 10, Math.min(targetY, rect.bottom - pillH - 10));

        setState({
          x: clampedX,
          y: clampedY,
          label,
          visible: true,
        });
      });
    };

    const leave = () => setState((s) => ({ ...s, visible: false }));

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!state.visible || !state.label) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: state.x,
        top: state.y,
        zIndex: 99999,
        pointerEvents: 'none',
        background: '#000000',
        color: '#FFFFFF',
        borderRadius: '4px',
        padding: '6px 12px',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-fragment-mono)',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
      }}
    >
      {state.label}
    </div>
  );
}

