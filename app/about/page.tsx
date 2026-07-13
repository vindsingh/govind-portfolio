'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';
import TerminalTypewriter from '@/components/TerminalTypewriter';

const ABOUT_LINES = [
  '> Glad you want to know more.',
  '> The work is one side of it.',
  '> This is the other.',
];

export default function AboutPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
          display: flex;
          flex-direction: row;
          gap: 48px;
          align-items: flex-start;
          width: 100%;
        }

        .about-right-col {
          width: 380px;
          flex-shrink: 0;
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
          .about-content-wrapper {
            flex-direction: column;
          }
          .about-right-col {
            width: 100% !important;
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', width: '100%' }}>
              
              {/* TERMINAL REPLICA */}
              <div
                style={{
                  width: '100%',
                  background: '#000000',
                  borderRadius: '12px',
                  border: '1px solid #222222',
                  padding: '40px 24px 24px',
                  position: 'relative',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                }}
              >
                {/* macOS window dots */}
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '16px',
                  display: 'flex',
                  gap: '6px',
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
                </div>

                <TerminalTypewriter textFontSize="16px" lines={ABOUT_LINES}>
                  {/* Icon buttons below typewriter lines */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <a
                      href="mailto:ahluwaliagovindsingh@gmail.com"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#FFFFFF',
                        transition: 'background 200ms ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Mail size={16} strokeWidth={1.5} style={{ color: '#FFFFFF' }} />
                    </a>
                    <a
                      href="https://linkedin.com/in/govind-singh-ahluwalia"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#FFFFFF',
                        transition: 'background 200ms ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FFFFFF' }}>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                      </svg>
                    </a>
                  </div>
                </TerminalTypewriter>
              </div>
              
              {/* SECTION 1 — BIO TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ width: '100%' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-helvetica-neue), sans-serif',
                    fontSize: 'clamp(13px, 1.4vw, 15px)',
                    color: '#1A1A1A',
                    lineHeight: '1.7',
                    marginBottom: '20px',
                  }}
                >
                  I'm Govind. I work at the intersection of design, strategy, and research — drawn to problems that are too tangled to have obvious answers. A freight railway learning to think in human terms. Investors and founders trying to actually understand each other. Fifty graduates turning into an exhibition six thousand people walk through.
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
                  My process starts with the question, not the tool. Most of what I do begins with research, ends with something built, and passes through a lot of diagrams, conversations, and paper in between. I'm most useful at the beginning of things — when the problem is still being defined and the right approach isn't obvious yet.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-helvetica-neue), sans-serif',
                    fontSize: 'clamp(13px, 1.4vw, 15px)',
                    color: '#1A1A1A',
                    lineHeight: '1.7',
                    marginBottom: 0,
                  }}
                >
                  Based in Toronto. Curious about design strategy, strategic foresight, and the early edge of ventures.
                </p>
              </motion.div>

              {/* SECTION 2 — HOW I START */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-fragment-mono), monospace',
                    fontSize: '12px',
                    fontWeight: 'normal',
                    color: '#A09890',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '16px',
                  }}
                >
                  how I start
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '32px',
                    alignItems: 'stretch',
                  }}
                >
                  {/* Left Column (50% width) */}
                  <div style={{ flex: '50 0 0%' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-helvetica-neue), sans-serif',
                        fontSize: 'clamp(13px, 1.4vw, 15px)',
                        color: '#1A1A1A',
                        lineHeight: '1.7',
                        margin: 0,
                      }}
                    >
                      I reach for pen and paper before I open anything. Not because I distrust the tools — I use most of them — but because the thinking has to happen first. Software changes every year. The way I map a problem, trace a causal chain, or sketch a system doesn't. What looks like a product on screen usually started as a diagram, a question, or a half-finished map on paper.
                    </p>
                  </div>

                  {/* Right Column (50% width) */}
                  <div style={{ flex: '50 0 0%', height: isMobile ? '320px' : '480px', position: 'relative' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      style={{ width: '100%', height: '100%', position: isMobile ? 'relative' : 'absolute', inset: 0 }}
                    >
                      <img
                        src="/about/Penpaperphoto.png"
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top',
                          borderRadius: '8px',
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 — OUTSIDE THE BRIEF */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-fragment-mono), monospace',
                    fontSize: '12px',
                    fontWeight: 'normal',
                    color: '#A09890',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '16px',
                  }}
                >
                  outside the brief
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-helvetica-neue), sans-serif',
                    fontSize: 'clamp(13px, 1.4vw, 15px)',
                    color: '#A09890',
                    marginBottom: '24px',
                    marginTop: 0,
                  }}
                >
                  Observer by nature. Maker by instinct.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Painting 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0 }}
                    style={{ width: '100%', height: '480px', position: 'relative' }}
                  >
                    <img
                      src="/about/Painting_1.png"
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </motion.div>

                  {/* Painting 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    style={{ width: '100%', height: '320px', position: 'relative' }}
                  >
                    <img
                      src="/about/Painting_2.jpg"
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </motion.div>

                  {/* Painting 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ width: '100%', height: '400px', position: 'relative' }}
                  >
                    <img
                      src="/about/Painting_3.jpg"
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </motion.div>
                </div>
              </div>

            </div>
          </FileContainer>
        </div>
      </DesktopSurface>
    </>
  );
}
