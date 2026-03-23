import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Car, Music, Sparkles, Bot, FolderOpen, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ICONS = [
  <Car size={24} />,
  <Music size={24} />,
  <Sparkles size={24} />,
  <Bot size={24} />,
  <FolderOpen size={24} />,
  <Share2 size={24} />,
]

const GRADIENTS = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-400',
  'from-amber-500 to-orange-400',
  'from-emerald-500 to-teal-400',
  'from-rose-500 to-red-400',
  'from-indigo-500 to-violet-400',
]

function FeatureCard({ groupIndex, index }: { groupIndex: number; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const gradient = GRADIENTS[groupIndex]
  const icon = ICONS[groupIndex]
  const title = t(`features.groups.${groupIndex}.title`)
  const description = t(`features.groups.${groupIndex}.description`)
  const subFeatures = t(`features.groups.${groupIndex}.subFeatures`, { returnObjects: true }) as string[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-border-light bg-surface-card/50 backdrop-blur-sm p-6 lg:p-8 hover:border-border-light/50 hover:bg-surface-card/80 transition-all duration-300"
    >
      {/* Gradient glow on hover */}
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 -z-10 blur-sm`}
      />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white mb-4`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {description}
      </p>

      {/* Expand toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-light hover:text-primary transition-colors"
      >
        {isOpen ? t('features.showLess') : t('features.showMore')}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      {/* Sub-features */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden mt-4 space-y-2"
          >
            {subFeatures.map((sub, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${gradient}`}
                />
                {sub}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Features() {
  const { t } = useTranslation()
  const groups = t('features.groups', { returnObjects: true }) as Array<{ title: string }>

  return (
    <section id="features" className="relative py-24 lg:py-32 bg-surface">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
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
            {t('features.label')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t('features.titleStart')}
            <span className="bg-gradient-to-r from-primary-light via-accent to-accent-light bg-clip-text text-transparent">
              {t('features.titleHighlight')}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary text-base lg:text-lg leading-relaxed">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {groups.map((_, index) => (
            <FeatureCard key={index} groupIndex={index} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
