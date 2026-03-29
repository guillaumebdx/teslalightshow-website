'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import appStoreBadgeImg from '@/assets/preview/appstore.png'
import playStoreBadgeImg from '@/assets/preview/playstore.png'

const appStoreBadge = typeof appStoreBadgeImg === 'string' ? appStoreBadgeImg : appStoreBadgeImg.src
const playStoreBadge = typeof playStoreBadgeImg === 'string' ? playStoreBadgeImg : playStoreBadgeImg.src

const APP_STORE_URLS: Record<string, string> = {
  fr: 'https://apps.apple.com/fr/app/lightshow-studio/id6759118132',
  en: 'https://apps.apple.com/us/app/lightshow-studio/id6759118132',
  de: 'https://apps.apple.com/de/app/lightshow-studio/id6759118132',
  es: 'https://apps.apple.com/es/app/lightshow-studio/id6759118132',
}

export default function Download() {
  const { t, i18n } = useTranslation()
  const appStoreUrl = APP_STORE_URLS[i18n.language.slice(0, 2)] ?? APP_STORE_URLS.en

  return (
    <section id="download" className="relative py-24 lg:py-32 bg-surface overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/5 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-light mb-4">
            {t('download.label')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t('download.titleStart')}
            <span className="bg-gradient-to-r from-primary-light via-accent to-accent-light bg-clip-text text-transparent">
              {t('download.titleHighlight')}
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-text-secondary text-base lg:text-lg leading-relaxed mb-12">
            {t('download.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hover:scale-[1.05] transition-transform duration-300"
              aria-label={t('download.appStoreAlt')}
            >
              <img
                src={appStoreBadge}
                alt={t('download.appStoreAlt')}
                className="h-16 sm:h-[72px] w-auto"
              />
            </motion.a>

            <motion.a
              href="https://play.google.com/store/apps/details?id=com.guillaumebdx.tesla3dviewer"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hover:scale-[1.05] transition-transform duration-300"
              aria-label={t('download.playStoreAlt')}
            >
              <img
                src={playStoreBadge}
                alt={t('download.playStoreAlt')}
                className="h-16 sm:h-[72px] w-auto"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
