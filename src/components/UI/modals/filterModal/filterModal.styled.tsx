import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'

export const StyledDialogCloseButton = styled(IconButton)`
  border: 2px solid #d0d0d0;
  border-radius: 50%;
  position: absolute;
  top: 32px;
  right: 32px;
  svg {
    transform: scale(0.8);
  }
`

export const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    padding: '32px',
    backgroundColor: '#FFFFFF',
    overflow: 'visible',
    borderRadius: '12px'
  },
  '& .MuiDialogTitle-root': {
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '48px',
    letterSpacing: '-0.03em',
    textAlign: 'center',
    color: '#2B2B2B',
    padding: '46px 0 32px',
  },
  '& .MuiDialogContent-root': {
    padding: '0px',
    overflow: 'visible',
  },
  '& .MuiDialogActions-root': {
    padding: '16px 0 0',
  },
}))
