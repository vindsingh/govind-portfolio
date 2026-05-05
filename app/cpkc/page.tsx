'use client'

import Link from 'next/link'
import { ToggleProvider } from '../../components/ToggleSwitch'
import { Nav } from '../../components/Nav'

export default function CPKCPage() {
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
            Enterprise · Innovation · 2024–2025
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
            Building design<br />inside a railroad
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            lineHeight: '1.6',
          }}>
            Embedding human-centered design practice inside
            Canadian Pacific Kansas City — a 20,000-person
            infrastructure company that wasn't built for it.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '64px',
        }}>
          {[
            { stat: '105+', label: 'Community of Practice members' },
            { stat: '1st', label: 'AI-native chatbot at CPKC' },
            { stat: '3', label: 'Enterprise frameworks built' },
            { stat: '∞', label: 'Whiteboards filled' },
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
                fontFamily: 'var(--font-display)',
                fontSize: '48px',
                fontWeight: '300',
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                lineHeight: '1',
                marginBottom: '8px',
              }}>
                {item.stat}
              </p>
              <p style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
          marginBottom: '48px',
        }}>
          {[
            {
              label: 'What I built',
              content: 'A design thinking framework from scratch, a Community of Practice grown to 105+ members, an AI Cards toolkit for human-centered AI thinking, and co-ownership of UX for the company\'s first AI-native chatbot.',
            },
            {
              label: 'The context',
              content: 'CPKC is a legacy infrastructure company. Design had no formal seat. The challenge was not doing design work — it was building the conditions for design work to matter.',
            },
            {
              label: 'Want to know more?',
              content: 'This work involves internal systems and tools. I\'m happy to walk through it in detail — reach out directly.',
              cta: true,
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
                marginBottom: item.cta ? '16px' : '0',
              }}>
                {item.content}
              </p>
              {item.cta && (
                <a
                  href="mailto:ahluwaliagovind@ocadu.ca"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    fontWeight: '500',
                    borderBottom: '0.5px solid var(--text-primary)',
                    paddingBottom: '2px',
                  }}
                >
                  Get in touch ↗
                </a>
              )}
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
            Detailed case study available on request
          </p>
        </div>

      </main>
    </ToggleProvider>
  )
}
