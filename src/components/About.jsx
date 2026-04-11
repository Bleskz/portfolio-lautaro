// About section — USER_PROFILE: terminal card on the left, bio + tags on the right
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { useLang } from '../context/LangContext'
import { LINKS } from '../config/links'
import { C } from '../theme/colors'

const STACK_TAGS = [
  'REACT', 'NODE.JS', 'ELECTRON', 'CHROME EXT API', 'SQLITE',
  'TAILWIND', 'FRAMER MOTION', 'CLAUDE CODE', 'COMFYUI',
]

function About() {
  const { t } = useLang()

  // Terminal rows: keys are terminal labels (never translated), only ROLE and EXPERIENCE values are translated
  const TERMINAL_ROWS = [
    { key: 'NAME',       value: 'Lautaro Velo',                cyan: false, link: null },
    { key: 'ROLE',       value: t.about.role,                  cyan: false, link: null },
    { key: 'ORIGIN',     value: 'Neuquen, Argentina',          cyan: false, link: null },
    { key: 'STATUS',     value: 'BUILDING_SOMETHING_RN',       cyan: true,  link: null },
    { key: 'EXPERIENCE', value: t.about.experience,            cyan: false, link: null },
    { key: 'GITHUB',     value: 'github.com/Bleskz',           cyan: false, link: LINKS.github },
    { key: 'DISCORD',    value: LINKS.discord,                 cyan: false, link: null },
  ]

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-16 md:py-32"
      style={{ backgroundColor: C.bg }}
    >
      {/* Decorative background number — slow opacity pulse */}
      <motion.span
        className="absolute select-none pointer-events-none"
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          color: C.green,
          lineHeight: 1,
          right: '1.5vw',
          bottom: '-1vw',
          zIndex: 0,
          opacity: 0.03,
        }}
      >
        02
      </motion.span>

      <div className="max-w-6xl mx-auto w-full">
        <SectionHeader
          tag="SIGNAL_02"
          title="USER_"
          accent="PROFILE"
          subtitle={t.about.subtitle}
        />

        {/* Two-column grid — stacks vertically on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">

          {/* LEFT — Terminal card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, delay: 0 }}
            style={{
              background: C.g(0.028),
              border: `1px solid ${C.g(0.14)}`,
              borderRadius: '2px',
              boxShadow: `0 0 30px ${C.g(0.06)}, inset 0 0 20px ${C.g(0.02)}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Scanline sweep — runs once on entry, top to bottom */}
            <motion.div
              initial={{ top: '-40%' }}
              whileInView={{ top: '120%' }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.7, ease: 'linear', delay: 0.3 }}
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: '40%',
                background: `linear-gradient(to bottom, transparent, ${C.g(0.1)}, transparent)`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            {/* Terminal title bar */}
            <div
              className="flex items-center px-4 py-2.5"
              style={{ borderBottom: `1px solid ${C.g(0.14)}`, backgroundColor: C.g(0.08) }}
            >
              {/* Window dots — left zone */}
              <div className="flex gap-1.5 flex-1">
                <span style={{ color: C.g(0.3), fontSize: '0.7rem' }}>●</span>
                <span style={{ color: C.g(0.3), fontSize: '0.7rem' }}>●</span>
                <span style={{ color: C.g(0.3), fontSize: '0.7rem' }}>●</span>
              </div>
              {/* Centered filename — middle zone */}
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.58rem',
                  color: C.g(0.4),
                  letterSpacing: '0.08em',
                  flexShrink: 0,
                }}
              >
                SIGNAL_PROFILE.JSON
              </span>
              {/* Right spacer — mirrors left zone width */}
              <div className="flex-1" />
            </div>

            {/* Data rows — stagger each row like a terminal scan */}
            <motion.div
              className="px-5 py-3"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {TERMINAL_ROWS.map((row) => (
                <motion.div
                  key={row.key}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
                  }}
                  className="flex items-start py-2.5"
                  style={{ borderBottom: `1px solid ${C.g(0.07)}` }}
                >
                  {/* Key */}
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '0.72rem',
                      color: C.green,
                      minWidth: '90px',
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
                      color: C.g(0.35),
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
                        color: C.green,
                        textDecoration: 'underline',
                        textDecorationColor: C.g(0.35),
                      }}
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '0.72rem',
                        color: row.cyan ? C.cyan : C.w(0.8),
                      }}
                    >
                      {row.value}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {/* Thin horizontal green line above the quote */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '60px' }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{
                  height: '2px',
                  backgroundColor: C.green,
                  marginBottom: '1rem',
                }}
              />
              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  lineHeight: 1.05,
                  color: C.white,
                }}
              >
                {t.about.quotePart1}{' '}
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    x: [0, 5, -4, 3, -1, 0],
                    color: [C.green, C.cyan, '#FF003C', C.cyan, C.green],
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.35 }}
                  style={{ color: C.green, textShadow: `0 0 25px ${C.g(0.6)}`, display: 'inline-block' }}
                >
                  {t.about.quoteWord}
                </motion.span>
                {' '}{t.about.quotePart2}
              </p>
            </motion.div>

            {/* Bio paragraphs — each fades up with a slight stagger */}
            <div className="flex flex-col gap-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.8rem',
                  color: C.w(0.5),
                  lineHeight: 1.75,
                }}
              >
                {t.about.bio1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.8rem',
                  color: C.w(0.5),
                  lineHeight: 1.75,
                }}
              >
                {t.about.bio2}
              </motion.p>
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
                  whileHover={{ background: C.g(0.1), borderColor: C.g(0.55) }}
                  className="px-2 py-1 cursor-default"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '0.62rem',
                    color: C.green,
                    border: `1px solid ${C.g(0.3)}`,
                    background: C.g(0.05),
                    letterSpacing: '0.05em',
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
