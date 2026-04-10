// Projects section — PROJECT_LOGS: live status bar + 2×2 card grid
import { useState, useEffect, useRef, memo } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import { useLang } from '../context/LangContext'
import { LINKS } from '../config/links'

// Static project data — names and codenames are never translated
const PROJECTS_BASE = [
  {
    sigId: 'SIG-001',
    descKey: 'tabflow',
    type: 'CHROME_EXT',
    freq: '443.7MHz',
    name: 'TabFlow',
    codename: 'TABFLOW_V1.EXE',
    stack: ['CHROME API', 'VANILLA JS', 'HTML/CSS'],
    codeUrl: `${LINKS.github}/tabflow`,
    demoUrl: 'https://chromewebstore.google.com/detail/tabflow-workspace-tab-man/fallkdcngmhiefbhlfbjhjeibmoedkpp',
  },
  {
    sigId: 'SIG-002',
    descKey: 'steam',
    type: 'WEB_APP',
    freq: '887.2MHz',
    name: 'Steam Analyzer',
    codename: 'STEAM_ANALYZER.SYS',
    stack: ['REACT', 'STEAM API', 'TAILWIND', 'NODE.JS'],
    codeUrl: `${LINKS.github}/steam-analyzer`,
    demoUrl: 'https://steam-analyzer-rust.vercel.app/',
  },
  {
    sigId: 'SIG-003',
    descKey: 'coretracker',
    type: 'DESKTOP_APP',
    freq: '334.1MHz',
    name: 'CoreTracker',
    codename: 'CORETRACK_DESKTOP.EXE',
    stack: ['ELECTRON', 'REACT', 'SQLITE', 'NODE.JS'],
    codeUrl: `${LINKS.github}/coretracker`,
    demoUrl: null, // Desktop app — no browser demo, .exe not yet built
  },
  {
    sigId: 'SIG-004',
    descKey: 'tabflowlanding',
    type: 'LANDING',
    freq: '221.9MHz',
    name: 'TabFlow Landing',
    codename: 'TABFLOW_LANDING.HTML',
    stack: ['HTML', 'CSS', 'VANILLA JS', 'RESPONSIVE'],
    codeUrl: `${LINKS.github}/tabflow-landing`,
    demoUrl: 'https://mytabflow.com/',
  },
]

// Formats a Date as YYYY.MM.DD_HH:MM:SS
function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0')
  const y = date.getFullYear()
  const mo = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  const h = pad(date.getHours())
  const mi = pad(date.getMinutes())
  const s = pad(date.getSeconds())
  return `${y}.${mo}.${d}_${h}:${mi}:${s}`
}

// Types "LISTING: 04 ACTIVE_SIGNALS" character by character when in view
const StatusTypewriter = memo(function StatusTypewriter() {
  const full = 'LISTING: 04 ACTIVE_SIGNALS'
  const [text, setText] = useState('')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let i = 0
    const id = setInterval(() => {
      i++
      setText(full.slice(0, i))
      if (i >= full.length) clearInterval(id)
    }, 32)
    return () => clearInterval(id)
  }, [inView])

  return (
    <span ref={ref} style={{ color: 'rgba(0,255,65,0.5)' }}>
      {text}
      {text.length < full.length && <span style={{ color: '#00FF41' }}>▌</span>}
    </span>
  )
})

// Live clock that ticks every second — memoized to prevent re-renders of parent
const LiveClock = memo(function LiveClock() {
  const [timestamp, setTimestamp] = useState(() => formatTimestamp(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTimestamp(formatTimestamp(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return <span>{timestamp}</span>
})

function Projects() {
  const { t } = useLang()

  // Merge static base data with translated descriptions
  const PROJECTS = PROJECTS_BASE.map((p) => ({
    ...p,
    description: t.projects[p.descKey].description,
  }))

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-center px-6 py-24"
      style={{ backgroundColor: '#020502' }}
    >
      {/* Decorative background number — slow opacity pulse */}
      <motion.span
        className="absolute select-none pointer-events-none"
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          color: '#00FF41',
          lineHeight: 1,
          right: '1.5vw',
          bottom: '-1vw',
          zIndex: 0,
          opacity: 0.03,
        }}
      >
        03
      </motion.span>

      <div className="max-w-6xl mx-auto w-full">
        <SectionHeader
          tag="SIGNAL_03"
          title="PROJECT_"
          accent="LOGS"
          subtitle={t.projects.subtitle}
        />

        {/* Log status bar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between mb-2 px-3 py-1.5 flex-wrap gap-2"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.06em',
            border: '1px solid rgba(0,255,65,0.1)',
          }}
        >
          <StatusTypewriter />
          <span style={{ color: 'rgba(0,255,65,0.5)' }}>
            TIMESTAMP: <LiveClock />
          </span>
          <span style={{ color: '#00FF41' }}>
            STATUS: ALL_ONLINE
          </span>
        </motion.div>

        {/* 2×2 card grid — gap creates green gutter effect */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            gap: '3px',
            backgroundColor: 'rgba(0,255,65,0.06)',
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.sigId} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
