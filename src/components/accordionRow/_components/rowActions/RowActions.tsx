import Box from '@mui/material/Box'
import { ReactNode } from 'react'

interface IRowActionsProps {
  filterSection?: ReactNode
  actionsLeftSideSection?: ReactNode
}
const RowActions = ({
  actionsLeftSideSection,
  filterSection,
}: IRowActionsProps) => {
  return (
    <Box
      sx={{
        p: '0px 0px 12px 0px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>{actionsLeftSideSection}</div>
      <div>{filterSection}</div>
    </Box>
  )
}

export default RowActions
