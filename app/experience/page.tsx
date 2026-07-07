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
  type: string;
  hasArrow: boolean;
  description: string;
}

const experience: ExperienceItem[] = [
  {
    year: '2025–2026',
    org: 'CPKC',
    role: 'Intern → Innovation Catalyst',
    type: 'Enterprise Design & AI',
    hasArrow: true,
    description: "Built CPKC's first Design Thinking Framework, adopted at the CIO level. Co-owned end-to-end UX for the company's first AI-native chatbot. Grew a cross-departmental Community of Practice to 105 members across the Information Services organization.",
  },
  {
    year: '2026',
    org: 'FOR/M',
    role: 'Exhibition Director',
    type: 'Design & Strategy',
    hasArrow: false,
    description: "Directed the Industrial Design graduating exhibition at OCAD University. Led a six-person committee across logistics, programming, and communications. Built the official exhibition website, coordinated a speaker series, and managed external sponsorships across a five-day public show reaching 6,000+ visitors.",
  },
  {
    year: '2025–2026',
    org: 'Falcon',
    role: 'Independent Researcher',
    type: 'Performance Intelligence',
    hasArrow: false,
    description: "Eight months of graduate research identifying a language failure between investors and founders. Designed and built Falcon — a performance intelligence platform correlating financial data with product behavior signals. Presented through a live product demo and brand film.",
  },
  {
    year: '2024–2025',
    org: 'Cadillac Fairview × OCAD',
    role: 'Project Lead',
    type: 'Brand Strategy',
    hasArrow: false,
    description: "Led branding and promotional strategy for Gather, a retail engagement platform concept across 255 Cadillac Fairview locations. Delivered a brand system and concept deck shortlisted for implementation consideration.",
  },
  {
    year: '2024',
    org: 'DesignWith Lab',
    role: 'Design Research Intern',
    type: 'Accessibility & Research',
    hasArrow: false,
    description: "Conducted market and accessibility research guiding a web platform redesign. Work informed a zero-waste materials collection system achieving 90% material reuse and improving overall platform accessibility.",
  },
  {
    year: '2024',
    org: 'Samdisha Bagga',
    role: 'Experience Design Intern',
    type: 'Content & Operations',
    hasArrow: false,
    description: "Streamlined order fulfillment processes and standardized digital content workflows for a fashion label, reducing delivery timelines by 20% and increasing engagement across platforms.",
  },
  {
    year: '2024–Now',
    org: 'DesignX Community',
    role: 'Team Member',
    type: 'Design Leadership',
    hasArrow: false,
    description: "Active contributor to a design leadership community. Participated in events, discussions, and the annual Design Leadership Summit connecting designers across disciplines around leadership and design strategy.",
  },
];

const skills = [
  'Figma',
  'Framer Motion',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'SharePoint',
  'Miro',
  'Notion',
  'Design Systems',
  'Service Design',
  'Facilitation',
  'Research Synthesis',
];

export default function ExperiencePage() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleTabChange = (tab: string) => {
    if (tab === 'work' || tab === 'all') {
      router.push('/');
    } else if (tab === 'about') {
      router.push('/about');
    }
  };

  const handleToggle = (index: number) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
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

        .column-headers-row {
          display: grid;
          grid-template-columns: 120px 1fr 1fr 180px;
          padding: 12px 12px;
          border-bottom: 1px solid #1A1A1A;
          margin-top: 12px;
        }

        .column-header {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          color: #A09890;
          letter-spacing: 0.12em;
        }

        .experience-rows-container {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .experience-row {
          display: grid;
          grid-template-columns: 120px 1fr 1fr 180px;
          padding: 18px 40px 18px 0;
          cursor: pointer;
          position: relative;
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .education-section {
          margin-top: 48px;
          padding-top: 40px;
          border-top: 1px solid #1A1A1A;
          display: flex;
          flex-direction: column;
        }

        .education-heading {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          color: #A09890;
          letter-spacing: 0.12em;
          margin-bottom: 24px;
        }

        .education-item {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .education-item:last-child {
          margin-bottom: 0;
        }

        .education-org {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #1A1A1A;
          margin: 0;
        }

        .education-detail {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 13px;
          color: #6B6560;
          margin: 2px 0 0 0;
        }

        .education-year {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 12px;
          color: #A09890;
          margin: 4px 0 0 0;
        }

        .skills-section {
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid #1A1A1A;
          display: flex;
          flex-direction: column;
        }

        .skills-label {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          color: #A09890;
          margin-bottom: 16px;
          letter-spacing: 0.12em;
        }

        .skills-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-pill {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 11px;
          color: #6B6560;
          border: 1px solid #E8E4DF;
          border-radius: 4px;
          padding: 4px 10px;
          white-space: nowrap;
        }

        @media (max-width: 767px) {
          .column-headers-row {
            display: none;
          }
          .experience-row {
            grid-template-columns: 1fr !important;
            gap: 8px;
            padding: 16px 40px 16px 12px !important;
          }
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

            {/* Column Headers */}
            <div className="column-headers-row">
              <div className="column-header">YEAR</div>
              <div className="column-header">ORGANISATION</div>
              <div className="column-header">ROLE</div>
              <div className="column-header">TYPE</div>
            </div>

            {/* Data Rows */}
            <div className="experience-rows-container">
              {experience.map((item, i) => {
                const isHovered = hoveredIndex === i;
                const isExpanded = expandedIndex === i;
                return (
                  <motion.div
                    key={item.org}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
                    style={{
                      borderLeft: isHovered ? '3px solid #C8B89A' : 'none',
                      paddingLeft: isHovered ? '9px' : '12px',
                      background: isHovered ? 'rgba(200, 184, 154, 0.06)' : 'transparent',
                      borderBottom: isExpanded ? 'none' : '1px solid #1A1A1A',
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* The Row Grid */}
                    <div
                      className="experience-row"
                      onClick={() => handleToggle(i)}
                    >
                      {/* Cell 1 — Year */}
                      <div
                        style={{
                          fontFamily: 'var(--font-fragment-mono), monospace',
                          fontSize: '13px',
                          color: '#6B6560',
                        }}
                      >
                        {item.year}
                      </div>

                      {/* Cell 2 — Organisation */}
                      <div
                        style={{
                          fontFamily: 'var(--font-helvetica-neue), sans-serif',
                          fontSize: '15px',
                          fontWeight: 500,
                          color: '#1A1A1A',
                        }}
                      >
                        {item.org}
                      </div>

                      {/* Cell 3 — Role */}
                      <div
                        style={{
                          fontFamily: 'var(--font-helvetica-neue), sans-serif',
                          fontSize: '15px',
                          fontWeight: 400,
                          color: '#1A1A1A',
                        }}
                      >
                        {item.hasArrow ? (
                          <>
                            <span>Intern</span>
                            <span style={{ color: '#C8B89A', margin: '0 6px', fontFamily: 'var(--font-fragment-mono), monospace' }}>→</span>
                            <span>Innovation Catalyst</span>
                          </>
                        ) : (
                          item.role
                        )}
                      </div>

                      {/* Cell 4 — Type */}
                      <div
                        style={{
                          fontFamily: 'var(--font-fragment-mono), monospace',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: isHovered ? '#6B6560' : '#A09890',
                          transition: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {item.type}
                      </div>

                      {/* Toggle Indicator */}
                      <div
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontFamily: 'var(--font-fragment-mono), monospace',
                          fontSize: '12px',
                          color: '#1A1A1A',
                          cursor: 'pointer',
                          userSelect: 'none',
                        }}
                      >
                        {isExpanded ? '−' : '+'}
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
                          padding: '12px 0 16px 0',
                          borderBottom: '1px solid #1A1A1A',
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

            {/* Education Block */}
            <div className="education-section">
              <div className="education-heading">EDUCATION</div>

              {/* Item 1 */}
              <div className="education-item">
                <h3 className="education-org">OCAD University</h3>
                <p className="education-detail">Honours Bachelor of Design with Distinction · Industrial Design</p>
                <span className="education-year">2026</span>
              </div>

              {/* Item 2 */}
              <div className="education-item">
                <h3 className="education-org">University of Toronto</h3>
                <p className="education-detail">Inclusive Design Specialization · Gender Analytics</p>
                <span className="education-year">2024</span>
              </div>
            </div>

            {/* Skills Footer */}
            <div className="skills-section">
              <div className="skills-label">TOOLS &amp; SKILLS</div>
              <div className="skills-pills-row">
                {skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </FileContainer>
        </div>
      </DesktopSurface>
    </>
  );
}
