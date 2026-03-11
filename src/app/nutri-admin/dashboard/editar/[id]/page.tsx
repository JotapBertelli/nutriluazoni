import { Leaf } from 'lucide-react'
import Link from 'next/link'
import PostForm from '@/components/PostForm'

interface Props {
  params: Promise<{ id: string }>
}

const mockPost = {
  id: '1',
  title: '5 Alimentos que Impulsionam sua Energia no Dia a Dia',
  slug: 'alimentos-que-impulsionam-energia',
  summary: 'Descubra quais alimentos naturais podem te ajudar a manter os níveis de energia elevados durante o dia.',
  content: `## Introdução\n\nManter os níveis de energia ao longo do dia é um dos maiores desafios da vida moderna.\n\n## 1. Aveia\n\nA aveia é uma excelente fonte de carboidratos complexos e fibras solúveis.\n\n## Conclusão\n\nMais do que focar em alimentos isolados, o segredo está no padrão alimentar como um todo.`,
  image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
  category: 'Alimentação',
  published: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export default async function EditarArtigoPage({ params }: Props) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-green-900 text-white fixed h-full flex flex-col">
        <div className="p-6 border-b border-green-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Dra. Luazoni</p>
              <p className="text-green-400 text-xs">Painel Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <p className="text-green-500 text-xs font-semibold uppercase tracking-wider mb-3 px-3">Menu</p>
          <div className="space-y-1">
            <Link
              href="/nutri-admin/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 text-green-200 hover:bg-green-800 hover:text-white rounded-lg text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="ml-60 flex-1 p-8">
        <PostForm initialData={mockPost} postId={id} />
      </main>
    </div>
  )
}
