import styled from '@emotion/styled'
import Menu from '@mui/material/Menu'

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    max-width: 120px;
    width: 100%;
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    padding: 8px 0px 8px 0px;
    box-shadow: 10px 4px 40px 0px #e0e9f380;
  }
  .MuiList-root {
    padding: 0;
  }
  .MuiButtonBase-root {
    display: flex;
    column-gap: 11.68px;
    align-items: center;
    &:hover {
      background-color: #fffbf699;
    }
  }

  a {
    display: contents;
  }
`

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`

export const StyledMenuTypography = styled.p<{ color: string }>`
  margin: 0;
  color: ${({ color }) => color};

  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`
