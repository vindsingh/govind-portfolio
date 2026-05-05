'use client'

import { BentoCard } from './BentoCard'

const cards = [
  {
    id: 'falcon',
    tag: 'Thesis 2026 · Venture',
    title: 'Falcon',
    description: 'A shared interpretation layer between investors and founders. The sentence that was missing.',
    href: '/falcon',
    size: 'large' as const,
    category: 'built' as const,
  },
  {
    id: 'cpkc',
    tag: 'Enterprise · CPKC',
    title: 'Building design inside a railroad',
    stat: '105+',
    statLabel: 'Community of Practice members',
    href: '/cpkc',
    size: 'medium' as const,
    category: 'built' as const,
  },
  {
    id: 'form',
    tag: 'Exhibition Lead · OCAD · 2026',
    title: 'FOR/M',
    description: 'Led strategy, sponsorship, and full site development for the OCAD Industrial Design graduating exhibition.',
    href: 'https://formgradex.vercel.app',
    size: 'medium' as const,
    category: 'built' as const,
  },
  {
    id: 'about',
    tag: 'New Delhi → Toronto',
    title: 'About',
    description: 'Designer working in rooms where design does not have a seat yet.',
    href: undefined,
    size: 'small' as const,
    category: 'who' as const,
  },
  {
    id: 'process',
    tag: 'Process',
    title: 'I find the gap before anyone names it',
    href: undefined,
    size: 'small' as const,
    category: 'think' as const,
  },
  {
    id: 'sketchbook',
    tag: 'By hand',
    title: 'Sketchbook',
    description: 'Everything starts on paper. Logo explorations, system maps, half-ideas.',
    href: undefined,
    size: 'medium' as const,
    category: 'think' as const,
  },
]

const categoryMap: Record<string, string[]> = {
  everything: ['built', 'think', 'who'],
  built: ['built'],
  think: ['think'],
  who: ['who'],
}

interface BentoGridProps {
  filter: string
}

export function BentoGrid({ filter }: BentoGridProps) {
  const visible = categoryMap[filter] || ['built', 'think', 'who']
  const visibleCards = cards.filter(c => visible.includes(c.category))

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
      gap: '10px',
      width: '100%',
    }}>
      {visibleCards.map(card => (
        <BentoCard
          key={card.id}
          tag={card.tag}
          title={card.title}
          description={card.description}
          href={card.href}
          size={card.size}
          stat={card.stat}
          statLabel={card.statLabel}
          category={card.category}
        />
      ))}
    </div>
  )
}
