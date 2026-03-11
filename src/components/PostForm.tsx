'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, ImageIcon, Tag, FileText, CheckCircle } from 'lucide-react'
import { Post } from '@/types'

interface PostFormProps {
  initialData?: Partial<Post>
  postId?: string
}

const categories = ['Alimentação', 'Nutrição', 'Dicas', 'Receitas', 'Saúde', 'Esporte', 'Comportamento']

export default function PostForm({ initialData, postId }: PostFormProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initialData?.title || '',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    image_url: initialData?.image_url || '',
    category: initialData?.category || '',
    published: initialData?.published ?? true,
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(postId ? `/api/posts/${postId}` : '/api/posts', {
        method: postId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Erro ao salvar artigo.')
        return
      }

      setSaved(true)
      setTimeout(() => {
        router.push('/nutri-admin/dashboard')
      }, 1500)
    } catch {
      setError('Erro ao conectar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const renderPreview = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-green-900 mb-4">{line.slice(2)}</h1>
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-green-900 mt-6 mb-3">{line.slice(3)}</h2>
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-semibold text-green-800 mt-4 mb-2">{line.slice(4)}</h3>
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold text-gray-800 mb-2">{line.slice(2, -2)}</p>
      if (line.trim() === '') return <br key={i} />
      return <p key={i} className="text-gray-700 leading-relaxed mb-3">{line}</p>
    })
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Artigo salvo com sucesso!</h2>
        <p className="text-gray-500">Redirecionando para o dashboard...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/nutri-admin/dashboard"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {postId ? 'Editar Artigo' : 'Novo Artigo'}
            </h1>
            <p className="text-gray-500 text-sm">Preencha os campos para {postId ? 'atualizar' : 'publicar'} o artigo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tab Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'edit' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Editar
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'preview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Prévia
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {activeTab === 'preview' ? (
        /* Preview Tab */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {form.image_url && (
            <div className="h-64 rounded-xl overflow-hidden mb-6">
              <img src={form.image_url} alt={form.title} className="w-full h-full object-cover" />
            </div>
          )}
          {form.category && (
            <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3 font-medium">
              {form.category}
            </span>
          )}
          <h1 className="text-3xl font-bold text-green-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            {form.title || 'Título do artigo'}
          </h1>
          {form.summary && (
            <p className="text-green-800 font-medium border-l-4 border-green-500 pl-4 mb-6 leading-relaxed">
              {form.summary}
            </p>
          )}
          <div className="prose max-w-none">
            {renderPreview(form.content || 'O conteúdo do artigo aparecerá aqui...')}
          </div>
        </div>
      ) : (
        /* Edit Tab */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                Título do artigo *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-gray-900 font-medium text-lg transition-colors"
                placeholder="Ex: 5 Alimentos que Transformam sua Saúde"
              />
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Resumo *</label>
              <textarea
                required
                rows={3}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-gray-900 resize-none transition-colors text-sm"
                placeholder="Uma breve descrição do artigo que aparecerá nos cards..."
              />
              <p className="text-gray-400 text-xs mt-1">{form.summary.length}/300 caracteres</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Conteúdo completo *
              </label>
              <div className="mb-2 flex flex-wrap gap-1">
                {['## Título', '**Negrito**', '### Subtítulo'].map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    onClick={() => setForm({ ...form, content: form.content + '\n' + hint })}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded transition-colors"
                  >
                    {hint}
                  </button>
                ))}
                <span className="text-xs text-gray-400 ml-1 self-center">Use ## para título, **texto** para negrito</span>
              </div>
              <textarea
                required
                rows={20}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-gray-900 resize-none font-mono text-sm transition-colors"
                placeholder="## Introdução&#10;&#10;Escreva o conteúdo completo do artigo aqui...&#10;&#10;## Seção 1&#10;&#10;Conteúdo da seção..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Publish Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Publicação</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={form.published}
                    onChange={() => setForm({ ...form, published: true })}
                    className="w-4 h-4 text-green-600"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Publicar agora</p>
                    <p className="text-xs text-gray-500">Visível para todos os visitantes</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={!form.published}
                    onChange={() => setForm({ ...form, published: false })}
                    className="w-4 h-4 text-green-600"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Salvar como rascunho</p>
                    <p className="text-xs text-gray-500">Não aparece no blog ainda</p>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 disabled:bg-green-300 text-white py-3 rounded-xl font-semibold transition-all text-sm"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {postId ? 'Atualizar artigo' : 'Publicar artigo'}
                  </>
                )}
              </button>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-600" />
                Categoria
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat })}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                      form.category === cat
                        ? 'bg-green-700 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-green-600" />
                Imagem de capa (URL)
              </label>
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 text-gray-900 text-sm transition-colors"
                placeholder="https://exemplo.com/imagem.jpg"
              />
              {form.image_url && (
                <div className="mt-3 rounded-lg overflow-hidden h-32">
                  <img src={form.image_url} alt="Prévia" className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Dica: Use{' '}
                <a href="https://unsplash.com" target="_blank" className="text-green-600 hover:underline">
                  Unsplash
                </a>{' '}
                para imagens gratuitas
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
