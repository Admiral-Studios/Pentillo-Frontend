import styled from '@emotion/styled'
import { Box, Modal } from '@mui/material'

export const StyledModal = styled(Modal)``

export const StyledModalWindowHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 0 28px 24px 28px;
  border-bottom: 1px solid #f2efeb;
  img {
    cursor: pointer;
  }
`

export const StyledModalWindow = styled(Box)`
  padding: 24px 0;
  border-radius: 24px;
  border: 1px solid #f2efeb;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  min-width: 300px;
`

export const StyledModalWindowBody = styled(Box)`
  padding: 24px 28px 0 28px;
`
