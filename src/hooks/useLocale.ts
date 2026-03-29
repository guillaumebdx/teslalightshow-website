import { useLocation } from 'react-router-dom'

export const SUPPORTED_LANGS = ['fr', 'en', 'de', 'es'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]

export function isLang(v: string): v is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(v)
}

/**
 * Returns the current locale from the URL /:lang prefix
 * and a helper to build locale-prefixed paths.
 * Reads lang directly from pathname so it works anywhere in the tree.
 */
export function useLocale() {
  const location = useLocation()
  const seg = location.pathname.split('/')[1] ?? ''
  const currentLang: Lang = isLang(seg) ? seg : 'fr'

  /** Build a path with the current locale prefix */
  function localePath(path: string) {
    if (path.startsWith('#')) return path
    if (path.startsWith('/#')) return `/${currentLang}${path.slice(1)}`
    if (path.startsWith('/')) return `/${currentLang}${path}`
    return `/${currentLang}/${path}`
  }

  /** Replace only the lang segment, keeping the rest of the path */
  function switchLangPath(newLang: string) {
    const rest = location.pathname.replace(/^\/[a-z]{2}/, '')
    return `/${newLang}${rest || ''}`
  }

  const isHome = location.pathname === `/${currentLang}` || location.pathname === `/${currentLang}/`

  return { lang: currentLang, localePath, switchLangPath, isHome }
}
