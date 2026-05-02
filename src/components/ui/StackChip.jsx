import { motion } from 'framer-motion'
import { C } from '../../theme/colors'

// Tech stack pill — used by Projects cards and About bio.
// Subtle by default (60% green tier), brighter border on hover.
export default function StackChip({ label }) {
  return (
    <motion.span
      className="px-2 py-1 cursor-default"
      whileHover={{ background: C.g(0.1), borderColor: C.g(0.55) }}
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.62rem',
        color: C.g(0.7),
        border: `1px solid ${C.g(0.22)}`,
        background: C.g(0.04),
        letterSpacing: '0.05em',
        display: 'inline-block',
      }}
    >
      {label}
    </motion.span>
  )
}
