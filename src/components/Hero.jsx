import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

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

// Full-screen hero section — SIGNAL DETECTED
function Hero() {
  const nameRef = useRef(null)

  // Randomly applies a 60ms blur glitch to the name every 4–8 seconds
  useEffect(() => {
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
  }, [])

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        backgroundColor: '#020502',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '130px',
        paddingBottom: '5rem',
        paddingLeft: 'clamp(1.5rem, 6vw, 7rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 7rem)',
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

      {/* Background grid — two linear-gradients + radial mask to fade at edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)',
          pointerEvents: 'none',
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
          color: 'rgba(0,255,65,0.035)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        01
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

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
          {/* 40px horizontal green line with glow */}
          <div
            style={{
              width: '40px',
              height: '1px',
              backgroundColor: '#00FF41',
              boxShadow: '0 0 8px #00FF41',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.72rem',
              color: '#00FF41',
              letterSpacing: '0.28em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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
              fontSize: 'clamp(5rem, 13vw, 12rem)',
              color: '#E8FFE8',
            }}
          >
            LAUTARO
          </div>
          <div
            className="glitch-line"
            data-text="VELO"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 'clamp(5rem, 13vw, 12rem)',
              color: '#E8FFE8',
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
            color: 'rgba(232,255,232,0.45)',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}
        >
          // Fullstack Developer from Neuquen, AR<br />
          — Ships things. Fast. With whatever it takes.
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
              backgroundColor: '#00FF41',
              color: '#020502',
              border: 'none',
              cursor: 'pointer',
              padding: '0.85rem 2rem',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              transition: 'background-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#00FFFF'
              e.currentTarget.style.boxShadow = '0 0 28px rgba(0,255,255,0.45)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#00FF41'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            TUNE IN → PROJECTS
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
              color: '#00FF41',
              border: 'none',
              borderBottom: '1px solid rgba(0,255,65,0.35)',
              cursor: 'pointer',
              padding: '0.3rem 0',
              transition: 'color 0.2s, letter-spacing 0.25s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#00FFFF'
              e.currentTarget.style.borderBottomColor = 'rgba(0,255,255,0.5)'
              e.currentTarget.style.letterSpacing = '0.18em'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#00FF41'
              e.currentTarget.style.borderBottomColor = 'rgba(0,255,65,0.35)'
              e.currentTarget.style.letterSpacing = '0.1em'
            }}
          >
            OPEN CHANNEL →
          </motion.button>
        </motion.div>
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
        {/* Animated sliding green line */}
        <motion.div
          animate={{ x: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '28px',
            height: '1px',
            backgroundColor: '#00FF41',
            boxShadow: '0 0 6px #00FF41',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            color: 'rgba(0,255,65,0.38)',
            letterSpacing: '0.2em',
          }}
        >
          ─── SCROLL TO RECEIVE
        </span>
      </motion.div>
    </section>
  )
}

export default Hero
