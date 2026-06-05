'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';

/* ── Card data ──────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: 'form',
    title: 'FOR/M',
    category: 'EXHIBITION DESIGN & STRATEGY',
    descriptor: 'Direction, curation, public programming',
    type: 'project' as const,
    filterCategory: 'work' as const,
    href: '/form',
  },
  {
    id: 'falcon',
    title: 'Falcon',
    category: 'VENTURE PLATFORM DESIGN',
    descriptor: 'Shared interpretation layer for investors and founders',
    type: 'project' as const,
    filterCategory: 'work' as const,
    href: '/falcon',
  },
  {
    id: 'about',
    title: 'About',
    category: 'WHO I AM',
    descriptor: 'Designer, strategist, systems thinker',
    type: 'about' as const,
    filterCategory: 'about' as const,
  },
  {
    id: 'cpkc',
    title: 'CPKC',
    category: 'ENTERPRISE UX & STRATEGY',
    descriptor: 'AI tooling, design thinking, community of practice',
    type: 'project' as const,
    filterCategory: 'work' as const,
    href: '/cpkc',
  },
  {
    id: 'experience',
    title: 'Experience',
    category: "WHERE I'VE WORKED",
    descriptor: 'CPKC · OCAD · Freelance',
    type: 'experience' as const,
    filterCategory: 'experience' as const,
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

interface ProjectGridProps {
  activeTab?: 'all' | 'work' | 'about' | 'experience';
  onProjectHover?: (visible: boolean) => void;
}

export default function ProjectGrid({ activeTab = 'all', onProjectHover }: ProjectGridProps) {
  /* Track viewport width to switch between desktop and mobile layout */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const filteredCards = CARDS.filter((card) => {
    if (activeTab === 'all') return true;
    return card.filterCategory === activeTab;
  });

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
              /* ── Desktop: 3-column, 2-row grid ── */
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              width: '100%',
            }
      }
    >
      {filteredCards.map((card) => {
        return (
          <motion.div
            key={card.id}
            variants={cardVariants}
            style={isMobile ? { width: '100%' } : {}}
          >
            <ProjectCard
              title={card.title}
              category={card.category}
              descriptor={card.descriptor}
              type={card.type}
              filterCategory={card.filterCategory}
              href={card.href}
              onProjectHover={onProjectHover}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
