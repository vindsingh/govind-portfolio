'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { FlipHorizontal } from 'lucide-react'
import type React from 'react'

interface FlipCardProps {
  frontSrc: string
  frontAlt?: string
  children: React.ReactNode
}

export default function FlipCard({
  frontSrc,
  frontAlt = '',
  children,
}: FlipCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [ready, setReady] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const autoFlippedRef = useRef(false)

  useEffect(() => {
    const el = measureRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height
      if (h && h > 0) {
        setHeight(h)
        setReady(true)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isInView = useInView(wrapperRef, {
    once: true,
    margin: '-15%',
  })

  useEffect(() => {
    if (isInView && ready && !flipped && !autoFlippedRef.current) {
      autoFlippedRef.current = true
      const timer = setTimeout(() => setFlipped(true), 400)
      return () => clearTimeout(timer)
    }
  }, [isInView, ready, flipped])

  return (
    // Fix 1: outer wrapper height locked once ready — kills blank space
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        height: ready ? `${height}px` : undefined,
      }}
    >
      {/* Measurement phase */}
      {!ready && (
        <div
          ref={measureRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        >
          {children}
        </div>
      )}

      {/* Flip card */}
      {ready && (
        <div
          style={{
            perspective: '1200px',
            width: '100%',
            height: `${height}px`,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              willChange: 'transform',
            }}
          >
            {/* Front face */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                borderRadius: '12px',
                border: '0.5px solid var(--color-border)',
                background: '#FFFFFF',
                overflow: 'hidden',
              }}
            >
              <img
                src={frontSrc}
                alt={frontAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Back face */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                width: '100%',
                height: '100%',
              }}
            >
              {children}
            </div>
          </div>

          {/* Fix 2: flip toggle button — right center, outside card face */}
          <button
            onClick={() => setFlipped((f) => !f)}
            title={flipped ? 'Show original plan' : 'Show interactive map'}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: '0.5px solid var(--color-border)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#fff'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)'
            }}
          >
            <FlipHorizontal size={13} color="#666" />
          </button>
        </div>
      )}
    </div>
  )
}
