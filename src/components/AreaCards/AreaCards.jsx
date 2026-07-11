import { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pillPathD, PILL_STROKE_W } from '../Hero/pillPath'
import lifestyleImg from '../../assets/areas/lifestyle.jpg'
import educationImg from '../../assets/areas/education.jpg'
import experiencesImg from '../../assets/areas/experiences.jpg'
import styles from './AreaCards.module.css'

const CARDS = [
  { label: 'Lifestyle', image: lifestyleImg },
  { label: 'Education', image: educationImg },
  { label: 'Experiences', image: experiencesImg },
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
  const navigate = useNavigate()

  return (
    <section className={styles.section}>
      <div className={styles.cardsRow}>
        {CARDS.map((card) => (
          <button
            key={card.label}
            type="button"
            className={styles.card}
            onClick={() => navigate('/discover-london')}
          >
            <img src={card.image} alt={card.label} className={styles.image} />
            <CardLabel label={card.label} />
          </button>
        ))}
      </div>
    </section>
  )
}
