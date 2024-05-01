'use client'

import { useGoogleLogin } from '@react-oauth/google'
import { redirect } from 'next/navigation'
import { NAV_LINKS } from '@/utils/constants/nav'
import { Box } from '@mui/material'
import Image from 'next/image'
import googleIcon from '../../assets/icons/google-icon.svg'
import { useAuthGoogle } from '@/data/hooks/auth'
import useLocalStorage from '@/utils/hooks/useLocalStorage'

const GoogleButton = ({
  text,
  inviteToken,
  ...otherProps
}: {
  text: string
  inviteToken?: string
}) => {
  const { storedValue } = useLocalStorage('onboardingComplete', false)

  const {
    mutate: mutateAuthGoogle,
    data,
    isSuccess: isSuccessAuthGoogle,
  } = useAuthGoogle()

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }: { code: string }) => {
      mutateAuthGoogle({ code, invitationToken: inviteToken })
    },
    flow: 'auth-code',
  })

  if (isSuccessAuthGoogle && data.subscription && data.subscription.isActive)
    redirect(NAV_LINKS.TRANSACTIONS)

  if (isSuccessAuthGoogle && !data.subscription)
    redirect(NAV_LINKS.BUY_SUBSCRIPTION)

  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: '28px',
        display: 'flex',
        border: '1px solid #F2EFEB',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        height: '48px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '20px',
      }}
      {...otherProps}
      onClick={googleLogin}
    >
      {text}
      <Image src={googleIcon} alt='GoogleIcon' />
    </Box>
  )
}

export default GoogleButton
