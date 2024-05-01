import shareIcon from '@/assets/icons/share-icon.svg'
import ButtonCheckbox from '@/components/UI/buttons/buttonCheckbox'
import ButtonRemove from '@/components/UI/buttons/buttonRemove'
import ButtonWithIcon from '@/components/UI/buttons/buttonWithIcon'
import ModalDelete from '@/components/UI/modals/modalDelete'
import { DownloadIcon } from '@/ui/icons/DownloadIcon'
import { Box } from '@mui/material'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

interface IActionLeftBottomProps {
  checked: boolean
  isSelectedRows?: boolean
  handleChecked: (event: ChangeEvent<HTMLInputElement>) => void
  handleDelete?: () => void
  handleDownload?: () => void
}

const ActionLeftBottom = ({
  checked,
  isSelectedRows = false,
  handleChecked,
  handleDelete,
  handleDownload,
}: IActionLeftBottomProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState)
  }

  const onDelete = () => {
    if (handleDelete) {
      handleDelete()
    }
    toggleModal()
  }

  return (
    <Box sx={{ display: 'flex', columnGap: '12px' }}>
      <ButtonCheckbox
        checked={checked}
        onChange={handleChecked}
        label='Check all'
      />
      <ButtonRemove disabled={!isSelectedRows} onClick={toggleModal}>
        Delete
      </ButtonRemove>
      <ButtonWithIcon
        disabled={!isSelectedRows}
        onClick={handleDownload}
        icon={
          <DownloadIcon
            sx={{ path: { fill: !isSelectedRows ? '#AAAAAA' : '#FF902A' } }}
            fontSize={'inherit'}
          />
        }
        sxProps={{
          '&:disabled': {
            color: '#AAAAAA',
          },
          color: '#FF902A',
        
        }}
      >
        Download
      </ButtonWithIcon>
     
      <ModalDelete
        title='Are you sure want to delete transactions?'
        description='You will not be able to recover a deleted transactions.'
        handleDelete={onDelete}
        handleClose={toggleModal}
        open={isOpen}
      />
    </Box>
  )
}

export default ActionLeftBottom
