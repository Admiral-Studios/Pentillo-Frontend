import { downloadCSVfile } from '@/utils/downloadCSVfile'
import axiosApi from '../axiosApi'
import {
  IAddressParams,
  IPatchTransactionBody,
  IPostTransactionBody,
  IPostTransactionPayoutBody,
  IRemoveTransactionsParams,
  IStatesListParams,
  ITransactionParams,
  ITransactionParticipantParams,
} from './api.types'

export const getTransaction = async (params: ITransactionParams) =>
  axiosApi.get('/transactions', { params }).then((res) => res.data)

export const postTransaction = async (body: IPostTransactionBody) =>
  axiosApi
    .post('/transactions/create-transaction', body)
    .then((res) => res.data)

export const getStatesList = async (params?: IStatesListParams) => {
  try {
    return axiosApi
      .get('/transactions/search-state-list', { params })
      .then((res) => res.data)
  } catch (error) {
    return error
  }
}

export const getTransactionById = async (id: string) =>
  axiosApi.get(`/transactions/${id}`).then((res) => res.data)

export const getTransactionPayoutById = async (id: string) =>
  axiosApi.get(`/transactions/${id}/transaction-payout`).then((res) => res.data)

export const getTransactionAddress = (params: IAddressParams) =>
  axiosApi.get('/transactions/address-list', { params }).then((res) => res.data)

export const deleteTransactions = async (params: IRemoveTransactionsParams) => {
  let ids: string = ''

  for (let i = 0; i < params.ids.length; i++) {
    const id = params.ids[i]

    if (i) {
      ids = ids + '&ids=' + id
    } else {
      ids = '?ids=' + id
    }
  }

  const response = axiosApi.delete(`/transactions/delete-transactions${ids}`)

  return response.then((res) => res.data)
}

export const patchTransactionById = (id: string, data: IPatchTransactionBody) =>
  axiosApi
    .patch(`/transactions/update-transaction/${id}`, data)
    .then((res) => res.data)

export const patchTransactionPayoutById = (
  id: string,
  data: IPostTransactionPayoutBody,
) =>
  axiosApi
    .patch(`/transactions/${id}/update-transaction-payout`, data)
    .then((res) => res.data)

export const getTransactionParticipant = (id: string) =>
  axiosApi
    .get(`/transactions/${id}/transaction-participant`)
    .then((res) => res.data)

export const getTransactionExport = (params: ITransactionParams) =>
  axiosApi
    .get('/transactions/export-transactions', { params })
    .then((res) => downloadCSVfile(res.data, 'transactions'))

export const putTransactionParticipant = (
  params: ITransactionParticipantParams,
) =>
  axiosApi
    .put(
      `/transactions/${params.id}/update-transaction-participant/${params.participantId}`,
      params.body,
    )
    .then((res) => res.data)
