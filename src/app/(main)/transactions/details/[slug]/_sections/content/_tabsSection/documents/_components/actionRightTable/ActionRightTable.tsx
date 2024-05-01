import plusIcon from '@/assets/icons/plus-icon.svg'
import listIcon from '@/assets/icons/task-list-icon.svg'
import { StyledButtonRegular } from '@/components/UI/buttons/button.styled'
import AddFileModal from '@/components/UI/modals/addFileModal'
import ListModal from '@/components/UI/modals/listModal/ListModal'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { StyledRegularTooltip } from '@/components/UI/toaltips/toaltip.styled'
import { TYPE } from '@/types/enum'
import { StyledLoadingButton } from '@/ui/components/styled'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface IActionRightTableProps {
  listsOptions: IOption[]
  selectValue: string
  fileName: string
  file?: File | null
  notesValue: string
  validateFileError: string
  transactionId: string
  isModalUploadOpen: boolean
  isDisabledSaveButtonModalFile: boolean
  handleModalUploadClose: () => void
  handleModalUploadOpen: () => void
  handleSelectChange: (value: string) => void
  handleFile?: (file: File | null) => void
  handleChangeFileName: (fileName: string) => void
  onChangeNotes: (notes: string) => void
  handleSaveFile: () => void
}

const ActionRightTable = ({
  listsOptions,
  selectValue,
  file,
  fileName,
  notesValue,
  validateFileError,
  transactionId,
  isModalUploadOpen,
  isDisabledSaveButtonModalFile,
  handleModalUploadClose,
  handleModalUploadOpen,
  handleSelectChange,
  handleFile,
  handleChangeFileName,
  onChangeNotes,
  handleSaveFile,
}: IActionRightTableProps) => {
  const [isPopoverVisible, setVisible] = useState(false)

  const anchorRef = useRef<HTMLButtonElement | null>(null)

  const handleModal = () => {
    setVisible((prev) => !prev)
  }

  return (
    <StyledWrapper>
      <StyledLoadingButton
        variant='contained'
        sx={{
          color: '#AAAAAA',
          maxHeight: '32px',
          fontSize: '14px !important',
          px: '21px !important',
          columnGap: '12px',
          maxWidth: '120px',
          background: '#FFFFFF',
          border: '1px solid #F2EFEB',
          padding: '8px 16px !important',
          '&:hover': {
            background: '#FFFFFF',
          },
        }}
        onClick={handleModal}
        ref={anchorRef}
      >
        <Image src={listIcon} alt='List icon' />
        Add List
      </StyledLoadingButton>
      <ListModal
        anchorRef={anchorRef}
        isOpen={isPopoverVisible}
        setOpenHandler={setVisible}
        transactionId={transactionId as string}
        type={TYPE.DOCUMENTS}
      />
      <StyledRegularTooltip
        disableHoverListener={Boolean(listsOptions.length)}
        arrow
        title="You can't add a file without having a list."
      >
        <StyledButtonRegular
          disabled={!Boolean(listsOptions.length)}
          onClick={handleModalUploadOpen}
        >
          <Image src={plusIcon} alt='Plus icon' />
          Add File
        </StyledButtonRegular>
      </StyledRegularTooltip>
      <AddFileModal
        isDisabledSaveButton={isDisabledSaveButtonModalFile}
        validateFileError={validateFileError}
        notesValue={notesValue}
        onChangeNotes={onChangeNotes}
        fileName={fileName}
        handleChangeFileName={handleChangeFileName}
        file={file}
        handleFile={handleFile}
        selectValue={selectValue}
        handleSelectChange={handleSelectChange}
        listsOptions={listsOptions}
        handleClose={handleModalUploadClose}
        open={isModalUploadOpen}
        handleSaveFile={handleSaveFile}
      />
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`

export default ActionRightTable
