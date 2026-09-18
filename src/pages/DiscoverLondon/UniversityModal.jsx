import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import {
  PiMapPinLight,
  PiTrophyLight,
  PiBookOpenTextLight,
  PiInfoLight,
  PiTrainLight,
  PiHouseLineLight,
  PiLinkLight,
  PiArrowSquareOutLight,
} from 'react-icons/pi'
import ArrowIcon from '../../components/common/ArrowIcon'
import styles from './UniversityModal.module.css'

// Loops through UNIVERSITIES (src/data/universities.js) — left/right always
// wrap around rather than stopping at the ends, same "keep browsing" intent
// as GalleryCarousel's own image loop on the project detail page, just one
// full university profile per step instead of one photo.
export default function UniversityModal({ universities, index, onClose, onStep }) {
  const { t, i18n } = useTranslation()
  const total = universities.length
  const uni = universities[index]

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

  if (!uni) return null

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
          <img src={uni.image} alt={uni.name} className={styles.image} />
          <div className={styles.imageScrim} />
          <div className={styles.imageCaption}>
            <h2 className={styles.name}>{uni.name}</h2>
            {uni.officialWebsite && (
              <a
                href={uni.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.officialWebsite}
              >
                {t('discoverLondonPage.education.fields.officialWebsite')}
                <PiArrowSquareOutLight className={styles.officialWebsiteIcon} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.field}>
            <span className={styles.eyebrow}>
              <PiMapPinLight className={styles.eyebrowIcon} aria-hidden="true" />
              {t('discoverLondonPage.education.fields.location')}
            </span>
            <p className={styles.value}>{uni.location}</p>
          </div>

          <div className={styles.field}>
            <span className={styles.eyebrow}>
              <PiTrophyLight className={styles.eyebrowIcon} aria-hidden="true" />
              {uni.qsRankingLabel}
            </span>
            <span className={styles.rankingBadge}>{uni.qsRanking}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.eyebrow}>
              <PiBookOpenTextLight className={styles.eyebrowIcon} aria-hidden="true" />
              {t('discoverLondonPage.education.fields.academicAreas')}
            </span>
            <p className={styles.value}>{uni.academicAreas.join(' · ')}</p>
          </div>

          <div className={styles.field}>
            <span className={styles.eyebrow}>
              <PiInfoLight className={styles.eyebrowIcon} aria-hidden="true" />
              {t('discoverLondonPage.education.fields.about')}
            </span>
            <p className={styles.about}>{localize(uni.about)}</p>
          </div>

          <div className={styles.field}>
            <span className={styles.eyebrow}>
              <PiTrainLight className={styles.eyebrowIcon} aria-hidden="true" />
              {uni.stationsLabel}
            </span>
            <ul className={styles.stationList}>
              {uni.stations.map((station) => (
                <li key={station.name} className={styles.stationRow}>
                  <span className={styles.stationName}>{station.name}</span>
                  <span className={styles.stationLines}>{station.lines}</span>
                  {station.time && <span className={styles.stationTime}>{station.time}</span>}
                </li>
              ))}
            </ul>
            {uni.stationsNote && <p className={styles.note}>{localize(uni.stationsNote)}</p>}
          </div>

          <div className={styles.field}>
            <span className={styles.eyebrow}>
              <PiHouseLineLight className={styles.eyebrowIcon} aria-hidden="true" />
              {t('discoverLondonPage.education.fields.livingNear')}
            </span>
            <p className={styles.value}>{uni.livingNear.join(' · ')}</p>
          </div>

          {uni.rankingDetail && (
            <div className={styles.field}>
              <span className={styles.eyebrow}>
                <PiLinkLight className={styles.eyebrowIcon} aria-hidden="true" />
                {t('discoverLondonPage.education.fields.rankingSource')}
              </span>
              <a
                href={uni.rankingDetail.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.rankingSourceLink}
              >
                {uni.rankingDetail.source}
              </a>
              <p className={styles.note}>{localize(uni.rankingDetail.note)}</p>
            </div>
          )}
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
