'use client';

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';

interface Project {
  id: string;
  title: string;
  descriptor: string;
  headline: string;
  subline: string;
  href: string;
  accentColor: string;
  visualType: 'lottie' | 'image' | 'color';
  visualSrc: string;
  visualBg?: string;
  gridPosition: 'large-left' | 'medium-right' | 'medium-left-row2';
  size: 'large' | 'medium';
}

const projects: Project[] = [
  {
    id: 'form',
    title: 'FOR/M',
    descriptor: 'Exhibition Design & Strategy',
    headline: 'Made a graduating show take a position.',
    subline: 'Exhibition Director · GradEx 111 · 2026',
    href: '/projects/form',
    accentColor: '#C8B89A',
    visualType: 'lottie',
    visualSrc: '/projects/form/form-animation.json',
    gridPosition: 'large-left',
    size: 'large',
  },
  {
    id: 'falcon',
    title: 'Falcon',
    descriptor: 'Research & Platform Design',
    headline: 'Named the gap between investors and founders. Then built the translation.',
    subline: 'Independent Researcher · 2025–2026',
    href: '/projects/falcon',
    accentColor: '#C8910A',
    visualType: 'image',
    visualSrc: '/projects/falcon/falcon-wordmark.svg',
    visualBg: '#FDF8F0',
    gridPosition: 'medium-right',
    size: 'medium',
  },
  {
    id: 'cpkc',
    title: 'CPKC',
    descriptor: 'Enterprise Design & AI',
    headline: 'Built the design practice inside a freight railway from scratch.',
    subline: 'Innovation Catalyst · 2025–2026',
    href: '/projects/cpkc',
    accentColor: '#B5C4A8',
    visualType: 'image',
    visualSrc: '/cpkc-mitacslogo.svg',
    visualBg: '#F5F7F5',
    gridPosition: 'medium-left-row2',
    size: 'medium',
  },
];

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

interface ProjectGridProps {
  activeTab?: 'all' | 'work' | 'about' | 'experience';
  onProjectHover?: (visible: boolean) => void;
}

export default function ProjectGrid({ activeTab = 'all', onProjectHover }: ProjectGridProps) {
  const [formAnimation, setFormAnimation] = useState<any>(null);

  useEffect(() => {
    fetch('/projects/form/form-animation.json')
      .then((res) => res.json())
      .then((data) => setFormAnimation(data))
      .catch((err) => console.error('Failed to load FOR/M animation:', err));
  }, []);

  const filteredCards = projects.filter((card) => {
    if (activeTab === 'all' || activeTab === 'work') return true;
    return false;
  });

  const getCardClassName = (cardId: string) => {
    switch (cardId) {
      case 'form':
        return 'col-span-3 md:col-span-2 border-l-[3.5px] border-l-[#C8B89A]';
      case 'falcon':
        return 'col-span-3 md:col-span-1 border-l-[3.5px] border-l-[#C8910A]';
      case 'cpkc':
        return 'col-span-3 md:col-span-2 border-l-[3.5px] border-l-[#B5C4A8]';
      default:
        return 'col-span-3';
    }
  };

  return (
    <BentoGrid className="auto-rows-[18rem]">
      {filteredCards.map((card) => {
        let backgroundElement: React.ReactNode = null;

        if (card.id === 'form' && formAnimation) {
          backgroundElement = (
            <Lottie
              animationData={formAnimation}
              loop={true}
              autoplay={true}
              className="absolute inset-0 w-full h-full object-cover"
            />
          );
        } else if (card.id === 'falcon') {
          backgroundElement = (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: '#FDF8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '48px',
              }}
            >
              <img
                src="/projects/falcon/falcon-wordmark.svg"
                style={{ width: '60%', objectFit: 'contain' }}
                alt="Falcon Wordmark"
              />
            </div>
          );
        } else if (card.id === 'cpkc') {
          backgroundElement = (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: '#F5F7F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '48px',
              }}
            >
              <img
                src="/cpkc-mitacslogo.svg"
                style={{ width: '60%', objectFit: 'contain' }}
                alt="CPKC Logo"
              />
            </div>
          );
        }

        return (
          <BentoCard
            key={card.id}
            name={card.title}
            className={getCardClassName(card.id)}
            background={backgroundElement}
            Icon={ArrowIcon}
            description={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#A09890',
                    lineHeight: 1.2,
                    order: -1,
                  }}
                >
                  {card.descriptor}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: 'var(--text-base)',
                    fontWeight: 400,
                    color: '#1A1A1A',
                    lineHeight: 1.4,
                    marginTop: '6px',
                  }}
                >
                  {card.headline}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: '10px',
                    color: '#A09890',
                    marginTop: '8px',
                  }}
                >
                  {card.subline}
                </span>
              </div>
            }
            href={card.href}
            cta="View case study"
            onMouseEnter={() => onProjectHover && onProjectHover(true)}
            onMouseLeave={() => onProjectHover && onProjectHover(false)}
          />
        );
      })}
    </BentoGrid>
  );
}
