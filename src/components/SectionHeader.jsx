// Reusable section header: vertical tag, split-color title, subtitle, decorative number
import { motion } from 'framer-motion'

function SectionHeader({ tag, title, accent, subtitle }) {
  return (
    <div className="relative mb-16">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.4 }}
        className="flex items-start gap-6"
      >
        {/* Vertical tag rotated on the left */}
        <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '1.5rem', marginTop: '0.6rem' }}>
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.6rem',
              color: '#00FF41',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              letterSpacing: '0.12em',
              opacity: 0.7,
            }}
          >
            {tag}
          </span>
        </div>

        <div>
          {/* Split-color title: white part + green accent */}
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 1,
            }}
          >
            <span style={{ color: '#E8FFE8' }}>{title}</span>
            <span style={{ color: '#00FF41' }}>{accent}</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.72rem',
              color: 'rgba(0,255,65,0.45)',
              marginTop: '0.3rem',
              letterSpacing: '0.05em',
            }}
          >
            {subtitle}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default SectionHeader
