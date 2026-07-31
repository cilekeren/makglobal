import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import { useCookieConsentDecided, useCookieCardTopOffset } from '../../lib/cookieConsentStore'
import styles from './WhatsAppButton.module.css'

const PHONE = '447825643292'
// matches WhatsAppButton.module.css's mobile breakpoint
const MOBILE_QUERY = '(max-width: 480px)'
const REST_BOTTOM_DESKTOP = 36
const REST_BOTTOM_MOBILE = 24
const GAP_ABOVE_CARD = 32
// used only for the brief moment before the card has reported its real
// position, so the button doesn't start out overlapping it.
const FALLBACK_TOP_OFFSET = 240

export default function WhatsAppButton() {
  const decided = useCookieConsentDecided()
  const topOffset = useCookieCardTopOffset()
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const restBottom = isMobile ? REST_BOTTOM_MOBILE : REST_BOTTOM_DESKTOP
  const bottom = decided ? restBottom : (topOffset || FALLBACK_TOP_OFFSET) + GAP_ABOVE_CARD

  return (
    <a
      href={`https://wa.me/${PHONE}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      style={{ bottom }}
      aria-label="WhatsApp"
    >
      <FaWhatsapp />
    </a>
  )
}
