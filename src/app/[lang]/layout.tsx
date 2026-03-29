import { SUPPORTED_LANGS, isLang } from '@/i18n/dictionaries'
import { I18nProvider } from '@/components/I18nProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = isLang(lang) ? lang : 'fr'

  return (
    <I18nProvider lang={locale}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </I18nProvider>
  )
}
