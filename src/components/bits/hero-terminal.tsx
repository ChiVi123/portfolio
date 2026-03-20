'use client'

import { useEffect, useState } from 'react'

interface Line {
  type: 'cmd' | 'output' | 'blank'
  text: string
  delay: number // ms from start before this line begins typing
  speed?: number // ms per character (default 35)
}

const TERMINAL_LINES: Line[] = [
  { type: 'cmd', text: 'whoami', delay: 400, speed: 60 },
  { type: 'output', text: 'nguyen-hoang-chi-vi', delay: 900, speed: 20 },
  { type: 'blank', text: '', delay: 1100, speed: 0 },
  { type: 'cmd', text: 'cat skills.json | grep primary', delay: 1200, speed: 40 },
  { type: 'output', text: '"TypeScript"  ✓', delay: 1900, speed: 25 },
  { type: 'output', text: '"React"       ✓', delay: 2150, speed: 25 },
  { type: 'output', text: '"Next.js"     ✓', delay: 2400, speed: 25 },
  { type: 'blank', text: '', delay: 2600, speed: 0 },
  { type: 'cmd', text: 'git log --oneline -3', delay: 2700, speed: 40 },
  { type: 'output', text: 'a3f1c2e  feat: internship @ FPT', delay: 3300, speed: 18 },
  { type: 'output', text: '9b2d441  feat: pha-phim streaming', delay: 3550, speed: 18 },
  { type: 'output', text: 'c7e8f10  feat: mern-blog fullstack', delay: 3800, speed: 18 },
  { type: 'blank', text: '', delay: 4000, speed: 0 },
  { type: 'cmd', text: 'echo $STATUS', delay: 4100, speed: 55 },
  { type: 'output', text: '● AVAILABLE FOR WORK · now', delay: 4600, speed: 22 },
]

function useTypedLines(lines: Line[]) {
  const [state, setState] = useState<(string | true | null)[]>(lines.map(() => null))

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    lines.forEach((line, idx) => {
      if (line.type === 'blank') {
        timers.push(
          setTimeout(() => {
            setState((prev) => {
              const next = [...prev]
              next[idx] = true
              return next
            })
          }, line.delay),
        )
        return
      }

      const speed = line.speed ?? 35
      let charIdx = 0

      timers.push(
        setTimeout(() => {
          setState((prev) => {
            const next = [...prev]
            next[idx] = ''
            return next
          })

          const typeNext = () => {
            charIdx++
            const typed = line.text.slice(0, charIdx)
            setState((prev) => {
              const next = [...prev]
              next[idx] = charIdx >= line.text.length ? true : typed
              return next
            })
            if (charIdx < line.text.length) {
              timers.push(setTimeout(typeNext, speed))
            }
          }

          if (line.text.length > 0) {
            timers.push(setTimeout(typeNext, speed))
          } else {
            setState((prev) => {
              const next = [...prev]
              next[idx] = true
              return next
            })
          }
        }, line.delay),
      )
    })

    return () => timers.forEach(clearTimeout)
  }, [lines])

  return state
}

export function HeroTerminal() {
  const typed = useTypedLines(TERMINAL_LINES)
  const activeIdx = typed.findLastIndex((s) => s !== null && s !== true)

  return (
    <div className="ht-root" aria-hidden="true">
      {/* Window chrome */}
      <div className="ht-titlebar">
        <span className="ht-dot ht-dot--red" />
        <span className="ht-dot ht-dot--yellow" />
        <span className="ht-dot ht-dot--green" />
        <span className="ht-title">chi-vi@portfolio: ~</span>
      </div>

      {/* Terminal body */}
      <div className="ht-body">
        {TERMINAL_LINES.map((line, idx) => {
          const value = typed[idx]
          if (value === null) return null

          const displayText = value === true ? line.text : value
          const isTyping = value !== true && activeIdx === idx

          if (line.type === 'blank') return <div key={`${idx}-${line.text}-${line.type}`} className="ht-blank" />

          return (
            <div key={`${idx}-${line.text}-${line.type}`} className={`ht-line ht-line--${line.type}`}>
              {line.type === 'cmd' && <span className="ht-prompt">❯&nbsp;</span>}
              {line.type === 'output' && <span className="ht-indent" />}
              <span
                className={`ht-text${line.type === 'output' && line.text.includes('AVAILABLE') ? ' ht-text--green' : ''}`}
              >
                {displayText}
              </span>
              {isTyping && <span className="ht-cursor">█</span>}
            </div>
          )
        })}

        {typed.every((s) => s === true || s === null) && typed[typed.length - 1] === true && (
          <div className="ht-line ht-line--cmd">
            <span className="ht-prompt">❯&nbsp;</span>
            <span className="ht-cursor ht-cursor--idle">█</span>
          </div>
        )}
      </div>

      <style>{`
        /* ── Dark mode (default) ─────────────────────────── */
        .ht-root {
          width: 100%;
          max-width: 480px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(8, 12, 16, 0.92);
          backdrop-filter: blur(16px);
          box-shadow:
            0 0 0 1px rgba(0,240,255,0.06),
            0 24px 60px rgba(0,0,0,0.6),
            var(--accent-glow);
          overflow: hidden;
          font-family: var(--font-mono);
          position: relative;
        }

        .ht-titlebar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid var(--border);
        }

        .ht-dot {
          width: 11px; height: 11px; border-radius: 50%; flex-shrink: 0;
        }
        .ht-dot--red    { background: #ff5f57; }
        .ht-dot--yellow { background: #febc2e; }
        .ht-dot--green  { background: #28c840; }

        .ht-title {
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          margin-left: 6px;
          flex: 1;
          text-align: center;
        }

        .ht-body {
          padding: 18px 20px 22px;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .ht-line {
          display: flex;
          align-items: baseline;
          font-size: 13px;
          line-height: 1.7;
          white-space: pre;
        }

        /* Dark: cmd = sáng, output = muted */
        .ht-line--cmd    { color: #e8f4f8; }
        .ht-line--output { color: #5a7a8a; }

        .ht-prompt {
          color: var(--accent);
          flex-shrink: 0;
          user-select: none;
        }

        .ht-indent {
          display: inline-block;
          width: 18px;
          flex-shrink: 0;
        }

        .ht-text--green { color: #00ff88; }

        .ht-blank { height: 8px; }

        .ht-cursor {
          color: var(--accent);
          font-size: 13px;
          animation: ht-blink 0.7s step-end infinite;
          margin-left: 1px;
        }

        .ht-cursor--idle { opacity: 1; }

        @keyframes ht-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* Scanline overlay — chỉ hiện dark mode */
        .ht-body::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,240,255,0.015) 2px,
            rgba(0,240,255,0.015) 4px
          );
          pointer-events: none;
          border-radius: inherit;
        }

        /* ── Light mode overrides ────────────────────────── */
        :global(.light) .ht-root {
          background: #1a1f2e;
          border-color: rgba(0, 100, 200, 0.25);
          box-shadow:
            0 0 0 1px rgba(0, 100, 200, 0.08),
            0 8px 32px rgba(0, 0, 0, 0.18),
            0 2px 8px rgba(0, 0, 0, 0.12);
        }

        :global(.light) .ht-titlebar {
          background: rgba(0, 0, 0, 0.15);
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }

        :global(.light) .ht-title {
          color: rgba(255, 255, 255, 0.4);
        }

        :global(.light) .ht-line--cmd {
          color: #e2e8f0;
        }

        :global(.light) .ht-line--output {
          color: #94a3b8;
        }

        :global(.light) .ht-prompt {
          color: #60a5fa;
        }

        :global(.light) .ht-cursor {
          color: #60a5fa;
        }

        :global(.light) .ht-text--green {
          color: #4ade80;
        }

        :global(.light) .ht-body::after {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.012) 2px,
            rgba(255,255,255,0.012) 4px
          );
        }
      `}</style>
    </div>
  )
}
