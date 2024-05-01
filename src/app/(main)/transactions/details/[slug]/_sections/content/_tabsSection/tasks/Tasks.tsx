import AccordionRow from '@/components/accordionRow'
import TableLists from '@/components/tableLists'
import styled from '@emotion/styled'
import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useDeleteList } from '@/data/hooks/list'
import { listKeys } from '@/data/queryKeys'
import { TYPE } from '@/types/enum'
import useTasksListTable from './_hooks/useTasksListTable'
import ActionSection from './_components/actionSection'
import useTasksListRow from './_hooks/useTasksListRow'
import ActionLeftSide from './_components/actionLeftSide'
import { IPostTransactionResponse } from '@/data/api/api.types'

interface ITasksProps {
  transactionData?: IPostTransactionResponse
}

const Tasks = ({ transactionData }: ITasksProps) => {
  const tasksListsData = useTasksListTable({
    transactionId: transactionData?.id as string,
  })
  return (
    <StyledTabWrapper>
      <TableLists
        columns={tasksListsData.columns}
        isLoading={tasksListsData.isLoadingLists}
        rows={tasksListsData.rows}
        handleSelectRow={tasksListsData.handleSelectRow}
        searchValue={tasksListsData.search}
        setSearchValue={tasksListsData.setSearch}
        RowComponent={Row}
        title='Tasks'
        actionSection={
          <ActionSection selectedRows={tasksListsData.selectTasks} transactionId={transactionData?.id as string} />
        }
        pagination={{
          count: tasksListsData.count,
          take: tasksListsData.take,
          skip: tasksListsData.skip,
          countsRowsByOnePage: [10, 25, 50],
          setSkip: tasksListsData.setSkip,
          setTake: tasksListsData.setTake,
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
  const taskListRowData = useTasksListRow({ listId: id })
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
      rows={taskListRowData.rows}
      columns={taskListRowData.columns}
      isLoading={taskListRowData.isLoading}
      title={title}
      refetch={taskListRowData.refetch}
      handleDelete={handleDelete}
      actionsLeftSideSection={
        <ActionLeftSide
          checked={taskListRowData.isCheckAll}
          handleChecked={taskListRowData.handleCheckAll}
          selectedRows={taskListRowData.selectTasks}
          handleDelete={taskListRowData.handleDeleteTask}
          isOpenDeleteModal={taskListRowData.isOpenDeleteModal}
          toggleDeleteModal={taskListRowData.toggleDeleteModal}
          handleHideCompleted={taskListRowData.handleHideCompleted}
          handleCheckedTasks={taskListRowData.handleCheckedTasks}
          status={taskListRowData.status}
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
export default Tasks
