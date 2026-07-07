'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue, type PanInfo } from 'framer-motion';

const nodeData = [
  {
    id: 'ga-central',
    label: 'Govind',
    type: 'folder',
    initialX: 580,
    initialY: 320,
    categories: ['everything'],
    icon: '/favicon.ico',
    windowContent: 'text',
    windowText: 'Everything on this canvas is connected to the same question: what is worth making?',
  },
  {
    id: 'form',
    label: 'FOR/M',
    sublabel: 'Exhibition Design',
    type: 'work',
    initialX: 180,
    initialY: 180,
    categories: ['everything', 'work', 'making'],
    thumbnail: '/projects/form/forsystem.svg',
    windowContent: 'iframe',
    windowSrc: '/projects/form',
  },
  {
    id: 'falcon',
    label: 'Falcon',
    sublabel: 'Research & Platform',
    type: 'work',
    initialX: 920,
    initialY: 140,
    categories: ['everything', 'work', 'research'],
    thumbnail: '/projects/falcon/falcon-icon.svg',
    windowContent: 'iframe',
    windowSrc: '/projects/falcon',
  },
  {
    id: 'cpkc',
    label: 'CPKC',
    sublabel: 'Enterprise Design',
    type: 'work',
    initialX: 960,
    initialY: 440,
    categories: ['everything', 'work'],
    thumbnail: '/cpkc-mitacslogo.svg',
    windowContent: 'iframe',
    windowSrc: '/projects/cpkc',
  },
  {
    id: 'pen-paper',
    label: 'Pen & Paper',
    sublabel: 'Always first',
    type: 'personal',
    initialX: 400,
    initialY: 120,
    categories: ['everything', 'making', 'research'],
    windowContent: 'text',
    windowText: 'Every project starts the same way. Pen on paper. Not habit — it is the fastest way to make a thought visible.',
  },
  {
    id: 'artwork',
    label: 'Stone Series',
    sublabel: '2022',
    type: 'personal',
    initialX: 140,
    initialY: 460,
    categories: ['everything', 'making', 'personal'],
    thumbnail: '/about/L.jpeg',
    windowContent: 'image',
    windowSrc: '/about/L.jpeg',
  },
  {
    id: 'falcon-demo',
    label: 'Falcon Demo',
    sublabel: 'Live prototype',
    type: 'work',
    initialX: 720,
    initialY: 560,
    categories: ['everything', 'work', 'research'],
    windowContent: 'iframe',
    windowSrc: 'https://falcondemo.vercel.app',
  },
  {
    id: 'markets',
    label: 'Equity Markets',
    sublabel: 'Personal interest',
    type: 'personal',
    initialX: 280,
    initialY: 560,
    categories: ['everything', 'personal', 'research'],
    windowContent: 'text',
    windowText: 'I follow equity markets the same way I follow design problems. Both reward the person who looks at the signal before it becomes obvious.',
  },
  {
    id: 'gradex',
    label: 'GradEx 111',
    sublabel: '6,000+ visitors',
    type: 'personal',
    initialX: 780,
    initialY: 280,
    categories: ['everything', 'making'],
    thumbnail: '/about/L-TOP.jpeg',
    windowContent: 'text',
    windowText: 'FOR/M reached 6,000+ visitors over five days at 115 McCaul St. The most important number was not the attendance — it was how many people stayed.',
  },
];

interface CuriousCanvasProps {
  onExitCuriousMode: () => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export default function CuriousCanvas({ onExitCuriousMode, filter, setFilter }: CuriousCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() =>
    Object.fromEntries(
      nodeData.map((n) => [n.id, { x: n.initialX, y: n.initialY }])
    )
  );
  const gaOffsetX = useMotionValue(0);
  const gaOffsetY = useMotionValue(0);

  return (
    <div
      style={{
        position: 'relative',
        width: 'calc(100% + 64px)',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '-12px',
        marginLeft: '-32px',
        marginRight: '-32px',
        marginBottom: '-32px',
      }}
    >
      {/* Canvas drag constraints area */}
      <div
        ref={canvasRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'calc(100vh - 120px)',
          overflow: 'hidden',
          flex: 1,
          flexGrow: 1,
          backgroundColor: '#F9F7F5',
          backgroundImage: 'radial-gradient(circle, #C8B89A 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        
        {/* 1. SVGLines Component (layered below nodes) */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <circle
            cx={positions['ga-central'].x + 36}
            cy={positions['ga-central'].y + 36}
            r="3" fill="#C8B89A" opacity="0.8"
          />

          {[
            { id: 'form', ox: 60, oy: 44, opacity: 0.7 },
            { id: 'falcon', ox: 60, oy: 44, opacity: 0.7 },
            { id: 'cpkc', ox: 60, oy: 44, opacity: 0.7 },
            { id: 'pen-paper', ox: 50, oy: 25, opacity: 0.45 },
            { id: 'artwork', ox: 50, oy: 40, opacity: 0.45 },
            { id: 'falcon-demo', ox: 50, oy: 30, opacity: 0.45 },
            { id: 'markets', ox: 50, oy: 25, opacity: 0.45 },
            { id: 'gradex', ox: 50, oy: 40, opacity: 0.45 },
          ].map(({ id, ox, oy, opacity }) => (
            <line
              key={id}
              x1={positions['ga-central'].x + 36}
              y1={positions['ga-central'].y + 36}
              x2={positions[id].x + ox}
              y2={positions[id].y + oy}
              stroke="#C8B89A"
              strokeWidth="0.75"
              strokeDasharray="4 4"
              opacity={opacity}
            />
          ))}
        </svg>

        {/* 2. Nodes mapped from nodeData array */}
        {nodeData.map((node) => {
          const isVisible = filter === 'everything' || node.categories.includes(filter);
          return (
            <motion.div
              key={node.id}
              drag
              dragConstraints={canvasRef}
              dragElastic={0.05}
              dragMomentum={false}
              onDrag={(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                if (node.id === 'ga-central') {
                  gaOffsetX.set(info.offset.x);
                  gaOffsetY.set(info.offset.y);
                  setPositions((prev) => ({
                    ...prev,
                    'ga-central': {
                      x: node.initialX + info.offset.x,
                      y: node.initialY + info.offset.y,
                    },
                  }));
                } else {
                  setPositions((prev) => ({
                    ...prev,
                    [node.id]: {
                      x: node.initialX + info.offset.x + gaOffsetX.get() * 0.12,
                      y: node.initialY + info.offset.y + gaOffsetY.get() * 0.12,
                    },
                  }));
                }
              }}
              initial={{
                x: node.id === 'ga-central' ? node.initialX : node.initialX + gaOffsetX.get() * 0.12,
                y: node.id === 'ga-central' ? node.initialY : node.initialY + gaOffsetY.get() * 0.12,
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: isVisible ? 1 : 0.15,
                scale: isVisible ? 1 : 0.92,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ position: 'absolute', cursor: 'grab', userSelect: 'none', zIndex: 2 }}
              whileDrag={{ cursor: 'grabbing', scale: 1.02, zIndex: 100 }}
              onClick={() => {
                if (!openWindows.includes(node.id)) {
                  setOpenWindows(prev => [...prev, node.id]);
                }
              }}
            >
              {node.type === 'folder' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div
                    style={{
                      background: '#1A1A1A',
                      width: '72px',
                      height: '72px',
                      borderRadius: '8px',
                      border: '1px solid #1A1A1A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src="/favicon.svg"
                      style={{
                        width: 44,
                        height: 44,
                        objectFit: 'contain',
                        display: 'block',
                      }}
                      alt="GA"
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-fragment-mono)',
                      fontSize: '10px',
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              )}

              {node.type === 'work' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      background: 'white',
                      width: '120px',
                      height: '88px',
                      borderRadius: '8px',
                      border: '1px solid #E8E4DF',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {node.thumbnail && (
                      <img
                        src={node.thumbnail}
                        alt={node.label}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: '12px',
                          display: 'block',
                        }}
                      />
                    )}
                  </div>
                  <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-helvetica-neue)',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: '#1A1A1A',
                      }}
                    >
                      {node.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-fragment-mono)',
                        fontSize: '9px',
                        color: '#A09890',
                      }}
                    >
                      {node.sublabel}
                    </span>
                  </div>
                </div>
              )}

              {node.type === 'personal' && (
                <div
                  style={{
                    background: '#F9F7F5',
                    width: '100px',
                    borderRadius: '6px',
                    border: '1px solid #E8E4DF',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  {node.thumbnail && (
                    <img
                      src={node.thumbnail}
                      alt={node.label}
                      style={{
                        width: '80px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginBottom: '6px',
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: 'var(--font-helvetica-neue)',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#1A1A1A',
                    }}
                  >
                    {node.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-fragment-mono)',
                      fontSize: '9px',
                      textTransform: 'uppercase',
                      color: '#A09890',
                      marginTop: '2px',
                    }}
                  >
                    {node.sublabel}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* 3. FloatingWindows */}
        <AnimatePresence>
          {openWindows.map((windowId) => {
            const node = nodeData.find((n) => n.id === windowId);
            if (!node) return null;
            return (
              <FloatingWindow
                key={node.id}
                node={node}
                onClose={() => setOpenWindows((prev) => prev.filter((id) => id !== node.id))}
              />
            );
          })}
        </AnimatePresence>

        {/* 5. ExperimentalCard (fixed, top-right of canvas area) */}
        <div
          style={{
            position: 'absolute',
            top: '72px',
            right: '24px',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #E8E4DF',
            borderRadius: 8,
            padding: '16px',
            width: '220px',
            zIndex: 250,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-fragment-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#C8B89A',
              margin: '0 0 8px',
            }}
          >
            Experimental Space
          </p>
          <p
            style={{
              fontFamily: 'var(--font-helvetica-neue)',
              fontSize: 13,
              color: '#1A1A1A',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            This canvas is always developing. Drag things around. See what connects.
          </p>
        </div>

      </div>
    </div>
  );
}

function FloatingWindow({
  node,
  onClose,
}: {
  node: typeof nodeData[number];
  onClose: () => void;
}) {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.95, x: node.initialX + 140, y: node.initialY - 40 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        width: 520,
        background: '#FFFFFF',
        borderRadius: 12,
        border: '1px solid #E8E4DF',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        zIndex: 200,
        minHeight: 320,
      }}
    >
      {/* TITLE BAR (drag handle) */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        style={{
          background: '#F9F7F5',
          padding: '12px 16px',
          borderBottom: '1px solid #E8E4DF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'grab',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-helvetica-neue)',
            fontSize: '13px',
            fontWeight: 500,
            color: '#1A1A1A',
          }}
        >
          {node.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            fontFamily: 'var(--font-fragment-mono)',
            fontSize: '14px',
            color: '#6B6560',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#1A1A1A';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#6B6560';
          }}
        >
          ×
        </button>
      </div>

      {/* WINDOW CONTENT */}
      {node.windowContent === 'iframe' && (
        <iframe
          src={node.windowSrc}
          style={{ width: '100%', height: 380, border: 'none', display: 'block' }}
          loading="lazy"
        />
      )}

      {node.windowContent === 'image' && (
        <img
          src={node.windowSrc}
          alt={node.label}
          style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }}
        />
      )}

      {node.windowContent === 'text' && (
        <div style={{ padding: '24px' }}>
          <p
            style={{
              fontFamily: 'var(--font-helvetica-neue)',
              fontSize: 15,
              color: '#1A1A1A',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {node.windowText}
          </p>
        </div>
      )}
    </motion.div>
  );
}
