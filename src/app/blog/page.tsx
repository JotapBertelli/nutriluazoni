import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogCard from '@/components/BlogCard'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Post } from '@/types'

export const metadata: Metadata = {
  title: 'Blog | Dicas de Nutrição e Saúde',
  description:
    'Artigos, dicas nutricionais e receitas saudáveis escritos pela Dra. Luazoni para ajudar você a cuidar melhor da sua alimentação.',
}

const categories = ['Todos', 'Alimentação', 'Nutrição', 'Dicas', 'Receitas', 'Saúde', 'Esporte']

async function getPosts(): Promise<Post[]> {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <div className="bg-green-700 pt-28 pb-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-green-600 text-green-100 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Blog da Nutricionista
            </span>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Conteúdos para sua saúde
            </h1>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Artigos, dicas e receitas para te ajudar a construir uma relação mais saudável com a alimentação.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-green-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat === 'Todos'
                      ? 'bg-green-700 text-white'
                      : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-700 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Posts Grid */}
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">Nenhum artigo publicado ainda.</p>
                <p className="text-gray-400 text-sm mt-2">Em breve novos conteúdos chegarão aqui!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
