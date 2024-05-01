'use client'
import { Box } from '@mui/material'
import { ReactNode } from 'react'
import { Sidebar } from './components/sidebar/Sidebar'
import { DashboardHeader } from '@/app/(main)/account/components/DashboardHeader'
import styled from '@emotion/styled'

interface ILayout {
  children: ReactNode
}

export const Layout = ({ children }: ILayout) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <StyledContainer>
        <DashboardHeader />

        {children}
      </StyledContainer>
    </Box>
  )
}

const StyledContainer = styled.div`
  max-width: 100%;
  padding: 0px 24px;
  width: 100%;
  margin: 0 auto;
`
