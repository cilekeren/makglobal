import logoMakGlobalDark from '../../assets/hero/logo-mak-global.svg'
import logoMakGlobalWhite from '../../assets/hero/logo-mak-global-white.svg'
import styles from './Logo.module.css'

// same wordmark in both navbars — white over the hero, dark (and compact)
// in the sticky bar
export default function Logo({ innerRef, dark = false, compact = false }) {
  return (
    <img
      ref={innerRef}
      src={dark ? logoMakGlobalDark : logoMakGlobalWhite}
      className={`${styles.logoDark} ${compact ? styles.logoDarkCompact : ''}`}
      alt="MAK GLOBAL"
    />
  )
}
