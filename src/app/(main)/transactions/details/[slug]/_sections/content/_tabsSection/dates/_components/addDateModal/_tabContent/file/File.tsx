import SelectRegular from '@/components/UI/selects/selectRegular'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import UploadFile from '@/components/UI/upload/uploadFile'
import { CssTextField } from '@/ui/components/styled'
import styled from '@emotion/styled'

interface IFileProps {
  selectValue: string
  listsOptions: IOption[]
  file?: File | null
  fileName: string
  validateFileError: string
  onSelectChange: (value: string) => void
  handleFile?: (files: File | null) => void
  handleChangeFileName: (fileName: string) => void
}

const File = ({
  selectValue,
  listsOptions,
  file,
  fileName,
  validateFileError,
  onSelectChange,
  handleFile,
  handleChangeFileName,
}: IFileProps) => {
  return (
    <StyledWrapper>
      <SelectRegular
        value={selectValue}
        onChange={(event) => onSelectChange(event.target.value)}
        label='Select List'
        sxFormControl={{ mb: '16px!important' }}
        options={listsOptions}
      />

        <StyledCssTextField
          focused
          label='Rename file'
          value={fileName}
          onChange={(event) => handleChangeFileName(event.target.value)}
        />
      {validateFileError && (
        <StyledErrorMessage>{validateFileError}</StyledErrorMessage>
      )}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div``
const StyledCssTextField = styled(CssTextField)`
  width: 100%;
  margin-bottom: 16px;
`
const StyledErrorMessage = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 17.12px;
  color: #aaaaaa;
`

export default File
