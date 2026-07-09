import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Button from '../common/Button'
import HeroSlider from './HeroSlider'
import NavContent from './NavContent'
import styles from './Hero.module.css'

export default function Hero() {
  const rootRef = useRef(null)
  const navRef = useRef(null)
  const lineRefs = useRef([])
  const subtextRef = useRef(null)
  const buttonRef = useRef(null)
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([navRef.current, subtextRef.current, buttonRef.current], { opacity: 0 })
      gsap.set(navRef.current, { y: -24 })
      gsap.set(lineRefs.current, { opacity: 0, yPercent: 120 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to(navRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to(lineRefs.current, { opacity: 1, yPercent: 0, duration: 1, stagger: 0.12 }, 0.6)
        .to(subtextRef.current, { opacity: 1, duration: 0.9 }, 1.1)
        .to(buttonRef.current, { opacity: 1, duration: 0.8 }, 1.3)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.heroOuter}>
    <section className={styles.hero} ref={rootRef}>
      <HeroSlider />

      <div className={styles.vignetteTop} />

      <div className={styles.vignetteBottomWrap}>
        <div className={styles.vignetteBottomInner} />
      </div>

      <header className={styles.navbar} ref={navRef}>
        <NavContent />
      </header>

      <div className={styles.content}>
        <div className={styles.headingWrap}>
          <h1 className={styles.heading}>
            <span className={styles.line}>
              <span
                className={styles.lineInner}
                ref={(el) => el && (lineRefs.current[0] = el)}
              >
                Considering Purchasing
              </span>
            </span>
            <span className={styles.line}>
              <span
                className={styles.lineInner}
                ref={(el) => el && (lineRefs.current[1] = el)}
              >
                Property in the UK?
              </span>
            </span>
          </h1>
        </div>

        <div className={styles.subtextWrap}>
          <p className={styles.subtext} ref={subtextRef}>
            <span className={styles.subtextLine}>
              Based on your objectives, preferred location, and budget,
            </span>
            <span className={styles.subtextLine}>
              we help you identify developments that match your investment goals.
            </span>
          </p>
        </div>

        <Button label="VIEW PROJECTS" innerRef={buttonRef} />
      </div>
    </section>

    <header className={`${styles.navbar} ${styles.stickyNavBar} ${stickyVisible ? styles.stickyNavVisible : ''}`}>
      <NavContent sticky />
    </header>
    </div>
  )
}
