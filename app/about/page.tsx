'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DesktopSurface, FileContainer } from '@/components/FileContainer';
import SiteHeader from '@/components/SiteHeader';
import FileTabNav from '@/components/FileTabNav';
import AboutGallery, { PaintingItem } from '@/components/AboutGallery';

const PAINTINGS: readonly PaintingItem[] = [
  { slug: 'install-01-hospitality', alt: 'Painted mural in a café interior' },
  { slug: 'install-03-residential', alt: 'Canvases installed on a wall' },
  { slug: 'cityscape',              alt: 'Pen drawing of a city skyline' },
  { slug: 'install-02-lounge',      alt: 'Three abstract canvases in a lounge' },
  { slug: 'goldfish',               alt: 'Watercolour and ink goldfish' },
  { slug: 'portrait-fragments',     alt: 'Portrait in fragmented hatching' },
  { slug: 'portrait-teal',          alt: 'Portrait in a teal circle' },
  { slug: 'hand-study',             alt: 'Pen study of a hand' },
  { slug: 'building',               alt: 'Architectural pen drawing' },
  { slug: 'eagle',                  alt: 'Pen drawing of an eagle' },
  { slug: 'elephant',               alt: 'Painted ornamental elephant' },
  { slug: 'sketchbook-page',        alt: 'Mixed media sketchbook page' },
  { slug: 'stipple-triangle',       alt: 'Stippled ink portrait' },
  { slug: 'stipple-portrait',       alt: 'Stippled portrait of an older man' },
] as const;

export default function AboutPage() {
  const router = useRouter();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === 'work') {
      router.push('/?tab=work');
    } else if (tab === 'all') {
      router.push('/');
    } else if (tab === 'experience') {
      router.push('/experience');
    }
  };

  const openGallery = (e: React.MouseEvent<HTMLElement>) => {
    setTriggerElement(e.currentTarget);
    setGalleryOpen(true);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .desktop-surface-custom {
          min-height: 100vh !important;
          background: var(--color-bg) !important;
          font-family: var(--font-body), sans-serif !important;
        }

        .folder-wrapper {
          position: relative;
          margin-top: 12px;
        }

        .file-container-custom {
          overflow: visible !important;
          background: var(--color-surface) !important;
          border: 1px solid var(--color-border) !important;
          border-radius: 0 var(--radius-card) var(--radius-card) var(--radius-card) !important;
          box-shadow: var(--shadow-file) !important;
          padding: 32px;
        }

        .about-header-line {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 400;
          color: var(--color-text-primary);
          max-width: none;
          margin: 0 auto 48px;
          line-height: 1.25;
          letter-spacing: -0.02em;
          text-align: center;
        }

        .about-intro-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 64px;
          align-items: center;
        }

        .about-intro-copy {
          max-width: 560px;
        }

        .about-intro-p {
          font-family: var(--font-body);
          font-size: var(--text-base);
          line-height: 1.65;
          color: var(--color-text-secondary);
          margin: 0 0 16px 0;
        }

        .about-intro-link {
          color: inherit;
          font-size: inherit;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: var(--color-border);
          transition: color var(--transition-base), text-decoration-color var(--transition-base);
        }

        .about-intro-link:hover {
          color: var(--color-text-primary);
          text-decoration-color: currentColor;
        }

        .about-cards-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 64px;
        }

        .about-card-shell {
          padding: 40px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          background: transparent;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-card);
          transition: transform var(--transition-base), box-shadow var(--transition-base);
        }

        .about-card-shell:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 16px 40px rgba(0, 0, 0, 0.10);
        }

        @media (prefers-reduced-motion: reduce) {
          .about-card-shell:hover {
            transform: none;
          }
        }

        .about-card-title {
          font-family: var(--font-display);
          font-size: var(--text-md);
          font-weight: 400;
          color: var(--color-text-primary);
          margin: 0 0 12px 0;
          letter-spacing: -0.01em;
        }

        .about-card-body {
          font-family: var(--font-body);
          font-size: var(--text-base);
          line-height: 1.65;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .paintings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 28px;
        }

        .painting-tile-btn {
          aspect-ratio: 1 / 1;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          border-radius: var(--radius-sm);
          overflow: hidden;
          position: relative;
          display: block;
          width: 100%;
          outline-offset: 2px;
          transition: transform var(--transition-base);
        }

        .painting-tile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius-sm);
          display: block;
          transition: transform var(--transition-base);
        }

        .painting-tile-btn:hover .painting-tile-img {
          transform: scale(1.04);
        }

        @media (prefers-reduced-motion: reduce) {
          .painting-tile-btn:hover .painting-tile-img {
            transform: none;
          }
        }

        @media (max-width: 1023px) {
          .about-intro-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .about-photo-col {
            order: -1;
            width: 100% !important;
            max-width: 420px !important;
          }
          .about-cards-row {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-top: 48px !important;
          }
          .about-card-shell {
            padding: 24px !important;
          }
        }

        @media (max-width: 767px) {
          .file-container-custom {
            padding: 16px !important;
          }
        }
      ` }} />

      <DesktopSurface className="desktop-surface-custom">
        <SiteHeader />

        <div className="folder-wrapper">
          <FileTabNav
            activeTab="about"
            onTabChange={handleTabChange}
          />

          <FileContainer className="file-container-custom">
            {/* Header line - left aligned, 40px margin-bottom */}
            <h1 className="about-header-line">
              I like knowing how things actually work.
            </h1>

            {/* Intro row */}
            <div className="about-intro-grid">
              {/* Intro copy */}
              <div className="about-intro-copy">
                <p className="about-intro-p">
                  So far that has meant a freight railway, an exhibition six thousand people walked through, and the gap between what founders say and what investors hear.
                </p>
                <p className="about-intro-p">
                  Design is how I go about it. Most of what I do starts as a question and ends as something built, with a lot of talking and drawing in between.
                </p>
                <p className="about-intro-p">
                  Outside that, I cook, bike, and paint. Usually in Toronto.
                </p>
                <p className="about-intro-p" style={{ margin: 0 }}>
                  Curious about how people, systems, and ideas fit together. If you are too,{' '}
                  <a
                    href="mailto:ahluwaliagovindsingh@gmail.com"
                    className="about-intro-link"
                  >
                    message me
                  </a>{' '}
                  or find me on{' '}
                  <a
                    href="https://linkedin.com/in/govind-ahluwalia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-intro-link"
                  >
                    LinkedIn
                  </a>
                  .
                </p>
              </div>

              {/* FOR/M photo column */}
              <div className="about-photo-col">
                <img
                  src="/about/IMG_9896.JPG"
                  alt="Govind speaking at FOR/M exhibition"
                  style={{
                    width: '100%',
                    maxWidth: '420px',
                    aspectRatio: '4 / 3',
                    objectFit: 'cover',
                    objectPosition: 'center 30%',
                    borderRadius: 'var(--radius-card)',
                    display: 'block',
                    border: '1px solid var(--color-border)',
                  }}
                />
              </div>
            </div>

            {/* Cards row */}
            <div className="about-cards-row">
              {/* Card 1 - Observer by nature (Paintings first per §3.2) */}
              <div className="about-card-shell" id="about-card-2">
                <h2 className="about-card-title">Observer by nature</h2>
                <p className="about-card-body">
                  Some of it has been commissioned for homes and offices. The rest are my versions of paintings I liked.
                </p>

                <div className="paintings-grid">
                  {PAINTINGS.slice(0, 5).map((painting) => (
                    <button
                      key={painting.slug}
                      className="painting-tile-btn"
                      onClick={(e) => openGallery(e)}
                      aria-label={`View painting: ${painting.alt}`}
                    >
                      <img
                        src={`/about/paintings/${painting.slug}-thumb.webp`}
                        alt={painting.alt}
                        className="painting-tile-img"
                      />
                    </button>
                  ))}

                  {/* Tile 6: Real thumbnail with frosted overlay per 2.5 */}
                  <button
                    className="painting-tile-btn"
                    onClick={(e) => openGallery(e)}
                    aria-label={`View all paintings (+${PAINTINGS.length - 5})`}
                  >
                    <img
                      src={`/about/paintings/${PAINTINGS[5].slug}-thumb.webp`}
                      alt={PAINTINGS[5].alt}
                      className="painting-tile-img"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(255, 255, 255, 0.82)',
                        backdropFilter: 'blur(16px) saturate(140%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1,
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-md)',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                          lineHeight: 1,
                        }}
                      >
                        +{PAINTINGS.length - 5}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Card 2 - Working it out by hand (Second per §3.2) */}
              <div className="about-card-shell" id="about-card-1">
                <h2 className="about-card-title">Working it out by hand</h2>
                <div className="about-card-body">
                  <p style={{ margin: '0 0 16px 0' }}>
                    I&apos;ve been drawing since I was a kid, across whatever medium was around. It never became the job, but it became how I think.
                  </p>
                  <p style={{ margin: 0 }}>
                    Now the same habit goes into tracing a causal chain or mapping how a service actually works. What comes out might be a screen, a roadmap, or just a clearer way of seeing what was already there.
                  </p>
                </div>

                {/* 2.4 Side by side images */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '12px',
                    marginTop: '28px',
                  }}
                >
                  <img
                    src="/about/Penpaperphoto.png"
                    alt="Working it out by hand sketch on desk"
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      display: 'block',
                    }}
                  />
                  <img
                    src="/about/penpaperphoto.jpeg"
                    alt="Second sketchbook study"
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>
          </FileContainer>
        </div>

        {/* Modal gallery */}
        <AboutGallery
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          paintings={PAINTINGS}
          triggerElement={triggerElement}
        />
      </DesktopSurface>
    </>
  );
}
