'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface SiteHeaderProps {
  isCuriousMode?: boolean;
  onToggleCuriousMode?: () => void;
}

export default function SiteHeader({
  isCuriousMode = false,
  onToggleCuriousMode,
}: SiteHeaderProps = {}) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleCuriousClick = () => {
    if (onToggleCuriousMode) {
      onToggleCuriousMode();
    } else {
      router.push('/?curious=1');
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          padding: isMobile ? '14px 20px' : '20px 32px',
        }}
      >
        {/* Left: Wordmark */}
        <Link href="/" style={{ display: 'block', lineHeight: 0 }}>
          <Image
            src="/govindlogo.svg"
            alt="Govind"
            height={isMobile ? 20 : 26}
            width={isMobile ? 78 : 101}
          />
        </Link>

        {/* Right: CURIOUS MODE button */}
        <button
          onClick={handleCuriousClick}
          aria-label={isCuriousMode ? 'File View' : 'Curious Mode'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            border: '0.5px solid #000000',
            background: isCuriousMode ? '#000000' : 'transparent',
            color: isCuriousMode ? '#FFFFFF' : '#000000',
            padding: isMobile ? '4px 10px' : '6px 18px',
            fontFamily: 'var(--font-fragment-mono)',
            fontSize: isMobile ? '10px' : '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            minWidth: isMobile ? 'auto' : '140px',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!isCuriousMode) {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.color = '#FFFFFF';
            }
          }}
          onMouseLeave={(e) => {
            if (!isCuriousMode) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#000000';
            }
          }}
        >
          {isCuriousMode ? 'File View' : 'Curious Mode'}
        </button>
      </motion.header>
      <div
        style={{
          width: '100%',
          height: 0.5,
          background: '#1A1A1A',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginTop: 6,
        }}
      />
    </>
  );
}

