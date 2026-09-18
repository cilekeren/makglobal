import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar/Navbar'
import heroStyles from '../../components/Hero/Hero.module.css'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/common/Button'
import UniversityModal from './UniversityModal'
import UniversityCard from './UniversityCard'
import DiscoverLondonMap from './DiscoverLondonMap'
import heroVisual from '../../assets/hero/slider/slide-16.webp'
import makStampRing from '../../assets/journey/mak-stamp-ring.svg'
import makStampCenter from '../../assets/journey/mak-stamp-center.svg'
import { UNIVERSITIES } from '../../data/universities'
import { useSEO } from '../../lib/seo'
import styles from './DiscoverLondon.module.css'

const YOUTUBE_VIDEO_ID = 'zMCea32gpmg'
const YOUTUBE_EMBED_SRC = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}`

export default function DiscoverLondon() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  // noindex: the Lifestyle & Experiences section is still a placeholder
  // ("Under Construction") — nothing to rank on yet there, and indexing
  // risks Google associating the domain with thin/empty content. Drop
  // this once that section ships real content.
  useSEO({
    title: t('seo.discoverLondon.title'),
    description: t('seo.discoverLondon.description'),
    noindex: true,
  })

  // same array, same order as the navbar's Discover London dropdown
  // (nav.discoverLondonItems / NavContent.jsx) — used as this page's own
  // section headings so the two can never drift apart.
  const sectionLabels = t('nav.discoverLondonItems', { returnObjects: true })

  // index of the university whose modal is open, or null when closed —
  // the modal loops through UNIVERSITIES regardless of which card it was
  // opened from.
  const [openIndex, setOpenIndex] = useState(null)
  const stepOpenIndex = (delta) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + UNIVERSITIES.length) % UNIVERSITIES.length))

  return (
    <>
      <div className={styles.heroOuter}>
        <section className={styles.hero}>
          <img src={heroVisual} className={styles.bgImage} alt="" />
          <div className={heroStyles.vignetteTop} />

          <Navbar />
        </section>

        <section className={styles.introBand}>
          <h1 className={styles.heading}>{t('nav.discoverLondon')}</h1>
          <p className={styles.body}>{t('discoverLondonPage.intro')}</p>

          <div className={styles.stampWrap}>
            <img className={styles.stampRing} src={makStampRing} alt="" />
            <img className={styles.stampCenter} src={makStampCenter} alt="" />
          </div>
        </section>

        <div className={styles.stampGap} aria-hidden="true" />
      </div>

      <section id="education" className={styles.section}>
        <h2 className={styles.sectionHeading}>{sectionLabels[0]}</h2>
        <p className={styles.sectionIntro}>{t('discoverLondonPage.education.intro')}</p>

        <div className={styles.universityGrid}>
          {UNIVERSITIES.map((uni, i) => (
            <UniversityCard key={uni.id} uni={uni} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>
      </section>

      <DiscoverLondonMap onSelectUniversity={setOpenIndex} />

      <section id="lifestyle-experiences" className={`${styles.section} ${styles.sectionAlt}`}>
        <h2 className={styles.sectionHeading}>{sectionLabels[1]}</h2>

        <div className={styles.videoFrame}>
          <div className={styles.videoWrap}>
            <iframe
              className={styles.videoIframe}
              src={YOUTUBE_EMBED_SRC}
              title={t('discoverLondon.videoTitle')}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className={styles.videoOverlay} />
          <div className={styles.loadCover} aria-hidden="true" />

          <div className={styles.comingSoon}>
            <h3 className={styles.comingSoonText}>{t('discoverLondon.underConstruction')}</h3>

            <p className={styles.comingSoonBody}>
              {t('discoverLondon.bodyLine1')}
              <br />
              <br />
              {t('discoverLondon.bodyLine2')}
            </p>
          </div>

          <div className={styles.cameraInfo}>
            <p className={styles.cameraLocation}>{t('discoverLondon.cameraLocation')}</p>

            <span className={styles.liveBadge}>
              <span className={styles.liveDot} />
              {t('discoverLondon.live')}
            </span>
          </div>
        </div>

        <div className={styles.backRow}>
          <Button label={t('aboutUs.backToHome')} color="#0A3332" reverse onClick={() => navigate('/')} />
          <Button label={t('nav.buyersGuide')} color="#0A3332" onClick={() => navigate('/buyers-guide')} />
        </div>
      </section>

      <Footer />

      {openIndex !== null && (
        <UniversityModal
          universities={UNIVERSITIES}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onStep={stepOpenIndex}
        />
      )}
    </>
  )
}
