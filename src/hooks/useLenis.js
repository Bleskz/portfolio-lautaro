import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Detects touch-primary devices (mobile / tablet) — Lenis hijacks touch scroll badly here
function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches
}

// True when the user has explicitly asked for reduced motion at OS level
function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Initializes Lenis smooth scroll and runs the raf loop — returns the lenis instance ref.
// Skipped entirely on touch devices and when the user prefers reduced motion.
function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Run the animation frame loop so Lenis updates every frame
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}

export default useLenis
