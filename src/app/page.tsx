'use client'

import { useFetchUserData } from '@/data/hooks/user'
import { NAV_LINKS } from '@/utils/constants/nav'
import { redirect } from 'next/navigation'

export default function Home() {
  const { data: userData, isLoading: isLoadingUserData } = useFetchUserData()

  if (userData && !isLoadingUserData) {
    redirect(NAV_LINKS.TRANSACTIONS)
  } else if (!userData && !isLoadingUserData) {
    redirect(NAV_LINKS.SIGN_IN)
  }

  return <main></main>
}
