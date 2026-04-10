// Individual project card with animated left accent bar, pulsing freq, and action buttons
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import useReducedMotion from '../hooks/useReducedMotion'
import { C } from '../theme/colors'

// Stack chip — subtle background + stronger border on hover
function StackChip({ label }) {
  return (
    <motion.span
      className="px-2 py-1 cursor-default"
      whileHover={{ background: C.g(0.1), borderColor: C.g(0.55) }}
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.62rem',
        color: C.green,
        border: `1px solid ${C.g(0.3)}`,
        background: C.g(0.05),
        letterSpacing: '0.05em',
        display: 'inline-block',
      }}
    >
      {label}
    </motion.span>
  )
}

// Freq label — pulses opacity between 0.35 and 1 on a 2.5s loop; static under reduced motion
function FreqLabel({ freq }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.span
      animate={reducedMotion ? { opacity: 0.7 } : { opacity: [0.35, 1] }}
      transition={{ duration: 2.5, repeat: reducedMotion ? 0 : Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.6rem',
        color: C.cyan,
        letterSpacing: '0.06em',
      }}
    >
      FREQ: {freq}
    </motion.span>
  )
}

function ProjectCard({ sigId, type, freq, name, codename, description, stack, codeUrl, demoUrl, index }) {
  const { t } = useLang()

  // Opens a URL in new tab; skips if null or '#'
  function openLink(url) {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  // demoUrl === null means desktop app — show a different label instead of a greyed-out button
  const isDesktopOnly = demoUrl === null

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{
        scale: 1.005,
        backgroundColor: C.g(0.04),
        boxShadow: `inset 0 0 60px ${C.g(0.03)}`,
        transition: { duration: 0.2 },
      }}
      style={{
        backgroundColor: C.bg,
        padding: 'clamp(1.25rem, 5vw, 2.5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left accent bar — animates height on card hover */}
      <motion.div
        initial={{ height: 0 }}
        whileHover={{ height: '100%' }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '3px',
          backgroundColor: C.green,
          boxShadow: `0 0 12px ${C.green}`,
        }}
      />

      {/* Top meta row */}
      <div className="flex items-center justify-between mb-3">
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.6rem',
            color: C.g(0.5),
            letterSpacing: '0.06em',
          }}
        >
          {sigId} // {type}
        </span>
        <FreqLabel freq={freq} />
      </div>

      {/* Project name — x-jitter + cyan flash on hover */}
      <motion.h3
        whileHover={{ x: [0, -4, 4, -2, 2, 0], color: [C.white, C.cyan, C.white], transition: { duration: 0.3 } }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '1.9rem',
          color: C.white,
          lineHeight: 1.05,
          cursor: 'default',
        }}
      >
        {name}
      </motion.h3>

      {/* Codename */}
      <p
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.6rem',
          color: C.g(0.65),
          letterSpacing: '0.06em',
          marginTop: '0.2rem',
        }}
      >
        {codename}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.76rem',
          color: C.w(0.5),
          lineHeight: 1.7,
          marginTop: '0.75rem',
        }}
      >
        {description}
      </p>

      {/* Stack chips */}
      <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
        {stack.map((tech) => (
          <StackChip key={tech} label={tech} />
        ))}
      </div>

      {/* Button row */}
      <div className="flex gap-2 flex-wrap">
        {/* VIEW_CODE button */}
        <button
          onClick={() => openLink(codeUrl)}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            color: C.green,
            background: 'transparent',
            border: `1px solid ${C.g(0.28)}`,
            padding: '0.45rem 0.9rem',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.g(0.07)
            e.currentTarget.style.borderColor = C.g(0.55)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = C.g(0.28)
          }}
        >
          {t.projects.viewCode}
        </button>

        {/* LIVE_DEMO button — or DESKTOP_APP label if no browser demo exists */}
        {isDesktopOnly ? (
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.62rem',
              color: C.g(0.4),
              border: `1px solid ${C.g(0.12)}`,
              padding: '0.45rem 0.9rem',
              letterSpacing: '0.06em',
              cursor: 'default',
            }}
            title="Desktop application — no browser demo available"
          >
            DESKTOP_APP
          </span>
        ) : (
          <button
            onClick={() => openLink(demoUrl)}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.62rem',
              color: C.bg,
              background: C.green,
              border: `1px solid ${C.green}`,
              padding: '0.45rem 0.9rem',
              cursor: 'pointer',
              letterSpacing: '0.06em',
              transition: 'background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.cyan
              e.currentTarget.style.borderColor = C.cyan
              e.currentTarget.style.boxShadow = `0 0 14px ${C.c(0.5)}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.green
              e.currentTarget.style.borderColor = C.green
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {t.projects.liveDemo}
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default ProjectCard
