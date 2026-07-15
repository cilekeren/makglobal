import { useLayoutEffect, useRef } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import gsap from 'gsap'
import { PROJECTS } from '../../data/projects'
import { consumePendingHeroTransition } from '../../lib/pageTransition'
import heroStyles from '../../components/Hero/Hero.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/common/Button'
import CommuteBadge from './CommuteBadge'
import GalleryCarousel from './GalleryCarousel'
import ProjectLocationMap from './ProjectLocationMap'
import { AMENITY_ICONS } from './amenityIcons'
import styles from './ProjectDetail.module.css'

// Wraps each character of an element's text in its own span so GSAP can
// stagger them in one at a time for a typewriter reveal. Keeps the real
// text available to screen readers via aria-label.
function splitIntoChars(el) {
  const text = el.textContent
  el.setAttribute('aria-label', text)
  el.innerHTML = text
    .split('')
    .map((ch) => `<span style="display:inline-block">${ch === ' ' ? '&nbsp;' : ch}</span>`)
    .join('')
  return [...el.children]
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS.find((p) => p.slug === slug)
  const introWipeRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const developerLabelRef = useRef(null)
  const developerLogoRef = useRef(null)
  const infoRowRef = useRef(null)

  useLayoutEffect(() => {
    if (!project) return
    const root = document.getElementById('root')
    const data = consumePendingHeroTransition(project.slug)
    const infoBoxes = infoRowRef.current ? [...infoRowRef.current.children] : []

    if (!data) {
      if (root) gsap.set(root, { opacity: 1 })
      return
    }

    // Hand off from the floating hero image (already sitting at this exact
    // spot) to the real hero image with no visible jump.
    if (root) gsap.set(root, { opacity: 1 })
    data.imgClone.remove()
    data.whiteCover.remove()

    const tl = gsap.timeline()

    if (introWipeRef.current) {
      gsap.set(introWipeRef.current, { scaleX: 0 })
      tl.to(introWipeRef.current, { scaleX: 1, duration: 0.75, ease: 'power2.inOut' })
    }

    tl.addLabel('titleStart', '+=0.1')

    if (headingRef.current) {
      const chars = splitIntoChars(headingRef.current)
      gsap.set(chars, { opacity: 0 })
      tl.to(chars, { opacity: 1, duration: 0.01, stagger: 0.06 }, 'titleStart')
    }

    if (infoBoxes.length) {
      gsap.set(infoBoxes, { opacity: 0, y: 32, scale: 0.8 })
      tl.to(
        infoBoxes,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.22,
          ease: 'power4.inOut',
        },
        'titleStart'
      )
    }

    if (subheadingRef.current) {
      gsap.set(subheadingRef.current, { opacity: 0 })
      tl.to(subheadingRef.current, { opacity: 1, duration: 0.4 })
    }

    if (developerLabelRef.current) {
      const chars = splitIntoChars(developerLabelRef.current)
      gsap.set(chars, { opacity: 0 })
      tl.to(chars, { opacity: 1, duration: 0.01, stagger: 0.04 }, '+=0.15')
    }

    if (developerLogoRef.current) {
      gsap.set(developerLogoRef.current, { y: '100%' })
      tl.to(
        developerLogoRef.current,
        { y: '0%', duration: 0.6, ease: 'power4.inOut' },
        '+=0.1'
      )
    }
  }, [project])

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
        <div ref={introWipeRef} className={styles.introWipe} />

        <div className={styles.introContent}>
          <h1 ref={headingRef} className={styles.heading}>{project.name}</h1>

          {project.description && (
            <p ref={subheadingRef} className={styles.subheading}>{project.description}</p>
          )}

          {project.developerLogo && (
            <div className={styles.developer}>
              <span ref={developerLabelRef} className={styles.developerLabel}>developed by</span>
              <div className={styles.developerLogoMask}>
                <img
                  ref={developerLogoRef}
                  src={project.developerLogo}
                  alt={project.developerName}
                  className={styles.developerLogo}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section ref={infoRowRef} className={styles.infoRow}>
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
        <GalleryCarousel key={project.slug} images={gallery} name={project.name} />
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

      <ProjectLocationMap coords={project.coords} />

      <section className={styles.backSection}>
        <Button label="BACK TO PROJECTS" color="#0A3332" reverse onClick={() => navigate('/projects')} />
      </section>

      <Footer />
    </>
  )
}
