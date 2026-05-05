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
  category,
}: BentoCardProps) {

  const sizeStyles: Record<string, React.CSSProperties> = {
    small: { gridColumn: 'span 3', gridRow: 'span 2' },
    medium: { gridColumn: 'span 4', gridRow: 'span 3' },
    large: { gridColumn: 'span 5', gridRow: 'span 3' },
  }

  const card = (
    <div
      style={{
        ...sizeStyles[size],
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border)',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        cursor: href ? 'pointer' : 'default',
        transition: 'border-color 0.2s ease, background 0.2s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
          marginBottom: '12px',
          fontFamily: 'var(--font-body)',
        }}>
          {tag}
        </div>

        <div style={{
          fontSize: size === 'large' ? '24px' : '18px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.02em',
          lineHeight: '1.1',
          marginBottom: description ? '10px' : '0',
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
            fontSize: '42px',
            fontWeight: '300',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.04em',
            lineHeight: '1',
          }}>
            {stat}
          </div>
          <div style={{
            fontSize: '11px',
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
          bottom: '20px',
          right: '20px',
          fontSize: '14px',
          color: 'var(--text-muted)',
          transition: 'color 0.2s',
        }}>
          ↗
        </div>
      )}
    </div>
  )

  if (href) {
    return <Link href={href} style={{ ...sizeStyles[size], display: 'contents' }}>{card}</Link>
  }

  return card
}
