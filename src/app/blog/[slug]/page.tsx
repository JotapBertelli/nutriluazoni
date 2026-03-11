import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react'
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Artigo não encontrado' }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.image_url ? [post.image_url] : [],
    },
  }
}

function renderContent(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h2
          key={i}
          className="text-2xl font-bold text-green-900 mt-8 mb-3"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {line.replace('## ', '')}
        </h2>
      )
    }
    if (line.startsWith('### ')) {
      return (
        <h3 key={i} className="text-xl font-semibold text-green-800 mt-6 mb-2">
          {line.replace('### ', '')}
        </h3>
      )
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={i} className="font-semibold text-green-800 mb-2">
          {line.replace(/\*\*/g, '')}
        </p>
      )
    }
    if (line.trim() === '') return <br key={i} />
    return (
      <p key={i} className="text-gray-700 leading-relaxed mb-3">
        {line}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const formattedDate = new Date(post.created_at).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const readingTime = Math.ceil(post.content.split(' ').length / 200)

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Image */}
        <div className="relative h-80 sm:h-96 overflow-hidden">
          {post.image_url ? (
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-green-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-900/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-3xl mx-auto">
              {post.category && (
                <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium mb-3">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              )}
              <h1
                className="text-3xl sm:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-5 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-green-600" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-green-600" />
                  {readingTime} min de leitura
                </span>
              </div>
              <button className="flex items-center gap-2 text-green-700 hover:text-green-600 text-sm font-medium transition-colors">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
            </div>

            {/* Summary */}
            <p className="text-lg text-green-800 font-medium leading-relaxed mb-8 bg-green-50 p-5 rounded-xl border-l-4 border-green-500">
              {post.summary}
            </p>

            {/* Article Content */}
            <article>{renderContent(post.content)}</article>

            {/* CTA */}
            <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center">
              <h3
                className="text-xl font-bold text-green-900 mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Gostou do conteúdo?
              </h3>
              <p className="text-gray-600 mb-5">
                Agende uma consulta e receba orientações nutricionais personalizadas para a sua vida.
              </p>
              <a
                href="/#contato"
                className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-all hover:shadow-lg hover:shadow-green-200"
              >
                Agendar consulta
              </a>
            </div>

            {/* Back */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-green-700 hover:text-green-600 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao blog
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
