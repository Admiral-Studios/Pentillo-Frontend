import { StyledLink } from '@/ui/components/styled'
import { sidebarConstants } from '@/utils/constants/sidebar'
import { List } from '@mui/material'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import { StyledListItem } from '../styled'

export const SidebarList = ({ open }: { open: boolean }) => {
  const pathname = usePathname()
  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '13px',
        padding: '12px',
      }}
    >
      {sidebarConstants?.map((constant) =>
        open ? (
          <StyledLink
            key={constant?.id}
            href={constant.href}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <StyledListItem active={pathname === constant.href} open={open}>
              <constant.icon />
              {constant?.name}
            </StyledListItem>
          </StyledLink>
        ) : (
          <StyledLink
            key={constant?.id}
            href={constant.href}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <StyledListItem active={pathname === constant.href} open={open}>
              <constant.icon />
            </StyledListItem>
          </StyledLink>
        ),
      )}
    </List>
  )
}
