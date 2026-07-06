'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'transparent',
        padding: '20px 32px',
        borderBottom: '1px solid #E8E4DF',
      }}
    >
      {/* Left: Wordmark */}
      <Link href="/" style={{ display: 'block', lineHeight: 0 }}>
        <Image src="/govindlogo.svg" alt="Govind" height={26} width={101} />
      </Link>

      {/* Right: Contact */}
      <a
        href="mailto:govindsingh.ahluwalia@gmail.com"
        style={{
          fontFamily: 'var(--font-helvetica-neue)',
          fontSize: '13px',
          fontWeight: 400,
          color: 'var(--color-text-secondary)',
          textDecoration: 'none',
          transition: 'color 150ms',
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
