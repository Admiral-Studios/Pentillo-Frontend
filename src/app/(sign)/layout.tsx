'use client'

import { DeviceComponent } from '@/components/deviceComponent/DeviceComponent'
import { Box, Grid } from '@mui/material'
import { ReactNode } from 'react'
import deviceImage from '@/assets/images/macbook.webp'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Grid sx={{ m: 0, width: '100%' }} container spacing={2}>
        <DeviceComponent image={deviceImage} />
        {children}
      </Grid>
    </Box>
  )
}
