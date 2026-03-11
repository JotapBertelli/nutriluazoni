import { Heart, Sparkles, RefreshCw, Clock, TrendingUp, Shield } from 'lucide-react'

const differentials = [
  {
    icon: Heart,
    number: '01',
    title: 'Atendimento Humanizado',
    description:
      'Cada consulta é um espaço acolhedor onde você é ouvida com atenção e sem julgamentos.',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'Planos 100% Personalizados',
    description:
      'Nada de cardápios genéricos. Seu plano é desenvolvido do zero para a sua realidade.',
  },
  {
    icon: RefreshCw,
    number: '03',
    title: 'Acompanhamento Contínuo',
    description:
      'Estou ao seu lado em cada etapa, ajustando o plano conforme você evolui.',
  },
  {
    icon: Clock,
    number: '04',
    title: '+10 Anos de Experiência',
    description:
      'Bagagem clínica sólida para lidar com os mais variados casos e condições de saúde.',
  },
  {
    icon: TrendingUp,
    number: '05',
    title: 'Resultados Sustentáveis',
    description:
      'Sem efeito sanfona. Foco em mudanças de comportamento que duram para sempre.',
  },
  {
    icon: Shield,
    number: '06',
    title: 'Abordagem Científica',
    description:
      'Todas as recomendações têm base em evidências científicas atualizadas.',
  },
]

export default function DifferentialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
            Por que me escolher
          </span>
          <h2
            className="text-4xl font-bold text-green-900 mt-2 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Meus diferenciais no cuidado com você
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Mais do que um plano alimentar, ofereço uma parceria comprometida com sua saúde e bem-estar.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, i) => (
            <div key={i} className="relative group">
              <div className="flex gap-5">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-green-50 group-hover:bg-green-700 rounded-xl flex items-center justify-center transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-green-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <span className="text-green-200 text-xs font-bold tracking-widest">{item.number}</span>
                  <h3 className="text-green-900 font-semibold text-lg mb-2 mt-0.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
