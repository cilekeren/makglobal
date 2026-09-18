import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/common/Button'
import styles from './DiscoverLondon.module.css'

const MOBILE_QUERY = '(max-width: 700px)'

// same card-click-plus-Details-button pattern as Projects/ProjectCard.jsx
// — hovering anywhere on the card (not just the small button) drives the
// button's own hover animation via its `hovered` prop.
export default function UniversityCard({ uni, onOpen }) {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <div
      className={styles.universityCard}
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
    >
      <img src={uni.image} alt={uni.name} className={styles.universityImage} />
      <h3 className={styles.universityName}>{uni.name}</h3>

      <div className={styles.universityBottomRow}>
        <p className={styles.universityLocation}>{uni.location}</p>

        <div className={styles.universityDetailsBtnWrap}>
          <Button
            label={t('common.details')}
            variant="filled"
            color="#8b3a3a"
            textColor="#fff"
            scale={isMobile ? 1.8 : 2.1}
            strokeScale={3}
            padding={10}
            arrowLength={24}
            hovered={hovered}
          />
        </div>
      </div>
    </div>
  )
}
