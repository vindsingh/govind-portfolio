'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import { Highlighter } from '@/components/ui/Highlighter';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

const ANCHORS = [
  { label: 'Context', id: 'context' },
  { label: 'The Room', id: 'the-room' },
  { label: 'The Work', id: 'the-work' },
  { label: 'Outcomes', id: 'outcomes' },
] as const;

function CPKCIndexBox() {
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
          border-left-color: #D3A122;
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

        <div style={{
          overflow: 'hidden',
          maxHeight: isCollapsed ? '0px' : '450px',
          opacity: isCollapsed ? 0 : 1,
          marginTop: isCollapsed ? '0px' : '16px',
          transition: 'max-height 400ms ease, opacity 300ms ease, margin-top 300ms ease'
        }}>
          <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid var(--color-border)' }} />

          <div className="sidebar-metadata">
            <div>
              <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000000' }}>ROLE</div>
              <div style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif', fontSize: 'var(--text-sm)', color: '#1A1A1A', marginTop: '4px', fontWeight: 500 }}>Innovation Catalyst</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000000' }}>TYPE</div>
              <div style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif', fontSize: 'var(--text-sm)', color: '#1A1A1A', marginTop: '4px', fontWeight: 500 }}>Mitacs BSI · Enterprise Design &amp; AI</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000000' }}>PERIOD</div>
              <div style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif', fontSize: 'var(--text-sm)', color: '#1A1A1A', marginTop: '4px', fontWeight: 500 }}>2025–26</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000000' }}>STATUS</div>
              <div style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif', fontSize: 'var(--text-sm)', color: '#1A1A1A', marginTop: '4px', fontWeight: 500, lineHeight: '1.4' }}>
                Contract complete
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
          <InteractiveHoverButton href="mailto:ahluwaliagovindsingh@gmail.com" className="text-sm">
            Let's talk
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
        borderLeft: '3px solid #D3A122',
        paddingLeft: '12px',
        fontFamily: 'var(--font-fragment-mono), monospace',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: '#000000',
        lineHeight: '1',
        marginBottom: '24px',
      }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCount({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const phases = [
  {
    number: '01',
    label: 'METHODOLOGY',
    title: 'Design Thinking Framework',
    description: "CPKC had no shared methodology for problem framing. The framework gave the organization a structured approach to moving from \"we have a problem\" to \"here is the right problem to solve\", adapted to CPKC's existing project lifecycle so it could be adopted without displacing existing processes. Adopted by the CIO and integrated as standard practice.",
    svg: '/projects/cpkc/phase-1.svg',
  },
  {
    number: '02',
    label: 'TOOLKIT',
    title: 'AI Cards Toolkit',
    description: "AI concepts don't translate easily across technical and non-technical teams. The AI Cards were designed as a facilitation tool: a set of cards that made model behaviour, edge cases, and human oversight legible to stakeholders who don't think in systems terms. Built for workshops and decision-making sessions, not documentation.",
    svg: '/projects/cpkc/phase-2.svg',
  },
  {
    number: '03',
    label: 'PRODUCT',
    title: 'Market Intelligence Chatbot',
    description: "CPKC's first AI-native internal product. I co-owned the UX across the full build, from initial problem definition through interface design and handoff. The challenge wasn't the AI component. It was designing an interface that made the model's outputs legible and trustworthy to the people who would rely on it daily.",
    svg: '/projects/cpkc/phase-3.svg',
  },
  {
    number: '04',
    label: 'COMMUNITY',
    title: 'Community of Practice',
    description: "Design thinking doesn't persist through documentation. The Community of Practice built the internal social infrastructure: 105+ members across departments, regular programming, a shared language that continued after the engagement. The goal was to make the methodology self-sustaining.",
    svg: '/projects/cpkc/phase-4.svg',
  },
] as const;

const outcomes = [
  { value: '105+', label: "Community of Practice members across CPKC departments" },
  { value: 'CIO', label: "Level adoption of the design thinking framework" },
  { value: '01', label: "CPKC's first AI-native internal product, co-owned UX end to end" },
  { value: 'Mitacs', label: "Business Strategy Internship grant recipient, 2025–26" },
] as const;

export default function CPKCCaseStudy() {
  const router = useRouter();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .desktop-surface-custom {
          min-height: 100vh !important;
          background: #FFFFFF !important;
          font-family: var(--font-helvetica-neue), sans-serif !important;
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
          background: #1A1A1A;
          color: #FFFFFF;
          font-family: var(--font-helvetica-neue), sans-serif;
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
          color: #6B6560;
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 13px;
          font-weight: 400;
          padding: 7px 16px;
          border: none;
          cursor: pointer;
          line-height: 1;
          transition: color 150ms ease;
        }

        .inactive-tab:hover {
          color: #1A1A1A;
        }

        .file-container-custom {
          overflow: visible !important;
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
          margin-bottom: 24px;
          border-radius: var(--radius-card);
          transition: background-color 1200ms ease;
          scroll-margin-top: 64px;
        }

        .section-highlight {
          background-color: var(--color-accent-subtle) !important;
          transition: background-color 1200ms ease !important;
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
            <button className="active-tab" onClick={() => router.push('/')}>
              ← Go back
            </button>
            <button className="inactive-tab" onClick={() => router.push('/')}>
              Work
            </button>
            <button className="inactive-tab" onClick={() => router.push('/')}>
              About
            </button>
            <button className="inactive-tab" onClick={() => router.push('/')}>
              Experience
            </button>
          </div>

          <FileContainer className="file-container-custom">
            <div className="case-study-layout">
              <CPKCIndexBox />

              <div className="article-content">
                {/* Headline Block */}
                <div style={{ marginBottom: '48px' }}>
                  <h1 style={{
                    fontFamily: 'var(--font-helvetica)',
                    fontSize: 'clamp(28px, 4.5vw, 52px)',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#000000',
                    marginBottom: '16px',
                  }}>
                    The youngest person in the room. Rarely the one without an answer.
                  </h1>
                  <p style={{
                    fontFamily: 'var(--font-fragment-mono)',
                    fontSize: '12px',
                    color: '#000000',
                    letterSpacing: '0.04em',
                  }}>
                    Enterprise Design &amp; AI · CPKC × Mitacs · 2025–26
                  </p>
                </div>

                {/* Mandate Paragraph */}
                <p style={{
                  fontFamily: 'var(--font-helvetica)',
                  fontWeight: 300,
                  fontSize: '18px',
                  lineHeight: 1.75,
                  color: '#000000',
                  marginBottom: '56px',
                }}>
                  CPKC is{' '}
                  <Highlighter action="highlight" color="#EAD9C2" isView={true}>
                    North America's only transborder freight railway
                  </Highlighter>
                  {', '}with 20,000 people, infrastructure spanning three countries, and billions in
                  annual freight. The CIO organization was navigating AI adoption without a
                  human-centered lens. I was brought in to build one.
                </p>

                {/* Stats Strip */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0',
                  borderTop: '0.5px solid var(--color-border)',
                  borderBottom: '0.5px solid var(--color-border)',
                  margin: '48px 0',
                }}>
                  {[
                    { value: '105+', label: 'CoP members' },
                    { value: 'CIO', label: 'Level adoption' },
                    { value: '4', label: 'Distinct outputs' },
                    { value: 'Mitacs', label: 'BSI Grant recipient' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '24px 0',
                        borderRight: i < 3 ? '0.5px solid var(--color-border)' : 'none',
                        paddingLeft: i === 0 ? '0' : '24px',
                      }}
                    >
                      <div style={{
                        fontFamily: 'var(--font-helvetica)',
                        fontSize: '28px',
                        fontWeight: 600,
                        color: '#000000',
                        letterSpacing: '-0.02em',
                        marginBottom: '4px',
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-fragment-mono)',
                        fontSize: '11px',
                        color: '#000000',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Context Section */}
                <div id="context" className="case-study-section">
                  <SectionLabel>context</SectionLabel>
                  <p style={{
                    fontFamily: 'var(--font-helvetica)',
                    fontWeight: 300,
                    fontSize: '16px',
                    lineHeight: 1.75,
                    color: '#000000',
                    margin: 0,
                  }}>
                    CPKC's IS organization runs the technology layer of a continental supply chain. The teams building internal tools think in systems, not in users. Design thinking, structured problem framing, human-centered research, iterative prototyping, had no formal presence. The Mitacs Business Strategy Internship created the mandate to change that. The title was Innovation Catalyst. The actual job was building design practice from zero inside an organization that had never had it.
                  </p>

                  {/* Confidentiality Callout */}
                  <div style={{
                    borderLeft: '3px solid #D3A122',
                    background: '#FAFAF9',
                    borderRadius: '0 8px 8px 0',
                    padding: '20px 24px',
                    marginTop: '32px',
                    marginBottom: '24px',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-helvetica)',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: '#000000',
                      fontStyle: 'italic',
                      margin: 0,
                    }}>
                      Most of what was built lives inside CPKC's internal systems, geolocation
                      tools, AI-native products, and operating frameworks designed for a 20,000-person
                      organization. They were never meant to be public. What I can share is how the
                      work was structured and what it changed.
                    </p>
                    <a
                      href="mailto:ahluwaliagovindsingh@gmail.com"
                      style={{
                        display: 'inline-block',
                        marginTop: '12px',
                        fontFamily: 'var(--font-fragment-mono)',
                        fontSize: '12px',
                        color: '#D3A122',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                      }}
                    >
                      I'm happy to walk through the specifics directly ↗
                    </a>
                  </div>
                </div>

                {/* The Room Section */}
                <div id="the-room" className="case-study-section">
                  <SectionLabel>the room</SectionLabel>
                  <p style={{
                    fontFamily: 'var(--font-helvetica)',
                    fontWeight: 300,
                    fontSize: '16px',
                    lineHeight: 1.75,
                    color: '#000000',
                    margin: 0,
                  }}>
                    The meetings I was in weren't design reviews. They were sessions where VPs and Directors were deciding how to frame problems, allocate resources, and assess risk, and I was there not to observe but to offer a different angle. Most people in those rooms had spent decades in logistics, engineering, and operations. I'd spent four years studying how to ask better questions. That turned out to be useful.
                  </p>

                  {/* Large Stat Counter */}
                  <div style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '40px', marginTop: '48px' }}>
                    <div style={{
                      fontFamily: 'var(--font-helvetica)',
                      fontSize: 'clamp(56px, 8vw, 96px)',
                      fontWeight: 600,
                      lineHeight: 1,
                      color: '#000000',
                      letterSpacing: '-0.03em',
                    }}>
                      <AnimatedCount target={105} suffix="+" />
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-helvetica)',
                      fontWeight: 300,
                      fontSize: '16px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '12px',
                      marginBottom: 0,
                    }}>
                      people across CPKC departments who didn't speak design, do now.
                    </p>
                  </div>
                </div>

                {/* The Work Section */}
                <div id="the-work" className="case-study-section">
                  <SectionLabel>the work</SectionLabel>
                  <p style={{
                    fontFamily: 'var(--font-helvetica)',
                    fontWeight: 300,
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '32px',
                    marginTop: 0,
                  }}>
                    Four outputs across methodology, tooling, product, and community. Each addressed a different layer of the same problem.
                  </p>

                  {/* Horizontal Phase Cards Stack */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {phases.map((phase, index) => (
                      <motion.div
                        key={phase.number}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '40px',
                          border: '0.5px solid var(--color-border)',
                          borderRadius: '12px',
                          padding: '28px 32px',
                          background: '#FFFFFF',
                        }}
                      >
                        {/* Left: SVG */}
                        <div style={{ width: '220px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img
                            src={phase.svg}
                            alt={phase.title}
                            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                          />
                        </div>

                        {/* Right: Content */}
                        <div style={{ flex: 1 }}>
                          <p style={{
                            fontFamily: 'var(--font-fragment-mono)',
                            fontSize: '11px',
                            color: '#D3A122',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginBottom: '4px',
                            marginTop: 0,
                          }}>
                            {phase.number} · {phase.label}
                          </p>
                          <h3 style={{
                            fontFamily: 'var(--font-helvetica)',
                            fontSize: '20px',
                            fontWeight: 500,
                            color: '#000000',
                            marginBottom: '12px',
                            marginTop: 0,
                          }}>
                            {phase.title}
                          </h3>
                          <p style={{
                            fontFamily: 'var(--font-helvetica)',
                            fontWeight: 300,
                            fontSize: '14px',
                            lineHeight: 1.75,
                            color: 'var(--color-text-secondary)',
                            margin: 0,
                          }}>
                            {phase.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Outcomes Section */}
                <div id="outcomes" className="case-study-section">
                  <SectionLabel>outcomes</SectionLabel>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    marginTop: '24px',
                  }}>
                    {outcomes.map((outcome, index) => (
                      <div key={index} style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '20px' }}>
                        <div style={{
                          fontFamily: 'var(--font-helvetica)',
                          fontSize: '36px',
                          fontWeight: 600,
                          color: '#000000',
                          letterSpacing: '-0.02em',
                          marginBottom: '8px',
                        }}>
                          {outcome.value}
                        </div>
                        <p style={{
                          fontFamily: 'var(--font-helvetica)',
                          fontWeight: 300,
                          fontSize: '13px',
                          lineHeight: 1.6,
                          color: 'var(--color-text-secondary)',
                          margin: 0,
                        }}>
                          {outcome.label}
                        </p>
                      </div>
                    ))}
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
