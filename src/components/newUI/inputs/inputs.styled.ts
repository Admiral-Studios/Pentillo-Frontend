import styled from '@emotion/styled'

export const StyledInput = styled.input`
  border: 1px solid #d0d5dd3d;
  color: #040404;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  border-radius: 8px;
  min-height: 52px;
  padding: 12px 16px;

  &:disabled {
    background-color: #f3f5f7 !important;

    &::placeholder {
      color: #717171;
    }
  }
`
