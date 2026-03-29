import fr from './locales/fr.json'
import en from './locales/en.json'
import de from './locales/de.json'
import es from './locales/es.json'

const dictionaries: Record<string, Record<string, unknown>> = { fr, en, de, es }

export const SUPPORTED_LANGS = ['fr', 'en', 'de', 'es'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]

export function isLang(v: string): v is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(v)
}

export function getDictionary(lang: string): Record<string, unknown> {
  const key = lang.slice(0, 2)
  return dictionaries[key] ?? dictionaries.fr
}

/** Utility to read a nested key like 'meta.title' from a dictionary */
export function t(dict: Record<string, unknown>, key: string): string {
  const parts = key.split('.')
  let current: unknown = dict
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return key
    }
  }
  return typeof current === 'string' ? current : key
}
