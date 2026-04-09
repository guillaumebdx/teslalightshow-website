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

export default function DownloadCTA() {
  const { t, i18n } = useTranslation()
  const appStoreUrl = APP_STORE_URLS[i18n.language.slice(0, 2)] ?? APP_STORE_URLS.en

  return (
    <section className="relative py-12 lg:py-16 bg-surface/50 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <p className="text-text-secondary text-sm lg:text-base">
            {t('downloadCta.text')}
          </p>

          <div className="flex flex-row items-center justify-center gap-4">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-[1.05] transition-transform duration-300"
              aria-label={t('download.appStoreAlt')}
            >
              <img
                src={appStoreBadge}
                alt={t('download.appStoreAlt')}
                className="h-11 sm:h-12 w-auto"
              />
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.guillaumebdx.tesla3dviewer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-[1.05] transition-transform duration-300"
              aria-label={t('download.playStoreAlt')}
            >
              <img
                src={playStoreBadge}
                alt={t('download.playStoreAlt')}
                className="h-11 sm:h-12 w-auto"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
