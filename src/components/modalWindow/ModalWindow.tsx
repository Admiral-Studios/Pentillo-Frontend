import { Box, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import crossIcon from '../../assets/icons/cross-icon.svg'
import {
  StyledModal,
  StyledModalWindow,
  StyledModalWindowBody,
  StyledModalWindowHeader,
} from './styled'

interface IModalWindow {
  open: boolean
  handleClose: () => void
  title: string
  children: ReactNode
}

export const ModalWindow = ({
  open,
  handleClose,
  title,
  children,
}: IModalWindow) => {
  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <StyledModalWindow>
        <StyledModalWindowHeader>
          <Typography component='h3' fontSize={'24px'} fontWeight={'500'}>{title}</Typography>
          <Image src={crossIcon} alt={'Cross Icon'} onClick={handleClose} />
        </StyledModalWindowHeader>
        <StyledModalWindowBody>{children}</StyledModalWindowBody>
      </StyledModalWindow>
    </StyledModal>
  )
}
