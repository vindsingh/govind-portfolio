'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionVisual from './SectionVisual';

export interface SectionBlock {
  subhead: string;
  body: string;
}

export interface SectionData {
  id: string;
  title: string;
  statement: [string, string];
  visualSlug: string;
  loop: boolean;
  blocks: [SectionBlock, SectionBlock, SectionBlock];
}

export const SECTIONS: SectionData[] = [
  {
    id: 'people-use',
    title: 'Something people use',
    statement: [
      'Sales teams were losing hours in spreadsheets to find leads.',
      'So we built a tool they could just ask.',
    ],
    visualSlug: 'section1',
    loop: true,
    blocks: [
      {
        subhead: 'Six use cases',
        body: 'We talked to people across every line of business. Six ideas for AI came out of it, ranked. This was the one that got built.',
      },
      {
        subhead: 'Two directions',
        body: 'One version looked like the spreadsheet people already used. The other let them ask a question. The familiar one would have kept them in the spreadsheet.',
      },
      {
        subhead: 'Shipped rough',
        body: 'Internal tools here were built on default templates. We gave this one a look of its own, then showed it to people while it was still rough. It is in use now, and they run it themselves.',
      },
    ],
  },
  {
    id: 'persists',
    title: 'Something that persists',
    statement: [
      'There was no design function, and no word for the work.',
      'So we built the group before the framework.',
    ],
    visualSlug: 'section2',
    loop: false,
    blocks: [
      {
        subhead: 'People already doing it',
        body: 'People in other teams were already talking to users and testing things before spending money. They just had no name for it, and no way to find each other.',
      },
      {
        subhead: 'A group, not a document',
        body: 'We could have written a framework. Most go unread. So we found those people and gave them somewhere to meet.',
      },
      {
        subhead: '105 members',
        body: 'A group that grew to 105+ people across Information Services by early 2026. That is how many joined, not how many changed the way they work.',
      },
    ],
  },
  {
    id: 'shows-shape',
    title: 'Something that shows shape',
    statement: [
      'Nobody had drawn how the work actually flowed.',
      'So we drew it, forwards and backwards.',
    ],
    visualSlug: 'section3',
    loop: false,
    blocks: [
      {
        subhead: 'No map existed',
        body: 'Freight passes through more hands than any one person can see. Nobody had written down how the work actually moves.',
      },
      {
        subhead: 'Mapping what happens',
        body: 'We mapped how work moved through an external trucking partner, and later through a customer portal. Both started from a blank page.',
      },
      {
        subhead: 'Mapping backwards',
        body: 'We asked an engineering team to picture their job a few years out, working the way they wanted to, then traced the steps back from there. Asking what hurts gets you complaints. Starting from the end gets you a plan.',
      },
    ],
  },
  {
    id: 'underneath',
    title: 'Something underneath',
    statement: [
      'The research all lives in one place, but the rules for filing it no longer agree.',
      'So that gets fixed before anything else is built on top.',
    ],
    visualSlug: 'section4',
    loop: true,
    blocks: [
      {
        subhead: "What's already there",
        body: 'Years of customer research already sit in one place, and a new customer portal is being designed on top of it. I am not leading that work. My part was interviewing the internal teams the portal affects.',
      },
      {
        subhead: 'Rebuilt on it',
        body: 'One early prototype looked finished, but the customers and locations in it were made up. It demoed well. I rebuilt it from the real research.',
      },
      {
        subhead: 'What comes next',
        body: 'Three documents set the rules for how research gets filed, and they had stopped matching each other. I wrote up a fix and put it in for review.',
      },
    ],
  },
];

interface SectionItemProps {
  section: SectionData;
  isActive?: boolean;
}

function SectionItem({ section, isActive = false }: SectionItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Entrance: threshold 0.35 fades up once per entry.
    // Reset when section fully leaves, so it plays again on return.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.35) {
            setIsInView(true);
          } else if (!entry.isIntersecting || entry.intersectionRatio === 0) {
            setIsInView(false);
          }
        }
      },
      { threshold: [0, 0.35] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id={section.id}
      style={{
        padding: '96px 0',
        scrollMarginTop: '80px',
      }}
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 24 }
        }
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          {section.title}
        </h2>

        {/* Statement lines: two lines, problem then answer, 4px apart */}
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-md)',
              fontWeight: 400,
              color: 'var(--color-text-primary)',
              lineHeight: 1.35,
            }}
          >
            {section.statement[0]}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-md)',
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.35,
            }}
          >
            {section.statement[1]}
          </div>
        </div>

        {/* Wide visual: 100% width, aspect 1800/400, 24px top margin */}
        <SectionVisual
          slug={section.visualSlug}
          alt={section.title}
          isActive={isInView}
          loop={section.loop}
        />

        {/* Three pointers beneath visual: 3 columns side by side, gap 32px, 24px top margin */}
        <div
          className="section-pointers-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            marginTop: '24px',
          }}
        >
          {section.blocks.map((block, idx) => (
            <div key={idx}>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 8px',
                }}
              >
                {block.subhead}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.6,
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                }}
              >
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

interface SectionStackProps {
  activeId?: string | null;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onProgressChange?: (progress: number) => void;
}

export default function SectionStack({ activeId, containerRef }: SectionStackProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1023px) {
          .section-pointers-grid {
            grid-template-columns: 1fr !important;
          }
        }
      ` }} />
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {SECTIONS.map((section) => (
          <SectionItem
            key={section.id}
            section={section}
            isActive={activeId === section.id}
          />
        ))}
      </div>
    </>
  );
}
