// Skills section — FREQ_STACK: three-column channel cards with animated progress bars
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { useLang } from '../context/LangContext'
import { C } from '../theme/colors'

const channels = [
  {
    name: '// FRONTEND_CORE',
    skills: [
      { name: 'HTML + CSS', pct: 95 },
      { name: 'JavaScript', pct: 85 },
      { name: 'React', pct: 75 },
      { name: 'Tailwind CSS', pct: 90 },
    ],
  },
  {
    name: '// BACKEND_AND_TOOLS',
    skills: [
      { name: 'Node.js', pct: 70 },
      { name: 'REST APIs', pct: 85 },
      { name: 'Electron', pct: 72 },
      { name: 'Git / GitHub', pct: 80 },
    ],
  },
  {
    name: '// AI_AND_CREATIVE',
    skills: [
      { name: 'Claude Code', pct: 95 },
      { name: 'Prompt Engineering', pct: 90 },
      { name: 'ComfyUI', pct: 80 },
      { name: 'UI/UX Design', pct: 75 },
    ],
  },
]

// Renders a single skill row: name, counting percentage, and animated gradient bar
function SkillBar({ name, pct, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })
  const [count, setCount] = useState(0)

  // Count up from 0 to pct using rAF when bar enters viewport
  useEffect(() => {
    if (!inView) return
    const duration = 800 + index * 60
    const startTime = performance.now()
    let raf
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * pct))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, pct, index])

  return (
    <div className="mb-5" ref={ref}>
      <div className="flex justify-between mb-1">
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', color: C.white }}>
          {name}
        </span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', color: C.g(0.6) }}>
          {count}%
        </span>
      </div>

      {/* Track */}
      <div className="relative" style={{ height: '3px', backgroundColor: C.w(0.07) }}>
        {/* Animated fill */}
        <motion.div
          initial={{ width: '0%' }}
          animate={inView ? { width: `${pct}%` } : { width: '0%' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.06 }}
          className="absolute top-0 left-0 h-full"
          style={{
            background: `linear-gradient(90deg, ${C.green}, ${C.cyan})`,
            boxShadow: `0 0 10px ${C.g(0.8)}, 0 0 20px ${C.g(0.4)}`,
            overflow: 'hidden',
          }}
        >
          {/* Scanning highlight — sweeps the bar every few seconds */}
          {inView && (
            <motion.div
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 + 1.2 }}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '30%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Cyan tip — pulses after bar finishes filling */}
          <motion.span
            className="absolute"
            animate={inView
              ? { opacity: [1, 0.2, 1], boxShadow: [`0 0 4px ${C.cyan}`, `0 0 12px ${C.cyan}`, `0 0 4px ${C.cyan}`] }
              : { opacity: 0 }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.06 + 1 }}
            style={{
              right: '-3px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '6px',
              height: '6px',
              backgroundColor: C.cyan,
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

// Renders a channel card with animated header line and all skill bars
function ChannelCard({ channel }) {
  return (
    <div
      className="p-6"
      style={{
        border: `1px solid ${C.g(0.09)}`,
        backgroundColor: C.g(0.012),
      }}
    >
      {/* Channel header: label + animated extending line */}
      <div className="flex items-center gap-3 mb-6">
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.6rem',
            color: C.green,
            letterSpacing: '0.35em',
            whiteSpace: 'nowrap',
            opacity: 0.85,
          }}
        >
          {channel.name}
        </span>
        {/* Extending line — animates width from 0 to 100% on section enter */}
        <motion.div
          className="flex-1"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            height: '1px',
            backgroundColor: C.border,
            transformOrigin: 'left',
          }}
        />
      </div>

      {channel.skills.map((skill, i) => (
        <SkillBar key={skill.name} name={skill.name} pct={skill.pct} index={i} />
      ))}
    </div>
  )
}

function Skills() {
  const { t } = useLang()

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 px-6"
      style={{ backgroundColor: C.bg }}
    >
      {/* Decorative background number — anchored to section, not clipped */}
      <span
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          color: C.g(0.03),
          lineHeight: 1,
          right: '1.5vw',
          bottom: '-1vw',
          zIndex: 0,
        }}
      >
        04
      </span>

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="SIGNAL_04"
          title="FREQ_"
          accent="STACK"
          subtitle={t.skills.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {channels.map((channel) => (
            <ChannelCard key={channel.name} channel={channel} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
