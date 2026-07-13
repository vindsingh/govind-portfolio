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
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    setMounted(true);
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
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#111111',
            borderRadius: '0',
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)',
            padding: '6px 28px 6px 14px',
            color: '#FFFFFF',
            marginBottom: '-1px',
          }}>
            <span style={{
              fontFamily: 'var(--font-fragment-mono)',
              fontSize: '11px',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}>
              I am curious about
            </span>
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <select
                value={filter || 'everything'}
                onChange={e => setFilter?.(e.target.value as any)}
                style={{
                  fontFamily: 'var(--font-fragment-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  paddingRight: '14px',
                  textDecoration: 'underline',
                  textDecorationStyle: 'dotted',
                  textDecorationColor: 'rgba(255,255,255,0.5)',
                  textUnderlineOffset: '3px',
                }}
              >
                <option value="everything" style={{ background: '#111111' }}>Everything</option>
                <option value="process" style={{ background: '#111111' }}>How things start</option>
                <option value="work" style={{ background: '#111111' }}>What gets built</option>
                <option value="personal" style={{ background: '#111111' }}>The person behind the work</option>
              </select>
              <svg
                width="12" height="8" viewBox="0 0 12 8"
                fill="none" style={{ position: 'absolute', right: 0, flexShrink: 0, pointerEvents: 'none' }}
              >
                <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {mounted && !isMobile && onToggleCuriousMode && (
            <button
              onClick={onToggleCuriousMode}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: '8px',
                border: '0.5px solid #000000',
                background: 'transparent',
                color: '#000000',
                padding: '5px 18px',
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                minWidth: '140px',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginBottom: '7px',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget
                btn.style.background = '#000000'
                btn.style.color = '#FFFFFF'
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget
                btn.style.background = 'transparent'
                btn.style.color = '#000000'
              }}
            >
              {isCuriousMode ? 'File View' : 'Curious Mode'}
            </button>
          )}
        </div>
      ) : (
        /* ── Tab row ──────────────────────────────────────────────────── */
        <div
          className="tab-row-scroll"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: isMobile ? '4px' : '0',
            paddingLeft: '0',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Left: folder tabs */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: isMobile ? '4px' : '0' }}>
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
                    clipPath: isMobile ? 'none' : (
                      tab.id === 'all'
                        ? 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)'
                        : 'polygon(12px 0, calc(100% - 12px) 0, 100% 100%, 0 100%)'
                    ),
                    borderRadius: isMobile ? '6px 6px 0 0' : '0',
                    padding: isMobile ? '6px 12px' : '7px 16px',
                    fontFamily: 'var(--font-helvetica-neue)',
                    fontSize: isMobile ? '11px' : '13px',
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
                    padding: isMobile ? '6px 12px' : '7px 16px',
                    color: '#6B6560',
                    fontFamily: 'var(--font-helvetica-neue)',
                    fontSize: isMobile ? '11px' : '13px',
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
          {mounted && !isMobile && onToggleCuriousMode && (
            <button
              onClick={onToggleCuriousMode}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: '8px',
                border: '0.5px solid #000000',
                background: 'transparent',
                color: '#000000',
                padding: '5px 18px',
                fontFamily: 'var(--font-fragment-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                minWidth: '140px',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginBottom: '7px',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget
                btn.style.background = '#000000'
                btn.style.color = '#FFFFFF'
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget
                btn.style.background = 'transparent'
                btn.style.color = '#000000'
              }}
            >
              {isCuriousMode ? 'File View' : 'Curious Mode'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
