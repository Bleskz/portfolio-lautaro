// Root app — renders Navbar, all sections, and Footer in order
import { useEffect } from 'react'
import useLenis from './hooks/useLenis'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import About    from './components/About'
import Projects from './components/Projects'
import Skills   from './components/Skills'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

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
function useScrollFlash() {
  useEffect(() => {
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
  }, [])
}

function App() {
  useScrollFlash()
  const lenisRef = useLenis()

  return (
    <>
      <Navbar lenisRef={lenisRef} />
      <Hero />
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
    </>
  )
}

export default App
