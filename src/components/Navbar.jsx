import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LangContext'
import useReducedMotion from '../hooks/useReducedMotion'
import { C } from '../theme/colors'

// Scrolls smoothly to a section — uses Lenis if available, falls back to native
function scrollTo(id, lenisRef) {
  const lenis = lenisRef?.current
  if (lenis) {
    lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.8 })
  } else {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

// Language labels for aria-label accessibility
const LANG_LABELS = { en: 'English', es: 'Español', pt: 'Português', fr: 'Français' }

// Available language codes
const LANGS = ['en', 'es', 'pt', 'fr']

// Language switcher buttons — EN / ES / PT / FR
function LangSelector({ lang, changeLang }) {
  return (
    <div style={{ display: 'flex', gap: '0.25rem' }} role="group" aria-label="Language selector">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => changeLang(l)}
          aria-pressed={lang === l}
          aria-label={`Switch to ${LANG_LABELS[l]}`}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.58rem',
            letterSpacing: '0.1em',
            background: lang === l ? C.g(0.15) : 'transparent',
            border: `1px solid ${lang === l ? C.borderStrong : C.border}`,
            color: lang === l ? C.green : C.g(0.4),
            cursor: 'pointer',
            padding: '0.4rem 0.6rem',
            textTransform: 'uppercase',
            transition: 'background 0.2s, border-color 0.2s, color 0.2s',
            minWidth: '2rem',
            minHeight: '2rem',
          }}
          onMouseEnter={(e) => {
            if (l !== lang) {
              e.currentTarget.style.color = C.green
              e.currentTarget.style.borderColor = C.g(0.35)
            }
          }}
          onMouseLeave={(e) => {
            if (l !== lang) {
              e.currentTarget.style.color = C.g(0.4)
              e.currentTarget.style.borderColor = C.border
            }
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

// Fixed top navbar with signal indicator, nav links, lang selector, and CTA button
function Navbar({ lenisRef }) {
  const { lang, changeLang, t } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const [activeId, setActiveId] = useState('home')
  const [glitchId, setGlitchId] = useState(null)

  // Track active section: whichever section's top is closest to (but above) the middle of the viewport
  useEffect(() => {
    const ids = ['home', 'about', 'projects', 'skills', 'contact']

    function onScroll() {
      const mid = window.innerHeight / 2
      let closest = ids[0]
      let closestDist = Infinity
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        // Distance from top of section to mid-screen, only count sections that have started
        const dist = Math.abs(rect.top - mid)
        if (dist < closestDist) {
          closestDist = dist
          closest = id
        }
      }
      setActiveId(closest)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // run once on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Trigger a short glitch on the link that just became active
  useEffect(() => {
    if (reducedMotion) return
    setGlitchId(activeId)
    const t = setTimeout(() => setGlitchId(null), 350)
    return () => clearTimeout(t)
  }, [activeId, reducedMotion])

  const NAV_LINKS = [
    { num: '01.', label: t.nav.home,     id: 'home'     },
    { num: '02.', label: t.nav.about,    id: 'about'    },
    { num: '03.', label: t.nav.projects, id: 'projects' },
    { num: '04.', label: t.nav.skills,   id: 'skills'   },
    { num: '05.', label: t.nav.contact,  id: 'contact'  },
  ]

  // Closes mobile menu and scrolls to section
  function handleMobileNav(id) {
    setMobileOpen(false)
    setTimeout(() => scrollTo(id, lenisRef), 300)
  }

  return (
    <>
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
          backgroundColor: C.b(0.92),
          borderBottom: `1px solid ${C.g(0.12)}`,
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          padding: '0.9rem clamp(1rem, 4vw, 3rem)',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
        }}
      >
        {/* LEFT — Signal indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          {/* Blinking green dot — always visible, paused when reduced motion is on */}
          <motion.span
            animate={reducedMotion ? { opacity: 1 } : { opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.2, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: C.green,
              flexShrink: 0,
            }}
          />
          {/* "SIGNAL_ACTIVE // " — hidden on small screens to save space */}
          <span
            className="hidden sm:inline"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              color: C.green,
              whiteSpace: 'nowrap',
            }}
          >
            SIGNAL_ACTIVE //{'  '}
          </span>
          {/* "LV.DEV" — always visible */}
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              color: C.green,
              whiteSpace: 'nowrap',
            }}
          >
            LV.DEV
          </span>
        </div>

        {/* CENTER — Nav links (hidden below md / 768px) */}
        <nav
          className="hidden md:flex"
          aria-label="Main navigation"
          style={{ gap: '2rem', alignItems: 'center' }}
        >
          {NAV_LINKS.map(({ num, label, id }) => (
            <NavLink key={id} num={num} label={label} id={id} lenisRef={lenisRef}
              active={activeId === id} glitch={glitchId === id} />
          ))}
        </nav>

        {/* RIGHT — Lang selector + CTA button + hamburger */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem' }}>
          <LangSelector lang={lang} changeLang={changeLang} />
          {/* CTA hidden on mobile — not enough space */}
          <div className="hidden md:block">
            <CTAButton label={t.nav.cta} onClick={() => scrollTo('contact', lenisRef)} />
          </div>
          {/* Hamburger button — visible only on mobile */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            style={{
              background: 'none',
              border: `1px solid ${C.g(0.25)}`,
              cursor: 'pointer',
              padding: '0.45rem 0.55rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span style={{ display: 'block', width: '18px', height: '2px', backgroundColor: C.green, transition: 'transform 0.2s, opacity 0.2s', transform: mobileOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', backgroundColor: C.green, transition: 'opacity 0.2s', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '18px', height: '2px', backgroundColor: C.green, transition: 'transform 0.2s, opacity 0.2s', transform: mobileOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu — slides down from navbar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '3.5rem',
              left: 0,
              right: 0,
              zIndex: 49,
              backgroundColor: C.b(0.97),
              borderBottom: `1px solid ${C.g(0.15)}`,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              padding: '1.5rem clamp(1rem, 4vw, 3rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
          >
            {NAV_LINKS.map(({ num, label, id }) => (
              <button
                key={id}
                onClick={() => handleMobileNav(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: `1px solid ${C.g(0.07)}`,
                  cursor: 'pointer',
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '1rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <span style={{ color: C.green, fontSize: '0.65rem' }}>{num}</span>
                <span style={{ color: C.w(0.7) }}>{label}</span>
              </button>
            ))}
            <div style={{ paddingTop: '1rem' }}>
              <CTAButton
                label={t.nav.cta}
                onClick={() => handleMobileNav('contact')}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Single nav link — highlights when section is active, glitches on transition
function NavLink({ num, label, id, lenisRef, active, glitch }) {
  return (
    <motion.button
      onClick={() => scrollTo(id, lenisRef)}
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
    >
      <span style={{ color: C.green }}>{num}</span>
      <motion.span
        animate={glitch
          ? { x: [-4, 3, -1, 0], color: [C.cyan, C.cyan, C.green, active ? C.green : C.textDim] }
          : { x: 0, color: active ? C.green : C.textDim }
        }
        transition={glitch
          ? { duration: 0.18, ease: 'easeOut' }
          : { duration: 0.25 }
        }
        style={{
          display: 'inline-block',
          textShadow: active ? `0 0 10px ${C.g(0.6)}` : 'none',
          transition: 'text-shadow 0.25s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.textShadow = `0 0 10px ${C.green}`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.textShadow = active ? `0 0 10px ${C.g(0.6)}` : 'none'
        }}
      >
        {label}
      </motion.span>
    </motion.button>
  )
}

// CTA button — translatable label, hover to cyan
function CTAButton({ label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.68rem',
        letterSpacing: '0.15em',
        backgroundColor: C.green,
        color: C.bg,
        border: 'none',
        cursor: 'pointer',
        padding: '0.45rem 1rem',
        transition: 'background-color 0.2s, box-shadow 0.2s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = C.cyan
        e.currentTarget.style.boxShadow = `0 0 20px ${C.c(0.4)}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = C.green
        e.currentTarget.style.boxShadow = 'none'
      }}
      onFocus={e => {
        e.currentTarget.style.backgroundColor = C.cyan
        e.currentTarget.style.boxShadow = `0 0 20px ${C.c(0.4)}`
      }}
      onBlur={e => {
        e.currentTarget.style.backgroundColor = C.green
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {label}
    </motion.button>
  )
}

export default Navbar
