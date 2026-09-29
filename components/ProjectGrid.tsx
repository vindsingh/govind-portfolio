'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import { useReducedMotion } from 'framer-motion';

const WORK_IDS = ['cpkc', 'form', 'falcon'];

const cards = [
  { id: 'cpkc', title: 'CPKC', descriptor: 'Enterprise Design & AI', copy: 'Bringing design into a company that had none.', href: '/projects/cpkc', type: 'cpkc-video', bg: '#F5F7F5' },
  { id: 'form', title: 'FOR/M', descriptor: 'Exhibition Design & Strategy', copy: 'The show that argued for what design is for.', href: '/projects/form', type: 'lottie', bg: '#FFFFFF' },
  { id: 'falcon', title: 'Falcon', descriptor: 'Research & Platform Design', copy: 'The translation layer for the venture conversation.', href: '/projects/falcon', type: 'lottie-falcon', bg: '#FDF8F0' },
  { id: 'experience', title: 'Experience', descriptor: 'Experience', copy: 'The roles. The rooms. The timeline.', href: '/experience', type: 'experience-card', bg: '#FFFFFF' },
];

interface ProjectGridProps {
  activeTab?: string;
  onProjectHover?: (hovered: boolean) => void;
}

export default function ProjectGrid({ activeTab = 'all', onProjectHover }: ProjectGridProps = {}) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const cpkcVideoRef = useRef<HTMLVideoElement>(null);
  const cpkcCardRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const formLottieRef = useRef<any>(null);
  const cpkcPlayedRef = useRef(false);
  const formPlayedRef = useRef(false);
  const [cpkcHeight, setCpkcHeight] = useState<number | undefined>(undefined);
  const [formAnim, setFormAnim] = useState<any>(null);
  const [falconAnim, setFalconAnim] = useState<any>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (activeTab !== 'work') return;
    const el = cpkcCardRef.current;
    if (!el) return;

    const updateHeight = (entries?: ResizeObserverEntry[]) => {
      let h = el.getBoundingClientRect().height;
      if (entries && entries[0] && entries[0].borderBoxSize && entries[0].borderBoxSize[0]) {
        h = entries[0].borderBoxSize[0].blockSize;
      }
      if (h > 0) setCpkcHeight(h);
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeTab]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    fetch('/projects/form/form-animation.json')
      .then((r) => r.json())
      .then(setFormAnim)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/projects/falcon/FalconLogo.json')
      .then((r) => r.json())
      .then(setFalconAnim)
      .catch(() => {});
  }, []);

  // Card motion: CPKC and FOR/M play once on entering view, hold last frame, no loop (§5)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const playCpkc = () => {
      const video = cpkcVideoRef.current;
      if (!video || cpkcPlayedRef.current) return;
      cpkcPlayedRef.current = true;
      video.playbackRate = 1.6;
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const playForm = () => {
      const lottie = formLottieRef.current;
      if (!lottie || formPlayedRef.current) return;
      formPlayedRef.current = true;
      lottie.goToAndPlay(0, true);
    };

    if (cpkcCardRef.current) {
      const rect = cpkcCardRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) playCpkc();
    }
    if (formCardRef.current) {
      const rect = formCardRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) playForm();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === cpkcCardRef.current) {
              playCpkc();
            }
            if (entry.target === formCardRef.current) {
              playForm();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cpkcCardRef.current) observer.observe(cpkcCardRef.current);
    if (formCardRef.current) observer.observe(formCardRef.current);

    return () => observer.disconnect();
  }, [shouldReduceMotion, activeTab, formAnim]);

  const filteredCards = cards.filter((card) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'work') return WORK_IDS.includes(card.id);
    return false;
  });

  return (
    <div style={{ width: '100%' }}>
      {/* 1.2 Name block - only renders on 'all' tab */}
      {activeTab === 'all' && (
        <div
          style={{
            textAlign: 'center',
            maxWidth: '640px',
            margin: '0 auto',
            padding: isMobile ? '48px 20px 40px' : '72px 20px 64px',
            boxSizing: 'border-box',
          }}
        >
          {/* 1.2 Caricature slot:
              Caricature: /home/govind.webp - transparent, 720px tall source,
              renders at 240px. Not yet drawn. */}

          {/* Line 1 */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              letterSpacing: 'normal',
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Hi, I am Govind.
          </h1>

          {/* 1.1 Line 2 */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-md)',
              color: 'var(--color-text-secondary)',
              marginTop: '12px',
              marginBottom: 0,
              lineHeight: 1.5,
            }}
          >
            Researching and designing at{' '}
            <a
              href="https://www.cpkcr.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                fontSize: 'inherit',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                textDecorationColor: 'var(--color-border)',
                transition: 'color var(--transition-base), text-decoration-color var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.textDecorationColor = 'currentColor';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.textDecorationColor = 'var(--color-border)';
              }}
            >
              CPKC
            </a>
            , through{' '}
            <a
              href="https://www.mitacs.ca"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                fontSize: 'inherit',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                textDecorationColor: 'var(--color-border)',
                transition: 'color var(--transition-base), text-decoration-color var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.textDecorationColor = 'currentColor';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.textDecorationColor = 'var(--color-border)';
              }}
            >
              Mitacs
            </a>
            .
          </p>

          {/* 44x44 circular buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '28px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <a
              href="mailto:ahluwaliagovindsingh@gmail.com"
              aria-label="Email"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'border-color var(--transition-base), color var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-text-primary)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/govind-ahluwalia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'border-color var(--transition-base), color var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-text-primary)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* 1.3 & 1.5 Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: activeTab === 'work' ? '1fr' : isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: activeTab === 'work' ? 24 : isMobile ? 12 : 16,
          gridAutoRows: activeTab === 'work' ? 'auto' : isMobile ? 'auto' : '360px',
          padding: isMobile ? '4px 0 24px' : '0 0 32px',
          width: '100%',
        }}
      >
        {filteredCards.map((card) => {
          if (card.id === 'experience') {
            const entries = [
              { role: 'Researcher, Innovation Program', org: 'CPKC' },
              { role: 'Exhibition Director', org: 'OCAD University' },
              { role: 'Independent Researcher and Builder', org: 'Falcon' },
              { role: 'Service Design Lead', org: 'Cadillac Fairview × OCAD' },
            ];

            return (
              <div
                key={card.id}
                data-cursor="Explore Experience"
                onClick={() => router.push('/experience')}
                onMouseEnter={() => {
                  setHovered(card.id);
                  if (onProjectHover) onProjectHover(true);
                }}
                onMouseLeave={() => {
                  setHovered(null);
                  if (onProjectHover) onProjectHover(false);
                }}
                style={{
                  position: 'relative',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  background: '#FFFFFF',
                  cursor: 'none',
                  boxShadow: hovered === card.id
                    ? '0 4px 24px rgba(0,0,0,0.10)'
                    : '0 1px 4px rgba(0,0,0,0.04)',
                  transform: 'translateY(0)',
                  transition: 'box-shadow 200ms ease, transform 150ms ease',
                  padding: isMobile ? '24px 20px' : '32px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: isMobile ? '320px' : 'auto',
                }}
              >
                <div>
                  {/* Eyebrow */}
                  <div
                    style={{
                      fontFamily: 'var(--font-fragment-mono)',
                      fontSize: 'var(--text-xs)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--color-text-muted)',
                      marginBottom: '20px',
                    }}
                  >
                    EXPERIENCE
                  </div>

                  {/* Four entries */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {entries.map((entry) => (
                      <div key={entry.role}>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 500,
                            color: 'var(--color-text-primary)',
                            lineHeight: 1.3,
                          }}
                        >
                          {entry.role}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-secondary)',
                            marginTop: '2px',
                            lineHeight: 1.3,
                          }}
                        >
                          {entry.org}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          const isCPKC = card.type === 'cpkc-video';

          return (
            <div
              key={card.id}
              ref={isCPKC ? cpkcCardRef : card.id === 'form' ? formCardRef : undefined}
              data-cursor="View Case Study"
              style={{
                position: 'relative',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                background: (card as any).bg,
                cursor: 'none',
                boxShadow: hovered === card.id
                  ? '0 4px 24px rgba(0,0,0,0.10)'
                  : '0 1px 4px rgba(0,0,0,0.04)',
                transform: 'translateY(0)',
                transition: 'box-shadow 200ms ease, transform 150ms ease',
                minHeight: isMobile ? '280px' : 'auto',
                display: 'flex',
                flexDirection: 'column',
                height: activeTab === 'work' && !isCPKC && cpkcHeight ? cpkcHeight : undefined,
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
                if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                  if (isCPKC && cpkcVideoRef.current && !shouldReduceMotion) {
                    cpkcVideoRef.current.playbackRate = 1.6;
                    cpkcVideoRef.current.currentTime = 0;
                    cpkcVideoRef.current.play().catch(() => {});
                  }
                  if (card.id === 'form' && formLottieRef.current && !shouldReduceMotion) {
                    formLottieRef.current.goToAndPlay(0, true);
                  }
                }
              }}
              onMouseLeave={() => {
                setHovered(null);
                if (onProjectHover) onProjectHover(false);
              }}
            >
              {/* CPKC VIDEO (FLUSH EDGE-TO-EDGE AT TOP) */}
              {isCPKC && (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '800 / 320', // Intrinsic video dimensions: 800x320 px (ratio: 2.5:1)
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                    borderTopLeftRadius: 'inherit',
                    borderTopRightRadius: 'inherit',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  {shouldReduceMotion ? (
                    <img
                      src="/home/cpkc-card.jpg"
                      alt="CPKC freight railway"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <video
                      ref={cpkcVideoRef}
                      muted
                      playsInline
                      autoPlay
                      preload="auto"
                      poster="/home/cpkc-card.jpg"
                      onCanPlay={(e) => {
                        e.currentTarget.playbackRate = 1.6;
                      }}
                      onLoadedData={() => {
                        if (!shouldReduceMotion && cpkcVideoRef.current) {
                          cpkcVideoRef.current.play().catch(() => {});
                        }
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                    >
                      <source src="/home/cpkc-card.webm" type="video/webm" />
                      <source src="/home/cpkc-card.mp4" type="video/mp4" />
                    </video>
                  )}

                  {/* Gradient fade overlay to soften edge between media and text block (§4) */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: '48px',
                      background: `linear-gradient(to bottom, transparent, ${(card as any).bg || '#F5F7F5'})`,
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              )}

              {/* TEXT AT BOTTOM - inside the card */}
              <div
                style={{
                  marginTop: 'auto',
                  position: 'relative',
                  zIndex: 5,
                  padding: isMobile ? '20px 16px 16px' : '24px 20px 20px',
                  width: '100%',
                  boxSizing: 'border-box',
                  background: isCPKC
                    ? ((card as any).bg || '#F5F7F5')
                    : card.id === 'form'
                    ? 'linear-gradient(to top, rgba(255,255,255,0.95) 70%, rgba(255,255,255,0))'
                    : 'linear-gradient(to top, rgba(253,248,240,0.95) 70%, rgba(253,248,240,0))',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-fragment-mono)',
                    fontSize: isMobile ? 9 : 10,
                    fontWeight: 500,
                    color: '#1A1A1A',
                    margin: '0 0 6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {card.descriptor}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: 600,
                    color: '#1A1A1A',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {card.copy}
                </p>
              </div>

              {/* LOTTIE */}
              {card.type === 'lottie' && formAnim && (
                <div style={{ position: 'absolute', inset: 0 }}>
                  <Lottie
                    lottieRef={formLottieRef}
                    animationData={formAnim}
                    loop={false}
                    autoplay={false}
                    style={{ width: '100%', height: '100%' }}
                  />
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
