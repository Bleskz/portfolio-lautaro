import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import useReducedMotion from '../hooks/useReducedMotion'
import { C } from '../theme/colors'

// Scrolls smoothly to the section with the given id
function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Returns Framer Motion props for a staggered fade-up entrance
function fadeUp(delay) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }
}

// Characters used in data stream columns — hex digits + terminal symbols
const STREAM_CHARS = '0123456789ABCDEF01./:#><|_~'

// Single falling column — characters randomly flicker as it scrolls down
function DataColumn({ left, delay, speed, charCount, baseOpacity }) {
  const [chars, setChars] = useState(
    () => Array.from({ length: charCount }, () => STREAM_CHARS[Math.floor(Math.random() * STREAM_CHARS.length)])
  )

  // Randomly mutate ~35% of characters every 120ms — creates flicker effect
  useEffect(() => {
    const id = setInterval(() => {
      setChars(prev => prev.map(c =>
        Math.random() > 0.65 ? STREAM_CHARS[Math.floor(Math.random() * STREAM_CHARS.length)] : c
      ))
    }, 120)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      animate={{ y: ['-15vh', '115vh'] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear', delay }}
      style={{
        position: 'absolute',
        left,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.58rem',
        letterSpacing: '0.05em',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {chars.map((char, i) => {
        const isHead = i === charCount - 1
        const relPos = i / charCount
        return (
          <span
            key={i}
            style={{
              color: isHead ? '#FFFFFF' : C.green,
              opacity: isHead ? baseOpacity * 2.8 : baseOpacity * (0.2 + relPos * 0.8),
              textShadow: isHead ? `0 0 8px ${C.green}, 0 0 16px ${C.green}` : 'none',
            }}
          >
            {char}
          </span>
        )
      })}
    </motion.div>
  )
}

// Multiple data stream columns along the edges — avoids the main text area
function DataStreams() {
  const columns = [
    { left: '2%',   delay: 0,   speed: 14, charCount: 10, baseOpacity: 0.22 },
    { left: '5.5%', delay: 4,   speed: 11, charCount: 7,  baseOpacity: 0.15 },
    { left: '91%',  delay: 1.5, speed: 16, charCount: 12, baseOpacity: 0.20 },
    { left: '94%',  delay: 5,   speed: 13, charCount: 8,  baseOpacity: 0.17 },
    { left: '97%',  delay: 2,   speed: 15, charCount: 9,  baseOpacity: 0.18 },
    { left: '87%',  delay: 7,   speed: 12, charCount: 6,  baseOpacity: 0.14 },
    { left: '10%',  delay: 3,   speed: 17, charCount: 11, baseOpacity: 0.16 },
  ]

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
    >
      {columns.map((col, i) => <DataColumn key={i} {...col} />)}
    </div>
  )
}

// Real code snippets from each project — cycled in the live panel
const CODE_SNIPPETS = [
  {
    file: 'TabFlow/background.js',
    code:
`// Save current tab session
async function saveSession(name) {
  const tabs = await chrome.tabs.query({
    currentWindow: true
  })
  const session = {
    name,
    tabs: tabs.map(t => ({
      url:   t.url,
      title: t.title,
    }))
  }
  await chrome.storage.local.set({
    [name]: session
  })
}`,
  },
  {
    file: 'SteamAnalyzer/api.js',
    code:
`// Fetch player game library
async function getLibrary(steamId) {
  const url = '/api/steam/' + steamId
  const res = await fetch(url)
  const { games } = await res.json()
  return games.sort(
    (a, b) => b.playtime - a.playtime
  )
}`,
  },
  {
    file: 'CoreTracker/database.js',
    code:
`// Register new well sample
function addSample(data) {
  const db = getDatabase()
  const stmt = db.prepare(
    'INSERT INTO samples ' +
    '(well_id, depth, type, date) ' +
    'VALUES (?, ?, ?, ?)'
  )
  return stmt.run(
    data.wellId, data.depth,
    data.type,   Date.now()
  )
}`,
  },
]

// Colors a single line — comments green, everything else near-white
function CodeLine({ line }) {
  if (line.trimStart().startsWith('//')) {
    return <span style={{ color: C.green, opacity: 0.55 }}>{line}</span>
  }
  return <span style={{ color: 'rgba(232,255,232,0.78)' }}>{line}</span>
}

// Terminal panel — types real project code on a loop while the page is open
function LiveCodePanel() {
  const [idx, setIdx] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const snippet = CODE_SNIPPETS[idx]

  // Advance one character at 28ms; when done, pause 2.8s then move to next snippet
  useEffect(() => {
    if (charCount < snippet.code.length) {
      const t = setTimeout(() => setCharCount(c => c + 1), 28)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setCharCount(0)
      setIdx(i => (i + 1) % CODE_SNIPPETS.length)
    }, 2800)
    return () => clearTimeout(t)
  }, [charCount, idx])

  const lines = snippet.code.slice(0, charCount).split('\n')

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.5 }}
      style={{ width: '100%', maxWidth: '460px' }}
    >
      <div style={{
        backgroundColor: 'rgba(2,5,2,0.92)',
        border: '1px solid rgba(0,255,65,0.18)',
        boxShadow: '0 0 30px rgba(0,255,65,0.05), inset 0 0 60px rgba(0,255,65,0.01)',
      }}>
        {/* Title bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 14px',
          borderBottom: '1px solid rgba(0,255,65,0.1)',
        }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: C.red, display: 'inline-block', opacity: 0.8 }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFD700', display: 'inline-block', opacity: 0.8 }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: C.green, display: 'inline-block', opacity: 0.8 }} />
          <span style={{
            marginLeft: 6,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.65rem',
            color: 'rgba(0,255,65,0.5)',
            letterSpacing: '0.04em',
          }}>
            ~/projects/{snippet.file}
          </span>
        </div>

        {/* Code area */}
        <div style={{
          padding: '14px 16px',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.72rem',
          lineHeight: 1.75,
          minHeight: '310px',
          overflow: 'hidden',
        }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.1rem' }}>
              {/* Line number */}
              <span style={{
                color: 'rgba(0,255,65,0.2)',
                userSelect: 'none',
                flexShrink: 0,
                minWidth: '1.4rem',
                textAlign: 'right',
              }}>
                {i + 1}
              </span>
              {/* Code with cursor on last line */}
              <span>
                <CodeLine line={line} />
                {i === lines.length - 1 && (
                  <span aria-hidden="true" className="typewriter-cursor" style={{ color: C.green }}>▌</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Roles cycled by the typewriter — tech terms, no translation needed
const ROLES = [
  'Fullstack Developer',
  'React + Node.js',
  'Ships Real Products',
  'Open to Work',
]

// Cycles through ROLES with a character-by-character type → wait → erase loop
function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' | 'waiting' | 'erasing'

  useEffect(() => {
    const role = ROLES[roleIdx]

    if (phase === 'typing') {
      if (displayed.length < role.length) {
        const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 65)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('erasing'), 2200)
      return () => clearTimeout(t)
    }

    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
        return () => clearTimeout(t)
      }
      setRoleIdx((i) => (i + 1) % ROLES.length)
      setPhase('typing')
    }
  }, [phase, displayed, roleIdx])

  return (
    <span>
      <span style={{ color: C.cyan }}>{displayed}</span>
      <span
        aria-hidden="true"
        className="typewriter-cursor"
        style={{ color: C.green, marginLeft: '1px' }}
      >▌</span>
    </span>
  )
}

// Full-screen hero section — SIGNAL DETECTED
function Hero() {
  const nameRef = useRef(null)
  const { t } = useLang()
  const reducedMotion = useReducedMotion()

  // Randomly applies a 60ms blur glitch to the name every 4–8 seconds — skipped under reduced motion
  useEffect(() => {
    if (reducedMotion) return

    let timeout

    function scheduleGlitch() {
      const delay = 4000 + Math.random() * 4000
      timeout = setTimeout(() => {
        if (nameRef.current) {
          nameRef.current.style.filter = 'blur(0.8px)'
          setTimeout(() => {
            if (nameRef.current) nameRef.current.style.filter = 'none'
          }, 60)
        }
        scheduleGlitch()
      }, delay)
    }

    scheduleGlitch()
    return () => clearTimeout(timeout)
  }, [reducedMotion])

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(5.5rem, 18vw, 130px)',
        paddingBottom: '5rem',
        paddingLeft: 'clamp(1.25rem, 6vw, 7rem)',
        paddingRight: 'clamp(1.25rem, 6vw, 7rem)',
      }}
    >
      {/* Global CSS — glitch keyframes + pseudo-element layer on .glitch-line */}
      <style>{`
        @keyframes glitch1 {
          0%,  92%,  100% { opacity: 0; transform: none; }
          92.5% { opacity: 1; clip-path: inset(12% 0 68% 0); transform: translateX(-6px); }
          94%   { opacity: 1; clip-path: inset(58% 0 28% 0); transform: translateX(5px);  }
          95.5% { opacity: 1; clip-path: inset(35% 0 48% 0); transform: translateX(-4px); }
          97%   { opacity: 0; }
        }
        @keyframes glitch2 {
          0%,  92%,  100% { opacity: 0; transform: none; }
          93%   { opacity: 1; clip-path: inset(52% 0 32% 0); transform: translateX(6px);  }
          94.5% { opacity: 1; clip-path: inset(22% 0 62% 0); transform: translateX(-5px); }
          96%   { opacity: 1; clip-path: inset(72% 0 12% 0); transform: translateX(3px);  }
          97.5% { opacity: 0; }
        }

        .glitch-line {
          position: relative;
          display: block;
          line-height: 0.88;
        }
        .glitch-line::before,
        .glitch-line::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          font-family: 'Bebas Neue', cursive;
          font-size: inherit;
          line-height: inherit;
          opacity: 0;
          pointer-events: none;
        }
        .glitch-line::before {
          color: rgba(0, 255, 65, 0.65);
          animation: glitch1 3s infinite;
          animation-delay: 1s;
        }
        .glitch-line::after {
          color: rgba(232, 255, 232, 0.5);
          animation: glitch2 3s infinite;
          animation-delay: 1.18s;
        }
        .typewriter-cursor {
          animation: cursor-blink 0.9s step-end infinite;
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        /* Mobile: reduce tagline letter-spacing so it fits on small screens */
        @media (max-width: 640px) {
          .hero-tagline {
            font-size: 0.6rem !important;
            letter-spacing: 0.1em !important;
          }
        }
      `}</style>

      {/* Data streams — falling columns of hex/terminal chars along the edges */}
      <DataStreams />

      {/* Hero-wide slow scanline sweep — soft green band drifting down the section */}
      <motion.div
        aria-hidden="true"
        animate={{ y: ['-40%', '120vh'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(transparent 0%, rgba(0,255,65,0.04) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Background grid — reduced opacity, mask fades left (text) side, lives on the right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 58% 75% at 78% 50%, black 15%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 58% 75% at 78% 50%, black 15%, transparent 72%)',
          pointerEvents: 'none',
        }}
      />

      {/* Green radial glow blob — soft ambient light behind the name */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 30% 50%, ${C.g(0.06)} 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Decorative section number — bottom-right, massive and faint */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-1vw',
          right: '1.5vw',
          fontFamily: "'Bebas Neue', cursive",
          fontSize: '15vw',
          color: C.g(0.03),
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        01
      </div>

      {/* ── MAIN CONTENT — stacks vertically on mobile, two-column on desktop ── */}
      <div
        className="flex flex-col lg:flex-row lg:items-center"
        style={{
          position: 'relative',
          zIndex: 1,
          gap: '2rem',
        }}
      >
        {/* Left column — full width on mobile, 55% on desktop */}
        <div className="w-full lg:w-[55%] lg:shrink-0">

          {/* 1. Tag line (delay 0.2s) */}
          <motion.div
            {...fadeUp(0.2)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '1px',
                backgroundColor: C.green,
                boxShadow: `0 0 8px ${C.green}`,
                flexShrink: 0,
              }}
            />
            {/* Full tagline — hidden on small screens to avoid overflow */}
            <span
              className="hero-tagline hidden sm:inline"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.72rem',
                color: C.green,
                letterSpacing: '0.28em',
                whiteSpace: 'nowrap',
              }}
            >
              ▸&nbsp;&nbsp;SIGNAL DETECTED&nbsp;&nbsp;//&nbsp;&nbsp;INITIALIZING TRANSMISSION
            </span>
            {/* Short tagline — visible only on small screens */}
            <span
              className="hero-tagline sm:hidden"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.6rem',
                color: C.green,
                letterSpacing: '0.12em',
                whiteSpace: 'nowrap',
              }}
            >
              ▸&nbsp;&nbsp;SIGNAL DETECTED
            </span>
          </motion.div>

          {/* 2. Name with CSS glitch pseudo-elements (delay 0.4s) */}
          <motion.div
            {...fadeUp(0.4)}
            ref={nameRef}
            style={{ marginBottom: '1.75rem' }}
          >
            <div
              className="glitch-line"
              data-text="LAUTARO"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(3.5rem, 14vw, 12rem)',
                color: '#F0FFF0',
                textShadow: `0 0 40px ${C.g(0.08)}`,
              }}
            >
              LAUTARO
            </div>
            <div
              className="glitch-line"
              data-text="VELO"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(3.5rem, 14vw, 12rem)',
                color: '#F0FFF0',
                textShadow: `0 0 40px ${C.g(0.08)}`,
              }}
            >
              VELO
            </div>
          </motion.div>

          {/* 3. Subtitle with typewriter role (delay 0.6s) */}
          <motion.p
            {...fadeUp(0.6)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontStyle: 'italic',
              fontSize: 'clamp(0.78rem, 1.4vw, 0.95rem)',
              color: C.w(0.45),
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}
          >
            <span style={{ color: C.w(0.45) }}>// </span><TypewriterRole /><span style={{ color: C.w(0.45) }}> — from Neuquen, AR</span>
            <br />
            {t.hero.subtitle2}
          </motion.p>

          {/* 4. CTA button row (delay 0.8s) */}
          <motion.div
            {...fadeUp(0.8)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Button A — scroll to Projects */}
            <motion.button
              onClick={() => scrollTo('projects')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                backgroundColor: C.green,
                color: C.bg,
                border: 'none',
                cursor: 'pointer',
                padding: '0.85rem 2rem',
                clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                transition: 'background-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = C.cyan
                e.currentTarget.style.boxShadow = `0 0 28px ${C.c(0.45)}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = C.green
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {t.hero.ctaProjects}
            </motion.button>

            {/* Button B — scroll to Contact */}
            <motion.button
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.01 }}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                backgroundColor: 'transparent',
                color: C.green,
                border: 'none',
                borderBottom: `1px solid ${C.g(0.35)}`,
                cursor: 'pointer',
                padding: '0.3rem 0',
                transition: 'color 0.2s, letter-spacing 0.25s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = C.cyan
                e.currentTarget.style.borderBottomColor = C.c(0.5)
                e.currentTarget.style.letterSpacing = '0.18em'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = C.green
                e.currentTarget.style.borderBottomColor = C.g(0.35)
                e.currentTarget.style.letterSpacing = '0.1em'
              }}
            >
              {t.hero.ctaContact}
            </motion.button>
          </motion.div>
        </div>

        {/* Right column — decorative SVG, hidden on mobile/tablet */}
        <div
          className="hidden lg:flex"
          style={{ flex: '1', justifyContent: 'center', alignItems: 'center' }}
        >
          <LiveCodePanel />
        </div>
      </div>

      {/* 5. Scroll hint — absolute bottom-left (delay 1.0s) */}
      <motion.div
        {...fadeUp(1.0)}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: 'clamp(1.5rem, 6vw, 7rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
        }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '28px',
            height: '1px',
            backgroundColor: C.green,
            boxShadow: `0 0 6px ${C.green}`,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            color: C.g(0.38),
            letterSpacing: '0.2em',
          }}
        >
          {t.hero.scroll}
        </span>
      </motion.div>
    </section>
  )
}

export default Hero
