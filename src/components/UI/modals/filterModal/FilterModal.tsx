import { ReactNode } from 'react'
import { StyledButton } from '@/components/newUI/buttons/buttons.styled'
import { StyledDialog, StyledDialogCloseButton } from './filterModal.styled'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Box, SxProps, Typography } from '@mui/material'
import CloseIcon from '@/ui/icons/CloseIcon'

interface IFilterModalProps {
  open: boolean
  modalName?: string
  children: ReactNode
  handleClose?: () => void
  handleSelect?: () => void
  handleReset?: () => void
  sxProps?: SxProps,
  selectButtonText?: string
}

const FilterModal = ({
  open,
  modalName,
  children,
  handleClose,
  handleSelect,
  handleReset,
  sxProps,
  selectButtonText = 'Select filter'
}: IFilterModalProps) => {
  return (
    <StyledDialog open={open} onClose={handleClose} scroll='body'>
      <DialogTitle id='customized-dialog-title'>
        {modalName || 'Filter'}
      </DialogTitle>
      <StyledDialogCloseButton onClick={handleClose}>
        <CloseIcon />
      </StyledDialogCloseButton>

      <DialogContent sx={{...sxProps}}>{children}</DialogContent>
      <DialogActions>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', width: '100%'}}>
        <StyledButton style={{fontWeight: 500, fontSize: '20px', fontFamily: '__gilroySans_5e5e33, __gilroySans_Fallback_5e5e33'}} onClick={handleSelect}>{selectButtonText}</StyledButton>
        <StyledButton style={{backgroundColor: '#FEF1E6', color: '#FF902A', border: '1px solid transparent', fontWeight: 500, fontSize: '20px', fontFamily: '__gilroySans_5e5e33, __gilroySans_Fallback_5e5e33'}} onClick={handleReset}>Reset filter</StyledButton>
        </Box>
      </DialogActions>
    </StyledDialog>
  )
}

export default FilterModal
