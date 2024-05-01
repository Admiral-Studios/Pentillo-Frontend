'use client'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import backIcon from '../../assets/icons/back-circle-icon.svg'

export const LinkBack = ({
  text,
  href,
  onClick,
}: {
  text: string
  href?: string
  onClick?: () => void
}) => {
  const router = useRouter()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#040404',
          cursor: 'pointer',
          fontSize: '24px',
          fontWeight: 500,
        }}
        onClick={!href ? onClick : () => router.push(href as string)}
      >
        <Image src={backIcon} alt='Back icon' />
        {text}
      </Box>
    </Box>
  )
}
