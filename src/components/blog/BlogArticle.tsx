import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { getArticle, getArticleTranslation, type BlockType } from '@/data/blog-articles'
import { useEffect } from 'react'

function ContentBlock({ block }: { block: BlockType }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-base text-text-secondary leading-relaxed">
          {block.text}
        </p>
      )
    case 'heading':
      return (
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-text-primary mt-4">
          {block.text}
        </h2>
      )
    case 'image':
      return (
        <figure className="my-2">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-xl border border-border-light shadow-lg"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="text-xs text-text-muted text-center mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
    case 'cta':
      return (
        <div className="my-2">
          <Link
            to={block.href}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors duration-200"
          >
            {block.text}
          </Link>
        </div>
      )
    case 'list':
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-base text-text-secondary">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
              {item}
            </li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()

  const article = slug ? getArticle(slug) : undefined
  const tr = article ? getArticleTranslation(article, i18n.language) : undefined

  useEffect(() => {
    if (tr) {
      document.title = `${tr.title} — LightShow Studio`
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', tr.description)
    }
    window.scrollTo(0, 0)
  }, [tr])

  if (!article || !tr) return <Navigate to="/blog" replace />

  return (
    <article className="min-h-screen bg-surface pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            {t('blog.backToList')}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <time className="text-xs text-text-muted" dateTime={article.date}>
            {new Date(article.date).toLocaleDateString(i18n.language, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mt-2">
            {tr.title}
          </h1>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-6"
        >
          {tr.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </motion.div>
      </div>
    </article>
  )
}
