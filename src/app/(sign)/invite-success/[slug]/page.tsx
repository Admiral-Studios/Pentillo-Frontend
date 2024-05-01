'use client'
import { useTeamInviteAccept } from '@/data/hooks/team.hooks'
import { NAV_LINKS } from '@/utils/constants/nav'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
  const {
    mutate: mutateSendInviteToTeam,
    isPending: isPending,
    isSuccess: isSuccess,
    isError: isError,
  } = useTeamInviteAccept()

  useEffect(() => {
    mutateSendInviteToTeam(
      { token: params.slug },
      {
        onError(error, variables, context) {              
          if (error.response?.data.statusCode === 401) {       
            window.location.href = (`${NAV_LINKS.SIGN_IN}/${params.slug}`)
          }
        },
      },
    )
  }, [mutateSendInviteToTeam, params.slug])
  
  if (isError) redirect(NAV_LINKS.SIGN_IN)

  if (isSuccess && !isError) redirect(NAV_LINKS.TRANSACTIONS)

  return <>page</>
}

export default Page
