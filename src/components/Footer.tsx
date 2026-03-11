import Link from 'next/link'
import { Phone, MapPin, Instagram, Facebook, Leaf, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Dra. Luazoni
                </p>
                <p className="text-green-300 text-xs">Nutricionista</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Nutrição com equilíbrio, saúde e qualidade de vida. Atendimento humanizado e resultados sustentáveis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {[
                { href: '#inicio', label: 'Início' },
                { href: '#sobre', label: 'Sobre mim' },
                { href: '#servicos', label: 'Serviços' },
                { href: '/blog', label: 'Blog' },
                { href: '#depoimentos', label: 'Depoimentos' },
                { href: '#contato', label: 'Contato' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <a href="tel:+5518997296343" className="text-green-200 hover:text-white text-sm transition-colors">
                (18) 99729-6343
                </a>
              </li>
              
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span className="text-green-200 text-sm">
                  Rua São José, 57<br />
                  Penápolis — SP
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Redes Sociais
            </h3>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5518997296343"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <p className="text-green-300 text-xs mt-6">
              Siga para dicas diárias de nutrição e saúde!
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-green-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-green-400 text-xs">
            © {new Date().getFullYear()} Dra. Luazoni Nutricionista. Todos os direitos reservados.
          </p>
          <p className="text-green-500 text-xs">
            CRN-3: 23.338 | Nutricionista registrada
          </p>
        </div>
      </div>
    </footer>
  )
}
