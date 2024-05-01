import styled from '@emotion/styled'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
export const StyledFormsWrapper = styled.div`
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
  flex-direction: column;
  justify-content: space-between;
  column-gap: 16px;
  row-gap: 16px;
`

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`

export const StyledDeleteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`
export const StyledTypography = styled.p<{ color: string }>`
  margin: 0;
  color: ${({ color }) => color};
  word-break: normal;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
`
export const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 12px;
  button {
    width: 132px;
  }
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
`

export const StyledDateInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const StyledSubmitButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px
`

export const StyledSubTasksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const StyledSubTaskWrapper = styled.form`
  display: flex;
  border: 1px solid #f2efeb;
  background-color: #ffffff;
  padding: 8px;
  align-items: center;
  border-radius: 8px;
  gap: 8px;
  & p {
    max-width: 804px;
    width: 100%;
    margin: 0;
    word-break: break-all;
  }
`

export const StyledFormWrapper = styled.div`
  display: flex;
  column-gap: 12px;
  row-gap: 12px;
  align-items: end;
`

export const StyledAddSubTaskBlock = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #ffac5f;
  align-items: center;
  padding: 8px 16px;
`
