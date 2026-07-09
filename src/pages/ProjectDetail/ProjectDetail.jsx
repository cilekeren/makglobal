import { useParams, Navigate } from 'react-router-dom'
import { PROJECTS } from '../../data/projects'
import heroStyles from '../../components/Hero/Hero.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import CommuteBadge from './CommuteBadge'
import { AMENITY_ICONS } from './amenityIcons'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const gallery = project.gallery && project.gallery.length ? project.gallery : [null, null, null]
  const hasFooterInfo = (project.highlights && project.highlights.length > 0) || (project.amenities && project.amenities.length > 0)

  return (
    <>
      <div className={heroStyles.heroOuter}>
        <section className={styles.top}>
          {project.image ? (
            <img src={project.image} alt={project.name} className={styles.topImage} />
          ) : (
            <div className={styles.topImagePlaceholder} />
          )}

          <div className={heroStyles.vignetteTop} />

          <Navbar />
        </section>
      </div>

      <section className={styles.intro}>
        <h1 className={styles.heading}>{project.name}</h1>

        {project.description && <p className={styles.subheading}>{project.description}</p>}

        {project.developerLogo && (
          <div className={styles.developer}>
            <span className={styles.developerLabel}>developed by</span>
            <img src={project.developerLogo} alt={project.developerName} className={styles.developerLogo} />
          </div>
        )}
      </section>

      <section className={styles.infoRow}>
        <div className={styles.infoBox}>
          <h3 className={styles.infoBoxTitle}>FROM</h3>
          {project.prices && project.prices.length > 0 ? (
            <ul className={styles.priceList}>
              {project.prices.map((p) => (
                <li key={p.type}>
                  <span className={styles.priceType}>{p.type}</span>
                  <span className={styles.priceValue}>{p.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.infoBoxText}>{project.price || 'Price on Request'}</p>
          )}
        </div>

        <div className={styles.infoBox}>
          <h3 className={styles.infoBoxTitle}>LOCATION</h3>
          <p className={styles.infoBoxText}>
            {project.location?.text || 'London, UK'}
            {project.location?.zone && (
              <>
                <br />
                {project.location.zone}
              </>
            )}
          </p>
        </div>

        <div className={styles.infoBox}>
          <h3 className={styles.infoBoxTitle}>COMPLETION</h3>
          <p className={styles.infoBoxText}>
            {project.completion ? (
              <>
                {project.completion.quarter}
                <br />
                {project.completion.year}
              </>
            ) : (
              'TBC'
            )}
          </p>
        </div>

        {project.commuteMinutes && <CommuteBadge minutes={project.commuteMinutes} />}
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryGrid}>
          {gallery.map((src, i) =>
            src ? (
              <img key={i} src={src} alt={`${project.name} ${i + 1}`} className={styles.galleryImage} />
            ) : (
              <div key={i} className={styles.galleryPlaceholder} />
            )
          )}
        </div>
      </section>

      {hasFooterInfo && (
        <section className={styles.footerInfo}>
          {project.amenities && project.amenities.length > 0 && (
            <div className={styles.amenitiesSection}>
              <h2 className={styles.amenitiesHeading}>AMENITIES</h2>
              <div className={styles.amenities}>
                {project.amenities.map((a) => (
                  <div key={a.label} className={styles.amenity}>
                    <img src={AMENITY_ICONS[a.icon]} alt="" className={styles.amenityIcon} />
                    <span className={styles.amenityLabel}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <ul className={styles.highlights}>
              {project.highlights.map((item) => (
                <li key={item}>
                  <span className={styles.checkIcon}>
                    <svg viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="9" />
                      <path d="M6 10.3 8.7 13 14 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <Footer />
    </>
  )
}
