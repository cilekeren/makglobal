import { useTranslation } from 'react-i18next'
import { useSEO } from '../../lib/seo'
import LegalPage from './LegalPage'
import styles from './LegalPage.module.css'

export default function TermsOfService() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'tr' ? 'tr' : 'en'

  useSEO(
    lang === 'tr'
      ? {
          title: 'Kullanım Koşulları',
          description: 'makglobal.co.uk sitesini ve danışmanlık hizmetlerimizi kullanımınızı düzenleyen koşullar.',
        }
      : {
          title: 'Terms of Service',
          description: 'The terms governing your use of makglobal.co.uk and our real estate advisory services.',
        },
  )

  if (lang === 'tr') {
    return (
      <LegalPage title="Kullanım Koşulları" updated="Son güncellenme: 31 Temmuz 2026">
        <h2 className={styles.heading}>1. Şartların Kabulü</h2>
        <p className={styles.body}>
          makglobal.co.uk sitesine erişerek bu kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul
          etmiyorsanız lütfen siteyi kullanmayınız.
        </p>

        <h2 className={styles.heading}>2. Danışmanlık Hizmeti Kapsamı ve Sorumluluk Reddi</h2>
        <p className={styles.body}>
          Mak Global Estates Limited, Birleşik Krallık genelinde gayrimenkul yatırım danışmanlığı hizmeti
          sunmaktadır.
        </p>
        <ul className={styles.list}>
          <li>
            Web sitesinde yer alan rehberler, proje detayları ve içerikler genel bilgilendirme ve danışmanlık
            amacıyla sunulmaktadır.
          </li>
          <li>
            Sitedeki hiçbir bilgi doğrudan bağlayıcı hukuki, mali veya vergi tavsiyesi niteliğinde değildir.
            Yatırımcıların gayrimenkul alım kararı öncesinde bağımsız hukuki ve finansal inceleme yapması
            önerilir.
          </li>
        </ul>

        <h2 className={styles.heading}>3. Fikri Mülkiyet Hakları</h2>
        <p className={styles.body}>
          Sitede yer alan tüm metinler, logolar, grafikler ve tasarım unsurları Mak Global Estates Limited'e
          aittir. Yazılı izin olmaksızın kopyalanamaz ve dağıtılamaz. Telif Hakkı © 2026 Mak Global Estates
          Limited - Tüm Hakları Saklıdır.
        </p>

        <h2 className={styles.heading}>4. Uygulanacak Hukuk</h2>
        <p className={styles.body}>İşbu Kullanım Koşulları İngiltere ve Galler hukukuna tabidir.</p>
      </LegalPage>
    )
  }

  return (
    <LegalPage title="Terms of Service" updated="Last updated: 31 July 2026">
      <h2 className={styles.heading}>1. Acceptance of Terms</h2>
      <p className={styles.body}>
        By accessing makglobal.co.uk, you agree to comply with these Terms of Service. If you do not agree,
        please refrain from using our Website.
      </p>

      <h2 className={styles.heading}>2. Nature of Advisory Services &amp; Disclaimer</h2>
      <p className={styles.body}>
        Mak Global Estates Limited provides real estate investment advisory services and property information
        across the UK.
      </p>
      <ul className={styles.list}>
        <li>
          The content, guides, and project details provided on this Website are for general informational and
          advisory purposes only.
        </li>
        <li>
          They do not constitute formal legal, tax, or binding financial advice. Visitors are advised to conduct
          independent legal and financial due diligence before entering into property transactions.
        </li>
      </ul>

      <h2 className={styles.heading}>3. Intellectual Property Rights</h2>
      <p className={styles.body}>
        All content on this Website—including logos, branding, text, graphics, and layout—is the property of Mak
        Global Estates Limited and protected by copyright laws. Copyright © 2026 Mak Global Estates Limited - All
        Rights Reserved.
      </p>

      <h2 className={styles.heading}>4. Prohibited Uses</h2>
      <p className={styles.body}>
        You agree not to misuse the Website, submit false inquiry details, or attempt to compromise the security
        of our platforms.
      </p>

      <h2 className={styles.heading}>5. Governing Law</h2>
      <p className={styles.body}>
        These Terms are governed by and construed in accordance with the laws of England and Wales.
      </p>
    </LegalPage>
  )
}
