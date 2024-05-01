import styled from '@emotion/styled'
import { TextField } from '@mui/material'

export const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    height: 52px;
  }
  & .MuiFormLabel-root {
    display: none;
    transform: translate(14px, 14px) scale(1);
    &.Mui-focused {
      transform: translate(14px, -9px) scale(0.75);
    }
  }
  .MuiOutlinedInput-root {
    box-shadow: 0px 1px 2px 0px #1018280d;
    & input {
      padding: 14.5px 14px;
    }
    & fieldset {
      border-color: #d0d5dd3d;
    }
    &:hover fieldset {
      border-color: #d0d5dd3d !important;
    }
    &.Mui-focused fieldset {
      border-color: #d0d5dd3d;
    }
  }
`
