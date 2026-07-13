'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface ExperienceItem {
  org: string;
  summary: string;
  category: string;
}

const experience: ExperienceItem[] = [
  {
    org: 'CPKC',
    summary: 'Embedding design practice inside a freight railway',
    category: 'Strategy',
  },
  {
    org: 'FOR/M',
    summary: 'Directing a public exhibition for 6,000 people',
    category: 'Design',
  },
  {
    org: 'Falcon',
    summary: 'Building the translation layer for the venture conversation',
    category: 'Research',
  },
  {
    org: 'Cadillac Fairview × OCAD',
    summary: 'Branding and promotional strategy for Gather',
    category: 'Strategy',
  },
  {
    org: 'DesignWith Lab',
    summary: 'Conducting market and accessibility research for materials reuse',
    category: 'Research',
  },
];

export default function ExperienceCardMini() {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href="/experience"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        background: '#FFFFFF',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      {/* Inner scaled container */}
      <div
        style={{
          transform: 'scale(0.52)',
          transformOrigin: 'top left',
          width: `${100 / 0.52}%`,
          height: `${100 / 0.52}%`,
          pointerEvents: 'none',
          padding: '40px',
          boxSizing: 'border-box',
        }}
      >
        {/* Replica Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '32px',
            width: '100%',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-helvetica-neue), sans-serif',
              fontSize: '48px',
              fontWeight: 500,
              color: '#1A1A1A',
              margin: 0,
              lineHeight: 1,
            }}
          >
            Experience
          </h1>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-fragment-mono), monospace',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#6B6560',
              border: '1px solid #E8E4DF',
              borderRadius: '6px',
              padding: '8px 14px',
            }}
          >
            View Resume PDF →
          </div>
        </div>

        {/* Replica Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          <span
            style={{
              border: '0.5px solid #000000',
              borderRadius: '99px',
              padding: '4px 14px',
              fontSize: '13px',
              fontFamily: 'var(--font-helvetica-neue), sans-serif',
              background: '#000000',
              color: '#FFFFFF',
            }}
          >
            All (7)
          </span>
          {['Strategy', 'Design', 'Research'].map(tag => (
            <span
              key={tag}
              style={{
                border: '0.5px solid #E8E4DF',
                borderRadius: '99px',
                padding: '4px 14px',
                fontSize: '13px',
                fontFamily: 'var(--font-helvetica-neue), sans-serif',
                background: 'transparent',
                color: '#6B6560',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Replica Column Headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr 120px 48px',
            padding: '12px 12px 12px 0',
            borderBottom: '1px solid #E8E4DF',
            marginTop: '12px',
          }}
        >
          <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '10px', textTransform: 'uppercase', color: '#A09890', letterSpacing: '0.12em' }}>ORGANISATION</div>
          <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '10px', textTransform: 'uppercase', color: '#A09890', letterSpacing: '0.12em' }}>SUMMARY</div>
          <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '10px', textTransform: 'uppercase', color: '#A09890', letterSpacing: '0.12em' }}>TAG</div>
          <div></div>
        </div>

        {/* Replica Table Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {experience.map((item, i) => (
            <div
              key={item.org}
              style={{
                borderBottom: '0.5px solid #E8E4DF',
                display: 'grid',
                gridTemplateColumns: '180px 1fr 120px 48px',
                padding: '18px 0',
                alignItems: 'center',
              }}
            >
              {/* Org */}
              <div
                style={{
                  fontFamily: 'var(--font-helvetica-neue), sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#1A1A1A',
                }}
              >
                {item.org}
              </div>

              {/* Summary */}
              <div
                style={{
                  fontFamily: 'var(--font-helvetica-neue), sans-serif',
                  fontSize: '13px',
                  color: '#6B6560',
                  paddingRight: '16px',
                }}
              >
                {item.summary}
              </div>

              {/* Tag badge */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-fragment-mono), monospace',
                    fontSize: '11px',
                    background: '#F9F7F5',
                    border: '0.5px solid #E8E4DF',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    color: '#6B6560',
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Arrow */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '1px solid #E8E4DF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1A1A1A',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '14px', fontWeight: 'bold' }}>
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permanent glaze — always visible */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,0.85) 100%)',
        pointerEvents: 'none',
        zIndex: 5,
      }} />
    </Link>
  )
}
