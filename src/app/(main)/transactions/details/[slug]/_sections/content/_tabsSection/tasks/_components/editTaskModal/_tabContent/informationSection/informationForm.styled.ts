import styled from '@emotion/styled'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const StyledAssignedPersonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 319px;
  width: 100%;
`

export const StyledFormTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  margin: 0;
  color: #040404;
`

export const StyledFormWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`
export const StyledFormInputsWrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  max-height: 334px;
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
  width: ${(props) => props.width ?? 'auto'};
  .react-datepicker-popper {
    z-index: 2;
  }
`

export const StyledListWrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width ?? 'auto'};
  gap: 20px;
  .react-datepicker-popper {
    z-index: 2;
  }
`
