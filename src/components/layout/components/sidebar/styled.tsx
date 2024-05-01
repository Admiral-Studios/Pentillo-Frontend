import styled from '@emotion/styled'
import { Box, Drawer, ListItem } from '@mui/material'

export const SidebarWrapper = styled(Box)``

export const StyledListItem = styled(ListItem)<{
  active: boolean
  open: boolean
}>`
  position: relative;
  padding: 12px;
  display: flex;
  gap: 12px;
  background-color: ${(props) => props.active && '#FFFAF3'};
  border-radius: 8px;
  color: ${(props) => (props.active ? '#FFAC5F' : '#AAAAAA')};
  justify-content: ${(props) => (props.open ? 'start' : 'center')};
  width: ${(props) => (props.open ? '100%' : '44px')};
  font-weight: 500;
  max-height: 44px;
  svg {
    width: 20px;
    height: 20px;
    path {
      stroke: ${(props) => (props.active ? '#FFAC5F' : '#AAAAAA')};
    }
  }
`

export const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    width: 232px;
    top: 0;
    position: sticky;
    box-shadow: 10px 4px 40px 0px rgba(224, 233, 243, 0.5);
    height: 100vh;
  }
`
