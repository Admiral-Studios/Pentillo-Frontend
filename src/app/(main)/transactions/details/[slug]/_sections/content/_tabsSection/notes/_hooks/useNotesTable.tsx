import { Box, Checkbox, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { notesKeys } from '@/data/queryKeys'
import { useQueryClient } from '@tanstack/react-query'
import TableActionRow from '@/components/table/components/tableActionRow/tableActionRow'
import { useRouter } from 'next/navigation'
import { GridColDef } from '@mui/x-data-grid'
import { useDeleteNote, useNotes } from '@/data/hooks/notes'
import { INoteRow } from '../notes.types'
import { StyledDateInputWrapper } from '../notes.styled'
import Image from 'next/image'
import dateIcon from '@/assets/icons/date-icon.svg'
import AddNoteModal from './_components/addNoteModal/AddNoteModal'

interface IUseNotesTable {
  transactionId: string
}

const useNotesTable = ({ transactionId }: IUseNotesTable) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const [take, setTake] = useState<number>(5)
  const [skip, setSkip] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const [count, setCount] = useState<number | undefined>(0)
  const [selectNotes, setSelectNotes] = useState<string[]>([])
  const [editNoteId, setEditNoteId] = useState<string>('')
  const [openAddNoteModal, setOpenAddNoteModal] = useState<boolean>(false)

  const toggleAddNoteModal = () => {
    setOpenAddNoteModal((prev) => !prev)
  }

  const [searchDebounce] = useDebounce(search, 1000)

  const queryClient = useQueryClient()
  const { push } = useRouter()

  const notesData = useNotes(
    {
      search: searchDebounce || undefined,
      take,
      skip,
    },
    setCount,
    transactionId,
  )

  const { mutate: deleteNote } = useDeleteNote({
    onSuccess() {
      closeDeleteModal()
      setSelectNotes([])
      queryClient.invalidateQueries({
        queryKey: [notesKeys.all],
      })
    },
  })

  const onDeleteNote = (id: string) => {
    deleteNote({ id: transactionId, ids: [id] })
  }

  const toggleDeleteModal = () => {
    setIsOpenDeleteModal((prevState) => !prevState)
  }
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false)
  }
  const handleDeleteNote = () => {
    if (selectNotes.length) {
      deleteNote({ id: transactionId, ids: selectNotes })
    }
  }

  const handleSelectRow = (id: string) => {
    setSelectNotes((prevStateIds) => {
      const isIdInSelectedList = prevStateIds.indexOf(id) !== -1

      if (isIdInSelectedList) {
        return prevStateIds.filter((prevStateId) => prevStateId !== id)
      }

      return [...prevStateIds, id]
    })
  }
  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (notesData && notesData.data) {
      if (event.target.checked) {
        setSelectNotes(notesData.data.map((note) => note.id))
        setIsCheckAll(true)
      } else {
        setSelectNotes([])
        setIsCheckAll(false)
      }
    }
  }

  const transactionTableData = useMemo(() => {
    let rows: INoteRow[] = []
    let columns: GridColDef[] = [
      { field: 'text', headerName: 'Notes', width: 960 },
      { field: 'createdAt', headerName: 'Date', width: 112 },
      { field: 'actionOptions', headerName: '', width: 52 },
    ]

    if (notesData && notesData.data) {
      const notes = notesData.data

      rows = notes?.map((note): any => {
        const isActive = selectNotes.indexOf(note.id) !== -1
        return {
          text: (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={isActive}
                onChange={() => handleSelectRow(note.id)}
              />
              <Typography>{note.text}</Typography>
            </Box>
          ),
          createdAt: (
            <StyledDateInputWrapper>
              <Image src={dateIcon} alt='Date icon' />
              {new Date(note.createdAt).toLocaleDateString()}
            </StyledDateInputWrapper>
          ),

          actionOptions: (
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <TableActionRow
                modalTitle={`Are you sure want to delete this note?`}
                modalDescription='You will not be able to recover a deleted note'
                deleteHandler={() => onDeleteNote(note.id)}
                editHandler={() => {
                  toggleAddNoteModal()
                  setEditNoteId(note.id)
                }}
              />
              {openAddNoteModal && editNoteId === note.id && (
                <AddNoteModal
                  transactionId={transactionId}
                  handleClose={toggleAddNoteModal}
                  open={openAddNoteModal}
                  noteData={note}
                  onSuccess={() =>
                    queryClient.invalidateQueries({
                      queryKey: [notesKeys.all],
                    })
                  }
                />
              )}
            </Box>
          ),
        }
      })
    }

    return { rows, columns }
  }, [deleteNote, setSelectNotes, notesData])

  useEffect(() => {
    setIsCheckAll(false)
    setSelectNotes([])
  }, [skip, take])

  return {
    selectNotes,
    count: count,
    take,
    skip,
    search,
    transactionTableData,
    isLoading: notesData.isLoading,
    isCheckAll,
    isOpenDeleteModal,
    toggleDeleteModal,
    handleDeleteNote,
    handleCheckAll,
    setTake,
    setSkip,
    setSearch,
  }
}

export default useNotesTable
