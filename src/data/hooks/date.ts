import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import {
  BDError,
  ICreateDateParams,
  IDateData,
  IDateUpdateResponse,
  IGetDateResponse,
  IGetDateTimelineParams,
  IGetDateTimelineResponse,
  IGetListDatesParams,
  IRemoveDatesParams,
} from '../api/api.types'
import {
  createDate,
  deleteDate,
  getDateTimeline,
  getListDates,
  updateDate,
} from '../api/date'
import { dateKeys } from '../queryKeys'
import { IUseDeleteTaskProps } from './hooks.types'

export const useCreateDate = ({
  onSuccess,
}: {
  onSuccess?: (data: IGetDateResponse) => void
}) =>
  useMutation<
    IGetDateResponse,
    AxiosError<BDError>,
    ICreateDateParams,
    unknown
  >({
    mutationFn: (data) => createDate(data),
    onSuccess: (data) => {
      toast.success('Date successfuly added!')
      if (onSuccess) onSuccess(data)
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useDateByListId = (params: IGetListDatesParams) =>
  useQuery<IDateData[]>({
    queryFn: () => getListDates(params),
    queryKey: [dateKeys.details(params)],
    enabled: false,
  })

export const useUpdateDate = ({
  onSuccess,
}: {
  onSuccess?: (data: IDateUpdateResponse) => void
}) =>
  useMutation<
    IDateUpdateResponse,
    AxiosError<BDError>,
    IDateUpdateResponse,
    unknown
  >({
    mutationKey: [dateKeys.all],
    mutationFn: (data) => updateDate(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useDeleteDate = ({ onSuccess }: IUseDeleteTaskProps) =>
  useMutation({
    mutationFn: (params: IRemoveDatesParams) => deleteDate(params),
    onSuccess,
    onError: () => {
      toast.error('Cannot delete date, please try again later')
    },
  })

export const useDateTimeline = (params: IGetDateTimelineParams) =>
  useQuery<IGetDateTimelineResponse[]>({
    queryKey: [dateKeys.all],
    queryFn: () => getDateTimeline(params),
  })
