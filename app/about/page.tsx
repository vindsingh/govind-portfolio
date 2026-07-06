'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';

export default function AboutPage() {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === 'work' || tab === 'all') {
      router.push('/');
    } else if (tab === 'experience') {
      router.push('/experience');
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .desktop-surface-custom {
          min-height: 100vh !important;
          background: #F9F7F5 !important;
          font-family: var(--font-helvetica-neue), sans-serif !important;
        }

        .folder-wrapper {
          position: relative;
          margin-top: 12px;
        }

        .file-container-custom {
          overflow: visible !important;
          background: #FFFFFF !important;
          border: 1px solid #E8E4DF !important;
          border-radius: 0 20px 20px 20px !important;
          box-shadow: var(--shadow-file) !important;
          padding: 32px;
        }

        .about-content-wrapper {
          max-width: 680px;
          margin-left: 0;
          margin-right: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid #E8E4DF;
          border-radius: 50%;
          color: #6B6560;
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          background: transparent;
        }

        .social-icon-btn:hover {
          border-color: #1A1A1A;
          color: #1A1A1A;
        }

        .artwork-grid-desktop {
          display: grid;
          grid-template-columns: 140px 1fr 1fr 140px;
          grid-template-rows: 1fr 1fr;
          gap: 6px;
          width: 100%;
          min-height: 420px;
          overflow: hidden;
        }

        @media (max-width: 767px) {
          .file-container-custom {
            padding: 16px !important;
          }
        }
      ` }} />

      <DesktopSurface className="desktop-surface-custom">
        <SiteHeader />

        <div className="folder-wrapper">
          <FileTabNav
            activeTab="about"
            onTabChange={handleTabChange}
          />

          <FileContainer className="file-container-custom">
            <div className="about-content-wrapper">
              
              {/* SECTION 1 — TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ width: '100%' }}
              >
                <h1
                  style={{
                    fontFamily: 'var(--font-helvetica-neue), sans-serif',
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 500,
                    color: '#1A1A1A',
                    marginBottom: '28px',
                    lineHeight: '1.2',
                  }}
                >
                  I'm Govind.
                </h1>

                <p
                  style={{
                    fontFamily: 'var(--font-helvetica-neue), sans-serif',
                    fontSize: 'clamp(13px, 1.4vw, 15px)',
                    color: '#1A1A1A',
                    lineHeight: '1.7',
                    marginBottom: '20px',
                  }}
                >
                  Most of what I care about happens before anything gets made.
                  Finding the problem worth solving, not just the solution worth building.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-helvetica-neue), sans-serif',
                    fontSize: 'clamp(13px, 1.4vw, 15px)',
                    color: '#1A1A1A',
                    lineHeight: '1.7',
                    marginBottom: '20px',
                  }}
                >
                  The work has lived inside a freight railway, a graduating exhibition,
                  and eight months of research that became a product. What connects them
                  is the same instinct: something more important is always hiding behind
                  the obvious question.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-helvetica-neue), sans-serif',
                    fontSize: 'clamp(12px, 1.2vw, 13px)',
                    color: '#6B6560',
                    lineHeight: '1.6',
                    marginTop: '8px',
                    marginBottom: '0',
                  }}
                >
                  I paint, follow markets, and play tennis badly. Mississauga.
                </p>
              </motion.div>

              {/* SECTION 2 — SOCIAL ICONS */}
              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-start', alignItems: 'center' }}>
                {/* Icon 1: Email */}
                <a
                  href="mailto:govindsingh.ahluwalia@gmail.com"
                  aria-label="Email"
                  className="social-icon-btn"
                >
                  <Mail size={14} strokeWidth={1.5} />
                </a>

                {/* Icon 2: LinkedIn */}
                <a
                  href="https://linkedin.com/in/govind-singh-ahluwalia"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="social-icon-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037 -1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046 c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z M5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>
              </div>

              {/* SECTION 3 — ARTWORK GRID */}
              <div style={{ marginTop: '48px', width: '100%' }}>
                {/* Separator */}
                <div style={{ width: '100%', height: '1px', backgroundColor: '#E8E4DF', marginBottom: '32px' }} />

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <div className="artwork-grid-desktop">
                    {/* L-TOP */}
                    <div style={{ gridColumn: 1, gridRow: 1 }}>
                      <img
                        src="/about/L-TOP.jpeg"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 4 }}
                      />
                    </div>

                    {/* L-BOTTOM */}
                    <div style={{ gridColumn: 1, gridRow: 2 }}>
                      <img
                        src="/about/L-BOTTOM.jpeg"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 4 }}
                      />
                    </div>

                    {/* L */}
                    <div style={{ gridColumn: 2, gridRow: '1 / span 2' }}>
                      <img
                        src="/about/L.jpeg"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 4 }}
                      />
                    </div>

                    {/* R */}
                    <div style={{ gridColumn: 3, gridRow: '1 / span 2' }}>
                      <img
                        src="/about/R.jpeg"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 4 }}
                      />
                    </div>

                    {/* R-TOP */}
                    <div style={{ gridColumn: 4, gridRow: 1 }}>
                      <img
                        src="/about/R-TOP.jpeg"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 4 }}
                      />
                    </div>

                    {/* R-BOTTOM */}
                    <div style={{ gridColumn: 4, gridRow: 2 }}>
                      <img
                        src="/about/R-BOTTOM.jpeg"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 4 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Caption */}
                <div
                  style={{
                    marginTop: '16px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-fragment-mono), monospace',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#A09890',
                  }}
                >
                  Vind, 2022 · Mixed media on stone
                </div>
              </div>

            </div>
          </FileContainer>
        </div>
      </DesktopSurface>
    </>
  );
}
