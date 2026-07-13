'use client'
import { useEffect, useState } from 'react'

const CHARS = '@#%*+><'
const FINAL = `@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@#%***%%#@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@%*++++++++++*#@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@%+++++++++++++++*@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@*+++++++++++++++++*@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@%+++++++%##*++++++++%@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@*+++++%#@@@@#*++++++*@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@++++****%%%**%%*++++*@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@*++****+*%%***%%*+++%@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@%+*%%***%@#%**%#%+++@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@+*###%%#@@######*+@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@*%%%%%***%#%##%*@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@%*%%**+****%%*+%@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@+*******%%%*+*@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@#+*%%**%%%*++%@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@%+++++++++*%**@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@%**+++++*%%****#@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@%+******%%*******%%#@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@#***********+*********%%%#@@@@@@@@@@@
@@@@@@@@@@@@@#%*++++******+++++++*****%%%%%%@@@@@@@@@
@@@@@@@@@@@%*****++++*%%++++++++******%%***%%#@@@@@@@
@@@@@@@@@#**********+*%*++++***************%%%%@@@@@@
@@@@@@@@%************+++++*******************%*#@@@@@
@@@@@@@%*************++*************************#@@@@
@@@@@@#**************+**************************%@@@@
@@@@@@%+*+********+*++**************+++++********#@@@
@@@@@@*++++*********+***********+**++++++++******%@@@
@@@@@@*+++++********++*********+++++++++++++******@@@
@@@@@#*++++++*+++++*+++****+++++++++++++++********#@@
@@@@@%+++++++++++++++++++*+++++++++++++++**+******#@@
@@@@@*+++++++++++++++++++++++++++++++++++++*******@@@`

function getCharColor(char: string): string {
  if (char === '\n' || char === ' ') return 'transparent'
  if (char === '@') return '#020202'
  if (char === '#' || char === '%') return '#2a2a2a'
  if (char === '*') return '#666666'
  if (char === '+') return '#aaaaaa'
  if (char === '>') return '#cccccc'
  if (char === '<') return '#cccccc'
  return '#ffffff'
}

export default function AsciiScramble() {
  const [display, setDisplay] = useState<string[]>([])
  const [locked, setLocked] = useState<Set<number>>(new Set())
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplay(FINAL.split('').map(c => c === '\n' ? '\n' : CHARS[Math.floor(Math.random() * CHARS.length)]))
    // 200ms mount delay before starting the scramble animation
    const delay = setTimeout(() => {
      const positions = FINAL.split('').map((_, i) => i).filter(i => FINAL[i] !== '\n')
      // Shuffle positions to lock random batches rather than strictly top-to-bottom
      const shuffled = [...positions].sort(() => Math.random() - 0.5)
      let remaining = shuffled

      const scramble = setInterval(() => {
        setDisplay(prev => prev.map((c, i) =>
          c === '\n' || locked.has(i) ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
        ))
      }, 40)

      const reveal = setInterval(() => {
        const batch = remaining.splice(0, 40)
        batch.forEach(i => locked.add(i))
        setLocked(new Set(locked))
        setDisplay(prev => {
          const next = [...prev]
          batch.forEach(i => { next[i] = FINAL[i] })
          return next
        })
        if (remaining.length === 0) {
          clearInterval(scramble)
          clearInterval(reveal)
          setDone(true)
        }
      }, 80)

      return () => {
        clearInterval(scramble)
        clearInterval(reveal)
      }
    }, 200)

    return () => {
      clearTimeout(delay)
    }
  }, [])

  return (
    <pre style={{
      fontFamily: 'var(--font-fragment-mono), monospace',
      fontSize: '6px',
      lineHeight: '1.2',
      color: '#FFFFFF',        // explicit white, not inherit
      background: 'transparent',
      margin: 0,
      flexShrink: 0,
      overflow: 'hidden',
      whiteSpace: 'pre',
    }}>
      {done
        ? FINAL.split('').map((char, i) =>
            char === '\n'
              ? '\n'
              : <span key={i} style={{ color: getCharColor(char) }}>{char}</span>
          )
        : display.map((char, i) =>
            char === '\n'
              ? '\n'
              : <span key={i} style={{ color: locked.has(i) ? getCharColor(FINAL[i]) : '#111111' }}>{char}</span>
          )
      }
    </pre>
  )
}
