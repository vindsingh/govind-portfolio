'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Lottie from 'lottie-react';
import TerminalTypewriter from './TerminalTypewriter';
import ExperienceCardMini from './ExperienceCardMini';

const WORK_IDS = ['form', 'falcon', 'cpkc'];

const cards = [
  { id: 'contact', title: 'Get in touch', descriptor: '', copy: '', href: '/about', accent: '#1A1A1A', span: 2, type: 'contact', bg: '#000000' },
  { id: 'falcon', title: 'Falcon', descriptor: 'Research & Platform Design', copy: 'The translation layer for the venture conversation.', href: '/projects/falcon', accent: '#C8910A', span: 1, type: 'lottie-falcon', bg: '#FDF8F0' },
  { id: 'form', title: 'FOR/M', descriptor: 'Exhibition Design & Strategy', copy: 'The show that argued for what design is for.', href: '/projects/form', accent: '#C8B89A', span: 2, type: 'lottie', bg: '#FFFFFF' },
  { id: 'cpkc', title: 'CPKC', descriptor: 'Enterprise Design & AI', copy: 'Design thinking inside a freight railway.', href: '/projects/cpkc', accent: '#B5C4A8', span: 1, type: 'image', src: '/cpkc-mitacslogo.svg', bg: '#F5F7F5' },
  { id: 'experience', title: 'Experience', descriptor: 'Experience', copy: 'The roles. The rooms. The timeline.', href: '/experience', accent: '#C8B89A', span: 3, type: 'table', bg: '#FFFFFF' },
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
  const [isMobile, setIsMobile] = useState(true);

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
      gridAutoRows: isMobile ? '260px' : '300px',
      gap: isMobile ? 6 : 10,
      padding: isMobile ? '4px 0 16px' : '0',
      width: '100%',
    }}>
      {filteredCards.map(card => {
        if (card.id === 'experience') {
          return (
            <div
              key={card.id}
              data-cursor="Explore Experience"
              style={{
                gridColumn: isMobile ? '1 / -1' : `span ${card.span}`,
                aspectRatio: undefined,
                position: 'relative',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid #E8E4DF',
                cursor: 'none',
              }}
            >
              <ExperienceCardMini />
            </div>
          );
        }

        if (card.id === 'contact') {
          return (
            <Link
              key={card.id}
              href="/about"
              style={{
                display: 'block',
                textDecoration: 'none',
                gridColumn: isMobile ? '1 / -1' : `span ${card.span}`,
                aspectRatio: undefined,
                height: '100%',
                minHeight: 0,
              }}
            >
              <div
                data-cursor="Click to know more"
                style={{
                  position: 'relative',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid #E8E4DF',
                  background: card.bg,
                  cursor: 'none',
                  height: '100%',
                  minHeight: 0,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 200ms ease, transform 150ms ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0px)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Accent left border */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: 3, background: card.accent, zIndex: 3,
                }} />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  padding: isMobile ? '32px 14px 14px' : '40px 16px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}>
                  {/* macOS window dots */}
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '16px',
                    display: 'flex',
                    gap: '6px',
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
                  </div>
                  <TerminalTypewriter showIconsOnComplete={true} textFontSize={isMobile ? '13px' : '16px'} />
                </div>
              </div>
            </Link>
          );
        }

        return (
          <div
            key={card.id}
            data-cursor="View Case Study"
            style={{
              gridColumn: isMobile ? '1 / -1' : `span ${card.span}`,
              aspectRatio: undefined,
              position: 'relative',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid #E8E4DF',
              background: (card as any).bg,
              cursor: 'none',
              boxShadow: hovered === card.id
                ? '0 4px 24px rgba(0,0,0,0.10)'
                : '0 1px 4px rgba(0,0,0,0.04)',
              transform: 'translateY(0)',
              transition: 'box-shadow 200ms ease, transform 150ms ease',
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

            {/* TEXT AT BOTTOM LEFT — inside the card */}
            {card.type !== 'contact' && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 5,
                padding: '32px 20px 16px 20px',
                background: 'linear-gradient(to top, rgba(255,255,255,0.95) 60%, rgba(255,255,255,0))',
              }}>
                <p style={{
                  fontFamily: 'var(--font-fragment-mono)',
                  fontSize: isMobile ? 9 : 10,
                  fontWeight: 500,
                  color: '#1A1A1A',
                  margin: '0 0 6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  {card.descriptor}
                </p>
                <p style={{
                  fontFamily: 'var(--font-helvetica-neue)',
                  fontSize: isMobile ? 12 : 13, fontWeight: 600,
                  color: '#1A1A1A',
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

            {/* FALCON VIDEO */}
            {card.type === 'lottie-falcon' && (
              <div style={{ position: 'absolute', inset: 0 }}>
                <video
                  src="/falcon/signal-card.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 'inherit',
                  }}
                />
              </div>
            )}

            {/* IMAGE */}
            {card.type === 'image' && (
              <img src={(card as any).src} alt={card.title}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%', display: 'block',
                  objectFit: 'contain',
                  padding: card.id === 'cpkc' ? '16px 24px' : card.id === 'falcon' ? '20%' : 0,
                }} />
            )}



          </div>
        );
      })}
    </div>
  );
}
