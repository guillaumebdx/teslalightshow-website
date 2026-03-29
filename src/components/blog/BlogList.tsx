import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { articles, getArticleTranslation } from '@/data/blog-articles'
import { useLocale } from '@/hooks/useLocale'

export default function BlogList() {
  const { t, i18n } = useTranslation()
  const { localePath } = useLocale()

  return (
    <section className="min-h-screen bg-surface pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 lg:mb-18"
        >
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Articles */}
        <div className="space-y-8">
          {articles.map((article, i) => {
            const tr = getArticleTranslation(article, i18n.language)
            return (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={localePath(`/blog/${article.slug}`)}
                  className="group flex flex-col sm:flex-row gap-5 rounded-2xl border border-border-light bg-surface-card/50 backdrop-blur-sm p-4 sm:p-5 hover:border-border-light/50 hover:bg-surface-card/80 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="sm:w-56 shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={article.thumbnail}
                      alt={tr.title}
                      className="w-full h-40 sm:h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center min-w-0">
                    <time className="text-xs text-text-muted mb-2" dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString(i18n.language, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h2 className="font-display text-lg sm:text-xl font-semibold text-text-primary mb-2 group-hover:text-primary-light transition-colors line-clamp-2">
                      {tr.title}
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mb-3">
                      {tr.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-light">
                      {t('blog.readMore')}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
