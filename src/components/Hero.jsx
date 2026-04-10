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
    { left: '57%',  delay: 2.5, speed: 19, charCount: 8,  baseOpacity: 0.12 },
    { left: '66%',  delay: 6,   speed: 16, charCount: 10, baseOpacity: 0.10 },
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

// Oscilloscope signal monitor — right column decoration, replaces diamond
function OscilloscopeDecor({ reducedMotion }) {
  const cycleW = 100
  const amp    = 55
  const HW     = cycleW / 2
  const k      = 0.3528  // cubic bezier sine approximation constant

  // Main wave path — 6 cycles wide for a seamless horizontal scroll loop
  let mainWave = 'M 0,0'
  for (let i = 0; i < 6; i++) {
    const x = i * cycleW
    mainWave += ` C ${x + k * HW},${-amp} ${x + HW - k * HW},${-amp} ${x + HW},0`
    mainWave += ` C ${x + HW + k * HW},${amp} ${x + cycleW - k * HW},${amp} ${x + cycleW},0`
  }

  // Secondary wave — different period, faint cyan, interference look
  const cW2  = 155
  const amp2 = 22
  const HW2  = cW2 / 2
  let secondWave = 'M 0,0'
  for (let i = 0; i < 5; i++) {
    const x = i * cW2
    secondWave += ` C ${x + k * HW2},${-amp2} ${x + HW2 - k * HW2},${-amp2} ${x + HW2},0`
    secondWave += ` C ${x + HW2 + k * HW2},${amp2} ${x + cW2 - k * HW2},${amp2} ${x + cW2},0`
  }

  const sx  = 10
  const sy  = 50
  const sw  = 400
  const sh  = 260
  const sCY = sy + sh / 2  // center Y = 180

  // Grid: 9 columns × 5 rows of phosphor dots
  const gridXs = [0, 50, 100, 150, 200, 250, 300, 350, 400]
  const gridYs = [-120, -60, 0, 60, 120]

  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      style={{ position: 'relative', width: '100%', maxWidth: '460px' }}
    >
      <svg viewBox="0 0 420 380" style={{ width: '100%', overflow: 'visible' }} aria-hidden="true">
        <defs>
          <clipPath id="osc-clip">
            <rect x={sx} y={sy} width={sw} height={sh} />
          </clipPath>
          {/* Phosphor glow — blurred copy layered under the sharp wave */}
          <filter id="osc-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── FRAME ── */}
        {/* Outer bezel — title bar + screen in one rect */}
        <rect x={sx} y={sy - 32} width={sw} height={sh + 32}
          fill="none" stroke={C.green} strokeWidth="1.5" opacity="0.5" rx="2" />

        {/* Title bar fill */}
        <rect x={sx + 1} y={sy - 31} width={sw - 2} height={30}
          fill="rgba(0,255,65,0.025)" />

        {/* Window traffic-light dots */}
        <circle cx={sx + 16} cy={sy - 16} r="5" fill="#FF003C" opacity="0.8" />
        <circle cx={sx + 33} cy={sy - 16} r="5" fill="#FFD700" opacity="0.8" />
        <circle cx={sx + 50} cy={sy - 16} r="5" fill={C.green} opacity="0.8" />

        {/* Title */}
        <text x={sx + 68} y={sy - 11}
          fontFamily="'Share Tech Mono', 'Courier New', monospace"
          fontSize="11.5" fill={C.green} opacity="0.55" letterSpacing="2">
          SIGNAL_MONITOR.EXE
        </text>

        {/* ── SCREEN ── */}
        <rect x={sx} y={sy} width={sw} height={sh} fill="rgba(0,255,65,0.012)" />

        {/* Grid dots */}
        {gridXs.map(gx =>
          gridYs.map(gy => (
            <circle
              key={`${gx}-${gy}`}
              cx={sx + gx} cy={sCY + gy}
              r="1.3" fill={C.green} opacity="0.16"
            />
          ))
        )}

        {/* Center dashed baseline */}
        <line x1={sx} y1={sCY} x2={sx + sw} y2={sCY}
          stroke={C.green} strokeWidth="0.4" opacity="0.1" strokeDasharray="3 5" />

        {/* ── WAVES — clipped to screen bounds ── */}
        <g clipPath="url(#osc-clip)">
          {/* Secondary wave: cyan, slower, interference layer */}
          {!reducedMotion && (
            <g transform={`translate(${sx}, ${sCY})`}>
              <motion.g
                animate={{ x: [0, -cW2] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
              >
                <path d={secondWave} fill="none" stroke={C.cyan} strokeWidth="1" opacity="0.18" />
              </motion.g>
            </g>
          )}

          {/* Main wave: green with phosphor glow */}
          <g transform={`translate(${sx}, ${sCY})`}>
            <motion.g
              animate={reducedMotion ? {} : { x: [0, -cycleW] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            >
              <path d={mainWave} fill="none" stroke={C.green} strokeWidth="2"
                filter="url(#osc-glow)" opacity="0.92" />
            </motion.g>
          </g>
        </g>

        {/* ── BOTTOM READOUTS ── */}
        <line x1={sx} y1={sy + sh + 14} x2={sx + sw} y2={sy + sh + 14}
          stroke={C.green} strokeWidth="0.4" opacity="0.18" />

        <text x={sx + 8} y={sy + sh + 32}
          fontFamily="'Share Tech Mono', 'Courier New', monospace"
          fontSize="10.5" fill={C.green} opacity="0.5" letterSpacing="0.8">CH1</text>
        <text x={sx + 44} y={sy + sh + 32}
          fontFamily="'Share Tech Mono', 'Courier New', monospace"
          fontSize="10.5" fill={C.white} opacity="0.3" letterSpacing="0.5">TIME/DIV: 2ms</text>
        <text x={sx + 192} y={sy + sh + 32}
          fontFamily="'Share Tech Mono', 'Courier New', monospace"
          fontSize="10.5" fill={C.white} opacity="0.3" letterSpacing="0.5">VOLT/DIV: 1V</text>
        <text x={sx + 340} y={sy + sh + 32}
          fontFamily="'Share Tech Mono', 'Courier New', monospace"
          fontSize="10.5" fill={C.green} opacity="0.55" letterSpacing="0.5">● RUN</text>

        <text x={sx + 8} y={sy + sh + 55}
          fontFamily="'Share Tech Mono', 'Courier New', monospace"
          fontSize="10" fill={C.green} opacity="0.25" letterSpacing="0.5">
          FREQ: 1.00kHz  ·  AMP: ±1.0V  ·  TRIGGER: AUTO
        </text>
      </svg>
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
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.72rem',
                color: C.green,
                letterSpacing: '0.28em',
              }}
            >
              ▸&nbsp;&nbsp;SIGNAL DETECTED&nbsp;&nbsp;//&nbsp;&nbsp;INITIALIZING TRANSMISSION
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
          <OscilloscopeDecor reducedMotion={reducedMotion} />
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
