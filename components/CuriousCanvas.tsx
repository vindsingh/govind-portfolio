'use client'

import { useState, useRef, useEffect } from 'react'

type Category = 'everything' | 'process' | 'work' | 'personal'
type NodeType = 'video' | 'youtube' | 'image' | 'link' | 'text'

interface ChildNode {
  id: string
  label: string
  sublabel: string
  type: NodeType
  width: number
  height: number
  categories: Category[]
  src?: string
  youtubeId?: string
  href?: string
  text?: string
}

interface Branch {
  id: string
  label: string
  // Vertical position: 0–1 fraction of canvas height
  yFrac: number
  categories: Category[]
  terminalText: string
  terminalHighlight: string
  children: ChildNode[]
}

const BRANCHES: Branch[] = [
  {
    id: 'form',
    label: 'FOR/M',
    yFrac: 0.16,
    categories: ['everything', 'work'],
    terminalText: 'Fifty graduates. One question about what to do with four years of work. The answer was an exhibition six thousand people walked through.',
    terminalHighlight: 'six thousand people',
    children: [
      {
        id: 'form-context',
        label: 'The brief',
        sublabel: 'Exhibition direction',
        type: 'text',
        width: 210, height: 90,
        categories: ['everything', 'work'],
        text: 'Exhibition Director for GradEx 111. Three curatorial zones. A speaker series. External sponsorships. A deployed website that reached 200K+ on Instagram.',
      },
      {
        id: 'form-zone',
        label: 'Zone card',
        sublabel: 'for/body · The intimate scale',
        type: 'image',
        width: 180, height: 70,
        categories: ['everything', 'work', 'process'],
        src: '/projects/form/forbodycard.svg',
      },
      {
        id: 'form-reel-1',
        label: 'Before the doors opened',
        sublabel: 'Marketing reel',
        type: 'video',
        width: 160, height: 90,
        categories: ['everything', 'work'],
        src: '/projects/form/marketing reel 1.mp4',
      },
      {
        id: 'form-reel-2',
        label: 'The days',
        sublabel: 'Day 2 · GradEx 111',
        type: 'video',
        width: 160, height: 90,
        categories: ['everything', 'work'],
        src: '/projects/form/Day2.mp4',
      },
      {
        id: 'form-instagram',
        label: '@ocadu.id',
        sublabel: 'Instagram',
        type: 'link',
        width: 140, height: 44,
        categories: ['everything', 'work'],
        href: 'https://www.instagram.com/ocadu.id',
      },
    ],
  },
  {
    id: 'falcon',
    label: 'Falcon',
    yFrac: 0.37,
    categories: ['everything', 'work'],
    terminalText: 'Eight months of research into a gap everyone recognises. Not a reporting problem. A translation problem.',
    terminalHighlight: 'translation problem',
    children: [
      {
        id: 'falcon-context',
        label: 'The problem',
        sublabel: 'Research finding',
        type: 'text',
        width: 210, height: 90,
        categories: ['everything', 'work', 'process'],
        text: 'Founders and investors speak different languages. Existing tools treat it as a reporting problem. Falcon treats it as a translation problem.',
      },
      {
        id: 'falcon-intro',
        label: 'Introduction',
        sublabel: 'Falcon',
        type: 'youtube',
        width: 240, height: 135,
        categories: ['everything', 'work'],
        youtubeId: 'Ijp7a1J9mrU',
      },
      {
        id: 'behind-idea',
        label: 'Behind the Idea',
        sublabel: 'Research process',
        type: 'youtube',
        width: 240, height: 135,
        categories: ['everything', 'process'],
        youtubeId: 'p-zotFmbpzw',
      },
      {
        id: 'signal-card',
        label: 'Signal Card',
        sublabel: 'Feature · Structured updates',
        type: 'video',
        width: 160, height: 90,
        categories: ['everything', 'work', 'process'],
        src: '/projects/falcon/signal-card.mp4',
      },
      {
        id: 'open-canvas',
        label: 'Open Canvas',
        sublabel: 'Feature · The workspace',
        type: 'video',
        width: 160, height: 90,
        categories: ['everything', 'work', 'process'],
        src: '/projects/falcon/open-canvas.mp4',
      },
    ],
  },
  {
    id: 'cpkc',
    label: 'CPKC',
    yFrac: 0.60,
    categories: ['everything', 'work'],
    terminalText: 'The youngest person in the room. What changed wasn\'t the tools. It was the questions being asked.',
    terminalHighlight: 'the questions being asked',
    children: [
      {
        id: 'cpkc-mandate',
        label: 'The mandate',
        sublabel: 'Mitacs BSI · 2025–26',
        type: 'text',
        width: 210, height: 90,
        categories: ['everything', 'work'],
        text: 'Innovation Catalyst inside North America\'s only transborder freight railway. First design thinking framework adopted at CIO level.',
      },
      {
        id: 'cpkc-cop',
        label: 'Community of Practice',
        sublabel: '105+ members',
        type: 'text',
        width: 210, height: 90,
        categories: ['everything', 'work', 'process'],
        text: 'Started at zero. Grew to 105+ members across departments. The goal was to make design thinking self-sustaining — not dependent on a single person.',
      },
      {
        id: 'cpkc-artifact',
        label: 'Methodology artifact',
        sublabel: 'Phase 1 · Design Thinking Framework',
        type: 'image',
        width: 200, height: 110,
        categories: ['everything', 'work', 'process'],
        src: '/projects/cpkc/phase-1.svg',
      },
    ],
  },
  {
    id: 'personal',
    label: 'Outside the brief',
    yFrac: 0.82,
    categories: ['everything', 'personal'],
    terminalText: 'The work that doesn\'t have a client or a deadline. Pen, paper, observation. This is what happens first.',
    terminalHighlight: 'what happens first',
    children: [
      {
        id: 'personal-process',
        label: 'How I start',
        sublabel: 'Pen & paper',
        type: 'text',
        width: 210, height: 90,
        categories: ['everything', 'personal', 'process'],
        text: 'I reach for pen and paper before I open anything. The thinking has to happen first. Software changes every year. The way I map a problem doesn\'t.',
      },
      {
        id: 'penpaper',
        label: 'Falcon workflow',
        sublabel: 'Mapped by hand',
        type: 'image',
        width: 200, height: 130,
        categories: ['everything', 'personal', 'process'],
        src: '/about/Penpaperphoto.png',
      },
      {
        id: 'sketches',
        label: 'Sketchbook',
        sublabel: 'Outside the brief',
        type: 'image',
        width: 220, height: 100,
        categories: ['everything', 'personal'],
        src: '/about/Painting_3.jpg',
      },
      {
        id: 'portraits',
        label: 'Portraits',
        sublabel: 'Pencil · Dotwork · Chalk',
        type: 'image',
        width: 240, height: 80,
        categories: ['everything', 'personal'],
        src: '/about/Painting_2.jpg',
      },
    ],
  },
]

const DEFAULT_TEXT = 'This space doesn\'t follow the same rules as the rest of the portfolio. It\'s where the work behind the work lives. Branches expand. Nothing is curated to look clean.'
const DEFAULT_HIGHLIGHT = 'the work behind the work'

// Layout constants
const TERMINAL_W = 280
const TERMINAL_LEFT = 20
const TERMINAL_TOP = 20
const BRANCH_X = 400     // x of branch node center
const CHILD_COL_1 = 620  // x center of first child column
const CHILD_COL_2 = 860  // x center of second child column
const CHILD_GAP = 20     // vertical gap between children in same column

interface Props { category: Category }

export default function CuriousCanvas({ category }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(700)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null)
  const [expandedLeaf, setExpandedLeaf] = useState<ChildNode | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight || 700)
    }
  }, [])

  const visible = BRANCHES.filter(b =>
    category === 'everything' || b.categories.includes(category)
  )

  const toggleBranch = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const active = hoveredBranch ? BRANCHES.find(b => b.id === hoveredBranch) : null
  const terminalText = active?.terminalText ?? DEFAULT_TEXT
  const terminalHighlight = active?.terminalHighlight ?? DEFAULT_HIGHLIGHT

  // Compute child positions for a branch
  const childPositions = (branch: Branch, canvasH: number) => {
    const branchY = branch.yFrac * canvasH
    const visChildren = branch.children.filter(c =>
      category === 'everything' || c.categories.includes(category)
    )

    // Lay out in 2 columns to the right of branch
    const positions: Array<{ child: ChildNode; cx: number; cy: number }> = []

    // Stack children: odd indices in col1, even in col2
    let col1Y = branchY - 80
    let col2Y = branchY - 40

    visChildren.forEach((child, i) => {
      if (i % 2 === 0) {
        positions.push({ child, cx: CHILD_COL_1, cy: col1Y })
        col1Y += child.height + CHILD_GAP + 30
      } else {
        positions.push({ child, cx: CHILD_COL_2, cy: col2Y })
        col2Y += child.height + CHILD_GAP + 30
      }
    })

    return positions
  }

  // L-shaped SVG path
  const elbowPath = (x1: number, y1: number, x2: number, y2: number) => {
    const mid = x1 + (x2 - x1) * 0.5
    return `M ${x1} ${y1} C ${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`
  }

  // Terminal center (right edge)
  const termRightX = TERMINAL_LEFT + TERMINAL_W
  const termCenterY = TERMINAL_TOP + 95 // approx vertical center of terminal

  const renderHighlight = (text: string, highlight: string) => {
    const idx = text.indexOf(highlight)
    if (idx === -1) return <span>{text}</span>
    return (
      <>
        <span>{text.slice(0, idx)}</span>
        <span style={{
          background: 'rgba(200,145,10,0.4)',
          borderRadius: 2, padding: '0 2px',
        }}>{highlight}</span>
        <span>{text.slice(idx + highlight.length)}</span>
      </>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%', height: '100%',
        position: 'relative', overflow: 'hidden',
        background: '#F5F4F0', minHeight: '600px',
      }}
    >
      {/* SVG lines */}
      <svg style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
        overflow: 'visible',
      }}>
        {visible.map(branch => {
          const branchY = branch.yFrac * height
          const isExpanded = expanded.has(branch.id)
          const isHovered = hoveredBranch === branch.id
          const positions = isExpanded ? childPositions(branch, height) : []

          return (
            <g key={branch.id}>
              {/* Terminal → Branch */}
              <path
                d={elbowPath(termRightX, termCenterY, BRANCH_X - 60, branchY)}
                fill="none"
                stroke={isHovered ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.15)'}
                strokeWidth={isHovered ? 1.2 : 0.75}
                style={{ transition: 'stroke 0.2s' }}
              />

              {/* Branch → Children */}
              {positions.map(({ child, cx, cy }) => (
                <path
                  key={child.id}
                  d={elbowPath(BRANCH_X + 60, branchY, cx - child.width / 2, cy + child.height / 2)}
                  fill="none"
                  stroke="rgba(0,0,0,0.12)"
                  strokeWidth="0.6"
                  strokeDasharray="4 4"
                />
              ))}
            </g>
          )
        })}
      </svg>

      {/* Branch nodes + children */}
      {visible.map(branch => {
        const branchY = branch.yFrac * height
        const isExpanded = expanded.has(branch.id)
        const positions = isExpanded ? childPositions(branch, height) : []

        return (
          <div key={branch.id}>
            {/* Branch pill */}
            <div
              onClick={() => toggleBranch(branch.id)}
              onMouseEnter={() => setHoveredBranch(branch.id)}
              onMouseLeave={() => setHoveredBranch(null)}
              style={{
                position: 'absolute',
                left: BRANCH_X - 60,
                top: branchY - 18,
                transform: 'none',
                zIndex: 5,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 14px',
                background: isExpanded ? '#000000' : '#FFFFFF',
                color: isExpanded ? '#FFFFFF' : '#000000',
                border: '0.5px solid #000000',
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s, color 0.2s',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.06em',
              }}>
                {branch.label}
              </span>
              <span style={{
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: '10px', opacity: 0.6,
                display: 'inline-block',
                transform: isExpanded ? 'rotate(45deg)' : 'none',
                transition: 'transform 0.2s',
              }}>
                +
              </span>
            </div>

            {/* Child nodes */}
            {positions.map(({ child, cx, cy }) => (
              <div
                key={child.id}
                style={{
                  position: 'absolute',
                  left: cx - child.width / 2,
                  top: cy,
                  width: child.width,
                  zIndex: 3,
                  animation: 'nodeIn 0.22s ease forwards',
                }}
              >
                <div style={{
                  width: '100%', height: child.height,
                  borderRadius: 8, overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  position: 'relative',
                }}>

                  {child.type === 'text' && (
                    <div style={{
                      width: '100%', height: '100%',
                      background: '#FFFFFF',
                      padding: '10px 12px',
                      boxSizing: 'border-box',
                      display: 'flex', alignItems: 'center',
                      border: '0.5px solid rgba(0,0,0,0.1)',
                      borderRadius: 8,
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-helvetica)',
                        fontSize: '11px', lineHeight: 1.65,
                        color: '#000000', margin: 0,
                      }}>
                        {child.text}
                      </p>
                    </div>
                  )}

                  {child.type === 'video' && (
                    <>
                      <video
                        src={child.src}
                        autoPlay loop muted playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <button
                        onClick={() => setExpandedLeaf(child)}
                        style={{
                          position: 'absolute', bottom: 6, right: 6,
                          width: 22, height: 22, borderRadius: 4,
                          background: 'rgba(0,0,0,0.55)', border: 'none',
                          cursor: 'pointer', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', zIndex: 5,
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 4V1H4M6 1H9V4M9 6V9H6M4 9H1V6" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </>
                  )}

                  {child.type === 'youtube' && (
                    <>
                      <iframe
                        src={`https://www.youtube.com/embed/${child.youtubeId}?rel=0&modestbranding=1`}
                        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen title={child.label}
                      />
                      <button
                        onClick={() => setExpandedLeaf(child)}
                        style={{
                          position: 'absolute', bottom: 6, right: 6,
                          width: 22, height: 22, borderRadius: 4,
                          background: 'rgba(0,0,0,0.55)', border: 'none',
                          cursor: 'pointer', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', zIndex: 5,
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 4V1H4M6 1H9V4M9 6V9H6M4 9H1V6" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </>
                  )}

                  {child.type === 'image' && (
                    <img
                      src={child.src}
                      alt={child.label}
                      draggable={false}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )}

                  {child.type === 'link' && (
                    <a
                      href={child.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '100%', height: '100%',
                        background: '#000000',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', textDecoration: 'none',
                      }}
                    >
                      <span style={{
                        fontFamily: 'var(--font-fragment-mono)',
                        fontSize: '11px', color: '#FFFFFF',
                        letterSpacing: '0.06em',
                      }}>
                        {child.label} ↗
                      </span>
                    </a>
                  )}
                </div>

                {/* Child label */}
                <div style={{ marginTop: 5, pointerEvents: 'none' }}>
                  <div style={{
                    fontFamily: 'var(--font-fragment-mono)',
                    fontSize: '9px', color: '#000000',
                    letterSpacing: '0.05em', lineHeight: 1.4,
                  }}>
                    {child.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-fragment-mono)',
                    fontSize: '8px', color: 'rgba(0,0,0,0.4)',
                  }}>
                    {child.sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      })}

      {/* Fixed terminal */}
      <div style={{
        position: 'absolute',
        top: TERMINAL_TOP, left: TERMINAL_LEFT,
        width: TERMINAL_W, zIndex: 10,
        background: '#000000', borderRadius: 10,
        boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
        pointerEvents: 'none',
      }}>
        <div style={{ padding: '8px 12px 6px', display: 'flex', gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840' }} />
        </div>
        <div style={{ padding: '4px 14px 14px' }}>
          <p style={{
            fontFamily: 'var(--font-fragment-mono)',
            fontSize: '10px', color: '#FFFFFF',
            lineHeight: 1.85, margin: 0,
          }}>
            {renderHighlight(terminalText, terminalHighlight)}
          </p>
          {expanded.size > 0 && (
            <p style={{
              fontFamily: 'var(--font-fragment-mono)',
              fontSize: '9px', color: 'rgba(255,255,255,0.35)',
              margin: '8px 0 0', lineHeight: 1.5,
            }}>
              {expanded.size === BRANCHES.length
                ? 'Everything is open.'
                : `${expanded.size} of ${BRANCHES.length} branches open.`
              }
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes nodeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Welcome modal */}
      {showWelcome && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 40,
            background: 'rgba(0,0,0,0.18)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowWelcome(false)}
        >
          <div
            style={{
              width: '100%', maxWidth: '420px',
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '36px 40px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <p style={{
              fontFamily: 'var(--font-helvetica)',
              fontSize: '22px',
              fontWeight: 600,
              lineHeight: 1.2,
              color: '#000000',
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}>
              Still building this.
            </p>
            <p style={{
              fontFamily: 'var(--font-helvetica)',
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: 1.7,
              color: '#000000',
              margin: '0 0 28px',
            }}>
              Not sure what it should be yet. That's kind of the point — some things are worth making before you know exactly why. Click the branches and see what connects.
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              style={{
                fontFamily: 'var(--font-helvetica)',
                fontSize: '13px',
                fontWeight: 500,
                color: '#FFFFFF',
                background: '#000000',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 22px',
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
            >
              Start exploring
            </button>
          </div>
        </div>
      )}

      {/* Expand modal */}
      {expandedLeaf && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 50,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', padding: 40,
          }}
          onClick={() => setExpandedLeaf(null)}
        >
          <div
            style={{
              width: '100%', maxWidth: 720, borderRadius: 12,
              overflow: 'hidden', position: 'relative',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedLeaf(null)}
              style={{
                position: 'absolute', top: 10, right: 10,
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)', border: 'none',
                cursor: 'pointer', color: '#fff', fontSize: 16,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', zIndex: 10,
              }}
            >×</button>

            {expandedLeaf.type === 'video' && (
              <video
                src={expandedLeaf.src}
                autoPlay loop muted playsInline controls
                style={{ width: '100%', display: 'block', maxHeight: '70vh', background: '#000' }}
              />
            )}
            {expandedLeaf.type === 'youtube' && (
              <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${expandedLeaf.youtubeId}?rel=0&autoplay=1`}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen title={expandedLeaf.label}
                />
              </div>
            )}
            <div style={{
              padding: '10px 16px', background: '#000000',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-fragment-mono)', fontSize: '11px', color: '#FFFFFF' }}>
                {expandedLeaf.label} · {expandedLeaf.sublabel}
              </span>
              <span style={{ fontFamily: 'var(--font-fragment-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>
                Click outside to close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
