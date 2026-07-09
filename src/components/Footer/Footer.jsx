import { useState } from 'react'
import logoIcon from '../../assets/hero/logo-mark2.svg'
import logoMak from '../../assets/hero/logo-mark.svg'
import logoGlobal from '../../assets/hero/logo-text.svg'
import Button from '../common/Button'
import styles from './Footer.module.css'

const NAV_ITEMS = ['PROJECTS', 'BUYER’S GUIDE', 'DISCOVER LONDON', 'FAQ', 'ABOUT US']

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(0)

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
            <a href="#" className={styles.socialIcon} aria-label="Instagram" />
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn" />
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
              <label className={styles.label} htmlFor="footer-budget">
                ESTIMATED BUDGET
              </label>
              <input className={styles.field} id="footer-budget" type="text" />
            </div>
            <div>
              <label className={styles.label} htmlFor="footer-rooms">
                ROOMS
              </label>
              <input className={styles.field} id="footer-rooms" type="text" />
            </div>
          </div>

          <label className={styles.label} htmlFor="footer-message">
            MESSAGE
          </label>
          <textarea className={styles.textarea} id="footer-message" />

          <div className={styles.sendWrap}>
            <Button type="submit" label="SEND" />
          </div>
        </form>
      </div>
    </footer>
  )
}
