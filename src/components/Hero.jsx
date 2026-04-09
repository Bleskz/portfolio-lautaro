import { useEffect, useRef } from 'react'
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

// Decorative right-column SVG — wireframe diamond with drawing animation
function HeroDecor({ reducedMotion }) {
  // Diamond M200,24 L380,240 L200,456 L20,240 Z — perimeter ≈ 1125px
  const dashLen = 1200

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '460px' }}>
      <svg
        viewBox="0 0 400 480"
        style={{ width: '100%', overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* Outer diamond — stroke draws from start on load */}
        <motion.path
          d="M 200,24 L 380,240 L 200,456 L 20,240 Z"
          fill="none"
          stroke="#00FF41"
          strokeWidth="1.5"
          strokeDasharray={dashLen}
          initial={{ strokeDashoffset: dashLen }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
          style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,65,0.55))' }}
        />

        {/* Inner diamond — thinner, more faint, draws slightly later */}
        <motion.path
          d="M 200,90 L 320,240 L 200,390 L 80,240 Z"
          fill="none"
          stroke="rgba(0,255,65,0.18)"
          strokeWidth="1"
          strokeDasharray="900"
          initial={{ strokeDashoffset: 900 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut', delay: 1.0 }}
        />

        {/* Pulsing ring at center — disabled under reduced motion */}
        <motion.circle
          cx="200" cy="240" r="18"
          fill="none"
          stroke="#00FF41"
          strokeWidth="1"
          animate={reducedMotion ? { r: 16, opacity: 0.35 } : { r: [14, 22, 14], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />

        {/* Dot cluster — 5 dots rotating around center — disabled under reduced motion */}
        <motion.g
          animate={reducedMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={{ duration: 22, repeat: reducedMotion ? 0 : Infinity, ease: 'linear' }}
          style={{ transformOrigin: '200px 240px' }}
        >
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const r = 52
            const cx = 200 + r * Math.cos(rad)
            const cy = 240 + r * Math.sin(rad)
            return <circle key={i} cx={cx} cy={cy} r="2.5" fill="#00FF41" opacity="0.45" />
          })}
        </motion.g>

        {/* Crosshair lines at center — appear after the diamond draws */}
        <motion.line
          x1="200" y1="222" x2="200" y2="258"
          stroke="rgba(0,255,65,0.35)" strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.3 }}
        />
        <motion.line
          x1="182" y1="240" x2="218" y2="240"
          stroke="rgba(0,255,65,0.35)" strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.3 }}
        />

        {/* Corner tick marks at diamond vertices */}
        {[
          { x: 200, y: 24, r: 0 },
          { x: 380, y: 240, r: 0 },
          { x: 200, y: 456, r: 0 },
          { x: 20, y: 240, r: 0 },
        ].map((pt, i) => (
          <motion.circle
            key={i}
            cx={pt.x} cy={pt.y} r="3"
            fill="#00FF41"
            opacity="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.6 + i * 0.08, duration: 0.2 }}
          />
        ))}
      </svg>

      {/* Horizontal scanning line — disabled under reduced motion */}
      <motion.div
        animate={reducedMotion ? { y: '50%', opacity: 0 } : { y: ['0%', '100%'] }}
        transition={{ duration: 4.5, repeat: reducedMotion ? 0 : Infinity, ease: 'linear', delay: 2.2 }}
        style={{
          position: 'absolute',
          top: 0,
          left: '8%',
          right: '8%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.22), transparent)',
          pointerEvents: 'none',
        }}
      />
    </div>
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
      `}</style>

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

          {/* 3. Subtitle (delay 0.6s) */}
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
            {t.hero.subtitle1}<br />
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
          <HeroDecor reducedMotion={reducedMotion} />
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
