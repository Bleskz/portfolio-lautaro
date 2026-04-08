// Skills section — FREQ_STACK: three-column channel cards with animated progress bars
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

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

// Renders a single skill row: name, percentage label, and animated gradient bar
function SkillBar({ name, pct, index }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1">
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.72rem',
            color: '#E8FFE8',
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.72rem',
            color: 'rgba(0,255,65,0.6)',
          }}
        >
          {pct}%
        </span>
      </div>

      {/* Track */}
      <div
        className="relative"
        style={{
          height: '2px',
          backgroundColor: 'rgba(232,255,232,0.07)',
          borderRadius: '1px',
        }}
      >
        {/* Animated fill */}
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.07 }}
          className="absolute top-0 left-0 h-full"
          style={{
            background: 'linear-gradient(90deg, #00FF41, #00FFFF)',
            boxShadow: '0 0 6px #00FF41',
            borderRadius: '1px',
          }}
        >
          {/* White dot at the right tip of the fill */}
          <span
            className="absolute"
            style={{
              right: '-3px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#E8FFE8',
              boxShadow: '0 0 4px rgba(232,255,232,0.8)',
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

// Renders a channel card with header line and all skill bars
function ChannelCard({ channel }) {
  return (
    <div
      className="p-6"
      style={{
        border: '1px solid rgba(0,255,65,0.09)',
        backgroundColor: 'rgba(0,255,65,0.012)',
      }}
    >
      {/* Channel header: label + extending line */}
      <div className="flex items-center gap-3 mb-6">
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.6rem',
            color: '#00FF41',
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
            opacity: 0.85,
          }}
        >
          {channel.name}
        </span>
        <div
          className="flex-1"
          style={{ height: '1px', backgroundColor: 'rgba(0,255,65,0.15)' }}
        />
      </div>

      {channel.skills.map((skill, i) => (
        <SkillBar key={skill.name} name={skill.name} pct={skill.pct} index={i} />
      ))}
    </div>
  )
}

function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen py-24 px-6"
      style={{ backgroundColor: '#020502' }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="SIGNAL_04"
          title="FREQ_"
          accent="STACK"
          subtitle="// CALIBRATED FREQUENCIES"
          number="04"
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
