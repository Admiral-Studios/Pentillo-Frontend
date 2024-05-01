import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { IGetListsParams } from '@/data/api/api.types'
import { useList } from '@/data/hooks/list'
import { TYPE } from '@/types/enum'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'

const useDatesListTable = ({ transactionId }: { transactionId: string }) => {
  const [rows, setRows] = useState<IListsRows[]>([])
  const [selectValue, setSelectValue] = useState<string>('')
  const [selectDates, setSelectDates] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const [searchDebounce] = useDebounce(search, 1000)

  const [count, setCount] = useState<number | undefined>(0)
  const [take, setTake] = useState<number>(10)
  const [skip, setSkip] = useState<number>(0)
  const [params, setParams] = useState<IGetListsParams>({
    type: TYPE.DATES,
    transactionId: transactionId,
  })

  const listData = useList(
    { name: searchDebounce || undefined, skip, take, ...params },
    setCount,
  )

  useMemo(() => {
    if (listData && listData.data) {
      setRows(
        listData.data.data.map((list) => ({
          id: list.id,
          isLoading: true,
          name: list.name,
          childRows: [],
        })),
      )
    }
  }, [listData.data])

  const handleSelectRow = (id: string) => {
    setSelectDates((prevStateIds) => {
      const isIdInSelectedList = prevStateIds.indexOf(id) !== -1

      if (isIdInSelectedList) {
        return prevStateIds.filter((prevStateId) => prevStateId !== id)
      }

      return [...prevStateIds, id]
    })
  }

  const handleSelectChange = (value: string) => setSelectValue(value)

  let columns: GridColDef[] = [
    { field: 'status', headerName: 'Status', width: 190 },
    { field: 'title', headerName: 'Title', width: 67 },
    { field: 'description', headerName: 'Description', width: 476 },
    { field: 'note', headerName: '', width: 128 },
    { field: 'owner', headerName: 'Owner', width: 78 },
    { field: 'dueDate', headerName: 'Due date', width: 112 },
    { field: 'actionOptions', headerName: '', width: 52 },
  ]

  const listsOptions: IOption[] =
    listData.data?.data?.map((list) => ({ name: list.name, value: list.id })) ||
    []
  useEffect(() => {
    setSelectDates([])
  }, [skip, take])

  return {
    rows,
    columns,
    listsOptions,
    lists: listData.data,
    isLoadingLists: listData.isLoading,
    listsSelectValue: selectValue,
    handleSelectRow,
    handleSelectChange,
    selectDates,
    search,
    setSearch,
    count,
    skip,
    take,
    setSkip,
    setTake,
  }
}

interface IListsRows {
  id: string
  childRows: any[]
  isLoading: boolean
  name: string
}

export default useDatesListTable
