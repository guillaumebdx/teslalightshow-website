import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Car, Music, Sparkles, Bot, FolderOpen, Share2 } from 'lucide-react'

interface SubFeature {
  text: string
}

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  subFeatures: SubFeature[]
}

const features: Feature[] = [
  {
    icon: <Car size={24} />,
    title: 'Création de Light Show',
    description:
      'Contrôlez individuellement 21 éléments : phares, clignotants, vitres, rétroviseurs, coffre et trappe de charge. Directement sur un modèle 3D interactif.',
    gradient: 'from-blue-500 to-cyan-400',
    subFeatures: [
      { text: 'Modèle 3D fidèle avec rotation tactile, zoom et sélection par tap' },
      { text: 'Phares, clignotants, répétiteurs, feux stop, antibrouillard et plaque' },
      { text: 'Vitres animées (window dance), rétroviseurs pliables, coffre et trappe de charge' },
      { text: 'Trappe de charge avec LED arc-en-ciel (rainbow)' },
      { text: 'Couleurs dédiées et indicateurs visuels par pièce' },
      { text: 'Retour haptique lors du placement et de la sélection' },
      { text: 'Model 3/Y disponible — Model S et SUV à venir' },
    ],
  },
  {
    icon: <Music size={24} />,
    title: 'Audio & Timeline',
    description:
      'Importez votre musique ou piochez dans la bibliothèque intégrée. Placez et ajustez vos événements sur une timeline synchronisée à la waveform.',
    gradient: 'from-purple-500 to-pink-400',
    subFeatures: [
      { text: 'Bibliothèque de musiques intégrées avec waveform pré-calculée' },
      { text: 'Import MP3 depuis le téléphone (max 5 min) avec analyse audio automatique' },
      { text: 'Timeline visuelle avec code couleur par type de pièce' },
      { text: "Placement par tap, drag & drop avec appui long, suppression d\u2019événements" },
      { text: 'Lecture synchronisée audio + animation 3D temps réel' },
      { text: 'Vitesse de lecture variable : 0.5x à 2x' },
      { text: 'Zoom vertical ajustable (100% à 200%)' },
    ],
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Effets & Options',
    description:
      'Personnalisez chaque événement : effet solid ou blink, intensité, fondus, durée et modes spéciaux pour coffre, vitres, rétros et trappe.',
    gradient: 'from-amber-500 to-orange-400',
    subFeatures: [
      { text: 'Effet Solid (continu) et Blink (clignotement) (3 vitesses : 1x, 2x, 3x)' },
      { text: 'Puissance ajustable de 0 à 100%' },
      { text: 'Ease In / Ease Out : fondus progressifs' },
      { text: 'Durée personnalisable en secondes' },
      { text: 'Rétros : fermer, ouvrir, aller-retour' },
      { text: 'Vitres : window dance (oscillation)' },
      { text: 'Coffre : ouvrir (13s), fermer (4s), dance (5s)' },
      { text: 'Trappe de charge : ouvrir, fermer, rainbow LED' },
      { text: 'Compteur de commandes respectant les limites hardware du véhicule' },
    ],
  },
  {
    icon: <Bot size={24} />,
    title: 'Génération par IA',
    description:
      "L\u2019IA analyse votre musique et génère un light show complet synchronisé. Décrivez le style souhaité ou choisissez un preset.",
    gradient: 'from-emerald-500 to-teal-400',
    subFeatures: [
      { text: "Génération automatique complète synchronisée à l\u2019audio" },
      { text: 'Prompt personnalisé (max 500 caractères) pour décrire votre vision' },
      { text: "Presets : Feux d\u2019artifice, Vague, Fête, Spooky, Romantique, Agressif" },
      { text: 'Animation de progression sur le modèle 3D pendant la génération' },
      { text: 'Confirmation avant remplacement des événements existants' },
    ],
  },
  {
    icon: <FolderOpen size={24} />,
    title: 'Gestion de projets',
    description:
      "Sauvegarde automatique, duplication, Annuler/refaire jusqu\u2019à 50 niveaux.",
    gradient: 'from-rose-500 to-red-400',
    subFeatures: [
      { text: 'Auto-save toutes les 1.5 secondes' },
      { text: 'Liste de projets avec nom, musique, événements et date' },
      { text: 'Dupliquer, supprimer et renommer vos shows' },
      { text: "Undo / Redo — historique jusqu\u2019à 50 niveaux" },
      { text: 'Tutoriel interactif au premier lancement (5 étapes, skippable)' },
    ],
  },
  {
    icon: <Share2 size={24} />,
    title: 'Export & Partage',
    description:
      'Exportez en .fseq (natif Tesla), partagez vos créations avec la communauté et suivez le tutoriel intégré pour tout transférer sur votre véhicule.',
    gradient: 'from-indigo-500 to-violet-400',
    subFeatures: [
      { text: 'Export .fseq — format natif Tesla compatible' },
      { text: "Tutoriel d\u2019export guidé pas à pas en 4 étapes" },
      { text: 'Export MP3 du fichier audio associé' },
      { text: 'Partage communautaire via JSON (lightstudio_v1)' },
      { text: "Import de shows partagés par d\u2019autres utilisateurs" },
      { text: '6 couleurs de carrosserie, mode lumineux, offset curseur' },
      { text: '4 langues : Français, English, Español, Deutsch' },
    ],
  },
]

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

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
        className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 -z-10 blur-sm`}
      />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4`}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {feature.description}
      </p>

      {/* Expand toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-light hover:text-primary transition-colors"
      >
        {isOpen ? 'Masquer les détails' : 'En savoir plus'}
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
            {feature.subFeatures.map((sub, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${feature.gradient}`}
                />
                {sub.text}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Features() {
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
            Fonctionnalités
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Tout ce qu'il faut pour créer{' '}
            <span className="bg-gradient-to-r from-primary-light via-accent to-accent-light bg-clip-text text-transparent">
              le show parfait
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary text-base lg:text-lg leading-relaxed">
            De la modélisation 3D à l'export Tesla, en passant par la génération IA :
            chaque détail a été pensé pour une expérience fluide et intuitive.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
