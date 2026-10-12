import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/common/Button'
import styles from './DiscoverLondon.module.css'

const MOBILE_QUERY = '(max-width: 700px)'

// same card as UniversityCard.jsx (and its styles), with the neighbourhood's
// tagline in place of the university's location line.
export default function NeighbourhoodCard({ neighbourhood, onOpen }) {
  const { t, i18n } = useTranslation()
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const tagline = neighbourhood.tagline[i18n.language] || neighbourhood.tagline.en

  return (
    <div
      className={`${styles.universityCard} ${styles.neighbourhoodCard}`}
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
      <img src={neighbourhood.image} alt={neighbourhood.name} className={styles.universityImage} />
      <h3 className={styles.universityName}>{neighbourhood.name}</h3>

      <div className={styles.universityBottomRow}>
        <p className={styles.universityLocation}>{tagline}</p>

        <div className={styles.universityDetailsBtnWrap}>
          <Button
            label={t('common.details')}
            variant="filled"
            color="#e2c27a"
            textColor="#0a3332"
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
