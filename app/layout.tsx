import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/auth-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Header } from '@/components/layout/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuickCart Pro - Modern E-Commerce Platform',
  description: 'A modern, minimal, and functional e-commerce platform built with Next.js 14 and Prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <Header />
            <div className="pt-16">
              {children}
            </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
