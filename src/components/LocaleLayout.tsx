import { useEffect } from 'react'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isLang } from '@/hooks/useLocale'

export default function LocaleLayout() {
  const { lang } = useParams<{ lang: string }>()
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!lang || !isLang(lang)) {
      const detected = i18n.language?.slice(0, 2)
      const target = detected && isLang(detected) ? detected : 'fr'
      navigate(`/${target}`, { replace: true })
      return
    }

    if (!i18n.language.startsWith(lang)) {
      i18n.changeLanguage(lang)
    }
    document.documentElement.lang = lang
  }, [lang, i18n, navigate])

  if (!lang || !isLang(lang)) return null

  return <Outlet />
}
