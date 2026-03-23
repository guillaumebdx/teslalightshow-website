import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import imgTimeline1 from '@/assets/preview/timeline1.png'
import imgTimeline2 from '@/assets/preview/timeline2.png'
import imgTimeline3 from '@/assets/preview/timeline3.png'
import imgAI from '@/assets/preview/ai-generation.png'
import imgSettings from '@/assets/preview/settings.png'

const SCREENSHOT_SRCS = [imgTimeline1, imgTimeline2, imgTimeline3, imgAI, imgSettings]

function PhoneMockup({
  src,
  label,
  onClick,
}: {
  src: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group relative shrink-0 cursor-pointer focus:outline-none"
    >
      {/* Phone frame */}
      <div className="relative w-[220px] sm:w-[240px] lg:w-[260px] rounded-[2.5rem] border-[6px] border-white/10 bg-black p-1.5 shadow-2xl shadow-black/50 transition-transform duration-500 group-hover:scale-[1.03]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2rem]">
          <img
            src={src}
            alt={label}
            className="w-full h-auto block"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
        </div>
      </div>
      {/* Label */}
      <p className="mt-4 text-sm font-medium text-text-secondary text-center group-hover:text-text-primary transition-colors">
        {label}
      </p>
    </button>
  )
}

export default function Preview() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const { t } = useTranslation()
  const labels = t('preview.screenshots', { returnObjects: true }) as string[]
  const count = SCREENSHOT_SRCS.length

  const openLightbox = (index: number) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)
  const prev = () =>
    setLightbox((i) => (i !== null ? (i - 1 + count) % count : null))
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % count : null))

  return (
    <section id="preview" className="relative py-24 lg:py-32 bg-surface overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-light mb-4">
            {t('preview.label')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t('preview.titleStart')}
            <span className="bg-gradient-to-r from-primary-light via-accent to-accent-light bg-clip-text text-transparent">
              {t('preview.titleHighlight')}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary text-base lg:text-lg leading-relaxed">
            {t('preview.subtitle')}
          </p>
        </motion.div>

        {/* Screenshots — horizontal scroll on mobile, centered flex on desktop */}
        <div className="flex gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible lg:flex-wrap lg:justify-center pb-6 lg:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
          {SCREENSHOT_SRCS.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="snap-center"
            >
              <PhoneMockup
                src={src}
                label={labels[index]}
                onClick={() => openLightbox(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label={t('preview.closeAria')}
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 sm:left-6 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label={t('preview.prevAria')}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 sm:right-6 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label={t('preview.nextAria')}
            >
              <ChevronRight size={28} />
            </button>

            {/* Image in phone frame */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-[min(85vw,340px)] rounded-[2.5rem] border-[6px] border-white/15 bg-black p-1.5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src={SCREENSHOT_SRCS[lightbox]}
                  alt={labels[lightbox]}
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>

            {/* Label */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-white/70">
              {labels[lightbox]} — {lightbox + 1}/{count}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
