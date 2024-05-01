'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import ThemeRegistry from '../ui/ThemeRegistry'
import { GoogleOAuthProvider } from '@react-oauth/google'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  return (
    <>
      <ThemeRegistry options={{ key: 'mui' }}>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            {children}{' '}
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </ThemeRegistry>
    </>
  )
}
