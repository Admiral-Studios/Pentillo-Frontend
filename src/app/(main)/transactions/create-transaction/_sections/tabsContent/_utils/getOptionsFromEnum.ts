import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'

export const getOptionsFromEnum = (e: object): IOption[] =>
  Object.entries(e).map(([key, value]) => ({ name: value, value: key }))
