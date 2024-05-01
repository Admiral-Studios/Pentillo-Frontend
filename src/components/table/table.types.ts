import { ReactNode } from 'react'

export interface IRow {
  field: string
  row: () => ReactNode
}

export type IColumn = string
