import { useRef, useState } from 'react'
import {
  StyledButtonIsNotFile,
  StyledIsFileList,
  StyledIsFileListItem,
  StyledIsFileWrapper,
  StyledIsNotFileWrapper,
  StyledTypographyIsNotFile,
  StyledUploadFileInput,
  StyledUploadFileLabel,
  StyledUploadFileWrapper,
} from './uploadFile.styled'
import uploadIcon from '@/assets/icons/upload-icon.svg'
import Image from 'next/image'
import { formatBytes } from '@/utils/formatBytes'
import documentIcon from '@/assets/icons/documents-icon.svg'
import deleteIcon from '@/assets/icons/delete-icon-2.svg'
import { StyledRegularTooltip } from '../../toaltips/toaltip.styled'
import { Box } from '@mui/material'

interface IUploadFileProps {
  name?: string
  id?: string
  accept?: string
  label?: string
  file?: File | null
  handleFile?: (files: File | null) => void
}

const UploadFile = ({
  name,
  id,
  accept,
  label,
  file,
  handleFile,
}: IUploadFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpenUploadMenu = () => {
    inputRef.current?.click()
  }

  return (
    <StyledUploadFileWrapper>
      <StyledUploadFileInput
        ref={inputRef}
        accept={accept}
        type='file'
        name={name}
        id={id}
        onChange={(event) =>
          handleFile &&
          handleFile(event.target.files ? event.target.files[0] : null)
        }
        hidden
      />

      {file ? (
        <IsFile
          handleFile={handleFile}
          handleOpenUploadMenu={handleOpenUploadMenu}
          file={file}
        />
      ) : (
        <IsNotFile handleOpenUploadMenu={handleOpenUploadMenu} />
      )}
    </StyledUploadFileWrapper>
  )
}

interface IIsFileProps {
  file: File
  handleFile?: (files: File | null) => void
  handleOpenUploadMenu: () => void
}
const IsFile = ({ file, handleOpenUploadMenu, handleFile }: IIsFileProps) => {
  return (
    <StyledIsFileListItem key={file.name}>
      <Box sx={{ display: 'flex', gap: '16px', alignItems: ' center' }}>
        <Image src={documentIcon} height={40} width={40} alt='Document Icon' />
        <div className='text-wrapper'>
          <h3>{file.name}</h3> <span>{formatBytes(file.size)}</span>
        </div>
      </Box>

        <Image src={deleteIcon} alt='delete icon'  className='image-wrapper'  onClick={() => handleFile && handleFile(null)}/>

    </StyledIsFileListItem>
  )
}
interface IIsNotFileProps {
  handleOpenUploadMenu: () => void
}
const IsNotFile = ({ handleOpenUploadMenu }: IIsNotFileProps) => {
  return (
    <StyledIsNotFileWrapper onClick={handleOpenUploadMenu}>
      <Image width={52} height={52} src={uploadIcon} alt='upload icon' />
      <StyledTypographyIsNotFile>
        Select please a file to import
      </StyledTypographyIsNotFile>
      <StyledButtonIsNotFile>or drag and drop it here</StyledButtonIsNotFile>
    </StyledIsNotFileWrapper>
  )
}

export default UploadFile
