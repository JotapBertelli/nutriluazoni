'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  PenSquare, Trash2, Eye, EyeOff, Plus,
  FileText, Calendar, AlertCircle
} from 'lucide-react'
import { Post } from '@/types'
import AdminLayout from '@/components/AdminLayout'

export default function AdminDashboard() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    setLoading(true)
    try {
      const res = await fetch('/api/posts/all')
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/nutri-admin')
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setPosts(posts.map(p => p.id === id ? { ...p, published: !p.published } : p))
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !currentStatus }),
    })
  }

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      setPosts(posts.filter(p => p.id !== id))
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  const published = posts.filter(p => p.published).length
  const drafts = posts.filter(p => !p.published).length

  return (
    <AdminLayout activeItem="dashboard" onLogout={handleLogout}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Meus Artigos</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os conteúdos do blog</p>
        </div>
        <Link
          href="/nutri-admin/dashboard/novo-artigo"
          className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-green-200 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Novo Artigo
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              <p className="text-gray-500 text-xs">Total de artigos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{published}</p>
              <p className="text-gray-500 text-xs">Publicados</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{drafts}</p>
              <p className="text-gray-500 text-xs">Rascunhos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Todos os artigos</h2>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Carregando artigos...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center px-4">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-1">Nenhum artigo criado ainda</p>
            <p className="text-gray-400 text-sm mb-4">Crie seu primeiro artigo para ele aparecer no blog!</p>
            <Link
              href="/nutri-admin/dashboard/novo-artigo"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Criar primeiro artigo
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((post) => (
              <div key={post.id} className="p-4 sm:p-5 hover:bg-gray-50 transition-colors">
                {/* Desktop layout */}
                <div className="hidden sm:flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    {post.image_url && (
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{post.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {post.category && (
                        <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{post.category}</span>
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                      post.published ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {post.published ? '● Publicado' : '○ Rascunho'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleTogglePublish(post.id, post.published)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title={post.published ? 'Despublicar' : 'Publicar'}
                    >
                      {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <Link
                      href={`/nutri-admin/dashboard/editar/${post.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <PenSquare className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="sm:hidden">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      {post.image_url && (
                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">{post.title}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {post.category && (
                          <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{post.category}</span>
                        )}
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                          post.published ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {post.published ? '● Pub' : '○ Rasc'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(post.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3 ml-[4.25rem]">
                    <button
                      onClick={() => handleTogglePublish(post.id, post.published)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <Link
                      href={`/nutri-admin/dashboard/editar/${post.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <PenSquare className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Excluir artigo?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              Esta ação não pode ser desfeita. O artigo será permanentemente removido.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-colors text-sm disabled:opacity-50"
              >
                {deleting ? 'Excluindo...' : 'Sim, excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
