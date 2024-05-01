import axiosApi from '../axiosApi'
import {
  ICreateDateParams,
  IDateUpdateResponse,
  IGetDateTimelineParams,
  IGetListDatesParams,
  IRemoveDatesParams,
} from './api.types'

export const createDate = (params: ICreateDateParams) =>
  axiosApi.post('/dates/create-date', params).then((res) => res.data)

export const getListDates = (params: IGetListDatesParams) =>
  axiosApi.get(`/dates`, { params }).then((res) => res.data)

export const updateDate = async ({ id, data }: IDateUpdateResponse) =>
  axiosApi.patch(`/dates/update-date/${id}`, data).then((res) => res.data)

export const getDateTimeline = async (params: IGetDateTimelineParams) =>
  axiosApi.get(`/date/timeline-dates`, { params }).then((res) => res.data)

export const deleteDate = async (params: IRemoveDatesParams) => {
  let ids: string = ''

  for (let i = 0; i < params.ids.length; i++) {
    const id = params.ids[i]

    if (i) {
      ids = ids + '&ids=' + id
    } else {
      ids = '?ids=' + id
    }
  }

  const response = axiosApi.delete(
    `/dates/delete-dates/list/${params.listId}${ids}`,
  )

  return response.then((res) => res.data)
}
