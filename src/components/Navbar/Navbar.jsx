import { useEffect, useRef, useState } from 'react'
import NavContent from '../Hero/NavContent'
import heroStyles from '../Hero/Hero.module.css'

export default function Navbar() {
  const navRef = useRef(null)
  const [stickyVisible, setStickyVisible] = useState(false)

  useEffect(() => {
    const el = navRef.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className={heroStyles.navbar} ref={navRef}>
        <NavContent />
      </header>

      <header
        className={`${heroStyles.navbar} ${heroStyles.stickyNavBar} ${stickyVisible ? heroStyles.stickyNavVisible : ''}`}
      >
        <NavContent sticky />
      </header>
    </>
  )
}
