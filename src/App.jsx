// Root app — renders Navbar, all sections, and Footer in order
import { useEffect, lazy, Suspense } from 'react'
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
