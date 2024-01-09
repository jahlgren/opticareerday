import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import getServerSession from '@/modules/auth/api/get-server-session';
import ClientSessionProvider from './client-session-provider';

const inter = Inter({subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '900'], preload: true});

export const metadata: Metadata = {
  title: 'OptiCareer Day Quiz',
  description: 'Quiz för OptiCareer Day',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html className="h-full">
      <body className={inter.className + " text-base h-full"}>
        <ClientSessionProvider session={session}>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  )
}
