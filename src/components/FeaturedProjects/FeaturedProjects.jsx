import Button from '../common/Button'
import { PROJECTS } from '../../data/projects'
import styles from './FeaturedProjects.module.css'

function bedRange(prices) {
  const beds = prices.map((p) => parseInt(p.type, 10)).filter((n) => !Number.isNaN(n))
  if (!beds.length) return null
  const min = Math.min(...beds)
  const max = Math.max(...beds)
  return min === max ? `${min}` : `${min}-${max}`
}

function ProjectCard({ project }) {
  const beds = project.prices ? bedRange(project.prices) : null
  const fromPrice = project.prices?.[0]?.price || project.price

  return (
    <div className={styles.card}>
      {project.image ? (
        <img src={project.image} alt={project.name} className={styles.image} />
      ) : (
        <div className={styles.imagePlaceholder} />
      )}

      <div className={styles.cardBody}>
        <h3 className={styles.projectName}>{project.name}</h3>

        {(project.location || beds || project.completion) && (
          <p className={styles.projectDetails}>
            {project.location && (
              <>
                {project.location.text}
                {project.location.zone && ` | ${project.location.zone.toUpperCase()}`}
              </>
            )}
            {(beds || project.completion) && (
              <>
                {project.location && <br />}
                {beds && `${beds} Bed  |  `}
                New Build
                {project.completion && `  |  ${project.completion.quarter} ${project.completion.year}`}
              </>
            )}
          </p>
        )}

        <img
          src={project.developerLogo}
          alt={project.developerName}
          className={styles.developerLogo}
        />
      </div>

      <p className={styles.price}>{fromPrice ? `From ${fromPrice}` : 'Price on Request'}</p>

      <div className={styles.detailsBtnWrap}>
        <Button
          label="DETAILS"
          variant="filled"
          color="#163a3d"
          textColor="#fff"
          scale={2.1}
          strokeScale={3}
          padding={10}
          arrowLength={24}
        />
      </div>
    </div>
  )
}

export default function FeaturedProjects() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Featured Projects</h2>
      <p className={styles.subheading}>
        A curated selection of London&rsquo;s finest developments,
        <br />
        handpicked for you.
      </p>

      <div className={styles.cardRow}>
        {PROJECTS.slice(0, 3).map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <p className={styles.ctaText}>
        Looking for the perfect investment?
        <br />
        Browse our extensive range of upcoming and completed projects.
      </p>

      <div className={styles.viewProjectsWrap}>
        <Button label="VIEW ALL PROJECTS" color="#163a3d" />
      </div>
    </section>
  )
}
