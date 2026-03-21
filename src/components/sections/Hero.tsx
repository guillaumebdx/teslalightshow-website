import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import ModelViewer from '@/components/three/ModelViewer'

export default function Hero() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <section className="relative min-h-screen bg-surface">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/50 to-surface z-10" />
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-surface to-accent/20" />
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      {/* Layout: full-width wrapper, no padding constraint on 3D */}
      <div className="relative z-10 min-h-screen lg:h-screen flex flex-col lg:flex-row lg:items-center">

        {/* Text — padded, constrained width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center lg:text-left px-6 sm:px-8 lg:px-12 xl:px-16 pt-20 pb-2 lg:pt-0 lg:pb-0 lg:w-[45%] lg:shrink-0 shrink-0"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border-light bg-surface-card/50 backdrop-blur-sm px-4 py-1.5 mb-5 lg:mb-8">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-text-secondary">
              Accès anticipé
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-4 lg:mb-6">
            <span className="text-text-primary">Créez des </span>
            <span className="bg-gradient-to-r from-primary-light via-accent to-accent-light bg-clip-text text-transparent">
              light shows
            </span>
            <br />
            <span className="text-text-primary">spectaculaires</span>
          </h1>

          {/* Subtitle — desktop only */}
          <p className="hidden lg:block max-w-lg text-lg text-text-secondary leading-relaxed mb-10">
            L'outil professionnel pour concevoir, synchroniser et piloter vos
            spectacles lumineux. Simple. Puissant. Intuitif.
          </p>

          {/* CTA */}
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={() => setShowDemo(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-border-light bg-surface-card/50 backdrop-blur-sm px-6 py-3 lg:px-7 lg:py-3.5 text-sm font-semibold text-text-primary hover:bg-surface-elevated transition-all duration-300"
            >
              <Play size={18} className="text-primary-light" />
              Voir la démo
            </button>
          </div>
        </motion.div>

        {/* 3D Model — NO padding, NO max-width, fills remaining space */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="h-[50vh] lg:flex-1 lg:min-h-0 lg:h-screen"
        >
          <ModelViewer />
        </motion.div>
      </div>

      {/* Scroll indicator — outside layout, always bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="h-10 w-6 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-text-muted/50"
          />
        </div>
      </motion.div>

      {/* Video demo modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-[min(90vw,360px)] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
              <iframe
                src="https://www.youtube.com/embed/KZTCjDbuN3A?autoplay=1&mute=1&loop=1&playlist=KZTCjDbuN3A&controls=1&rel=0"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Démo LightShow Studio"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
