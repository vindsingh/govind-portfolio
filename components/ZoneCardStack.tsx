'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface Zone {
  logo: string
  accentColor: string
  label: string
  description: string
}

const zones: Zone[] = [
  {
    logo: '/projects/form/forbody.svg',
    accentColor: '#C4704A',
    label: 'THE INTIMATE SCALE',
    description: 'Work that touches skin, supports movement, restores ability, and extends what the body can do.',
  },
  {
    logo: '/projects/form/forspace.svg',
    accentColor: '#4A7C5C',
    label: 'THE CONTEXTUAL SCALE',
    description: 'Work that shapes the rooms, objects, and environments we move through every day.',
  },
  {
    logo: '/projects/form/forsystem.svg',
    accentColor: '#4A6A9C',
    label: 'THE MACRO SCALE',
    description: 'Work that questions how things are built and reimagines the structures that organise everyday life.',
  },
]

interface CardProps {
  zone: Zone
  i: number
  scrollYProgress: MotionValue<number>
}

function Card({ zone, i, scrollYProgress }: CardProps) {
  const targetScale = 1 - (2 - i) * 0.06
  const range = [i / 3, 1]
  const scale = useTransform(scrollYProgress, range, [1, targetScale])

  return (
    <motion.div
      style={{
        scale,
        top: `calc(80px + ${i * 16}px)`,
        position: 'sticky',
        marginBottom: 0,
      }}
      className="w-full h-[360px] md:h-[480px] bg-[#FFFFFF] border border-[#E8E4DF] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden flex flex-row"
    >
      {/* LEFT COLUMN */}
      <div className="w-[40%] p-8 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={zone.logo}
          alt={zone.label}
          className="h-[64px] object-contain block"
        />
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-[60%] py-8 pr-8 pl-0 flex items-center">
        <div
          style={{ borderLeft: `3px solid ${zone.accentColor}` }}
          className="pl-6 h-full flex flex-col justify-center"
        >
          <div
            style={{ fontFamily: 'var(--font-fragment-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A09890', marginBottom: '12px' }}
          >
            {zone.label}
          </div>
          <p
            style={{ fontFamily: 'var(--font-space-mono)' }}
            className="text-[clamp(18px,2vw,24px)] font-normal text-[#1A1A1A] leading-[1.45]"
          >
            {zone.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ZoneCardStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] w-full flex flex-col gap-12"
    >
      {zones.map((zone, i) => (
        <Card
          key={zone.label}
          zone={zone}
          i={i}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  )
}
