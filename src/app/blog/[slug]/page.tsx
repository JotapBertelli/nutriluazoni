import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { ArrowLeft, Calendar, Clock, Tag, Share2, Leaf, BookOpen, ArrowRight } from 'lucide-react'
import { Post } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !data) return null
    return data
  } catch {
    return null
  }
}

async function getRelatedPosts(currentSlug: string, category: string): Promise<Post[]> {
  try {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .eq('category', category)
      .neq('slug', currentSlug)
      .limit(3)

    return data || []
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Artigo não encontrado' }

  return {
    title: `${post.title} | Dra. Luazoni`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.image_url ? [post.image_url] : [],
      type: 'article',
    },
  }
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-3xl sm:text-4xl font-bold text-green-950 mt-10 mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          {line.slice(2)}
        </h1>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl sm:text-3xl font-bold text-green-900 mt-12 mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-green-800 mt-8 mb-3">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="my-8 pl-6 border-l-4 border-green-500 bg-green-50 py-4 pr-4 rounded-r-xl">
          <p className="text-green-900 text-lg italic font-medium leading-relaxed">{line.slice(2)}</p>
        </blockquote>
      )
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(
          <li key={i} className="flex items-start gap-2.5 text-gray-700 leading-relaxed">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            <span>{lines[i].slice(2)}</span>
          </li>
        )
        i++
      }
      elements.push(
        <ul key={`list-${i}`} className="my-5 space-y-2">
          {listItems}
        </ul>
      )
      continue
    } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(
        <p key={i} className="font-semibold text-green-900 text-lg my-3">
          {line.slice(2, -2)}
        </p>
      )
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="my-3" />)
    } else {
      elements.push(
        <p key={i} className="text-gray-700 text-lg leading-[1.85] mb-5">
          {line}
        </p>
      )
    }
    i++
  }

  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const relatedPosts = await getRelatedPosts(slug, post.category)

  const formattedDate = new Date(post.created_at).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const readingTime = Math.ceil(post.content.split(' ').length / 200)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* Hero — imagem com overlay editorial */}
        <div className="relative w-full h-[55vh] sm:h-[65vh] min-h-[380px] overflow-hidden">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-950" />
          )}
          {/* Gradiente editorial escuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

          {/* Breadcrumb no topo */}
          <div className="absolute top-0 left-0 right-0 pt-24 pb-4 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Voltar ao blog
              </Link>
            </div>
          </div>

          {/* Título e meta no fundo */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-10 sm:pb-14">
            <div className="max-w-4xl mx-auto">
              {post.category && (
                <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold mb-4 uppercase tracking-wide">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              )}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 max-w-3xl"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
                    <Leaf className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-medium">Dra. Luazoni</span>
                </div>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime} min de leitura
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {post.content.split(' ').length} palavras
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Corpo do artigo */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16">

              {/* Conteúdo principal */}
              <div className="min-w-0">
                {/* Barra de ações */}
                <div className="flex items-center justify-between mb-10 pb-8 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-green-700 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Dra. Luazoni</p>
                      <p className="text-xs text-gray-500">CRN-3: 23.338 · Nutricionista</p>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-700 border border-gray-200 hover:border-green-300 px-4 py-2 rounded-full transition-colors"
                    title="Compartilhar"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Compartilhar</span>
                  </button>
                </div>

                {/* Resumo destacado */}
                <div className="relative mb-10">
                  <div className="absolute -left-4 sm:-left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-green-300 rounded-full" />
                  <p className="text-xl sm:text-2xl text-green-900 font-medium leading-relaxed pl-4 sm:pl-6 italic">
                    {post.summary}
                  </p>
                </div>

                {/* Conteúdo do artigo */}
                <article className="prose-custom">
                  {renderContent(post.content)}
                </article>

                {/* Tags */}
                {post.category && (
                  <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-gray-500">Categoria:</span>
                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-sm px-4 py-1.5 rounded-full font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      {post.category}
                    </span>
                  </div>
                )}
                {/* Voltar */}
                <div className="mt-10 flex items-center justify-between">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-green-700 hover:text-green-600 font-medium transition-colors text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Todos os artigos
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  {/* Info do artigo */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Detalhes</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-green-600 shrink-0" />
                        <span className="text-gray-700">{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-green-600 shrink-0" />
                        <span className="text-gray-700">{readingTime} min de leitura</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <BookOpen className="w-4 h-4 text-green-600 shrink-0" />
                        <span className="text-gray-700">{post.content.split(' ').length} palavras</span>
                      </div>
                      {post.category && (
                        <div className="flex items-center gap-3 text-sm">
                          <Tag className="w-4 h-4 text-green-600 shrink-0" />
                          <span className="text-gray-700">{post.category}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sobre a autora sidebar */}
                  <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Escrito por</p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center shrink-0">
                        <Leaf className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-green-900 text-sm">Dra. Luazoni</p>
                        <p className="text-green-600 text-xs">Nutricionista · CRN-3: 23.338</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Especialista em nutrição funcional e comportamento alimentar em Penápolis — SP.
                    </p>
                    <a
                      href="/#contato"
                      className="block mt-4 bg-green-700 hover:bg-green-600 text-white text-center text-xs font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      Agendar Consulta
                    </a>
                  </div>

                  {/* Artigos relacionados */}
                  {relatedPosts.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Leia também</p>
                      <div className="space-y-4">
                        {relatedPosts.map((related) => (
                          <Link
                            key={related.id}
                            href={`/blog/${related.slug}`}
                            className="group flex gap-3 items-start"
                          >
                            <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-green-100">
                              {related.image_url && (
                                <img
                                  src={related.image_url}
                                  alt={related.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
                                {related.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {Math.ceil(related.content.split(' ').length / 200)} min
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* Artigos relacionados mobile */}
        {relatedPosts.length > 0 && (
          <div className="lg:hidden bg-gray-50 border-t border-gray-100 py-10 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-lg font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Leia também
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group flex sm:flex-col gap-3 bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all"
                  >
                    <div className="w-20 sm:w-full h-16 sm:h-36 shrink-0 bg-green-100 overflow-hidden">
                      {related.image_url && (
                        <img
                          src={related.image_url}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-3 sm:p-4 flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
                        {related.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {Math.ceil(related.content.split(' ').length / 200)} min de leitura
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  )
}
