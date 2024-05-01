import styled from '@emotion/styled'
import { Box } from '@mui/material'

const StyledTaskFilterWrapper = styled(Box)`
  position: relative;
  .select__button {
    border-radius: 8px;
    background-color: transparent;
    border: 1px solid #f2efeb;
    padding-left: 16px;
    padding-right: 16px;
    min-height: 32px;
    max-height: 32px;
    display: flex;
    align-items: center;
    column-gap: 15.68px;

    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    color: #AAAAAA;
  }
`

export { StyledTaskFilterWrapper }
