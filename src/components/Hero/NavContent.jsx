import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import NavDropdownItem from './NavDropdownItem'
import NavItem from './NavItem'
import { scrollToId, scrollToTop } from '../../lib/lenis'
import navDivider from '../../assets/hero/nav-divider.svg'
import navDividerDark from '../../assets/hero/nav-divider-dark.svg'
import styles from './Hero.module.css'

// order matches nav.buyersGuideItems exactly — each label is paired with
// the matching section id on the Buyer's Guide page (BuyersGuide.jsx),
// so the dropdown/mobile menu and the page's own section order can never
// drift apart.
const BUYERS_GUIDE_ANCHORS = [
  'property-buying-process',
  'international-buyers-guide',
  'taxes-and-fees',
  'financing-options',
  'faqs',
]

export default function NavContent({ sticky = false }) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  const buyersGuideLabels = t('nav.buyersGuideItems', { returnObjects: true })
  const buyersGuideDropdown = buyersGuideLabels.map((label, i) => ({
    label,
    to: `/buyers-guide#${BUYERS_GUIDE_ANCHORS[i]}`,
  }))

  const NAV_ITEMS = [
    { label: t('nav.projects'), to: '/projects' },
    { label: t('nav.buyersGuide'), to: '/buyers-guide', dropdown: buyersGuideDropdown },
    { label: t('nav.services'), to: '/services' },
    { label: t('nav.discoverLondon'), to: '/discover-london' },
    { label: t('nav.aboutUs'), to: '/about' },
    { label: t('nav.talkToUs'), onClick: () => scrollToId('contact') },
  ]

  return (
    <>
      <Link
        to="/"
        className={styles.logoSlot}
        onClick={(e) => {
          closeMobile()
          if (location.pathname === '/') {
            e.preventDefault()
            scrollToTop()
          }
        }}
      >
        <Logo dark={sticky} compact={sticky} />
      </Link>

      <nav className={styles.navItems} aria-label={t('nav.primaryNav')}>
        {NAV_ITEMS.map((item) =>
          item.dropdown ? (
            <NavDropdownItem key={item.label} label={item.label} to={item.to} items={item.dropdown} />
          ) : (
            <NavItem key={item.label} label={item.label} to={item.to} onClick={item.onClick} />
          ),
        )}
      </nav>

      <div className={styles.langBlock}>
        <button
          type="button"
          className={styles.langBtn}
          aria-pressed={i18n.language === 'en'}
          onClick={() => i18n.changeLanguage('en')}
        >
          EN
        </button>
        <img src={sticky ? navDividerDark : navDivider} className={styles.langDivider} alt="" />
        <button
          type="button"
          className={styles.langBtn}
          aria-pressed={i18n.language === 'tr'}
          onClick={() => i18n.changeLanguage('tr')}
        >
          TR
        </button>
      </div>

      <button
        type="button"
        className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
        aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNavItems} aria-label={t('nav.mobileNav')}>
          {NAV_ITEMS.map((item) =>
            item.to ? (
              <Link key={item.label} to={item.to} className={styles.mobileNavItem} onClick={closeMobile}>
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href="#contact"
                className={styles.mobileNavItem}
                onClick={(e) => {
                  e.preventDefault()
                  closeMobile()
                  item.onClick?.()
                }}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className={styles.mobileLangBlock}>
          <button
            type="button"
            className={styles.langBtn}
            aria-pressed={i18n.language === 'en'}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>
          <img src={navDividerDark} className={styles.langDivider} alt="" />
          <button
            type="button"
            className={styles.langBtn}
            aria-pressed={i18n.language === 'tr'}
            onClick={() => i18n.changeLanguage('tr')}
          >
            TR
          </button>
        </div>
      </div>
    </>
  )
}
