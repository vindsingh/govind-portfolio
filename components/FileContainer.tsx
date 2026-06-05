'use client'

import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────────────
   DESKTOP SURFACE
   The background "desktop" area that hosts the FileContainer.
   Features a barely-perceptible noise grain texture for tactile depth.
───────────────────────────────────────────────────────────────────────── */

// Minimal SVG noise grain — 200×200 tile, opacity kept very low on the element
const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='noise'>
    <feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='200' height='200' filter='url(%23noise)' opacity='1'/>
</svg>`

const GRAIN_DATA_URI = `data:image/svg+xml,${GRAIN_SVG.replace(/\n/g, '').replace(/'/g, '%27')}`

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
        padding: 'clamp(12px, 2vw, 24px)',
        isolation: 'isolate',
      }}
    >
      {/* Grain texture overlay — opacity 0.4 so barely perceptible */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("${GRAIN_DATA_URI}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 0,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Content sits above grain */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
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
