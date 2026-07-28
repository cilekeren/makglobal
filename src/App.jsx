import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { setLenis } from './lib/lenis'
import Home from './pages/Home/Home'
import Projects from './pages/Projects/Projects'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'
import DiscoverLondon from './pages/DiscoverLondon/DiscoverLondon'
import AboutUs from './pages/AboutUs/AboutUs'
import Services from './pages/Services/Services'
import BuyersGuide from './pages/BuyersGuide/BuyersGuide'
import NotFound from './pages/NotFound/NotFound'

function App() {
  const lenisRef = useRef(null)
  const location = useLocation()
  const { pathname, hash } = location

  useEffect(() => {
    // Lenis smooths mouse-wheel/trackpad input but still drives the real
    // native window scroll position (it's not a virtual/transform-based
    // scroll), so the custom scroll-jacking sections (ZoneIsometric,
    // AreaCards, BuyingJourney) keep reading window.scrollY /
    // getBoundingClientRect() exactly as before.
    const lenis = new Lenis()
    lenisRef.current = lenis
    setLenis(lenis)
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
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    // Without this, navigating to a new route keeps whatever scroll
    // position the previous page was at (Lenis drives the real window
    // scroll, so a plain window.scrollTo(0,0) fights its rAF loop instead
    // of resetting it). A #hash (e.g. the Buyer's Guide nav dropdown
    // linking to /buyers-guide#faqs) instead smooth-scrolls to that
    // section once its element exists in the freshly-mounted page — one
    // rAF after commit is enough for React to have painted it.
    if (hash) {
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          // Lenis caches the document's scrollable height and only
          // recomputes it on its own debounced resize listener — which
          // may not have caught up yet with a freshly-mounted page's real
          // height (e.g. BuyingJourney's 650vh section), so without this
          // a target far down the page (like #faqs) silently clamps to
          // whatever shorter height Lenis still remembers.
          lenisRef.current?.resize()
          lenisRef.current?.scrollTo(el, { offset: -140 })
        } else {
          lenisRef.current?.scrollTo(0, { immediate: true })
        }
      })
      return () => cancelAnimationFrame(raf)
    }
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname, hash])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/discover-london" element={<DiscoverLondon />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/buyers-guide" element={<BuyersGuide />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
