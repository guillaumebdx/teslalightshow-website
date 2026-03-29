import type { Metadata } from 'next'
import { SUPPORTED_LANGS, getDictionary, isLang } from '@/i18n/dictionaries'
import { articles, getArticle, getArticleTranslation } from '@/data/blog-articles'
import BlogArticlePage from '@/components/blog/BlogArticle'

const BASE = 'https://lightshowstud.io'

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  for (const lang of SUPPORTED_LANGS) {
    for (const article of articles) {
      params.push({ lang, slug: article.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = isLang(lang) ? lang : 'fr'
  void getDictionary(locale)

  const article = getArticle(slug)
  if (!article) return {}

  const tr = getArticleTranslation(article, locale)
  const url = `${BASE}/${locale}/blog/${slug}`

  return {
    title: `${tr.title} — LightShow Studio`,
    description: tr.description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map((l) => [l, `${BASE}/${l}/blog/${slug}`]),
      ),
    },
    openGraph: {
      title: tr.title,
      description: tr.description,
      url,
      type: 'article',
      publishedTime: article.date,
    },
    twitter: {
      title: tr.title,
      description: tr.description,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const locale = isLang(lang) ? lang : 'fr'

  const article = getArticle(slug)
  if (!article) return null

  const tr = getArticleTranslation(article, locale)
  const url = `${BASE}/${locale}/blog/${slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: tr.title,
    description: tr.description,
    image: `${BASE}/og-image.png`,
    datePublished: article.date,
    dateModified: article.date,
    url,
    inLanguage: locale,
    author: {
      '@type': 'Organization',
      name: 'LightShow Studio',
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'LightShow Studio',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/favicon.png` },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticlePage />
    </>
  )
}
