// Root app — renders Navbar, all sections, and Footer in order
import { useEffect, useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useLenis from './hooks/useLenis'
import useReducedMotion from './hooks/useReducedMotion'
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

// Fixed button that appears after scrolling 400px — scrolls back to top on click
function ScrollToTop({ lenisRef }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 400) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        >
          ▲
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Applies a brief brightness flash on fast scrolls (CRT flicker effect)
// Skipped entirely when prefers-reduced-motion is active
function useScrollFlash(reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return

    let lastY = window.scrollY
    let flashTimeout = null

    function handleScroll() {
      const currentY = window.scrollY
      const delta = Math.abs(currentY - lastY)
      lastY = currentY

      if (delta > 100) {
        document.body.style.filter = 'brightness(1.04)'
        clearTimeout(flashTimeout)
        flashTimeout = setTimeout(() => {
          document.body.style.filter = 'none'
        }, 80)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(flashTimeout)
      document.body.style.filter = 'none'
    }
  }, [reducedMotion])
}

function App() {
  const reducedMotion = useReducedMotion()
  useScrollFlash(reducedMotion)
  const lenisRef = useLenis()

  return (
    <LangProvider>
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
  )
}

export default App
