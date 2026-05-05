'use client'

import Link from 'next/link'
import { useState } from 'react'

interface BentoCardProps {
  tag: string
  title: string
  description?: string
  href?: string
  size?: 'small' | 'medium' | 'large'
  stat?: string
  statLabel?: string
  category: 'built' | 'think' | 'who'
  id?: string
  comingSoon?: boolean
}

function ContactModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          zIndex: 998,
        }}
      />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        background: 'var(--bg)',
        border: '0.5px solid var(--border)',
        borderRadius: '20px',
        padding: '36px',
        width: 'min(400px, calc(100vw - 48px))',
        boxShadow: '0 24px 64px rgba(0,0,0,0.12)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: '500',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}>
            Govind Singh Ahluwalia
          </h2>
          <button
            onClick={onClose}
            style={{
              color: 'var(--text-muted)',
              fontSize: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            {
              label: 'LinkedIn',
              value: '@govind-singh-ahluwalia',
              href: 'https://www.linkedin.com/in/govind-singh-ahluwalia/',
            },
            {
              label: 'Email',
              value: 'ahluwaliagovind@ocadu.ca',
              href: 'mailto:ahluwaliagovind@ocadu.ca',
            },
            {
              label: 'Phone',
              value: '+1 437 985 9340',
              href: 'tel:+14379859340',
            },
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                background: 'var(--bg-card)',
                border: '0.5px solid var(--border)',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.borderColor = 'var(--text-primary)')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.borderColor = 'var(--border)')
              }
            >
              <span style={{
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                {item.label}
              </span>
              <span style={{
                fontSize: '13px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
              }}>
                {item.value} ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export function BentoCard({
  tag,
  title,
  description,
  href,
  size = 'medium',
  stat,
  statLabel,
  id,
  comingSoon,
}: BentoCardProps) {
  const [showContact, setShowContact] = useState(false)
  const isAbout = id === 'about'
  const isClickable = href || isAbout

  const card = (
    <div
      onClick={isAbout ? () => setShowContact(true) : undefined}
      style={{
        background: 'var(--bg-card)',
        border: '0.5px solid var(--border)',
        borderRadius: '16px',
        padding: 'clamp(18px, 3vw, 28px)',
        position: 'relative',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'border-color 0.2s ease, background 0.2s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: size === 'large' ? '240px'
          : size === 'medium' ? '200px' : '160px',
        opacity: comingSoon ? 0.5 : 1,
      }}
      onMouseEnter={e => {
        if (isClickable) {
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

      {comingSoon && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          fontSize: '10px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          Soon
        </div>
      )}

      {isClickable && !comingSoon && (
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

      {showContact && (
        <ContactModal onClose={() => setShowContact(false)} />
      )}
    </div>
  )

  if (href && !isAbout) {
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
