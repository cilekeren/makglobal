import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import styles from './DiscoverLondon.module.css'

const YOUTUBE_VIDEO_ID = 'M3EYAY2MftI'
const YOUTUBE_EMBED_SRC = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}`

export default function DiscoverLondon() {
  return (
    <>
      <section className={styles.videoHero}>
        <div className={styles.videoWrap}>
          <iframe
            className={styles.videoIframe}
            src={YOUTUBE_EMBED_SRC}
            title="Discover London"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className={styles.videoOverlay} />

        <Navbar />

        <div className={styles.comingSoon}>
          <h1 className={styles.comingSoonText}>Under Construction</h1>

          <p className={styles.comingSoonBody}>
            We are collecting the best local stories, property insights, and neighborhood
            highlights to help you find not just a house, but a home.
            <br />
            <br />
            Check back soon to explore London like a local!
          </p>
        </div>

        <div className={styles.cameraInfo}>
          <p className={styles.cameraLocation}>Abbey Road, St John&rsquo;s Wood, London</p>

          <span className={styles.liveBadge}>
            <span className={styles.liveDot} />
            LIVE
          </span>
        </div>
      </section>

      <Footer />
    </>
  )
}
