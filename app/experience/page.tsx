'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';

interface ExperienceItem {
  role: string;
  org: string;
  dates: string;
  link?: string;
  orgUrl?: string;
  description?: string;
}

const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    role: 'Researcher, Innovation Program',
    org: 'CPKC',
    dates: 'July 2025 – Present',
    link: '/projects/cpkc',
    orgUrl: 'https://www.cpkcr.com',
    description: 'Built the UX and interface for a market intelligence tool now in production, inside a cross-departmental group that reached 105 members.',
  },
  {
    role: 'Exhibition Director',
    org: 'OCAD University',
    dates: 'January 2026 – May 2026',
    link: '/projects/form',
    orgUrl: 'https://formgradex.vercel.app',
  },
  {
    role: 'Independent Researcher and Builder',
    org: 'Falcon',
    dates: 'May 2026',
    link: '/projects/falcon',
    orgUrl: 'https://falcondemo.vercel.app',
  },
  {
    role: 'Service Design Lead',
    org: 'Cadillac Fairview × OCAD',
    dates: 'September 2024 – January 2025',
    orgUrl: 'https://www.cadillacfairview.com',
  },
  {
    role: 'Design Research Intern',
    org: 'DesignWith Lab',
    dates: 'July 2024 – November 2024',
  },
  {
    role: 'Co-Design Student',
    org: 'OCAD CO',
    dates: 'January 2024 – April 2024',
    orgUrl: 'https://www.ocadu.co/',
  },
  {
    role: 'Experience Design Intern',
    org: 'Samdisha Bagga',
    dates: 'May 2024 – August 2024',
  },
  {
    role: 'Team Member',
    org: 'DesignX Community',
    dates: '2024 – Present',
    orgUrl: 'https://designx.community',
  },
];

const TOOLS_DATA = [
  { label: 'Design', items: 'Figma · Miro · Lottie' },
  { label: 'Build', items: 'React · Next.js · TypeScript · Tailwind · HTML/CSS' },
  { label: 'AI', items: 'Claude Code · Cursor · Kiro' },
];

export default function ExperiencePage() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleTabChange = (tab: string) => {
    if (tab === 'work') {
      router.push('/?tab=work');
    } else if (tab === 'all') {
      router.push('/');
    } else if (tab === 'about') {
      router.push('/about');
    }
  };

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

        .file-container-custom {
          overflow: visible !important;
          background: var(--color-surface) !important;
          border: 1px solid var(--color-border) !important;
          border-radius: 0 var(--radius-card) var(--radius-card) var(--radius-card) !important;
          box-shadow: var(--shadow-file) !important;
          padding: 32px;
        }

        .experience-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 24px;
          width: 100%;
        }

        .experience-heading {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 400;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .pdf-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 8px 14px;
          text-decoration: none;
          transition: border-color var(--transition-base), color var(--transition-base);
        }

        .pdf-button:hover {
          border-color: var(--color-text-primary);
          color: var(--color-text-primary);
        }

        .section-subheading {
          font-family: var(--font-display);
          font-size: var(--text-md);
          font-weight: 400;
          color: var(--color-text-primary);
          margin-top: 72px;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        .experience-rows-list {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .experience-row {
          padding: 20px 0;
          border-bottom: 1px solid var(--color-border);
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
        }

        .experience-row:last-child {
          border-bottom: none;
        }

        .experience-row.clickable {
          cursor: pointer;
        }

        .experience-row-main {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .experience-role {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .experience-org-dates {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-top: 2px;
        }

        .experience-org-link {
          color: inherit;
          font-size: inherit;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: var(--color-border);
          transition: color var(--transition-base), text-decoration-color var(--transition-base);
        }

        .experience-org-link:hover {
          color: var(--color-text-primary);
          text-decoration-color: currentColor;
        }

        .experience-chevron {
          font-family: var(--font-body);
          font-size: 20px;
          line-height: 1;
          color: var(--color-text-muted);
          margin-left: 24px;
          flex-shrink: 0;
          transition: transform 150ms ease, color 150ms ease;
          user-select: none;
        }

        .experience-row.clickable:hover .experience-role {
          color: var(--color-text-primary);
        }

        .experience-row.clickable:hover .experience-chevron {
          color: var(--color-text-primary);
          transform: translateX(2px);
        }

        /* 3.4 Tools Section */
        .tools-section {
          display: flex;
          flex-direction: column;
          row-gap: 16px;
          width: 100%;
        }

        .tools-row {
          display: grid;
          grid-template-columns: 120px 1fr;
          align-items: baseline;
          column-gap: 16px;
        }

        .tools-label {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-text-muted);
        }

        .tools-items {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--color-text-secondary);
        }

        @media (max-width: 767px) {
          .file-container-custom {
            padding: 16px !important;
          }
          .experience-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .experience-chevron {
            margin-left: 16px;
          }
          .tools-row {
            grid-template-columns: 1fr;
            row-gap: 4px;
          }
        }
      ` }} />

      <DesktopSurface className="desktop-surface-custom">
        <SiteHeader />

        <div className="folder-wrapper">
          <FileTabNav
            activeTab="experience"
            onTabChange={handleTabChange}
          />

          <FileContainer className="file-container-custom">
            {/* Page Header */}
            <div className="experience-header-row">
              <h1 className="experience-heading">Experience</h1>
            </div>

            {/* Section 1: Experience Rows */}
            <div className="experience-rows-list">
              {EXPERIENCE_ITEMS.map((item, idx) => {
                const hasLink = Boolean(item.link);

                const content = (
                  <>
                    <div className="experience-row-main">
                      <div className="experience-role">{item.role}</div>
                      <div className="experience-org-dates">
                        {item.orgUrl ? (
                          <a
                            href={item.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="experience-org-link"
                          >
                            {item.org}
                          </a>
                        ) : (
                          <span>{item.org}</span>
                        )}
                        {' · '}
                        <span>{item.dates}</span>
                      </div>
                    </div>

                    {hasLink && (
                      <span className="experience-chevron" aria-hidden="true">
                        ›
                      </span>
                    )}
                  </>
                );

                if (hasLink && item.link) {
                  return (
                    <div
                      key={`${item.org}-${item.role}`}
                      className="experience-row clickable"
                      onClick={() => router.push(item.link!)}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      role="link"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') router.push(item.link!);
                      }}
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <div
                    key={`${item.org}-${item.role}`}
                    className="experience-row"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            {/* Section 2: Tools Header */}
            <h2 className="section-subheading">Tools</h2>

            {/* Tools lead-in paragraph per §3.2 */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-secondary)',
                maxWidth: '620px',
                lineHeight: 1.6,
                margin: '0 0 28px 0',
              }}
            >
              This changes with the work. Lately it has mostly been AI-assisted coding, and this is the stack.
            </p>

            {/* Section 2: Tools List */}
            <div className="tools-section">
              {TOOLS_DATA.map((tool) => (
                <div key={tool.label} className="tools-row">
                  <div className="tools-label">{tool.label}</div>
                  {/* Exploring row value left empty to be filled in */}
                  <div className="tools-items">{tool.items}</div>
                </div>
              ))}
            </div>
          </FileContainer>
        </div>
      </DesktopSurface>
    </>
  );
}
