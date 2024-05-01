import { subTaskKeys, taskKeys } from '@/data/queryKeys'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import {
  BDError,
  IAddTaskToList,
  IGetListTasksParams,
  IRemoveTasksParams,
  ISubTaskUpdateResponse,
  ITask,
  ITaskData,
  ITaskParams,
  ITaskPostResponse,
  ITaskResponse,
  ITaskUpdateResponse,
} from '../api/api.types'
import {
  addTaskToList,
  checkTasks,
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getListTasks,
  getSubtasksTaskById,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
} from '../api/task'
import { AxiosError } from 'axios'
import {
  IInformationData,
  ISubTask,
} from '@/app/(main)/tasks/create-task/types'
import toast from 'react-hot-toast'
import { IUseDeleteTaskProps } from './hooks.types'

export const useTask = (
  params: ITaskParams,
  setCount: Dispatch<SetStateAction<number | undefined>>,
) =>
  useQuery<ITask>({
    queryKey: [taskKeys.list(params)],
    queryFn: () =>
      getTasks(params).then((res) => {
        setCount(res.count as number)
        return res
      }),
  })

export const useCreateTask = ({
  onSuccess,
}: {
  onSuccess?: (data: ITaskPostResponse) => void
}) =>
  useMutation<
    ITaskPostResponse,
    AxiosError<BDError>,
    IInformationData,
    unknown
  >({
    mutationKey: [taskKeys.all],
    mutationFn: (data) => createTask(data),
    onSuccess: (data) => {
      toast.success('Task successfuly added!')
      if (onSuccess) onSuccess(data)
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useDeleteTask = ({ onSuccess }: IUseDeleteTaskProps) =>
  useMutation({
    mutationFn: (params: IRemoveTasksParams) => deleteTask(params),
    onSuccess,
    onError: () => {
      toast.error('Cannot delete task, please try again later')
    },
  })

export const useTaskByListId = (params: IGetListTasksParams) =>
  useQuery<{ data: ITaskData[] }>({
    queryFn: () => getListTasks(params),
    queryKey: [taskKeys.details(params)],
    enabled: false,
  })

export const useGetTaskById = (id: string) =>
  useQuery<ITaskResponse>({
    queryKey: [taskKeys.all],
    queryFn: () => getTaskById(id),
  })

export const useGetSubTasksById = (id: string) =>
  useQuery<ISubTask[]>({
    queryKey: [subTaskKeys.all],
    queryFn: () => getSubtasksTaskById(id),
  })

export const useCheckTasks = ({ onSuccess }: IUseDeleteTaskProps) =>
  useMutation({
    mutationFn: (params: IRemoveTasksParams) => checkTasks(params),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess()
      }
    },
    onError: () => {
      toast.error('Cannot check tasks, please try again later')
    },
  })

export const useUpdateTask = ({
  onSuccess,
}: {
  onSuccess?: (data: ITaskUpdateResponse) => void
}) =>
  useMutation<
    ITaskUpdateResponse,
    AxiosError<BDError>,
    ITaskUpdateResponse,
    unknown
  >({
    mutationFn: (data) => updateTask(data),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useAddTaskToList = ({
  queryClient,
  onSuccess,
}: {
  queryClient: QueryClient
  onSuccess?: () => void
}) =>
  useMutation<IAddTaskToList, AxiosError<BDError>, IAddTaskToList, unknown>({
    mutationFn: (data) => addTaskToList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [taskKeys.all],
      })
      if (onSuccess) onSuccess()
      toast.success('Successfuly added!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useUpdateSubTask = ({
  queryClient,
}: {
  queryClient: QueryClient
}) =>
  useMutation<
    ISubTaskUpdateResponse,
    AxiosError<BDError>,
    ISubTaskUpdateResponse,
    unknown
  >({
    mutationFn: (data) => updateSubTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [subTaskKeys.all],
      })
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useCreateSubTask = ({
  queryClient,
}: {
  queryClient: QueryClient
}) =>
  useMutation<
    {
      id: string
      data: ISubTask
    },
    AxiosError<BDError>,
    {
      id: string
      data: ISubTask
    },
    unknown
  >({
    mutationFn: (data) => createSubTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [subTaskKeys.all],
      })
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useDeleteSubTask = ({
  queryClient,
}: {
  queryClient: QueryClient
}) =>
  useMutation<
    {
      id: string
      subtaskId: string
    },
    AxiosError<BDError>,
    {
      id: string
      subtaskId: string
    },
    unknown
  >({
    mutationFn: (data) => deleteSubTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [subTaskKeys.all],
      })
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })
