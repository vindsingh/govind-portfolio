'use client';

import { useState, useEffect } from 'react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

const ANCHORS = [
  { label: 'My role', id: 'my-role' },
  { label: 'The problem', id: 'the-problem' },
  { label: 'Key decision', id: 'key-decision' },
  { label: 'Execution', id: 'execution' },
  { label: 'Impact', id: 'impact' },
  { label: 'Reflection', id: 'reflection' },
];

const METADATA = [
  { label: 'ROLE', value: 'Exhibition Director' },
  { label: 'CATEGORY', value: 'Exhibition Design & Strategy' },
  { label: 'INDUSTRY', value: 'Design Education' },
  { label: 'YEAR', value: '2026' },
  { label: 'TEAM', value: '6 people' },
];

export default function IndexBox() {
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
            {METADATA.map((item) => (
              <div key={item.label}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-muted)',
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-primary)',
                  marginTop: '2px',
                  fontWeight: 500,
                  lineHeight: '1.4',
                }}>
                  {item.value}
                </div>
              </div>
            ))}

            {/* LINKS secondary block */}
            {/* Action Buttons restored per §5.1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
              <InteractiveHoverButton
                href="https://formgradex.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                Visit website
              </InteractiveHoverButton>

              <InteractiveHoverButton
                href="https://www.instagram.com/ocadu.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                Instagram
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
