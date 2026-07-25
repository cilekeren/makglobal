import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../common/Button'
import aboutVisual from '../../assets/about/about-visual.webp'
import styles from './About.module.css'

export default function About() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section className={styles.section}>
      <img src={aboutVisual} alt="" className={styles.bgImage} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h2 className={styles.heading}>{t('about.heading')}</h2>

        <p className={styles.body}>{t('about.bodyParagraph1')}</p>

        <p className={styles.body}>{t('about.bodyParagraph2')}</p>

        <div className={styles.ctaWrap}>
          <Button label={t('common.learnMore')} color="#fff" onClick={() => navigate('/about')} />
        </div>
      </div>
    </section>
  )
}
