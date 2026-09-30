'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// TRAIN ASSETS v2 CONSTANTS (verified geometry & full-frame assets)
// ─────────────────────────────────────────────────────────────────────────────
const BAND_H = 200;          // desktop constant height
const BAND_H_MOBILE = 67;    // mobile constant height (boxWidth = 358.93px at 67px band height)

const ART_W = 2400;
const ART_H = 700;
const ART_RATIO = ART_W / ART_H;            // 3.428571

// Bodies start at y=252 on the 700px artboard. Everything above is empty
// and gets clipped by the band. Visible fraction = (700 - 252) / 700.
const VISIBLE_FRAC = 0.64;

// Boxcar right edge is at x=659 on the 2400px artboard.
const BOXCAR_FRAC = 0.2746;

const TRACK_SRC  = '/projects/cpkc/train/track.webp';
const BODIES_SRC = '/projects/cpkc/train/bodies.webp';
const WHEEL_SRC  = '/projects/cpkc/train/wheel-1.webp';

// Axle centres as % of the artboard box. Pair with x: '-50%', y: '-50%'.
const WHEELS = [
  { left: '5.412%',  top: '74.206%' },
  { left: '8.541%',  top: '74.206%' },
  { left: '21.315%', top: '74.206%' },
  { left: '24.444%', top: '74.206%' },
  { left: '36.359%', top: '74.206%' },
  { left: '39.488%', top: '74.206%' },
  { left: '52.262%', top: '74.206%' },
  { left: '55.391%', top: '74.206%' },
  { left: '68.165%', top: '74.206%' },
  { left: '71.294%', top: '74.206%' },
  { left: '81.897%', top: '74.206%' },
  { left: '85.026%', top: '74.206%' },
  { left: '88.155%', top: '74.206%' },
] as const;

const WHEEL_W = '3.046%';    // of box width
const WHEEL_H = '10.683%';   // of box height  (wheel is 73.1 × 74.78, not square)

interface TrainBandProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  isMobile?: boolean;
}

export default function TrainBand({
  heroRef,
  isMobile = false,
}: TrainBandProps) {
  const shouldReduceMotion = useReducedMotion();
  const isAnimated = !isMobile && !shouldReduceMotion;

  const currentBandH = isMobile ? BAND_H_MOBILE : BAND_H;
  // boxWidth = BAND_H / VISIBLE_FRAC * ART_RATIO (200 → 1071.43px)
  const boxWidth = (currentBandH / VISIBLE_FRAC) * ART_RATIO;
  const boxHeight = boxWidth / ART_RATIO; // 312.50px at 200px band height

  // Measure Element 2 inner width to compute exact clamped translation via ResizeObserver
  const containerRef = useRef<HTMLDivElement>(null);
  const [el2Width, setEl2Width] = useState(1320);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setEl2Width(entry.contentRect.width);
        }
      }
    });
    ro.observe(el);
    if (el.clientWidth > 0) {
      setEl2Width(el.clientWidth);
    }
    return () => ro.disconnect();
  }, []);

  // Compute clamped translation: el2Width - boxcarW - RIGHT_PAD (Sprint 3c §1)
  const boxcarW = boxWidth * BOXCAR_FRAC;
  const RIGHT_PAD = 32;
  const finalX = Math.max(0, el2Width - boxcarW - RIGHT_PAD);

  // Scroll tracking linked to the Hero container
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Clamped translation: stops when trailing yellow boxcar reaches resting position at right edge
  const trainTranslateX = useTransform(scrollYProgress, [0, 1], [0, finalX], {
    clamp: true,
  });

  // Rotation: 0° -> 180° across the same hero range, then stops
  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, 180], {
    clamp: true,
  });

  // State guards for one-shot re-entry
  const hasBeenPastHero = useRef(false);
  const isReEnteringRef = useRef(false);
  const [isReEntering, setIsReEntering] = useState(false);

  // Dynamic bottom corner radii: 0px mid-scroll, container's computed radii when at rest
  const bandRef = useRef<HTMLDivElement>(null);
  const [radii, setRadii] = useState({ bottomLeft: '0px', bottomRight: '0px' });

  useEffect(() => {
    let rafId: number | null = null;

    const checkRest = () => {
      const band = bandRef.current;
      const container = band?.parentElement || (typeof document !== 'undefined' ? document.querySelector<HTMLElement>('.file-container-custom') : null);
      if (!container) return;

      const r = container.getBoundingClientRect();
      const atRest = r.bottom <= window.innerHeight + 1;

      if (atRest) {
        const cs = window.getComputedStyle(container);
        const bl = cs.borderBottomLeftRadius || '0px';
        const br = cs.borderBottomRightRadius || '0px';
        setRadii(prev => {
          if (prev.bottomLeft === bl && prev.bottomRight === br) return prev;
          return { bottomLeft: bl, bottomRight: br };
        });
      } else {
        setRadii(prev => {
          if (prev.bottomLeft === '0px' && prev.bottomRight === '0px') return prev;
          return { bottomLeft: '0px', bottomRight: '0px' };
        });
      }
    };

    const handleScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        checkRest();
      });
    };

    checkRest();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  // Monitor scroll progress to know when hero has scrolled out
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 1) {
      hasBeenPastHero.current = true;
    }
  });

  // Coming back up: one-shot re-entry when returning to scroll position 0
  useEffect(() => {
    if (!isAnimated) return;

    const handleScroll = () => {
      if (window.scrollY === 0 && hasBeenPastHero.current && !isReEnteringRef.current) {
        isReEnteringRef.current = true;
        setIsReEntering(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAnimated]);

  return (
    /* 1. Pinned strip: sticky at container bottom, full width, clips everything */
    <div
      ref={bandRef}
      style={{
        position: 'sticky',
        bottom: 0,
        width: '100%',
        height: currentBandH,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 5,
        borderBottomLeftRadius: radii.bottomLeft,
        borderBottomRightRadius: radii.bottomRight,
        transition: 'border-radius 120ms ease',
      }}
    >
      {/* 2. Container-width track: repeating background track stays still while train moves over it. */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundImage: `url(${TRACK_SRC})`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'left bottom',
          backgroundSize: `${boxWidth}px ${boxHeight}px`,
        }}
      >
        {/* 3. The artboard box: aspect locked, anchored to the bottom.
               Translates rightward as hero scrolls out, and clamps so trailing
               yellow boxcar sits RIGHT_PAD inside the right edge.
               At scroll top, one-shot re-entry animates train back to starting position. */}
        <motion.div
          initial={isReEntering ? { x: finalX } : false}
          animate={isReEntering ? { x: 0 } : undefined}
          transition={
            isReEntering
              ? { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
              : undefined
          }
          onAnimationComplete={() => {
            if (isReEntering) {
              hasBeenPastHero.current = false;
              isReEnteringRef.current = false;
              setIsReEntering(false);
            }
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: `${boxWidth}px`,
            height: `${boxHeight}px`,
            x: isAnimated
              ? (isReEntering
                  ? undefined
                  : (hasBeenPastHero.current ? finalX : trainTranslateX))
              : 0,
            willChange: isAnimated ? 'transform' : 'auto',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {/* Wheels (Behind car bodies) */}
          {WHEELS.map((wheel, index) => (
            <motion.img
              key={index}
              src={WHEEL_SRC}
              alt="Train wheel"
              style={{
                position: 'absolute',
                left: wheel.left,
                top: wheel.top,
                width: WHEEL_W,
                height: WHEEL_H,
                x: '-50%',
                y: '-50%',
                rotate: isAnimated ? wheelRotate : 0,
                transformBox: 'fill-box',
                transformOrigin: 'center',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          ))}

          {/* Car bodies + Locomotive body (full frame, no offsets) */}
          <img
            src={BODIES_SRC}
            alt="CPKC train body"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
