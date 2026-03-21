import logo from '@/assets/logo_transparent.png'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-light">
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
            <a href="#features" className="hover:text-text-primary transition-colors">Fonctionnalités</a>
            <a href="#preview" className="hover:text-text-primary transition-colors">Aperçu</a>
            <a href="#contact" className="hover:text-text-primary transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} LightShow Studio &middot; Conçu et développé par Guillaume Harari
          </p>
        </div>
      </div>
    </footer>
  )
}
