import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Ana Paula M.',
    result: 'Perdeu 18kg em 6 meses',
    text: 'A Dra. Luazoni mudou completamente minha relação com a comida. Nunca me senti privada, e os resultados foram incríveis! Finalmente entendi que alimentação saudável pode ser prazerosa.',
    avatar: 'AP',
    color: 'bg-green-100 text-green-700',
  },
  {
    name: 'Carlos Henrique',
    result: 'Melhorou performance no esporte',
    text: 'Pratico musculação há anos, mas foi com a Dra. Luazoni que entendi a importância da nutrição para resultados. Ganhei massa, aumentei minha performance e me sinto muito melhor.',
    avatar: 'CH',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Mariana S.',
    result: 'Controlou diabetes tipo 2',
    text: 'Graças ao acompanhamento da Dra. Luazoni, consegui controlar minha glicemia sem precisar de medicamentos. O plano alimentar foi adaptado ao meu gosto e funcionou de verdade.',
    avatar: 'MS',
    color: 'bg-teal-100 text-teal-700',
  },
  {
    name: 'Roberto F.',
    result: 'Reduziu colesterol',
    text: 'Em apenas 3 meses de acompanhamento, meu colesterol voltou ao nível normal. A dra. é super atenciosa, explica tudo e o plano alimentar é completamente adaptado à minha rotina.',
    avatar: 'RF',
    color: 'bg-green-100 text-green-700',
  },
  {
    name: 'Juliana C.',
    result: 'Gravidez saudável',
    text: 'Fiz acompanhamento nutricional durante toda a gestação. A Dra. Luazoni foi fundamental para garantir minha saúde e do meu bebê. Super recomendo para gestantes!',
    avatar: 'JC',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Fernanda L.',
    result: 'Superou compulsão alimentar',
    text: 'Com uma abordagem acolhedora e sem julgamentos, a Dra. me ajudou a superar a compulsão alimentar. Hoje tenho uma relação muito mais leve e consciente com a comida.',
    avatar: 'FL',
    color: 'bg-teal-100 text-teal-700',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
            Depoimentos
          </span>
          <h2
            className="text-4xl font-bold text-green-900 mt-2 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            O que meus pacientes dizem
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Histórias reais de transformação através da nutrição personalizada e humanizada.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 shadow-sm border border-green-100/50 hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-5">
                <Quote className="w-8 h-8 text-green-100 absolute -top-1 -left-1" />
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-sm font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-green-900 text-sm">{t.name}</p>
                  <p className="text-green-600 text-xs">{t.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
