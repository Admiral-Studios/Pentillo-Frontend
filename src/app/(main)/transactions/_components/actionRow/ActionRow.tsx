import { IActionRowProps } from '@/app/(main)/transactions/transaction.types'
import { Box } from '@mui/material'
import Image from 'next/image'
import pencilIcon from '@/assets/icons/pencil-icon.svg'
import { RemoveIcon } from '@/components/UI/icons'
import ModalDelete from '@/components/UI/modals/modalDelete'
import { MouseEvent, useState } from 'react'
import { useDeleteTransaction } from '@/data/hooks/transaction'
import { useQueryClient } from '@tanstack/react-query'
import { transactionKeys } from '@/data/queryKeys'
import toast from 'react-hot-toast'
import Link from 'next/link'
import ButtonDots from '@/components/UI/buttons/buttonDots'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import styled from '@emotion/styled'
import {
  StyledIconWrapper,
  StyledMenu,
  StyledMenuTypography,
} from '@/components/UI/menu/menu.styled'

const ActionRow = ({ transactionId, modalName }: IActionRowProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [transactionKeys.all],
    })

    toast.success(`The transaction was successfully deleted.`, {
      style: { maxWidth: '600px' },
    })

    handleClose()
  }

  const { mutate: deleteTransaction } = useDeleteTransaction({
    onSuccess: onDeleteSuccess,
  })

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  const handleDelete = () => {
    deleteTransaction({ ids: [transactionId] })
  }

  return (
    <Box sx={{ display: 'flex', a: { textDecoration: 'none' } }}>
      <ButtonDots onClick={handleClick} />

      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <Link href={`/transactions/details/${transactionId}`}>
          <MenuItem color='#424242' onClick={handleCloseMenu}>
            <StyledIconWrapper>
              <Image src={pencilIcon} alt='pencil icon' />
            </StyledIconWrapper>
            <StyledMenuTypography color='#2B2B2B'>Edit</StyledMenuTypography>
          </MenuItem>
        </Link>

        <MenuItem
          onClick={() => {
            handleOpen()
            handleCloseMenu()
          }}
        >
          <StyledIconWrapper>
            <RemoveIcon sx={{ path: { fill: '#E46962' }, fontSize: '20px' }} />
          </StyledIconWrapper>
          <StyledMenuTypography color='#E46962'>Delete</StyledMenuTypography>
        </MenuItem>
      </StyledMenu>

      <ModalDelete
        title={`Are you sure want to delete transaction?`}
        description='You will not be able to recover a deleted transaction.'
        open={isOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Box>
  )
}

export default ActionRow
