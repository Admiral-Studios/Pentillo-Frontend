import { TASK_STATUS, TYPE } from '@/types/enum'
import { ChangeEvent, ReactNode, useMemo, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { ISelectMultipleItem } from '@/components/UI/selects/selectMultiple/selectMultiple.types'
import { Box, Checkbox, SelectChangeEvent, Typography } from '@mui/material'
import {
  useCheckTasks,
  useDeleteTask,
  useTaskByListId,
  useUpdateTask,
} from '@/data/hooks/task'
import SelectRegular from '@/components/UI/selects/selectRegular'
import Link from 'next/link'
import Image from 'next/image'
import { StyledRegularButton } from '@/components/UI/buttons/buttonRegular'
import TableActionRow from '@/components/table/components/tableActionRow/tableActionRow'
import dateIcon from '@/assets/icons/date-icon.svg'
import processIcon from '@/assets/icons/process-status-icon.svg'
import newIcon from '@/assets/icons/new-status-icon.svg'
import holdIcon from '@/assets/icons/hold-status-icon.svg'
import tickSelectIcon from '@/assets/icons/tick-status-icon.svg'
import pencilIcon from '@/assets/icons/pencil-note-icon.svg'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { StyledDateInputWrapper } from '../tasks.styled'
import { ITaskRow } from '../tasks.types'
import EditTaskModal from '@/components/UI/modals/editTaskModal/EditTaskModal'

const useTasksListRow = ({ listId }: { listId: string }) => {
  const [selectTasks, setSelectTasks] = useState<string[]>([])
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const [status, setStatus] = useState<string[]>([])
  const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false)
  const [editTaskId, setEditTaskId] = useState<string>('')
  const toggleAddTaskModal = () => {
    setOpenAddTaskModal((prev) => !prev)
  }

  const { push } = useRouter()
  const detailsTasksData = useTaskByListId({
    type: TYPE.TASKS,
    listId: listId,
    status: status,
  })
  const onRefetch = () => {
    detailsTasksData.refetch()
  }

  const onDeleteSuccess = () => {
    onRefetch()
    toast.success('The tasks was successfully deleted.', {
      style: { maxWidth: '600px' },
    })
    closeDeleteModal()
    setSelectTasks([])
  }

  const { mutate: deleteTask } = useDeleteTask({
    onSuccess: onDeleteSuccess,
  })

  const { mutate: checkTasks } = useCheckTasks({ onSuccess: () => onRefetch() })

  const { mutate: mutateUpdateTask } = useUpdateTask({
    onSuccess: () => {
      onRefetch()
    },
  })

  const toggleDeleteModal = () => {
    setIsOpenDeleteModal((prevState) => !prevState)
  }
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false)
  }

  const handleSelectRow = (id: string) => {
    setSelectTasks((prevStateIds) => {
      const isIdInSelectedList = prevStateIds.indexOf(id) !== -1

      if (isIdInSelectedList) {
        return prevStateIds.filter((prevStateId) => prevStateId !== id)
      }

      return [...prevStateIds, id]
    })
  }

  const handleDeleteTask = () => {
    if (selectTasks.length) {
      deleteTask({ ids: selectTasks })
    }
  }

  const handleCheckedTasks = () => {
    if (selectTasks.length) {
      checkTasks({ ids: selectTasks })
    }
    setSelectTasks([])
  }

  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (detailsTasksData && detailsTasksData.data) {
      if (event.target.checked) {
        setSelectTasks(detailsTasksData.data.data.map((task) => task.id))
        setIsCheckAll(true)
      } else {
        setSelectTasks([])
        setIsCheckAll(false)
      }
    }
  }
  const handleHideCompleted = () => {
    status.length !== 0 &&
    status.every((s) => ['IN_PROCESS', 'ON_HOLD', 'NEW'].includes(s))
      ? setStatus([])
      : setStatus(['IN_PROCESS', 'ON_HOLD', 'NEW'])
  }


  const getIconForStatus = (status: TASK_STATUS) => {
    switch (status) {
      case TASK_STATUS.DONE:
        return tickSelectIcon
      case TASK_STATUS.IN_PROCESS:
        return processIcon
      case TASK_STATUS.NEW:
        return newIcon
      case TASK_STATUS.ON_HOLD:
        return holdIcon
      default:
        return null
    }
  }

  const getOptionsFromEnum = (e: object): IOption[] =>
    Object.entries(e).map(([key, value]) => ({
      name: value,
      value: key,
      icon: getIconForStatus(value as TASK_STATUS),
    }))

  const taskTableData = useMemo(() => {
    let rows: ITaskRow[] = []
    let columns: GridColDef[] = [
      { field: 'status', headerName: 'Status', width: 190 },
      { field: 'title', headerName: 'Title', width: 67 },
      { field: 'description', headerName: 'Description', width: 446 },
      { field: 'note', headerName: '', width: 128 },
      { field: 'owner', headerName: 'Owner', width: 78 },
      { field: 'dueDate', headerName: 'Due date', width: 112 },
      { field: 'actionOptions', headerName: '', width: 52 },
    ]
    let columnsForEdits: ISelectMultipleItem[] = [
      { value: 'title', name: 'Name' },
      { value: 'company', name: 'Company' },
      { value: 'category', name: 'Category' },
      { value: 'email', name: 'Email' },
    ]
    if (detailsTasksData && detailsTasksData.data) {
      const taskList = detailsTasksData.data.data
      rows = taskList.map((task): ITaskRow => {
        const isActive = selectTasks.indexOf(task?.id) !== -1

        return {
          status: (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={isActive}
                onChange={() => handleSelectRow(task?.id)}
              />
              <Box sx={{ width: '132px' }}>
                <SelectRegular
                  value={task?.status}
                  sxInput={{
                    maxWidth: 132 + 'px',
                    height: '28px !important',
                  }}
                  sxSelect={{
                    maxWidth: 132 + 'px',
                    height: '28px !important',
                  }}
                  options={getOptionsFromEnum(TASK_STATUS)}
                  isIcons={true}
                  onChange={(event: SelectChangeEvent<string>) =>
                    mutateUpdateTask({
                      id: task?.id,
                      data: { status: event.target.value as TASK_STATUS },
                    })
                  }
                />
              </Box>
            </Box>
          ),
          title: (
            <Typography
              sx={{
                overflow: ' hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {task?.title}
            </Typography>
          ),
          description: (
            <Typography
              sx={{
                overflow: ' hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {task?.description}
            </Typography>
          ),
          note: (
            <Link href={`/tasks/${task?.id}?step=3`}>
              <StyledRegularButton
                variant='outlined'
                sx={{ gap: '12px', marginRight: '32px' }}
              >
                <Image src={pencilIcon} alt='Pencil Icon' /> Note
              </StyledRegularButton>
            </Link>
          ),
          owner: (
            <Typography
              sx={{
                overflow: ' hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {task?.assignedPerson?.firstName} {task?.assignedPerson?.lastName}
            </Typography>
          ),
          dueDate: (
            <StyledDateInputWrapper>
              <Image src={dateIcon} alt='Date icon' />
              {new Date(task?.dueDate).toLocaleDateString()}
            </StyledDateInputWrapper>
          ),
          actionOptions: (
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <TableActionRow
                isTask={true}
                modalTitle={`Are you sure want to delete “${task?.title}” task?`}
                modalDescription='You will not be able to recover a deleted task'
                deleteHandler={() => deleteTask({ ids: [task?.id] })}
                editHandler={() => {
                  setEditTaskId(task?.id)
                  toggleAddTaskModal()
                }}
                handleAddSubtask={() => push(`/tasks/${task?.id}?step=2`)}
              />
              {openAddTaskModal && editTaskId === task?.id && (
                <EditTaskModal
                  title={task?.title}
                  handleClose={toggleAddTaskModal}
                  open={openAddTaskModal}
                  id={task?.id}
                  onSuccess={() => onRefetch()}
                />
              )}
            </Box>
          ),
          isActive,
        }
      })
    }

    return { rows, columns, columnsForEdits }
  }, [detailsTasksData, selectTasks, listId])

  return {
    rows: taskTableData.rows,
    columns: taskTableData.columns,
    isLoading: detailsTasksData.isLoading,
    refetch: onRefetch,
    isCheckAll,
    handleCheckAll,
    selectTasks,
    handleDeleteTask,
    isOpenDeleteModal,
    toggleDeleteModal,
    handleHideCompleted,
    handleCheckedTasks,
    status,
  }
}

interface IActionRowProps {
  documentId: string
  modalName: string
}

export interface IRows {
  document: ReactNode
  owner: ReactNode
  date: ReactNode
  actions: ReactNode
  isActive: boolean
}

export default useTasksListRow
