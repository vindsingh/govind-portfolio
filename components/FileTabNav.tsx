'use client';

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
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;

            return isActive ? (
              /* ── Active tab ─────────────────────────────────────── */
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                style={{
                  background: '#FFFFFF',
                  borderLeft: '1px solid #E8E4DF',
                  borderTop: '1px solid #E8E4DF',
                  borderRight: '1px solid #E8E4DF',
                  borderBottom: 'none',
                  borderRadius: '6px 6px 0 0',
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)',
                  padding: '7px 16px',
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#1A1A1A',
                  position: 'relative',
                  zIndex: 1,
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
                onClick={() => onTabChange(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '7px 16px',
                  color: '#6B6560',
                  fontFamily: 'var(--font-geist-sans)',
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
                {tab.label}
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
              fontFamily: 'var(--font-geist-mono)',
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
