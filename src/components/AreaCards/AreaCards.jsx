import lifestyleImg from '../../assets/areas/lifestyle.jpg'
import educationImg from '../../assets/areas/education.jpg'
import experiencesImg from '../../assets/areas/experiences.jpg'
import styles from './AreaCards.module.css'

const CARDS = [
  { label: 'Lifestyle', image: lifestyleImg },
  { label: 'Education', image: educationImg },
  { label: 'Experiences', image: experiencesImg },
]

export default function AreaCards() {
  return (
    <section className={styles.section}>
      <div className={styles.cardsRow}>
        {CARDS.map((card) => (
          <div key={card.label} className={styles.card}>
            <img src={card.image} alt={card.label} className={styles.image} />
            <span className={styles.label}>{card.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
