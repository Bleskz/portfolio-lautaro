// About section — USER_PROFILE: terminal card on the left, bio + tags on the right
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const TERMINAL_ROWS = [
  { key: 'NAME',       value: 'Lautaro Velo',                          cyan: false, link: null },
  { key: 'ROLE',       value: 'Fullstack Developer',                   cyan: false, link: null },
  { key: 'ORIGIN',     value: 'Neuquen, Argentina',                    cyan: false, link: null },
  { key: 'STATUS',     value: 'BUILDING_SOMETHING_RN',                 cyan: true,  link: null },
  { key: 'EXPERIENCE', value: 'Self-taught, 0 to shipped', cyan: false, link: null },
  { key: 'GITHUB',     value: 'github.com/Bleskz',                     cyan: false, link: 'https://github.com/Bleskz' },
  { key: 'DISCORD',    value: 'Bleskz',                                cyan: false, link: null },
]

const STACK_TAGS = [
  'REACT', 'NODE.JS', 'ELECTRON', 'CHROME EXT API', 'SQLITE',
  'TAILWIND', 'FRAMER MOTION', 'CLAUDE CODE', 'COMFYUI',
]

function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center px-6 py-32"
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
          right: '2rem',
          top: '3rem',
          zIndex: 0,
        }}
      >
        02
      </span>

      <div className="max-w-6xl mx-auto w-full">
        <SectionHeader
          tag="SIGNAL_02"
          title="USER_"
          accent="PROFILE"
          subtitle="// IDENTITY PACKET RECEIVED"
        />

        {/* Two-column grid — stacks vertically on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* LEFT — Terminal card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, delay: 0 }}
            style={{
              background: 'rgba(0,255,65,0.028)',
              border: '1px solid rgba(0,255,65,0.14)',
              borderRadius: '2px',
              boxShadow: '0 0 30px rgba(0,255,65,0.06), inset 0 0 20px rgba(0,255,65,0.02)',
            }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center px-4 py-2.5"
              style={{ borderBottom: '1px solid rgba(0,255,65,0.14)', backgroundColor: 'rgba(0,255,65,0.08)' }}
            >
              {/* Window dots — left zone */}
              <div className="flex gap-1.5 flex-1">
                <span style={{ color: 'rgba(0,255,65,0.3)', fontSize: '0.7rem' }}>●</span>
                <span style={{ color: 'rgba(0,255,65,0.3)', fontSize: '0.7rem' }}>●</span>
                <span style={{ color: 'rgba(0,255,65,0.3)', fontSize: '0.7rem' }}>●</span>
              </div>
              {/* Centered filename — middle zone */}
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.58rem',
                  color: 'rgba(0,255,65,0.4)',
                  letterSpacing: '0.08em',
                  flexShrink: 0,
                }}
              >
                SIGNAL_PROFILE.JSON
              </span>
              {/* Right spacer — mirrors left zone width */}
              <div className="flex-1" />
            </div>

            {/* Data rows */}
            <div className="px-5 py-3">
              {TERMINAL_ROWS.map((row) => (
                <div
                  key={row.key}
                  className="flex items-start py-2.5"
                  style={{ borderBottom: '1px solid rgba(0,255,65,0.07)' }}
                >
                  {/* Key */}
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '0.72rem',
                      color: '#00FF41',
                      minWidth: '120px',
                      flexShrink: 0,
                    }}
                  >
                    {row.key}
                  </span>

                  {/* Separator */}
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '0.72rem',
                      color: 'rgba(0,255,65,0.35)',
                      marginRight: '0.6rem',
                      flexShrink: 0,
                    }}
                  >
                    //
                  </span>

                  {/* Value */}
                  {row.link ? (
                    <a
                      href={row.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '0.72rem',
                        color: '#00FF41',
                        textDecoration: 'underline',
                        textDecorationColor: 'rgba(0,255,65,0.35)',
                      }}
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '0.72rem',
                        color: row.cyan ? '#00FFFF' : 'rgba(232,255,232,0.8)',
                      }}
                    >
                      {row.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Quote, bio paragraphs, stack tags */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-8 justify-center"
          >
            {/* Display quote */}
            <div>
              {/* Thin horizontal green line above the quote */}
              <div
                style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: '#00FF41',
                  marginBottom: '1rem',
                }}
              />
              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                  lineHeight: 1.05,
                  color: '#E8FFE8',
                }}
              >
                Always{' '}
                <span
                  style={{
                    color: '#00FF41',
                    textShadow: '0 0 25px rgba(0,255,65,0.6)',
                  }}
                >
                  make
                </span>
                {' '}something.
              </p>
            </div>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-4">
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.8rem',
                  color: 'rgba(232,255,232,0.5)',
                  lineHeight: 1.75,
                }}
              >
                No esperé tener el stack perfecto ni la idea del siglo. Arranqué, rompí cosas, las arreglé, y así sigo. Esa es la única forma en que algo llega a existir.
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.8rem',
                  color: 'rgba(232,255,232,0.5)',
                  lineHeight: 1.75,
                }}
              >
                Trabajo con todo lo que tengo — código, IA, diseño. Si algo se puede construir, se construye.
              </p>
            </div>

            {/* Stack tags with stagger animation */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {STACK_TAGS.map((tag) => (
                <motion.span
                  key={tag}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  }}
                  className="px-2 py-1 cursor-default"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '0.62rem',
                    color: '#00FF41',
                    border: '1px solid rgba(0,255,65,0.3)',
                    background: 'rgba(0,255,65,0.05)',
                    letterSpacing: '0.05em',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,255,65,0.1)'
                    e.currentTarget.style.borderColor = 'rgba(0,255,65,0.55)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,255,65,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(0,255,65,0.3)'
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About
