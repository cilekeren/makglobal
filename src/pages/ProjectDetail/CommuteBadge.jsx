import styles from './CommuteBadge.module.css'

export default function CommuteBadge({ minutes }) {
  return (
    <div className={styles.badge}>
      <svg viewBox="0 0 120 120" className={styles.ring}>
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 6" />
      </svg>

      <svg viewBox="0 0 24 24" className={styles.clockIcon}>
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>

      <span className={styles.text}>{minutes} MINS</span>

      <svg viewBox="0 0 24 24" className={styles.houseIcon}>
        <path
          d="M4 11.5 12 5l8 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10v8h12v-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
