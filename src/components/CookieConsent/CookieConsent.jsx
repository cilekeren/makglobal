import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../common/Button'
import {
  COOKIE_CONSENT_KEY,
  setCookieCardTopOffset,
  setCookieConsentDecided,
} from '../../lib/cookieConsentStore'
import styles from './CookieConsent.module.css'

export default function CookieConsent() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    if (localStorage.getItem(COOKIE_CONSENT_KEY)) return
    setVisible(true)
    // mounts hidden first, then flips a class a frame later so the
    // fade/slide-in transition actually has a starting state to animate
    // from instead of just appearing already at rest.
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Reports how far its top edge sits from the viewport's bottom edge so
  // the floating WhatsApp button can rest just above it instead of
  // guessing a fixed offset — this varies with locale (TR copy runs
  // longer), viewport width (card goes full-bleed under 480px), and the
  // window's own height.
  useLayoutEffect(() => {
    if (!visible || !cardRef.current) return
    const el = cardRef.current
    const report = () => setCookieCardTopOffset(window.innerHeight - el.getBoundingClientRect().top)
    const ro = new ResizeObserver(report)
    ro.observe(el)
    window.addEventListener('resize', report)
    report()
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', report)
      setCookieCardTopOffset(0)
    }
  }, [visible])

  const decide = (value) => {
    setCookieConsentDecided(value)
    setEntered(false)
    setTimeout(() => setVisible(false), 200)
  }

  if (!visible) return null

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${entered ? styles.cardEntered : ''}`}
      role="dialog"
      aria-live="polite"
      aria-label={t('cookieConsent.heading')}
    >
      <h2 className={styles.heading}>{t('cookieConsent.heading')}</h2>
      <p className={styles.body}>
        {t('cookieConsent.body')}{' '}
        <Link to="/cookie-policy" className={styles.link}>
          {t('cookieConsent.linkLabel')}
        </Link>
      </p>
      <div className={styles.actions}>
        <Button
          label={t('cookieConsent.acceptAll')}
          variant="filled"
          color="#163a3d"
          textColor="#fff"
          scale={1.9}
          strokeScale={3}
          padding={10}
          arrowLength={24}
          onClick={() => decide('all')}
        />
        <button type="button" className={styles.essentialBtn} onClick={() => decide('essential')}>
          {t('cookieConsent.essentialOnly')}
        </button>
      </div>
    </div>
  )
}
