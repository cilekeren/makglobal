import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import logoIcon from '../../assets/hero/logo-mark2.svg'
import logoMak from '../../assets/hero/logo-mark.svg'
import logoGlobal from '../../assets/hero/logo-text.svg'
import navMarkWhite from '../../assets/hero/nav-mak-mark-white.svg'
import navMarkMaroon from '../../assets/hero/nav-mak-mark-maroon.svg'
import Button from '../common/Button'
import styles from './Footer.module.css'

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

const HUBSPOT_PORTAL_ID = '148945995'
const HUBSPOT_FORM_ID = '40c86354-595e-47f3-a5fb-e124dd50a31a'
const HUBSPOT_ENDPOINT = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`

// HubSpot's "purpose"/"estimated_budget" dropdown properties are
// enumerations: a submitted value that doesn't match one of the option
// strings defined on the HubSpot side is silently dropped (no error, the
// property just stays empty on the contact). Those option strings differ
// slightly in wording/spacing/case from this form's own labels, so they're
// mapped explicitly here rather than reusing PURPOSE_OPTIONS/BUDGET_OPTIONS
// labels — pulled verbatim from the live form definition at
// forms-eu1.hsforms.com/embed/v4/render-definition/148945995/<formId>.
const PURPOSE_HUBSPOT_VALUES = {
  investment: 'Investment',
  home: 'Home to live in',
  education: "Child's Education",
  'buy-to-let': 'Buy-to-let',
  holiday: 'Holiday / Second Home',
  'not-sure': 'Not sure yet',
}

const BUDGET_HUBSPOT_VALUES = {
  'under-400k': 'Up to £400K',
  '400k-600k': '£400K - £600K',
  '600k-800k': '£600K - £800K',
  '800k-plus': '£800K +',
}

export default function Footer() {
  const { t } = useTranslation()

  const NAV_ITEMS = [
    { label: t('nav.projects'), to: '/projects' },
    { label: t('nav.buyersGuide') },
    { label: t('nav.services'), to: '/services' },
    { label: t('nav.discoverLondon'), to: '/discover-london' },
    { label: t('footer.faq') },
    { label: t('nav.aboutUs'), to: '/about' },
  ]

  const PURPOSE_OPTIONS = [
    { value: 'investment', label: t('footer.purposeOptions.investment') },
    { value: 'home', label: t('footer.purposeOptions.home') },
    { value: 'education', label: t('footer.purposeOptions.education') },
    { value: 'buy-to-let', label: t('footer.purposeOptions.buyToLet') },
    { value: 'holiday', label: t('footer.purposeOptions.holiday') },
    { value: 'not-sure', label: t('footer.purposeOptions.notSure') },
  ]

  const BUDGET_OPTIONS = [
    { value: 'under-400k', label: t('footer.budgetOptions.under400k') },
    { value: '400k-600k', label: t('footer.budgetOptions.from400kTo600k') },
    { value: '600k-800k', label: t('footer.budgetOptions.from600kTo800k') },
    { value: '800k-plus', label: t('footer.budgetOptions.over800k') },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [purpose, setPurpose] = useState('')
  const [budget, setBudget] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | missing-selects

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    // purpose/budget are custom HubSpot listboxes, not native <select>s, so
    // the browser's own `required` validation never sees them — the form
    // itself now marks both as required, so a missing value gets rejected
    // by HubSpot anyway; catch it here first instead of round-tripping.
    if (!purpose || !budget) {
      setStatus('missing-selects')
      return
    }

    setStatus('sending')

    try {
      const res = await fetch(HUBSPOT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: name },
            { name: 'email', value: email },
            { name: 'phone', value: phone },
            { name: 'purpose', value: PURPOSE_HUBSPOT_VALUES[purpose] },
            { name: 'estimated_budget', value: BUDGET_HUBSPOT_VALUES[budget] },
            { name: 'message', value: message },
          ],
          context: {
            pageUri: window.location.href,
            pageName: document.title,
          },
        }),
      })

      if (!res.ok) throw new Error('HubSpot submission failed')

      setStatus('sent')
      setName('')
      setEmail('')
      setPhone('')
      setPurpose('')
      setBudget('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>{t('footer.contact')}</h2>

          <div className={styles.navRow}>
            <ul className={styles.navList} onMouseLeave={() => setActiveIndex(0)}>
              {NAV_ITEMS.map(({ label, to }, i) => (
                <li
                  key={label}
                  className={styles.navItem}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <span className={styles.radio}>
                    <img
                      src={i === activeIndex ? navMarkWhite : navMarkMaroon}
                      alt=""
                      className={styles.radioMark}
                    />
                  </span>
                  {to ? <Link to={to} className={styles.navItemLink}>{label}</Link> : label}
                </li>
              ))}
            </ul>
            <span className={styles.divider} />
            <div className={styles.ctaBlock}>
              <p className={styles.ctaText}>{t('footer.ctaText')}</p>
              <Button
                label={t('common.callUs')}
                color="#fff"
                onClick={() => {
                  window.location.href = 'tel:+447825643292'
                }}
              />
            </div>
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

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="footer-name">
            {t('footer.nameLabel')}
          </label>
          <input
            className={styles.field}
            id="footer-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className={styles.label} htmlFor="footer-email">
            {t('footer.emailLabel')}
          </label>
          <input
            className={styles.field}
            id="footer-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.label} htmlFor="footer-phone">
            {t('footer.phoneLabel')}
          </label>
          <input
            className={styles.field}
            id="footer-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <div className={styles.row2}>
            <div>
              <label className={styles.label} htmlFor="footer-purpose">
                {t('footer.purposeLabel')}
              </label>
              <FormSelect
                id="footer-purpose"
                placeholder={t('footer.purposePlaceholder')}
                options={PURPOSE_OPTIONS}
                value={purpose}
                onChange={setPurpose}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="footer-budget">
                {t('footer.budgetLabel')}
              </label>
              <FormSelect
                id="footer-budget"
                placeholder={t('footer.budgetPlaceholder')}
                options={BUDGET_OPTIONS}
                value={budget}
                onChange={setBudget}
              />
            </div>
          </div>

          <label className={styles.label} htmlFor="footer-message">
            {t('footer.messageLabel')}
          </label>
          <textarea
            className={styles.textarea}
            id="footer-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className={styles.sendWrap}>
            <Button
              type="submit"
              label={status === 'sending' ? t('footer.sending') : t('footer.submit')}
              fullWidth
            />
            {status === 'sent' && <p className={styles.formStatus}>{t('footer.statusSent')}</p>}
            {status === 'missing-selects' && (
              <p className={styles.formStatus}>{t('footer.statusMissingSelects')}</p>
            )}
            {status === 'error' && <p className={styles.formStatus}>{t('footer.statusError')}</p>}
          </div>
        </form>
      </div>
    </footer>
  )
}
