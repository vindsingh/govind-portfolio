'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import { Highlighter } from '@/components/ui/Highlighter';
import VideoPlayer from '@/components/VideoPlayer';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

const ANCHORS = [
  { label: 'The problem', id: 'problem' },
  { label: 'The ecosystem', id: 'ecosystem' },
  { label: 'Features', id: 'features' },
  { label: 'Current state', id: 'now' },
] as const;

function FalconIndexBox() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ANCHORS.map(a => document.getElementById(a.id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0,
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (id: string) => {
    setActiveId(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .index-box-container {
          width: 250px;
          position: sticky;
          top: 32px;
          align-self: flex-start;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          padding: 16px;
          background: var(--color-surface);
          box-sizing: border-box;
          z-index: 10;
        }

        .index-box-anchors {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .index-box-anchor {
          font-family: var(--font-body), sans-serif;
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid transparent;
          padding: 2px 0 3px 0;
          cursor: pointer;
          white-space: nowrap;
          color: var(--color-text-muted);
          transition: color var(--transition-base), border-bottom-color var(--transition-base);
          text-align: left;
          line-height: 1.4;
        }

        .index-box-anchor:hover {
          color: var(--color-text-secondary);
        }

        .index-box-anchor.active {
          color: var(--color-text-primary);
          border-bottom: 1.5px solid var(--color-text-primary);
          padding-bottom: 3px;
        }

        .anchor-label {
          font-family: var(--font-body), sans-serif;
          font-size: var(--text-sm);
          font-weight: 500;
          color: inherit;
        }

        .sidebar-metadata {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-left: 0;
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
        {/* Anchors block */}
        <div className="index-box-anchors">
          {ANCHORS.map((anchor) => (
            <button
              key={anchor.id}
              onClick={() => handleAnchorClick(anchor.id)}
              className={`index-box-anchor ${activeId === anchor.id ? 'active' : ''}`}
            >
              <span className="anchor-label">{anchor.label}</span>
            </button>
          ))}
        </div>

        {/* Metadata block */}
        <div style={{ marginTop: '24px' }}>
          <div className="sidebar-metadata">
            <div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-muted)',
              }}>
                ROLE
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
                marginTop: '2px',
                fontWeight: 500,
                lineHeight: '1.4',
              }}>
                Independent Researcher and Builder
              </div>
            </div>

            <div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-muted)',
              }}>
                CATEGORY
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
                marginTop: '2px',
                fontWeight: 500,
                lineHeight: '1.4',
              }}>
                Performance Intelligence · Venture Design
              </div>
            </div>

            {/* Action Buttons restored per §5.1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
              <InteractiveHoverButton
                href="https://youtu.be/Ijp7a1J9mrU"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                Watch the Intro
              </InteractiveHoverButton>
              <InteractiveHoverButton
                href="https://youtu.be/p-zotFmbpzw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                Behind the Idea
              </InteractiveHoverButton>
              <InteractiveHoverButton
                href="https://falcondemo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                Try the Demo
              </InteractiveHoverButton>
            </div>
          </div>
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
        borderLeft: '3px solid var(--color-accent-falcon)',
        paddingLeft: '12px',
        fontFamily: 'var(--font-body), sans-serif',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--color-text-primary)',
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '28px',
        fontWeight: 700,
        lineHeight: 1.25,
        color: 'var(--color-text-primary)',
        margin: '12px 0 24px',
        maxWidth: 580,
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
          background: var(--color-bg) !important;
          font-family: var(--font-body), sans-serif !important;
        }

        .folder-wrapper {
          position: relative;
          margin-top: 12px;
        }

        .tab-row-container {
          display: flex;
          align-items: flex-end;
          margin-bottom: -1px;
          width: 100%;
          max-width: 1320px;
          margin-inline: auto;
          position: relative;
          z-index: 2;
        }

        .active-tab {
          background: var(--color-text-primary);
          color: var(--color-surface);
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 7px 16px;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%);
          border: none;
          border-radius: 0;
          cursor: pointer;
          line-height: 1;
        }

        .inactive-tab {
          background: transparent;
          color: var(--color-text-secondary);
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 400;
          padding: 7px 16px;
          border: none;
          cursor: pointer;
          line-height: 1;
          transition: color 150ms ease;
        }

        .inactive-tab:hover {
          color: var(--color-text-primary);
        }

        .file-container-custom {
          overflow: visible !important;
          background: var(--color-surface) !important;
          border: 1px solid var(--color-border) !important;
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
          <div className="tab-row-container">
            <Link href="/" className="active-tab">
              Go back
            </Link>
            <Link href="/?tab=work" className="inactive-tab">
              Work
            </Link>
            <Link href="/about" className="inactive-tab">
              About
            </Link>
            <Link href="/experience" className="inactive-tab">
              Experience
            </Link>
          </div>

          <FileContainer className="file-container-custom">
            <div className="case-study-layout">
              {/* Left Column (Sticky Sidebar) */}
              <FalconIndexBox />

              {/* Right Column (Content) */}
              <div className="article-content">
                {/* Headline Block */}
                <div style={{ marginBottom: '48px' }}>
                  <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4.5vw, 52px)',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                    marginBottom: '16px',
                  }}>
                    Founders talk. Investors filter. Something gets lost in between.
                  </h1>
                  <p style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    letterSpacing: '0.04em',
                    margin: 0,
                  }}>
                    - Language failure in venture.
                  </p>
                </div>

                {/* Mandate Paragraph */}
                <p style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontWeight: 300,
                  fontSize: '18px',
                  lineHeight: 1.75,
                  color: 'var(--color-text-primary)',
                  marginBottom: '48px',
                }}>
                  Falcon is built on eight months of research into a problem founders and investors both
                  recognise and neither has fixed. The information that flows between them is{' '}
                  <Highlighter action="underline" color="var(--color-accent-falcon)" isView={true}>
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
                      showMuteToggle={true}
                    />
                  </div>
                )}

                {/* Separator */}
                <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-border)', marginTop: '40px', marginBottom: '48px' }} />

                {/* SECTION 2 - THE PROBLEM */}
                <div id="problem" className="case-study-section" style={{ marginTop: 0 }}>
                  <SectionLabel>THE PROBLEM</SectionLabel>
                  <SectionHeading>Three people. The same company. None of them looking at the same thing.</SectionHeading>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-secondary)',
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
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-secondary)',
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
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: 'var(--text-md)',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        marginTop: '36px',
                        paddingTop: '28px',
                        borderTop: '1px solid var(--color-border)',
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
                  <div
                    className="orbit-ecosystem-stage"
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '480px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}
                  >
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

                    {/* Inner orbit items: use CSS animation via style tag */}
                    <style>{`
                      @keyframes orbitCW {
                        from { transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg); }
                        to   { transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg); }
                      }
                      @keyframes orbitCCW {
                        from { transform: translate(-50%, -50%) rotate(0deg) translateX(200px) rotate(0deg); }
                        to   { transform: translate(-50%, -50%) rotate(-360deg) translateX(200px) rotate(360deg); }
                      }
                      @media (max-width: 767px) {
                        .orbit-ecosystem-stage {
                          transform: scale(0.78);
                          transform-origin: center center;
                        }
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
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '11px',
                        color: 'var(--color-text-primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      The financial stack and the product stack.
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                        marginTop: '6px',
                      }}
                    >
                      Two separate languages. Falcon is the translation.
                    </div>
                  </div>
                </div>

                {/* SECTION 3 - FEATURES */}
                <div id="features" className="case-study-section" style={{ marginTop: '64px' }}>
                  <SectionLabel>FEATURES</SectionLabel>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.label}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        style={{
                          border: '0.5px solid var(--color-border)',
                          borderRadius: '12px',
                          padding: '24px 28px',
                          width: '100%',
                        }}
                      >
                        <p style={{
                          fontFamily: 'var(--font-body), sans-serif',
                          fontSize: '11px',
                          color: 'var(--color-accent-falcon)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '6px',
                          margin: 0,
                        }}>
                          {feature.label}
                        </p>
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '20px',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                          marginTop: 0,
                          marginBottom: '4px',
                        }}>
                          {feature.name}
                        </h3>
                        <p style={{
                          fontFamily: 'var(--font-body), sans-serif',
                          fontWeight: 300,
                          fontSize: '14px',
                          color: 'var(--color-text-secondary)',
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

                {/* SECTION 4 - NOW */}
                <div id="now" className="case-study-section" style={{ marginTop: '72px' }}>
                  <SectionLabel>CURRENT STATE</SectionLabel>
                  <SectionHeading>Built and building.</SectionHeading>

                  <div
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-text-secondary)',
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
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.6,
                      maxWidth: 520,
                      margin: '0 auto',
                      textAlign: 'center',
                    }}>
                      If you are working on venture intelligence, founder-investor communication, or performance data,{' '}
                      <a
                        href="mailto:ahluwaliagovindsingh@gmail.com"
                        style={{
                          color: 'inherit',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                          textDecorationColor: 'var(--color-border)',
                          transition: 'color var(--transition-base), text-decoration-color var(--transition-base)',
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--color-text-primary)';
                          e.currentTarget.style.textDecorationColor = 'currentColor';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'inherit';
                          e.currentTarget.style.textDecorationColor = 'var(--color-border)';
                        }}
                      >
                        message me
                      </a>{' '}
                      or find me on{' '}
                      <a
                        href="https://linkedin.com/in/govind-ahluwalia"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'inherit',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                          textDecorationColor: 'var(--color-border)',
                          transition: 'color var(--transition-base), text-decoration-color var(--transition-base)',
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--color-text-primary)';
                          e.currentTarget.style.textDecorationColor = 'currentColor';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'inherit';
                          e.currentTarget.style.textDecorationColor = 'var(--color-border)';
                        }}
                      >
                        LinkedIn
                      </a>.
                    </p>
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
