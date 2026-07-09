import logoIcon from '../../assets/hero/logo-mark2.svg'
import logoMak from '../../assets/hero/logo-mark.svg'
import logoGlobal from '../../assets/hero/logo-text.svg'
import logoSubtitle from '../../assets/hero/logo-subtitle.svg'
import logoMakGlobalDark from '../../assets/hero/logo-mak-global.svg'
import styles from './Logo.module.css'

export default function Logo({ innerRef, dark = false, compact = false }) {
  if (dark) {
    return (
      <img
        ref={innerRef}
        src={logoMakGlobalDark}
        className={`${styles.logoDark} ${compact ? styles.logoDarkCompact : ''}`}
        alt="MAK GLOBAL"
      />
    )
  }

  return (
    <div className={styles.logo} ref={innerRef}>
      <div className={styles.row}>
        <img src={logoIcon} className={styles.icon} alt="" />
        <img src={logoMak} className={styles.mak} alt="" />
        <img src={logoGlobal} className={styles.global} alt="" />
      </div>
      <img
        src={logoSubtitle}
        className={styles.subtitle}
        alt="UK Real Estate Investment Advisory"
      />
    </div>
  )
}
