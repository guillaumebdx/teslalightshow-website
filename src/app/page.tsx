'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isLang } from '@/i18n/dictionaries'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('i18nextLng')
    const nav = navigator.language?.slice(0, 2)
    const detected = stored || nav || ''
    const lang = isLang(detected) ? detected : 'fr'
    router.replace(`/${lang}`)
  }, [router])

  return null
}
