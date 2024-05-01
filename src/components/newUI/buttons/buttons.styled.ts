import styled from '@emotion/styled'

export const StyledButton = styled.button<{ outlined?: boolean }>`
  width: 100%;
  min-height: 52px;
  padding: 13px 24px 13px 24px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ outlined }) => (outlined ? 'transparent' : '#f78b26')};
  border: 1px solid #f78b26;
  cursor: pointer;
  font-family: '__gilroySans_5e5e33', '__gilroySans_Fallback_5e5e33';
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: ${({ outlined }) => (outlined ? '#f78b26' : '#ffffff')};
  &:disabled {
    background-color: #aaaaaa;
    border-color: #aaaaaa;
    cursor: auto;
  }
`
