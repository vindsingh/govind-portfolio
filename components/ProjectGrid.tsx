'use client';

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { Mail } from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { Marquee } from '@/components/ui/marquee';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  descriptor: string;
  headline: string;
  subline: string;
  href: string;
  accentColor: string;
  visualType?: 'lottie' | 'image' | 'color';
  visualSrc?: string;
  visualBg?: string;
  colSpan: string;
}

const projects: Project[] = [
  {
    id: 'form',
    title: 'FOR/M',
    descriptor: 'Exhibition Design & Strategy',
    headline: 'Gave 50 industrial designers a reason to show up.',
    subline: 'Exhibition Director · GradEx 111 · 2026',
    href: '/projects/form',
    accentColor: '#C8B89A',
    visualType: 'lottie',
    visualSrc: '/projects/form/form-animation.json',
    colSpan: 'col-span-2',
  },
  {
    id: 'falcon',
    title: 'Falcon',
    descriptor: 'Research & Platform Design',
    headline: 'Built the translation layer between investors and founders.',
    subline: 'Independent Researcher · 2025–2026',
    href: '/projects/falcon',
    accentColor: '#C8910A',
    visualType: 'image',
    visualSrc: '/projects/falcon/falcon-wordmark.svg',
    visualBg: '#FDF8F0',
    colSpan: 'col-span-1',
  },
  {
    id: 'cpkc',
    title: 'CPKC',
    descriptor: 'Enterprise Design & AI',
    headline: 'Introduced design thinking to a 170-year-old freight railway.',
    subline: 'Innovation Catalyst · 2025–2026',
    href: '/projects/cpkc',
    accentColor: '#B5C4A8',
    visualType: 'image',
    visualSrc: '/cpkc-mitacslogo.svg',
    visualBg: '#F5F7F5',
    colSpan: 'col-span-2',
  },
  {
    id: 'about',
    title: 'About',
    descriptor: 'The Person',
    headline: 'The person behind the work.',
    subline: 'Govind · Mississauga',
    href: '/about',
    accentColor: '#C8B89A',
    visualType: 'image',
    visualSrc: '/about/L.jpeg',
    visualBg: '#F5F0EC',
    colSpan: 'col-span-1',
  },
  {
    id: 'experience',
    title: 'Experience',
    descriptor: 'Career',
    headline: 'The roles. The rooms. The timeline.',
    subline: 'CPKC · FOR/M · Falcon · 2024–2026',
    href: '/experience',
    accentColor: '#C8B89A',
    visualType: 'color',
    visualBg: '#F9F7F5',
    colSpan: 'col-span-2',
  },
  {
    id: 'contact',
    title: 'Contact',
    descriptor: 'Get in touch',
    headline: "Let's find the right conversation.",
    subline: 'govindsingh.ahluwalia@gmail.com',
    href: 'mailto:govindsingh.ahluwalia@gmail.com',
    accentColor: '#1A1A1A',
    visualType: 'color',
    visualBg: '#1A1A1A',
    colSpan: 'col-span-1',
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
  const [mailHovered, setMailHovered] = useState(false);
  const [liHovered, setLiHovered] = useState(false);

  useEffect(() => {
    fetch('/projects/form/form-animation.json')
      .then((res) => res.json())
      .then((data) => setFormAnimation(data))
      .catch((err) => console.error('Failed to load FOR/M animation:', err));
  }, []);

  const filteredCards = projects.filter((card) => {
    if (activeTab === 'all') return true;
    const isProject = ['form', 'falcon', 'cpkc'].includes(card.id);
    if (activeTab === 'work' && isProject) return true;
    return false;
  });

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
        } else if (card.id === 'about') {
          backgroundElement = (
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/about/L.jpeg"
                alt="Govind"
                className="w-full h-full object-cover object-center"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.85) 100%)'
              }} />
            </div>
          );
        } else if (card.id === 'experience') {
          backgroundElement = (
            <div className="absolute inset-0 w-full h-full" style={{ overflow: 'hidden', background: '#FFFFFF', padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {[
                  'CPKC — Innovation Catalyst — 2025–2026',
                  'FOR/M — Exhibition Director — 2026',
                  'Falcon — Independent Researcher — 2025–2026',
                ].map((rowText, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderBottom: '1px solid #E8E4DF',
                      padding: '6px 0',
                      fontSize: '9px',
                      fontFamily: 'var(--font-fragment-mono), monospace',
                      color: '#6B6560',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {rowText}
                  </div>
                ))}
              </div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.85) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          );
        } else if (card.id === 'contact') {
          backgroundElement = (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#1A1A1A',
              }}
            >
              {/* Marquee */}
              <div style={{ width: '100%', overflow: 'hidden', opacity: 0.8, marginTop: '-20px' }}>
                <Marquee style={{ '--duration': '30s' } as React.CSSProperties} className="py-0">
                  {Array(8).fill('CONTACT').map((text, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: 'var(--font-helvetica-neue), sans-serif',
                        fontSize: '32px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        opacity: 0.15,
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      {text} <span style={{ fontSize: '16px' }}>·</span>
                    </span>
                  ))}
                </Marquee>
              </div>

              {/* Social links overlay */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = 'mailto:govindsingh.ahluwalia@gmail.com';
                  }}
                  onMouseEnter={() => setMailHovered(true)}
                  onMouseLeave={() => setMailHovered(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    padding: 0,
                    border: mailHovered ? '1px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    color: '#FFFFFF',
                    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <Mail size={16} strokeWidth={1.5} />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open('https://linkedin.com/in/govind-singh-ahluwalia', '_blank', 'noopener,noreferrer');
                  }}
                  onMouseEnter={() => setLiHovered(true)}
                  onMouseLeave={() => setLiHovered(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    padding: 0,
                    border: liHovered ? '1px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    color: '#FFFFFF',
                    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037 -1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046 c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z M5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        }

        const isContact = card.id === 'contact';

        const descriptorStyle: React.CSSProperties = {
          fontFamily: 'var(--font-fragment-mono)',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: isContact ? '#FFFFFF' : '#1A1A1A',
          fontWeight: 500,
          marginBottom: '6px',
        };

        const headlineStyle: React.CSSProperties = {
          fontFamily: 'var(--font-helvetica-neue)',
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          fontWeight: 400,
          color: isContact ? '#FFFFFF' : '#1A1A1A',
          lineHeight: 1.35,
          marginBottom: '6px',
        };

        const sublineStyle: React.CSSProperties = {
          fontFamily: 'var(--font-fragment-mono)',
          fontSize: '10px',
          color: isContact ? 'rgba(255, 255, 255, 0.5)' : '#A09890',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        };

        return (
          <BentoCard
            key={card.id}
            name={card.title}
            className={cn(card.colSpan, "border-l-[3.5px]")}
            style={{
              borderLeftColor: card.accentColor,
              background: isContact ? '#1A1A1A' : undefined,
            }}
            background={backgroundElement}
            Icon={ArrowIcon}
            description={
              <>
                <span style={descriptorStyle}>{card.descriptor}</span>
                <span style={headlineStyle}>{card.headline}</span>
                <span style={sublineStyle}>{card.subline}</span>
              </>
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
