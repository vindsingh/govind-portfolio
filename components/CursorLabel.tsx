'use client';

interface CursorLabelProps {
  visible: boolean;
  x: number;
  y: number;
}

export default function CursorLabel({ visible, x, y }: CursorLabelProps) {
  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y - 28,
        transform: 'translateX(-50%)',
        background: '#1A1A1A',
        color: '#FFFFFF',
        fontFamily: 'var(--font-fragment-mono)',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '6px 12px',
        borderRadius: '4px',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 150ms ease',
        whiteSpace: 'nowrap',
      }}
    >
      VIEW CASE STUDY
    </div>
  );
}
