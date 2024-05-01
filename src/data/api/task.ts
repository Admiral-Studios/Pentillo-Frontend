import {
  IInformationData,
  ISubTask,
} from '@/app/(main)/tasks/create-task/types'
import axiosApi from '../axiosApi'
import {
  IAddTaskToList,
  ICreateSubTaskResponse,
  IDeleteSubTaskResponse,
  IGetListTasksParams,
  IRemoveTasksParams,
  ISubTaskUpdateResponse,
  ITaskAssignedPersonListParams,
  ITaskParams,
  ITaskUpdateResponse,
} from './api.types'

export const getTasks = async (params?: ITaskParams) =>
  axiosApi.get('/task/task-list', { params }).then((res) => res.data)

export const getTasksAssignedPersonList = async (
  params?: ITaskAssignedPersonListParams,
) => {
  try {
    return axiosApi
      .get('/contacts/search-assigned-person', { params })
      .then((res) => res.data)
  } catch (error) {
    return error
  }
}

export const getTasksTitleList = async (
  params?: ITaskAssignedPersonListParams,
) => {
  try {
    return axiosApi
      .get('/task/search-title-list', { params })
      .then((res) => res.data)
  } catch (error) {
    return error
  }
}

export const createTask = async (data: IInformationData) =>
  axiosApi.post('/task/create-task', data).then((res) => res.data)

export const deleteTask = async (params: IRemoveTasksParams) => {
  let ids: string = ''

  for (let i = 0; i < params.ids.length; i++) {
    const id = params.ids[i]

    if (i) {
      ids = ids + '&ids=' + id
    } else {
      ids = '?ids=' + id
    }
  }

  const response = axiosApi.delete(`/task/delete-tasks${ids}`)

  return response.then((res) => res.data)
}

export const checkTasks = async (params: IRemoveTasksParams) => {
  let ids: string = ''

  for (let i = 0; i < params.ids.length; i++) {
    const id = params.ids[i]

    if (i) {
      ids = ids + '&ids=' + id
    } else {
      ids = '?ids=' + id
    }
  }

  const response = axiosApi.patch(`/task/update-tasks/status${ids}`)

  return response.then((res) => res.data)
}

export const getTaskById = async (id: string) =>
  axiosApi.get(`/task/${id}`).then((res) => res.data)

export const getSubtasksTaskById = async (id: string) =>
  axiosApi.get(`/task/${id}/sub-task-list`).then((res) => res.data)

export const updateTask = async ({ id, data }: ITaskUpdateResponse) =>
  axiosApi.patch(`/task/update-task/${id}`, data).then((res) => res.data)

export const updateSubTask = async ({
  id,
  subtaskId,
  data,
}: ISubTaskUpdateResponse) =>
  axiosApi
    .patch(`/task/${id}/update-sub-task/${subtaskId}`, data)
    .then((res) => res.data)

export const createSubTask = async ({ id, data }: ICreateSubTaskResponse) =>
  axiosApi.post(`/task/${id}/create-sub-task`, data).then((res) => res.data)

export const deleteSubTask = async ({
  id,
  subtaskId,
}: IDeleteSubTaskResponse) =>
  axiosApi
    .delete(`/task/${id}/delete-sub-task/${subtaskId}`)
    .then((res) => res.data)

export const addTaskToList = (data: IAddTaskToList) =>
  axiosApi.patch('/task', data).then((res) => res.data)

export const getListTasks = (params: IGetListTasksParams) =>
  axiosApi.get(`/task/task-list`, { params }).then((res) => res.data)
