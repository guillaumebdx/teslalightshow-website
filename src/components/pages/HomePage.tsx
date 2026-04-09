'use client'

import { Hero, HowItWorks, Features, Preview, Contact, Download, DownloadCTA } from '@/components/sections'
import ChatWidget from '@/components/ChatWidget'

export default function HomePage() {
  return (
    <>
      <Hero />
      <DownloadCTA />
      <HowItWorks />
      <DownloadCTA />
      <Features />
      <DownloadCTA />
      <Preview />
      <DownloadCTA />
      <Contact />
      <Download />
      <ChatWidget />
    </>
  )
}
