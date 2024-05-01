import styled from '@emotion/styled'
import { Modal as BaseModal } from '@mui/base/Modal'
import { Backdrop } from '@mui/material'

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
