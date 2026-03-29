import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Facebook } from 'lucide-react'
import { useLocale } from '@/hooks/useLocale'
import logo from '@/assets/logo_transparent.png'

export default function Footer() {
  const { t } = useTranslation()
  const { localePath } = useLocale()

  return (
    <footer aria-label={t('footer.aria')} className="border-t border-border bg-surface-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="LightShow Studio" className="h-7 w-auto" />
            <span className="font-display text-base font-semibold text-text-primary tracking-tight">
              LightShow Studio
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <a href={localePath('/#features')} className="hover:text-text-primary transition-colors">{t('nav.features')}</a>
            <a href={localePath('/#preview')} className="hover:text-text-primary transition-colors">{t('nav.preview')}</a>
            <a href={localePath('/#contact')} className="hover:text-text-primary transition-colors">{t('nav.contact')}</a>
            <Link to={localePath('/blog')} className="hover:text-text-primary transition-colors">{t('nav.blog')}</Link>
          </div>

          {/* Social + Copyright */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/lightshowstudio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-text-muted hover:text-primary-light transition-colors"
            >
              <Facebook size={18} />
            </a>
            <p className="text-sm text-text-muted">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
