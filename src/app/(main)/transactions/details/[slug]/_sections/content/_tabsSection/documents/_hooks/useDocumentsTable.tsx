import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { IGetListsParams, IUploadDocumentBody } from '@/data/api/api.types'
import { useUploadDocument } from '@/data/hooks/documents'
import { useList } from '@/data/hooks/list'
import { TYPE } from '@/types/enum'
import { allowedMimeTypes } from '@/utils/constants/allowedMimeTypes'
import { getExtension } from '@/utils/getExtension'
import { trimFileExtension } from '@/utils/trimFileExtension'
import { GridColDef } from '@mui/x-data-grid'
import { AxiosError } from 'axios'
import { SyntheticEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useDebounce } from 'use-debounce'

const useDocumentsTable = () => {
  const [isModalUploadOpen, setIsModalUploadOpen] = useState<boolean>(false)
  const [rows, setRows] = useState<IListsRows[]>([])
  const [notesValue, setNotesValue] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [validateFileError, setValidateFileError] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')
  const [selectValue, setSelectValue] = useState<string>('')
  const [expanded, setExpanded] = useState<string | false>(false)
  const [params, setParams] = useState<IGetListsParams>({
    type: TYPE.DOCUMENTS,
    skip: 0,
    take: 5,
  })

  const [paramsDebounce] = useDebounce(params, 1000)

  const isDisabledSaveButtonModalFile = selectValue === '' || file === null

  const onSuccessUploadFile = () => {
    setIsModalUploadOpen(false)
  }

  const listData = useList({
    type: paramsDebounce.type,
    skip: paramsDebounce.skip,
    take: paramsDebounce.take,
    name: paramsDebounce.name || undefined,
  })
  const mutateFile = useUploadDocument({
    onSuccess: onSuccessUploadFile,
  })

  const handleSearch = (value: string) => {
    setParams((prevState) => ({ ...prevState, name: value }))
  }

  const handleChangeExpanded =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const isSuccessFileUpload = mutateFile.isSuccess

  useMemo(() => {
    if (listData && listData.data) {
      setRows(
        listData.data.data.map((list) => ({
          id: list.id,
          isLoading: true,
          name: list.name,
          childRows: [],
          isSuccessFileUpload,
          expanded,
          handleChangeExpanded,
        })),
      )
    }
  }, [listData.data, isSuccessFileUpload, expanded])

  let columns: GridColDef[] = [
    { field: 'document', headerName: 'Document', width: 700 },
    { field: 'owner', headerName: 'Owner', width: 160 },
    { field: 'date', headerName: 'Date', width: 160 },
    { field: 'actions', headerName: '', width: 120 },
  ]

  const listsOptions: IOption[] =
    listData.data?.data?.map((list) => ({ name: list.name, value: list.id })) ||
    []

  const handleModalUploadClose = () => setIsModalUploadOpen(false)
  const handleModalUploadOpen = () => setIsModalUploadOpen(true)

  const onClickListsRow = async (listId: string) => {}

  const handleSelectChange = (value: string) => setSelectValue(value)
  const handleFile = (file: File | null) => {
    setValidateFileError('')

    if (file) {
      if (allowedMimeTypes.indexOf(file.type) !== -1) {
        setFile(file)
        setFileName(trimFileExtension(file.name))
      } else {
        setValidateFileError('Invalid file type.')
      }
    } else {
      setFile(null)
    }
  }
  const handleChangeFileName = (fileName: string) => {
    if (file) {
      setFileName(fileName)
    }
  }

  const onChangeNotes = (notes: string) => setNotesValue(notes)
  const handleSaveFile = () => {
    if (file) {
      const formData = new FormData()
      const fields: IUploadDocumentBody = {
        file,
        listId: selectValue,
        note: notesValue || undefined,
        name: fileName,
      }

      Object.entries(fields).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value)
        } else {
          formData.delete(key)
        }
      })

      mutateFile.mutate(formData, {
        onSuccess() {
          toast.success('The file was successfully upload.', {
            style: { maxWidth: '600px' },
          })
          setFile(null)
          setFileName('')
          setSelectValue('')
        },
        onError(error) {
          const axiosError = error as AxiosError<{ message: string }>
          toast.error(axiosError?.response?.data?.message || error.message)
        },
      })
    }
  }

  return {
    searchValue: params.name,
    rows,
    columns,
    listsOptions,
    lists: listData.data,
    isLoadingLists: listData.isLoading,
    listsSelectValue: selectValue,
    file,
    fileName,
    notesValue,
    validateFileError,
    isModalUploadOpen,
    isDisabledSaveButtonModalFile,
    handleSearch,
    handleModalUploadClose,
    handleModalUploadOpen,
    onClickListsRow,
    handleListsSelectChange: handleSelectChange,
    handleFile,
    handleChangeFileName,
    onChangeNotes,
    handleSaveFile,
  }
}

interface IListsRows {
  id: string
  childRows: any[]
  isLoading: boolean
  name: string
  expanded: string | false
  handleChangeExpanded: (
    panel: string,
  ) => (event: SyntheticEvent, isExpanded: boolean) => void
}

export default useDocumentsTable
