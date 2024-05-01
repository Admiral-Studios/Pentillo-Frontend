import { StyledButton } from '@/components/newUI/buttons/buttons.styled'
import styled from '@emotion/styled'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  padding-bottom: 32px;
`

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const StyledButtonWrapper = styled.div`
  display: flex;
  column-gap: 16px;
`
export const StyledList = styled.div<{ isAgentsSection?: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, 269px);
  align-items: ${({ isAgentsSection }) =>
    isAgentsSection ? 'flex-start' : 'normal'};
  column-gap: 16px;
  margin-top: 16px;
`

export const StyledButtonFooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 12px;
`

export const StyledButtonCreate = styled(StyledButton)`
  min-width: 145px;
  width: auto;
  min-height: 44px;
  padding: 13px 16px 13px 16px;
  border-radius: 8px;
  column-gap: 14.7px;
  align-self: start;
  align-items: center;

  &:disabled {
    background-color: #aaaaaa;
    border-color: #aaaaaa;
    pointer-events: none;
    touch-action: none;
  }
`
