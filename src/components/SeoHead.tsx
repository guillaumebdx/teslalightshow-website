import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function SeoHead() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language.slice(0, 2)
    document.documentElement.lang = lang

    document.title = t('meta.title')

    setMeta('description', t('meta.description'))
    setMeta('og:title', t('meta.title'), 'property')
    setMeta('og:description', t('meta.ogDescription'), 'property')
    setMeta('og:locale', lang === 'fr' ? 'fr_FR' : lang === 'de' ? 'de_DE' : lang === 'es' ? 'es_ES' : 'en_US', 'property')
    setMeta('twitter:title', t('meta.twitterTitle'))
    setMeta('twitter:description', t('meta.twitterDescription'))
  }, [t, i18n.language])

  return null
}
