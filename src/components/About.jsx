// About section — USER_PROFILE: terminal card on the left, bio + tags on the right
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const TERMINAL_ROWS = [
  { key: 'NAME',       value: 'Lautaro Velo',                          cyan: false, link: null },
  { key: 'ROLE',       value: 'Fullstack Developer',                   cyan: false, link: null },
  { key: 'ORIGIN',     value: 'Neuquen, Argentina',                    cyan: false, link: null },
  { key: 'STATUS',     value: 'BUILDING_SOMETHING_RN',                 cyan: true,  link: null },
  { key: 'EXPERIENCE', value: 'Self-taught, 0 to shipped in 2 months', cyan: false, link: null },
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
      className="relative min-h-screen flex flex-col justify-center px-6 py-24"
      style={{ backgroundColor: '#020502' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <SectionHeader
          tag="SIGNAL_02"
          title="USER_"
          accent="PROFILE"
          subtitle="// IDENTITY PACKET RECEIVED"
          number="02"
        />

        {/* Two-column grid — stacks vertically on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — Terminal card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{
              background: 'rgba(0,255,65,0.028)',
              border: '1px solid rgba(0,255,65,0.14)',
              borderRadius: '2px',
            }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center px-4 py-2.5"
              style={{ borderBottom: '1px solid rgba(0,255,65,0.14)' }}
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
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-8 justify-center"
          >
            {/* Display quote */}
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                lineHeight: 1.05,
                color: '#E8FFE8',
              }}
            >
              Always{' '}
              <span
                style={{
                  color: '#00FF41',
                  textShadow: '0 0 22px rgba(0,255,65,0.55)',
                }}
              >
                make
              </span>
              {' '}something.
            </p>

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
              viewport={{ once: true }}
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
                    border: '1px solid rgba(0,255,65,0.22)',
                    background: 'transparent',
                    letterSpacing: '0.05em',
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
