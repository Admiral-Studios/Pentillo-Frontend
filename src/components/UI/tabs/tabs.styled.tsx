import styled from '@emotion/styled'
import { TabPanel } from '@mui/lab'
import { SxProps, Tab, Tabs } from '@mui/material'
import { SyntheticEvent } from 'react'

interface StyledTabsProps {
  children?: React.ReactNode
  value: string
  onChange: (event: SyntheticEvent, newValue: string) => void
  sx?: SxProps
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))({
  paddingRight: '12px',
  paddingLeft: '12px',
  marginBottom: '8px',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: '#FF902A',
  },
})

interface StyledTabProps {
  label: string
  value: string
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(() => ({
  textTransform: 'uppercase',
  fontWeight: '500 !important',
  fontFamily: 'inherit',
  fontSize: '14px',
  color: '#717171',
  paddingBottom: '0px',
 
  '&.Mui-selected': {
    fontWeight: '600',
    color: '#FF902A',
  },
}))

export const StyledPanel = styled(TabPanel)`
  padding: 4px 0 26px 0;
`

export interface ITab extends StyledTabProps {
  tabContent?: any
}
