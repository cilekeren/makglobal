import { useEffect, useRef, useState } from 'react'
import slide2 from '../../assets/hero/slider/slide-2.jpg'
import slide3 from '../../assets/hero/slider/slide-3.jpg'
import slide4 from '../../assets/hero/slider/slide-4.jpg'
import slide5 from '../../assets/hero/slider/slide-5.webp'
import slide6 from '../../assets/hero/slider/slide-6.webp'
import slide7 from '../../assets/hero/slider/slide-7.webp'
import slide8 from '../../assets/hero/slider/slide-8.webp'
import slide9 from '../../assets/hero/slider/slide-9.webp'
import slide10 from '../../assets/hero/slider/slide-10.webp'
import slide11 from '../../assets/hero/slider/slide-11.webp'
import styles from './Hero.module.css'

const SLIDES = [slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11]

const INTERVAL_MS = 6000
// a slide can't come up again until at least this many other slides have
// shown since it last did.
const NO_REPEAT_WINDOW = 3

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const recentRef = useRef([0])

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
