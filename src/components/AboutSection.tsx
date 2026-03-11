import { GraduationCap, Award, Heart, Users } from 'lucide-react'

const credentials = [
  { icon: GraduationCap, text: 'Graduada em Nutrição pela USP' },
  { icon: Award, text: 'Especialização em Nutrição Esportiva' },
  { icon: Award, text: 'Pós-graduação em Nutrição Clínica Funcional' },
  { icon: Heart, text: 'Formação em Comportamento Alimentar' },
]

export default function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&auto=format&fit=crop&q=80"
                alt="Dra. Luazoni - Nutricionista"
                className="w-full h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-5 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">500+</p>
                  <p className="text-xs text-gray-500">pacientes</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-tight">transformados com nutrição personalizada</p>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-100 rounded-full opacity-60 -z-10" />
            <div className="absolute -bottom-8 left-8 w-16 h-16 bg-green-200 rounded-full opacity-40 -z-10" />
          </div>

          {/* Text Side */}
          <div>
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
              Sobre mim
            </span>
            <h2
              className="text-4xl font-bold text-green-900 mt-2 mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Uma nutricionista que cuida de você com ciência e empatia
            </h2>

            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Sou a Dra. Luazoni, nutricionista apaixonada por transformar vidas por meio da alimentação consciente. Com mais de 10 anos de experiência clínica, acredito que cada paciente é único e merece um cuidado totalmente personalizado.
            </p>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Minha abordagem combina embasamento científico com escuta ativa e empatia. Não acredito em dietas restritivas ou soluções rápidas — meu objetivo é ajudar você a construir uma relação saudável, prazerosa e sustentável com a comida.
            </p>

            {/* Credentials */}
            <div className="space-y-3 mb-8">
              {credentials.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-green-700" />
                  </div>
                  <p className="text-gray-700 text-sm">{item.text}</p>
                </div>
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </section>
  )
}
