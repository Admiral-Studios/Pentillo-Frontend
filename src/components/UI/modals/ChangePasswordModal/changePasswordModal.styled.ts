import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const StyledModalInner = styled.div`
  margin: 0 auto;
  max-width: 476px;
  width: 100%;
  border-radius: 24px;
  gap: 24px;
  background-color: #fff;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 28px 24px 28px;
  img {
    position: relative;
    transform: translateY(45%);
    cursor: pointer;
  }
`

export const StyledModalDivider = styled.div`
  height: 0.5px;
  width: 100%;
  background-color: #f2efeb;
`

export const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px 28px 24px 28px;
`
export const StyledModalFooter = styled.div`
  display: flex;
  column-gap: 16px;
`

export const StyledModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  margin: 0;
`
export const StyledModalDescription = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
`

export const StyledButton = styled(Button)<{ outlined?: boolean }>`
  width: 100%;
  max-width: 100%;
  min-height: 44px;
  padding: 12px 20px 12px 20px;
  border-radius: 8px;
  text-transform: capitalize;
`
