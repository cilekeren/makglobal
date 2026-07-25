import { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { pillPathD, PILL_STROKE_W } from '../Hero/pillPath'
import lifestyleImg from '../../assets/areas/lifestyle.jpg'
import educationImg from '../../assets/areas/education.jpg'
import experiencesImg from '../../assets/areas/experiences.jpg'
import Button from '../common/Button'
import styles from './AreaCards.module.css'

const CARDS = [
  { id: 'lifestyle', image: lifestyleImg },
  { id: 'education', image: educationImg },
  { id: 'experiences', image: experiencesImg },
]

// Same drawn-pill outline as the navbar's NavItem, sized to the label's
// own box via ResizeObserver so the stroke hugs the text exactly.
function CardLabel({ label }) {
  const pillBoxRef = useRef(null)
  const [pillSize, setPillSize] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const el = pillBoxRef.current
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setPillSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <span className={styles.labelWrap}>
      <span className={styles.label}>{label}</span>

      <span className={styles.pillBox} ref={pillBoxRef}>
        {pillSize.w > 0 && (
          <svg
            className={styles.pillSvg}
            viewBox={`0 0 ${pillSize.w} ${pillSize.h}`}
            preserveAspectRatio="none"
          >
            <path
              className={styles.pillPath}
              d={pillPathD(pillSize.w, pillSize.h)}
              pathLength="1"
              strokeWidth={PILL_STROKE_W}
            />
          </svg>
        )}
      </span>
    </span>
  )
}

export default function AreaCards() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section className={styles.section}>
      <div className={styles.cardsRow}>
        {CARDS.map((card) => {
          const label = t(`areaCards.${card.id}`)
          return (
            <button
              key={card.id}
              type="button"
              className={styles.card}
              onClick={() => navigate('/discover-london')}
            >
              <img src={card.image} alt={label} className={styles.image} />
              <CardLabel label={label} />
            </button>
          )
        })}
      </div>
      <div className={styles.ctaWrap}>
        <Button
          label={t('common.discoverLondon')}
          color="#0A3332"
          onClick={() => navigate('/discover-london')}
        />
      </div>
    </section>
  )
}
