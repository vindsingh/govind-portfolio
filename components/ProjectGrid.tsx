'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';

/* ── Project data ───────────────────────────────────────────────────── */
const projects = [
  {
    id: 'form',
    title: 'FOR/M',
    descriptor: 'Exhibition Design & Strategy',
    href: '/form',
    accentColor: '#C8B89A',
    gridPosition: 'large-left' as const,
  },
  {
    id: 'falcon',
    title: 'Falcon',
    descriptor: 'Venture Platform Design',
    href: '/falcon',
    accentColor: '#A8B5C4',
    gridPosition: 'medium-right' as const,
  },
  {
    id: 'cpkc',
    title: 'CPKC',
    descriptor: 'Enterprise Design & AI',
    href: '/cpkc',
    accentColor: '#B5C4A8',
    gridPosition: 'medium-left-row2' as const,
  },
];

/* ── Framer Motion variants ─────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

/* ── Grid positions ─────────────────────────────────────────────────── */
// Desktop: explicit grid-column / grid-row placements
const DESKTOP_PLACEMENT: Record<
  typeof projects[number]['gridPosition'],
  React.CSSProperties
> = {
  'large-left':       { gridColumn: '1', gridRow: '1' },
  'medium-right':     { gridColumn: '2', gridRow: '1' },
  'medium-left-row2': { gridColumn: '1', gridRow: '2' },
};

export default function ProjectGrid() {
  /* Track viewport width to switch between desktop and mobile layout */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={
        isMobile
          ? {
              /* ── Mobile: single column stack ── */
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '100%',
            }
          : {
              /* ── Desktop: asymmetric two-column grid ── */
              display: 'grid',
              gridTemplateColumns: '58fr 42fr',
              gap: '16px',
              width: '100%',
            }
      }
    >
      {projects.map((project) => {
        const isLarge =
          !isMobile && project.gridPosition === 'large-left';

        return (
          <motion.div
            key={project.id}
            variants={cardVariants}
            style={
              isMobile
                ? { width: '100%' }
                : DESKTOP_PLACEMENT[project.gridPosition]
            }
          >
            <ProjectCard
              title={project.title}
              descriptor={project.descriptor}
              href={project.href}
              accentColor={project.accentColor}
              size={isLarge ? 'large' : 'medium'}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
