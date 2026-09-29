'use client';

import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface SectionVisualProps {
  slug: string; // 'section1' … 'section4'
  alt: string;
  isActive?: boolean;
  loop?: boolean;
}

export default function SectionVisual({ slug, alt, isActive = false, loop = false }: SectionVisualProps) {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Ignore autoplay policy restrictions or play interruptions
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: '1800 / 400',
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={`/projects/cpkc/sections/${slug}-subvisual.jpg`}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '1800 / 400',
        marginTop: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        loop={loop}
        aria-label={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      >
        <source src={`/projects/cpkc/sections/${slug}-subvisual.webm`} type="video/webm" />
        <source src={`/projects/cpkc/sections/${slug}-subvisual.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
