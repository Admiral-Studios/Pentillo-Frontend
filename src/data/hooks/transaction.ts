import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import {
  IAddressParams,
  IPatchTransactionBody,
  IPostTransactionBody,
  IPostTransactionPayoutBody,
  IPostTransactionPayoutResponse,
  IPostTransactionResponse,
  IRemoveTransactionsParams,
  IStatesListParams,
  ITransaction,
  ITransactionParams,
  ITransactionParticipant,
  ITransactionParticipantParams,
} from '../api/api.types'
import {
  deleteTransactions,
  getStatesList,
  getTransaction,
  getTransactionAddress,
  getTransactionById,
  getTransactionParticipant,
  getTransactionPayoutById,
  patchTransactionById,
  patchTransactionPayoutById,
  postTransaction,
  putTransactionParticipant,
} from '../api/transaction'
import { listKeys, transactionKeys } from '../queryKeys'
import { IUseDeleteTransactionProps } from './hooks.types'

export const useTransaction = (
  params: ITransactionParams,
  setCount: Dispatch<SetStateAction<number | undefined>>,
) => {
  const { maxPrice, minPrice, status, startDate, endDate, ...otherParams } =
    params
  return useQuery<ITransaction>({
    queryKey: [transactionKeys.list(otherParams)],
    queryFn: () =>
      getTransaction(params).then((res) => {
        setCount(res.count as number)

        return res
      }),
  })
}

interface IUseCreateTransactionProps {
  onSuccess?:
    | ((
        data: any,
        variables: IPostTransactionBody,
        context: unknown,
      ) => unknown)
    | undefined
  onError?:
    | ((
        error: Error,
        variables: IPostTransactionBody,
        context: unknown,
      ) => unknown)
    | undefined
}

export const useCreateTransaction = ({
  onSuccess,
  onError,
}: IUseCreateTransactionProps) =>
  useMutation({
    mutationKey: [transactionKeys.all],
    mutationFn: (body: IPostTransactionBody) => postTransaction(body),
    onSuccess,
    onError,
  })

export const useDeleteTransaction = ({
  onSuccess,
}: IUseDeleteTransactionProps) =>
  useMutation({
    mutationFn: (params: IRemoveTransactionsParams) =>
      deleteTransactions(params),
    onSuccess,
  })

export const useTransactionAddress = (params: IAddressParams) =>
  useQuery({
    queryKey: [transactionKeys.listAddress(params)],
    queryFn: () => getTransactionAddress(params),
  })

export const useTransactionById = (id: string) =>
  useQuery<IPostTransactionResponse>({
    queryKey: [transactionKeys.details(id), transactionKeys.all],
    queryFn: () => getTransactionById(id),
  })

export const useTransactionPayoutById = (id: string) =>
  useQuery<IPostTransactionPayoutResponse>({
    queryKey: [transactionKeys.payout(id), transactionKeys.all],
    queryFn: () => getTransactionPayoutById(id),
  })

export const usePatchTransactionById = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [transactionKeys.details(id), transactionKeys.all],
    mutationFn: (data: IPatchTransactionBody) => patchTransactionById(id, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [transactionKeys.details(id), transactionKeys.all],
      })
    },
  })
}

export const useStatesList = (params: IStatesListParams) =>
  useQuery({
    queryKey: [listKeys.listAssignedStates(params)],
    queryFn: () => getStatesList(params),
  })

export const usePatchTransactionPayoutById = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [transactionKeys.payout(id), transactionKeys.all],
    mutationFn: (data: IPostTransactionPayoutBody) =>
      patchTransactionPayoutById(id, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [transactionKeys.payout(id), transactionKeys.all],
      })
    },
  })
}

export const useTransactionParticipant = (id: string) =>
  useQuery<ITransactionParticipant>({
    queryKey: [transactionKeys.all],
    queryFn: () => getTransactionParticipant(id),
  })

export const useChangeTransactionParticipant = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [transactionKeys.details(id), transactionKeys.all],
    mutationFn: (params: Omit<ITransactionParticipantParams, 'id'>) =>
      putTransactionParticipant({
        id,
        participantId: params.participantId,
        body: params.body,
      }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [transactionKeys.details(id), transactionKeys.all],
      })
    },
  })
}
