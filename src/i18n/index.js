import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import tr from './locales/tr.json'

const STORAGE_KEY = 'mak-lang'

const storedLang = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
const initialLang = storedLang === 'en' || storedLang === 'tr' ? storedLang : 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnEmptyString: false,
})

// set eagerly too — the 'languageChanged' listener below only fires on a
// later changeLanguage() call, not for this initial value, so :lang(tr)
// CSS wouldn't apply on first paint if the stored/default language is 'tr'.
if (typeof document !== 'undefined') document.documentElement.lang = initialLang

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, lng)
  if (typeof document !== 'undefined') document.documentElement.lang = lng
})

export default i18n
