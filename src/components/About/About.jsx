import Button from '../common/Button'
import aboutVisual from '../../assets/about/about-visual.webp'
import styles from './About.module.css'

export default function About() {
  return (
    <section className={styles.section}>
      <img src={aboutVisual} alt="" className={styles.bgImage} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h2 className={styles.heading}>About Us</h2>

        <p className={styles.body}>
          MAK Global helps local and international buyers easily purchase property in London. We
          simplify the complex overseas buying process by providing accurate information, trusted
          partners, and carefully selected opportunities.
        </p>

        <p className={styles.body}>
          Thanks to our strong background in construction, we don&rsquo;t just sell properties
          &mdash;we guide you through every single stage, including planning, development,
          delivery, and after-sales support. From our very first meeting until you get your keys,
          our goal is to help you make the right decisions and secure long-term investment value.
        </p>

        <div className={styles.ctaWrap}>
          <Button label="SERVICES & MORE" color="#fff" />
        </div>
      </div>
    </section>
  )
}
