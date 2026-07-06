'use client';

import { useState } from 'react';

export default function SiteFooter() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer
      style={{
        width: '100%',
        marginTop: '32px',
        paddingTop: '48px',
        paddingBottom: '32px',
        paddingLeft: 'var(--file-padding)',
        paddingRight: 'var(--file-padding)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thin SVG — default */}
      <img
        src="/footers/thinfooter.svg"
        alt="Govind Ahluwalia"
        style={{
          height: 'auto',
          display: 'block',
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'absolute',
          top: '48px',
          left: 'var(--file-padding)',
          right: 'var(--file-padding)',
          width: 'calc(100% - (var(--file-padding) * 2))',
        }}
      />
      {/* Thick SVG — hover state */}
      <img
        src="/footers/thickfooter.svg"
        alt=""
        aria-hidden="true"
        style={{
          width: 'calc(100% - (var(--file-padding) * 2))',
          height: 'auto',
          display: 'block',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Small footer bar */}
      <div
        style={{
          marginTop: '32px',
          paddingTop: '16px',
          borderTop: '1px solid #E8E4DF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-fragment-mono)',
            fontSize: '10px',
            color: '#A09890',
            textTransform: 'uppercase',
          }}
        >
          © 2026 Govind Singh Ahluwalia
        </span>
        <span
          style={{
            fontFamily: 'var(--font-fragment-mono)',
            fontSize: '10px',
            color: '#A09890',
            textTransform: 'uppercase',
          }}
        >
          Mississauga, Ontario
        </span>
      </div>
    </footer>
  );
}
