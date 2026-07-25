import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/common/Button'
import aboutVisual from '../../assets/about/about-visual.webp'
import whyIcon1 from '../../assets/about/why_icon_1.svg'
import whyIcon2 from '../../assets/about/why_icon_2.svg'
import whyIcon3 from '../../assets/about/why_icon_3.svg'
import whyIcon4 from '../../assets/about/why_icon_4.svg'
import whyIcon5 from '../../assets/about/why_icon_5.svg'
import whyIcon6 from '../../assets/about/why_icon_6.svg'
import makStampRing from '../../assets/journey/mak-stamp-ring.svg'
import makStampCenter from '../../assets/journey/mak-stamp-center.svg'
import styles from './AboutUs.module.css'

const REASON_IDS = [
  ['industryKnowledge', whyIcon1],
  ['carefulSelection', whyIcon2],
  ['guidanceThroughout', whyIcon3],
  ['internationalExperience', whyIcon4],
  ['trustedNetwork', whyIcon5],
  ['longTermApproach', whyIcon6],
]

export default function AboutUs() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const STORY_BODY = [t('aboutUs.storyBody1'), t('aboutUs.storyBody2')]
  const REASONS = REASON_IDS.map(([id, icon]) => ({
    id,
    icon,
    title: t(`aboutUs.reasons.${id}.title`),
    body: t(`aboutUs.reasons.${id}.body`),
  }))

  return (
    <>
      <div className={styles.heroOuter}>
        <section className={styles.hero}>
          <img src={aboutVisual} className={styles.bgImage} alt="" />
          <div className={styles.overlay} />

          <Navbar />
        </section>
      </div>

      <section className={styles.storyBand}>
        <h1 className={styles.heading}>{t('aboutUs.heading')}</h1>
        {STORY_BODY.map((paragraph) => (
          <p key={paragraph} className={styles.body}>
            {paragraph}
          </p>
        ))}

        <div className={styles.stampWrap}>
          <img className={styles.stampRing} src={makStampRing} alt="" />
          <img className={styles.stampCenter} src={makStampCenter} alt="" />
        </div>
      </section>

      <section className={styles.reasonsSection}>
        <h2 className={styles.reasonsHeading}>{t('aboutUs.reasonsHeading')}</h2>

        <div className={styles.reasonsGrid}>
          {REASONS.map((reason) => (
            <div key={reason.id} className={styles.reasonCard}>
              <img src={reason.icon} alt="" className={styles.reasonIcon} />
              <span className={styles.reasonDivider} />
              <h3 className={styles.reasonTitle}>{reason.title}</h3>
              <p className={styles.reasonBody}>{reason.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.backSection}>
        <Button
          label={t('aboutUs.backToHome')}
          color="#0A3332"
          reverse
          onClick={() => navigate('/')}
        />
        <Button
          label={t('aboutUs.ourServices')}
          color="#0A3332"
          onClick={() => navigate('/services')}
        />
      </section>

      <Footer />
    </>
  )
}
