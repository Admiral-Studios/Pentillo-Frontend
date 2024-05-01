import styled from '@emotion/styled'
import { LoadingButton } from '@mui/lab'

export const StyledRegularButton = styled(LoadingButton)`
  height: 36px;
  border-radius: 8px;
  box-shadow: none !important;
  text-transform: none;
  line-height: inherit;
  font-family: '__gilroySans_5e5e33', '__gilroySans_Fallback_5e5e33';
  &:disabled {
    pointer-events: all;
    cursor: auto;
    background-color: rgba(0, 0, 0, 0.12);
  }
`

export const StyledRemoveButton = styled(LoadingButton)`
  min-height: 38px;
  padding: 7px 16px 7px 16px;
  border-radius: 8px;

  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.02em;

  background: #f78b26;
  text-transform: none;
  color: #fff;

  &:hover {
    background: #fc7f0b;
  }
`

export const StyledMarkButton = styled.button`
  max-height: 32px;
  min-height: 32px;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;

  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: #ff902a;
  column-gap: 12px;
  cursor: pointer;
  &:disabled {
    color: #aaaaaa;
  }
`
