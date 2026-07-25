import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../components/common/Button'
import { startCardHeroTransition } from '../../lib/pageTransition'
import styles from './ProjectCard.module.css'

const MOBILE_QUERY = '(max-width: 700px)'

export default function ProjectCard({ project }) {
  const { t } = useTranslation()
  // multiple price tiers can exist (1+1, 2+1, ...) — always show the
  // lowest one (prices[0]) as the card's headline "from" price, same as
  // the FROM box on the project's own detail page.
  const price = project.prices?.[0]?.price || project.price
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)
  const navigate = useNavigate()
  const imgRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const goToDetails = () =>
    startCardHeroTransition({
      imgEl: imgRef.current,
      titleEl: titleRef.current,
      slug: project.slug,
      navigate,
    })

  return (
    <div
      className={styles.card}
      role="link"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          goToDetails()
        }
      }}
    >
      {project.image ? (
        <img ref={imgRef} src={project.image} alt={project.name} className={styles.image} />
      ) : (
        <div ref={imgRef} className={styles.imagePlaceholder} />
      )}

      <h3 ref={titleRef} className={styles.projectName}>{project.name}</h3>
      <div className={styles.developerLogoSlot}>
        {project.developerLogo && (
          <img
            src={project.developerLogo}
            alt={project.developerName || ''}
            className={`${styles.developerLogo} ${
              project.developerName === 'London Square' ? styles.developerLogoLarge : ''
            } ${project.developerName?.startsWith('Barratt London') ? styles.developerLogoSmall : ''} ${
              project.developerName === 'Berkeley' ? styles.developerLogoBerkeley : ''
            }`}
          />
        )}
      </div>
      <div className={styles.priceRow}>
        <p className={styles.price}>
          {!price || price === 'Price on Request'
            ? t('common.priceOnRequest')
            : `${t('featuredProjects.from')} ${price}`}
        </p>

        <div className={styles.detailsBtnWrap}>
          <Button
            label={t('common.details')}
            variant="filled"
            color="#163a3d"
            textColor="#fff"
            scale={isMobile ? 1.8 : 2.1}
            strokeScale={3}
            padding={10}
            arrowLength={24}
            hovered={hovered}
          />
        </div>
      </div>
    </div>
  )
}
