'use client'

import { Layout } from '@/components/layout/Layout'
import { ReactNode } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>
}
