import { ISelectMultipleItem } from '@/components/UI/selects/selectMultiple/selectMultiple.types'
import { IAssignedPerson } from '@/data/api/api.types'
import { SelectChangeEvent } from '@mui/material'
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react'

export interface IDateContextReturn {
  select: string[]
  selectDates: string[]
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
    rows: IDateRow[]
    columns: ITaskColumn[]
    columnsForEdits: ISelectMultipleItem[]
  }
  filterData: IDateFiltersData
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

export interface IDateProviderProps {
  children: ReactNode
}

export interface IDateFilterData {
  status: string[]
  title: string[]
  owner: string[]
  dueDate: string[]
}

export interface IDateRow {
  title: ReactNode
  dueDate: ReactNode
  actionOptions: ReactNode
}

export interface IDateFiltersData {
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
    filterData: IDateFiltersData
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
