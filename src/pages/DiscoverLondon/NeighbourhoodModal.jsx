import { useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { PiStarLight, PiBankLight, PiTrainLight, PiCompassLight } from 'react-icons/pi'
import ArrowIcon from '../../components/common/ArrowIcon'
import styles from './UniversityModal.module.css'
import ownStyles from './NeighbourhoodModal.module.css'

// below this the text would be unreadable — only then does .content fall
// back to scrolling, as a last resort on absurdly short viewports.
const MIN_FIT_SCALE = 0.5

// Same modal as UniversityModal.jsx (same styles, same fit-to-height
// scaling, same wrap-around left/right stepping), looping through
// NEIGHBOURHOODS (src/data/neighbourhoods.js) instead.
export default function NeighbourhoodModal({ neighbourhoods, index, onClose, onStep }) {
  const { t, i18n } = useTranslation()
  const total = neighbourhoods.length
  const item = neighbourhoods[index]
  const contentRef = useRef(null)
  const innerRef = useRef(null)

  useLayoutEffect(() => {
    const fit = () => {
      const outer = contentRef.current
      const inner = innerRef.current
      if (!outer || !inner) return
      const cs = getComputedStyle(outer)
      const availW = outer.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      const availH = outer.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
      if (availW <= 0 || availH <= 0) return

      const apply = (scale) => {
        inner.style.width = `${availW / scale}px`
        inner.style.transform = scale === 1 ? '' : `scale(${scale})`
        return inner.offsetHeight * scale
      }

      let best = MIN_FIT_SCALE
      if (apply(1) <= availH) {
        best = 1
      } else {
        let lo = MIN_FIT_SCALE
        let hi = 1
        for (let i = 0; i < 10; i++) {
          const mid = (lo + hi) / 2
          if (apply(mid) <= availH) lo = mid
          else hi = mid
        }
        best = lo
      }
      apply(best)
      outer.style.overflowY = apply(best) > availH + 1 ? 'auto' : 'hidden'
    }

    fit()
    const ro = new ResizeObserver(fit)
    if (contentRef.current) ro.observe(contentRef.current)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [index, i18n.language])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onStep(-1)
      else if (e.key === 'ArrowRight') onStep(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onStep])

  if (!item) return null

  const localize = (field) => field[i18n.language] || field.en

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      {total > 1 && (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navBtnPrev}`}
          onClick={(e) => {
            e.stopPropagation()
            onStep(-1)
          }}
          aria-label={t('projectDetail.previousImage')}
        >
          <ArrowIcon lineLength={0} className={`${styles.navArrow} ${styles.navArrowPrev}`} />
        </button>
      )}

      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label={t('projectDetail.close')}>
          <svg viewBox="0 0 20 20" className={styles.closeIcon}>
            <line x1="3" y1="3" x2="17" y2="17" />
            <line x1="17" y1="3" x2="3" y2="17" />
          </svg>
        </button>

        <div className={styles.imagePane}>
          <img src={item.image} alt={item.name} className={styles.image} />
        </div>

        {/* name, tagline and About sit outside the scaled .content so their
            gold band can run flush to the pane's top, left and right edges;
            .content below it still fits the remaining fields to whatever
            height is left. The photo carries no text. */}
        <div className={ownStyles.rightPane}>
          <div className={`${styles.field} ${ownStyles.aboutBox}`}>
            <div>
              <h2 className={`${styles.name} ${ownStyles.bandName}`}>{item.name}</h2>
              <p className={ownStyles.tagline}>{localize(item.tagline)}</p>
            </div>
            <p className={styles.about}>{localize(item.about)}</p>
          </div>

          <div ref={contentRef} className={styles.content}>
            <div ref={innerRef} className={styles.contentInner}>
              <div className={styles.field}>
                <span className={styles.eyebrow}>
                  <PiStarLight className={styles.eyebrowIcon} aria-hidden="true" />
                  {t('discoverLondonPage.neighbourhoods.fields.knownFor')}
                </span>
                <p className={styles.value}>{item.knownFor.join(' · ')}</p>
              </div>

              <div className={styles.field}>
                <span className={styles.eyebrow}>
                  <PiBankLight className={styles.eyebrowIcon} aria-hidden="true" />
                  {t('discoverLondonPage.neighbourhoods.fields.landmarks')}
                </span>
                <p className={styles.value}>{item.landmarks.join(' · ')}</p>
              </div>

              <div className={styles.field}>
                <span className={styles.eyebrow}>
                  <PiTrainLight className={styles.eyebrowIcon} aria-hidden="true" />
                  {t('discoverLondonPage.neighbourhoods.fields.gettingAround')}
                </span>
                <p className={styles.value}>{item.gettingAround.join(' · ')}</p>
              </div>

              <div className={styles.field}>
                <span className={styles.eyebrow}>
                  <PiCompassLight className={styles.eyebrowIcon} aria-hidden="true" />
                  {t('discoverLondonPage.neighbourhoods.fields.localExperiences')}
                </span>
                <ul className={ownStyles.experienceList}>
                  {localize(item.experiences).map((line) => (
                    <li key={line} className={styles.value}>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {total > 1 && (
        <button
          type="button"
          className={styles.navBtn}
          onClick={(e) => {
            e.stopPropagation()
            onStep(1)
          }}
          aria-label={t('projectDetail.nextImage')}
        >
          <ArrowIcon lineLength={0} className={styles.navArrow} />
        </button>
      )}
    </div>,
    document.body,
  )
}
