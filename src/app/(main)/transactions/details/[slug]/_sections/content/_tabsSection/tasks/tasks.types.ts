import { ISelectMultipleItem } from '@/components/UI/selects/selectMultiple/selectMultiple.types'
import { IAssignedPerson } from '@/data/api/api.types'
import { SelectChangeEvent } from '@mui/material'
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react'

export interface ITaskContextReturn {
  select: string[]
  selectTasks: string[]
  name: string[]
  title: string[]
  assignedPerson: IAssignedPerson[]
  email: string[]
  count?: number
  status: string[]
  take: number
  skip: number
  search: string
  taskTableData: {
    rows: ITaskRow[]
    columns: ITaskColumn[]
    columnsForEdits: ISelectMultipleItem[]
  }
  filterData: ITaskFiltersData
  isLoading: boolean
  isCheckAll: boolean
  handleSelectChange: (event: SelectChangeEvent<string[]>) => void
  handleHideCompleted: () => void
  handleDeleteTask: () => void
  handleCheckedTasks: () => void
  isOpenDeleteModal: boolean
  toggleDeleteModal: () => void
  handleCheckAll: (event: ChangeEvent<HTMLInputElement>) => void
  setName: Dispatch<SetStateAction<string[]>>
  setAssignedPerson: Dispatch<SetStateAction<IAssignedPerson[]>>
  setTitle: Dispatch<SetStateAction<string[]>>
  setEmail: Dispatch<SetStateAction<string[]>>
  setTake: Dispatch<SetStateAction<number>>
  setSkip: Dispatch<SetStateAction<number>>
  setSearch: Dispatch<SetStateAction<string>>
}

export interface ITaskProviderProps {
  children: ReactNode
}

export interface ITaskFilterData {
  status: string[]
  title: string[]
  owner: string[]
  dueDate: string[]
}

export interface ITaskRow {
  status: ReactNode
  title: ReactNode
  description: ReactNode
  owner: ReactNode
  dueDate: ReactNode
  isActive: boolean
  note: ReactNode
  actionOptions: ReactNode
}

export interface ITaskFiltersData {
  title: string[]
  assignedPerson: { id: string; name: string }[]
}

export interface IFilterSectionProps {
  selectEditsParams: {
    select: string[]
    handleChange: (event: SelectChangeEvent<string[]>) => void
    columnsForEdits: ISelectMultipleItem[]
  } 
  onExport?: () => void
  isEmptyTable?: boolean
  selectFilterParams: {
    filterData: ITaskFiltersData
    titleValue: string[]
    assignedPersonValue: IAssignedPerson[]
    setTitleValue: Dispatch<SetStateAction<string[]>>
    setAssignedPersonValue: Dispatch<SetStateAction<IAssignedPerson[]>>
  }
}


export interface ITaskColumn {
  field: string
  headerName: string
}
