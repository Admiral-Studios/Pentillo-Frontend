import { CssTextField } from '@/ui/components/styled'
import styled from '@emotion/styled'

interface INotesProps {
  notesValue: string
  onChangeNotes: (notes: string) => void
}

const Notes = ({ notesValue, onChangeNotes }: INotesProps) => {
  return (
    <StyledWrapper>
      <StyledCssTextField
        focused
        multiline
        rows={4}
        label='Notes'
        value={notesValue}
        onChange={(event) => onChangeNotes(event.target.value)}
      />
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div``
const StyledCssTextField = styled(CssTextField)`
  width: 100%;
  & .MuiInputBase-input {
    padding: 0;
  }
`

export default Notes
