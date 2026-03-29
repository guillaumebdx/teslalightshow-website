'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function HowItWorks() {
  const { t } = useTranslation()
  const blocks = t('howItWorks.blocks', { returnObjects: true }) as Array<{
    heading: string
    text: string
  }>

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 bg-surface">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-18"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-light mb-4">
            {t('howItWorks.label')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
            {t('howItWorks.title')}
          </h2>
        </motion.div>

        {/* Text blocks */}
        <div className="space-y-10 lg:space-y-14">
          {blocks.map((block, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-text-primary mb-3">
                {block.heading}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed">
                {block.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
