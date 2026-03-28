import { Layout } from '@/components/layout'
import { Hero, Features, Preview, Contact, Download } from '@/components/sections'
import SeoHead from '@/components/SeoHead'
import ChatWidget from '@/components/ChatWidget'

function App() {
  return (
    <Layout>
      <SeoHead />
      <Hero />
      <Features />
      <Preview />
      <Contact />
      <Download />
      <ChatWidget />
    </Layout>
  )
}

export default App
