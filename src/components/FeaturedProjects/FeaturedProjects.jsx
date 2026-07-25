import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../common/Button'
import ArrowIcon from '../common/ArrowIcon'
import { PROJECTS } from '../../data/projects'
import { startCardHeroTransition } from '../../lib/pageTransition'
import styles from './FeaturedProjects.module.css'

const FEATURED = PROJECTS.slice(0, 3)
// drag past this many px (or a quick flick) commits to the next/prev slide
const DRAG_COMMIT_PX = 60

function bedRange(prices) {
  const beds = prices.map((p) => parseInt(p.type, 10)).filter((n) => !Number.isNaN(n))
  if (!beds.length) return null
  const min = Math.min(...beds)
  const max = Math.max(...beds)
  return min === max ? `${min}` : `${min}-${max}`
}

function ProjectCard({ project }) {
  const { t } = useTranslation()
  const beds = project.prices ? bedRange(project.prices) : null
  const fromPriceRaw = project.prices?.[0]?.price || project.price
  const fromPrice = fromPriceRaw === 'Price on Request' ? null : fromPriceRaw
  const navigate = useNavigate()
  const imgRef = useRef(null)
  const titleRef = useRef(null)
  const [hovered, setHovered] = useState(false)

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

      <div className={styles.cardBody}>
        <h3 ref={titleRef} className={styles.projectName}>{project.name}</h3>

        {(project.location || beds || project.completion) && (
          <p className={styles.projectDetails}>
            {project.location && (
              <>
                {project.location.text}
                {project.location.zone && ` | ${project.location.zone.toUpperCase()}`}
              </>
            )}
            {(beds || project.completion) && (
              <>
                {project.location && <br />}
                {beds && `${beds} ${t('featuredProjects.bed')}  |  `}
                {t('featuredProjects.newBuild')}
                {project.completion &&
                  `  |  ${project.completion.quarter === 'Ready' ? t('common.ready') : project.completion.quarter} ${project.completion.year}`}
              </>
            )}
          </p>
        )}

        <img
          src={project.developerLogo}
          alt={project.developerName}
          className={styles.developerLogo}
        />
      </div>

      <div className={styles.priceRow}>
        <p className={styles.price}>
          {fromPrice ? `${t('featuredProjects.from')} ${fromPrice}` : t('common.priceOnRequest')}
        </p>

        <div className={styles.detailsBtnWrap}>
          <Button
            label={t('common.details')}
            variant="filled"
            color="#163a3d"
            textColor="#fff"
            scale={2.1}
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

// touch/pointer-draggable, infinite-looping carousel for mobile. Real
// slides are flanked by a clone of the last slide (leading) and a clone
// of the first slide (trailing), so dragging past either end reveals a
// clone rather than empty space; once the drag/transition settles on a
// clone, we jump the track back to the matching real slide with
// transitions off for one frame, so the loop reads as endless.
function FeaturedCarousel() {
  const { t } = useTranslation()
  const count = FEATURED.length
  const viewportRef = useRef(null)
  const [slideWidth, setSlideWidth] = useState(0)
  // 1-indexed among real slides; 0 is the leading clone, count+1 the
  // trailing clone.
  const [pos, setPos] = useState(1)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [transitionsOn, setTransitionsOn] = useState(true)
  const dragStartXRef = useRef(0)
  const draggedRef = useRef(false)

  useLayoutEffect(() => {
    const el = viewportRef.current
    setSlideWidth(el.getBoundingClientRect().width)
    const ro = new ResizeObserver((entries) => setSlideWidth(entries[0].contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const activeIndex = ((pos - 1) % count + count) % count

  function handlePointerDown(e) {
    dragStartXRef.current = e.clientX
    draggedRef.current = false
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e) {
    if (!isDragging) return
    const delta = e.clientX - dragStartXRef.current
    if (Math.abs(delta) > 5) draggedRef.current = true
    setDragX(delta)
  }

  function handlePointerUp() {
    if (!isDragging) return
    setIsDragging(false)
    if (dragX <= -DRAG_COMMIT_PX) setPos((p) => p + 1)
    else if (dragX >= DRAG_COMMIT_PX) setPos((p) => p - 1)
    setDragX(0)
  }

  function handleTransitionEnd(e) {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (pos === 0) {
      setTransitionsOn(false)
      setPos(count)
    } else if (pos === count + 1) {
      setTransitionsOn(false)
      setPos(1)
    }
  }

  useEffect(() => {
    if (transitionsOn) return
    const id = requestAnimationFrame(() => setTransitionsOn(true))
    return () => cancelAnimationFrame(id)
  }, [transitionsOn])

  const slides = [FEATURED[count - 1], ...FEATURED, FEATURED[0]]
  const offset = -(pos * slideWidth) + dragX

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselViewport}
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(${offset}px)`,
            transition: isDragging || !transitionsOn ? 'none' : undefined,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((project, i) => (
            <div
              key={`${project.name}-${i}`}
              className={styles.carouselSlide}
              onClickCapture={(e) => {
                if (draggedRef.current) {
                  e.stopPropagation()
                  draggedRef.current = false
                }
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carouselControls}>
        <button
          type="button"
          className={styles.carouselNavBtn}
          aria-label={t('featuredProjects.previousProject')}
          onClick={() => setPos((p) => p - 1)}
        >
          <ArrowIcon lineLength={0} className={`${styles.carouselNavArrow} ${styles.carouselNavArrowPrev}`} />
        </button>

        <div className={styles.carouselDots}>
          {FEATURED.map((project, i) => (
            <button
              key={project.name}
              type="button"
              className={`${styles.carouselDot} ${i === activeIndex ? styles.carouselDotActive : ''}`}
              aria-label={t('featuredProjects.goTo', { name: project.name })}
              onClick={() => setPos(i + 1)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.carouselNavBtn}
          aria-label={t('featuredProjects.nextProject')}
          onClick={() => setPos((p) => p + 1)}
        >
          <ArrowIcon lineLength={0} className={styles.carouselNavArrow} />
        </button>
      </div>
    </div>
  )
}

export default function FeaturedProjects() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)')
    setIsMobile(mq.matches)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{t('featuredProjects.heading')}</h2>
      <p className={styles.subheading}>
        {t('featuredProjects.subheadingLine1')}
        <br />
        {t('featuredProjects.subheadingLine2')}
      </p>

      {isMobile ? (
        <FeaturedCarousel />
      ) : (
        <div className={styles.cardRow}>
          {FEATURED.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      )}

      <p className={styles.ctaText}>
        {t('featuredProjects.ctaLine1')}
        <br />
        {t('featuredProjects.ctaLine2')}
      </p>

      <div className={styles.viewProjectsWrap}>
        <Button
          label={t('featuredProjects.viewAllProjects')}
          color="#163a3d"
          onClick={() => navigate('/projects')}
        />
      </div>
    </section>
  )
}
