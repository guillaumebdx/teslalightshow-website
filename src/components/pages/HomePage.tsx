'use client'

import { Hero, HowItWorks, Features, Preview, Contact, Download } from '@/components/sections'
import ChatWidget from '@/components/ChatWidget'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Preview />
      <Contact />
      <Download />
      <ChatWidget />
    </>
  )
}
