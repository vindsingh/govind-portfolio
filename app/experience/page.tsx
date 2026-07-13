'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';

interface ExperienceItem {
  year: string;
  org: string;
  role: string;
  summary: string;
  category: 'Strategy' | 'Design' | 'Research';
  link?: string;
  description: string;
}

const experience: ExperienceItem[] = [
  {
    year: '2025–2026',
    org: 'CPKC',
    role: 'Intern → Innovation Catalyst',
    summary: 'Embedding design practice inside a freight railway',
    category: 'Strategy',
    link: '/projects/cpkc',
    description: "Built CPKC's first Design Thinking Framework, adopted at the CIO level. Co-owned end-to-end UX for the company's first AI-native chatbot. Grew a cross-departmental Community of Practice to 105 members across the Information Services organization.",
  },
  {
    year: '2026',
    org: 'FOR/M',
    role: 'Exhibition Director',
    summary: 'Directing a public exhibition for 6,000 people',
    category: 'Design',
    link: '/projects/form',
    description: "Directed the Industrial Design graduating exhibition at OCAD University. Led a six-person committee across logistics, programming, and communications. Built the official exhibition website, coordinated a speaker series, and managed external sponsorships across a five-day public show reaching 6,000+ visitors.",
  },
  {
    year: '2025–2026',
    org: 'Falcon',
    role: 'Independent Researcher',
    summary: 'Building the translation layer for the venture conversation',
    category: 'Research',
    link: '/projects/falcon',
    description: "Eight months of graduate research identifying a language failure between investors and founders. Designed and built Falcon — a performance intelligence platform correlating financial data with product behavior signals. Presented through a live product demo and brand film.",
  },
  {
    year: '2024–2025',
    org: 'Cadillac Fairview × OCAD',
    role: 'Project Lead',
    summary: 'Branding and promotional strategy for Gather',
    category: 'Strategy',
    description: "Led branding and promotional strategy for Gather, a retail engagement platform concept across 255 Cadillac Fairview locations. Delivered a brand system and concept deck shortlisted for implementation consideration.",
  },
  {
    year: '2024',
    org: 'DesignWith Lab',
    role: 'Design Research Intern',
    summary: 'Conducting market and accessibility research for materials reuse',
    category: 'Research',
    description: "Conducted market and accessibility research guiding a web platform redesign. Work informed a zero-waste materials collection system achieving 90% material reuse and improving overall platform accessibility.",
  },
  {
    year: '2024',
    org: 'Samdisha Bagga',
    role: 'Experience Design Intern',
    summary: 'Streamlining fulfillment and content workflows for a fashion label',
    category: 'Design',
    description: "Streamlined order fulfillment processes and standardized digital content workflows for a fashion label, reducing delivery timelines by 20% and increasing engagement across platforms.",
  },
  {
    year: '2024–Now',
    org: 'DesignX Community',
    role: 'Team Member',
    summary: 'Contributing to a design leadership community and annual summit',
    category: 'Strategy',
    description: "Active contributor to a design leadership community. Participated in events, discussions, and the annual Design Leadership Summit connecting designers across disciplines around leadership and design strategy.",
  },
];

const toolsData = [
  { label: 'design', tags: ['Figma', 'Miro'] },
  { label: 'build', tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub', 'Vercel'] },
  { label: 'methods', tags: ['Design Thinking', 'Service Design', 'Systems Mapping', 'Workshop Facilitation'] },
  { label: 'ai', tags: ['Claude', 'Cursor'] }
];

export default function ExperiencePage() {
  const router = useRouter();
  const [hoveredOrg, setHoveredOrg] = useState<string | null>(null);
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<'All' | 'Strategy' | 'Design' | 'Research'>('All');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === 'work' || tab === 'all') {
      router.push('/');
    } else if (tab === 'about') {
      router.push('/about');
    }
  };

  const handleToggle = (org: string) => {
    setExpandedOrg(prev => prev === org ? null : org);
  };

  const filteredExperience = experience.filter(item => {
    if (activeTag === 'All') return true;
    return item.category === activeTag;
  });

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

        .experience-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
          width: 100%;
        }

        .experience-heading {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 500;
          color: #1A1A1A;
          margin: 0;
          line-height: 1;
        }

        .pdf-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-fragment-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6B6560;
          border: 1px solid #E8E4DF;
          border-radius: 6px;
          padding: 8px 14px;
          text-decoration: none;
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pdf-button:hover {
          border-color: #C8B89A;
          color: #1A1A1A;
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
              <a
                href="/GovindAhluwalia_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-button"
              >
                View Resume PDF →
              </a>
            </div>

            {/* Filter Pills Row */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {['All', 'Strategy', 'Design', 'Research'].map(tag => {
                const count = tag === 'All' ? experience.length : experience.filter(item => item.category === tag).length;
                const label = tag === 'All' ? `All (${count})` : tag;
                const isActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag as any)}
                    style={{
                      border: '0.5px solid #E8E4DF',
                      borderRadius: '99px',
                      padding: '4px 14px',
                      fontSize: '13px',
                      fontFamily: 'var(--font-helvetica-neue), sans-serif',
                      background: isActive ? '#000000' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#6B6560',
                      borderColor: isActive ? '#000000' : '#E8E4DF',
                      transition: 'all 200ms ease',
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Column Headers (Desktop only) */}
            {!isMobile && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr 120px 48px',
                padding: '12px 12px 12px 0',
                borderBottom: '1px solid #E8E4DF',
                marginTop: '12px',
              }}>
                <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '10px', textTransform: 'uppercase', color: '#A09890', letterSpacing: '0.12em' }}>ORGANISATION</div>
                <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '10px', textTransform: 'uppercase', color: '#A09890', letterSpacing: '0.12em' }}>SUMMARY</div>
                <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '10px', textTransform: 'uppercase', color: '#A09890', letterSpacing: '0.12em' }}>TAG</div>
                <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '10px', textTransform: 'uppercase', color: '#A09890', letterSpacing: '0.12em', textAlign: 'right' }}></div>
              </div>
            )}

            {/* Data Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {filteredExperience.map((item, i) => {
                const isHovered = hoveredOrg === item.org;
                const isExpanded = expandedOrg === item.org;
                return (
                  <motion.div
                    key={item.org}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
                    style={{
                      borderBottom: '0.5px solid #E8E4DF',
                      background: isHovered ? 'rgba(200, 184, 154, 0.06)' : 'transparent',
                      transition: 'background 200ms ease',
                      borderLeft: isHovered ? '3px solid #C8B89A' : 'none',
                      paddingLeft: isHovered ? '9px' : '12px',
                    }}
                    onMouseEnter={() => setHoveredOrg(item.org)}
                    onMouseLeave={() => setHoveredOrg(null)}
                  >
                    {/* The Row Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr 48px' : '180px 1fr 120px 48px',
                        padding: '18px 0',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleToggle(item.org)}
                    >
                      {isMobile ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif', fontSize: '14px', fontWeight: 'bold', color: '#1A1A1A' }}>
                            {item.org}
                          </div>
                          <div style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif', fontSize: '13px', color: '#6B6560' }}>
                            {item.summary}
                          </div>
                          <div style={{ marginTop: '4px' }}>
                            <span
                              style={{
                                fontFamily: 'var(--font-fragment-mono), monospace',
                                fontSize: '10px',
                                background: '#F9F7F5',
                                border: '0.5px solid #E8E4DF',
                                borderRadius: '4px',
                                padding: '1px 6px',
                                color: '#6B6560',
                              }}
                            >
                              {item.category}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Left: Org */}
                          <div
                            style={{
                              fontFamily: 'var(--font-helvetica-neue), sans-serif',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              color: '#1A1A1A',
                            }}
                          >
                            {item.org}
                          </div>

                          {/* Center: Summary */}
                          <div
                            style={{
                              fontFamily: 'var(--font-helvetica-neue), sans-serif',
                              fontSize: '13px',
                              color: '#6B6560',
                              paddingRight: '16px',
                            }}
                          >
                            {item.summary}
                          </div>

                          {/* Tag badge column */}
                          <div>
                            <span
                              style={{
                                fontFamily: 'var(--font-fragment-mono), monospace',
                                fontSize: '11px',
                                background: '#F9F7F5',
                                border: '0.5px solid #E8E4DF',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                color: '#6B6560',
                              }}
                            >
                              {item.category}
                            </span>
                          </div>
                        </>
                      )}

                      {/* Arrow column */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.link) {
                              router.push(item.link);
                            } else {
                              handleToggle(item.org);
                            }
                          }}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            border: '1px solid #E8E4DF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 200ms ease',
                            background: isHovered ? '#1A1A1A' : 'transparent',
                            color: isHovered ? '#FFFFFF' : '#1A1A1A',
                            cursor: 'pointer',
                          }}
                        >
                          <span style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '14px', fontWeight: 'bold' }}>
                            →
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Collapsible paragraph */}
                    <div
                      style={{
                        maxHeight: isExpanded ? '200px' : '0px',
                        transition: 'max-height 300ms ease',
                        overflow: 'hidden',
                      }}
                    >
                      <p
                        style={{
                          padding: '0 0 18px 0',
                          fontFamily: 'var(--font-helvetica-neue), sans-serif',
                          fontSize: '13px',
                          color: '#1A1A1A',
                          lineHeight: '1.65',
                          margin: 0,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Grants Section */}
            <div style={{ marginTop: '48px' }}>
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
                grants
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-helvetica-neue), sans-serif',
                  fontSize: '14px',
                  color: '#1A1A1A',
                }}
              >
                Mitacs Business Strategy Internship Grant — 2025–26
              </div>
            </div>

            {/* Tools Section */}
            <div style={{ marginTop: '48px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-fragment-mono), monospace',
                  fontSize: '12px',
                  fontWeight: 'normal',
                  color: '#A09890',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '20px',
                }}
              >
                tools
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {toolsData.map(row => (
                  <div
                    key={row.label}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
                      alignItems: 'start',
                      gap: isMobile ? '6px' : '16px',
                    }}
                  >
                    {/* Row Label (left, Fragment Mono muted) */}
                    <div
                      style={{
                        fontFamily: 'var(--font-fragment-mono), monospace',
                        fontSize: '12px',
                        color: '#A09890',
                        textTransform: 'lowercase',
                        paddingTop: '4px',
                      }}
                    >
                      {row.label}
                    </div>

                    {/* Row Pills (right) */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {row.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--font-fragment-mono), monospace',
                            fontSize: '11px',
                            background: '#F9F7F5',
                            border: '0.5px solid #E8E4DF',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            color: '#6B6560',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </FileContainer>
        </div>
      </DesktopSurface>
    </>
  );
}
