'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

const PAINTING_SRC = '/footer/city-sketch.jpg';

const PALETTE = [
  { id: 'charcoal', buttonHex: '#1A1A1A', drawHex: '#3A3A3A', label: 'Charcoal' },
  { id: 'rust',     buttonHex: '#9C4A2F', drawHex: '#C4785C', label: 'Rust' },
  { id: 'green',    buttonHex: '#2F5D3A', drawHex: '#6B9E78', label: 'Green' },
  { id: 'navy',     buttonHex: '#1E3A5F', drawHex: '#5A7FA6', label: 'Navy' },
  { id: 'gold',     buttonHex: '#D4A017', drawHex: '#E8C45C', label: 'Gold' },
  { id: 'grey',     buttonHex: '#6B6B6B', drawHex: '#A3A3A3', label: 'Grey' },
];

const STROKE_ALPHA = 0.05;
const BASE_RADIUS = 14; // CSS px at default size
const SIZE_MULTIPLIERS = [0.65, 1.0, 1.75]; // 3 brush sizes
const STORAGE_KEY = 'footer-sketch-v2';

function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function hexToHsl(hex: string): [number, number, number] {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  const r = (num >> 16) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360;
  let r: number;
  let g: number;
  let b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Section 2.1 canvas sizing and coordinate helpers
function sizeCanvas(canvas: HTMLCanvasElement, cssW: number, cssH: number): CanvasRenderingContext2D | null {
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = cssW + 'px';
  canvas.style.height = cssH + 'px';
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // not ctx.scale, which compounds
  }
  return ctx;
}

function pointerToCanvas(canvas: HTMLCanvasElement, e: MouseEvent | TouchEvent) {
  const r = canvas.getBoundingClientRect();
  const src = 'touches' in e ? e.touches[0] : e;
  return {
    x: (src.clientX - r.left) * (canvas.clientWidth / r.width),
    y: (src.clientY - r.top) * (canvas.clientHeight / r.height),
  };
}

export default function Footer() {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const expandBtnRef = useRef<HTMLButtonElement>(null);

  // Expanded modal refs
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const modalControlsRef = useRef<HTMLDivElement>(null);
  const largeFrameRef = useRef<HTMLDivElement>(null);
  const largeCanvasRef = useRef<HTMLCanvasElement>(null);

  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const initializedRef = useRef(false);

  const [clockStr, setClockStr] = useState('');
  const [color, setColor] = useState(PALETTE[0].drawHex);
  const [penSize, setPenSize] = useState(1); // 0: small, 1: medium (default), 2: large
  const [isEraser, setIsEraser] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [modalSaveOpen, setModalSaveOpen] = useState(false);
  const [drawCount, setDrawCount] = useState<number | null>(null);
  const hasCountedRef = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch('/api/sketch-count')
      .then((r) => r.json())
      .then((d) => {
        if (d && typeof d.count === 'number') {
          setDrawCount(d.count);
          setDisplayCount(d.count);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Live clock: drops seconds, e.g. "10:02 p.m."
  useEffect(() => {
    const tick = () => {
      const s = new Date()
        .toLocaleTimeString('en-CA', {
          timeZone: 'America/Toronto',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        .toLowerCase();
      setClockStr(s);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch('/api/sketch-count')
      .then((r) => r.json())
      .then((d) => setDrawCount(d.count))
      .catch(() => {});
  }, []);

  const saveToStorage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      localStorage.setItem(STORAGE_KEY, canvas.toDataURL('image/png'));
    } catch (_) {}
  }, []);

  // Canvas init: sizing to frame aspect ratio 16 / 10
  const setupSmallCanvas = useCallback((preserveExisting = false) => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width === 0) return;
    const cssW = Math.round(rect.width);
    const cssH = Math.round(rect.height || (rect.width * 1959 / 1924));

    if (preserveExisting && canvas.width > 0 && canvas.height > 0) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0);
      }
      const ctx = sizeCanvas(canvas, cssW, cssH);
      if (ctx && tempCtx) {
        ctx.drawImage(tempCanvas, 0, 0, cssW, cssH);
      }
    } else {
      const ctx = sizeCanvas(canvas, cssW, cssH);
      // Restore from localStorage if present
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && ctx) {
          const overlay = new Image();
          overlay.onload = () => {
            ctx.drawImage(overlay, 0, 0, cssW, cssH);
          };
          overlay.src = stored;
        }
      } catch (_) {}
    }
  }, []);

  const setupLargeCanvas = useCallback((preserveExisting = false) => {
    const largeCanvas = largeCanvasRef.current;
    const largeFrame = largeFrameRef.current;
    if (!largeCanvas || !largeFrame) return;
    const rect = largeFrame.getBoundingClientRect();
    if (rect.width === 0) return;
    const cssW = Math.round(rect.width);
    const cssH = Math.round(rect.height || (rect.width * 1959 / 1924));

    if (preserveExisting && largeCanvas.width > 0 && largeCanvas.height > 0) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = largeCanvas.width;
      tempCanvas.height = largeCanvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(largeCanvas, 0, 0);
      }
      const ctx = sizeCanvas(largeCanvas, cssW, cssH);
      if (ctx && tempCtx) {
        ctx.drawImage(tempCanvas, 0, 0, cssW, cssH);
      }
    } else {
      const ctx = sizeCanvas(largeCanvas, cssW, cssH);
      const smallCanvas = canvasRef.current;
      if (ctx && smallCanvas && smallCanvas.width > 0) {
        ctx.drawImage(smallCanvas, 0, 0, cssW, cssH);
      }
    }
  }, []);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      setupSmallCanvas(false);
    }
    const onResize = () => {
      setupSmallCanvas(true);
      if (isExpanded) {
        setupLargeCanvas(true);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setupSmallCanvas, setupLargeCanvas, isExpanded]);

  // When expanding: size large canvas and copy paint over
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => {
        setupLargeCanvas(false);
        modalCloseBtnRef.current?.focus();
      }, 50);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = '';
    }
  }, [isExpanded, setupLargeCanvas]);

  // Close expanded view and copy paint back to small canvas
  const closeExpanded = useCallback(() => {
    const smallCanvas = canvasRef.current;
    const largeCanvas = largeCanvasRef.current;
    const frame = frameRef.current;
    if (smallCanvas && largeCanvas && frame) {
      const rect = frame.getBoundingClientRect();
      const smallW = Math.round(rect.width);
      const smallH = Math.round(rect.height || (smallW * 1959 / 1924));
      const smallCtx = smallCanvas.getContext('2d');
      if (smallCtx) {
        smallCtx.clearRect(0, 0, smallW, smallH);
        smallCtx.drawImage(largeCanvas, 0, 0, smallW, smallH);
        saveToStorage();
      }
    }
    setIsExpanded(false);
    setTimeout(() => {
      expandBtnRef.current?.focus();
    }, 50);
  }, [saveToStorage]);

  // Handle escape key to close modal
  useEffect(() => {
    if (!isExpanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeExpanded();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isExpanded, closeExpanded]);

  // Soft stamp with hue jitter or destination-out erase
  const stamp = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    hex: string,
    radius: number,
    eraser: boolean
  ) => {
    ctx.save();
    if (eraser) {
      ctx.globalCompositeOperation = 'destination-out';
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, 'rgba(0,0,0,1)');
      grad.addColorStop(0.55, 'rgba(0,0,0,1)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.globalCompositeOperation = 'source-over';
      const [r, g, b] = hslToRgb(
        hexToHsl(hex)[0] + (Math.random() * 8 - 4),
        hexToHsl(hex)[1],
        hexToHsl(hex)[2]
      );

      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
      grad.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, 1)`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.globalAlpha = STROKE_ALPHA;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const handleStartDraw = (targetCanvas: HTMLCanvasElement, e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    isDrawingRef.current = true;
    lastPosRef.current = pointerToCanvas(targetCanvas, e);
  };

  const handleDraw = (targetCanvas: HTMLCanvasElement, e: MouseEvent | TouchEvent) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return;

    const pos = pointerToCanvas(targetCanvas, e);
    const radius = BASE_RADIUS * SIZE_MULTIPLIERS[penSize];

    const dx = pos.x - lastPosRef.current.x;
    const dy = pos.y - lastPosRef.current.y;
    const dist = Math.hypot(dx, dy);
    const step = 4; // stamp every ~4px
    const count = Math.max(1, Math.floor(dist / step));

    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const x = lastPosRef.current.x + dx * t;
      const y = lastPosRef.current.y + dy * t;
      stamp(ctx, x, y, color, radius, isEraser);
    }

    lastPosRef.current = pos;
  };

  const handleStopDraw = (isLarge: boolean) => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      if (!isLarge) {
        saveToStorage();
      }
      if (!hasCountedRef.current) {
        hasCountedRef.current = true;
        setHasDrawn(true);
        fetch('/api/sketch-count', { method: 'POST' })
          .then((r) => r.json())
          .then((d) => {
            setDrawCount(d.count);
            const target = d.count;
            const duration = 800;
            const start = performance.now();
            const stepAnim = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              setDisplayCount(Math.round(target * ease));
              if (p < 1) requestAnimationFrame(stepAnim);
            };
            requestAnimationFrame(stepAnim);
          })
          .catch(() => {});
      }
    }
  };

  const resetCanvas = (targetCanvas: HTMLCanvasElement | null) => {
    if (!targetCanvas) return;
    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
    if (targetCanvas === canvasRef.current) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {}
    }
  };

  const exportComposite = (targetCanvas: HTMLCanvasElement | null, format: 'png' | 'jpeg') => {
    if (!targetCanvas) return;
    const w = targetCanvas.width;
    const h = targetCanvas.height;
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    // 1. Fill white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);

    // 2. Draw paint strokes
    ctx.drawImage(targetCanvas, 0, 0);

    // 3. Draw painting overlay with multiply
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(img, 0, 0, w, h);

      const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      const dataUrl = offscreen.toDataURL(mime, 0.95);
      const link = document.createElement('a');
      link.download = `govind-painting.${format === 'jpeg' ? 'jpg' : 'png'}`;
      link.href = dataUrl;
      link.click();
    };
    img.src = PAINTING_SRC;
  };

  // Helper to render tools row (palette, brush sizes, eraser, save, reset)
  const renderControls = (isModal: boolean) => {
    const isSaveDropdownOpen = isModal ? modalSaveOpen : saveOpen;
    const setDropdown = isModal ? setModalSaveOpen : setSaveOpen;
    const activeCanvas = isModal ? largeCanvasRef.current : canvasRef.current;

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          rowGap: '10px',
          marginTop: '8px',
          width: '100%',
          maxWidth: 'min(560px, 100%)',
          boxSizing: 'border-box',
        }}
      >
        {/* 6 palette swatches */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {PALETTE.map((swatch) => (
            <button
              key={swatch.id}
              onClick={() => {
                setColor(swatch.drawHex);
                setIsEraser(false);
              }}
              title={swatch.label}
              aria-label={`Color ${swatch.label}`}
              style={{
                width: isMobile ? '22px' : '26px',
                height: isMobile ? '22px' : '26px',
                borderRadius: '50%',
                background: swatch.buttonHex,
                border:
                  color === swatch.drawHex && !isEraser
                    ? '2.5px solid #000'
                    : '1.5px solid rgba(0,0,0,0.15)',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            />
          ))}
        </div>

        {/* 3 brush sizes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {SIZE_MULTIPLIERS.map((mult, i) => (
            <button
              key={i}
              onClick={() => {
                setPenSize(i);
                setIsEraser(false);
              }}
              aria-label={`Brush size ${i + 1}`}
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
              <span
                style={{
                  width: Math.round(4 * mult + 1),
                  height: Math.round(4 * mult + 1),
                  borderRadius: '50%',
                  background: penSize === i && !isEraser ? '#fff' : '#000',
                  display: 'block',
                  flexShrink: 0,
                }}
              />
            </button>
          ))}
        </div>

        {/* Eraser */}
        <button
          onClick={() => setIsEraser((e) => !e)}
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
            onClick={() => setDropdown((o) => !o)}
            style={{
              height: '26px',
              padding: '0 10px',
              border: `0.5px solid ${isSaveDropdownOpen ? '#000' : 'rgba(0,0,0,0.2)'}`,
              borderRadius: '4px',
              background: isSaveDropdownOpen ? '#000' : 'transparent',
              color: isSaveDropdownOpen ? '#fff' : '#000',
              fontFamily: 'var(--font-fragment-mono)',
              fontSize: '10px',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Save ▾
          </button>
          {isSaveDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '32px',
                right: 0,
                background: '#FFFFFF',
                border: '0.5px solid var(--border)',
                borderRadius: '6px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                zIndex: 20,
                minWidth: '90px',
                overflow: 'hidden',
              }}
            >
              {(['png', 'jpeg'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => {
                    exportComposite(activeCanvas, fmt);
                    setDropdown(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-fragment-mono)',
                    fontSize: '10px',
                    color: '#000000',
                    cursor: 'pointer',
                    textAlign: 'left',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  .{fmt.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reset */}
        <button
          onClick={() => resetCanvas(activeCanvas)}
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
      </div>
    );
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .footer-frame:hover .footer-expand-btn,
        .footer-frame:focus-within .footer-expand-btn {
          opacity: 1 !important;
        }
        @media (hover: hover) {
          .footer-expand-btn {
            opacity: 0;
          }
        }
        @media (hover: none), (max-width: 767px) {
          .footer-expand-btn {
            opacity: 1 !important;
          }
        }
        @media (min-width: 768px) {
          .footer-attribution-mobile {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .footer-attribution-desktop {
            display: none !important;
          }
        }
      `,
        }}
      />

      <footer
        style={{
          width: '100%',
          maxWidth: '1320px',
          margin: '0 auto',
          padding: isMobile ? '40px 16px 48px' : '48px 32px 64px',
          boxSizing: 'border-box',
          borderTop: '0.5px solid var(--border)',
          background: 'var(--color-bg)',
        }}
      >
        {/* Divider above columns from main */}
        <div
          style={{
            height: '0.5px',
            background: '#000000',
            width: '100%',
            marginBottom: '24px',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : '1fr 1fr',
            gap: isMobile ? '40px' : '48px',
            alignItems: 'start',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Left column: tagline, clock, social, copyright */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              height: '100%',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-helvetica-neue)',
                  fontSize: isMobile ? '28px' : '40px',
                  fontWeight: 700,
                  lineHeight: 1.35,
                  color: '#000000',
                  margin: 0,
                }}
              >
                Still building.<br />Always thinking.
              </p>
            </div>

            {/* Live clock */}
            {clockStr && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-fragment-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.04em',
                }}
              >
                Toronto, EST {clockStr}
              </div>
            )}

            {/* Email and LinkedIn 44x44 circular buttons */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <a
                href="mailto:ahluwaliagovindsingh@gmail.com"
                aria-label="Email"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition:
                    'border-color var(--transition-base), color var(--transition-base)',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-text-primary)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/govind-ahluwalia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition:
                    'border-color var(--transition-base), color var(--transition-base)',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-text-primary)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
            </div>

            <div style={{ display: 'flex', gap: '32px' }}>
              {['Work', 'About', 'Experience'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Work' ? '/?tab=work' : `/${item.toLowerCase()}`}
                  onMouseEnter={() => setHoveredNav(item)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    fontFamily: 'var(--font-fragment-mono)',
                    fontSize: 'var(--text-sm)',
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

            {/* Copyright attribution line (Desktop: §3.1 Built by Govind. 2026.) */}
            <div
              className="footer-attribution-desktop"
              style={{
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
                marginTop: 'auto',
              }}
            >
              Built by Govind. 2026.
            </div>
          </div>

          {/* Right column: Painting frame per Section 2.2 / Sprint 23 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: '100%',
              minWidth: 0,
              boxSizing: 'border-box',
            }}
          >
            {/* 1. Drawn in 2020. Colour it in. at top of block per §1 */}
            <div
              className="footer-caption"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-primary)',
                textAlign: 'center',
                width: '100%',
                margin: '0 auto 16px',
              }}
            >
              Drawn in 2020. Colour it in.
            </div>

            {/* 2. Controls below title per Section 1 */}
            {renderControls(false)}

            {/* 3. Counter line directly under controls */}
            <p
              style={{
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: '11px',
                color: '#000000',
                letterSpacing: '0.04em',
                margin: '6px auto 10px',
                width: '100%',
                opacity: hasDrawn ? 1 : 0,
                transform: hasDrawn ? 'translateY(0)' : 'translateY(4px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                minHeight: '16px',
                textAlign: 'center',
              }}
            >
              {hasDrawn
                ? `You're the ${displayCount}${getOrdinalSuffix(displayCount)} person to draw here.`
                : ''}
            </p>

            {/* 4. Frame: max-width min(560px, 100%), 3 / 2 ratio per Section 1.1 */}
            <div
              ref={frameRef}
              className="footer-frame"
              style={{
                width: '100%',
                maxWidth: 'min(560px, 100%)',
                aspectRatio: '3 / 2',
                margin: '0 auto',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                position: 'relative',
                border: '0.5px solid var(--border)',
                background: '#FFFFFF',
              }}
            >
              {/* Paint canvas underneath */}
              <canvas
                ref={canvasRef}
                onMouseDown={(e) => handleStartDraw(canvasRef.current!, e.nativeEvent)}
                onMouseMove={(e) => handleDraw(canvasRef.current!, e.nativeEvent)}
                onMouseUp={() => handleStopDraw(false)}
                onMouseLeave={() => handleStopDraw(false)}
                onTouchStart={(e) => handleStartDraw(canvasRef.current!, e.nativeEvent)}
                onTouchMove={(e) => handleDraw(canvasRef.current!, e.nativeEvent)}
                onTouchEnd={() => handleStopDraw(false)}
                style={{
                  display: 'block',
                  touchAction: 'none',
                  cursor: isEraser ? 'cell' : 'crosshair',
                }}
              />

              {/* Painting on top at mix-blend-mode: multiply, oversized 110% to crop table edge per §3 */}
              <img
                src={PAINTING_SRC}
                alt=""
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '110%',
                  maxWidth: 'none',
                  height: '110%',
                  objectFit: 'cover',
                  objectPosition: 'left top',
                  mixBlendMode: 'multiply',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />

              {/* Expand button top right */}
              <button
                ref={expandBtnRef}
                onClick={() => setIsExpanded(true)}
                aria-label="Open larger"
                className="footer-expand-btn"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.82)',
                  backdropFilter: 'blur(12px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(140%)',
                  border: '1px solid var(--color-border)',
                  display: 'grid',
                  placeItems: 'center',
                  zIndex: 2,
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'opacity var(--transition-base)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            </div>

            {/* Attribution line below drawing block on phone (§3.2) */}
            <div
              className="footer-attribution-mobile"
              style={{
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
                marginTop: '28px',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Built by Govind. 2026.
            </div>
          </div>
        </div>
      </footer>

      {/* Expanded Modal Overlay */}
      {isExpanded && (
        <div
          onClick={closeExpanded}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(20, 18, 16, 0.45)',
            backdropFilter: 'blur(24px) saturate(140%)',
            WebkitBackdropFilter: 'blur(24px) saturate(140%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '12px' : '24px',
            boxSizing: 'border-box',
          }}
        >
          {/* Panel */}
          <div
            ref={modalPanelRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 'min(1100px, 92vw)',
              maxHeight: '88vh',
              width: '100%',
              margin: 'auto',
              background: 'rgba(255, 255, 255, 0.86)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              borderRadius: 'var(--radius-card)',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.24)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: isMobile ? '14px 20px' : '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                boxSizing: 'border-box',
                flexShrink: 0,
                minHeight: '52px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Colour it in
              </span>
              <button
                ref={modalCloseBtnRef}
                onClick={closeExpanded}
                aria-label="Close modal"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </button>
            </div>

            {/* Frame: max-height calc(88vh - 160px), max-width 100%, aspect 1924 / 1959 */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: isMobile ? '12px 16px' : '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              <div
                ref={largeFrameRef}
                style={{
                  position: 'relative',
                  width: 'auto',
                  height: '100%',
                  maxHeight: 'calc(88vh - 160px)',
                  maxWidth: '100%',
                  aspectRatio: '1924 / 1959',
                  margin: '0 auto',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: '0.5px solid var(--border)',
                  background: '#FFFFFF',
                  display: 'flex',
                }}
              >
                <canvas
                  ref={largeCanvasRef}
                  onMouseDown={(e) => handleStartDraw(largeCanvasRef.current!, e.nativeEvent)}
                  onMouseMove={(e) => handleDraw(largeCanvasRef.current!, e.nativeEvent)}
                  onMouseUp={() => handleStopDraw(true)}
                  onMouseLeave={() => handleStopDraw(true)}
                  onTouchStart={(e) => handleStartDraw(largeCanvasRef.current!, e.nativeEvent)}
                  onTouchMove={(e) => handleDraw(largeCanvasRef.current!, e.nativeEvent)}
                  onTouchEnd={() => handleStopDraw(true)}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    touchAction: 'none',
                    cursor: isEraser ? 'cell' : 'crosshair',
                  }}
                />
                <img
                  src={PAINTING_SRC}
                  alt=""
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                />
              </div>
            </div>

            {/* Controls row inside panel below image */}
            <div
              ref={modalControlsRef}
              style={{
                flexShrink: 0,
                padding: isMobile ? '8px 16px 14px' : '10px 24px 16px',
                display: 'flex',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              {renderControls(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
