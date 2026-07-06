'use client';

import { useRef, useState, useEffect } from 'react';

const ANCHORS = [
  { label: 'MY ROLE', id: 'my-role' },
  { label: 'THE PROBLEM', id: 'the-problem' },
  { label: 'KEY DECISION', id: 'key-decision' },
  { label: 'EXECUTION', id: 'execution' },
  { label: 'IMPACT', id: 'impact' },
  { label: 'REFLECTION', id: 'reflection' },
];

const METADATA = [
  { label: 'Role', value: 'Exhibition Director' },
  { label: 'Category', value: 'Exhibition Design & Strategy' },
  { label: 'Industry', value: 'Design Education' },
  { label: 'Year', value: '2026' },
  { label: 'Team', value: '6 people' },
];

export default function IndexBox() {
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

  return (
    <>
      {/* Component Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .index-box-container {
          width: 220px;
          position: sticky;
          top: 32px;
          align-self: flex-start;
          border: 1px solid #E8E4DF;
          border-radius: 12px;
          padding: 20px;
          background: #FFFFFF;
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
          color: #A09890;
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
          color: #1A1A1A;
          border-left-color: #C8B89A;
        }

        .index-box-divider {
          margin: 16px 0;
          border: none;
          border-top: 1px solid #E8E4DF;
        }

        .index-box-meta-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .index-box-meta-label {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          color: #A09890;
          letter-spacing: 0.06em;
          display: block;
          margin-bottom: 2px;
        }

        .index-box-meta-value {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #1A1A1A;
        }

        .section-highlight {
          background-color: #F0EBE4 !important;
          transition: background-color 1200ms ease !important;
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
              className="index-box-anchor"
            >
              {anchor.label}
            </button>
          ))}
        </div>

        {/* Collapsible div */}
        <div style={{
          overflow: 'hidden',
          maxHeight: isCollapsed ? '0px' : '400px',
          opacity: isCollapsed ? 0 : 1,
          marginTop: isCollapsed ? '0px' : '16px',
          transition: 'max-height 400ms ease, opacity 300ms ease, margin-top 300ms ease'
        }}>
          {/* Divider */}
          <hr className="index-box-divider" />

          {/* Metadata block */}
          <div className="index-box-meta-block">
            {METADATA.map((item) => (
              <div key={item.label}>
                <span className="index-box-meta-label">{item.label}</span>
                <span className="index-box-meta-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visit website button */}
        <a
          href="https://formgradex.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            marginTop: '20px',
            border: '1px solid var(--color-border-strong)',
            borderRadius: '6px',
            padding: '8px 14px',
            fontFamily: 'var(--font-helvetica-neue)',
            fontSize: '12px',
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            textDecoration: 'none',
            transition: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
        >
          Visit website ↗
        </a>
      </div>
    </>
  );
}
