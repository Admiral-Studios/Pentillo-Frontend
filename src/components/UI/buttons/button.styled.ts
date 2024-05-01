import styled from '@emotion/styled'

export const StyledButtonRegular = styled.button`
  min-width: 132px;
  height: 32px;
  padding: 8px 16px 8px 16px;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 400;
  line-height: 17.12px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  background: #ff902a;
  border: 1px solid #ff902a;
  color: #ffffff;
  cursor: pointer;
  justify-content: center;

  &:disabled {
    background-color: #aaaaaa;
    border-color: #aaaaaa;
    cursor: auto;
  }
`
