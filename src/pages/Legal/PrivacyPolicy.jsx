import { useTranslation } from 'react-i18next'
import { useSEO } from '../../lib/seo'
import LegalPage from './LegalPage'
import styles from './LegalPage.module.css'

export default function PrivacyPolicy() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'tr' ? 'tr' : 'en'

  useSEO(
    lang === 'tr'
      ? {
          title: 'Gizlilik Politikası ve KVKK Aydınlatma Metni',
          description: 'MAK Global\'in KVKK kapsamında kişisel verilerinizi nasıl işlediği hakkında bilgi.',
        }
      : {
          title: 'Privacy Policy',
          description: 'How MAK Global collects, uses, and protects your personal data under UK GDPR.',
        },
  )

  if (lang === 'tr') {
    return (
      <LegalPage title="Gizlilik Politikası ve KVKK Aydınlatma Metni" updated="Son güncellenme: 31 Temmuz 2026">
        <h2 className={styles.heading}>1. Veri Sorumlusu</h2>
        <p className={styles.body}>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, 98 Vauxhall Walk 3rd Floor The Coade
          Lambeth/Londra adresinde mukim Mak Global Estates Limited ("MAK Global") olarak, kişisel verilerinizi
          veri sorumlusu sıfatıyla aşağıda açıklanan amaçlar doğrultusunda işlemekteyiz.
        </p>

        <h2 className={styles.heading}>2. İşlenen Kişisel Verileriniz</h2>
        <p className={styles.body}>
          İngiltere gayrimenkul yatırım danışmanlığı hizmetlerimiz kapsamında sitemizdeki formlar aracılığıyla
          topladığımız veriler şunlardır:
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Kimlik ve İletişim Bilgileri:</strong> Ad, soyad, e-posta adresi, telefon numarası.
          </li>
          <li>
            <strong>Yatırım Tercihi Bilgileri:</strong> Bütçe aralığı, hedeflenen lokasyonlar, yatırım amaçları
            ve zamanlaması.
          </li>
          <li>
            <strong>İşlem Güvenliği Bilgileri:</strong> IP adresi, tarayıcı bilgileri ve erişim kayıtları.
          </li>
        </ul>

        <h2 className={styles.heading}>3. Veri İşleme Amaçları ve Hukuki Sebepleri</h2>
        <p className={styles.body}>Kişisel verileriniz;</p>
        <ul className={styles.list}>
          <li>Yatırım hedeflerinize uygun Birleşik Krallık gayrimenkul projelerini belirlemek ve size özel danışmanlık sunmak,</li>
          <li>İletişim ve talep formlarınıza geri dönüş sağlamak,</li>
          <li>
            Onay vermeniz halinde pazar analizleri ve yeni proje fırsatları hakkında bilgilendirme yapmak
            amaçlarıyla; KVKK Madde 5 uyarınca sözleşmenin kurulması/ifası, meşru menfaat ve açık rıza hukuki
            sebeplerine dayanarak işlenmektedir.
          </li>
        </ul>

        <h2 className={styles.heading}>4. Kişisel Verilerin Aktarılması</h2>
        <p className={styles.body}>
          Toplanan kişisel veriler, danışmanlık süreçlerinin yürütülmesi amacıyla yalnızca altyapı/sunucu
          hizmeti sağlayan teknik tedarikçilerimizle ve yasal zorunluluk halinde yetkili kamu kurumlarıyla
          paylaşılabilir. Verileriniz üçüncü kişilere satılmaz.
        </p>

        <h2 className={styles.heading}>5. KVKK Madde 11 Kapsamındaki Haklarınız</h2>
        <p className={styles.body}>
          KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep
          etme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz. Taleplerinizi{' '}
          <a href="mailto:info@makglobal.co.uk">info@makglobal.co.uk</a> adresi üzerinden bize iletebilirsiniz.
        </p>
      </LegalPage>
    )
  }

  return (
    <LegalPage title="Privacy Policy" updated="Last updated: 31 July 2026">
      <h2 className={styles.heading}>1. Introduction</h2>
      <p className={styles.body}>
        Mak Global Estates Limited operates as a UK Real Estate Investment Advisory service. We respect your
        privacy and are committed to protecting the personal data of our clients and site visitors in accordance
        with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
      </p>

      <h2 className={styles.heading}>2. Data Controller</h2>
      <p className={styles.body}>
        Mak Global Estates Limited, located at 98 Vauxhall Walk, 3rd Floor, The Coade, Lambeth, London, UK, is
        the data controller responsible for your personal data.
      </p>

      <h2 className={styles.heading}>3. Personal Data We Collect</h2>
      <p className={styles.body}>
        When you interact with our website, inquire about UK property developments, or request advisory
        services, we may collect:
      </p>
      <ul className={styles.list}>
        <li>
          <strong>Identity &amp; Contact Data:</strong> Name, email address, phone number.
        </li>
        <li>
          <strong>Investment Preferences:</strong> Budget, preferred locations in the UK, investment objectives,
          and timeline.
        </li>
        <li>
          <strong>Technical Data:</strong> IP address, browser type, and device information gathered during your
          visit.
        </li>
      </ul>

      <h2 className={styles.heading}>4. How We Use Your Data</h2>
      <p className={styles.body}>We process your personal data for the following purposes:</p>
      <ul className={styles.list}>
        <li>To match your investment criteria with suitable UK real estate developments.</li>
        <li>To respond to your inquiries submitted via "Talk to Us" or consultation forms.</li>
        <li>To send you market insights, buyer guides, and property opportunities (where you have consented).</li>
        <li>To comply with legal and regulatory obligations.</li>
      </ul>

      <h2 className={styles.heading}>5. Data Sharing &amp; Security</h2>
      <p className={styles.body}>
        We do not sell your personal data. We may share your data with trusted service providers (e.g., IT
        hosting, CRM systems) strictly for operating our advisory services. All data is processed using
        appropriate technical and organizational security measures.
      </p>

      <h2 className={styles.heading}>6. Your Legal Rights</h2>
      <p className={styles.body}>
        Under UK GDPR, you have the right to access, rectify, erase, restrict, or object to the processing of
        your personal data, as well as the right to data portability. To exercise any of these rights, contact
        us at <a href="mailto:info@makglobal.co.uk">info@makglobal.co.uk</a>.
      </p>
    </LegalPage>
  )
}
