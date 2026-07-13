'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import IndexBox from '@/components/IndexBox';
import Lottie from 'lottie-react';
import formAnimation from '../../../public/projects/form/form-animation.json';
import Image from 'next/image';
import FloorPlan from '@/components/FloorPlan';
import FlipCard from '@/components/FlipCard';
import { motion } from 'framer-motion';
import { Highlighter } from '@/components/ui/Highlighter';
import VideoPlayer from '@/components/VideoPlayer';
import FootprintChart from '@/components/FootprintChart';

const stats = [
  { value: 6000, display: '6,000+', suffix: '', label: 'VISITORS OVER 5 DAYS' },
  { value: 205,  display: '205',    suffix: 'K',  label: 'INSTAGRAM VIEWS'     },
  { value: 14,   display: '14',     suffix: '',   label: 'STUDENT-LED FOR/TALKS'},
  { value: 3,    display: '3',      suffix: '',   label: 'CURATORIAL ZONES'     },
];

const zonesData = [
  {
    id: 'for-body',
    label: 'for/body',
    scale: 'The Intimate Scale',
    count: '16',
    text: 'Work that touches skin, supports movement, restores ability, and extends what the body can do.',
    svg: '/projects/form/forbodycard.svg',
  },
  {
    id: 'for-space',
    label: 'for/space',
    scale: 'The Contextual Scale',
    count: '13',
    text: 'Work that shapes the rooms, objects, and environments we move through every day.',
    svg: '/projects/form/forspacecard.svg',
  },
  {
    id: 'for-system',
    label: 'for/system',
    scale: 'The Macro Scale',
    count: '21',
    text: 'Work that questions how things are built and reimagines the structures that organise everyday life.',
    svg: '/projects/form/forsystemcard.svg',
  },
];

export default function FormCaseStudy() {
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, i) => {
            const duration = 1200;
            const steps = 40;
            const increment = stat.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounts(prev => {
                const next = [...prev];
                next[i] = Math.floor(current);
                return next;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (resultsRef.current) observer.observe(resultsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

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

        /* 1. Page Header Block */
        .page-header-block {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }

        .page-header-subtitle {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 14px;
          font-style: italic;
          color: #6B6560;
          margin-top: 8px;
          margin-bottom: 32px;
        }

        /* 2. Lottie Block */
        .lottie-animation-block {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 32px;
          background: #F0EDEA;
        }

        /* 3. Mandate Block */
        .mandate-label {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          color: #A09890;
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
          color: #1A1A1A;
        }

        .mandate-right {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 16px;
          line-height: 1.65;
          color: #1A1A1A;
        }

        /* 4. Results Block */
        .results-block {
          border-top: 1px solid #E8E4DF;
          border-bottom: 1px solid #E8E4DF;
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
          color: #1A1A1A;
        }

        .stat-label {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          color: #A09890;
          letter-spacing: 0.06em;
          max-width: 120px;
          line-height: 1.4;
          margin-top: 4px;
        }

        /* 5. Photo Block 1 */
        .photo-block-1 {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 28px;
        }

        /* 6. Role Block */
        .role-block {
          margin-bottom: 28px;
        }

        .role-title {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 20px;
          font-weight: 500;
          color: #1A1A1A;
          margin-bottom: 16px;
        }

        .role-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .role-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .role-category {
          display: flex;
          flex-direction: column;
        }

        .role-cat-header {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          color: #1A1A1A;
          letter-spacing: 0.06em;
          display: block;
          margin-bottom: 6px;
        }

        .role-cat-item {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 13px;
          color: #6B6560;
          line-height: 1.6;
        }

        .role-right {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 16px;
          line-height: 1.65;
          color: #1A1A1A;
        }

        /* 7. Content Sections */
        .case-study-section {
          padding: 24px;
          margin-left: -24px;
          margin-right: -24px;
          margin-bottom: 14px;
          border-radius: 12px;
          transition: background-color 1200ms ease;
          scroll-margin-top: 64px;
        }

        .section-heading {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 18px;
          font-weight: 500;
          color: #1A1A1A;
          border-bottom: 1px solid #E8E4DF;
          padding-bottom: 8px;
          margin-top: 24px;
          margin-bottom: 20px;
        }

        .section-body {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 16px;
          line-height: 1.7;
          color: #1A1A1A;
          max-width: 640px;
        }

        /* Zone Cards */
        .zone-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin: 24px 0 32px;
        }

        .zone-card {
          border: 1px solid #E8E4DF;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #FFFFFF;
        }

        .zone-card-image {
          height: 28px;
          display: flex;
          align-items: center;
        }

        .zone-card-label {
          font-family: var(--font-fragment-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          color: #A09890;
          letter-spacing: 0.06em;
        }

        .zone-card-name {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #1A1A1A;
        }

        .zone-card-desc {
          font-family: var(--font-helvetica-neue), sans-serif;
          font-size: 13px;
          color: #6B6560;
          line-height: 1.5;
        }

        /* Photo Block 2 */
        .photo-block-2 {
          position: relative;
          width: 100%;
          height: 360px;
          border-radius: 12px;
          overflow: hidden;
          margin: 24px 0 48px;
        }

        .section-highlight {
          background-color: #F0EBE4 !important;
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

          .role-cols {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          .zone-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .footprint-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
          margin-top: 24px;
        }

        @media (max-width: 640px) {
          .footprint-grid {
            grid-template-columns: 1fr !important;
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
              <IndexBox />

              <div className="article-content">
                {/* Headline Block */}
                <div style={{ marginBottom: '48px' }}>
                  <h1 style={{
                    fontFamily: 'var(--font-helvetica-neue), sans-serif',
                    fontSize: 'clamp(32px, 5vw, 56px)',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    marginBottom: '16px',
                    color: '#000000',
                  }}>
                    Graduating means going public.
                  </h1>
                  <p style={{
                    fontFamily: 'var(--font-fragment-mono), monospace',
                    fontSize: '12px',
                    color: '#000000',
                    letterSpacing: '0.04em',
                    margin: 0,
                  }}>
                    — The shape of a thing is inseparable from the reason it was made.
                  </p>
                </div>

                {/* Lottie animation block */}
                <div style={{ marginBottom: '32px' }}>
                  <Lottie animationData={formAnimation} loop={true} />
                </div>

                {/* 3. Mandate block */}
                <div className="mandate-block" style={{ marginBottom: '40px' }}>
                  <span className="mandate-label" style={{ color: '#000000' }}>MANDATE</span>
                  <p style={{
                    fontFamily: 'var(--font-helvetica-neue), sans-serif',
                    fontWeight: 300,
                    fontSize: '18px',
                    lineHeight: '1.7',
                    color: '#000000',
                    margin: 0,
                  }}>
                    Fifty industrial designers were graduating. The question wasn't what to show. Four years of work already answered that. The question was how to give it a public moment that meant something to <Highlighter action="highlight" color="#EAD9C2" isView={true}>six thousand people who didn't know any of them</Highlighter>. FOR/M was the answer. I directed it.
                  </p>
                </div>

                {/* 4. Results block */}
                <div ref={resultsRef} className="results-block">
                  <div className="stat-item">
                    <div className="stat-number">{counts[0].toLocaleString()}+</div>
                    <div className="stat-label">VISITORS OVER 5 DAYS</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{counts[1]}K</div>
                    <div className="stat-label">INSTAGRAM VIEWS</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{counts[2]}</div>
                    <div className="stat-label">STUDENT-LED FOR/TALKS</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{counts[3]}</div>
                    <div className="stat-label">CURATORIAL ZONES</div>
                  </div>
                </div>

                {/* 5. Photo block 1 */}
                <div className="photo-block-1">
                  <Image
                    src="/projects/form/form-photo-1.jpg"
                    alt="FOR/M exhibition, 115 McCaul St"
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>

                {/* 6. Role block */}
                <div className="role-block">
                  <h3 className="role-title">My role</h3>
                  <div className="role-cols">
                    <div className="role-left">
                      <div className="role-category">
                        <span className="role-cat-header">■ DIRECTION</span>
                        <span className="role-cat-item">Exhibition concept and curatorial thesis</span>
                        <span className="role-cat-item">Zone structure and spatial programming</span>
                        <span className="role-cat-item">FOR/TALKS speaker series</span>
                      </div>
                      <div className="role-category" style={{ marginTop: '16px' }}>
                        <span className="role-cat-header">■ BUILD</span>
                        <span className="role-cat-item">Exhibition website: HTML/CSS/JS</span>
                        <span className="role-cat-item">Google Apps Script backend</span>
                        <span className="role-cat-item">Content and editorial direction</span>
                      </div>
                      <div className="role-category" style={{ marginTop: '16px' }}>
                        <span className="role-cat-header">■ TEAM</span>
                        <span className="role-cat-item">Led 6-person organizing committee</span>
                        <span className="role-cat-item">Coordinated with OCAD faculty and admin</span>
                        <span className="role-cat-item">Managed 5-day installation and programme</span>
                      </div>
                    </div>
                    <div className="role-right">
                      I came in as Exhibition Director with one early conviction:
                      the show needed a point of view before it needed a layout.
                      I developed the curatorial framework, three zones, each with
                      a distinct argument about design, before a single piece of
                      student work was placed. FOR/TALKS was added as a layer of
                      public programming that treated the exhibition as a venue,
                      not just a display. I also spoke: presenting Falcon, a venture
                      platform project, to an audience of founders and investors on Day 3.
                    </div>
                  </div>
                </div>

                {/* 7. Content sections */}
                <div id="my-role" className="case-study-section">
                  <h2 className="section-heading" style={{ marginTop: '12px' }}>My Role</h2>
                  <p className="section-body">
                    I came in as Exhibition Director with one conviction: the show needed a point of view before it needed a layout. I developed the curatorial framework, three zones, each making a distinct argument about what industrial design does, before a single piece of student work was placed. That decision set the terms for everything else: the spatial programming, the FOR/TALKS speaker series, the pre-exhibition editorial strategy, and the five-day installation.
                  </p>
                </div>

                <div id="the-problem" className="case-study-section">
                  <h2 className="section-heading" style={{ marginTop: '12px' }}>The Problem</h2>
                  <p className="section-body">
                    The default format flattens everything. Seventeen different design practices presented as seventeen equal squares makes it harder, not easier, to understand any of them. The risk was a show that was technically complete and experientially inert. Visitors would come, walk through, and leave without a frame for what they'd seen.
                  </p>
                </div>

                <div id="allocation" className="case-study-section">
                  <div className="footprint-grid">
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-fragment-mono), monospace',
                        fontSize: '12px',
                        color: '#000000',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        display: 'block',
                        marginBottom: '12px',
                      }}>how we divided the room</span>
                      <p className="section-body" style={{ color: '#000000', margin: 0 }}>
                        Deciding who goes where wasn't a design decision. It was a research and logistics problem. <Highlighter action="underline" color="#C8B89A" isView={true}>Two information sessions and two surveys</Highlighter> mapped each project's scale, materiality, and physical footprint before any spatial decisions were made. For/body had the fewest spots: wearables, prosthetics, and body-mounted work demand significantly more floor space per project than a system diagram or a spatial object. The surveys let us make those calls fairly.
                      </p>
                    </div>
                    <FootprintChart />
                  </div>
                </div>

                <div id="key-decision" className="case-study-section">
                  <h2 className="section-heading" style={{ marginTop: '12px' }}>Key Decision</h2>
                  <p className="section-body">
                    The call was to build a curatorial argument before building a floor plan. Three zones, each anchored by a different proposition about what industrial design does at different scales of resolution.
                  </p>

                  <div style={{
                    fontFamily: 'var(--font-fragment-mono), monospace',
                    fontSize: '11px',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.1em',
                    color: '#000000',
                    marginTop: '48px',
                    marginBottom: '24px',
                  }}>THREE CURATORIAL ZONES</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0 32px' }}>
                    {zonesData.map((zone, idx) => (
                      <motion.div
                        key={zone.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        style={{
                          display: 'flex',
                          flexDirection: isMobile ? 'column' : 'row',
                          alignItems: isMobile ? 'flex-start' : 'center',
                          border: '0.5px solid #E8E4DF',
                          borderRadius: '12px',
                          padding: isMobile ? '20px' : '28px 32px',
                          gap: isMobile ? '20px' : '40px',
                          marginBottom: '16px',
                          background: '#FFFFFF',
                        }}
                      >
                        {/* Left column */}
                        <div style={{ width: '240px', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                          <Image
                            src={zone.svg}
                            alt={zone.label}
                            width={561}
                            height={115}
                            style={{ width: '427px', maxWidth: 'none', height: 'auto', display: 'block', flexShrink: 0 }}
                          />
                        </div>

                        {/* Right column */}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '11px', color: '#000000', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {zone.label}
                          </div>
                          <div style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif', fontSize: '22px', fontWeight: 400, color: '#1A1A1A', marginTop: '4px' }}>
                            {zone.scale}
                          </div>
                          <div style={{ fontFamily: 'var(--font-fragment-mono), monospace', fontSize: '12px', color: '#000000', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '8px' }}>
                            {zone.count} designers
                          </div>
                          <div style={{ borderTop: '0.5px solid #E8E4DF', margin: '12px 0' }} />
                          <p style={{
                            fontFamily: 'var(--font-helvetica-neue), sans-serif',
                            fontWeight: 300,
                            fontSize: '14px',
                            lineHeight: '1.7',
                            color: '#6B6560',
                            margin: 0,
                          }}>
                            {zone.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <p className="section-body">
                    Placing student work into those frames was the real design act. Some pieces moved. Some groupings didn't match what students had imagined for their own work. The editorial call had to hold: because the zones only work if the argument is consistent. That friction was necessary.
                  </p>
                </div>

                <div id="before-doors-opened" className="case-study-section">
                  <h2 className="section-heading" style={{ marginTop: '12px' }}>Before the doors opened</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px', marginTop: '16px', width: '100%' }}>
                    <VideoPlayer src="/projects/form/marketing%20reel%201.MP4" aspectRatio="9/16" showMuteToggle={true} />
                    <VideoPlayer src="/projects/form/marketing%20reel%202.MP4" aspectRatio="9/16" showMuteToggle={true} />
                  </div>
                </div>

                <div id="the-days" className="case-study-section">
                  <h2 className="section-heading" style={{ marginTop: '12px' }}>The Days</h2>
                  <p style={{
                    fontFamily: 'var(--font-helvetica-neue), sans-serif',
                    fontWeight: 300,
                    fontSize: '14px',
                    color: '#6B6560',
                    margin: '0 0 16px 0',
                  }}>
                    May 6–10, 2026. 115 McCaul St, Toronto. Five days open to the public.
                  </p>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    width: "100%",
                  }}>
                    <VideoPlayer src="/projects/form/Day2.MP4" aspectRatio="9/16" showMuteToggle={true} />
                    <VideoPlayer src="/projects/form/Day4.MP4" aspectRatio="9/16" showMuteToggle={true} />
                  </div>
                </div>

                <div id="execution" className="case-study-section">
                  <h2 className="section-heading" style={{ marginTop: '12px' }}>Execution</h2>
                  <p className="section-body">
                    115 McCaul's layout didn't carve itself into three distinct arguments. The architecture was shared, continuous, and indifferent to the curatorial thesis. Making the zones spatially legible meant working against the building's default flow: controlling sightlines, establishing thresholds between scales, and placing work with enough conviction that visitors felt the shift rather than just read a label. Some pieces ended up in positions their makers hadn't envisioned. The argument had to hold anyway.
                  </p>

                  <div style={{
                    fontFamily: 'var(--font-fragment-mono), monospace',
                    fontSize: '11px',
                    color: '#000000',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginTop: '32px',
                    marginBottom: '8px',
                  }}>
                    FLOOR PLAN — 115 MCCAUL ST, TORONTO
                  </div>
                  <FlipCard
                    frontSrc="/projects/form/floorplan-rough.jpg"
                    frontAlt="Initial floor plan proposal, GradEx 111, April 2026"
                  >
                    <div style={{
                      border: "0.5px solid var(--color-border)",
                      borderRadius: "12px",
                      padding: "32px",
                      background: "#FAFAF9",
                      width: "100%",
                      marginTop: "8px",
                      marginBottom: "32px",
                    }}>
                      <FloorPlan />
                    </div>
                  </FlipCard>

                  {/* Photo Block 2 */}
                  <div className="photo-block-2">
                    <Image
                      src="/projects/form/form-photo-2.jpg"
                      alt="FOR/M, FOR/TALKS in session"
                      fill
                      sizes="(max-width: 768px) 100vw, 720px"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>

                  <p className="section-body">
                    FOR/TALKS ran across four days: 15-minute practitioner talks, one project and one problem per speaker, open to the public. Short enough to hold a general audience. Specific enough to mean something. The format treated the exhibition as a venue, not just a display. I presented on Day 3: Falcon, a venture platform project, to an audience of founders and investors.
                  </p>
                  <p className="section-body" style={{ marginTop: '20px' }}>
                    The Instagram channel launched six weeks before opening day as an editorial pre-exhibition layer, process documentation, not promotional content. It reached 21,473 accounts before a single visitor walked through the door. The website was built from scratch: HTML/CSS/JS with a Google Apps Script backend connected to Sheets for RSVP and registration.
                  </p>
                </div>

                <div id="impact" className="case-study-section">
                  <h2 className="section-heading" style={{ marginTop: '12px' }}>Impact</h2>
                  <p className="section-body">
                    6,000+ visitors over five days. 205,252 Instagram views between April 1 and May 12, 50.7% from outside the existing follower base, reaching audiences that don't typically show up to graduating shows. Accounts reached grew 6,849% against the prior period baseline.
                  </p>
                  <p className="section-body" style={{ marginTop: '20px' }}>
                    Multiple visitors cited the three-zone structure as what made the exhibition feel like it had something to say.
                  </p>
                </div>

                <div id="reflection" className="case-study-section">
                  <h2 className="section-heading" style={{ marginTop: '12px' }}>Reflection</h2>
                  <p className="section-body">
                    What made FOR/M work wasn't the build. It was the decision to start with a position. A show without an argument is just a display. The hardest design work was upstream: naming the three scales, holding the curatorial frame against real spatial constraints, and making sure visitors moved through the space with intention. Everything else followed from that.
                  </p>
                </div>
              </div>
            </div>
          </FileContainer>
        </div>
      </DesktopSurface>
    </>
  );
}
