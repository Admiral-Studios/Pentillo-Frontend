import styled from '@emotion/styled'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
export const StyledFormTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  margin: 0;
  color: #040404;
`
export const StyledFormInputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 8px;
  row-gap: 16px;
  width: 100%;
`
export const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 12px;
`
export const StyledErrorMessage = styled.span`
  font-size: 10px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  color: #dc362e;
`
export const StyledInputWrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
`
