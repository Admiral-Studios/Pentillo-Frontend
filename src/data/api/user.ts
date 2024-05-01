import axiosApi from '../axiosApi'
import {
  IUserConfirmEmail,
  IUserUpdateAvatar,
  IUserUpdateEmail,
} from '../hooks/hooks.types'
import { IUserUpdateProfile } from './api.types'

export const userPasswordUpdate = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string
  newPassword: string
}) =>
  axiosApi
    .patch('/user/change-password', { oldPassword, newPassword })
    .then((res) => res.data)

export const userPasswordChange = async ({
  newPassword,
}: {
  newPassword: string
}) =>
  axiosApi
    .patch('/user/reset-password', { newPassword })
    .then((res) => res.data)

export const userUpdateProfile = async (data: IUserUpdateProfile) =>
  axiosApi.patch('/user/update-profile', data).then((res) => res.data)

export const userUpdateEmail = async (data: IUserUpdateEmail) =>
  axiosApi.patch('/user/change-email', data).then((res) => res.data)

export const userConfirmEmail = async (data: IUserConfirmEmail) =>
  axiosApi.post('/user/confirm-change-email', data).then((res) => res.data)

export const userUpdateAvatar = async (data: FormData) => {
  const response = await axiosApi.post('/storage/user/avatar', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const userDeleteAvatar = async () => {
  const response = await axiosApi.delete('/user/delete-avatar')
  return response.data
}

export const fetchUserData = async () =>
  axiosApi.get('/auth/user').then((res) => res.data)
