import styled from '@emotion/styled'
import { Box } from '@mui/material'

const StyledContactFilterWrapper = styled(Box)`
  position: relative;
  .select__button {
    border-radius: 8px;
    background-color: transparent;
    border: 1px solid #f2efeb;
    padding-left: 16px;
    padding-right: 16px;
    min-height: 36px;
    max-height: 36px;
    display: flex;
    align-items: center;
    column-gap: 8px;
    cursor: pointer;

    font-size: 16px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    color: #424242;
  }
`

export { StyledContactFilterWrapper }
