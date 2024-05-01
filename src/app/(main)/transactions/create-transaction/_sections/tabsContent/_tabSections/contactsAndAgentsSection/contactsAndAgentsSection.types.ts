import { IContactData } from '@/data/api/api.types'

export interface ISelectState {
  selectValue: string
  data: IContactData | null
}
