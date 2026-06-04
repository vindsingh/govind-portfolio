'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  descriptor: string;       // short tag, e.g. "Exhibition Design"
  href: string;             // route to case study
  accentColor?: string;     // optional hex, defaults to var(--color-accent)
  size?: 'large' | 'medium';
}

/* Aspect ratios for the image placeholder area */
const ASPECT_RATIO: Record<NonNullable<ProjectCardProps['size']>, string> = {
  large:  '16 / 9',
  medium: '4 / 3',
};

export default function ProjectCard({
  title,
  descriptor,
  href,
  accentColor,
  size = 'medium',
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const leftBorderColor = accentColor ?? 'var(--color-accent)';
  const aspectRatio = ASPECT_RATIO[size];

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.article
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          boxShadow: hovered
            ? 'var(--shadow-card-hover)'
            : 'var(--shadow-card)',
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        style={{
          /* Shape */
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',

          /* Color */
          background: 'var(--color-surface)',

          /* Border — 1px all around, then override left with accent */
          border: '1px solid var(--color-border)',
          borderLeft: `3px solid ${leftBorderColor}`,

          /* Cursor — will be replaced by custom cursor later */
          cursor: 'pointer',

          /* No scale on hover */
          willChange: 'box-shadow',
        }}
      >
        {/* ── Image area ──────────────────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio,
            background: hovered
              ? '#f5f0ea'                          /* slightly lighter on hover */
              : 'var(--color-accent-subtle)',
            transition: 'background var(--transition-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Placeholder title text */}
          <span
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: 'var(--text-xl)',
              fontWeight: 600,
              color: 'var(--color-border-strong)',
              opacity: 0.4,
              userSelect: 'none',
              pointerEvents: 'none',
              textAlign: 'center',
              padding: '0 16px',
            }}
          >
            {title}
          </span>

          {/* "VIEW CASE STUDY" hover pill */}
          <AnimatePresence>
            {hovered && (
              <motion.span
                key="pill"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',

                  /* Pill shape */
                  background: 'var(--color-text-primary)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',

                  /* Typography */
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                VIEW CASE STUDY
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* ── Content area ────────────────────────────────────────── */}
        <div style={{ padding: '16px' }}>
          {/* Descriptor — above the title */}
          <p
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '0 0 6px 0',
              lineHeight: 1,
            }}
          >
            {descriptor}
          </p>

          {/* Title */}
          <p
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: 'var(--text-md)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {title}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
