import axiosApi from '../axiosApi'
import {
  ICreateListParams,
  IGetListByIdParams,
  IGetListsParams,
} from './api.types'

export const getLists = (params: IGetListsParams) =>
  axiosApi.get('/list/lists', { params }).then((res) => res.data)

export const getListById = (params: IGetListByIdParams) =>
  axiosApi.get(`/list`, { params }).then((res) => res.data)

export const createList = (params: ICreateListParams) =>
  axiosApi.post('/list/create-list', params).then((res) => res.data)

export const updateList = (id: string, data: IGetListsParams) =>
  axiosApi.patch(`/list/update-list/${id}`, data).then((res) => res.data)

export const deleteList = async (id: string) =>
  axiosApi.delete(`/list/delete-list/${id}`).then((res) => res.data)
