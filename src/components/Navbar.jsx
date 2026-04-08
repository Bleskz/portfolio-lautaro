import { motion } from 'framer-motion'

// Scrolls smoothly to the section matching the given id
function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Nav links data — number prefix + section id
const NAV_LINKS = [
  { num: '01.', label: 'HOME',     id: 'home'     },
  { num: '02.', label: 'ABOUT',    id: 'about'    },
  { num: '03.', label: 'PROJECTS', id: 'projects' },
  { num: '04.', label: 'SKILLS',   id: 'skills'   },
  { num: '05.', label: 'CONTACT',  id: 'contact'  },
]

// Fixed top navbar with signal indicator, nav links, and CTA button
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(2,5,2,0.92)',
        borderBottom: '1px solid rgba(0,255,65,0.12)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        padding: '1.1rem 3rem',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
      }}
    >
      {/* LEFT — Signal indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
        {/* Blinking green dot */}
        <motion.span
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#00FF41',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            color: '#00FF41',
            whiteSpace: 'nowrap',
          }}
        >
          SIGNAL_ACTIVE // LV.DEV
        </span>
      </div>

      {/* CENTER — Nav links (hidden below md / 768px) */}
      <div
        className="hidden md:flex"
        style={{ gap: '2rem', alignItems: 'center' }}
      >
        {NAV_LINKS.map(({ num, label, id }) => (
          <NavLink key={id} num={num} label={label} id={id} />
        ))}
      </div>

      {/* RIGHT — CTA button, justified to the right */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CTAButton onClick={() => scrollTo('contact')} />
      </div>
    </motion.nav>
  )
}

// Single nav link with hover effect
function NavLink({ num, label, id }) {
  return (
    <motion.button
      onClick={() => scrollTo(id)}
      whileHover={{ scale: 1.05 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.68rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
      }}
      className="nav-link-btn"
    >
      <span style={{ color: '#00FF41' }}>{num}</span>
      <span
        style={{
          color: 'rgba(232,255,232,0.55)',
          transition: 'color 0.2s, text-shadow 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#00FF41'
          e.currentTarget.style.textShadow = '0 0 10px #00FF41'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'rgba(232,255,232,0.55)'
          e.currentTarget.style.textShadow = 'none'
        }}
      >
        {label}
      </span>
    </motion.button>
  )
}

// CTA button — OPEN_CHANNEL with hover to cyan
function CTAButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.68rem',
        letterSpacing: '0.15em',
        backgroundColor: '#00FF41',
        color: '#020502',
        border: 'none',
        cursor: 'pointer',
        padding: '0.45rem 1rem',
        transition: 'background-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#00FFFF'
        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,255,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = '#00FF41'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      OPEN_CHANNEL →
    </motion.button>
  )
}

export default Navbar
