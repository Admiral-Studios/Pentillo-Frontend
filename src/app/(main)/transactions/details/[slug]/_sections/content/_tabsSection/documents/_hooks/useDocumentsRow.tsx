import pencilIcon from '@/assets/icons/pencil-icon.svg'
import pencilNoteIcon from '@/assets/icons/pencil-note-icon.svg'
import ButtonDots from '@/components/UI/buttons/buttonDots'
import { StyledRegularButton } from '@/components/UI/buttons/buttonRegular'
import { RemoveIcon } from '@/components/UI/icons'
import {
  StyledIconWrapper,
  StyledMenu,
  StyledMenuTypography,
} from '@/components/UI/menu/menu.styled'
import ModalDelete from '@/components/UI/modals/modalDelete'
import {
  getAllDocumentsForDownload,
  getDocumentsByIdsForDownload,
} from '@/data/api/documents'
import {
  useDeleteDocumentByIds,
  useDocumentByListId,
  useUpdateDocument,
  useUploadDocument,
} from '@/data/hooks/documents'
import { useDeleteList, useList } from '@/data/hooks/list'
import { listKeys } from '@/data/queryKeys'
import { TYPE } from '@/types/enum'
import { DownloadIcon } from '@/ui/icons/DownloadIcon'
import styled from '@emotion/styled'
import { Box, Checkbox, MenuItem } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { trimFileExtension } from '@/utils/trimFileExtension'
import { allowedMimeTypes } from '@/utils/constants/allowedMimeTypes'
import { getExtension } from '@/utils/getExtension'
import {
  IFile,
  IUpdateDocumentBody,
  IUploadDocumentBody,
} from '@/data/api/api.types'
import { StyledRegularTooltip } from '@/components/UI/toaltips/toaltip.styled'
import ListSettings from '@/components/UI/buttons/listSettings'
import AddFileModal from '@/components/UI/modals/addFileModal'

const useDocumentsRow = ({ listId }: { listId: string }) => {
  const queryClient = useQueryClient()

  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const isSelectedDocuments = Boolean(selectedDocuments.length)

  const detailsDocumentData = useDocumentByListId({
    type: TYPE.DOCUMENTS,
    listId: listId,
  })
  const { mutate: deleteList } = useDeleteList({})

  const handleDeleteList = (id: string) => {
    deleteList(id, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: [listKeys.all],
        })
        toast.success('The list was successfully deleted.', {
          style: { maxWidth: '600px' },
        })
      },
    })
  }

  const { mutate: deleteDocumentByIds, isSuccess: isSuccessDeleteDocument } =
    useDeleteDocumentByIds()

  const handleSelectRow = (id: string) => {
    setSelectedDocuments((prevStateIds) => {
      const isIdInSelectedList = prevStateIds.indexOf(id) !== -1

      if (isIdInSelectedList) {
        return prevStateIds.filter((prevStateId) => prevStateId !== id)
      }

      return [...prevStateIds, id]
    })
  }

  const onRefetch = () => {
    detailsDocumentData.refetch()
  }

  const handleDeleteFileById = (ids: string[]) => {
    deleteDocumentByIds(ids)
  }

  const handleDeleteSelectedFiles = () => {
    deleteDocumentByIds(selectedDocuments)
    setSelectedDocuments([])
  }

  const handleDownloadAll = async () => {
    await getAllDocumentsForDownload(listId)
  }

  const handleDownloadSelectedDocumnets = async () => {
    await getDocumentsByIdsForDownload(listId, selectedDocuments)
  }

  const handleDownloadFileById = async (id: string) => {
    await getDocumentsByIdsForDownload(listId, [id])
  }

  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      detailsDocumentData &&
      detailsDocumentData.data &&
      detailsDocumentData.data
    ) {
      if (event.target.checked) {
        setSelectedDocuments(
          detailsDocumentData.data?.map((document) => document.id),
        )
        setIsCheckAll(true)
      } else {
        setSelectedDocuments([])
        setIsCheckAll(false)
      }
    }
  }

  const documentsTableData = useMemo(() => {
    let rows: IRows[] = []
    let columns = [
      {
        field: 'document',
        headerName: 'Document',
        width: 600,
        isSorted: true,
        sortBy: false,
        sortOrder: 'desc',
        sortName: 'document',
      },
      {
        field: 'owner',
        headerName: 'Owner',
        width: 180,
        isSorted: true,
        sortBy: false,
        sortOrder: 'desc',
        sortName: 'owner',
      },
      {
        field: 'date',
        headerName: 'Date',
        width: 150,
        isSorted: true,
        sortBy: false,
        sortOrder: 'desc',
        sortName: 'date',
      },
      {
        field: 'actions',
        headerName: '',
        width: 140
      },
    ]

    if (detailsDocumentData && detailsDocumentData.data) {
      const documentsList = detailsDocumentData.data

      rows =
        documentsList?.map((file): IRows => {
          const isActive = selectedDocuments.indexOf(file.id) !== -1

          return {
            document: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={isActive}
                  onChange={() => handleSelectRow(file.id)}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flex: '1',
                  }}
                >
                  <StyledRegularTooltip arrow title={file.name}>
                    <StyledTypography isTitle>{file.name}</StyledTypography>
                  </StyledRegularTooltip>
                  <NotesColumn file={file} refetch={onRefetch} />
                </Box>
              </Box>
            ),
            owner: (
              <StyledTypography>{getAgentName(file.user)}</StyledTypography>
            ),
            date: (
              <StyledTypography>
                {new Date(file.createdAt).toDateString()}
              </StyledTypography>
            ),
            actions: (
              <ActionRow
                file={file}
                handleDelete={() => handleDeleteFileById([file.id])}
                handleDownloadFile={() => handleDownloadFileById(file.id)}
                refetch={onRefetch}
              />
            ),
            isActive,
          }
        }) || []
    }

    return { rows, columns }
  }, [
    detailsDocumentData,
    selectedDocuments,
    onRefetch,
    handleDeleteFileById,
    handleDownloadFileById,
  ])

  return {
    rows: documentsTableData.rows,
    columns: documentsTableData.columns,
    isLoading: detailsDocumentData.isLoading,
    isCheckAll,
    isSelectedDocuments,
    isSuccessDeleteDocument,
    handleDownloadSelectedDocumnets,
    handleCheckAll,
    handleDownloadAll,
    refetch: onRefetch,
    handleDeleteSelectedFiles,
    handleDeleteList,
  }
}

interface INotesColumnProps {
  file: IFile
  refetch: () => void
}

const NotesColumn = ({ file, refetch }: INotesColumnProps) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)

  const toggleModalEdit = () => {
    setIsOpenEditModal((prevState) => !prevState)
  }

  return (
    <>
      <StyledRegularButton
        onClick={toggleModalEdit}
        variant='outlined'
        sx={{ gap: '12px', marginRight: '32px' }}
      >
        <Image src={pencilNoteIcon} alt='Pencil Icon' /> Note
      </StyledRegularButton>
      <EditFileModalWrapper
        key={JSON.stringify(file)}
        file={file}
        isOpenEditModal={isOpenEditModal}
        toggleModalEdit={toggleModalEdit}
        refetch={refetch}
        tabActive='2'
      />
    </>
  )
}

const StyledTypography = styled.p<{ isTitle?: boolean; color?: string }>`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: inherit;
  color: #040404;
  padding: 0;

  max-width: 425px;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ isTitle }) =>
    isTitle &&
    `
    padding: 4px 16px;
    background: #FFFEF7;
    color: #424242;
  `}
`

interface IActionRowProps {
  file: IFile
  handleDelete: () => void
  handleDownloadFile: () => void
  refetch: () => void
}

const ActionRow = ({
  file,
  handleDelete,
  handleDownloadFile,
  refetch,
}: IActionRowProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const onDelete = () => {
    handleDelete()
    handleClose()
  }

  const toggleModalEdit = () => {
    setIsOpenEditModal((prevState) => !prevState)
  }

  return (
    <Box
      sx={{ display: 'flex', columnGap: '40px', justifyContent: 'flex-end' }}
    >
      <StyledRegularButton
        onClick={handleDownloadFile}
        sx={{ columnGap: '12px' }}
      >
        <DownloadIcon fontSize='inherit' sx={{ path: { fill: '#FF902A' } }} />{' '}
        Download
      </StyledRegularButton>

      <ListSettings onClick={handleClick} />
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem color='#424242' onClick={toggleModalEdit}>
          <StyledIconWrapper>
            <Image src={pencilIcon} alt='pencil icon' />
          </StyledIconWrapper>
          <StyledMenuTypography color='#2B2B2B'>Edit</StyledMenuTypography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleOpen()
            handleCloseMenu()
          }}
        >
          <StyledIconWrapper>
            <RemoveIcon sx={{ path: { fill: '#E46962' }, fontSize: '20px' }} />
          </StyledIconWrapper>
          <StyledMenuTypography color='#E46962'>Delete</StyledMenuTypography>
        </MenuItem>
      </StyledMenu>

      <ModalDelete
        title={`Are you sure want to delete document?`}
        description='You will not be able to recover a deleted document.'
        open={isOpen}
        handleClose={handleClose}
        handleDelete={onDelete}
      />

      <EditFileModalWrapper
        key={JSON.stringify(file)}
        file={file}
        isOpenEditModal={isOpenEditModal}
        toggleModalEdit={toggleModalEdit}
        refetch={refetch}
      />
    </Box>
  )
}

const getAgentName = (agent?: { firstName: string; lastName: string }) => {
  if (agent) {
    return agent.firstName + ' ' + agent.lastName
  }
  return ''
}

interface IEditFileModalWrapperProps {
  file: IFile
  isOpenEditModal: boolean
  tabActive?: string
  toggleModalEdit: () => void
  refetch: () => void
}

const EditFileModalWrapper = ({
  file,
  isOpenEditModal,
  tabActive,
  toggleModalEdit,
  refetch,
}: IEditFileModalWrapperProps) => {
  const [defaultFile, setDefaultFile] = useState<IFile>(file)
  const [notesValue, setNotesValue] = useState<string>(file.note)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>(file.name)
  const [validateFileError, setValidateFileError] = useState<string>('')
  const [selectValue, setSelectValue] = useState<string>(file.listId as string)
  const handleSelectChange = (value: string) => setSelectValue(value)

  const listData = useList({
    type: TYPE.DOCUMENTS,
  })

  const listsOptions: IOption[] =
    listData.data?.data?.map((list) => ({ name: list.name, value: list.id })) ||
    []

  const updateFile = useUpdateDocument(file.id)

  const handleFile = (file: File | null) => {
    setValidateFileError('')

    if (file) {
      if (allowedMimeTypes.indexOf(file.type) !== -1) {
        setSelectedFile(file)
        setFileName(trimFileExtension(file.name))
      } else {
        setValidateFileError('Invalid file type.')
      }
    } else {
      setSelectedFile(null)
    }
  }
  const handleChangeFileName = (fileName: string) => {
    setFileName(fileName)
  }

  const onChangeNotes = (notes: string) => setNotesValue(notes)
  const handleSaveFile = () => {
    const formData = new FormData()
    const fields: IUpdateDocumentBody = {
      file: selectedFile || undefined,
      listId: selectValue,
      note: notesValue || undefined,
      name: fileName || undefined,
    }

    Object.entries(fields).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value)
      } else {
        formData.delete(key)
      }
    })

    updateFile.mutate(formData, {
      onSuccess() {
        toggleModalEdit()
        refetch()
        toast.success('The file was successfully update.', {
          style: { maxWidth: '600px' },
        })
      },
    })
  }

  return (
    <AddFileModal
      modalName='Edit File'
      tabActive={tabActive}
      isDisabledSaveButton={false}
      validateFileError={validateFileError}
      notesValue={notesValue}
      onChangeNotes={onChangeNotes}
      fileName={fileName}
      handleChangeFileName={handleChangeFileName}
      file={selectedFile || (defaultFile as IFile)}
      handleFile={handleFile}
      selectValue={selectValue}
      handleSelectChange={handleSelectChange}
      listsOptions={listsOptions}
      handleClose={toggleModalEdit}
      open={isOpenEditModal}
      handleSaveFile={handleSaveFile}
    />
  )
}

export interface IRows {
  document: ReactNode
  owner: ReactNode
  date: ReactNode
  actions: ReactNode
  isActive: boolean
}

export default useDocumentsRow
