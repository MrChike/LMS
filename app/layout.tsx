import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// To be replaced with custom authentication
import { ClerkProvider } from '@clerk/nextjs'
import { AppAuthProvider } from '@/components/providers/auth/app-auth-provider'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ETH Connect',
  description: 'A Demo app to display RBAC Features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <ClerkProvider>
    // <AppAuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    // </AppAuthProvider>
    // </ClerkProvider>
  )
}
