import { TYPE } from '@/types/enum'
import { ChangeEvent, ReactNode, useMemo, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Box, Checkbox, Typography } from '@mui/material'
import Image from 'next/image'
import TableActionRow from '@/components/table/components/tableActionRow/tableActionRow'
import dateIcon from '@/assets/icons/date-icon.svg'
import fillStarIcon from '@/assets/icons/fill-star.svg'
import emptyStarIcon from '@/assets/icons/empty-star.svg'
import toast from 'react-hot-toast'
import { StyledDateInputWrapper } from '../dates.styled'
import { IDateRow } from '../dates.types'
import {
  useDateByListId,
  useDeleteDate,
  useUpdateDate,
} from '@/data/hooks/date'
import AddDateModal from '../_components/addDateModal'
import { useList } from '@/data/hooks/list'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'

const useDatesListRow = ({ listId }: { listId: string }) => {
  const [selectDates, setSelectDates] = useState<string[]>([])
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const [openAddDateModal, setOpenAddDateModal] = useState<boolean>(false)
  const [editDateId, setEditDateId] = useState<string>('')

  const toggleAddDateModal = () => {
    setOpenAddDateModal((prev) => !prev)
  }
  const listData = useList({ type: TYPE.DATES })
  const listsOptions: IOption[] =
    listData.data?.data?.map((list) => ({ name: list.name, value: list.id })) ||
    []
  const detailsDatesData = useDateByListId({
    type: TYPE.DATES,
    listId: listId,
  })
  const onRefetch = () => {
    detailsDatesData.refetch()
  }

  const onDeleteSuccess = () => {
    onRefetch()
    toast.success('The dates was successfully deleted.', {
      style: { maxWidth: '600px' },
    })
    closeDeleteModal()
    setSelectDates([])
  }

  const { mutate: deleteDate } = useDeleteDate({
    onSuccess: onDeleteSuccess,
  })

  const { mutate: mutateUpdateDate } = useUpdateDate({
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
    setSelectDates((prevStateIds) => {
      const isIdInSelectedList = prevStateIds.indexOf(id) !== -1

      if (isIdInSelectedList) {
        return prevStateIds.filter((prevStateId) => prevStateId !== id)
      }

      return [...prevStateIds, id]
    })
  }

  const handleDeleteDate = () => {
    if (selectDates.length) {
      deleteDate({ ids: selectDates, listId })
    }
  }

  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (detailsDatesData && detailsDatesData.data) {
      if (event.target.checked) {
        setSelectDates(detailsDatesData.data.map((date) => date.id))
        setIsCheckAll(true)
      } else {
        setSelectDates([])
        setIsCheckAll(false)
      }
    }
  }

  const taskTableData = useMemo(() => {
    let rows: IDateRow[] = []
    let columns: GridColDef[] = [
      { field: 'title', headerName: 'Title', width: 915 },
      { field: 'dueDate', headerName: 'Due date', width: 112 },
      { field: 'actionOptions', headerName: '', width: 52 },
    ]
    if (detailsDatesData && detailsDatesData.data) {
      const dateList = detailsDatesData.data
      rows = dateList.map((date): IDateRow => {
        const isActive = selectDates.indexOf(date.id) !== -1
        return {
          title: (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Image
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: '-20px',
                  left: '-25px',
                }}
                src={date?.isPinned ? fillStarIcon : emptyStarIcon}
                onClick={() =>
                  mutateUpdateDate({
                    id: date?.id,
                    data: { ...date, isPinned: !date?.isPinned },
                  })
                }
                alt='Star Icon'
              />
              <Checkbox
                checked={isActive}
                onChange={() => handleSelectRow(date.id)}
              />
              <Typography>{date.title}</Typography>
            </Box>
          ),

          dueDate: (
            <StyledDateInputWrapper>
              <Image src={dateIcon} alt='Date icon' />
              {new Date(date.dueDate).toLocaleDateString()}
            </StyledDateInputWrapper>
          ),
          actionOptions: (
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <TableActionRow
                modalTitle={`Are you sure want to delete “${date.title}” date?`}
                modalDescription='You will not be able to recover a deleted date'
                deleteHandler={() => deleteDate({ ids: [date.id], listId })}
                editHandler={() => {
                  setEditDateId(date.id)
                  toggleAddDateModal()
                }}
              />
              {openAddDateModal && editDateId === date.id && (
                <AddDateModal
                  listsOptions={listsOptions}
                  handleClose={toggleAddDateModal}
                  open={openAddDateModal}
                  dateData={date}
                  onSuccess={() => onRefetch()}
                />
              )}
            </Box>
          ),
        }
      })
    }

    return { rows, columns }
  }, [detailsDatesData, selectDates, listId])

  return {
    rows: taskTableData.rows,
    columns: taskTableData.columns,
    isLoading: detailsDatesData.isLoading,
    refetch: onRefetch,
    isCheckAll,
    handleCheckAll,
    selectDates,
    handleDeleteDate,
    isOpenDeleteModal,
    toggleDeleteModal,
  }
}

export interface IRows {
  document: ReactNode
  owner: ReactNode
  date: ReactNode
  actions: ReactNode
  isActive: boolean
}

export default useDatesListRow
