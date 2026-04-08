// Individual project card with animated left accent bar, pulsing freq, and action buttons
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

// Stack chip — same style as About tags
function StackChip({ label }) {
  return (
    <motion.span
      className="px-2 py-1 cursor-default"
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.62rem',
        color: '#00FF41',
        border: '1px solid rgba(0,255,65,0.22)',
        background: 'transparent',
        letterSpacing: '0.05em',
        display: 'inline-block',
        transition: 'background 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0,255,65,0.07)'
        e.currentTarget.style.borderColor = 'rgba(0,255,65,0.5)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'rgba(0,255,65,0.22)'
      }}
    >
      {label}
    </motion.span>
  )
}

// Freq label that pulses opacity on a 2.5s loop
function FreqLabel({ freq }) {
  const controls = useAnimation()

  useEffect(() => {
    // Continuously animate opacity between 0.4 and 1
    async function pulse() {
      while (true) {
        await controls.start({ opacity: 1, transition: { duration: 1.25, ease: 'easeInOut' } })
        await controls.start({ opacity: 0.4, transition: { duration: 1.25, ease: 'easeInOut' } })
      }
    }
    pulse()
  }, [controls])

  return (
    <motion.span
      animate={controls}
      initial={{ opacity: 0.4 }}
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.6rem',
        color: '#00FFFF',
        letterSpacing: '0.06em',
      }}
    >
      FREQ: {freq}
    </motion.span>
  )
}

function ProjectCard({ sigId, type, freq, name, codename, description, stack, codeUrl, demoUrl, index }) {
  // Opens a URL in new tab; skips navigation if url is '#'
  function openLink(url) {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={{
        backgroundColor: '#020502',
        padding: '2rem',
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
          backgroundColor: '#00FF41',
          boxShadow: '0 0 12px #00FF41',
        }}
      />

      {/* Top meta row */}
      <div className="flex items-center justify-between mb-3">
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.6rem',
            color: 'rgba(0,255,65,0.5)',
            letterSpacing: '0.06em',
          }}
        >
          {sigId} // {type}
        </span>
        <FreqLabel freq={freq} />
      </div>

      {/* Project name */}
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '1.9rem',
          color: '#E8FFE8',
          lineHeight: 1.05,
        }}
      >
        {name}
      </h3>

      {/* Codename */}
      <p
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.6rem',
          color: 'rgba(0,255,65,0.65)',
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
          color: 'rgba(232,255,232,0.5)',
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
            color: '#00FF41',
            background: 'transparent',
            border: '1px solid rgba(0,255,65,0.28)',
            padding: '0.45rem 0.9rem',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,255,65,0.07)'
            e.currentTarget.style.borderColor = 'rgba(0,255,65,0.55)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(0,255,65,0.28)'
          }}
        >
          VIEW_CODE
        </button>

        {/* LIVE_DEMO button */}
        <button
          onClick={() => openLink(demoUrl)}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            color: '#020502',
            background: '#00FF41',
            border: '1px solid #00FF41',
            padding: '0.45rem 0.9rem',
            cursor: demoUrl === '#' ? 'default' : 'pointer',
            letterSpacing: '0.06em',
            transition: 'background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#00FFFF'
            e.currentTarget.style.borderColor = '#00FFFF'
            e.currentTarget.style.boxShadow = '0 0 14px rgba(0,255,255,0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#00FF41'
            e.currentTarget.style.borderColor = '#00FF41'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          LIVE_DEMO →
        </button>
      </div>
    </motion.div>
  )
}

export default ProjectCard
