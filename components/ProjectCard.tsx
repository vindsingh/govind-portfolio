'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

interface ProjectCardProps {
  title: string;
  descriptor: string;
  headline?: string;
  subline?: string;
  accentColor?: string;
  visualType?: 'lottie' | 'image' | 'color';
  visualSrc?: string;
  visualBg?: string;
  type?: 'project' | 'about' | 'experience';
  filterCategory?: 'work' | 'about' | 'experience';
  slug?: string;
  onProjectHover?: (visible: boolean) => void;
}

export default function ProjectCard({
  title,
  descriptor,
  headline,
  subline,
  accentColor,
  visualType = 'color',
  visualSrc,
  visualBg,
  type = 'project',
  filterCategory = 'work',
  slug,
  onProjectHover,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    if (visualType === 'lottie' && visualSrc) {
      fetch(visualSrc)
        .then((res) => res.json())
        .then((data) => setAnimationData(data))
        .catch((err) => console.error('Failed to load Lottie animation JSON:', err));
    }
  }, [visualType, visualSrc]);

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
        borderLeft: accentColor ? `3.5px solid ${accentColor}` : '1px solid #E8E4DF',
        borderRadius: 'var(--radius-card)',
        boxShadow: isHovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        overflow: 'hidden',
        cursor: type === 'project' ? 'none' : 'pointer',
        transition: 'box-shadow var(--transition-base)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Visual Area */}
      <div
        style={{
          height: '180px',
          background: visualBg || '#F0EDEA',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        {visualType === 'lottie' && animationData && (
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        {visualType === 'image' && visualSrc && (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: visualBg || 'transparent',
              display: visualBg ? 'flex' : 'block',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={visualSrc}
              alt={title}
              style={
                visualBg
                  ? {
                      width: '60%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }
                  : {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }
              }
            />
          </div>
        )}

        {visualType === 'color' && (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: visualBg || '#F0EDEA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                textAlign: 'center',
              }}
            >
              {descriptor}
            </span>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div
        style={{
          padding: '14px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 1. descriptor */}
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#A09890',
            lineHeight: 1.2,
          }}
        >
          {descriptor}
        </span>

        {/* 2. title */}
        <h3
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: '#1A1A1A',
            lineHeight: 1.2,
            margin: '4px 0 0 0',
          }}
        >
          {title}
        </h3>

        {/* 3. headline */}
        {headline && (
          <p
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: 'var(--text-base)',
              fontWeight: 400,
              color: '#1A1A1A',
              lineHeight: 1.4,
              marginTop: '6px',
              marginBottom: 0,
            }}
          >
            {headline}
          </p>
        )}

        {/* 4. subline */}
        {subline && (
          <span
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '10px',
              color: '#A09890',
              marginTop: '8px',
              display: 'block',
            }}
          >
            {subline}
          </span>
        )}
      </div>
    </article>
  );

  if (slug && type === 'project') {
    return (
      <Link href={slug} style={{ textDecoration: 'none', display: 'block' }}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
