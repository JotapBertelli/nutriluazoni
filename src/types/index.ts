export interface Post {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  image_url: string
  category: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  name: string
  text: string
  result: string
  avatar: string
}

export interface Service {
  icon: string
  title: string
  description: string
}
