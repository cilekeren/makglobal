import { useTranslation } from 'react-i18next'
import { PiHandCoinsLight, PiBankLight, PiGlobeLight, PiCalendarCheckLight } from 'react-icons/pi'
import Navbar from '../../components/Navbar/Navbar'
import heroStyles from '../../components/Hero/Hero.module.css'
import Footer from '../../components/Footer/Footer'
import BuyingJourney from '../../components/BuyingJourney/BuyingJourney'
import Button from '../../components/common/Button'
import heroVisual from '../../assets/hero/slider/slide-2.jpg'
import makStampRing from '../../assets/journey/mak-stamp-ring.svg'
import makStampCenter from '../../assets/journey/mak-stamp-center.svg'
import stableMarketImg from '../../assets/why-invest/stable-market.jpg'
import rentalDemandImg from '../../assets/why-invest/rental-demand.jpg'
import capitalGrowthImg from '../../assets/why-invest/capital-growth.jpg'
import internationalBuyersImg from '../../assets/why-invest/international-buyers.jpg'
import infrastructureImg from '../../assets/why-invest/infrastructure.jpg'
import globalDestinationImg from '../../assets/why-invest/global-destination.jpg'
import styles from './BuyersGuide.module.css'

// same order as buyersGuidePage.internationalBuyersGuide.whyInvest in
// en.json/tr.json (stable market, rental demand, capital growth,
// international buyers, infrastructure, global destination): a real
// Savills "for sale" board outside a Cambridge townhouse, a row of
// London terraced houses, a couple watching the skyline at sunset, a
// real Heathrow terminal (not just its signage), commuters at Camden
// Town, and graduates throwing their caps.
const WHY_INVEST_IMAGES = [
  stableMarketImg,
  rentalDemandImg,
  capitalGrowthImg,
  internationalBuyersImg,
  infrastructureImg,
  globalDestinationImg,
]

// same order as buyersGuidePage.financingOptions.options in en.json/tr.json
// (Cash Buyers, UK Mortgages, International Mortgages, Payment Plans).
// Light weight — confirmed by tracing AboutUs's own why_icon_*.svg
// assets back to their exact source components (e.g. why_icon_5.svg is
// react-icons/pi's PiShieldLight verbatim): every one of the six is Pi*
// Light, not Bold/Fill. See .cardIcon in BuyersGuide.module.css for the
// matching color/size.
const FINANCING_ICONS = [PiHandCoinsLight, PiBankLight, PiGlobeLight, PiCalendarCheckLight]

function scrollToContact() {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function BuyersGuide() {
  const { t } = useTranslation()

  // same array, same order as the navbar's Buyer's Guide dropdown
  // (nav.buyersGuideItems / NavContent.jsx's BUYERS_GUIDE_ANCHORS) — used
  // as this page's own section headings so the two can never drift apart.
  const sectionLabels = t('nav.buyersGuideItems', { returnObjects: true })
  const whyInvest = t('buyersGuidePage.internationalBuyersGuide.whyInvest', { returnObjects: true })
  const financingOptions = t('buyersGuidePage.financingOptions.options', { returnObjects: true })
  const faqItems = t('buyersGuidePage.faqs.items', { returnObjects: true })

  return (
    <>
      <div className={styles.heroOuter}>
        <section className={styles.hero}>
          <img src={heroVisual} className={styles.bgImage} alt="" />
          <div className={heroStyles.vignetteTop} />

          <Navbar />
        </section>
      </div>

      <section className={styles.introBand}>
        <h1 className={styles.heading}>{sectionLabels[1]}</h1>
        <p className={styles.body}>{t('buyersGuidePage.intro')}</p>

        <div className={styles.stampWrap}>
          <img className={styles.stampRing} src={makStampRing} alt="" />
          <img className={styles.stampCenter} src={makStampCenter} alt="" />
        </div>
      </section>

      <section id="international-buyers-guide" className={styles.section}>
        <h2 className={styles.sectionHeading}>
          {t('buyersGuidePage.internationalBuyersGuide.whyInvestHeading')}
        </h2>
        <div className={styles.whyGrid}>
          {whyInvest.map((reason, i) => (
            <div key={reason} className={styles.whyCard}>
              <img src={WHY_INVEST_IMAGES[i]} alt="" className={styles.whyImage} />
              <span className={styles.whyLabelWrap}>
                <span className={styles.whyLabel}>{reason}</span>
              </span>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <h3 className={styles.ctaHeading}>
            {t('buyersGuidePage.internationalBuyersGuide.ctaHeading')}
          </h3>
          <p className={styles.ctaBody}>{t('footer.ctaText')}</p>
          <Button
            label={t('buyersGuidePage.internationalBuyersGuide.ctaButton')}
            color="#0A3332"
            onClick={scrollToContact}
          />
        </div>
      </section>

      <div id="property-buying-process" className={styles.anchor}>
        <BuyingJourney />
      </div>

      <section id="taxes-and-fees" className={`${styles.section} ${styles.sectionAlt}`}>
        <h2 className={styles.sectionHeading}>{sectionLabels[2]}</h2>

        <div className={styles.taxBlock}>
          <span className={styles.taxDivider} />
          <h3 className={styles.taxQuestion}>{t('buyersGuidePage.taxesAndFees.q')}</h3>
          <p className={styles.taxBody}>{t('buyersGuidePage.taxesAndFees.a1')}</p>
          <p className={styles.taxBody}>{t('buyersGuidePage.taxesAndFees.a2')}</p>
        </div>
      </section>

      <section id="financing-options" className={`${styles.section} ${styles.sectionTeal}`}>
        <h2 className={styles.sectionHeading}>{sectionLabels[3]}</h2>

        <div className={styles.financingGrid}>
          {financingOptions.map((option, i) => {
            const Icon = FINANCING_ICONS[i]
            return (
              <div key={option.title} className={styles.card}>
                <Icon className={styles.cardIcon} aria-hidden="true" />
                <span className={styles.cardDivider} />
                <h3 className={styles.cardTitle}>{option.title}</h3>
                <p className={styles.cardBody}>{option.body}</p>
              </div>
            )
          })}
        </div>

        <div className={styles.cta}>
          <h3 className={styles.ctaHeading}>{t('buyersGuidePage.financingOptions.ctaHeading')}</h3>
          <p className={styles.ctaBody}>{t('buyersGuidePage.financingOptions.ctaBody')}</p>
          <Button
            label={t('buyersGuidePage.financingOptions.ctaButton')}
            color="#fff"
            onClick={scrollToContact}
          />
        </div>
      </section>

      <section id="faqs" className={styles.section}>
        <h2 className={styles.sectionHeading}>{sectionLabels[4]}</h2>

        <div className={styles.faqList}>
          {faqItems.map((item) => (
            <div key={item.q} className={styles.faqRow}>
              <div className={styles.faqInner}>
                <h3 className={styles.faqQuestion}>{item.q}</h3>
                <p className={styles.faqAnswer}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
