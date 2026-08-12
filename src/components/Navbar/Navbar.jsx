import { useEffect, useRef, useState } from 'react'
import NavContent from '../Hero/NavContent'
import heroStyles from '../Hero/Hero.module.css'

export default function Navbar() {
  const navRef = useRef(null)
  const stickyNavRef = useRef(null)
  const [pastHero, setPastHero] = useState(false)
  const [nearBottom, setNearBottom] = useState(false)

  useEffect(() => {
    const el = navRef.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // the sticky bar is `position: fixed`, so it permanently reserves its
    // own height at the top of the viewport once shown — including once
    // scrolled to the very bottom of the page, where (depending on the
    // window's height vs. the page's) that reserved strip can land right
    // on top of the footer's own top content (e.g. the contact heading).
    // Hiding it again once we're within its own height of the page's true
    // end removes that overlap regardless of viewport size.
    const updateNearBottom = () => {
      const navHeight = stickyNavRef.current?.offsetHeight ?? 0
      const distanceFromBottom =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
      setNearBottom(distanceFromBottom < navHeight)
    }
    updateNearBottom()
    window.addEventListener('scroll', updateNearBottom, { passive: true })
    window.addEventListener('resize', updateNearBottom)
    return () => {
      window.removeEventListener('scroll', updateNearBottom)
      window.removeEventListener('resize', updateNearBottom)
    }
  }, [])

  const stickyVisible = pastHero && !nearBottom

  return (
    <>
      <header className={heroStyles.navbar} ref={navRef}>
        <NavContent />
      </header>

      <header
        ref={stickyNavRef}
        className={`${heroStyles.navbar} ${heroStyles.stickyNavBar} ${stickyVisible ? heroStyles.stickyNavVisible : ''}`}
      >
        <NavContent sticky />
      </header>
    </>
  )
}
