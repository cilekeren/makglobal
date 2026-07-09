import { useEffect, useState } from 'react'
import slide1 from '../../assets/hero/slider/slide-1.jpg'
import slide2 from '../../assets/hero/slider/slide-2.jpg'
import slide3 from '../../assets/hero/slider/slide-3.jpg'
import slide4 from '../../assets/hero/slider/slide-4.jpg'
import styles from './Hero.module.css'

const SLIDES = [slide1, slide2, slide3, slide4]

const INTERVAL_MS = 6000

export default function HeroSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
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
