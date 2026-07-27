import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useSEO } from '../../lib/seo'
import styles from './DiscoverLondon.module.css'

const YOUTUBE_VIDEO_ID = 'M3EYAY2MftI'
const YOUTUBE_EMBED_SRC = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}`

export default function DiscoverLondon() {
  const { t } = useTranslation()
  // noindex: the page is a placeholder ("Under Construction") right now —
  // nothing to rank on yet, and indexing it risks Google associating the
  // domain with thin/empty content. Drop this once real content ships.
  useSEO({
    title: t('seo.discoverLondon.title'),
    description: t('seo.discoverLondon.description'),
    noindex: true,
  })

  return (
    <>
      <section className={styles.videoHero}>
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

        <Navbar />

        <div className={styles.comingSoon}>
          <h1 className={styles.comingSoonText}>{t('discoverLondon.underConstruction')}</h1>

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
      </section>

      <Footer />
    </>
  )
}
