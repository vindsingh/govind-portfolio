'use client'

import Link from 'next/link'
import { ToggleProvider } from '../../components/ToggleSwitch'
import { Nav } from '../../components/Nav'

export default function FalconPage() {
  return (
    <ToggleProvider>
      <Nav />
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 48px)',
      }}>

        <div style={{ marginBottom: '48px' }}>
          <p style={{
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '16px',
          }}>
            Thesis 2026 · Venture · OCAD University
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: '500',
            letterSpacing: '-0.03em',
            lineHeight: '1.0',
            color: 'var(--text-primary)',
            marginBottom: '24px',
          }}>
            Falcon
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            lineHeight: '1.6',
          }}>
            A shared interpretation layer between investors and founders.
            The sentence that connects what a product does to what a
            business becomes — has never been written. Until now.
          </p>
        </div>

        <a
          href="https://falcondemo.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'var(--text-primary)',
            color: 'var(--bg)',
            borderRadius: '100px',
            fontSize: '14px',
            fontFamily: 'var(--font-body)',
            fontWeight: '500',
            marginBottom: '64px',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          View live demo ↗
        </a>

        <div style={{
          marginBottom: '48px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '0.5px solid var(--border)',
          aspectRatio: '16/9',
          width: '100%',
        }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/p-zotFmbpzw"
            title="Falcon demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: 'block' }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
          marginBottom: '48px',
        }}>
          {[
            {
              label: 'The problem',
              content: 'Investors read financial metrics. Founders manage product reality. None of them are looking at the same thing. This is not a technology failure — it is a language failure.',
            },
            {
              label: 'The insight',
              content: 'Every tool in this landscape serves one telescope. Financial tools serve the investor. Product tools serve the team. Nobody built the room where both telescopes are in conversation.',
            },
            {
              label: 'The product',
              content: 'Falcon connects financial outcomes with product and behavioral signals — surfacing relationships in plain language so investors, founders, and product teams can finally stand in front of the same picture.',
            },
            {
              label: 'What\'s next',
              content: 'Investor share link — a read-only canvas view a founder can send with one click. Signal Cards inside Stripe and Mixpanel natively. The platform had to exist first.',
            },
          ].map(item => (
            <div
              key={item.label}
              style={{
                background: 'var(--bg-card)',
                border: '0.5px solid var(--border)',
                borderRadius: '16px',
                padding: '28px',
              }}
            >
              <p style={{
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                {item.label}
              </p>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
              }}>
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '0.5px solid var(--border)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <Link
            href="/"
            style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Back
          </Link>
          <p style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}>
            Full thesis available on request
          </p>
        </div>

      </main>
    </ToggleProvider>
  )
}
