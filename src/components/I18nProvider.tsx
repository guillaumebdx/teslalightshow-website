'use client'

import { useEffect } from 'react'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import fr from '@/i18n/locales/fr.json'
import en from '@/i18n/locales/en.json'
import de from '@/i18n/locales/de.json'
import es from '@/i18n/locales/es.json'

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  de: { translation: de },
  es: { translation: es },
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'de', 'es'],
    interpolation: { escapeValue: false },
  })
}

export function I18nProvider({
  lang,
  children,
}: {
  lang: string
  children: React.ReactNode
}) {
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
    document.documentElement.lang = lang
  }, [lang])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
