import AccordionRow from '@/components/accordionRow'
import TableLists from '@/components/tableLists'
import styled from '@emotion/styled'
import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useDeleteList } from '@/data/hooks/list'
import { listKeys } from '@/data/queryKeys'
import { TYPE } from '@/types/enum'
import ActionSection from './_components/actionSection'
import ActionLeftSide from './_components/actionLeftSide'
import { IPostTransactionResponse } from '@/data/api/api.types'
import useDatesListTable from './_hooks/useDatesListTable'
import useDatesListRow from './_hooks/useDatesListRow'

interface ITasksProps {
  transactionData?: IPostTransactionResponse
}

const Dates = ({ transactionData }: ITasksProps) => {
  const datesListsData = useDatesListTable({
    transactionId: transactionData?.id as string,
  })
  return (
    <StyledTabWrapper>
      <TableLists
        columns={datesListsData.columns}
        isLoading={datesListsData.isLoadingLists}
        rows={datesListsData.rows}
        handleSelectRow={datesListsData.handleSelectRow}
        searchValue={datesListsData.search}
        setSearchValue={datesListsData.setSearch}
        RowComponent={Row}
        title='Dates'
        actionSection={
          <ActionSection
            selectedRows={datesListsData.selectDates}
            transactionId={transactionData?.id as string}
          />
        }
        pagination={{
          count: datesListsData.count,
          take: datesListsData.take,
          skip: datesListsData.skip,
          countsRowsByOnePage: [10, 25, 50],
          setSkip: datesListsData.setSkip,
          setTake: datesListsData.setTake,
        }}
      />
    </StyledTabWrapper>
  )
}

interface IRowProps {
  id: string
  title: string
}

const Row = ({ id, title }: IRowProps) => {
  const dateListRowData = useDatesListRow({ listId: id })
  const queryClient = useQueryClient()

  const onDeleteSuccess = () => {
    toast.success('The list was successfully deleted.', {
      style: { maxWidth: '600px' },
    })
  }

  const { mutate: deleteTask } = useDeleteList({
    onSuccess: onDeleteSuccess,
  })

  const handleDelete = (id: string) => {
    deleteTask(id, {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [listKeys.list({ type: TYPE.TASKS })],
        })
      },
    })
  }
  return (
    <AccordionRow
      id={id}
      rows={dateListRowData.rows}
      columns={dateListRowData.columns}
      isLoading={dateListRowData.isLoading}
      title={title}
      refetch={dateListRowData.refetch}
      handleDelete={handleDelete}
      type={TYPE.DATES}
      actionsLeftSideSection={
        <ActionLeftSide
          checked={dateListRowData.isCheckAll}
          handleChecked={dateListRowData.handleCheckAll}
          selectedRows={dateListRowData.selectDates}
          handleDelete={dateListRowData.handleDeleteDate}
          isOpenDeleteModal={dateListRowData.isOpenDeleteModal}
          toggleDeleteModal={dateListRowData.toggleDeleteModal}
        />
      }
    />
  )
}

const StyledTabWrapper = styled.div`
  border-radius: 16px;
  box-shadow: 10px 4px 40px 0px #e0e9f380;
  background: #ffffff;
`
export default Dates
