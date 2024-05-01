import {
  IAgentsListParams,
  IContactCompanyListParams,
  IContactGetResponse,
  IContactPostData,
  IContactPostResponse,
  IContactUpdateData,
  IContactUpdateResponse,
} from '@/data/api/api.types'
import { IContactParams, IRemoveContactsParams } from './api.types'
import axiosApi from '@/data/axiosApi'
import { IAddNewContactForm } from '@/app/(main)/contacts/create-contact/types'
import { downloadCSVfile } from '@/utils/downloadCSVfile'

export const postContact = async (data: IContactPostData) =>
  axiosApi.post<IContactPostResponse>('/contacts', data).then((res) => res.data)

export const getContacts = async (params?: IContactParams) =>
  axiosApi.get('/contacts', { params }).then((res) => res.data)

export const getContactsCompanyList = async (
  params?: IContactCompanyListParams,
) => {
  try {
    return axiosApi
      .get('/contacts/company-list', { params })
      .then((res) => res.data)
  } catch (error) {
    return error
  }
}

export const getContactById = async (id: string) =>
  axiosApi.get(`/contacts/${id}`).then((res) => res.data)

export const createContact = async (data: IAddNewContactForm) =>
  axiosApi.post('/contacts', data).then((res) => res.data)

export const updateContact = async ({ id, data }: IContactUpdateResponse) =>
  axiosApi.patch(`/contacts/${id}`, data).then((res) => res.data)

export const getAgentsList = async (params?: IAgentsListParams) => {
  try {
    return axiosApi
      .get('/contacts/agents-list', { params })
      .then((res) => res.data)
  } catch (error) {
    return error
  }
}

export const deleteContact = async (params: IRemoveContactsParams) => {
  let ids: string = ''

  for (let i = 0; i < params.ids.length; i++) {
    const id = params.ids[i]

    if (i) {
      ids = ids + '&ids=' + id
    } else {
      ids = '?ids=' + id
    }
  }

  const response = axiosApi.delete(`/contacts/delete-contacts${ids}`)

  return response.then((res) => res.data)
}

export const getContactsExport = (params: IContactParams) =>
  axiosApi
    .get('/contacts/export-contacts', { params })
    .then((res) => downloadCSVfile(res.data, 'contacts'))
