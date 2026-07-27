import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/common/Button'
import { useSEO } from '../../lib/seo'
import styles from './NotFound.module.css'

export default function NotFound() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  // noindex: an unmatched route has no content of its own to rank —
  // without this a soft-404 like this one can otherwise get indexed.
  useSEO({ title: t('seo.notFound.title'), description: t('seo.notFound.description'), noindex: true })

  return (
    <>
      <section className={styles.band}>
        <Navbar />

        <div className={styles.content}>
          <p className={styles.code}>404</p>
          <h1 className={styles.heading}>{t('seo.notFound.title')}</h1>
          <p className={styles.body}>{t('seo.notFound.description')}</p>
          <Button label={t('aboutUs.backToHome')} color="#fff" onClick={() => navigate('/')} />
        </div>
      </section>

      <Footer />
    </>
  )
}
