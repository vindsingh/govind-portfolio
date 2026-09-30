'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import TrainBand from '@/components/cpkc/TrainBand';
import SectionStack from '@/components/cpkc/SectionStack';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Highlighter } from '@/components/ui/Highlighter';

const ANCHORS = [
  { label: 'The tool',     id: 'people-use' },
  { label: 'The practice', id: 'persists' },
  { label: 'The method',   id: 'shows-shape' },
  { label: 'The ground',   id: 'underneath' },
] as const;

const HEADER_H = 104;

interface CPKCIndexBoxProps {
  activeId: string | null;
  onAnchorClick: (id: string) => void;
}

function CPKCIndexBox({ activeId, onAnchorClick }: CPKCIndexBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const naturalHeightRef = useRef<number>(0);
  const [showMetadata, setShowMetadata] = useState(true);

  useEffect(() => {
    const checkHeight = () => {
      const availableHeight = window.innerHeight - HEADER_H - 200 - 24;
      if (containerRef.current && showMetadata) {
        naturalHeightRef.current = Math.max(naturalHeightRef.current, containerRef.current.scrollHeight);
      }
      const naturalHeight = naturalHeightRef.current || 270;
      setShowMetadata(naturalHeight <= availableHeight);
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [showMetadata]);

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
          max-height: calc(100vh - ${HEADER_H}px - 200px - 24px);
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

      <div ref={containerRef} className="index-box-container">
        <div className="index-box-anchors">
          {ANCHORS.map((anchor) => (
            <button
              key={anchor.id}
              onClick={() => onAnchorClick(anchor.id)}
              className={`index-box-anchor ${activeId === anchor.id ? 'active' : ''}`}
            >
              <span className="anchor-label">{anchor.label}</span>
            </button>
          ))}
        </div>

        {showMetadata && (
          <div style={{ marginTop: '24px' }}>
            <div className="sidebar-metadata">
              {/* ROLE */}
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
                  Researcher, Innovation Program
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  marginTop: '2px',
                  fontWeight: 500,
                  lineHeight: '1.4',
                }}>
                  <a
                    href="https://www.mitacs.ca/our-projects/democratize-human-centered-design-to-accelerate-innovation-at-canadian-pacific-rail/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'inherit',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                      textDecorationColor: 'var(--color-border)',
                      transition: 'color var(--transition-base), text-decoration-color var(--transition-base)',
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
                    Mitacs Business Strategy Internship
                  </a>
                </div>
              </div>

              {/* TIMELINE */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-muted)',
                }}>
                  TIMELINE
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-primary)',
                  marginTop: '2px',
                  fontWeight: 500,
                  lineHeight: '1.4',
                }}>
                  July 2025 - Present
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function CPKCCaseStudy() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionStackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeRailId, setActiveRailId] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // SPRINT 8 §1: Rail scroll-spy via IntersectionObserver over the four sections
  useEffect(() => {
    const sectionIds = ['people-use', 'persists', 'shows-shape', 'underneath'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Clear active state if hero is in view
        if (heroRef.current) {
          const heroRect = heroRef.current.getBoundingClientRect();
          if (heroRect.bottom > 100) {
            setActiveRailId(null);
            return;
          }
        }

        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveRailId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        if (heroRect.bottom > 100) {
          setActiveRailId(null);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Rail anchor click handler
  const handleAnchorClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .desktop-surface-custom {
          min-height: 100vh !important;
          background: var(--color-bg) !important;
          font-family: var(--font-body), sans-serif !important;
          overflow-x: clip !important;
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
          padding: 0 !important;
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
          min-width: 0;
        }

        @media (max-width: 767px) {
          .case-study-layout {
            flex-direction: column !important;
            padding: 16px !important;
          }
          .index-box-container {
            position: static !important;
            width: 100% !important;
            margin: 0 0 24px 0 !important;
          }
          .article-content {
            width: 100% !important;
            max-width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
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
              <CPKCIndexBox
                activeId={activeRailId}
                onAnchorClick={handleAnchorClick}
              />

              <div
                className="article-content"
                style={{
                  paddingBottom: isMobile ? '140px' : '200px',
                }}
              >
                {/* 1.2 Hero */}
                <div
                  ref={heroRef}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '40px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    maxWidth: 600,
                    color: 'var(--color-text-primary)',
                    margin: '0 0 24px',
                  }}>
                    Building a human-centred practice inside a freight railway.
                  </h1>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    lineHeight: 1.5,
                    maxWidth: 560,
                    color: 'var(--color-text-secondary)',
                    margin: '0 0 16px',
                  }}>
                    I joined CPKC in July 2025 with a brief to democratize design at a twenty-thousand-person freight company that had no designers.
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    lineHeight: 1.5,
                    maxWidth: 560,
                    color: 'var(--color-text-secondary)',
                    margin: '0 0 24px',
                  }}>
                    We work alongside change management and business transformation, the teams already responsible for how work gets done. What was missing was anyone asking how it felt to use.
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-primary)',
                    margin: '0 0 24px',
                    lineHeight: 1.5,
                    maxWidth: 560,
                  }}>
                    Four kinds of work came out of it. A tool, a practice, a method, and the ground they all stand on.
                  </p>

                  {/* 1.3 Confidentiality note */}
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    lineHeight: 1.5,
                    color: 'var(--color-text-primary)',
                    margin: '0 0 16px',
                    maxWidth: 560,
                  }}>
                    <Highlighter action="underline" color="#1A1A1A" strokeWidth={1.5} isView>
                      Most of this work is confidential, but{' '}
                      <a
                        href="mailto:ahluwaliagovindsingh@gmail.com"
                        style={{
                          textDecoration: 'none',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                          transition: 'color var(--transition-base)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--color-accent-cpkc)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--color-text-primary)';
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
                          textDecoration: 'none',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                          transition: 'color var(--transition-base)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--color-accent-cpkc)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--color-text-primary)';
                        }}
                      >
                        LinkedIn
                      </a>{' '}
                      if you want to talk through any of it.
                    </Highlighter>
                  </p>
                </div>

                {/* 1.5 Section Stack */}
                <SectionStack activeId={activeRailId} />
              </div>
            </div>

            {/* The sticky track band pinned to the bottom of the viewport while container is in view */}
            <TrainBand heroRef={heroRef} isMobile={isMobile} />
          </FileContainer>
        </div>
      </DesktopSurface>
    </>
  );
}
