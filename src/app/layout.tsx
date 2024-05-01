import type { Metadata } from 'next'
import { Commissioner } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Providers from './providers'
import localFont from 'next/font/local'
import { CheckCircleIcon } from '@/ui/icons/CheckCircleIcon'
import { CheckIcon } from '@/ui/icons/CheckIcon'
import { InfoCircleIcon } from '@/ui/icons/InfoCircleIcon'
const commissioner = Commissioner({ subsets: ['latin'] })

const gilroySans = localFont({
  src: [
    {
      path: '../../public/fonts/Gilroy-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gilroy-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: 'Pentillo',
  description: 'Pentillo App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={gilroySans.className}>
        <Providers>{children}</Providers>
        <Toaster
          toastOptions={{
            style: {
              padding: '12px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 500,
            },
            success: {
              icon: <CheckCircleIcon />,
              style: {
                backgroundColor: '#ECFDF3',
                color: '#12B76A',
              },
            },
            error: {
              icon: <InfoCircleIcon />,
              style: {
                backgroundColor: '#FDECEC',
                color: '#DC362E',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
