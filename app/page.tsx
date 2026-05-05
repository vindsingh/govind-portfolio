'use client'

import { useState } from 'react'
import { Nav } from '../components/Nav'
import { BentoGrid } from '../components/BentoGrid'
import { FilterSelector } from '../components/FilterSelector'
import { PillFilter } from '../components/PillFilter'
import { ToggleProvider, useToggle } from '../components/ToggleSwitch'
import { WorkInProgress } from '../components/WorkInProgress'

function HomeContent() {
  const { mode } = useToggle()
  const [filter, setFilter] = useState('everything')

  return (
    <main>
      <Nav />
      <div style={{
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 48px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 10vw, 96px)',
            fontWeight: '500',
            letterSpacing: '-0.04em',
            lineHeight: '1.0',
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}>
            Govind<br />Ahluwalia
          </h1>
          <p style={{
            fontSize: 'clamp(13px, 2vw, 15px)',
            color: 'var(--text-secondary)',
            maxWidth: '400px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-body)',
          }}>
            Designer working in rooms where design
            does not have a seat yet.
          </p>
        </div>

        <div>
          {mode === 'curious' ? (
            <FilterSelector
              selected={filter}
              onChange={setFilter}
            />
          ) : (
            <PillFilter
              selected={filter}
              onChange={setFilter}
            />
          )}
          <BentoGrid filter={filter} />
        </div>
      </div>
      <WorkInProgress />
    </main>
  )
}

export default function Home() {
  return (
    <ToggleProvider>
      <HomeContent />
    </ToggleProvider>
  )
}
