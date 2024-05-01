import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import {
  BDError,
  ICreateListParams,
  IGetListByIdParams,
  IGetListResponse,
  IGetListsParams,
  IGetListsResponse,
  ITaskAssignedPersonListParams,
} from '../api/api.types'
import {
  createList,
  deleteList,
  getListById,
  getLists,
  updateList,
} from '../api/list'
import { getTasksAssignedPersonList, getTasksTitleList } from '../api/task'
import { listKeys } from '../queryKeys'
import { IUseDeleteListProps } from './hooks.types'

export const useList = (
  params: IGetListsParams,
  setCount?: Dispatch<SetStateAction<number | undefined>>,
) =>
  useQuery<IGetListsResponse>({
    queryKey: [listKeys.list(params), listKeys.all],
    queryFn: () =>
      getLists(params).then((res) => {
        setCount && setCount(res.count as number)
        return res
      }),
  })

export const useTaskAssignedPersonList = (
  params: ITaskAssignedPersonListParams,
) =>
  useQuery({
    queryKey: [listKeys.listAssignedPerson(params)],
    queryFn: () => getTasksAssignedPersonList(params),
  })

  export const useTaskTitleList = (
    params: ITaskAssignedPersonListParams,
  ) =>
    useQuery({
      queryKey: [listKeys.listTitle(params)],
      queryFn: () => getTasksTitleList(params),
    })

export const useListById = (params: IGetListByIdParams) =>
  useQuery({
    queryKey: [listKeys.details(params.listId)],
    queryFn: () => getListById(params),
  })

export const useCreateList = ({
  onSuccess,
}: {
  onSuccess?: (data: IGetListResponse) => void
}) =>
  useMutation<
    IGetListResponse,
    AxiosError<BDError>,
    ICreateListParams,
    unknown
  >({
    mutationKey: [listKeys.all],
    mutationFn: (data) => createList(data),
    onSuccess: (data) => {
      toast.success('List successfuly added!')
      if (onSuccess) onSuccess(data)
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useUpdateList = ({
  onSuccess,
}: {
  onSuccess?: (data: IGetListResponse) => void
}) =>
  useMutation<
    IGetListResponse,
    AxiosError<BDError>,
    { id: string; data: ICreateListParams },
    unknown
  >({
    mutationFn: (data) => updateList(data.id, data.data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useDeleteList = ({ onSuccess }: IUseDeleteListProps) =>
  useMutation({
    mutationFn: (id: string) => deleteList(id),
    onSuccess,
    onError: () => {
      toast.error('Cannot delete task, please try again later')
    },
  })
