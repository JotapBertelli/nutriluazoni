import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { Post } from '@/types'

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const readingTime = Math.ceil(post.content.split(' ').length / 200)

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-green-100/50 hover:shadow-md hover:border-green-200 transition-all group hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.image_url || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {post.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 bg-green-700 text-white text-xs px-3 py-1 rounded-full font-medium">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} min de leitura
          </span>
        </div>

        <h3 className="font-semibold text-green-900 text-lg mb-2 leading-snug line-clamp-2 group-hover:text-green-700 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
          {post.summary}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-600 transition-colors group/link"
        >
          Ler artigo completo
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
