'use client';

import { useRouter } from 'next/navigation';
import { HyperText } from '@/components/ui/hyper-text';

type Tab = 'all' | 'work' | 'about' | 'experience';

interface FileTabNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'all',        label: 'All'        },
  { id: 'work',       label: 'Work'       },
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
];

/* ── Inline SVG: 2×2 grid icon ─────────────────────────────────────── */
function GridIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
    </svg>
  );
}

export default function FileTabNav({ activeTab, onTabChange }: FileTabNavProps) {
  const router = useRouter();

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

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1320px',
        marginInline: 'auto',
        position: 'relative',
        zIndex: 2, // ensure tabs render above container shadow/border
      }}
    >
      {/* ── Tab row ──────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: '0',
          paddingLeft: '0',
        }}
      >
        {/* Left: folder tabs */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '0' }}>
          {TABS.map((tab, index) => {
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
                  padding: '7px 16px',
                  fontFamily: 'var(--font-helvetica-neue)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  marginBottom: '-1px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  lineHeight: 1,
                }}
              >
                <HyperText
                  as="span"
                  animateOnHover={false}
                  startOnView={false}
                  delay={index * 80}
                  duration={600}
                  className="py-0 text-inherit text-[length:inherit]"
                  style={{ fontWeight: 'inherit' }}
                >
                  {tab.label}
                </HyperText>
              </button>
            ) : (
              /* ── Inactive tab ────────────────────────────────────── */
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '7px 16px',
                  color: '#6B6560',
                  fontFamily: 'var(--font-helvetica-neue)',
                  fontSize: '13px',
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
                <HyperText
                  as="span"
                  animateOnHover={false}
                  startOnView={false}
                  delay={index * 80}
                  duration={600}
                  className="py-0 text-inherit text-[length:inherit]"
                  style={{ fontWeight: 'inherit' }}
                >
                  {tab.label}
                </HyperText>
              </button>
            );
          })}
        </div>

        {/* Right: Node view placeholder ───────────────────────────── */}
        <div
          title="Coming soon"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.5,
            paddingBottom: '7px', /* align baseline with tab text */
            cursor: 'default',
            userSelect: 'none',
            marginLeft: 'auto',
          }}
        >
          <span style={{ color: 'var(--color-text-muted)', display: 'flex' }}>
            <GridIcon />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-fragment-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              lineHeight: 1,
            }}
          >
            Node view
          </span>
        </div>
      </div>
    </div>
  );
}
