import { Stethoscope, RefreshCw, Dumbbell, LineChart, ClipboardList, BarChart2 } from 'lucide-react'

const services = [
  {
    icon: Stethoscope,
    title: 'Consulta Nutricional',
    description:
      'Avaliação completa do seu estado nutricional, hábitos alimentares e objetivos de saúde para um diagnóstico preciso.',
  },
  {
    icon: RefreshCw,
    title: 'Reeducação Alimentar',
    description:
      'Transforme sua relação com a comida de forma gradual e prazerosa, sem privações extremas ou dietas radicais.',
  },
  {
    icon: Dumbbell,
    title: 'Nutrição Esportiva',
    description:
      'Alimentação estratégica para potencializar seu desempenho, ganho de massa e recuperação muscular.',
  },
  {
    icon: LineChart,
    title: 'Acompanhamento Contínuo',
    description:
      'Retornos regulares para ajustar o plano alimentar conforme sua evolução e necessidades do momento.',
  },
  {
    icon: ClipboardList,
    title: 'Plano Alimentar Personalizado',
    description:
      'Cardápio elaborado exclusivamente para você, considerando seus gostos, rotina e metas de saúde.',
  },
  {
    icon: BarChart2,
    title: 'Avaliação Nutricional',
    description:
      'Análise detalhada da composição corporal, exames laboratoriais e indicadores de saúde metabólica.',
  },
]

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
            O que ofereço
          </span>
          <h2
            className="text-4xl font-bold text-green-900 mt-2 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Serviços personalizados para cada necessidade
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cada serviço é desenhado para atender às suas necessidades específicas, sempre com acompanhamento próximo e embasamento científico.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md border border-green-100/50 hover:border-green-200 transition-all group hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-green-50 group-hover:bg-green-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                <service.icon className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-green-900 font-semibold text-lg mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 bg-green-700 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-green-600 transition-all hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5"
          >
            Quero começar agora
          </a>
        </div>
      </div>
    </section>
  )
}
