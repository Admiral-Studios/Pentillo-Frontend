import { Box, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import CircularProgress from '@mui/material/CircularProgress'
import styled from '@emotion/styled'
import { setGridTemplateColumns } from '@/utils/setGridTemplateColumns'
import { ChevronSortIcon } from '@/ui/icons/ChevronSortIcon'

interface ITableBodyProps {
  columns: GridColDef[]
  rows: any[]
  isLoading: boolean
  notFoundMessage?: string
  handleOpen?: (id: string) => void
  handleSort?: (value: string) => void
}

const TableBody = ({
  columns,
  rows,
  isLoading,
  notFoundMessage,
  handleOpen,
  handleSort,
}: ITableBodyProps) => {
  return (
    <Box sx={{ px: '24px' }}>
      <THead columns={columns} handleSort={handleSort} />
      <TBody
        isLoading={isLoading}
        notFoundMessage={notFoundMessage}
        rows={rows}
        columns={columns}
        handleOpen={handleOpen}
      />
    </Box>
  )
}

interface ITHeadProps {
  columns: GridColDef[]
  handleSort?: (value: string) => void
}

const THead = ({ columns, handleSort }: ITHeadProps) => {
  return (
    <Box
      sx={{
        height: '33px',
        display: 'grid',
        gridTemplateColumns: setGridTemplateColumns(columns),
        alignItems: 'flex-start',
        px: '8px',
      }}
    >
      {columns.map((column) => (
        <Box
          key={column.field}
          onClick={() => handleSort && handleSort(column.field)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            //@ts-ignore
            cursor: column.isSorted ? 'pointer' : 'initial',
          }}
        >
          {
            //@ts-ignore
            column.isSorted && (
              <ChevronSortIcon sx={{ width: '16px', height: '16px' }} />
            )
          }
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '17px',
              letterSpacing: '0em',
              color: '#AAAAAA',
            }}
          >
            {column.headerName}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

interface ITBodyProps {
  rows: any[]
  columns: GridColDef[]
  isLoading: boolean
  notFoundMessage?: string
  handleOpen?: (id: string) => void
}

const TBody = ({
  rows,
  columns,
  isLoading,
  notFoundMessage = 'There are no data to display at the moment.',
  handleOpen,
}: ITBodyProps) => {
  const isRows = Boolean(rows.length)
  const borderHandler = (isActive: boolean, rowIndex: number) => {
    if (rowIndex > 0 && !isActive) {
      return '1px solid transparent'
    } else if (rowIndex > 0 && isActive) {
      return '1px solid #FF902A'
    } else if (rowIndex === 0 && isActive) {
      return '1px solid #FF902A'
    } else {
      return '1px solid #F2EFEB'
    }
  }

console.log(rows)

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!isLoading &&
        isRows &&
        rows.map((row, rowIndex) => (
          <Box
            onClick={() => handleOpen && handleOpen(row.id)}
            sx={{
              display: 'grid',
              height: '60px',
              gridTemplateColumns: setGridTemplateColumns(columns),
              alignItems: 'center',
              borderTop: borderHandler(row.isActive, rowIndex),
              borderBottom: row.isActive
                ? '1px solid #FF902A'
                : '1px solid #F2EFEB',
              px: '8px',
              boxShadow: row.isActive
                ? '10px 4px 40px 0px rgba(224, 233, 243, 0.50)'
                : 'none',
              '&:hover': {
                boxShadow: '10px 4px 40px 0px rgba(224, 233, 243, 0.50)',
              },
            }}
            key={rowIndex}
          >
            {columns.map((column) => row[column.field])}
          </Box>
        ))}
      {!isLoading && !isRows && (
        <StyledNotFoundMessage>{notFoundMessage}</StyledNotFoundMessage>
      )}
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '120px 0',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

const StyledNotFoundMessage = styled.p`
  padding: 120px 0;
  text-align: center;
`

export default TableBody
