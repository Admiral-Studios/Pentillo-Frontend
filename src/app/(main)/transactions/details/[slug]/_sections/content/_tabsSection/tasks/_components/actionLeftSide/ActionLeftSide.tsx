import ButtonCheckbox from '@/components/UI/buttons/buttonCheckbox'
import ButtonHide from '@/components/UI/buttons/buttonHide'
import ButtonMark from '@/components/UI/buttons/buttonMark'
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
  handleHideCompleted: () => void
  handleCheckedTasks: () => void
  status: string[]
}

const ActionLeftSide = ({
  checked,
  handleChecked,
  selectedRows = [],
  handleDelete,
  isOpenDeleteModal,
  toggleDeleteModal,
  handleHideCompleted,
  handleCheckedTasks,
  status,
}: IActionLeftSideProps) => {
  const isSelectedRows = Boolean(selectedRows.length)

  return (
    <Box sx={{ display: 'flex', columnGap: '8px' }}>
      <ButtonCheckbox
        checked={checked}
        onChange={handleChecked}
        label='Check all'
      />
      <ButtonRemove disabled={!isSelectedRows} onClick={toggleDeleteModal}>
        Delete
      </ButtonRemove>
      <ButtonMark disabled={!isSelectedRows} onClick={handleCheckedTasks}>
        Mark as completed
      </ButtonMark>
      <ButtonHide
        onClick={handleHideCompleted}
        status={
          status.length !== 0 &&
          status.every((s) => ['IN_PROCESS', 'ON_HOLD', 'NEW'].includes(s))
        }
      >
        Hide completed
      </ButtonHide>
      <ModalDelete
        title='Are you sure want to delete tasks?'
        description='You will not be able to recover a deleted tasks.'
        handleDelete={handleDelete}
        handleClose={toggleDeleteModal}
        open={isOpenDeleteModal}
      />
    </Box>
  )
}

export default ActionLeftSide
