import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const StyledModalInner = styled.div`
  margin: 0 auto;
  max-width: 482px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  background-color: #fff;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  padding-bottom: 14px;
`
export const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 32px;
`
export const StyledModalFooter = styled.div`
  display: flex;
  column-gap: 16px;
`

export const StyledModalTitle = styled.h3`
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -3%;
  margin: 0;
  text-align: center;
  color: #2B2B2B;
`
export const StyledModalDescription = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -2%;
  text-align: center;
  margin: 0;
  color: #AAAAAA;
`

export const StyledButton = styled(Button)<{ outlined?: boolean }>`
  width: 100%;
  max-width: 100%;
  min-height: 44px;
  padding: 12px 20px 12px 20px;
  border-radius: 8px;
  text-transform: capitalize;
`
