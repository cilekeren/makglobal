import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import styles from './LegalPage.module.css'

export default function LegalPage({ title, updated, children }) {
  return (
    <>
      <section className={styles.heroBand}>
        <Navbar />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.updated}>{updated}</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.inner}>{children}</div>
      </section>

      <Footer />
    </>
  )
}
