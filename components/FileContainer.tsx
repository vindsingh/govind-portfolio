'use client'

import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────────────
   DESKTOP SURFACE
   The background "desktop" area that hosts the FileContainer.
───────────────────────────────────────────────────────────────────────── */

interface DesktopSurfaceProps {
  children: React.ReactNode
  className?: string
}

export function DesktopSurface({ children, className = '' }: DesktopSurfaceProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        padding: '0 clamp(12px, 2vw, 24px) clamp(12px, 2vw, 24px)',
      }}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   FILE CONTAINER
   The central UI metaphor — the entire homepage content lives inside this.
   Styled like a digital file open on a desktop (Apple Files / iOS glass).
───────────────────────────────────────────────────────────────────────── */

interface FileContainerProps {
  children: React.ReactNode
  className?: string
}

export function FileContainer({ children, className = '' }: FileContainerProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1320px',
        marginInline: 'auto',
        backgroundColor: 'var(--color-surface)',
        borderRadius: '0 20px 20px 20px',
        boxShadow: 'var(--shadow-file)',
        border: '1px solid var(--color-border)',
        padding: 'clamp(var(--file-padding-mobile), 3vw, var(--file-padding))',
        overflow: 'hidden',
      }}
    >
      {/* Glass specular highlight — subtle 1px gradient at top edge */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {children}
    </motion.div>
  )
}
