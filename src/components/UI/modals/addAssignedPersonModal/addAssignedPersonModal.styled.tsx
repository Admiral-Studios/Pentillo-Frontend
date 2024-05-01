import styled from '@emotion/styled'
import { styled as stylesStyled } from '@mui/material/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export const StyledModalWrapper = styled.div`
  max-width: 482px;
  padding: 32px;
  border-radius: 12px;
  background-color: #fff;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
`

export const StyledModalHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 46px 0 32px 0;
  .user-image {
    width: 64px;
    height: 64px;
    margin-bottom: 34px;
  }
  h3 {
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
    letter-spacing: -0.03em;
    margin: 0;
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.02em;
    margin: 0;
    color: #aaaaaa;
  }
  .close-icon {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
`
export const StyledModalBody = styled.div``

interface StyledTabsProps {
  children?: React.ReactNode
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

export const StyledTabs = stylesStyled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))({
  minHeight: 'auto',
  borderBottom: '1px solid #E7E7E799',

  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 'auto',
    width: '100%',
    backgroundColor: '#FF902A',
  },
})

interface StyledTabProps {
  label: string
}

export const StyledTab = stylesStyled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  flex: 'auto',
  textTransform: 'uppercase',
  color: '#D0D0D0',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '24px',
  letterSpacing: '0.4000000059604645px',
  padding: '0 0 9px',
  minHeight: 'auto',

  '&.Mui-selected': {
    color: '#FF902A',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}))
