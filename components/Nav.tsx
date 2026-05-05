'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ToggleSwitch } from './ToggleSwitch'

export function Nav() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'clamp(16px, 3vw, 28px) clamp(20px, 5vw, 48px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg)',
      borderBottom: '0.5px solid var(--border)',
    }}>
      <Link href="/">
        <Image
          src="/vindlogo.svg"
          alt="Govind Ahluwalia"
          width={60}
          height={24}
          style={{ objectFit: 'contain', display: 'block' }}
        />
      </Link>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(16px, 3vw, 32px)',
      }}>
        <ToggleSwitch />
        <a
          href="https://www.linkedin.com/in/govind-singh-ahluwalia/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.02em',
            fontFamily: 'var(--font-body)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e =>
            (e.currentTarget.style.color = 'var(--text-primary)')
          }
          onMouseLeave={e =>
            (e.currentTarget.style.color = 'var(--text-secondary)')
          }
        >
          Contact ↗
        </a>
      </div>
    </nav>
  )
}
