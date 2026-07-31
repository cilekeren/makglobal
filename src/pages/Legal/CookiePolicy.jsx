import { useTranslation } from 'react-i18next'
import { useSEO } from '../../lib/seo'
import LegalPage from './LegalPage'
import styles from './LegalPage.module.css'

export default function CookiePolicy() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'tr' ? 'tr' : 'en'

  useSEO(
    lang === 'tr'
      ? {
          title: 'Çerez Politikası',
          description: 'MAK Global\'in makglobal.co.uk üzerinde çerezleri nasıl kullandığı hakkında bilgi.',
        }
      : {
          title: 'Cookie Policy',
          description: 'How MAK Global uses cookies and similar tracking technologies on makglobal.co.uk.',
        },
  )

  if (lang === 'tr') {
    return (
      <LegalPage title="Çerez Politikası" updated="Son güncellenme: 31 Temmuz 2026">
        <h2 className={styles.heading}>1. Giriş</h2>
        <p className={styles.body}>
          Mak Global Estates Limited ("Şirket"), makglobal.co.uk ("Web Sitesi") üzerinde çerezler ve benzeri
          teknolojiler kullanmaktadır. Bu politika, Birleşik Krallık gayrimenkul yatırım danışmanlığı
          hizmetlerimiz kapsamında çerezlerin nasıl kullanıldığını açıklamaktadır.
        </p>

        <h2 className={styles.heading}>2. Çerez Nedir?</h2>
        <p className={styles.body}>
          Çerezler, web sitemizi ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır. Sitenin
          güvenli çalışmasını sağlamak, dil tercihlerinizi (TR/EN) hatırlamak ve emlak projelerimizin nasıl
          incelendiğini analiz etmek amacıyla kullanılır.
        </p>

        <h2 className={styles.heading}>3. Kullandığımız Çerez Türleri</h2>
        <ul className={styles.list}>
          <li>
            <strong>Zorunlu Çerezler:</strong> Web sitesinin temel fonksiyonlarının, güvenlik protokollerinin ve
            iletişim formlarının sorunsuz çalışması için gereklidir.
          </li>
          <li>
            <strong>Analitik ve Performans Çerezleri:</strong> Ziyaretçilerin siteyi nasıl kullandığını, hangi
            İngiltere bölge ve projelerine ilgi gösterdiğini anonim olarak analiz etmemizi sağlar.
          </li>
          <li>
            <strong>İşlevsel Çerezler:</strong> Dil seçimi gibi kullanıcı tercihlerinizi hatırlamamıza yardımcı
            olur.
          </li>
        </ul>

        <h2 className={styles.heading}>4. Çerez Tercihlerinin Yönetimi</h2>
        <p className={styles.body}>
          Tarayıcı ayarlarınız üzerinden dilediğiniz zaman çerezleri engelleyebilir veya silebilirsiniz. Ancak
          zorunlu çerezlerin kapatılması durumunda talep formlarının iletilmesinde aksaklıklar yaşanabilir.
        </p>
      </LegalPage>
    )
  }

  return (
    <LegalPage title="Cookie Policy" updated="Last updated: 31 July 2026">
      <h2 className={styles.heading}>1. Introduction</h2>
      <p className={styles.body}>
        Mak Global Estates Limited (trading as "MAK Global", "we", "us", or "our") uses cookies and similar
        tracking technologies on makglobal.co.uk (the "Website"). This policy explains how we use cookies in
        connection with our UK real estate investment advisory services, in compliance with the UK Privacy and
        Electronic Communications Regulations (PECR) and UK GDPR.
      </p>

      <h2 className={styles.heading}>2. What Are Cookies?</h2>
      <p className={styles.body}>
        Cookies are small text files stored on your device when you visit our Website. They help us ensure the
        site functions securely, remember your preferences, and understand how visitors interact with our
        property listings and advisory content.
      </p>

      <h2 className={styles.heading}>3. Types of Cookies We Use</h2>
      <ul className={styles.list}>
        <li>
          <strong>Essential Cookies:</strong> Required for core website functionality, security, and spam
          prevention on our consultation and inquiry forms.
        </li>
        <li>
          <strong>Analytics &amp; Performance Cookies:</strong> Used to analyze visitor interactions, traffic
          patterns, and popular investment locations/projects so we can optimize our user experience.
        </li>
        <li>
          <strong>Functional Cookies:</strong> Allow the site to remember choices you make (such as language
          preferences: EN/TR).
        </li>
      </ul>

      <h2 className={styles.heading}>4. Managing Your Cookies</h2>
      <p className={styles.body}>
        You can modify your browser settings to decline or delete cookies at any time. However, disabling
        essential cookies may impact your ability to submit inquiry forms or access certain features on our
        site.
      </p>
    </LegalPage>
  )
}
