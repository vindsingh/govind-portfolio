'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AsciiScramble from './AsciiScramble'

const MailIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', color: '#FFFFFF' }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
  </svg>
)

const ASCII_ART = `@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@%#*****#%%@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@%****+++++****#@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@*+++++++++++*+*+*@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@++++++++*+++++++++*@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@#++++++#@@@%#+++++++#@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@+++++*%@@@@@@%*+++++*@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@++++####%%%###%#++++*@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@#++######@%#*##@#+++%@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@%+#@@%%%@@@@%%@@@*+*@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@*#@@@@@@@@@@@@@@#*@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@#%%%@%**#%@%@@%%@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@%*%%**####*%%#*%@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@*#%%%###%@%#+*@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@**%%%%%%%#+#%@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@*+++++++*%@##@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@####***##%%####%@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@#*######%%#######%%%@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@##*##%%####**##**###%%%%%%@@@@@@@@@
@@@@@@@@@@@@@@@%##**+*#%%##*++++++*#####%%%%%%@@@@@@@
@@@@@@@@@@@@%########**#%%*+++***##%#%##%%%#%%%%@@@@@
@@@@@@@@@@@%##########**%******####%%%##%##%%%%%%@@@@
@@@@@@@@@@%############***########%##%######%#%%%%@@@
@@@@@@@@@%#############*##########%#############%%%@@
@@@@@@@@@############*#*##############*##*########%@@
@@@@@@@@%#*#*#########**##########*##*******#*####%%@
@@@@@@@@#****#########**##########**#*++****#######%@
@@@@@@@@#*+****#####**#**######*******+++******#####@
@@@@@@@%#**++********#****####******+*++****########%
@@@@@@@%#**+++*************#********++++***#**######%
@@@@@@@##**+++****************+***+**+++****##*#####@`

const DEFAULT_LINES = [
  '> Hi, I am Govind Singh Ahluwalia.',
  '> Thinks in systems. Builds from zero.',
  '> Asks too many questions.',
]

export default function TerminalTypewriter({
  textFontSize = '12px',
  lines = DEFAULT_LINES,
  showIconsOnComplete = false,
  children
}: {
  textFontSize?: string
  lines?: string[]
  showIconsOnComplete?: boolean
  children?: React.ReactNode
}) {
  const [displayed, setDisplayed] = useState<string[]>(() => Array(lines.length).fill(''))
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const delay = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(delay)
  }, [])

  useEffect(() => {
    if (!started) return
    if (lineIndex >= lines.length) {
      setIsComplete(true)
      return
    }

    const currentLine = lines[lineIndex]

    if (charIndex < currentLine.length) {
      const interval = setInterval(() => {
        setDisplayed(prev => {
          const updated = [...prev]
          updated[lineIndex] = currentLine.slice(0, charIndex + 1)
          return updated
        })
        setCharIndex(c => c + 1)
      }, 45)
      return () => clearInterval(interval)
    } else {
      const pause = setTimeout(() => {
        setLineIndex(l => l + 1)
        setCharIndex(0)
      }, 150)
      return () => clearTimeout(pause)
    }
  }, [started, lineIndex, charIndex, lines])

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', height: '100%' }}>
      <AsciiScramble />

      <div style={{ flex: 1, fontFamily: 'var(--font-fragment-mono), monospace', fontSize: textFontSize, lineHeight: '1.6' }}>
        {lines.map((_, i) => (
          <div key={i}>
            {displayed[i]}
            {i === lineIndex && !isComplete && (
              <span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
            )}
          </div>
        ))}
        {children}

        {showIconsOnComplete && isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ display: 'flex', gap: '8px', marginTop: '16px' }}
          >
            <div
              role="button"
              className="term-icon-btn"
              style={{ cursor: 'pointer' }}
              onClick={e => {
                e.stopPropagation();
                window.location.href = 'mailto:ahluwaliagovindsingh@gmail.com';
              }}
            >
              <MailIcon size={14} />
            </div>
            <div
              role="button"
              className="term-icon-btn"
              style={{ cursor: 'pointer' }}
              onClick={e => {
                e.stopPropagation();
                window.open('https://linkedin.com/in/govindsinghahluwalia', '_blank', 'noopener,noreferrer');
              }}
            >
              <LinkedinIcon size={14} />
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .term-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
          text-decoration: none;
          transition: background 0.15s;
        }
        .term-icon-btn:hover {
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  )
}
