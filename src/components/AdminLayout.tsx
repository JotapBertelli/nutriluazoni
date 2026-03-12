'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf, LayoutDashboard, Plus, FileText, LogOut, Menu, X } from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
  activeItem?: 'dashboard' | 'novo-artigo' | 'editar'
  onLogout?: () => void
}

export default function AdminLayout({ children, activeItem = 'dashboard', onLogout }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/nutri-admin/dashboard', icon: LayoutDashboard },
    { id: 'novo-artigo', label: 'Novo Artigo', href: '/nutri-admin/dashboard/novo-artigo', icon: Plus },
    { id: 'ver-site', label: 'Ver Site', href: '/', icon: FileText, external: true },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-green-900 text-white flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-700 rounded-full flex items-center justify-center">
            <Leaf className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="font-semibold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Dra. Luazoni</p>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-green-800 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-50 w-60 bg-green-900 text-white flex flex-col
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-green-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Dra. Luazoni</p>
                <p className="text-green-400 text-xs">Painel Admin</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-green-800 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <p className="text-green-500 text-xs font-semibold uppercase tracking-wider mb-3 px-3">Menu</p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.id === activeItem || (item.id === 'novo-artigo' && activeItem === 'editar')
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-800 text-white'
                      : 'text-green-200 hover:bg-green-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {onLogout && (
          <div className="p-4 border-t border-green-800">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-3 py-2.5 text-green-300 hover:text-white hover:bg-green-800 rounded-lg text-sm font-medium transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="lg:ml-60 pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
