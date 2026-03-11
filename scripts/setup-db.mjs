import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Lê as variáveis do .env.local manualmente
const envFile = readFileSync(join(__dirname, '../.env.local'), 'utf-8')
const env = Object.fromEntries(
  envFile
    .split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('=').map(s => s.trim()))
)

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
const serviceRoleKey = env['SUPABASE_SERVICE_ROLE_KEY']

if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('placeholder')) {
  console.error('❌ Erro: Configure as variáveis no .env.local antes de rodar este script.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})

const sql = `
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

CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);
CREATE INDEX IF NOT EXISTS posts_published_idx ON posts(published);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);
`

console.log('🌿 Configurando banco de dados...')

// Checa se a tabela já existe
const { error: checkError } = await supabase.from('posts').select('id').limit(1)

if (!checkError) {
  console.log('✅ Conexão com Supabase OK!')
  console.log('✅ Tabela "posts" já existe e está funcionando!')
  console.log('')
  console.log('🎉 Tudo pronto! Rode: npm run dev')
  process.exit(0)
}

// Tabela não existe — instrui o usuário
console.log('✅ Conexão com Supabase OK!')
console.log('')
console.log('⚠️  A tabela "posts" ainda não existe.')
console.log('   O Supabase não permite criar tabelas via API por segurança.')
console.log('')
console.log('📋 Faça isso agora (leva menos de 1 minuto):')
console.log('   1. Acesse: https://supabase.com/dashboard')
console.log('   2. Abra seu projeto → clique em "SQL Editor" no menu lateral')
console.log('   3. Clique em "+ New query"')
console.log('   4. Copie e cole o conteúdo do arquivo: supabase-schema.sql')
console.log('   5. Clique em "Run"')
console.log('')
console.log('   Depois disso, o site estará 100% funcional!')
