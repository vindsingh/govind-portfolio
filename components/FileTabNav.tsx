'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Tab = 'all' | 'work' | 'about' | 'experience';

interface FileTabNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isCuriousMode?: boolean;
  onToggleCuriousMode?: () => void;
  filter?: string;
  setFilter?: (f: string) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'all',        label: 'All'        },
  { id: 'work',       label: 'Work'       },
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
];

export default function FileTabNav({
  activeTab,
  onTabChange,
  isCuriousMode,
  onToggleCuriousMode,
  filter,
  setFilter,
}: FileTabNavProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleTabClick = (id: Tab) => {
    if (id === 'experience') {
      router.push('/experience');
      return;
    }
    if (id === 'about') {
      router.push('/about');
      return;
    }
    onTabChange(id);
  };

  if (isCuriousMode && isMobile) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1320px',
        marginInline: 'auto',
        position: 'relative',
        zIndex: 2, // ensure tabs render above container shadow/border
        paddingTop: 0,
        marginTop: 0,
      }}
    >
      {isCuriousMode ? (
        /* ── Curious Mode sentence filter ────────────────────────────── */
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: '0',
            paddingLeft: '0',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#1A1A1A',
              padding: '7px 16px',
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%)',
              borderRadius: '6px 0 0 0',
              marginBottom: '-1px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-helvetica-neue)',
                fontSize: '13px',
                fontWeight: 500,
                color: '#FFFFFF',
              }}
            >
              I am curious about
            </span>
            <select
              value={filter || 'everything'}
              onChange={(e) => setFilter?.(e.target.value)}
              style={{
                fontFamily: 'var(--font-helvetica-neue)',
                fontSize: '13px',
                fontWeight: 500,
                color: '#FFFFFF',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.5)',
                cursor: 'pointer',
                appearance: 'none',
                paddingRight: 14,
                outline: 'none',
              }}
            >
              <option value="everything" style={{ color: '#1A1A1A' }}>Everything</option>
              <option value="work" style={{ color: '#1A1A1A' }}>Work</option>
              <option value="research" style={{ color: '#1A1A1A' }}>Research</option>
              <option value="making" style={{ color: '#1A1A1A' }}>Making</option>
              <option value="personal" style={{ color: '#1A1A1A' }}>Personal</option>
            </select>
            <span
              style={{
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: 10,
                color: 'rgba(255,255,255,0.7)',
                pointerEvents: 'none',
              }}
            >
              ∨
            </span>
          </div>
          {!isMobile && (
            <button
              onClick={onToggleCuriousMode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#6B6560',
                background: 'transparent',
                border: '1px solid #E8E4DF',
                borderRadius: 4,
                padding: '5px 10px',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                marginLeft: 'auto',
                marginBottom: '7px',
              }}
            >
              {isCuriousMode ? '⊞ File View' : '✦ Curious Mode'}
            </button>
          )}
        </div>
      ) : (
        /* ── Tab row ──────────────────────────────────────────────────── */
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: '0',
            paddingLeft: '0',
            overflowX: 'auto',
          }}
        >
          {/* Left: folder tabs */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '0' }}>
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;

              return isActive ? (
                /* ── Active tab ─────────────────────────────────────── */
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  style={{
                    background: '#1A1A1A',
                    border: 'none',
                    borderRadius: 0,
                    clipPath: tab.id === 'all'
                      ? 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)'
                      : 'polygon(12px 0, calc(100% - 12px) 0, 100% 100%, 0 100%)',
                    padding: isMobile ? '4px 8px' : '7px 16px',
                    fontFamily: 'var(--font-helvetica-neue)',
                    fontSize: isMobile ? '10px' : '13px',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    marginBottom: '-1px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    lineHeight: 1,
                  }}
                >
                  {tab.label}
                </button>
              ) : (
                /* ── Inactive tab ────────────────────────────────────── */
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: isMobile ? '4px 8px' : '7px 16px',
                    color: '#6B6560',
                    fontFamily: 'var(--font-helvetica-neue)',
                    fontSize: isMobile ? '10px' : '13px',
                    fontWeight: 400,
                    cursor: 'pointer',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    lineHeight: 1,
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = '#1A1A1A';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = '#6B6560';
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right: Curious Mode toggle ───────────────────────────────── */}
          {!isMobile && (
            <button
              onClick={onToggleCuriousMode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#6B6560',
                background: 'transparent',
                border: '1px solid #E8E4DF',
                borderRadius: 4,
                padding: '5px 10px',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                marginLeft: 'auto',
                marginBottom: '7px',
              }}
            >
              {isCuriousMode ? '⊞ File View' : '✦ Curious Mode'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
