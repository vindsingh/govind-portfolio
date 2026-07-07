'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';

const WORK_IDS = ['form', 'falcon', 'cpkc'];

const cards = [
  { id: 'form', title: 'FOR/M', descriptor: 'Exhibition Design & Strategy', copy: 'The show that argued for what design is for.', href: '/projects/form', accent: '#C8B89A', span: 2, type: 'lottie', bg: '#FFFFFF' },
  { id: 'falcon', title: 'Falcon', descriptor: 'Research & Platform Design', copy: 'The translation layer for the venture conversation.', href: '/projects/falcon', accent: '#C8910A', span: 1, type: 'lottie-falcon', bg: '#FDF8F0' },
  { id: 'cpkc', title: 'CPKC', descriptor: 'Enterprise Design & AI', copy: 'Design thinking inside a freight railway.', href: '/projects/cpkc', accent: '#B5C4A8', span: 2, type: 'image', src: '/cpkc-mitacslogo.svg', bg: '#F5F7F5' },
  { id: 'about', title: 'About', descriptor: 'About', copy: 'The person behind the work.', href: '/about', accent: '#C8B89A', span: 1, type: 'image', src: '/about/L.jpeg', bg: '#F5F0EC' },
  { id: 'experience', title: 'Experience', descriptor: 'Experience', copy: 'The roles. The rooms. The timeline.', href: '/experience', accent: '#C8B89A', span: 2, type: 'table', bg: '#FFFFFF' },
  { id: 'contact', title: 'Get in touch', descriptor: '', copy: '', href: 'mailto:ahluwaliagovindsingh@gmail.com', accent: '#1A1A1A', span: 1, type: 'contact', bg: '#1A1A1A' },
];

interface ProjectGridProps {
  activeTab?: string;
  onProjectHover?: (hovered: boolean) => void;
}

export default function ProjectGrid({ activeTab = 'all', onProjectHover }: ProjectGridProps = {}) {
  const router = useRouter();
  const [formAnim, setFormAnim] = useState<any>(null);
  const [falconAnim, setFalconAnim] = useState<any>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    fetch('/projects/form/form-animation.json')
      .then(r => r.json())
      .then(setFormAnim)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/projects/falcon/FalconLogo.json')
      .then(r => r.json())
      .then(setFalconAnim)
      .catch(() => {});
  }, []);

  const filteredCards = cards.filter(card => {
    if (activeTab === 'all') return true;
    if (activeTab === 'work') return WORK_IDS.includes(card.id);
    return false;
  });

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gridAutoRows: isMobile ? 'auto' : '300px',
      gap: 10,
      width: '100%',
    }}>
      {filteredCards.map(card => (
        <div
          key={card.id}
          style={{
            gridColumn: isMobile ? '1' : `span ${card.span}`,
            aspectRatio: isMobile ? '16/9' : undefined,
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid #E8E4DF',
            background: (card as any).bg,
            cursor: 'pointer',
            boxShadow: hovered === card.id
              ? '0 4px 24px rgba(0,0,0,0.10)'
              : '0 1px 4px rgba(0,0,0,0.04)',
            transition: 'box-shadow 200ms ease',
          }}
          onClick={() => {
            if (card.href.startsWith('mailto')) {
              window.location.href = card.href;
            } else {
              router.push(card.href);
            }
          }}
          onMouseEnter={() => {
            setHovered(card.id);
            if (onProjectHover) onProjectHover(true);
          }}
          onMouseLeave={() => {
            setHovered(null);
            if (onProjectHover) onProjectHover(false);
          }}
        >
          {/* Accent left border */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 3, background: card.accent, zIndex: 3,
          }} />

          {card.id === 'experience' && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 120, zIndex: 1,
              background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />
          )}

          {/* TEXT AT BOTTOM LEFT — inside the card */}
          {card.type !== 'contact' && (
            <div style={{
              position: 'absolute', bottom: 16, left: 20, zIndex: 5,
              maxWidth: 'calc(100% - 40px)',
            }}>
              <p style={{
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: 10,
                fontWeight: 500,
                color: card.id === 'about' ? 'rgba(255,255,255,0.7)' : '#1A1A1A',
                margin: '0 0 6px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {card.descriptor}
              </p>
              <p style={{
                fontFamily: 'var(--font-helvetica-neue)',
                fontSize: 13, fontWeight: 600,
                color: card.id === 'about' ? '#FFFFFF' : '#1A1A1A',
                textShadow: card.id === 'about' ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
                margin: 0, lineHeight: 1.3,
              }}>{card.copy}</p>
            </div>
          )}

          {/* LOTTIE */}
          {card.type === 'lottie' && formAnim && (
            <div style={{ position: 'absolute', inset: 0 }}>
              <Lottie animationData={formAnim} loop autoplay
                style={{ width: '100%', height: '100%' }} />
            </div>
          )}

          {/* FALCON LOTTIE */}
          {card.type === 'lottie-falcon' && falconAnim && (
            <div style={{ position: 'absolute', inset: 0 }}>
              <Lottie animationData={falconAnim} loop autoplay
                style={{ width: '100%', height: '100%' }} />
            </div>
          )}

          {/* IMAGE */}
          {card.type === 'image' && (
            <img src={(card as any).src} alt={card.title}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', display: 'block',
                objectFit: card.id === 'about' ? 'cover' : 'contain',
                padding: card.id === 'cpkc' ? '16px 24px' : card.id === 'falcon' ? '20%' : 0,
              }} />
          )}
          {card.id === 'about' && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2,
              background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
              borderRadius: 12,
              pointerEvents: 'none',
            }} />
          )}

          {/* EXPERIENCE TABLE */}
          {card.type === 'table' && (
            <div style={{
              position: 'absolute', top: 52, left: 20, right: 20, bottom: 0,
            }}>
              {[
                ['CPKC','Innovation Catalyst','2025–26'],
                ['FOR/M','Exhibition Director','2026'],
                ['Falcon','Independent Researcher','2025–26'],
                ['Cadillac Fairview','Project Lead','2024–25'],
                ['DesignWith Lab','Design Research Intern','2024'],
              ].map(([org, role, year], i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.6fr auto',
                  gap: 8, padding: '8px 0',
                  borderBottom: '1px solid #E8E4DF',
                  alignItems: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-helvetica-neue)', fontSize: 11, fontWeight: 500, color: '#1A1A1A' }}>{org}</span>
                  <span style={{ fontFamily: 'var(--font-fragment-mono)', fontSize: 9, color: '#6B6560' }}>{role}</span>
                  <span style={{ fontFamily: 'var(--font-fragment-mono)', fontSize: 9, color: '#A09890' }}>{year}</span>
                </div>
              ))}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
                background: 'linear-gradient(to bottom, transparent, #FFFFFF)',
                pointerEvents: 'none',
              }} />
            </div>
          )}

          {/* CONTACT */}
          {card.type === 'contact' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
            }}>
              <a href="mailto:ahluwaliagovindsingh@gmail.com"
                onClick={e => e.stopPropagation()}
                style={{
                  width: isMobile ? 72 : 110, height: isMobile ? 72 : 110, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.85)',
                  textDecoration: 'none',
                  transition: 'border-color 200ms ease',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/govind-singh-ahluwalia"
                target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  width: isMobile ? 72 : 110, height: isMobile ? 72 : 110, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.85)',
                  textDecoration: 'none',
                  transition: 'border-color 200ms ease',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                </svg>
              </a>
            </div>
          )}

          {/* VIEW CASE STUDY — work cards only */}
          {WORK_IDS.includes(card.id) && hovered === card.id && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.04)',
            }}>
              <div style={{
                background: '#1A1A1A', color: '#FFFFFF',
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: 11, textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '8px 16px', borderRadius: 4,
              }}>
                View Case Study
              </div>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}
