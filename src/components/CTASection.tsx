import { Calendar, MessageCircle } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 bg-green-700 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-600 rounded-full opacity-30 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-800 rounded-full opacity-30 -translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-600 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-green-600 text-green-100 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
          Comece sua transformação
        </span>

        <h2
          className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Comece hoje sua jornada para uma vida mais saudável
        </h2>

        <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Dê o primeiro passo. Agende sua consulta e descubra como a nutrição personalizada pode transformar sua saúde, energia e qualidade de vida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <a
            href="https://wa.me/5518997296343"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 border-2 border-green-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5" />
            Fale pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
