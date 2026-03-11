import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Dra. Luazoni | Nutricionista | Nutrição com Equilíbrio e Saúde',
    template: '%s | Dra. Luazoni Nutricionista',
  },
  description:
    'Nutricionista especializada em reeducação alimentar, nutrição esportiva e planos alimentares personalizados. Atendimento humanizado e resultados sustentáveis.',
  keywords: [
    'nutricionista',
    'nutrição',
    'reeducação alimentar',
    'plano alimentar',
    'nutrição esportiva',
    'saúde',
    'alimentação saudável',
  ],
  authors: [{ name: 'Dra. Luazoni' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Dra. Luazoni Nutricionista',
    title: 'Dra. Luazoni | Nutricionista',
    description:
      'Nutrição com equilíbrio, saúde e qualidade de vida. Atendimento humanizado e personalizado.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
