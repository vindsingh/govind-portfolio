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
        padding: '64px 48px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>

        <div style={{ marginBottom: '16px' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: '500',
            letterSpacing: '-0.04em',
            lineHeight: '1.0',
            color: 'var(--text-primary)',
            marginBottom: '20px',
          }}>
            Govind<br />Ahluwalia
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            maxWidth: '400px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-body)',
          }}>
            Designer working in rooms where design
            does not have a seat yet.
          </p>
        </div>

        <div style={{ marginTop: '64px' }}>
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
