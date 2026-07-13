'use client'

import { useEffect, useRef } from 'react'

const DATA = [
  { label: '4×2 ft', pct: 51, desc: 'Table + small product' },
  { label: '4×4 ft', pct: 22.4, desc: 'Larger prototype or interactive' },
  { label: '6×4 ft', pct: 10.2, desc: 'Furniture or large-scale object' },
  { label: '8×8 ft+', pct: 16.4, desc: 'Installation or projection' },
]

const COLORS = [
  '#4A8CC4', // for/system blue — smallest footprint, most common
  '#3D9E5A', // for/space green — medium footprint
  '#D85A30', // for/body orange — large footprint, body-scale work
  '#C0B8A8', // neutral taupe — installations and special cases
]

export default function FootprintChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)
  const triggered = useRef(false)

  useEffect(() => {
    let Chart: any
    import('chart.js').then((m) => {
      const {
        Chart: C, ArcElement, Tooltip, Legend, DoughnutController
      } = m
      C.register(ArcElement, Tooltip, Legend, DoughnutController)
      Chart = C

      if (!canvasRef.current || chartRef.current) return

      chartRef.current = new Chart(canvasRef.current, {
        type: 'doughnut',
        data: {
          labels: DATA.map(d => d.label),
          datasets: [{
            data: DATA.map(d => d.pct),
            backgroundColor: COLORS,
            borderColor: '#ffffff',
            borderWidth: 3,
            hoverOffset: 6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '58%',
          animation: { duration: 0 },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}%`
              }
            }
          }
        }
      })
    })

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current && chartRef.current) {
        triggered.current = true
        chartRef.current.options.animation = { duration: 1000, easing: 'easeInOutQuart' }
        chartRef.current.update()
      }
    }, { threshold: 0.3 })

    if (canvasRef.current) observer.observe(canvasRef.current)
    return () => {
      observer.disconnect()
      chartRef.current?.destroy()
      chartRef.current = null
    }
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontFamily: 'var(--font-fragment-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#000000', fontWeight: 500 }}>
          project footprint
        </span>
        <span style={{ fontFamily: 'var(--font-fragment-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
          49 responses
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '160px', aspectRatio: '1' }}>
          <canvas ref={canvasRef} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {DATA.map((d, i) => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: COLORS[i], flexShrink: 0, marginTop: '3px' }} />
              <div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-helvetica)', fontWeight: 900, color: '#000000', lineHeight: 1.2 }}>
                  {Math.round(d.pct)}% · {d.label}
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-helvetica)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {d.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '0.5px solid var(--border)', marginTop: '16px', paddingTop: '12px' }}>
        <p style={{ fontFamily: 'var(--font-fragment-mono)', fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
          Over half the cohort needed desk-scale setups. Larger physical footprints shaped zone allocation directly.
        </p>
      </div>
    </div>
  )
}
