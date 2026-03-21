import { motion } from 'framer-motion'

import appStoreBadge from '@/assets/preview/appstore.png'
import playStoreBadge from '@/assets/preview/playstore.png'

export default function Download() {
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
            Téléchargement
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Prêt à créer{' '}
            <span className="bg-gradient-to-r from-primary-light via-accent to-accent-light bg-clip-text text-transparent">
              votre show ?
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-text-secondary text-base lg:text-lg leading-relaxed mb-12">
            Téléchargez LightShow Studio gratuitement et commencez à créer des spectacles lumineux pour votre Tesla.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hover:scale-[1.05] transition-transform duration-300"
              aria-label="Télécharger sur l'App Store (bientôt disponible)"
            >
              <img
                src={appStoreBadge}
                alt="Télécharger sur l'App Store — Coming Soon"
                className="h-16 sm:h-[72px] w-auto"
              />
            </motion.a>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hover:scale-[1.05] transition-transform duration-300"
              aria-label="Disponible sur Google Play (bientôt disponible)"
            >
              <img
                src={playStoreBadge}
                alt="Disponible sur Google Play — Coming Soon"
                className="h-16 sm:h-[72px] w-auto"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
