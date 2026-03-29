'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-surface">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px]" />
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
            {t('contact.label')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t('contact.titleStart')}
            <span className="bg-gradient-to-r from-primary-light via-accent to-accent-light bg-clip-text text-transparent">
              {t('contact.titleHighlight')}
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-text-secondary text-base lg:text-lg leading-relaxed mb-10">
            {t('contact.subtitle')}
          </p>

          <a
            href="mailto:contact@lightshowstud.io"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.03] transition-all duration-300"
          >
            <Mail size={20} />
            contact@lightshowstud.io
          </a>
        </motion.div>
      </div>
    </section>
  )
}
