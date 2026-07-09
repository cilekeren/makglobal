import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { pillPathD, PILL_STROKE_W } from './pillPath'
import styles from './Hero.module.css'

export default function NavItem({ label, to }) {
  const pillBoxRef = useRef(null)
  const [pillSize, setPillSize] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const el = pillBoxRef.current
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setPillSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className={`${styles.navItemWrap} ${styles.navItemSimple}`}>
      {to ? (
        <Link to={to} className={styles.navItem}>
          {label}
        </Link>
      ) : (
        <a href="#" className={styles.navItem}>
          {label}
        </a>
      )}

      <span className={styles.pillBox} ref={pillBoxRef}>
        {pillSize.w > 0 && (
          <svg
            className={styles.pillSvg}
            viewBox={`0 0 ${pillSize.w} ${pillSize.h}`}
            preserveAspectRatio="none"
          >
            <path
              className={styles.pillPath}
              d={pillPathD(pillSize.w, pillSize.h)}
              pathLength="1"
              strokeWidth={PILL_STROKE_W}
            />
          </svg>
        )}
      </span>
    </div>
  )
}
