import { CssTextField } from '@/ui/components/styled'
import styled from '@emotion/styled'
import { Modal as BaseModal } from '@mui/base/Modal'
import { Backdrop, Dialog, IconButton } from '@mui/material'

export const StyledModal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`

export const ModalContent = styled.div`
  position: relative;
  max-width: 476px;
  width: 100%;
  padding: 24px 28px;
  border-radius: 24px;
  background: #ffffff;
`

export const StyledTypography = styled.h2`
  font-size: 24px;
  font-weight: 500;
  line-height: 29.35px;
  color: #040404;
  margin: 0;
  margin-bottom: 24px;
`

export const StyledCloseIconWrapper = styled.div`
  position: absolute;
  right: 28px;
  top: 26.5px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2efeb;
`
export const StyledModalBody = styled.div``
export const StyledModalFooter = styled.div`
  display: flex;
  column-gap: 16px;
`

export const StyledWrapper = styled.div`
  padding: 24px 0 32px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const StyledCssTextField = styled(CssTextField)`
  width: 100%;
  margin-bottom: 16px;
`
export const StyledErrorMessage = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 17.12px;
  color: #dc362e;
`

export const StyledInputWrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width ?? 'auto'};
  .react-datepicker-popper {
    z-index: 2;
  }
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 428px;
  width: 100%;
`

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
    maxWidth: '428px',
    width: '100%',
  },
  '& .MuiDialogTitle-root': {
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '48px',
    letterSpacing: '-0.03em',
    textAlign: 'center',
    color: '#2B2B2B',
    padding: 0,
  },
  '& .MuiDialogContent-root': {
    padding: '0px',
    overflow: 'visible',
  },
  '& .MuiDialogActions-root': {
    padding: '16px 0 0',
  },
}))

export const DialogDescription = styled.p``

export const DialogInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 46px;
  p {
    margin: 0;
    color: #aaaaaa;
    font-size: 14px;
  }
`
