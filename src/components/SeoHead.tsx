import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocale, SUPPORTED_LANGS } from '@/hooks/useLocale'

const BASE = 'https://lightshowstud.io'

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let el = document.querySelector(selector) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function SeoHead() {
  const { t, i18n } = useTranslation()
  const { lang } = useLocale()

  useEffect(() => {
    document.documentElement.lang = lang

    document.title = t('meta.title')

    setMeta('description', t('meta.description'))
    setMeta('og:title', t('meta.title'), 'property')
    setMeta('og:description', t('meta.ogDescription'), 'property')
    setMeta('og:locale', lang === 'fr' ? 'fr_FR' : lang === 'de' ? 'de_DE' : lang === 'es' ? 'es_ES' : 'en_US', 'property')
    setMeta('og:url', `${BASE}/${lang}`, 'property')
    setMeta('twitter:title', t('meta.twitterTitle'))
    setMeta('twitter:description', t('meta.twitterDescription'))

    // Canonical
    setLink('canonical', `${BASE}/${lang}`)

    // Hreflang alternates
    for (const l of SUPPORTED_LANGS) {
      setLink('alternate', `${BASE}/${l}`, l)
    }
    setLink('alternate', `${BASE}/`, 'x-default')
  }, [t, i18n.language, lang])

  return null
}
