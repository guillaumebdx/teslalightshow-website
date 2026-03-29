'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocale, SUPPORTED_LANGS } from '@/hooks/useLocale'
import logo from '@/assets/logo_transparent.png'

const LANGS = SUPPORTED_LANGS.map((code) => ({
  code,
  label: code.toUpperCase(),
}))

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()
  const { lang, localePath, switchLangPath, isHome } = useLocale()

  const navLinks = [
    ...(isHome
      ? [
          { label: t('nav.features'), href: '#features' },
          { label: t('nav.preview'), href: '#preview' },
          { label: t('nav.contact'), href: '#contact' },
        ]
      : []),
    { label: t('nav.blog'), href: localePath('/blog') },
  ]

  const switchLang = (code: string) => {
    setLangOpen(false)
    router.push(switchLangPath(code))
  }

  const currentLang = lang.toUpperCase()

  return (
    <nav aria-label={t('nav.aria')} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-surface/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href={localePath('/')} className="flex items-center gap-2 group">
            <img src={logo.src ?? logo} alt="LightShow Studio" className="h-8 w-auto" />
            <span className="font-display text-lg font-semibold text-text-primary tracking-tight">
              LightShow Studio
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ),
            )}

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                aria-label="Language"
              >
                <Globe size={16} />
                {currentLang}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-20 rounded-xl border border-border bg-surface-card/95 backdrop-blur-xl shadow-xl overflow-hidden"
                  >
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => switchLang(l.code)}
                        className={`block w-full px-4 py-2 text-sm text-left transition-colors ${
                          l.code === lang
                            ? 'text-primary-light bg-primary/10'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href={isHome ? '#download' : localePath('/#download')}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-light transition-colors duration-200"
            >
              {t('nav.download')}
            </a>
          </div>

          {/* Mobile: lang + menu */}
          <div className="flex md:hidden items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Language"
              >
                <Globe size={20} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-20 rounded-xl border border-border bg-surface-card/95 backdrop-blur-xl shadow-xl overflow-hidden z-[60]"
                  >
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => switchLang(l.code)}
                        className={`block w-full px-4 py-2 text-sm text-left transition-colors ${
                          l.code === lang
                            ? 'text-primary-light bg-primary/10'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-surface/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base text-text-secondary hover:text-text-primary transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base text-text-secondary hover:text-text-primary transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ),
              )}
              <a
                href={isHome ? '#download' : localePath('/#download')}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary-light transition-colors mt-2"
              >
                {t('nav.download')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
