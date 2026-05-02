// Root app — renders Navbar, all sections, and Footer in order
import { useEffect, useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import useLenis from './hooks/useLenis'
import { LangProvider } from './context/LangContext'
import Navbar from './components/Navbar'
import Hero   from './components/Hero'

// Lazy-loaded sections — deferred until after Hero paints
const About    = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Skills   = lazy(() => import('./components/Skills'))
const Contact  = lazy(() => import('./components/Contact'))
const Footer   = lazy(() => import('./components/Footer'))

// Thin gradient line between sections — reinforces the SIGNAL/NOISE visual rhythm
function SectionDivider() {
  return (
    <div
      style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.12), transparent)',
      }}
    />
  )
}

// Fixed button that appears after scrolling past Hero — scrolls back to top on click.
// Hides itself when the footer enters viewport so it never overlaps the bottom links.
function ScrollToTop({ lenisRef }) {
  const [pastHero, setPastHero] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  // Watch the Hero — button is candidate-visible only when Hero is fully out
  useEffect(() => {
    const hero = document.getElementById('home')
    if (!hero) return
    const io = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  // Watch the footer — once visible, hide the button to avoid overlapping the bottom links.
  // Footer is lazy-loaded, so we poll the DOM briefly until it mounts, then attach the observer.
  useEffect(() => {
    let io
    let pollId
    function attach() {
      const footer = document.querySelector('footer')
      if (!footer) {
        pollId = setTimeout(attach, 200)
        return
      }
      io = new IntersectionObserver(
        ([entry]) => setFooterVisible(entry.isIntersecting),
        { threshold: 0 }
      )
      io.observe(footer)
    }
    attach()
    return () => {
      if (io) io.disconnect()
      if (pollId) clearTimeout(pollId)
    }
  }, [])

  const visible = pastHero && !footerVisible

  function handleClick() {
    const lenis = lenisRef?.current
    if (lenis) lenis.scrollTo(0, { duration: 1.5 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 50,
            width: '44px',
            height: '44px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(0,255,65,0.35)',
            color: '#00FF41',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)',
            boxShadow: '0 0 10px rgba(0,255,65,0.12)',
            transition: 'background-color 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(0,255,65,0.08)'
            e.currentTarget.style.boxShadow = '0 0 22px rgba(0,255,65,0.28)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.boxShadow = '0 0 10px rgba(0,255,65,0.12)'
          }}
          aria-hidden="false"
        >
          <span aria-hidden="true">▲</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Visually hidden link — appears on Tab focus, lets keyboard users jump straight to content
function SkipLink() {
  return (
    <a
      href="#home"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 0,
        zIndex: 100,
        padding: '0.6rem 1rem',
        backgroundColor: '#00FF41',
        color: '#020502',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.78rem',
        textDecoration: 'none',
        letterSpacing: '0.08em',
      }}
      onFocus={(e) => { e.target.style.left = '0.5rem'; e.target.style.top = '0.5rem' }}
      onBlur={(e) => { e.target.style.left = '-9999px' }}
    >
      SKIP TO CONTENT
    </a>
  )
}

function App() {
  const lenisRef = useLenis()

  return (
    // MotionConfig "never" disables framer-motion's automatic reduced-motion handling.
    // We honor prefers-reduced-motion manually via the useReducedMotion hook in the
    // few components that have looping decorative animations, so transitions and
    // one-shot reveals stay snappy and predictable.
    <MotionConfig reducedMotion="never">
      <LangProvider>
        <SkipLink />
        <Navbar lenisRef={lenisRef} />
        <Hero />
        <ScrollToTop lenisRef={lenisRef} />
        <Suspense fallback={<div style={{ backgroundColor: '#020502', minHeight: '100vh' }} />}>
          <SectionDivider />
          <About />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Contact />
          <SectionDivider />
          <Footer />
        </Suspense>
      </LangProvider>
    </MotionConfig>
  )
}

export default App
