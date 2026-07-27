import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import aboutVisual from '../../assets/about/about-visual.webp'
import makStampRing from '../../assets/journey/mak-stamp-ring.svg'
import makStampCenter from '../../assets/journey/mak-stamp-center.svg'
import { useSEO } from '../../lib/seo'
import styles from './Services.module.css'

const SERVICE_IDS = [
  'propertySourcing',
  'investmentAdvisory',
  'reservationSupport',
  'developerLiaison',
  'solicitorIntroductions',
  'propertyManagement',
]

export default function Services() {
  const { t } = useTranslation()
  useSEO({ title: t('seo.services.title'), description: t('seo.services.description') })

  const SERVICES = SERVICE_IDS.map((id) => ({
    id,
    title: t(`services.list.${id}.title`),
    body: t(`services.list.${id}.body`),
  }))

  return (
    <>
      <div className={styles.heroOuter}>
        <section className={styles.hero}>
          <img src={aboutVisual} className={styles.bgImage} alt="" />
          <div className={styles.overlay} />

          <Navbar />
        </section>
      </div>

      <section className={styles.introBand}>
        <h1 className={styles.heading}>{t('services.heading')}</h1>
        <p className={styles.body}>{t('services.body')}</p>

        <div className={styles.stampWrap}>
          <img className={styles.stampRing} src={makStampRing} alt="" />
          <img className={styles.stampCenter} src={makStampCenter} alt="" />
        </div>
      </section>

      <section className={styles.servicesSection}>
        <h2 className={styles.servicesHeading}>{t('services.servicesHeading')}</h2>

        <div className={styles.servicesGrid}>
          {SERVICES.map((service, i) => (
            <div key={service.id} className={styles.serviceCard}>
              <span className={styles.serviceIndex}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.serviceDivider} />
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceBody}>{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
