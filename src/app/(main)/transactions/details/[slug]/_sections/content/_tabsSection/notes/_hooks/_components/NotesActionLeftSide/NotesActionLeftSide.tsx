import ButtonCheckbox from '@/components/UI/buttons/buttonCheckbox'
import ButtonRemove from '@/components/UI/buttons/buttonRemove'
import ModalDelete from '@/components/UI/modals/modalDelete'
import { Box } from '@mui/material'
import { ChangeEvent, useState } from 'react'

interface IActionLeftSideProps {
  checked: boolean
  isOpenDeleteModal: boolean
  handleChecked: (event: ChangeEvent<HTMLInputElement>) => void
  toggleDeleteModal: () => void
  selectedRows?: string[]
  handleDelete?: () => void
}

const NotesActionLeftSide = ({
  checked,
  handleChecked,
  selectedRows = [],
  handleDelete,
  isOpenDeleteModal,
  toggleDeleteModal,
}: IActionLeftSideProps) => {
  const isSelectedRows = Boolean(selectedRows.length)

  return (
    <Box sx={{ display: 'flex', columnGap: '12px' }}>
      <ButtonCheckbox
        checked={checked}
        onChange={handleChecked}
        label='Check all'
      />
      <ButtonRemove disabled={!isSelectedRows} onClick={toggleDeleteModal}>
        Delete
      </ButtonRemove>
      <ModalDelete
        title='Are you sure want to remove selected notes?'
        description='You will not be able to recover a deleted note.'
        handleDelete={handleDelete}
        handleClose={toggleDeleteModal}
        open={isOpenDeleteModal}
      />
    </Box>
  )
}

export default NotesActionLeftSide
