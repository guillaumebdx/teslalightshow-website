import type { Metadata } from 'next'
import { SUPPORTED_LANGS, getDictionary, t, isLang } from '@/i18n/dictionaries'
import HomePage from '@/components/pages/HomePage'

const BASE = 'https://lightshowstud.io'

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = isLang(lang) ? lang : 'fr'
  const dict = getDictionary(locale)

  const ogLocale =
    locale === 'fr' ? 'fr_FR' : locale === 'de' ? 'de_DE' : locale === 'es' ? 'es_ES' : 'en_US'

  return {
    title: t(dict, 'meta.title'),
    description: t(dict, 'meta.description'),
    alternates: {
      canonical: `${BASE}/${locale}`,
      languages: Object.fromEntries([
        ...SUPPORTED_LANGS.map((l) => [l, `${BASE}/${l}`]),
        ['x-default', `${BASE}/`],
      ]),
    },
    openGraph: {
      title: t(dict, 'meta.title'),
      description: t(dict, 'meta.ogDescription'),
      url: `${BASE}/${locale}`,
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      title: t(dict, 'meta.twitterTitle'),
      description: t(dict, 'meta.twitterDescription'),
    },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  void lang
  return <HomePage />
}
