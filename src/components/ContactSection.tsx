'use client'

import { useState } from 'react'
import { Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui poderia enviar para uma API ou e-mail
    setSent(true)
    setForm({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contato" className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
            Contato
          </span>
          <h2
            className="text-4xl font-bold text-green-900 mt-2 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Vamos começar sua jornada?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Entre em contato para agendar sua consulta ou tirar dúvidas. Estou aqui para te ajudar!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-green-100">
              <h3 className="font-semibold text-green-900 text-lg mb-5">Informações de contato</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Telefone</p>
                    <a href="tel:+5511999999999" className="text-green-900 hover:text-green-700 font-medium transition-colors">
                      (11) 99999-9999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">WhatsApp</p>
                    <a
                      href="https://wa.me/5511999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-900 hover:text-green-700 font-medium transition-colors"
                    >
                      Clique para conversar
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Endereço</p>
                    <p className="text-green-900 font-medium">
                      Rua das Flores, 123 — Sala 45<br />
                      São Paulo — SP, CEP 01234-567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Horários</p>
                    <p className="text-green-900 font-medium">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white w-full py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-green-200"
            >
              <MessageCircle className="w-5 h-5" />
              Agendar pelo WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100">
              <h3 className="font-semibold text-green-900 text-lg mb-6">Envie uma mensagem</h3>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-green-900 font-semibold text-lg mb-2">Mensagem enviada!</h4>
                  <p className="text-gray-500">Entrarei em contato em breve. Obrigada!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome completo *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-gray-900 transition-colors text-sm"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-gray-900 transition-colors text-sm"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-gray-900 transition-colors text-sm"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensagem *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-gray-900 transition-colors resize-none text-sm"
                      placeholder="Conte um pouco sobre seus objetivos ou dúvidas..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-green-200"
                  >
                    <Send className="w-4 h-4" />
                    Enviar mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
