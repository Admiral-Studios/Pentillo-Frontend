import Box from '@mui/material/Box'
import { GridColDef } from '@mui/x-data-grid'
import { ReactNode } from 'react'

interface ITableActionsProps {
  columns: GridColDef[]
  filterSection?: ReactNode
  actionsLeftSideSection?: ReactNode
}

const TableActions = ({
  columns,
  filterSection,
  actionsLeftSideSection,
}: ITableActionsProps) => {
  return (
    <Box
      sx={{ p: '0px 16px 20px 16px', display: 'flex', justifyContent: 'space-between' }}
    >
      <div>{actionsLeftSideSection}</div>
      <div>{filterSection}</div>
    </Box>
  )
}

export default TableActions
