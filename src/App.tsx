import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { Hero, HowItWorks, Features, Preview, Contact, Download } from '@/components/sections'
import { BlogList, BlogArticle } from '@/components/blog'
import LocaleLayout from '@/components/LocaleLayout'
import SeoHead from '@/components/SeoHead'
import ChatWidget from '@/components/ChatWidget'
import { useTranslation } from 'react-i18next'
import { isLang } from '@/hooks/useLocale'

function HomePage() {
  return (
    <>
      <SeoHead />
      <Hero />
      <HowItWorks />
      <Features />
      <Preview />
      <Contact />
      <Download />
    </>
  )
}

function RootRedirect() {
  const { i18n } = useTranslation()
  const detected = i18n.language?.slice(0, 2)
  const target = detected && isLang(detected) ? detected : 'fr'
  return <Navigate to={`/${target}`} replace />
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang" element={<LocaleLayout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogArticle />} />
        </Route>
      </Routes>
      <ChatWidget />
    </Layout>
  )
}

export default App
