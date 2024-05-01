import styled from '@emotion/styled'
import { SxProps } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import {
  ComponentType,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react'
import TableHeader from '../table/components/tableHeader'
import TableListsBody from './_components/tableListsBody'
import { IRowProps } from '@/components/tableLists/tableLists.types'
import TablePagination from '../table/components/tablePagination'

interface ITableListsProps {
  sxPropsWrapper?: SxProps
  rows: any[]
  columns: GridColDef[]
  title: string
  actionSection?: ReactNode
  actionsLeftSideSection?: ReactNode
  filterSection?: ReactNode
  searchValue?: string
  setSearchValue?: Dispatch<SetStateAction<string>>
  RowComponent: ComponentType<any>
  isLoading: boolean
  isSearch?: boolean
  onClickListRow?: (listId: string) => Promise<void>
  handleSelectRow?: (id: string) => void
  pagination?: {
    count?: number
    take: number
    skip: number
    countsRowsByOnePage: number[]
    setSkip: Dispatch<SetStateAction<number>>
    setTake: Dispatch<SetStateAction<number>>
  }
  notFoundMessage?: string
}

const TableLists = ({
  rows,
  columns,
  searchValue,
  setSearchValue,
  actionSection,
  title,
  isLoading,
  isSearch,
  onClickListRow,
  RowComponent,
  pagination,
}: ITableListsProps) => {

  return (
    <StyledTableListsWrapper>
      <TableHeader
        isSearch={isSearch}
        search={searchValue}
        setSearch={setSearchValue}
        actionSection={actionSection}
        title={title}
      />
      <hr
        style={{
          border: 'none',
          height: '1px',
          backgroundColor: 'rgb(242, 239, 235)',
          margin: '0',
        }}
      />
      <TableListsBody
        onClickListRow={onClickListRow}
        rows={rows}
        columns={columns}
        isLoading={isLoading}
        RowComponent={RowComponent}
      />
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
    </StyledTableListsWrapper>
  )
}

const StyledTableListsWrapper = styled.div``

export default TableLists
