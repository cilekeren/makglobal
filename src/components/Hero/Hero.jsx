import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import HeroSlider from './HeroSlider'
import NavContent from './NavContent'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const rootRef = useRef(null)
  const navRef = useRef(null)
  const stickyNavRef = useRef(null)
  const lineRefs = useRef([])
  const subtextRef = useRef(null)
  const buttonRef = useRef(null)
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
    // end removes that overlap regardless of viewport size. (Same fix as
    // components/Navbar/Navbar.jsx — Hero duplicates the sticky-nav logic
    // rather than using that component, since it also drives the hero's
    // own entrance animation on navRef.)
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
                {t('hero.headingLine1')}
              </span>
            </span>
            <span className={styles.line}>
              <span
                className={styles.lineInner}
                ref={(el) => el && (lineRefs.current[1] = el)}
              >
                {t('hero.headingLine2')}
              </span>
            </span>
          </h1>
        </div>

        <div className={styles.subtextWrap}>
          <p className={styles.subtext} ref={subtextRef}>
            <span className={styles.subtextLine}>{t('hero.subtextLine1')}</span>{' '}
            <span className={styles.subtextLine}>{t('hero.subtextLine2')}</span>
          </p>
        </div>

        <Button label={t('common.viewProjects')} innerRef={buttonRef} onClick={() => navigate('/projects')} />
      </div>
    </section>

    <header
      ref={stickyNavRef}
      data-sticky-nav
      className={`${styles.navbar} ${styles.stickyNavBar} ${stickyVisible ? styles.stickyNavVisible : ''}`}
    >
      <NavContent sticky />
    </header>
    </div>
  )
}
