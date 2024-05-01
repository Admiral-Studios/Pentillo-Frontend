import styled from '@emotion/styled'

export const StyledList = styled.ul`
  height: fit-content;
  max-height: 100px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 100%;
    background: #FFFEF7;
  }

  &::-webkit-scrollbar-thumb {
    background: #E7E7E7;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #E7E7E7;
  }
`
