import { Fragment, useLayoutEffect, useRef, useState } from 'react'
import barrattLondonLogo from '../../assets/firms/barratt_london.svg'
import berkeleyLogo from '../../assets/firms/berkeley.svg'
import theOwoLogo from '../../assets/firms/the_owo.svg'
import emaarLogo from '../../assets/firms/emaar.svg'
import londonSquareLogo from '../../assets/firms/london_square.svg'
import styles from './FirmsBand.module.css'

const LOGO_HEIGHT = 42.5
const DURATION_S = 30

const LOGOS = [
  { src: barrattLondonLogo, alt: 'Barratt London', ratio: 38.616 / 8.5942 },
  { src: berkeleyLogo, alt: 'Berkeley Group', ratio: 36.1794 / 12.2008 },
  { src: theOwoLogo, alt: 'The OWO', ratio: 23.9259 / 9.8844 },
  { src: emaarLogo, alt: 'Emaar', ratio: 31.5227 / 6.236, scale: 0.7 },
  {
    src: londonSquareLogo,
    alt: 'London Square',
    ratio: 25.0955 / 17.0332,
    scale: 1.3,
  },
]

function LogoSet({ hidden, innerRef }) {
  return (
    <div className={styles.set} ref={innerRef} aria-hidden={hidden || undefined}>
      {LOGOS.map((logo, i) => {
        const height = LOGO_HEIGHT * (logo.scale ?? 1)
        return (
          <Fragment key={i}>
            <img
              src={logo.src}
              alt={hidden ? '' : logo.alt}
              className={styles.logo}
              style={{ height, width: height * logo.ratio }}
            />
            <span className={styles.divider} />
          </Fragment>
        )
      })}
    </div>
  )
}

export default function FirmsBand() {
  const bandRef = useRef(null)
  const set1Ref = useRef(null)
  const set2Ref = useRef(null)
  const [distance, setDistance] = useState(0)
  const [copies, setCopies] = useState(2)

  useLayoutEffect(() => {
    const measure = () => {
      if (!set1Ref.current || !set2Ref.current || !bandRef.current) return
      const r1 = set1Ref.current.getBoundingClientRect()
      const r2 = set2Ref.current.getBoundingClientRect()
      const d = r2.left - r1.left
      const containerWidth = bandRef.current.getBoundingClientRect().width

      // enough repeated copies so the track never runs out of content
      // in the visible viewport, even right before the loop resets.
      const needed = Math.max(2, Math.ceil(containerWidth / d) + 2)

      setDistance((prev) => (Math.abs(prev - d) > 0.5 ? d : prev))
      setCopies((prev) => (prev !== needed ? needed : prev))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(set1Ref.current)
    ro.observe(bandRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section className={styles.band} aria-label="Partner developers" ref={bandRef}>
      {distance > 0 && (
        <style>{`
          @keyframes firmsMarqueeSlide {
            from { transform: translateX(0); }
            to { transform: translateX(-${distance}px); }
          }
        `}</style>
      )}
      <div
        className={styles.marquee}
        style={
          distance > 0
            ? { animation: `firmsMarqueeSlide ${DURATION_S}s linear infinite` }
            : { visibility: 'hidden' }
        }
      >
        <LogoSet innerRef={set1Ref} />
        <LogoSet innerRef={set2Ref} hidden />
        {Array.from({ length: Math.max(copies - 2, 0) }).map((_, i) => (
          <LogoSet key={i} hidden />
        ))}
      </div>
    </section>
  )
}
