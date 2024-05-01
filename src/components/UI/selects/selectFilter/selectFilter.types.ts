import { SxProps } from '@mui/material'

interface ISelectFilterProps {
  sxPropsWrapper?: SxProps
  filters: IParentOption[]
  buttonText: string
  handleSelectOption: (parentId: string, selectedOptions: any) => void
  handleRemoveOption: (parentId: string, selectedOptionId: string) => void
}

interface ISelectFilterState {
  options: IParentOption[]
  isOpen: boolean
  selectedOptions: {
    address?: string
    status?: string
    price?: {
      min: number
      max: number
    }
    date?: Date
  }
}

interface IParentOption {
  id: string
  name: string
  typeField: 'options' | 'status' | 'range'
  isOpen: boolean
  options?: IChildOption[]
  selectedOptions?: IChildOption[]
  min?: number
  max?: number
  label?: string
  searchValues?: IChildOption[]
  labelMin?: string
  labelMax?: string
}

interface IChildOption {
  id: string
  label: string
  isActive: boolean
}

interface IAction {
  type: string
  payload: any
}

export type {
  IAction,
  IChildOption,
  IParentOption,
  ISelectFilterProps,
  ISelectFilterState,
}
