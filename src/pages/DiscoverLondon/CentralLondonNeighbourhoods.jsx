import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar/Navbar'
import heroStyles from '../../components/Hero/Hero.module.css'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/common/Button'
import NeighbourhoodCard from './NeighbourhoodCard'
import NeighbourhoodModal from './NeighbourhoodModal'
import heroVisual from '../../assets/hero/slider/slide-18.webp'
import makStampRing from '../../assets/journey/mak-stamp-ring.svg'
import makStampCenter from '../../assets/journey/mak-stamp-center.svg'
import { NEIGHBOURHOODS } from '../../data/neighbourhoods'
import { useSEO } from '../../lib/seo'
import styles from './DiscoverLondon.module.css'

// Discover London > Lifestyle & Experiences > Central London Neighbourhoods.
// Same hero/intro band and card grid + modal as the Discover London page's
// Education section (DiscoverLondon.jsx), just for neighbourhoods.
export default function CentralLondonNeighbourhoods() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  useSEO({
    title: t('seo.centralLondonNeighbourhoods.title'),
    description: t('seo.centralLondonNeighbourhoods.description'),
  })

  // index of the neighbourhood whose modal is open, or null when closed —
  // the modal loops through NEIGHBOURHOODS regardless of which card it was
  // opened from.
  const [openIndex, setOpenIndex] = useState(null)
  const stepOpenIndex = (delta) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + NEIGHBOURHOODS.length) % NEIGHBOURHOODS.length))

  return (
    <>
      <div className={styles.heroOuter}>
        <section className={styles.hero}>
          <img src={heroVisual} className={styles.bgImage} alt="" />
          <div className={heroStyles.vignetteTop} />

          <Navbar />
        </section>

        <section className={styles.introBand}>
          <h1 className={styles.heading}>{t('discoverLondonPage.neighbourhoods.heading')}</h1>
          <p className={styles.body}>{t('discoverLondonPage.neighbourhoods.intro')}</p>

          <div className={styles.stampWrap}>
            <img className={styles.stampRing} src={makStampRing} alt="" />
            <img className={styles.stampCenter} src={makStampCenter} alt="" />
          </div>
        </section>

        <div className={styles.stampGap} aria-hidden="true" />
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>{t('discoverLondonPage.neighbourhoods.subheading')}</h2>

        <div className={styles.universityGrid}>
          {NEIGHBOURHOODS.map((item, i) => (
            <NeighbourhoodCard key={item.id} neighbourhood={item} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>

        <div className={styles.backRow}>
          <Button
            label={t('common.discoverLondon')}
            color="#0A3332"
            reverse
            onClick={() => navigate('/discover-london#lifestyle-experiences')}
          />
          <Button label={t('nav.buyersGuide')} color="#0A3332" onClick={() => navigate('/buyers-guide')} />
        </div>
      </section>

      <Footer />

      {openIndex !== null && (
        <NeighbourhoodModal
          neighbourhoods={NEIGHBOURHOODS}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onStep={stepOpenIndex}
        />
      )}
    </>
  )
}
