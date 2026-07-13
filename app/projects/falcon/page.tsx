'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';
import { Highlighter } from '@/components/ui/Highlighter';
import VideoPlayer from '@/components/VideoPlayer';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

const ANCHORS = [
  { label: 'The Problem', id: 'problem' },
  { label: 'The Ecosystem', id: 'ecosystem' },
  { label: 'Features', id: 'features' },
  { label: 'Now', id: 'now' },
] as const;

function FalconIndexBox() {
  const timeoutsRef = useRef<{ [key: string]: ReturnType<typeof setTimeout>[] }>({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsCollapsed(window.scrollY > 220);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });

      // Clear any existing timeouts for this target to avoid overlaps
      if (timeoutsRef.current[id]) {
        timeoutsRef.current[id].forEach(clearTimeout);
      }

      const t1 = setTimeout(() => {
        target.classList.add('section-highlight');
      }, 600);

      const t2 = setTimeout(() => {
        target.classList.remove('section-highlight');
      }, 1500);

      timeoutsRef.current[id] = [t1, t2];
    }
  };

  const ctaButtonStyle = {
    display: 'block',
    border: '1px solid var(--color-border-strong, #E8E4DF)',
    borderRadius: '6px',
    padding: '8px 14px',
    fontFamily: 'var(--font-helvetica-neue), sans-serif',
    fontSize: '12px',
    color: '#1A1A1A',
    textAlign: 'center' as const,
    textDecoration: 'none',
    transition: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .index-box-container {
          width: 220px;
          position: sticky;
          top: 32px;
          align-self: flex-start;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          padding: 20px;
          background: var(--color-surface);
          box-sizing: border-box;
          z-index: 10;
        }

        .index-box-anchors {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .index-box-anchor {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          color: #1A1A1A;
          letter-spacing: 0.06em;
          padding: 2px 0 2px 10px;
          border-left: 2px solid transparent;
          cursor: pointer;
          transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1), border-left-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          width: 100%;
          background: transparent;
          border-top: none;
          border-right: none;
          border-bottom: none;
        }

        .index-box-anchor:hover {
          color: var(--color-text-primary);
          border-left-color: #C8910A; /* Falcon amber */
        }

        .sidebar-metadata {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-left: 10px;
        }

        @media (max-width: 767px) {
          .index-box-container {
            position: static !important;
            width: 100% !important;
            margin-bottom: 24px;
          }
        }
      ` }} />

      <div className="index-box-container">
        <div className="index-box-anchors">
          {ANCHORS.map((anchor) => (
            <button
              key={anchor.id}
              onClick={() => handleAnchorClick(anchor.id)}
              className="index-box-anchor"
            >
              {anchor.label}
            </button>
          ))}
        </div>

        <div className="sidebar-metadata" style={{ marginTop: '24px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000000' }}>ROLE</div>
            <div style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif', fontSize: 'var(--text-sm)', color: '#1A1A1A', marginTop: '4px', fontWeight: 500 }}>Independent Researcher &amp; Designer</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000000' }}>CATEGORY</div>
            <div style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif', fontSize: 'var(--text-sm)', color: '#1A1A1A', marginTop: '4px', fontWeight: 500 }}>Performance Intelligence · Venture Design</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000000' }}>STATUS</div>
            <div style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif', fontSize: 'var(--text-sm)', color: '#1A1A1A', marginTop: '4px', fontWeight: 500, lineHeight: '1.4' }}>
              Research complete · <span style={{ color: '#C8910A' }}>Product in development</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
          <InteractiveHoverButton href="https://youtu.be/Ijp7a1J9mrU" target="_blank" rel="noopener noreferrer" className="text-sm">
            Watch the Intro
          </InteractiveHoverButton>
          <InteractiveHoverButton href="https://youtu.be/p-zotFmbpzw" target="_blank" rel="noopener noreferrer" className="text-sm">
            Behind the Idea
          </InteractiveHoverButton>
          <InteractiveHoverButton href="https://falcondemo.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm">
            Try the Demo
          </InteractiveHoverButton>
        </div>
      </div>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        borderLeft: '3px solid #C8910A',
        paddingLeft: '12px',
        fontFamily: 'var(--font-fragment-mono), monospace',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#000000',
        lineHeight: '1',
      }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  children: React.ReactNode;
}

function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
      style={{
        fontFamily: 'var(--font-helvetica-neue), sans-serif',
        fontSize: 'var(--text-lg)',
        fontWeight: 500,
        color: '#000000',
        marginTop: '12px',
        marginBottom: '28px',
      }}
    >
      {children}
    </motion.h2>
  );
}

const features = [
  {
    label: 'ONBOARDING',
    name: 'Setting the context',
    description: 'How a founder builds their company profile before the first investor conversation.',
    src: '/projects/falcon/Onboarding.mp4',
  },
  {
    label: 'SIGNAL CARD',
    name: 'Structured updates',
    description: 'How progress, blockers, and decisions get packaged for investor clarity.',
    src: '/projects/falcon/signal-card.mp4',
  },
  {
    label: 'SHARE TO INVESTOR',
    name: 'Targeted delivery',
    description: 'How signals reach the right people without becoming noise.',
    src: '/projects/falcon/share-to-investor.mp4',
  },
  {
    label: 'OPEN CANVAS',
    name: 'The workspace',
    description: 'Where founders map venture context before it becomes a formal update.',
    src: '/projects/falcon/open-canvas.mp4',
  },
  {
    label: 'MONTHS',
    name: 'Progress over time',
    description: 'How Falcon tracks and surfaces momentum across a fundraising timeline.',
    src: '/projects/falcon/Months.mp4',
  },
];

const availableVideos = [
  '/projects/falcon/falcon-introduction.mp4',
  '/projects/falcon/Onboarding.mp4',
  '/projects/falcon/signal-card.mp4',
  '/projects/falcon/share-to-investor.mp4',
  '/projects/falcon/open-canvas.mp4',
  '/projects/falcon/Months.mp4',
];

export default function FalconCaseStudy() {
  const router = useRouter();

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
          border-radius: var(--radius-file) !important;
          box-shadow: var(--shadow-card) !important;
        }

        .case-study-layout {
          display: flex;
          gap: 40px;
          padding: 32px;
          align-items: flex-start;
          width: 100%;
        }

        .article-content {
          flex: 1;
          max-width: 720px;
        }

        .case-study-section {
          padding: 24px;
          margin-left: -24px;
          margin-right: -24px;
          margin-bottom: 14px;
          border-radius: var(--radius-card);
          transition: background-color 1200ms ease;
          scroll-margin-top: 64px;
        }

        .section-highlight {
          background-color: rgba(200, 145, 10, 0.06) !important;
          transition: background-color 1200ms ease !important;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #C8910A;
          color: #FFFFFF;
          padding: 10px 20px;
          border-radius: 6px;
          font-family: var(--font-fragment-mono), monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 500;
          transition: var(--transition-base);
          text-decoration: none;
        }
        .cta-primary:hover {
          background: #B8800A;
        }

        .cta-text-link {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 12px;
          color: #6B6560;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          transition: color var(--transition-base);
        }
        .cta-text-link:hover {
          color: #1A1A1A;
        }

        @media (max-width: 767px) {
          .case-study-layout {
            flex-direction: column !important;
            padding: 16px !important;
          }

          .case-study-section {
            margin-left: -16px !important;
            margin-right: -16px !important;
            width: calc(100% + 32px) !important;
          }
        }
      ` }} />

      <DesktopSurface className="desktop-surface-custom">
        <SiteHeader />

        <div className="folder-wrapper">
          <FileTabNav
            activeTab="work"
            onTabChange={() => {
              router.push('/');
            }}
          />

          <FileContainer className="file-container-custom">
            <div className="case-study-layout">
              {/* Left Column (Sticky Sidebar) */}
              <FalconIndexBox />

              {/* Right Column (Content) */}
              <div className="article-content">
                {/* Headline Block */}
                <div style={{ marginBottom: '48px' }}>
                  <h1 style={{
                    fontFamily: 'var(--font-helvetica), sans-serif',
                    fontSize: 'clamp(28px, 4.5vw, 52px)',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#000000',
                    marginBottom: '16px',
                  }}>
                    Founders talk. Investors filter. Something gets lost in between.
                  </h1>
                  <p style={{
                    fontFamily: 'var(--font-fragment-mono), monospace',
                    fontSize: '12px',
                    color: '#000000',
                    letterSpacing: '0.04em',
                    margin: 0,
                  }}>
                    — Language failure in venture.
                  </p>
                </div>

                {/* Mandate Paragraph */}
                <p style={{
                  fontFamily: 'var(--font-helvetica), sans-serif',
                  fontWeight: 300,
                  fontSize: '18px',
                  lineHeight: 1.75,
                  color: '#000000',
                  marginBottom: '48px',
                }}>
                  Falcon is built on eight months of research into a problem founders and investors both
                  recognise and neither has fixed. The information that flows between them is{' '}
                  <Highlighter action="underline" color="#C8910A" isView={true}>
                    scattered, informal, and lossy.
                  </Highlighter>{' '}
                  Existing tools treat it as a reporting problem. Falcon treats it as a{' '}
                  <Highlighter action="highlight" color="#EAD9C2" isView={true}>
                    translation problem.
                  </Highlighter>
                </p>

                {/* Intro Video Section */}
                {availableVideos.includes('/projects/falcon/falcon-introduction.mp4') && (
                  <div style={{ marginBottom: '56px' }}>
                    <VideoPlayer
                      src="/projects/falcon/falcon-introduction.mp4"
                      aspectRatio="16/9"
                      borderRadius="12px"
                    />
                  </div>
                )}

                {/* Separator */}
                <div style={{ width: '100%', height: '1px', backgroundColor: '#E8E4DF', marginTop: '40px', marginBottom: '48px' }} />

                {/* SECTION 2 — THE PROBLEM */}
                <div id="problem" className="case-study-section" style={{ marginTop: 0 }}>
                  <SectionLabel>THE PROBLEM</SectionLabel>
                  <SectionHeading>Three people. The same company. None of them looking at the same thing.</SectionHeading>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-helvetica-neue), sans-serif',
                        fontSize: 'var(--text-base)',
                        color: '#000000',
                        lineHeight: '1.65',
                        margin: 0,
                      }}
                    >
                      The investor sees a revenue number and a retention rate. The founder sees
                      a sprint velocity and an activation metric. The product holds the relationship
                      between all of them. There is no tool that surfaces it. Every tool in the
                      venture stack was built for one side. Financial tools for the investor.
                      Product tools for the team. Nothing for the conversation between them.
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-helvetica-neue), sans-serif',
                        fontSize: 'var(--text-base)',
                        color: '#000000',
                        lineHeight: '1.65',
                        margin: 0,
                      }}
                    >
                      I started with a simpler question: who loses when a company misses its
                      number? The answer is always everyone in that room. Usually because the
                      signal existed weeks earlier, in a place no one was looking. Activation rate
                      changes preceded MRR changes by 5.3 weeks on average. The correlation was
                      strong. The confidence was high. The product already knew what the business
                      was about to learn.
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-helvetica-neue), sans-serif',
                        fontSize: 'var(--text-md)',
                        fontWeight: 500,
                        color: '#000000',
                        marginTop: '36px',
                        paddingTop: '28px',
                        borderTop: '1px solid #E8E4DF',
                        lineHeight: '1.65',
                        margin: 0,
                      }}
                    >
                      This is not a data problem. It is a meaning problem.
                    </p>
                  </div>
                </div>

                {/* ORBITING CIRCLES DIAGRAM */}
                <div id="ecosystem" className="case-study-section" style={{ marginTop: '56px', marginBottom: '56px' }}>
                  <SectionLabel>THE ECOSYSTEM</SectionLabel>
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '480px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {/* Orbit path circles */}
                    <div style={{
                      position: 'absolute',
                      width: 240, height: 240,
                      borderRadius: '50%',
                      border: '1px solid rgba(0,0,0,0.08)',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none'
                    }} />
                    <div style={{
                      position: 'absolute',
                      width: 400, height: 400,
                      borderRadius: '50%',
                      border: '1px solid rgba(0,0,0,0.08)',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none'
                    }} />

                    {/* Center brain */}
                    <img
                      src="/projects/falcon/brain.svg"
                      style={{
                        width: 64, height: 64,
                        objectFit: 'contain',
                        position: 'relative',
                        zIndex: 10
                      }}
                      alt="Falcon"
                    />

                    {/* Inner orbit items — use CSS animation via style tag */}
                    <style>{`
                      @keyframes orbitCW {
                        from { transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg); }
                        to   { transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg); }
                      }
                      @keyframes orbitCCW {
                        from { transform: translate(-50%, -50%) rotate(0deg) translateX(200px) rotate(0deg); }
                        to   { transform: translate(-50%, -50%) rotate(-360deg) translateX(200px) rotate(360deg); }
                      }
                      .orbit-item-inner-1 {
                        position: absolute;
                        top: 50%; left: 50%;
                        animation: orbitCW 18s linear infinite;
                      }
                      .orbit-item-inner-2 {
                        position: absolute;
                        top: 50%; left: 50%;
                        animation: orbitCW 18s linear infinite;
                        animation-delay: -9s;
                      }
                      .orbit-item-outer-1 {
                        position: absolute;
                        top: 50%; left: 50%;
                        animation: orbitCCW 30s linear infinite;
                      }
                      .orbit-item-outer-2 {
                        position: absolute;
                        top: 50%; left: 50%;
                        animation: orbitCCW 30s linear infinite;
                        animation-delay: -10s;
                      }
                      .orbit-item-outer-3 {
                        position: absolute;
                        top: 50%; left: 50%;
                        animation: orbitCCW 30s linear infinite;
                        animation-delay: -20s;
                      }
                    `}</style>

                    <div className="orbit-item-inner-1">
                      <img src="/projects/falcon/Heap.svg"
                        style={{ width: 28, height: 28, objectFit: 'contain', display: 'block' }} />
                    </div>
                    <div className="orbit-item-inner-2">
                      <img src="/projects/falcon/Amplitude.svg"
                        style={{ width: 28, height: 28, objectFit: 'contain', display: 'block' }} />
                    </div>
                    <div className="orbit-item-outer-1">
                      <img src="/projects/falcon/carta.svg"
                        style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }} />
                    </div>
                    <div className="orbit-item-outer-2">
                      <img src="/projects/falcon/standardmetrics.svg"
                        style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }} />
                    </div>
                    <div className="orbit-item-outer-3">
                      <img src="/projects/falcon/pulley.svg"
                        style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }} />
                    </div>
                  </div>

                  {/* Caption */}
                  <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-fragment-mono), monospace',
                        fontSize: '11px',
                        color: '#000000',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      The financial stack and the product stack.
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-helvetica-neue), sans-serif',
                        fontSize: 'var(--text-sm)',
                        color: '#000000',
                        marginTop: '6px',
                      }}
                    >
                      Two separate languages. Falcon is the translation.
                    </div>
                  </div>
                </div>

                {/* SECTION 3 — FEATURES */}
                <div id="features" className="case-study-section" style={{ marginTop: '64px' }}>
                  <SectionLabel>features</SectionLabel>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.label}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        style={{
                          border: '0.5px solid var(--color-border, #E8E4DF)',
                          borderRadius: '12px',
                          padding: '24px 28px',
                          width: '100%',
                        }}
                      >
                        <p style={{
                          fontFamily: 'var(--font-fragment-mono), monospace',
                          fontSize: '11px',
                          color: '#C8910A',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '6px',
                          margin: 0,
                        }}>
                          {feature.label}
                        </p>
                        <h3 style={{
                          fontFamily: 'var(--font-helvetica), sans-serif',
                          fontSize: '20px',
                          fontWeight: 500,
                          color: '#000000',
                          marginTop: 0,
                          marginBottom: '4px',
                        }}>
                          {feature.name}
                        </h3>
                        <p style={{
                          fontFamily: 'var(--font-helvetica), sans-serif',
                          fontWeight: 300,
                          fontSize: '14px',
                          color: 'var(--color-text-secondary, var(--text-secondary, #6B6560))',
                          marginBottom: '20px',
                          lineHeight: 1.6,
                          marginTop: 0,
                        }}>
                          {feature.description}
                        </p>
                        {availableVideos.includes(feature.src) && (
                          <VideoPlayer
                            src={feature.src}
                            aspectRatio="16/9"
                            borderRadius="8px"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* SECTION 4 — NOW */}
                <div id="now" className="case-study-section" style={{ marginTop: '72px' }}>
                  <SectionLabel>CURRENT STATE</SectionLabel>
                  <SectionHeading>Built and building.</SectionHeading>

                  <div
                    style={{
                      fontFamily: 'var(--font-helvetica-neue), sans-serif',
                      fontSize: 'var(--text-base)',
                      color: '#000000',
                      marginTop: '8px',
                      marginBottom: '32px',
                    }}
                  >
                    The prototype works. The production version is in development.
                  </div>

                  <div style={{
                    textAlign: 'center',
                    padding: '40px 0'
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-helvetica-neue)',
                      fontSize: '15px',
                      color: '#000000',
                      lineHeight: 1.65,
                      maxWidth: 480,
                      margin: '0 auto 32px'
                    }}>
                      The research is complete. The platform is in development.
                      If you are working in this space: venture intelligence,
                      founder-investor communication, or performance data,
                      I would like to hear from you.
                    </p>
                    <a
                      href="mailto:ahluwaliagovindsingh@gmail.com"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        fontFamily: 'var(--font-fragment-mono)',
                        fontSize: 12,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#FFFFFF',
                        background: '#C8910A',
                        borderRadius: 6,
                        padding: '10px 20px',
                        textDecoration: 'none'
                      }}
                    >
                      Get in touch →
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </FileContainer>
        </div>
      </DesktopSurface>
    </>
  );
}
