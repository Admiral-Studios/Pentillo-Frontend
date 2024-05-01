import { SelectChangeEvent, SxProps } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

export interface ISelectMultipleProps {
  options: ISelectMultipleItem[]
  value: string[]
  onChange: (event: SelectChangeEvent<string[]>) => void
  label: string
  sxSelect?: SxProps
  placeholder?: string
  height?: string
  noValue?: boolean
  infoSelect?: boolean
  tooltipInfo?: string
}

export interface ISelectMultipleItem {
  name: string
  value: string
}
