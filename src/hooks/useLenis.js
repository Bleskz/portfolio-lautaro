import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// True for primary-touch devices (phones, most tablets) — Lenis hijacks touch scroll badly here.
// Laptops with touchscreens still get Lenis since their main input is a mouse.
function isPrimaryTouchDevice() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: none) and (pointer: coarse) and (max-width: 1024px)').matches
}

// True when the user has explicitly asked for reduced motion at OS level
function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Initializes Lenis smooth scroll and runs the raf loop — returns the lenis instance ref.
// Skipped on touch-primary devices. Under prefers-reduced-motion we keep Lenis but use a
// short duration so the scroll still feels controlled instead of jarring.
function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (isPrimaryTouchDevice()) return

    const reduced = prefersReducedMotion()
    const lenis = new Lenis({
      duration: reduced ? 0.6 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

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
