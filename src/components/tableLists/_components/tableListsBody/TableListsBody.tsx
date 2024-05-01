import styled from '@emotion/styled'
import { GridColDef } from '@mui/x-data-grid'
import { ComponentType, ReactNode } from 'react'
import { Box, CircularProgress } from '@mui/material'

interface ITableListsBodyProps {
  columns: GridColDef[]
  rows: any[]
  isLoading: boolean
  RowComponent: ComponentType<any>
  notFoundMessage?: string
  rightSection?: ReactNode
  onRename?: () => void
  onDownload?: () => void
  onDelete?: () => void
  onClickListRow?: (listId: string) => Promise<void>
}

const TableListsBody = ({
  isLoading,
  columns,
  rows,
  RowComponent,
  notFoundMessage = 'There are no data to display at the moment.',
  rightSection,
  onDelete,
  onDownload,
  onRename,
  onClickListRow,
}: ITableListsBodyProps) => {
  const isRows = Boolean(rows.length)

  return (
    <StyledTableListsBodyWrapper>
      {rows.map((row) => (
        <RowComponent
          {...row}
          key={row.id}
          title={row.name}
          onDelete={onDelete}
          onDownload={onDownload}
          onRename={onRename}
        />
      ))}
      {!isLoading && !isRows && (
        <StyledNotFoundMessage>{notFoundMessage}</StyledNotFoundMessage>
      )}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </StyledTableListsBodyWrapper>
  )
}

const StyledTableListsBodyWrapper = styled.div`
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  min-height: 316px;
  position: relative;
`

const StyledNotFoundMessage = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`

export default TableListsBody
