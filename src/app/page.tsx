import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import DifferentialsSection from '@/components/DifferentialsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BlogPreviewSection from '@/components/BlogPreviewSection'
import CTASection from '@/components/CTASection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <DifferentialsSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
