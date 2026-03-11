-- ============================================
-- Schema do Supabase para o site da Nutricionista
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- Tabela de posts do blog
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  category TEXT DEFAULT '',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para busca por slug
CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);
CREATE INDEX IF NOT EXISTS posts_published_idx ON posts(published);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Política: qualquer pessoa pode ler posts publicados
CREATE POLICY "Leitura pública de posts publicados"
  ON posts FOR SELECT
  USING (published = true);

-- Política: apenas usuários autenticados podem criar/editar/excluir
CREATE POLICY "CRUD apenas para autenticados"
  ON posts FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Nenhum artigo de exemplo. Crie os artigos pelo painel em /nutri-admin
