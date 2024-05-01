'use client'
import { Box, Drawer } from '@mui/material'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import React, { useState } from 'react'
import { SidebarList } from './components/SidebarList'
// import { StyledDrawer } from './styled'
import Image from 'next/image'
import logo from '@/assets/icons/logo.svg'
import openSidebar from '@/assets/icons/open-sidebar-icon.svg'
import closeSidebar from '@/assets/icons/close-sidebar-icon.svg'
import logoHouse from '@/assets/icons/house-logo.svg'

const drawerWidth = 232

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  overflowY: 'unset',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `80px`,
  [theme.breakpoints.up('sm')]: {
    width: `80px`,
  },
})

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  position: 'relative',

  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <StyledDrawer anchor={'left'} open={open} variant='permanent'>
      <Box sx={{ padding: '32px 18px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image
            src={open ? logo : logoHouse}
            alt='Logo'
            width={open ? 143 : 43}
            height={43}
          />
          {open && (
            <Image
              src={closeSidebar}
              style={{ cursor: 'pointer' }}
              alt='Close Sidebar'
              onClick={handleDrawerClose}
            />
          )}
        </Box>
      </Box>
      <SidebarList open={open} />
      {!open && (
        <Image
          src={openSidebar}
          alt='Open Sidebar'
          style={{
            position: 'absolute',
            right: '-14px',
            top: '42px',
            cursor: 'pointer',
          }}
          onClick={handleDrawerOpen}
        />
      )}
    </StyledDrawer>
  )
}
