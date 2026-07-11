import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ArrowIcon from '../../components/common/ArrowIcon'
import styles from './GalleryCarousel.module.css'

// Thumbnail strip loops seamlessly: the list is tripled so the track can keep
// sliding in one direction. Once a step carries the position out of the
// middle copy, we silently jump it back by one copy-length (transition
// disabled for that single frame) so it never visibly snaps to the start.
const SNAP_DELAY = 520

export default function GalleryCarousel({ images, name }) {
  const total = images.length
  const [pos, setPos] = useState(total)
  const [instant, setInstant] = useState(false)
  const [offset, setOffset] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const viewportRef = useRef(null)
  const thumbRefs = useRef([])
  const posRef = useRef(pos)
  posRef.current = pos

  const index = total ? ((pos % total) + total) % total : 0
  const prevIndex = total ? (index - 1 + total) % total : 0
  const nextIndex = total ? (index + 1) % total : 0
  const tripledImages = total ? [...images, ...images, ...images] : []

  const recalcOffset = () => {
    const viewport = viewportRef.current
    const activeThumb = thumbRefs.current[posRef.current]
    if (!viewport || !activeThumb) return
    const center = activeThumb.offsetLeft + activeThumb.offsetWidth / 2
    setOffset(viewport.clientWidth / 2 - center)
  }

  useLayoutEffect(() => {
    recalcOffset()
  }, [pos, total])

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const ro = new ResizeObserver(recalcOffset)
    ro.observe(viewport)
    return () => ro.disconnect()
  }, [])

  // After a step lands outside the middle copy, wait for the slide to
  // finish, then re-center it into the middle copy without a transition.
  useEffect(() => {
    if (total <= 1 || (pos >= total && pos < 2 * total)) return
    const timer = setTimeout(() => {
      setInstant(true)
      setPos((p) => {
        if (p < total) return p + total
        if (p >= 2 * total) return p - total
        return p
      })
    }, SNAP_DELAY)
    return () => clearTimeout(timer)
  }, [pos, total])

  useLayoutEffect(() => {
    if (!instant) return
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)))
    return () => cancelAnimationFrame(raf)
  }, [instant])

  useEffect(() => {
    if (!lightboxOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxOpen])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      else if (e.key === 'ArrowLeft') setPos((p) => p - 1)
      else if (e.key === 'ArrowRight') setPos((p) => p + 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen])

  if (!total) return null

  const goToStep = (delta) => setPos((p) => p + delta)
  const goToThumb = (tripledPos) => setPos(tripledPos)

  return (
    <div className={styles.carousel}>
      <div className={styles.stage}>
        {images.map((src, i) => {
          const state =
            i === index ? styles.active : i === prevIndex ? styles.prevSlide : i === nextIndex ? styles.nextSlide : ''

          return (
            <div
              key={i}
              className={`${styles.item} ${state}`}
              onClick={() => {
                if (i === prevIndex) goToStep(-1)
                else if (i === nextIndex) goToStep(1)
                else if (i === index) setLightboxOpen(true)
              }}
            >
              {src ? (
                <img src={src} alt={`${name} ${i + 1}`} className={styles.itemImage} />
              ) : (
                <div className={styles.itemPlaceholder} />
              )}
            </div>
          )
        })}
      </div>

      {total > 1 && (
        <div className={styles.controls}>
          <button type="button" className={styles.navBtn} onClick={() => goToStep(-1)} aria-label="Previous image">
            <ArrowIcon lineLength={0} className={`${styles.navArrow} ${styles.navArrowPrev}`} />
          </button>

          <div className={styles.thumbnailsViewport} ref={viewportRef}>
            <div
              className={styles.thumbnailsTrack}
              style={{ transform: `translateX(${offset}px)`, transition: instant ? 'none' : undefined }}
            >
              {tripledImages.map((src, i) => (
                <button
                  key={i}
                  ref={(el) => (thumbRefs.current[i] = el)}
                  type="button"
                  className={styles.thumbBtn}
                  aria-label={`Go to image ${(i % total) + 1}`}
                  onClick={() => goToThumb(i)}
                >
                  {src ? (
                    <img src={src} alt="" className={`${styles.thumb} ${i === pos ? styles.thumbActive : ''}`} />
                  ) : (
                    <div className={`${styles.thumb} ${styles.thumbPlaceholder} ${i === pos ? styles.thumbActive : ''}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className={styles.navBtn} onClick={() => goToStep(1)} aria-label="Next image">
            <ArrowIcon lineLength={0} className={styles.navArrow} />
          </button>
        </div>
      )}

      {lightboxOpen &&
        createPortal(
          <div className={styles.lightboxOverlay} onClick={() => setLightboxOpen(false)}>
            {total > 1 && (
              <button
                type="button"
                className={`${styles.lightboxNavBtn} ${styles.lightboxNavBtnPrev}`}
                onClick={(e) => {
                  e.stopPropagation()
                  goToStep(-1)
                }}
                aria-label="Previous image"
              >
                <ArrowIcon lineLength={0} className={`${styles.lightboxArrow} ${styles.lightboxArrowPrev}`} />
              </button>
            )}

            <div className={styles.lightboxImageBox} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.lightboxClose}
                onClick={() => setLightboxOpen(false)}
                aria-label="Close"
              >
                <svg viewBox="0 0 20 20" className={styles.closeIcon}>
                  <line x1="3" y1="3" x2="17" y2="17" />
                  <line x1="17" y1="3" x2="3" y2="17" />
                </svg>
              </button>

              {images[index] ? (
                <img src={images[index]} alt={`${name} ${index + 1}`} className={styles.lightboxImage} />
              ) : (
                <div className={styles.lightboxPlaceholder} />
              )}
            </div>

            {total > 1 && (
              <button
                type="button"
                className={`${styles.lightboxNavBtn} ${styles.lightboxNavBtnNext}`}
                onClick={(e) => {
                  e.stopPropagation()
                  goToStep(1)
                }}
                aria-label="Next image"
              >
                <ArrowIcon lineLength={0} className={styles.lightboxArrow} />
              </button>
            )}
          </div>,
          document.body
        )}
    </div>
  )
}
