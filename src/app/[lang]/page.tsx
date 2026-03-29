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
      images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t(dict, 'meta.twitterTitle'),
      description: t(dict, 'meta.twitterDescription'),
      images: [`${BASE}/og-image.png`],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = isLang(lang) ? lang : 'fr'

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'LightShow Studio',
      url: BASE,
      inLanguage: ['fr', 'en', 'de', 'es'],
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE}/{search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'LightShow Studio',
      url: BASE,
      logo: `${BASE}/favicon.png`,
      sameAs: ['https://www.facebook.com/lightshowstudio'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'LightShow Studio',
      operatingSystem: 'iOS, Android',
      applicationCategory: 'EntertainmentApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      url: `${BASE}/${locale}`,
      description:
        'Create stunning Tesla light shows with millisecond precision. Interactive 3D model, audio timeline, AI generation and native .fseq export.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  )
}
