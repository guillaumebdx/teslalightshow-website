import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { Hero, HowItWorks, Features, Preview, Contact, Download } from '@/components/sections'
import { BlogList, BlogArticle } from '@/components/blog'
import SeoHead from '@/components/SeoHead'
import ChatWidget from '@/components/ChatWidget'

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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
      </Routes>
      <ChatWidget />
    </Layout>
  )
}

export default App
