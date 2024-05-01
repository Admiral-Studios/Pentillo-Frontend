import { SIDE } from '@/types/enum'
import axiosApi from '../axiosApi'
import {
  IListData,
  IRemoveTemplatesParams,
  ITemplate,
  ITemplatePostResponse,
} from './api.types'

export const getTemplates = (params: any) =>
  axiosApi.get('/templates', { params }).then((res) => res.data)

export const getTemplateById = async (id: string) =>
  axiosApi.get(`/templates/${id}`).then((res) => res.data)

export const createTemplate = async (data: ITemplatePostResponse) => {
  const sentData = {
    name: data.name,
    sides: data.sides,
    propertyTypes: data.propertyTypes,
    agentIds: data.agents?.map((agent) => agent.id),
    states: data.states,
    listIds: [
      ...(data.datesListIds as IListData[]),
      ...(data.documentsListIds as IListData[]),
      ...(data.tasksListIds as IListData[]),
    ]?.map((list) => list.id),
  }
  return axiosApi
    .post('/templates/create-template', sentData)
    .then((res) => res.data)
}

export const updateTemplate = async (id: string, data: ITemplate) =>
  axiosApi
    .patch(`/templates/update-template/${id}`, data)
    .then((res) => res.data)

export const removeTemplate = async (params: IRemoveTemplatesParams) => {
  let ids: string = ''

  for (let i = 0; i < params.ids.length; i++) {
    const id = params.ids[i]

    if (i) {
      ids = ids + '&ids=' + id
    } else {
      ids = '?ids=' + id
    }
  }

  const response = axiosApi.delete(`/templates/delete-templates${ids}`)

  return response.then((res) => res.data)
}
