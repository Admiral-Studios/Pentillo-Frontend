import styled from '@emotion/styled'

const StyledForm = styled.form`
  box-shadow: 10px 4px 40px 0px #e0e9f380;
  background-color: #fff;
  border-radius: 16px;
  padding: 12px 16px 12px 16px;
`
const StyledGridWrapper = styled.div`
  background-color: #fff;
  display: grid;
  grid-template-columns: minmax(320px, 825px) minmax(320px, 335px);
  column-gap: 12px;
`
const StyledFormTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  margin: 0;
  margin-bottom: 12px;
`
const StyledFormInputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 8px;
  row-gap: 10px;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 12px;
  margin-top: 12px;
`
const StyledErrorMessage = styled.span`
  font-size: 10px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  color: #dc362e;
`
const StyledInputWrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || '100%'};
  .react-datepicker-popper {
    z-index: 2;
  }
`

export {
  StyledButtonsWrapper,
  StyledErrorMessage,
  StyledForm,
  StyledFormInputsWrapper,
  StyledFormTitle,
  StyledGridWrapper,
  StyledInputWrapper,
}
