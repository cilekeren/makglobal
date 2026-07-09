import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Home from './pages/Home/Home'
import Projects from './pages/Projects/Projects'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'

function App() {
  const lenisRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    // Lenis smooths mouse-wheel/trackpad input but still drives the real
    // native window scroll position (it's not a virtual/transform-based
    // scroll), so the custom scroll-jacking sections (ZoneIsometric,
    // AreaCards, BuyingJourney) keep reading window.scrollY /
    // getBoundingClientRect() exactly as before.
    const lenis = new Lenis()
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

  useEffect(() => {
    // Without this, navigating to a new route keeps whatever scroll
    // position the previous page was at (Lenis drives the real window
    // scroll, so a plain window.scrollTo(0,0) fights its rAF loop instead
    // of resetting it).
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
    </Routes>
  )
}

export default App
