import styled from '@emotion/styled'

export const StyledWrapper = styled.div`
  display: flex;
  row-gap: 16px;
  flex-direction: column;
  align-items: flex-end;
`
export const StyledContentHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`
export const StyledContentWrapper = styled.div<{ isAgentsSection?: boolean }>`
  padding: 16px;
  border-radius: 16px;
  box-shadow: 10px 4px 40px 0px #e0e9f380;
  background: #ffffff;

  .content {
    display: grid;
    grid-template-columns: repeat(4, 269px);
    align-items: ${({ isAgentsSection }) =>
      isAgentsSection ? 'flex-start' : 'normal'};
    column-gap: 16px;
  }
`
export const StyledBuyersAndSellersSide = styled.div``
export const StyledAgentsSide = styled.div``
