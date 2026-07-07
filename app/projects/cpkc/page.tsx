'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import IndexBox from '@/components/IndexBox'; // Required import statement
import CPKCTimeline from '@/components/CPKCTimeline';
import RequestModal from '@/components/RequestModal';

const ANCHORS = [
  { label: 'MY ROLE', id: 'my-role' },
  { label: 'THE PROBLEM', id: 'the-problem' },
  { label: 'THE WORK', id: 'the-work' },
  { label: 'IMPACT', id: 'impact' },
  { label: 'REFLECTION', id: 'reflection' },
] as const;

const METADATA = [
  { label: 'ROLE', value: 'Innovation Catalyst' },
  { label: 'CATEGORY', value: 'Enterprise Design' },
  { label: 'INDUSTRY', value: 'Freight Rail' },
  { label: 'YEAR', value: '2025' },
  { label: 'TEAM', value: 'Mitacs BSI' },
] as const;

function CPKCIndexBox({ onRequestClick }: { onRequestClick: () => void }) {
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
          border-left-color: var(--color-accent);
        }

        .index-box-divider {
          margin: 16px 0;
          border: none;
          border-top: 1px solid var(--color-border);
        }

        .index-box-meta-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .index-box-meta-item {
          display: flex;
          flex-direction: column;
        }

        .index-box-meta-label {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          color: var(--color-text-muted);
          letter-spacing: 0.06em;
          display: block;
          margin-bottom: 2px;
        }

        .index-box-meta-value {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-primary);
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
          maxHeight: isCollapsed ? '0px' : '400px',
          opacity: isCollapsed ? 0 : 1,
          marginTop: isCollapsed ? '0px' : '16px',
          transition: 'max-height 400ms ease, opacity 300ms ease, margin-top 300ms ease'
        }}>
          <hr className="index-box-divider" />

          <div className="index-box-meta-block">
            {METADATA.map((item) => (
              <div key={item.label} className="index-box-meta-item">
                <span className="index-box-meta-label">{item.label}</span>
                <span className="index-box-meta-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onRequestClick}
          style={{
            display: 'block',
            width: '100%',
            marginTop: '20px',
            border: '1px solid var(--color-border-strong)',
            borderRadius: '6px',
            padding: '8px 14px',
            fontFamily: 'var(--font-helvetica-neue), sans-serif',
            fontSize: '12px',
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            background: 'none',
            cursor: 'pointer',
            transition: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Request case study
        </button>
      </div>
    </>
  );
}

export default function CPKCCaseStudy() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        .mandate-label {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          color: var(--color-text-muted);
          letter-spacing: 0.06em;
          display: block;
          margin-bottom: 12px;
        }

        .mandate-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 28px;
        }

        .mandate-left {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 16px;
          line-height: 1.65;
          color: var(--color-text-primary);
        }

        .mandate-right {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 16px;
          line-height: 1.65;
          color: var(--color-text-primary);
        }

        .results-block {
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: 32px 0;
          margin-bottom: 28px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .stat-number {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: clamp(28px, 3vw, 36px);
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .stat-label {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          color: var(--color-text-muted);
          letter-spacing: 0.06em;
          max-width: 120px;
          line-height: 1.4;
          margin-top: 4px;
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

        .section-heading {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--color-text-primary);
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 8px;
          margin-top: 24px;
          margin-bottom: 20px;
          letter-spacing: 0.06em;
        }

        .section-body {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 16px;
          line-height: 1.7;
          color: var(--color-text-primary);
          max-width: 640px;
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

          .mandate-cols {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          .results-block {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
      ` }} />

      <DesktopSurface className="desktop-surface-custom">
        <SiteHeader />

        <div className="folder-wrapper">
          {/* Tab row (inline) */}
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

          {/* FileContainer */}
          <FileContainer className="file-container-custom">
            <div className="case-study-layout">
              {/* Sidebar IndexBox for CPKC */}
              <CPKCIndexBox onRequestClick={() => setIsModalOpen(true)} />

              <div className="article-content">
                {/* Hero / Logotype */}
                <div style={{ marginBottom: '32px' }}>
                  <h1
                    style={{
                      fontFamily: 'var(--font-helvetica-neue), sans-serif',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      margin: 0,
                      lineHeight: '1.1',
                    }}
                  >
                    CPKC
                  </h1>
                </div>

                {/* Mandate Block */}
                <div className="mandate-block">
                  <span className="mandate-label">MANDATE</span>
                  <div className="mandate-cols">
                    <div className="mandate-left">
                      CPKC is one of the only freight railroads spanning the full length of North America, from Canada to Mexico, a network built on physical infrastructure, operational precision, and a workforce built around it. The Innovation Catalyst role existed to introduce a different kind of precision: the capacity to frame problems correctly before committing to solutions.
                    </div>
                    <div className="mandate-right">
                      The engagement ran as a Mitacs Business Strategy Internship, a research-industry partnership embedded inside the CIO's organization. The brief wasn't to ship a product. It was to build the organizational conditions that make better products possible.
                    </div>
                  </div>
                </div>

                {/* Results / Stats Block */}
                <div className="results-block">
                  <div className="stat-item">
                    <div className="stat-number">105+</div>
                    <div className="stat-label">COMMUNITY OF PRACTICE MEMBERS</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">4</div>
                    <div className="stat-label">PRACTICE AREAS</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">1</div>
                    <div className="stat-label">FRAMEWORK ADOPTED BY CIO</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">1</div>
                    <div className="stat-label">AI-NATIVE CHATBOT SHIPPED</div>
                  </div>
                </div>

                {/* Sections */}
                <div id="my-role" className="case-study-section">
                  <h2 className="section-heading">MY ROLE</h2>
                  <p className="section-body">
                    I came in as Innovation Catalyst, a role without precedent at CPKC. Not a consultant, not a product designer. The work was upstream: before any tool gets built, someone has to ask whether it's solving the right problem. I worked across the CIO's organization to introduce design thinking as a shared methodology, build a toolkit that made AI concepts legible across technical and non-technical teams, and grow the internal network that keeps that work alive after the engagement ends.
                  </p>
                </div>

                <div id="the-problem" className="case-study-section">
                  <h2 className="section-heading">THE PROBLEM</h2>
                  <p className="section-body">
                    CPKC operates at a scale where a bad decision propagates across thousands of people and thousands of kilometers of track. When AI tools started entering the enterprise, there was no shared language for evaluating them, no way for teams without design or technical backgrounds to ask the right questions, push back, or identify where a tool's assumptions didn't match their own operational reality. The risk wasn't adoption resistance. It was adoption without judgment.
                  </p>
                </div>

                <div id="the-work" className="case-study-section">
                  <h2 className="section-heading">THE WORK</h2>
                  <p className="section-body">
                    The engagement produced four distinct outputs across methodology, tooling, product, and community. Each addressed a different layer of the same problem: making design thinking operational inside an organization that had never had it.
                  </p>
                  <CPKCTimeline />
                </div>

                <div id="impact" className="case-study-section">
                  <h2 className="section-heading">IMPACT</h2>
                  <p className="section-body">
                    The design thinking framework was adopted by the CIO and integrated into CPKC's standard project methodology. The Community of Practice reached 105 members across departments, a network that outlasts the engagement. The Market Intelligence chatbot shipped as CPKC's first AI-native internal product. The AI Cards toolkit remains in active use for evaluating new AI deployments.
                  </p>
                  <p className="section-body" style={{ marginTop: '20px' }}>
                    Multiple stakeholders cited the framework as what changed how their teams approach a problem before they start solving it.
                  </p>
                </div>

                <div id="reflection" className="case-study-section">
                  <h2 className="section-heading">REFLECTION</h2>
                  <p className="section-body">
                    Enterprise design at scale isn't about the artifact. The framework, the toolkit, the chatbot: those are evidence of a more durable output: an organization that knows how to ask the right questions before it starts building. Working upstream inside CPKC meant operating in the gap between "we have a technology" and "we know what this technology is for." That gap is where the most consequential design work happens, and it rarely shows up in a portfolio.
                  </p>
                </div>
              </div>
            </div>
          </FileContainer>
        </div>
      </DesktopSurface>

      {/* Request Case Study Modal */}
      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectName="CPKC"
        context="This project ran as a Mitacs Business Strategy Internship inside CPKC's CIO organization. Detailed artifacts and outputs are available on request."
        email="govind@ahluwaliagovind.com"
      />
    </>
  );
}
