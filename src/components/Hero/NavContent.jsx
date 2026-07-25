import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import NavDropdownItem from './NavDropdownItem'
import NavItem from './NavItem'
import navDivider from '../../assets/hero/nav-divider.svg'
import navDividerDark from '../../assets/hero/nav-divider-dark.svg'
import styles from './Hero.module.css'

export default function NavContent({ sticky = false }) {
  const { t, i18n } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  const NAV_ITEMS = [
    { label: t('nav.projects'), to: '/projects' },
    { label: t('nav.buyersGuide'), dropdown: t('nav.buyersGuideItems', { returnObjects: true }) },
    { label: t('nav.services'), to: '/services' },
    { label: t('nav.discoverLondon'), to: '/discover-london' },
    { label: t('nav.aboutUs'), to: '/about' },
    { label: t('nav.talkToUs') },
  ]

  return (
    <>
      <Link to="/" className={styles.logoSlot} onClick={closeMobile}>
        <Logo dark={sticky} compact={sticky} />
      </Link>

      <nav className={styles.navItems} aria-label={t('nav.primaryNav')}>
        {NAV_ITEMS.map((item) =>
          item.dropdown ? (
            <NavDropdownItem key={item.label} label={item.label} items={item.dropdown} />
          ) : (
            <NavItem key={item.label} label={item.label} to={item.to} />
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
            item.dropdown ? (
              <a key={item.label} href="#" className={styles.mobileNavItem}>
                {item.label}
              </a>
            ) : item.to ? (
              <Link key={item.label} to={item.to} className={styles.mobileNavItem} onClick={closeMobile}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href="#" className={styles.mobileNavItem}>
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
