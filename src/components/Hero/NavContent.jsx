import { Link } from 'react-router-dom'
import Logo from './Logo'
import NavDropdownItem from './NavDropdownItem'
import NavItem from './NavItem'
import navDivider from '../../assets/hero/nav-divider.svg'
import navDividerDark from '../../assets/hero/nav-divider-dark.svg'
import styles from './Hero.module.css'

export const NAV_ITEMS = [
  { label: 'PROJECTS', to: '/projects' },
  {
    label: 'BUYER’S GUIDE',
    dropdown: [
      'Property Buying Process in London',
      'International Buyer’s Guide',
      'Taxes and Fees',
      'Financing Options',
      'FAQ’s',
    ],
  },
  { label: 'DISCOVER LONDON', to: '/discover-london' },
  { label: 'ABOUT US' },
  { label: 'TALK TO US!' },
]

export default function NavContent({ sticky = false }) {
  return (
    <>
      <Link to="/" className={styles.logoSlot}>
        <Logo dark={sticky} compact={sticky} />
      </Link>

      <nav className={styles.navItems} aria-label="Primary">
        {NAV_ITEMS.map((item) =>
          item.dropdown ? (
            <NavDropdownItem key={item.label} label={item.label} items={item.dropdown} />
          ) : (
            <NavItem key={item.label} label={item.label} to={item.to} />
          ),
        )}
      </nav>

      <div className={styles.langBlock}>
        <button type="button" className={styles.langBtn}>
          EN
        </button>
        <img src={sticky ? navDividerDark : navDivider} className={styles.langDivider} alt="" />
        <button type="button" className={styles.langBtn}>
          TR
        </button>
      </div>
    </>
  )
}
