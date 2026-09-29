'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export type Tab = 'all' | 'work' | 'about' | 'experience';

interface FileTabNavProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
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

const TAB_HREFS: Record<Tab, string> = {
  all: '/',
  work: '/?tab=work',
  about: '/about',
  experience: '/experience',
};

function FileTabNavContent({
  activeTab,
  onTabChange,
  isCuriousMode,
  filter,
  setFilter,
}: FileTabNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const isHome = pathname === '/';
  const effectiveActiveTab: Tab = activeTab ?? (() => {
    if (pathname === '/about') return 'about';
    if (pathname === '/experience') return 'experience';
    if (isHome) {
      return searchParams?.get('tab') === 'work' ? 'work' : 'all';
    }
    return 'all';
  })();

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
        zIndex: 2,
        paddingTop: 0,
        marginTop: 0,
      }}
    >
      {isCuriousMode ? (
        /* Curious Mode sentence filter */
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
        </div>
      ) : (
        /* Tab row */
        <div
          className="tab-row-scroll"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: '0',
            paddingLeft: '0',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Left: folder tabs */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '0' }}>
            {TABS.map((tab) => {
              const isActive = tab.id === effectiveActiveTab;
              const href = TAB_HREFS[tab.id];

              const activeStyle: React.CSSProperties = {
                background: '#1A1A1A',
                border: 'none',
                clipPath: tab.id === 'all'
                  ? 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)'
                  : 'polygon(12px 0, calc(100% - 12px) 0, 100% 100%, 0 100%)',
                borderRadius: '0',
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
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              };

              const inactiveStyle: React.CSSProperties = {
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
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              };

              // On home page, switching between 'all' and 'work' uses router.replace(..., { scroll: false })
              if (isHome && (tab.id === 'all' || tab.id === 'work')) {
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      router.replace(href, { scroll: false });
                      onTabChange?.(tab.id);
                    }}
                    style={isActive ? activeStyle : inactiveStyle}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#1A1A1A';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#6B6560';
                    }}
                  >
                    {tab.label}
                  </button>
                );
              }

              // On all other routes (or for about/experience tabs on home), render a plain Link
              return (
                <Link
                  key={tab.id}
                  href={href}
                  style={isActive ? activeStyle : inactiveStyle}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#1A1A1A';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#6B6560';
                  }}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FileTabNav(props: FileTabNavProps) {
  return (
    <Suspense fallback={null}>
      <FileTabNavContent {...props} />
    </Suspense>
  );
}
