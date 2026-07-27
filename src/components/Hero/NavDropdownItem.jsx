import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { pillPathD, PILL_STROKE_W } from './pillPath'
import makMark from '../../assets/hero/nav-mak-mark.svg'
import styles from './Hero.module.css'

export default function NavDropdownItem({ label, to, items }) {
  const pillBoxRef = useRef(null)
  const [pillSize, setPillSize] = useState({ w: 0, h: 0 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    const el = pillBoxRef.current
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setPillSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false)
    }
  }

  return (
    <div
      className={`${styles.navItemWrap} ${open ? styles.navItemWrapOpen : ''}`}
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
    >
      {to ? (
        <Link
          to={to}
          className={styles.navItem}
          onMouseEnter={() => setOpen(true)}
          onFocus={() => setOpen(true)}
        >
          {label}
        </Link>
      ) : (
        <a
          href="#"
          className={styles.navItem}
          onMouseEnter={() => setOpen(true)}
          onFocus={() => setOpen(true)}
        >
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

      <svg
        className={styles.dropdownConnector}
        viewBox="0 0 41 142"
        preserveAspectRatio="xMidYMin meet"
      >
        <path
          className={styles.connectorPath}
          pathLength="1"
          d="M21.3426,0 L21.3426,140 L40.3747,88.63 M21.3426,140 L0.618332,88.63"
        />
      </svg>

      <span className={styles.hoverBridge} />

      <div className={styles.dropdown}>
        <ul className={styles.dropdownList} onMouseLeave={() => setActiveIndex(0)}>
          {items.map((entry, i) => {
            const label = typeof entry === 'string' ? entry : entry.label
            const to = typeof entry === 'string' ? undefined : entry.to
            return (
              <li
                key={label}
                className={styles.dropdownItem}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className={styles.bullet}>
                  <img
                    src={makMark}
                    alt=""
                    className={`${styles.bulletMark} ${
                      i === activeIndex ? styles.bulletMarkActive : styles.bulletMarkPassive
                    }`}
                  />
                </span>
                {to ? (
                  <Link to={to} className={styles.dropdownItemLink}>
                    {label}
                  </Link>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
