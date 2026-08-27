import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiHandCoinsLight, PiBankLight, PiGlobeLight, PiCalendarCheckLight, PiCaretDownLight } from 'react-icons/pi'
import Navbar from '../../components/Navbar/Navbar'
import heroStyles from '../../components/Hero/Hero.module.css'
import Footer from '../../components/Footer/Footer'
import BuyingJourney from '../../components/BuyingJourney/BuyingJourney'
import Button from '../../components/common/Button'
import heroVisual from '../../assets/buyers-guide/hero-london-thames.webp'
import makStampRing from '../../assets/journey/mak-stamp-ring.svg'
import makStampCenter from '../../assets/journey/mak-stamp-center.svg'
import stableMarketImg from '../../assets/why-invest/stable-market.jpg'
import rentalDemandImg from '../../assets/why-invest/rental-demand.jpg'
import capitalGrowthImg from '../../assets/why-invest/capital-growth.jpg'
import internationalBuyersImg from '../../assets/why-invest/international-buyers.jpg'
import infrastructureImg from '../../assets/why-invest/infrastructure.jpg'
import globalDestinationImg from '../../assets/why-invest/global-destination.jpg'
import { useSEO } from '../../lib/seo'
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

// indices (into buyersGuidePage.faqs.items) of the questions buyers ask most
// often — these are pulled to the front so they're the ones visible before
// "Load More" is pressed, regardless of the order they're written in
// en.json/tr.json.
const PRIORITY_FAQ_INDICES = [0, 1, 3, 4, 6, 7, 8, 9, 12, 21]
const INITIAL_FAQ_COUNT = 10

function scrollToContact() {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// single-open accordion row — the 0fr/1fr grid-template-rows swap animates
// the answer's height without ever measuring it in JS (no ResizeObserver,
// no scrollHeight), which is what keeps this smooth on both desktop and
// mobile regardless of how long/wrapped the answer text is.
//
// The chevron itself needs no JS measurement either: it's absolutely
// positioned against .faqHeaderWrap, which wraps *only* the question
// button, so `top: 100%` always lands exactly on the button's bottom edge
// — i.e. the answer's first line — no matter whether the question wrapped
// to one line or two.
function FaqItem({ id, question, answer, isOpen, onToggle }) {
  return (
    <div className={`${styles.faqRow} ${isOpen ? styles.faqRowOpen : ''}`}>
      <div className={styles.faqInner}>
        <div className={styles.faqHeaderWrap}>
          <PiCaretDownLight
            className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}
            onClick={onToggle}
            aria-hidden="true"
          />
          <button
            type="button"
            className={styles.faqQuestionBtn}
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={id}
          >
            <h3 className={styles.faqQuestion}>{question}</h3>
          </button>
        </div>
        <div
          id={id}
          className={`${styles.faqAnswerWrap} ${isOpen ? styles.faqAnswerWrapOpen : ''}`}
          aria-hidden={!isOpen}
        >
          <div className={styles.faqAnswerInner}>
            <p className={styles.faqAnswer}>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BuyersGuide() {
  const { t } = useTranslation()
  useSEO({ title: t('seo.buyersGuide.title'), description: t('seo.buyersGuide.description') })

  // first FAQ starts open; opening another closes it (and vice versa) —
  // a single index is all a single-open accordion needs.
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [showAllFaqs, setShowAllFaqs] = useState(false)

  // same array, same order as the navbar's Buyer's Guide dropdown
  // (nav.buyersGuideItems / NavContent.jsx's BUYERS_GUIDE_ANCHORS) — used
  // as this page's own section headings so the two can never drift apart.
  const sectionLabels = t('nav.buyersGuideItems', { returnObjects: true })
  const whyInvest = t('buyersGuidePage.internationalBuyersGuide.whyInvest', { returnObjects: true })
  const financingOptions = t('buyersGuidePage.financingOptions.options', { returnObjects: true })
  const faqItems = t('buyersGuidePage.faqs.items', { returnObjects: true })
  const orderedFaqItems = [
    ...PRIORITY_FAQ_INDICES.map((i) => faqItems[i]),
    ...faqItems.filter((_, i) => !PRIORITY_FAQ_INDICES.includes(i)),
  ]
  const visibleFaqItems = showAllFaqs ? orderedFaqItems : orderedFaqItems.slice(0, INITIAL_FAQ_COUNT)

  return (
    <>
      <div className={styles.heroOuter}>
        <section className={styles.hero}>
          <img src={heroVisual} className={styles.bgImage} alt="" />
          <div className={heroStyles.vignetteTop} />

          <Navbar />
        </section>

        <section className={styles.introBand}>
          <h1 className={styles.heading}>{sectionLabels[1]}</h1>
          <p className={styles.body}>{t('buyersGuidePage.intro')}</p>

          <div className={styles.stampWrap}>
            <img className={styles.stampRing} src={makStampRing} alt="" />
            <img className={styles.stampCenter} src={makStampCenter} alt="" />
          </div>
        </section>

        <div className={styles.stampGap} aria-hidden="true" />
      </div>

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
          {visibleFaqItems.map((item, i) => (
            <FaqItem
              key={item.q}
              id={`faq-answer-${i}`}
              question={item.q}
              answer={item.a}
              isOpen={openFaqIndex === i}
              onToggle={() => setOpenFaqIndex((cur) => (cur === i ? null : i))}
            />
          ))}
        </div>

        {!showAllFaqs && orderedFaqItems.length > INITIAL_FAQ_COUNT && (
          <div className={styles.faqLoadMore}>
            <button type="button" className={styles.loadMoreBtn} onClick={() => setShowAllFaqs(true)}>
              {t('buyersGuidePage.faqs.loadMoreButton')}
              <PiCaretDownLight className={styles.loadMoreIcon} aria-hidden="true" />
            </button>
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}
