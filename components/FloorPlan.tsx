'use client';

import React, { useState } from 'react';

// Student position data (x/y in viewBox coordinate space 0-138 x 0-98)
const students = [
  { name: "Cristina", x: 12, y: 25, zone: "spaces" },
  { name: "Darius", x: 12, y: 34, zone: "spaces" },
  { name: "Annie", x: 12, y: 43, zone: "spaces" },
  { name: "Sebastian", x: 12, y: 52, zone: "spaces" },
  { name: "Yasa", x: 12, y: 61, zone: "spaces" },
  { name: "Leah", x: 12, y: 70, zone: "spaces" },
  { name: "Ethan", x: 18, y: 35, zone: "spaces" },
  { name: "Ryland", x: 18, y: 44, zone: "spaces" },
  { name: "Frank", x: 18, y: 53, zone: "spaces" },
  { name: "Kasnish", x: 18, y: 62, zone: "spaces" },
  { name: "Aki", x: 17, y: 71, zone: "spaces" },
  { name: "Ethan", x: 22, y: 72, zone: "spaces" },
  { name: "Samantha", x: 28, y: 8, zone: "systems" },
  { name: "Yelim", x: 40, y: 8, zone: "systems" },
  { name: "Nicky", x: 52, y: 8, zone: "systems" },
  { name: "Alberto", x: 64, y: 8, zone: "systems" },
  { name: "Connie", x: 76, y: 8, zone: "systems" },
  { name: "Seerat", x: 88, y: 8, zone: "systems" },
  { name: "Rita", x: 95, y: 8, zone: "systems" },
  { name: "Gabriel", x: 32, y: 18, zone: "systems" },
  { name: "Brandon", x: 42, y: 22, zone: "systems" },
  { name: "Jason", x: 52, y: 16, zone: "systems" },
  { name: "Mabel", x: 30, y: 28, zone: "systems" },
  { name: "Michael", x: 65, y: 22, zone: "systems" },
  { name: "Francis", x: 108, y: 18, zone: "systems" },
  { name: "Alex", x: 62, y: 24, zone: "body" },
  { name: "Noor", x: 28, y: 42, zone: "systems" },
  { name: "Harsh", x: 38, y: 42, zone: "systems" },
  { name: "David", x: 55, y: 42, zone: "systems" },
  { name: "Kenny", x: 65, y: 42, zone: "systems" },
  { name: "Max", x: 75, y: 42, zone: "systems" },
  { name: "Senthurri", x: 38, y: 50, zone: "systems" },
  { name: "Arash", x: 55, y: 50, zone: "systems" },
  { name: "Azkiya", x: 65, y: 50, zone: "systems" },
  { name: "Govind", x: 75, y: 50, zone: "systems" },
  { name: "Giancarlo", x: 28, y: 62, zone: "body" },
  { name: "Fatima", x: 28, y: 70, zone: "body" },
  { name: "Yeajin", x: 42, y: 62, zone: "body" },
  { name: "Lily", x: 42, y: 70, zone: "body" },
  { name: "Nmeesa", x: 55, y: 62, zone: "body" },
  { name: "Sana", x: 55, y: 70, zone: "body" },
  { name: "Jenny", x: 68, y: 62, zone: "body" },
  { name: "Jug", x: 68, y: 72, zone: "body" },
  { name: "Val", x: 25, y: 82, zone: "body" },
  { name: "Lin Cao", x: 42, y: 82, zone: "body" },
  { name: "Kai", x: 58, y: 82, zone: "body" },
  { name: "Bani", x: 68, y: 82, zone: "body" },
  { name: "Octavian", x: 118, y: 45, zone: "spaces" },
  { name: "Maxx", x: 95, y: 62, zone: "spaces" },
] as const;

function gridPoints(
  count: number,
  x: number,
  y: number,
  width: number,
  height: number,
  cols: number
): { cx: number; cy: number }[] {
  const rows = Math.ceil(count / cols)
  const xGap = width / (cols + 1)
  const yGap = height / (rows + 1)
  const points: { cx: number; cy: number }[] = []
  for (let i = 0; i < count; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    points.push({
      cx: x + xGap * (col + 1),
      cy: y + yGap * (row + 1),
    })
  }
  return points
}

type Student = { name: string; x: number; y: number; zone: "spaces" | "systems" | "body" };

const ZONE_COLORS = {
  body: '#F15C2F',
  spaces: '#039949',
  systems: '#80BEE0',
} as const;

export default function FloorPlan() {
  const [hoveredStudent, setHoveredStudent] = useState<Student | null>(null);

  // Generate points on the 138 x 98 coordinate space
  const spacesPoints = gridPoints(13, 8.3, 23.3, 20, 50, 2);
  const systemsPoints = gridPoints(21, 35, 10, 70, 40, 7);
  const bodyPoints = gridPoints(16, 26.6, 63.3, 56.6, 33.3, 4);

  // Divide existing students into their zones and slice/pad to count
  const spacesStudents = students.filter(s => s.zone === 'spaces').slice(0, 13);
  const systemsStudents = students.filter(s => s.zone === 'systems').slice(0, 21);
  const rawBody = students.filter(s => s.zone === 'body');
  const bodyStudents = [...rawBody, { name: "Avery", zone: "body" as const }, { name: "Jordan", zone: "body" as const }, { name: "Taylor", zone: "body" as const }].slice(0, 16);

  // Zip students with calculated points
  const mappedSpaces: Student[] = spacesStudents.map((s, i) => ({ name: s.name, zone: s.zone, x: spacesPoints[i].cx, y: spacesPoints[i].cy }));
  const mappedSystems: Student[] = systemsStudents.map((s, i) => ({ name: s.name, zone: s.zone, x: systemsPoints[i].cx, y: systemsPoints[i].cy }));
  const mappedBody: Student[] = bodyStudents.map((s, i) => ({ name: s.name, zone: s.zone, x: bodyPoints[i].cx, y: bodyPoints[i].cy }));

  const allMappedStudents: Student[] = [...mappedSpaces, ...mappedSystems, ...mappedBody];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
      }}
    >

      {/* SVG Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '138 / 98',
          overflow: 'visible',
        }}
      >
        <svg
          viewBox="0 0 138 98"
          width="100%"
          height="100%"
          style={{
            display: 'block',
            overflow: 'visible',
          }}
        >
          {/* L-shaped Building Footprint */}
          <path
            d="M0.125137 0.125007L109.535 0.125V34.48C109.535 34.48 118.213 34.289 123.214 35.6289C127.416 36.7549 129.454 36.9769 132.215 39.7381C134.705 42.2282 135.801 43.9214 136.766 47.5229C137.769 51.2666 136.229 57.3101 136.229 57.3101H129.454V68.8071H91.4407V97.0299L21.402 97.2523C21.402 97.2523 21.6515 93.6038 21.402 91.3758C21.1525 89.1477 20.932 87.9331 20.1243 85.8416C19.0454 83.0481 17.5764 81.7305 15.0966 80.0516C12.6211 78.3756 10.8119 78.0494 7.86703 77.535C3.94175 76.8495 0.125 77.9825 0.125 77.9825L0.125137 0.125007Z"
            fill="#F9F7F5"
            stroke="var(--color-border-strong)"
            strokeWidth="0.5"
          />

          {/* Student Position Circles */}
          {allMappedStudents.map((student, idx) => {
            const isHovered = hoveredStudent?.name === student.name && hoveredStudent?.x === student.x && hoveredStudent?.y === student.y;
            const isAnyHovered = hoveredStudent !== null;
            const dotColor = ZONE_COLORS[student.zone as keyof typeof ZONE_COLORS];
            
            // Visual accent logic: dim other dots slightly if one is hovered
            const opacity = isAnyHovered ? (isHovered ? 1 : 0.4) : 1;

            return (
              <circle
                key={`${student.name}-${idx}`}
                cx={student.x}
                cy={student.y}
                r={isHovered ? 2.5 : 1.8}
                fill={dotColor}
                stroke="#FFFFFF"
                strokeWidth={isHovered ? 0.6 : 0.4}
                style={{
                  cursor: 'pointer',
                  opacity,
                  transition: 'r 150ms ease, stroke-width 150ms ease, opacity 150ms ease',
                }}
                onMouseEnter={() => setHoveredStudent(student)}
                onMouseLeave={() => setHoveredStudent(null)}
              />
            );
          })}
        </svg>

        {/* Dynamic Tooltip */}
        {hoveredStudent && (
          <div
            style={{
              position: 'absolute',
              left: `${(hoveredStudent.x / 138) * 100}%`,
              top: `${(hoveredStudent.y / 98) * 100}%`,
              transform: 'translate(-50%, -100%) translateY(-10px)',
              pointerEvents: 'none',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-fragment-mono), monospace',
              boxShadow: 'var(--shadow-file)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 10px',
              whiteSpace: 'nowrap',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {hoveredStudent.name}
            </div>
            <div
              style={{
                color: ZONE_COLORS[hoveredStudent.zone],
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 500,
              }}
            >
              FOR/{hoveredStudent.zone.toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Legend Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '24px',
          borderTop: '1px solid var(--color-border)',
          paddingTop: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: ZONE_COLORS.body,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-fragment-mono), monospace',
              fontSize: 'var(--text-xs)',
              textTransform: 'uppercase',
              color: '#000000',
              letterSpacing: '0.03em',
            }}
          >
            FOR/BODY · 16 designers
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: ZONE_COLORS.spaces,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-fragment-mono), monospace',
              fontSize: 'var(--text-xs)',
              textTransform: 'uppercase',
              color: '#000000',
              letterSpacing: '0.03em',
            }}
          >
            FOR/SPACES · 13 designers
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: ZONE_COLORS.systems,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-fragment-mono), monospace',
              fontSize: 'var(--text-xs)',
              textTransform: 'uppercase',
              color: '#000000',
              letterSpacing: '0.03em',
            }}
          >
            FOR/SYSTEMS · 21 designers
          </span>
        </div>
      </div>
    </div>
  );
}
