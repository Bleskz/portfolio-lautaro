// Projects section — PROJECT_LOGS: live status bar + 2×2 card grid
import { useState, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'

const PROJECTS = [
  {
    sigId: 'SIG-001',
    type: 'CHROME_EXT',
    freq: '443.7MHz',
    name: 'TabFlow',
    codename: 'TABFLOW_V1.EXE',
    description:
      'Chrome/Brave extension that saves and restores tab groups across restarts. Named groups, persistent sessions, one-click restore. No more lost tabs.',
    stack: ['CHROME API', 'VANILLA JS', 'HTML/CSS'],
    codeUrl: 'https://github.com/Bleskz/tabflow',
    demoUrl: '#',
  },
  {
    sigId: 'SIG-002',
    type: 'WEB_APP',
    freq: '887.2MHz',
    name: 'Steam Analyzer',
    codename: 'STEAM_ANALYZER.SYS',
    description:
      'Analyzes any Steam profile in depth. Total playtime, real money spent on games, inventory market value, full library breakdown. Raw numbers, zero filter.',
    stack: ['REACT', 'STEAM API', 'TAILWIND', 'NODE.JS'],
    codeUrl: 'https://github.com/Bleskz/steam-analyzer',
    demoUrl: '#',
  },
  {
    sigId: 'SIG-003',
    type: 'DESKTOP_APP',
    freq: '334.1MHz',
    name: 'CoreTracker',
    codename: 'CORETRACK_DESKTOP.EXE',
    description:
      'Windows desktop app for oil companies. Register, search and manage well samples — cuttings, cores, channels. Sample loans, Excel + PDF export. Runs 100% offline.',
    stack: ['ELECTRON', 'REACT', 'SQLITE', 'NODE.JS'],
    codeUrl: 'https://github.com/Bleskz/coretracker',
    demoUrl: '#',
  },
  {
    sigId: 'SIG-004',
    type: 'LANDING',
    freq: '221.9MHz',
    name: 'TabFlow Landing',
    codename: 'TABFLOW_LANDING.HTML',
    description:
      'Product page for the TabFlow extension. Fast, minimal, conversion-focused. Built to get installs.',
    stack: ['HTML', 'CSS', 'VANILLA JS', 'RESPONSIVE'],
    codeUrl: 'https://github.com/Bleskz/tabflow-landing',
    demoUrl: '#',
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

// Live clock that ticks every second
function LiveClock() {
  const [timestamp, setTimestamp] = useState(() => formatTimestamp(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTimestamp(formatTimestamp(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return <span>{timestamp}</span>
}

function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-center px-6 py-24"
      style={{ backgroundColor: '#020502' }}
    >
      {/* Decorative background number — anchored to section, not clipped */}
      <span
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          color: 'rgba(0,255,65,0.03)',
          lineHeight: 1,
          right: '1.5vw',
          bottom: '-1vw',
          zIndex: 0,
        }}
      >
        03
      </span>

      <div className="max-w-6xl mx-auto w-full">
        <SectionHeader
          tag="SIGNAL_03"
          title="PROJECT_"
          accent="LOGS"
          subtitle="// TRANSMISSIONS CAPTURED"
        />

        {/* Log status bar */}
        <div
          className="flex items-center justify-between mb-2 px-3 py-1.5 flex-wrap gap-2"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.06em',
            border: '1px solid rgba(0,255,65,0.1)',
          }}
        >
          <span style={{ color: 'rgba(0,255,65,0.5)' }}>
            LISTING: 04 ACTIVE_SIGNALS
          </span>
          <span style={{ color: 'rgba(0,255,65,0.5)' }}>
            TIMESTAMP: <LiveClock />
          </span>
          <span style={{ color: '#00FF41' }}>
            STATUS: ALL_ONLINE
          </span>
        </div>

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
