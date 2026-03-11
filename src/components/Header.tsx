'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Leaf } from 'lucide-react'

const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '/blog', label: 'Blog' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function resolveHref(href: string) {
    if (href.startsWith('/')) return href
    return isHome ? href : `/${href}`
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-green-700 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-green-900 text-sm leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Dra. Luazoni
              </p>
              <p className="text-green-600 text-xs font-medium tracking-wide">Nutricionista</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                className="text-gray-600 hover:text-green-700 text-sm font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          
          

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-green-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col gap-3 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  className="text-gray-600 hover:text-green-700 font-medium py-1 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={resolveHref('#contato')}
                className="mt-2 bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center hover:bg-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Agendar Consulta
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
