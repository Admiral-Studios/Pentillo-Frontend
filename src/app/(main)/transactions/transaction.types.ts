import { ISelectMultipleItem } from '@/components/UI/selects/selectMultiple/selectMultiple.types'
import { ITransaction } from '@/data/api/api.types'
import { SelectChangeEvent } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { UseQueryResult } from '@tanstack/react-query'
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react'

type TypeActionsCallback = (idTransaction: string) => ReactNode
type TypeActionSection = ({
  columns,
  rows,
}: {
  columns: GridColDef[]
  rows: ITransactionRow[]
}) => ReactNode

type TypeFilterSection = ({
  columns,
  rows,
}: {
  columns: GridColDef[]
  rows: ITransactionRow[]
  columnsForEdits: ISelectMultipleItem[]
}) => ReactNode

export interface IUseTransactionTableProps {
  transactionData: UseQueryResult<ITransaction, Error>
  actionsRow: TypeActionsCallback
  actionSection?: TypeActionSection
  filterSection?: TypeFilterSection
}

export interface ITransactionRow {
  address: ReactNode
  side: ReactNode
  status: ReactNode
  price: ReactNode
  closing: ReactNode
  agent: ReactNode
  actions: ReactNode
  id: string
  isActive: boolean
}

export interface ITransactionColumn {
  field: string
  headerName: string
  width?: number
}

export interface IActionRowProps {
  transactionId: string
  modalName: string
}

export interface ITransactionProviderProps {
  children: ReactNode
}

export interface ITransactionTableWrapperProps {}
export interface IFilterSectionProps {
  selectEditsParams: {
    select: string[]
    handleChange: (event: SelectChangeEvent<string[]>) => void
    columnsForEdits: ISelectMultipleItem[]
  }
  transactionCount?: number
  onExport?: () => void
  selectFilterParams: {
    filterData: ITransactionFilterData
    addressValue: string[]
    statusValue: string[]
    priceValue: [string, string]
    dateValue: [Date | undefined, Date | undefined]
    setAddressValue: Dispatch<SetStateAction<string[]>>
    setStatusValue: Dispatch<SetStateAction<string[]>>
    setPriceValue: Dispatch<SetStateAction<[string, string]>>
    setDateValue: Dispatch<SetStateAction<[Date | undefined, Date | undefined]>>
    handleRefetch: () => void
  }
}

export interface ITransactionContextReturn {
  select: string[]
  selectTransactions: string[]
  address: string[]
  status: string[]
  price: [string, string]
  date: [Date | undefined, Date | undefined]
  count?: number
  take: number
  skip: number
  search: string
  transactionTableData: {
    rows: ITransactionRow[]
    columns: ITransactionColumn[]
    columnsForEdits: ISelectMultipleItem[]
  }
  filterData: ITransactionFilterData
  isLoading: boolean
  isCheckAll: boolean
  isOpenDeleteModal: boolean
  isTemplates: boolean
  handleRefetch: () => void
  toggleDeleteModal: () => void
  handleDeleteTransactions: () => void
  handleOpenTransaction: (transactionId: string) => void
  handleSelectChange: (event: SelectChangeEvent<string[]>) => void
  handleCheckAll: (event: ChangeEvent<HTMLInputElement>) => void
  setAddress: Dispatch<SetStateAction<string[]>>
  setStatus: Dispatch<SetStateAction<string[]>>
  setPrice: Dispatch<SetStateAction<[string, string]>>
  setDate: Dispatch<SetStateAction<[Date | undefined, Date | undefined]>>
  setTake: Dispatch<SetStateAction<number>>
  setSkip: Dispatch<SetStateAction<number>>
  setSearch: Dispatch<SetStateAction<string>>
  onExport?: () => void
}

export interface ITransactionFilterData {
  address: string[]
  status: { value: string; name: string }[]
}

export interface IColumnForFilter {
  label: string
  inputLabel: string
  type: 'search' | 'status' | 'range' | 'date-range'
  isOpen: boolean
  options: string[]
}

export type TParticipantKeys =
  | 'primaryAgentId'
  | 'goAgentId'
  | 'firstAssistantId'
  | 'secondAssistantId'
