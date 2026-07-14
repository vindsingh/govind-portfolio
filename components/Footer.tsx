'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

const PALETTE = ['#1a1a1a', '#8B3A2A', '#2D5A3D', '#1E3A5F', '#C0943A', '#7A6E65']

const iconBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  border: '1px solid #E8E4DF',
  color: '#6B6560',
  textDecoration: 'none',
  transition: 'background 0.15s, border-color 0.15s, color 0.15s',
  background: 'transparent',
  flexShrink: 0,
}
const PEN_SIZES = [2, 4, 8]
const STORAGE_KEY = 'footer-sketch-v1'

function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const sketchLoadedRef = useRef(false)

  const [clockStr, setClockStr] = useState('')
  const [color, setColor] = useState(PALETTE[0])
  const [penSize, setPenSize] = useState(1) // index into PEN_SIZES
  const [isEraser, setIsEraser] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [drawCount, setDrawCount] = useState<number | null>(null)
  const hasCountedRef = useRef(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [displayCount, setDisplayCount] = useState(0)
  const [isMobile, setIsMobile] = useState(true)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Live clock ───────────────────────────────────────────────
  useEffect(() => {
    const tick = () => setClockStr(
      new Date().toLocaleTimeString('en-CA', {
        timeZone: 'America/Toronto',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      })
    )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    fetch('/api/sketch-count')
      .then(r => r.json())
      .then(d => setDrawCount(d.count))
      .catch(() => {})
  }, [])

  // ── Canvas init ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || sketchLoadedRef.current) return
    sketchLoadedRef.current = true

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)
    const W = rect.width
    const H = rect.height

    // Fill paper background
    ctx.fillStyle = '#F9F5EE'
    ctx.fillRect(0, 0, W, H)

    // Draw top half of city sketch
    const img = new Image()
    img.onload = () => {
      // Crop to top half of source image, scale to canvas width
      const srcH = img.height / 2
      ctx.drawImage(img, 0, 0, img.width, srcH, 0, 0, W, H / 2)

      // Subtle fade at the midpoint so it blends into blank space
      const grad = ctx.createLinearGradient(0, H * 0.38, 0, H * 0.52)
      grad.addColorStop(0, 'rgba(249,245,238,0)')
      grad.addColorStop(1, 'rgba(249,245,238,1)')
      ctx.fillStyle = grad
      ctx.fillRect(0, H * 0.38, W, H * 0.14)

      // Load localStorage overlay
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const overlay = new Image()
          overlay.onload = () => ctx.drawImage(overlay, 0, 0, W, H)
          overlay.src = stored
        }
      } catch (_) {}
    }
    img.src = '/footer/city-sketch.jpg'
  }, [])

  // ── Drawing helpers ──────────────────────────────────────────
  const getPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const src = 'touches' in e ? e.touches[0] : e
    const dpr = window.devicePixelRatio || 1
    const cssX = src.clientX - rect.left
    const cssY = src.clientY - rect.top
    // Account for any mismatch between canvas attribute size and CSS rendered size
    // canvas.width is physical pixels; dividing by dpr gives the expected CSS width
    // If layout changed after init, scaleX/scaleY correct for the drift
    const scaleX = (canvas.width / dpr) / rect.width
    const scaleY = (canvas.height / dpr) / rect.height
    return {
      x: cssX * scaleX,
      y: cssY * scaleY,
    }
  }

  const saveToStorage = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      localStorage.setItem(STORAGE_KEY, canvas.toDataURL('image/png'))
    } catch (_) {}
  }, [])

  const startDraw = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    isDrawingRef.current = true
    lastPosRef.current = getPos(e)
  }, [])

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDrawingRef.current) return
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e)
    const dpr = window.devicePixelRatio || 1

    ctx.save()
    ctx.scale(1 / dpr, 1 / dpr)
    ctx.scale(dpr, dpr)
    ctx.restore()

    ctx.beginPath()
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = isEraser ? '#F9F5EE' : color
    ctx.lineWidth = isEraser ? 20 : PEN_SIZES[penSize]
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPosRef.current = pos
  }, [color, penSize, isEraser])

  const stopDraw = useCallback(() => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false
      saveToStorage()
      if (!hasCountedRef.current) {
        hasCountedRef.current = true
        setHasDrawn(true)
        fetch('/api/sketch-count', { method: 'POST' })
          .then(r => r.json())
          .then(d => {
            setDrawCount(d.count)
            const target = d.count
            const duration = 800
            const steps = 30
            const interval = duration / steps
            let current = 0
            const timer = setInterval(() => {
              current += 1
              setDisplayCount(Math.round((current / steps) * target))
              if (current >= steps) {
                clearInterval(timer)
                setDisplayCount(target)
              }
            }, interval)
          })
          .catch(() => {})
      }
    }
  }, [saveToStorage])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.addEventListener('mousedown', startDraw)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDraw)
    canvas.addEventListener('mouseleave', stopDraw)
    canvas.addEventListener('touchstart', startDraw, { passive: false })
    canvas.addEventListener('touchmove', draw, { passive: false })
    canvas.addEventListener('touchend', stopDraw)
    return () => {
      canvas.removeEventListener('mousedown', startDraw)
      canvas.removeEventListener('mousemove', draw)
      canvas.removeEventListener('mouseup', stopDraw)
      canvas.removeEventListener('mouseleave', stopDraw)
      canvas.removeEventListener('touchstart', startDraw)
      canvas.removeEventListener('touchmove', draw)
      canvas.removeEventListener('touchend', stopDraw)
    }
  }, [startDraw, draw, stopDraw])

  // ── Download ─────────────────────────────────────────────────
  const addWatermark = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
    ctx.save()
    ctx.font = '10px monospace'
    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.fillText('ahluwaliagovind.com', 12, H - 10)
    ctx.restore()
  }

  const downloadAs = async (format: 'jpg' | 'png' | 'pdf') => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    addWatermark(ctx, canvas.offsetWidth, canvas.offsetHeight)

    if (format === 'jpg' || format === 'png') {
      const type = format === 'jpg' ? 'image/jpeg' : 'image/png'
      const url = canvas.toDataURL(type, 0.92)
      const a = document.createElement('a')
      a.href = url
      a.download = `city-sketch.${format}`
      a.click()
    } else {
      const { jsPDF } = await import('jspdf')
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [W, H] })
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, W, H)
      pdf.save('city-sketch.pdf')
    }
    setSaveOpen(false)
  }

  const resetCanvas = () => {
    sketchLoadedRef.current = false
    localStorage.removeItem(STORAGE_KEY)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    sketchLoadedRef.current = false
    // Re-run init
    setTimeout(() => { sketchLoadedRef.current = false }, 10)
    window.location.reload()
  }

  // ── Render ───────────────────────────────────────────────────
  return (
    <footer style={{
      width: '100%',
      background: '#FFFFFF',
      borderTop: '0.5px solid var(--border)',
      marginTop: '32px',
    }}>
      <div style={{
        padding: isMobile ? '0 20px' : '0 32px',
      }}>

        {/* Top row: GA + clock */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0 16px',
        }}>
          <img
            src="/favicon.svg"
            alt="GA"
            draggable={false}
            style={{ width: isMobile ? '36px' : '48px', height: isMobile ? '36px' : '48px', objectFit: 'contain' }}
          />
          <div style={{
            fontFamily: 'var(--font-fragment-mono)',
            fontSize: isMobile ? '10px' : '11px',
            color: '#000000',
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: '#000000' }}>Toronto, EST</span>
            <span>{clockStr}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '0.5px',
          background: '#000000',
          width: '100%',
          marginBottom: '24px',
        }} />

        {/* Two columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.7fr',
          gap: isMobile ? '40px' : '64px',
          paddingBottom: isMobile ? '40px' : '56px',
          alignItems: 'start',
        }}>

          {/* Left column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isMobile ? 'flex-start' : 'space-between', // spreads content top to bottom
            paddingTop: '20px',
            gap: isMobile ? '24px' : '28px',
            height: isMobile ? 'auto' : '100%',               // fills grid row height
            alignSelf: isMobile ? 'auto' : 'stretch',         // stretches to match right column
          }}>
            <p style={{
              fontFamily: 'var(--font-helvetica-neue)',
              fontSize: isMobile ? '28px' : '40px',
              fontWeight: 700,
              lineHeight: 1.35,
              color: '#000000',
              margin: 0,
              paddingLeft: '12px',
            }}>
              Still building.<br/>Always thinking.
            </p>

            <div style={{ display: 'flex', gap: '8px', paddingLeft: '12px' }}>
              <a
                href="mailto:ahluwaliagovindsingh@gmail.com"
                style={iconBtnStyle}
                title="Email"
                onMouseEnter={e => {
                  const btn = e.currentTarget as HTMLAnchorElement
                  btn.style.background = '#F5F4F0'
                  btn.style.borderColor = '#1A1A1A'
                  btn.style.color = '#1A1A1A'
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget as HTMLAnchorElement
                  btn.style.background = 'transparent'
                  btn.style.borderColor = '#E8E4DF'
                  btn.style.color = '#6B6560'
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/govindsinghahluwalia"
                target="_blank"
                rel="noopener noreferrer"
                style={iconBtnStyle}
                title="LinkedIn"
                onMouseEnter={e => {
                  const btn = e.currentTarget as HTMLAnchorElement
                  btn.style.background = '#F5F4F0'
                  btn.style.borderColor = '#1A1A1A'
                  btn.style.color = '#1A1A1A'
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget as HTMLAnchorElement
                  btn.style.background = 'transparent'
                  btn.style.borderColor = '#E8E4DF'
                  btn.style.color = '#6B6560'
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                </svg>
              </a>
            </div>

            <div style={{ display: 'flex', gap: '32px', paddingLeft: '12px' }}>
              {['Work', 'About', 'Experience'].map(item => (
                <Link
                  key={item}
                  href={item === 'Work' ? '/' : `/${item.toLowerCase()}`}
                  onMouseEnter={() => setHoveredNav(item)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    fontFamily: 'var(--font-fragment-mono)',
                    fontSize: isMobile ? '10px' : '11px',
                    color: '#000000',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                    opacity: hoveredNav === item ? 0.5 : 1,
                    transform: hoveredNav === item ? 'translateY(-1px)' : 'translateY(0)',
                    display: 'inline-block',
                    transition: 'opacity 0.15s ease, transform 0.15s ease',
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>

            <div style={{
              fontFamily: 'var(--font-fragment-mono)',
              fontSize: isMobile ? '9px' : '10px',
              color: '#000000',
              letterSpacing: '0.04em',
              marginTop: 'auto',
              paddingLeft: '12px',
            }}>
              Govind Singh Ahluwalia © 2026
            </div>
          </div>

          {/* Right column: drawing canvas */}
          <div>

            {/* Canvas toolbar */}
            <div style={{ marginBottom: '10px' }}>

              {/* Title row — always full width */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: isMobile ? '10px' : '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-helvetica-neue)',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: 700,
                  color: '#000000',
                  letterSpacing: '0',
                }}>
                  The bottom half is yours.
                </span>
                {/* Reset visible inline on mobile only */}
                {isMobile && (
                  <button
                    onClick={resetCanvas}
                    style={{
                      height: '26px',
                      padding: '0 8px',
                      border: 'none',
                      background: 'transparent',
                      fontFamily: 'var(--font-fragment-mono)',
                      fontSize: '10px',
                      color: '#000000',
                      cursor: 'pointer',
                      letterSpacing: '0.04em',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Tools row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexWrap: 'nowrap',
                overflowX: isMobile ? 'auto' : 'visible',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch' as any,
                paddingBottom: isMobile ? '4px' : '0',
              }}>
                {/* Color palette */}
                {PALETTE.map(c => (
                  <button
                    key={c}
                    onClick={() => { setColor(c); setIsEraser(false) }}
                    title={c}
                    style={{
                      width: isMobile ? '22px' : '26px',
                      height: isMobile ? '22px' : '26px',
                      borderRadius: '50%',
                      background: c,
                      border: color === c && !isEraser
                        ? '2.5px solid #000'
                        : '1.5px solid rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                      padding: 0,
                      flexShrink: 0,
                      boxSizing: 'border-box',
                    }}
                  />
                ))}

                {/* Pen sizes — hidden on mobile */}
                {!isMobile && PEN_SIZES.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => { setPenSize(i); setIsEraser(false) }}
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '4px',
                      border: `0.5px solid ${penSize === i && !isEraser ? '#000' : 'rgba(0,0,0,0.2)'}`,
                      background: penSize === i && !isEraser ? '#000' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxSizing: 'border-box',
                      padding: 0,
                    }}
                  >
                    <span style={{
                      width: size + 1,
                      height: size + 1,
                      borderRadius: '50%',
                      background: penSize === i && !isEraser ? '#fff' : '#000',
                      display: 'block',
                      flexShrink: 0,
                    }} />
                  </button>
                ))}

                {/* Eraser */}
                <button
                  onClick={() => setIsEraser(e => !e)}
                  style={{
                    height: '26px',
                    padding: '0 10px',
                    border: `0.5px solid ${isEraser ? '#000' : 'rgba(0,0,0,0.2)'}`,
                    borderRadius: '4px',
                    background: isEraser ? '#000' : 'transparent',
                    color: isEraser ? '#fff' : '#000',
                    fontFamily: 'var(--font-fragment-mono)',
                    fontSize: '10px',
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    flexShrink: 0,
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Eraser
                </button>

                {/* Save dropdown */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <button
                    onClick={() => setSaveOpen(o => !o)}
                    style={{
                      height: '26px',
                      padding: '0 10px',
                      border: `0.5px solid ${saveOpen ? '#000' : 'rgba(0,0,0,0.2)'}`,
                      borderRadius: '4px',
                      background: saveOpen ? '#000' : 'transparent',
                      color: saveOpen ? '#fff' : '#000',
                      fontFamily: 'var(--font-fragment-mono)',
                      fontSize: '10px',
                      cursor: 'pointer',
                      letterSpacing: '0.04em',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Save
                  </button>
                  {saveOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%', right: 0,
                      marginTop: '4px',
                      background: '#fff',
                      border: '0.5px solid var(--border)',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      zIndex: 10,
                      minWidth: '100px',
                    }}>
                      {(['jpg', 'png', 'pdf'] as const).map(fmt => (
                        <button
                          key={fmt}
                          onClick={() => downloadAs(fmt)}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '8px 14px',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: fmt !== 'pdf' ? '0.5px solid var(--border)' : 'none',
                            fontFamily: 'var(--font-fragment-mono)',
                            fontSize: '10px',
                            color: '#000',
                            cursor: 'pointer',
                            letterSpacing: '0.04em',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#F5F4F0')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          .{fmt.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reset — desktop only (mobile version is in title row) */}
                {!isMobile && (
                  <button
                    onClick={resetCanvas}
                    style={{
                      height: '26px',
                      padding: '0 8px',
                      border: 'none',
                      background: 'transparent',
                      fontFamily: 'var(--font-fragment-mono)',
                      fontSize: '10px',
                      color: '#000000',
                      cursor: 'pointer',
                      letterSpacing: '0.04em',
                      flexShrink: 0,
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            <p style={{
              fontFamily: 'var(--font-fragment-mono)',
              fontSize: '11px',
              color: '#000000',
              letterSpacing: '0.04em',
              margin: '6px 0 10px',
              opacity: hasDrawn ? 1 : 0,
              transform: hasDrawn ? 'translateY(0)' : 'translateY(4px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              minHeight: '16px',
            }}>
              {hasDrawn
                ? `You're the ${displayCount}${getOrdinalSuffix(displayCount)} person to draw here.`
                : ''}
            </p>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: isMobile ? '260px' : '340px',
                borderRadius: '8px',
                border: '0.5px solid var(--border)',
                display: 'block',
                cursor: isEraser ? 'cell' : 'crosshair',
                touchAction: 'none',
              }}
            />
          </div>

        </div>
      </div>
    </footer>
  )
}
