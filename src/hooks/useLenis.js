import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Initializes Lenis smooth scroll and runs the raf loop — returns the lenis instance
function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Run the animation frame loop so Lenis updates every frame
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    let rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}

export default useLenis
