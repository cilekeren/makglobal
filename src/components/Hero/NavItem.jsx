import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { pillPathD, PILL_STROKE_W } from './pillPath'
import styles from './Hero.module.css'

export default function NavItem({ label, to, onClick, highlight = false }) {
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

  const itemClassName = `${styles.navItem} ${highlight ? styles.navItemHighlight : ''}`

  const wrapClassName = `${styles.navItemWrap} ${styles.navItemSimple} ${highlight ? styles.navItemWrapHighlight : ''}`

  return (
    <div className={wrapClassName}>
      {to ? (
        <Link to={to} className={itemClassName}>
          {label}
        </Link>
      ) : onClick ? (
        <a
          href="#contact"
          className={itemClassName}
          onClick={(e) => {
            e.preventDefault()
            onClick()
          }}
        >
          {label}
        </a>
      ) : (
        <a href="#" className={itemClassName}>
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
