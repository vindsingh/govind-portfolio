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
    <div>
      {/* ── Tab row ──────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: folder tabs */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;

            return isActive ? (
              /* ── Active tab ─────────────────────────────────────── */
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                style={{
                  /* Shape */
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%)',
                  borderRadius: '6px 0 0 0',
                  padding: '6px 28px 6px 16px', /* extra right padding to compensate clip */

                  /* Color */
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',

                  /* Border — top, left, right only; clip-path masks the corners */
                  outline: '1px solid var(--color-border)',
                  outlineOffset: '-1px',

                  /* The bottom edge merges with the container (no bottom border) */
                  borderBottom: 'none',

                  /* Typography */
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,

                  /* Layout */
                  cursor: 'pointer',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  lineHeight: 1,

                  /* No Tailwind transition needed — active tab doesn't animate */
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
                  padding: '6px 16px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 400,
                  cursor: 'pointer',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  lineHeight: 1,
                  transition: 'color var(--transition-base)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    'var(--color-text-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    'var(--color-text-secondary)';
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
            paddingBottom: '6px', /* align baseline with tab text */
            cursor: 'default',
            userSelect: 'none',
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

      {/* ── Separator line ────────────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'var(--color-border)',
        }}
      />
    </div>
  );
}
