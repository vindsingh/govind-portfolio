'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        background: 'transparent',
        paddingBottom: '16px',
      }}
    >
      {/* Left: Wordmark */}
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-geist-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}
      >
        Govind
      </Link>

      {/* Right: Contact */}
      <a
        href="mailto:govindsingh.ahluwalia@gmail.com"
        style={{
          fontFamily: 'var(--font-geist-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: 400,
          color: 'var(--color-text-secondary)',
          textDecoration: 'none',
          transition: 'color var(--transition-base)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color =
            'var(--color-text-primary)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color =
            'var(--color-text-secondary)';
        }}
      >
        Contact
      </a>
    </motion.header>
  );
}
