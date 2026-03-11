'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (el) {
      setTimeout(() => el.classList.add('opacity-100'), 100)
    }
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&auto=format&fit=crop&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 via-green-800/70 to-green-700/40" />
      </div>

      {/* Content */}
      <div
        ref={heroRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-2xl">
          {/* Badge */}
          

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Nutrição com{' '}
            <span className="text-green-300">equilíbrio</span>,{' '}
            saúde e qualidade de vida
          </h1>

          <p className="text-green-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
            Atendimento personalizado e humanizado para transformar sua relação com a alimentação, de forma sustentável e saudável.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
           
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm hover:bg-white/25 border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-base transition-all"
            >
              Conheça meu trabalho
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { number: '10+', label: 'Anos de experiência' },
              { number: '500+', label: 'Pacientes atendidos' },
              { number: '98%', label: 'Satisfação dos pacientes' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white">{stat.number}</p>
                <p className="text-green-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors flex flex-col items-center gap-1"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Saiba mais</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  )
}
