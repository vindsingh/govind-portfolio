'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  category: string;
  descriptor: string;
  type: 'project' | 'about' | 'experience';
  filterCategory: 'work' | 'about' | 'experience';
  href?: string;
  onProjectHover?: (visible: boolean) => void;
}

export default function ProjectCard({
  title,
  category,
  descriptor,
  type,
  filterCategory,
  href,
  onProjectHover,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (type === 'project' && onProjectHover) {
      onProjectHover(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (type === 'project' && onProjectHover) {
      onProjectHover(false);
    }
  };

  const CardContent = (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: '#FFFFFF',
        border: '1px solid #E8E4DF',
        borderRadius: 'var(--radius-card)',
        boxShadow: isHovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        overflow: 'hidden',
        cursor: type === 'project' ? 'none' : 'pointer',
        transition: 'box-shadow var(--transition-base)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image Area */}
      <div
        style={{
          height: '180px',
          background: '#F0EDEA',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      />

      {/* Info Area */}
      <div
        style={{
          padding: '14px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#9B9590',
            marginBottom: '2px',
            lineHeight: 1.2,
          }}
        >
          {category}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '17px',
            fontWeight: 500,
            color: '#1A1A1A',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '13px',
            color: '#9B9590',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {descriptor}
        </p>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
