'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface PaintingItem {
  slug: string;
  alt: string;
}

interface AboutGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  paintings: readonly PaintingItem[];
  triggerElement?: HTMLElement | null;
}

export default function AboutGallery({
  isOpen,
  onClose,
  paintings,
  triggerElement,
}: AboutGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const [view, setView] = useState<'grid' | 'single'>('grid');
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const total = paintings.length;

  // Responsive column check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // When opening, always start in grid view
  useEffect(() => {
    if (isOpen) {
      setView('grid');
    }
  }, [isOpen]);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
  }, [total]);

  // Handle body overflow lock
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Focus management: focus close button on open, restore on close
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
      return () => clearTimeout(t);
    } else if (triggerElement) {
      triggerElement.focus();
    }
  }, [isOpen, triggerElement]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (view === 'single') {
          setView('grid');
        } else {
          onClose();
        }
      } else if (view === 'single') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, view, onClose, handlePrev, handleNext]);

  // Preload only current image plus its two neighbours in single view
  useEffect(() => {
    if (!isOpen || view !== 'single' || total === 0) return;

    const prevIdx = (activeIdx - 1 + total) % total;
    const nextIdx = (activeIdx + 1) % total;

    const currentImg = new Image();
    currentImg.src = `/about/paintings/${paintings[activeIdx].slug}.webp`;

    const prevImg = new Image();
    prevImg.src = `/about/paintings/${paintings[prevIdx].slug}.webp`;

    const nextImg = new Image();
    nextImg.src = `/about/paintings/${paintings[nextIdx].slug}.webp`;
  }, [isOpen, view, activeIdx, total, paintings]);

  if (!isOpen) return null;

  const currentPainting = paintings[activeIdx] || paintings[0];

  return (
    <AnimatePresence>
      <div
        key="gallery-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'rgba(20, 18, 16, 0.45)',
          backdropFilter: 'blur(24px) saturate(140%)',
          WebkitBackdropFilter: 'blur(24px) saturate(140%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '16px' : '24px',
          boxSizing: 'border-box',
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .gallery-tile-btn {
            aspect-ratio: 1 / 1;
            border: none;
            padding: 0;
            background: transparent;
            border-radius: var(--radius-sm);
            overflow: hidden;
            cursor: pointer;
            position: relative;
            display: block;
            width: 100%;
          }
          .gallery-tile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: var(--radius-sm);
            transition: transform var(--transition-base);
          }
          ${shouldReduceMotion ? '' : `
          .gallery-tile-btn:hover .gallery-tile-img {
            transform: scale(1.04);
          }
          `}
          .gallery-back-btn {
            background: transparent;
            border: none;
            color: var(--color-text-secondary);
            font-family: var(--font-body);
            font-size: var(--text-sm);
            cursor: pointer;
            padding: 4px 8px;
            margin-left: -8px;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: color var(--transition-base);
          }
          .gallery-back-btn:hover {
            color: var(--color-text-primary);
          }
          .gallery-nav-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid var(--color-border);
            border-radius: 50%;
            color: var(--color-text-primary);
            width: 44px;
            height: 44px;
            display: grid;
            place-items: center;
            font-size: 24px;
            line-height: 1;
            cursor: pointer;
            z-index: 10;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: background var(--transition-base), transform var(--transition-base);
          }
          .gallery-nav-arrow:hover {
            background: #FFFFFF;
            transform: translateY(-50%) scale(1.05);
          }
        ` }} />

        {/* Panel */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: 'min(1100px, 92vw)',
            maxHeight: '88vh',
            width: '100%',
            margin: 'auto',
            background: 'rgba(255, 255, 255, 0.86)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            borderRadius: 'var(--radius-card)',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.24)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: isMobile ? '16px 20px' : '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              boxSizing: 'border-box',
              minHeight: '68px',
            }}
          >
            {view === 'grid' ? (
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 500,
                }}
              >
                Paintings and drawings
              </div>
            ) : (
              <div />
            )}

            {view === 'single' && (
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                }}
              >
                {activeIdx + 1} / {total}
              </div>
            )}

            {/* Close Button */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close modal"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-secondary)',
                fontSize: '24px',
                lineHeight: 1,
                cursor: 'pointer',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color var(--transition-base)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >
              ×
            </button>
          </div>

          {/* Body Content */}
          {view === 'grid' ? (
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: isMobile ? '16px' : '24px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                  gap: '12px',
                }}
              >
                {paintings.map((painting, index) => (
                  <button
                    key={painting.slug}
                    onClick={() => {
                      setActiveIdx(index);
                      setView('single');
                    }}
                    className="gallery-tile-btn"
                    aria-label={`View ${painting.alt}`}
                  >
                    <img
                      src={`/about/paintings/${painting.slug}-thumb.webp`}
                      alt={painting.alt}
                      className="gallery-tile-img"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div
              onClick={() => setView('grid')}
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '16px' : '24px',
                overflow: 'hidden',
                minHeight: 0,
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              {/* Left Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="gallery-nav-arrow"
                style={{ left: isMobile ? '12px' : '24px' }}
                aria-label="Previous painting"
              >
                <span style={{ display: 'grid', placeItems: 'center', lineHeight: 1, marginTop: '-2px' }}>‹</span>
              </button>

              {/* Single Image */}
              <img
                key={currentPainting.slug}
                src={`/about/paintings/${currentPainting.slug}.webp`}
                alt={currentPainting.alt}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(88vh - 120px)',
                  objectFit: 'contain',
                  borderRadius: 'var(--radius-sm)',
                  display: 'block',
                  cursor: 'default',
                }}
              />

              {/* Right Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="gallery-nav-arrow"
                style={{ right: isMobile ? '12px' : '24px' }}
                aria-label="Next painting"
              >
                <span style={{ display: 'grid', placeItems: 'center', lineHeight: 1, marginTop: '-2px' }}>›</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
