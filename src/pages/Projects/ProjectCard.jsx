import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const goToDetails = () => navigate(`/projects/${project.slug}`)

  return (
    <div
      className={styles.card}
      role="link"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          goToDetails()
        }
      }}
    >
      {project.image ? (
        <img src={project.image} alt={project.name} className={styles.image} />
      ) : (
        <div className={styles.imagePlaceholder} />
      )}

      <h3 className={styles.projectName}>{project.name}</h3>
      <p className={styles.price}>{project.price || 'Price on Request'}</p>

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
          hovered={hovered}
        />
      </div>
    </div>
  )
}
