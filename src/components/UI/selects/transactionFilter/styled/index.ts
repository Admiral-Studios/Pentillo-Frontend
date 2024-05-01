import styled from '@emotion/styled'
import { Box } from '@mui/material'

const StyledTransactionFilterWrapper = styled(Box)<{ isOpen?: boolean }>`
  position: relative;
  .select__button {
    border-radius: 8px;
    background-color: transparent;
    border: ${({ isOpen }) =>
      isOpen ? '1px solid #717171' : '1px solid #F2EFEB'};
    padding: 8px 20px;
    min-height: 36px;
    max-height: 36px;
    display: flex;
    align-items: center;
    column-gap: 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    color: ${({ isOpen }) => (isOpen ? '#717171' : '#424242')};
    cursor: pointer;
  }
`

export { StyledTransactionFilterWrapper }
