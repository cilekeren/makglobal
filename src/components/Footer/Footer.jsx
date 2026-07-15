import { useEffect, useRef, useState } from 'react'
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import logoIcon from '../../assets/hero/logo-mark2.svg'
import logoMak from '../../assets/hero/logo-mark.svg'
import logoGlobal from '../../assets/hero/logo-text.svg'
import Button from '../common/Button'
import styles from './Footer.module.css'

const NAV_ITEMS = ['PROJECTS', 'BUYER’S GUIDE', 'DISCOVER LONDON', 'FAQ', 'ABOUT US']

const PURPOSE_OPTIONS = [
  { value: 'investment', label: 'Investment' },
  { value: 'home', label: 'Home to Live In' },
  { value: 'education', label: 'Child’s Education' },
  { value: 'buy-to-let', label: 'Buy-to-Let' },
  { value: 'holiday', label: 'Holiday / Second Home' },
  { value: 'not-sure', label: 'Not Sure Yet' },
]

const BUDGET_OPTIONS = [
  { value: 'under-400k', label: 'Up to £400K' },
  { value: '400k-600k', label: '£400K-£600K' },
  { value: '600k-800k', label: '£600K-£800K' },
  { value: '800k-plus', label: '£800K+' },
]

// native <select> popups can't be styled to match the site (maroon bg,
// white border) in most browsers, so this is a small custom listbox
// instead, built to look and behave like one.
function FormSelect({ id, placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const selected = options.find((o) => o.value === value)

  return (
    <div className={styles.selectRoot} ref={rootRef}>
      <button
        type="button"
        id={id}
        className={`${styles.field} ${styles.selectButton}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? undefined : styles.selectPlaceholder}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`${styles.selectArrow} ${open ? styles.selectArrowOpen : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <ul className={styles.selectMenu} role="listbox">
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                className={styles.selectOption}
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [purpose, setPurpose] = useState('')
  const [budget, setBudget] = useState('')

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>Contact</h2>

          <div className={styles.navRow}>
            <ul className={styles.navList} onMouseLeave={() => setActiveIndex(0)}>
              {NAV_ITEMS.map((label, i) => (
                <li
                  key={label}
                  className={styles.navItem}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <span className={`${styles.radio} ${i === activeIndex ? styles.radioActive : ''}`} />
                  {label}
                </li>
              ))}
            </ul>
            <span className={styles.divider} />
            <p className={styles.tagline}>How to buy a property in UK?</p>
          </div>

          <div className={styles.social}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>

          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <img src={logoIcon} className={styles.logoIcon} alt="" />
              <img src={logoMak} className={styles.logoMak} alt="" />
              <img src={logoGlobal} className={styles.logoGlobal} alt="MAK GLOBAL" />
            </div>
            <p className={styles.contactLine}>
              <a href="tel:+447825643292">+44 (0) 7825 643 292</a>
              <span className={styles.contactSep}>|</span>
              <a href="mailto:info@makglobal.co.uk">info@makglobal.co.uk</a>
            </p>
            <p className={styles.address}>
              Berkeley Square House, Berkeley Square
              <br />
              Mayfair, London, W1J 6BD
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label className={styles.label} htmlFor="footer-name">
            NAME
          </label>
          <input className={styles.field} id="footer-name" type="text" />

          <label className={styles.label} htmlFor="footer-email">
            E-MAIL
          </label>
          <input className={styles.field} id="footer-email" type="email" />

          <label className={styles.label} htmlFor="footer-phone">
            PHONE
          </label>
          <input className={styles.field} id="footer-phone" type="tel" />

          <div className={styles.row2}>
            <div>
              <label className={styles.label} htmlFor="footer-purpose">
                PURPOSE
              </label>
              <FormSelect
                id="footer-purpose"
                placeholder="Select purpose"
                options={PURPOSE_OPTIONS}
                value={purpose}
                onChange={setPurpose}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="footer-budget">
                ESTIMATED BUDGET
              </label>
              <FormSelect
                id="footer-budget"
                placeholder="Select budget"
                options={BUDGET_OPTIONS}
                value={budget}
                onChange={setBudget}
              />
            </div>
          </div>

          <label className={styles.label} htmlFor="footer-message">
            ADDITIONAL INFORMATION
          </label>
          <textarea className={styles.textarea} id="footer-message" />

          <div className={styles.sendWrap}>
            <Button type="submit" label="FIND MY IDEAL PROPERTY" fullWidth />
          </div>
        </form>
      </div>
    </footer>
  )
}
