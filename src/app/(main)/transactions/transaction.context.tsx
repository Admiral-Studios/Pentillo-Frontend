import ActionRow from '@/app/(main)/transactions/_components/actionRow'
import {
  ITransactionFilterData,
  ITransactionContextReturn,
  ITransactionProviderProps,
  ITransactionRow,
} from '@/app/(main)/transactions/transaction.types'
import { ISelectMultipleItem } from '@/components/UI/selects/selectMultiple/selectMultiple.types'
import TableActionRowButtons from '@/components/table/components/tableActionRowButtons/tableActionRowButtons'
import { getTransactionExport } from '@/data/api/transaction'
import { useGetTemplates } from '@/data/hooks/template'
import { useDeleteTransaction, useTransaction } from '@/data/hooks/transaction'
import { transactionKeys } from '@/data/queryKeys'
import { SIDE, STATUS } from '@/types/enum'
import { CheckNewIcon } from '@/ui/icons/CheckNewIcon'
import { CheckboxNewIcon } from '@/ui/icons/CheckboxNewIcon'
import { Box, Checkbox, SelectChangeEvent, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { useDebounce } from 'use-debounce'

export const MIN_PRICE_VALUE = 1
export const MAX_PRICE_VALUE = 12000

const TransactionContext = createContext({})

export const useTransactionContext = (): ITransactionContextReturn =>
  useContext(TransactionContext) as ITransactionContextReturn

export const TransactionProvider = ({
  children,
}: ITransactionProviderProps) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const [selectTransactions, setSelectTransactions] = useState<string[]>([])
  const [select, setSelect] = useState<string[]>([])
  const [address, setAddress] = useState<string[]>([])
  const [status, setStatus] = useState<string[]>([])
  const [price, setPrice] = useState<[string, string]>(['0', '0'])
  const [date, setDate] = useState<[Date | undefined, Date | undefined]>([
    undefined,
    undefined,
  ])
  const [take, setTake] = useState<number>(10)
  const [skip, setSkip] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const [count, setCount] = useState<number | undefined>(0)

  const [searchDebounce] = useDebounce(search, 1000)
  const [addressDebounce] = useDebounce(address, 1000)
  const queryClient = useQueryClient()
  const { push } = useRouter()

  const transactionData = useTransaction(
    {
      search: searchDebounce || undefined,
      take,
      status: status.length ? status : undefined,
      skip,
      address: addressDebounce.length ? address : undefined,
      startDate: date[0] ? date[0].toISOString() : undefined,
      endDate: date[1] ? date[1].toISOString() : undefined,
      maxPrice: +price[1] ? +price[1] : undefined,
      minPrice: +price[0] ? +price[0] : undefined,
    },
    setCount,
  )
  const templateData = useGetTemplates()

  const isTemplates = Boolean(templateData.data?.count)

  const onExport = async () => {
    await getTransactionExport({
      search: searchDebounce || undefined,
      take,
      status: status.length ? status : undefined,
      skip,
      address: addressDebounce.length ? address : undefined,
      startDate: date[0] ? date[0].toISOString() : undefined,
      endDate: date[1] ? date[1].toISOString() : undefined,
      maxPrice: price[1] ? +price[1] : undefined,
      minPrice: price[0] ? +price[0] : undefined,
    })
  }

  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [transactionKeys.all],
    })
    toast.success('The transactions was successfully deleted.', {
      style: { maxWidth: '600px' },
    })
    closeDeleteModal()
    setSelectTransactions([])
  }

  const { mutate: deleteTransaction } = useDeleteTransaction({
    onSuccess: onDeleteSuccess,
  })

  const handleRefetch = () => {
    transactionData.refetch()
  }

  const toggleDeleteModal = () => {
    setIsOpenDeleteModal((prevState) => !prevState)
  }
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false)
  }
  const handleDeleteTransactions = () => {
    if (selectTransactions.length) {
      deleteTransaction({ ids: selectTransactions })
    }
  }
  const handleSelectChange = (event: SelectChangeEvent<typeof select>) => {
    const {
      target: { value },
    } = event
    setSelect(typeof value === 'string' ? value.split(',') : value)
  }
  const handleSelectRow = (id: string) => {
    setSelectTransactions((prevStateIds) => {
      const isIdInSelectedList = prevStateIds.indexOf(id) !== -1

      if (isIdInSelectedList) {
        return prevStateIds.filter((prevStateId) => prevStateId !== id)
      }

      return [...prevStateIds, id]
    })
  }
  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (transactionData && transactionData.data) {
      if (event.target.checked) {
        setSelectTransactions(
          transactionData.data.data?.map((transaction) => transaction.id),
        )
        setIsCheckAll(true)
      } else {
        setSelectTransactions([])
        setIsCheckAll(false)
      }
    }
  }

  const handleOpenTransaction = (transactionId: string) => {
    push(`/transactions/details/${transactionId}`)
  }

  const transactionTableData = useMemo(() => {
    let rows: ITransactionRow[] = []
    let columns = [
      {
        field: 'address',
        headerName: 'Address',
        width: 260,
        isSorted: true,
        sortBy: false,
        sortOrder: 'desc',
        sortName: 'address',
      },
      {
        field: 'side',
        headerName: 'Side',
        width: 173,
        isSorted: true,
        sortBy: false,
        sortOrder: 'desc',
        sortName: 'side',
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 173,
        isSorted: true,
        sortBy: false,
        sortOrder: 'desc',
        sortName: 'status',
      },
      {
        field: 'price',
        headerName: 'Price',
        width: 173,
        isSorted: true,
        sortBy: false,
        sortOrder: 'desc',
        sortName: 'price',
      },
      {
        field: 'closing',
        headerName: 'Closing',
        width: 173,
        isSorted: true,
        sortBy: false,
        sortOrder: 'desc',
        sortName: 'state',
      },
      {
        field: 'agent',
        headerName: 'Agent',
        width: 173,
        isSorted: true,
        sortBy: false,
        sortOrder: 'desc',
        sortName: 'closing',
      }
    ]
    let columnsForEdits: ISelectMultipleItem[] = [
      { value: 'address', name: 'Address' },
      { value: 'side', name: 'Side' },
      { value: 'status', name: 'Status' },
      { value: 'price', name: 'Price' },
      { value: 'closing', name: 'Closing' },
      { value: 'agent', name: 'Agent' },
    ]

    if (transactionData && transactionData.data) {
      const transactionList = transactionData.data.data

      rows = transactionList?.map(
        ({
          id,
          street,
          city,
          zipCode,
          dir,
          side,
          streetNumber,
          status,
          closedDate,
          purchase,
          agent,
        }): ITransactionRow => {
          const isActive = selectTransactions.indexOf(id) !== -1

          return {
            address: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={isActive}
                  onChange={() => handleSelectRow(id)}
                  icon={
                    <CheckboxNewIcon sx={{ width: '20px', height: '20px' }} />
                  }
                  checkedIcon={
                    <CheckNewIcon sx={{ width: '20px', height: '20px' }} />
                  }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 500 }}>
                    {streetNumber + ' ' + street}
                  </Typography>
                  <Typography>{city + ' ' + dir}</Typography>
                </Box>
              </Box>
            ),
            //@ts-ignore
            side: <Typography>{SIDE[side]}</Typography>,
            //@ts-ignore
            status: <Typography>{STATUS[status]}</Typography>,
            price: <Typography>${purchase}</Typography>,
            closing: (
              <Typography>{new Date(closedDate!).toDateString()}</Typography>
            ),
            agent: <Typography>{getAgentName(agent)}</Typography>,
            actions: (
              <TableActionRowButtons
                modalTitle={`Are you sure want to delete transaction?`}
                modalDescription={
                  'You will not be able to recover a deleted transaction.'
                }
                deleteHandler={() => deleteTransaction({ ids: [id] })}
                editHandler={() => push(`/transactions/details/${id}`)}
              />
            ),
            isActive,
            id
          }
        },
      )
    }

    return { rows, columns, columnsForEdits }
  }, [selectTransactions, transactionData])

  useEffect(() => {
    handleRefetch()
  }, [status, price, date])

  useEffect(() => {
    setIsCheckAll(false)
    setSelectTransactions([])
  }, [skip, take])

  const value = {
    select,
    selectTransactions,
    address,
    status,
    price,
    date,
    count: count,
    take,
    skip,
    search,
    transactionTableData,
    filterData,
    isLoading: transactionData.isLoading,
    isCheckAll,
    isOpenDeleteModal,
    isTemplates,
    handleRefetch,
    toggleDeleteModal,
    handleDeleteTransactions,
    handleSelectChange,
    handleCheckAll,
    setAddress,
    setStatus,
    setPrice,
    setDate,
    setTake,
    setSkip,
    setSearch,
    onExport,
    handleOpenTransaction
  }

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}

const getAgentName = (agent?: { firstName: string; lastName: string }) => {
  if (agent) {
    return agent.firstName + ' ' + agent.lastName
  }
  return ''
}

const filterData: ITransactionFilterData = {
  address: [
    '57 Bellevue Avenue',
    'Mora Streat',
    'Babson Streat',
    'Woodale Avenue',
    'River Streat',
  ],
  status: Object.entries(STATUS).map(([key, value]) => ({
    value: key,
    name: value,
  })),
}
