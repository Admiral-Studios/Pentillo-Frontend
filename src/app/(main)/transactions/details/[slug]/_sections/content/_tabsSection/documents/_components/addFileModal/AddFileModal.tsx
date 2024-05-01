import Image from 'next/image'
import {
  ModalContent,
  StyledBackdrop,
  StyledCloseIconWrapper,
  StyledModal,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
  StyledTypography,
} from './addFileModal.styled'
import closeIcon from '@/assets/icons/close-modal-icon.svg'
import { TabContext, TabPanel } from '@mui/lab'
import { ITab, StyledTab, StyledTabs } from '@/components/UI/tabs/tabs.styled'
import { SyntheticEvent, useState } from 'react'
import File from './_tabContent/file'
import styled from '@emotion/styled'
import { StyledButton } from '@/components/newUI/buttons/buttons.styled'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import Notes from './_tabContent/notes'
import { IFile } from '@/data/api/api.types'

interface IAddFileModalProps {
  open: boolean
  listsOptions: IOption[]
  selectValue: string
  fileName: string
  notesValue: string
  validateFileError: string
  isDisabledSaveButton: boolean
  file?: File | IFile | null
  modalName?: string
  tabActive?: string
  handleClose: () => void
  handleSelectChange: (value: string) => void
  handleFile?: (files: File | null) => void
  handleChangeFileName: (fileName: string) => void
  onChangeNotes: (notes: string) => void
  handleSaveFile: () => void
}

const AddFileModal = ({
  modalName,
  open,
  listsOptions,
  selectValue,
  file,
  fileName,
  notesValue,
  validateFileError,
  isDisabledSaveButton,
  tabActive = '1',
  handleClose,
  handleSelectChange,
  handleFile,
  handleChangeFileName,
  onChangeNotes,
  handleSaveFile,
}: IAddFileModalProps) => {
  const [value, setValue] = useState<string>(tabActive)
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const tabs: ITab[] = [
    {
      label: 'File',
      value: '1',
      tabContent: (
        <File
          validateFileError={validateFileError}
          fileName={fileName}
          handleChangeFileName={handleChangeFileName}
          file={file as File}
          handleFile={handleFile}
          listsOptions={listsOptions}
          onSelectChange={handleSelectChange}
          selectValue={selectValue}
        />
      ),
    },
    {
      label: 'Notes',
      value: '2',
      tabContent: (
        <Notes notesValue={notesValue} onChangeNotes={onChangeNotes} />
      ),
    },
  ]

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent>
        <StyledModalHeader>
          <StyledTypography>{modalName || 'File Setup'}</StyledTypography>
          <StyledCloseIconWrapper onClick={handleClose}>
            <Image src={closeIcon} alt='close icon' />
          </StyledCloseIconWrapper>
        </StyledModalHeader>
        <StyledModalBody>
          <TabContext value={value}>
            <StyledTabs
              sx={{ px: '0!important' }}
              value={value}
              onChange={handleChange}
              aria-label='lab API tabs example'
            >
              {tabs.map((tab) => (
                <StyledTab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </StyledTabs>
            {tabs.map((tab) => (
              <StyledPanel key={tab.value} value={tab.value}>
                {tab.tabContent}
              </StyledPanel>
            ))}
          </TabContext>
        </StyledModalBody>
        <StyledModalFooter>
          <StyledButton onClick={handleClose} outlined>
            Cancel
          </StyledButton>
          <StyledButton
            disabled={isDisabledSaveButton}
            onClick={handleSaveFile}
          >
            Save
          </StyledButton>
        </StyledModalFooter>
      </ModalContent>
    </StyledModal>
  )
}

const StyledPanel = styled(TabPanel)`
  padding: 16px 0 26px 0;
`

export default AddFileModal
