import AdminLayout from '@/components/AdminLayout'
import PostForm from '@/components/PostForm'

export default function NovoArtigoPage() {
  return (
    <AdminLayout activeItem="novo-artigo">
      <PostForm />
    </AdminLayout>
  )
}
