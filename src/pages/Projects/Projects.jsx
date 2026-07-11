import heroStyles from '../../components/Hero/Hero.module.css'
import Navbar from '../../components/Navbar/Navbar'
import ArrowIcon from '../../components/common/ArrowIcon'
import ProjectsSlider from './ProjectsSlider'
import ProjectCard from './ProjectCard'
import ProjectsMap from './ProjectsMap'
import Footer from '../../components/Footer/Footer'
import { PROJECTS } from '../../data/projects'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <>
      <div className={heroStyles.heroOuter}>
        <section className={styles.top}>
          <ProjectsSlider />

          <div className={heroStyles.vignetteTop} />

          <Navbar />
        </section>
      </div>

      <section className={styles.intro}>
        <h1 className={styles.heading}>PROJECTS</h1>
        <p className={styles.subheading}>
          Explore premium UK real estate at its finest. Featuring the latest and most exclusive
          developments from the country&rsquo;s top builders, our portfolio offers unmatched quality,
          prime locations, and exceptional investment potential.
        </p>

        <ArrowIcon lineLength={18} className={styles.scrollArrow} />
      </section>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      <ProjectsMap />

      <Footer />
    </>
  )
}
