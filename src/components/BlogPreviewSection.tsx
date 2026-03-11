import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BlogCard from './BlogCard'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Post } from '@/types'

async function getRecentPosts(): Promise<Post[]> {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

export default async function BlogPreviewSection() {
  const posts = await getRecentPosts()

  if (posts.length === 0) return null

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
              Blog
            </span>
            <h2
              className="text-4xl font-bold text-green-900 mt-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Conteúdos para sua saúde
            </h2>
            <p className="text-gray-600 mt-2 max-w-xl">
              Artigos, dicas e receitas para te ajudar a fazer escolhas alimentares melhores no dia a dia.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-600 transition-colors shrink-0"
          >
            Ver todos os artigos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
