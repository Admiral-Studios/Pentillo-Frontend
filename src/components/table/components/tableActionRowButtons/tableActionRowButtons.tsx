import { Box, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import pencilIcon from '@/assets/icons/pencil-icon.svg'
import { RemoveIcon } from '@/components/UI/icons'
import ModalDelete from '@/components/UI/modals/modalDelete'
import { MouseEvent, Ref, useState } from 'react'
import ButtonDots from '@/components/UI/buttons/buttonDots'
import styled from '@emotion/styled'
import AddIcon from '@/components/UI/icons/AddIcon'
import editIcon from '@/assets/icons/edit-block-icon.svg'
import deleteIcon from '@/assets/icons/delete-block-icon.svg'

interface IActionRowButtonsProps {
  modalTitle: string
  modalDescription: string

  deleteHandler: () => void
  editHandler?: () => void
}

const TableActionRowButtons = ({
  modalTitle,
  modalDescription,
  editHandler = () => {},
  deleteHandler,
}: IActionRowButtonsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleDeleteMember = () => {
    deleteHandler()
    handleClose()
  }

  return (
    <Box sx={{ display: 'flex', gap: '16px' }}>
      <Image
        src={editIcon}
        alt='Edit icon'
        color='#424242'
        onClick={editHandler}
        style={{ cursor: 'pointer' }}
      />
      <Image
        src={deleteIcon}
        alt='Delete icon'
        color='#424242'
        onClick={handleOpen}
        style={{ cursor: 'pointer' }}
      />

      <ModalDelete
        title={modalTitle}
        description={modalDescription}
        open={isOpen}
        handleClose={handleClose}
        handleDelete={handleDeleteMember}
      />
    </Box>
  )
}

const StyledMenu = styled(Menu)<{ isTask?: boolean }>`
  .MuiPaper-root {
    max-width: ${(props) => (props.isTask ? '150px' : 'fit-content')};
    width: 100%;
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    padding: 8px 0px 8px 0px;
    box-shadow: 10px 4px 40px 0px #e0e9f380;
  }
  .MuiList-root {
    padding: 0;
  }
  .MuiButtonBase-root {
    display: flex;
    column-gap: 11.68px;
    align-items: center;
    &:hover {
      background-color: #fffbf699;
    }
  }

  a {
    display: contents;
  }
`

const StyledTypography = styled.p<{ color: string }>`
  margin: 0;
  color: ${({ color }) => color};

  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`

const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`

export default TableActionRowButtons
