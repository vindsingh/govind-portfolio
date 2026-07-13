'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SiteHeader() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
        <Image src="/govindlogo.svg" alt="Govind" height={isMobile ? 20 : 26} width={isMobile ? 78 : 101} />
      </Link>

      {/* Right: Contact */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <a href="mailto:ahluwaliagovindsingh@gmail.com"
          aria-label="Email"
          style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '28px' : '32px',
            height: isMobile ? '28px' : '32px',
            borderRadius: '50%',
            border: '1px solid #E8E4DF',
            color: '#6B6560', textDecoration: 'none',
            transition: 'all 200ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#1A1A1A'
            e.currentTarget.style.color = '#1A1A1A'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#E8E4DF'
            e.currentTarget.style.color = '#6B6560'
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </a>
        <a href="https://linkedin.com/in/govind-singh-ahluwalia"
          target="_blank" rel="noopener noreferrer"
          aria-label="LinkedIn"
          style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '28px' : '32px',
            height: isMobile ? '28px' : '32px',
            borderRadius: '50%',
            border: '1px solid #E8E4DF',
            color: '#6B6560', textDecoration: 'none',
            transition: 'all 200ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#1A1A1A'
            e.currentTarget.style.color = '#1A1A1A'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#E8E4DF'
            e.currentTarget.style.color = '#6B6560'
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
          </svg>
        </a>
      </div>
    </motion.header>
    <div style={{
      width: '100%',
      height: 0.5,
      background: '#1A1A1A',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginTop: 6,
    }} />
    </>
  );
}
