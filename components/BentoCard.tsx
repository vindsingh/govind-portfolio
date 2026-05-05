'use client'

import Link from 'next/link'

interface BentoCardProps {
  tag: string
  title: string
  description?: string
  href?: string
  size?: 'small' | 'medium' | 'large'
  stat?: string
  statLabel?: string
  category: 'built' | 'think' | 'who'
}

export function BentoCard({
  tag,
  title,
  description,
  href,
  size = 'medium',
  stat,
  statLabel,
}: BentoCardProps) {

  const card = (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border)',
        borderRadius: '16px',
        padding: 'clamp(18px, 3vw, 28px)',
        position: 'relative',
        cursor: href ? 'pointer' : 'default',
        transition: 'border-color 0.2s ease, background 0.2s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: size === 'large' ? '240px' : size === 'medium' ? '200px' : '160px',
      }}
      onMouseEnter={e => {
        if (href) {
          e.currentTarget.style.borderColor = 'var(--text-primary)'
          e.currentTarget.style.background = '#e8e7e3'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.background = 'var(--bg-card)'
      }}
    >
      <div>
        <div style={{
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '10px',
          fontFamily: 'var(--font-body)',
        }}>
          {tag}
        </div>

        <div style={{
          fontSize: size === 'large'
            ? 'clamp(20px, 3vw, 26px)'
            : 'clamp(16px, 2.5vw, 20px)',
          fontWeight: '500',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.02em',
          lineHeight: '1.15',
        }}>
          {title}
        </div>

        {description && (
          <div style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            marginTop: '8px',
          }}>
            {description}
          </div>
        )}
      </div>

      {stat && (
        <div style={{ marginTop: '16px' }}>
          <div style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '300',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.04em',
            lineHeight: '1',
          }}>
            {stat}
          </div>
          <div style={{
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginTop: '4px',
          }}>
            {statLabel}
          </div>
        </div>
      )}

      {href && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          fontSize: '14px',
          color: 'var(--text-muted)',
        }}>
          ↗
        </div>
      )}
    </div>
  )

  if (href) {
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          {card}
        </a>
      )
    }
    return (
      <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
        {card}
      </Link>
    )
  }

  return card
}
