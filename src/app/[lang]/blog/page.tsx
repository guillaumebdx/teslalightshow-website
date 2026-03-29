import type { Metadata } from 'next'
import { SUPPORTED_LANGS, getDictionary, t, isLang } from '@/i18n/dictionaries'
import BlogList from '@/components/blog/BlogList'

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

  const title = `${t(dict, 'blog.title')} — LightShow Studio`
  const description = t(dict, 'blog.subtitle')

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE}/${locale}/blog`,
      languages: Object.fromEntries([
        ...SUPPORTED_LANGS.map((l) => [l, `${BASE}/${l}/blog`]),
      ]),
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/${locale}/blog`,
      type: 'website',
    },
    twitter: { title, description },
  }
}

export default function Page() {
  return <BlogList />
}
