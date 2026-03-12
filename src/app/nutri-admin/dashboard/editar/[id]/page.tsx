import { notFound } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import PostForm from '@/components/PostForm'
import { createSupabaseServerClient } from '@/lib/supabase-server'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditarArtigoPage({ params }: Props) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) {
    notFound()
  }

  return (
    <AdminLayout activeItem="editar">
      <PostForm initialData={post} postId={id} />
    </AdminLayout>
  )
}
