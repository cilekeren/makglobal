import { useEffect, useRef, useState } from 'react'
import slide3 from '../../assets/hero/slider/slide-3.jpg'
import slide6 from '../../assets/hero/slider/slide-6.webp'
import slide7 from '../../assets/hero/slider/slide-7.webp'
import slide8 from '../../assets/hero/slider/slide-8.webp'
import slide10 from '../../assets/hero/slider/slide-10.webp'
import slide11 from '../../assets/hero/slider/slide-11.webp'
import slide12 from '../../assets/hero/slider/slide-12.webp'
import slide13 from '../../assets/hero/slider/slide-13.webp'
import slide14 from '../../assets/hero/slider/slide-14.webp'
import slide16 from '../../assets/hero/slider/slide-16.webp'
import slide17 from '../../assets/hero/slider/slide-17.webp'
import slide18 from '../../assets/hero/slider/slide-18.webp'
import styles from './Hero.module.css'

const SLIDES = [
  slide3,
  slide6,
  slide7,
  slide8,
  slide10,
  slide11,
  slide12,
  slide13,
  slide14,
  slide16,
  slide17,
  slide18,
]

const INTERVAL_MS = 6000
// a slide can't come up again until at least this many other slides have
// shown since it last did.
const NO_REPEAT_WINDOW = 5
// first paint is always this slide — random rotation (below) takes over
// from the second slide onward.
const FIRST_SLIDE_INDEX = SLIDES.indexOf(slide18)

export default function HeroSlider() {
  const [index, setIndex] = useState(FIRST_SLIDE_INDEX)
  const recentRef = useRef([FIRST_SLIDE_INDEX])

  useEffect(() => {
    const id = setInterval(() => {
      const candidates = SLIDES.map((_, i) => i).filter((i) => !recentRef.current.includes(i))
      const next = candidates[Math.floor(Math.random() * candidates.length)]
      recentRef.current = [...recentRef.current, next].slice(-NO_REPEAT_WINDOW)
      setIndex(next)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.bgFull}>
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`${styles.bgImage} ${i === index ? styles.bgImageActive : ''}`}
        />
      ))}
    </div>
  )
}
