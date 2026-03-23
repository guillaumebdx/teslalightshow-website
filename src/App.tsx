import { Layout } from '@/components/layout'
import { Hero, Features, Preview, Contact, Download } from '@/components/sections'
import SeoHead from '@/components/SeoHead'

function App() {
  return (
    <Layout>
      <SeoHead />
      <Hero />
      <Features />
      <Preview />
      <Contact />
      <Download />
    </Layout>
  )
}

export default App
