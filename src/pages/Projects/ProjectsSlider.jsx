import { useEffect, useState } from 'react'
import { PROJECTS } from '../../data/projects'
import heroStyles from '../../components/Hero/Hero.module.css'

const SLIDES = PROJECTS.map((project) => project.image).filter(Boolean)
const INTERVAL_MS = 6000

export default function ProjectsSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (SLIDES.length < 2) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={heroStyles.bgFull}>
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`${heroStyles.bgImage} ${i === index ? heroStyles.bgImageActive : ''}`}
        />
      ))}
    </div>
  )
}
