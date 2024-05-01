'use client'

import { Box, SxProps } from '@mui/material'
import TableHeader from './components/tableHeader'
import TableBody from './components/tableBody/TableBody'
import TableActions from './components/tableActions'
import { GridColDef } from '@mui/x-data-grid'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import TablePagination from './components/tablePagination'

interface ITableProps {
  sxPropsWrapper?: SxProps
  rows: any[]
  columns: GridColDef[]
  title?: string
  actionSection?: ReactNode
  actionsLeftSideSection?: ReactNode
  filterSection?: ReactNode
  searchValue?: string
  setSearchValue?: Dispatch<SetStateAction<string>>
  isLoading: boolean
  isSearch?: boolean
  pagination?: {
    count?: number
    take: number
    skip: number
    countsRowsByOnePage: number[]
    setSkip: Dispatch<SetStateAction<number>>
    setTake: Dispatch<SetStateAction<number>>
  }
  notFoundMessage?: string
  handleOpen?: (id: string) => void
  handleSort?: (value: string) => void;
  tabsContent?: ReactNode
}

const Table = ({
  sxPropsWrapper,
  title,
  columns,
  rows,
  actionSection,
  actionsLeftSideSection,
  filterSection,
  searchValue,
  pagination,
  isLoading,
  isSearch = true,
  setSearchValue,
  notFoundMessage,
  handleOpen,
  handleSort,
  tabsContent
}: ITableProps) => {
  return (
    <>
      <TableHeader
        isSearch={isSearch}
        search={searchValue}
        setSearch={setSearchValue}
        actionSection={actionSection}
        title={title}
        tabsContent={tabsContent}
      />
      <Box
        sx={{
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          padding: '16px 0px',
          border: '1px solid #F2EFEB',
          boxShadow: '10px 4px 40px 0px rgba(224, 233, 243, 0.50)',
          ...sxPropsWrapper,
        }}
      >
        <TableActions
          actionsLeftSideSection={actionsLeftSideSection}
          filterSection={filterSection}
          columns={columns}
        />
        <TableBody
          notFoundMessage={notFoundMessage}
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          handleOpen={handleOpen}
          handleSort={handleSort}
        />
      </Box>
      {pagination && Boolean(pagination.count) && (
          <TablePagination
            count={pagination.count}
            countsRowsByOnePage={pagination.countsRowsByOnePage}
            skip={pagination.skip}
            take={pagination.take}
            pages={
              pagination.count
                ? Math.ceil(pagination?.count / pagination.take)
                : 0
            }
            setSkip={pagination.setSkip}
            setTake={pagination.setTake}
          />
        )}
    </>
  )
}

export default Table
