import { useEffect, useState } from 'react'
import { useCookieConsentDecided, useCookieCardTopOffset } from '../../lib/cookieConsentStore'
import ArrowIcon from '../common/ArrowIcon'
import { scrollToTop } from '../../lib/lenis'
import styles from './BackToTopButton.module.css'

// mirror image of WhatsAppButton: same size, same bottom offsets (incl. the
// lift above the cookie card on mobile, where the card spans full width),
// just pinned to the opposite (left) edge.
const MOBILE_QUERY = '(max-width: 480px)'
const REST_BOTTOM_DESKTOP = 36
const REST_BOTTOM_MOBILE = 24
const GAP_ABOVE_CARD = 32
const FALLBACK_TOP_OFFSET = 240
// the button only appears once the page has been scrolled this far
const SHOW_AFTER_PX = 400

export default function BackToTopButton() {
  const decided = useCookieConsentDecided()
  const topOffset = useCookieCardTopOffset()
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const restBottom = isMobile ? REST_BOTTOM_MOBILE : REST_BOTTOM_DESKTOP
  const bottom = decided ? restBottom : isMobile ? (topOffset || FALLBACK_TOP_OFFSET) + GAP_ABOVE_CARD : restBottom

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      style={{ bottom }}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowIcon lineLength={8} className={styles.arrow} />
    </button>
  )
}
