import {
  userConfirmEmail,
  userDeleteAvatar,
  userUpdateAvatar,
  userUpdateEmail,
  userUpdateProfile,
} from './../api/user'
import { userDataKeys } from './../queryKeys'
import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  IUserChangePassword,
  IUserChangePasswordParams,
  IUserConfirmEmail,
  IUserUpdateAvatar,
  IUserUpdateEmail,
  IUserUpdateProfile,
} from './hooks.types'
import { BDError } from '../api/api.types'
import toast from 'react-hot-toast'
import {
  fetchUserData,
  userPasswordChange,
  userPasswordUpdate,
} from '../api/user'

export const useUserUpdatePassword = () =>
  useMutation<
    IUserChangePassword,
    AxiosError<BDError>,
    { oldPassword: string; newPassword: string }
  >({
    mutationFn: (data) => userPasswordUpdate(data),
    onSuccess: () => {
      toast.success('Password was successfully changed!', { duration: 1500 })
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useUserChangePassword = ({
  handleStep,
}: IUserChangePasswordParams) =>
  useMutation<
    IUserChangePassword,
    AxiosError<BDError>,
    { newPassword: string }
  >({
    mutationFn: (data) => userPasswordChange(data),
    onSuccess: () => {
      toast.success('Password was successfully changed!', { duration: 5000 })
      handleStep && handleStep(1)
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useFetchUserData = () => {
  return useQuery({
    queryKey: [userDataKeys.all],
    queryFn: fetchUserData,
  })
}

export const useUserUpdateProfile = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) =>
  useMutation<
    IUserUpdateProfile,
    AxiosError<BDError>,
    { firstName: string; lastName: string; company: string }
  >({
    mutationFn: (data) => userUpdateProfile(data),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess()
      }
      toast.success('Update was successful!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useUserUpdateEmail = () =>
  useMutation<IUserUpdateEmail, AxiosError<BDError>, { newEmail: string }>({
    mutationFn: (data) => userUpdateEmail(data),
    onSuccess: () => {
      toast.success('Update was successful!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useUserConfirmEmail = ({
  onClose,
}: {
  onClose?: () => void
}) =>
  useMutation<IUserConfirmEmail, AxiosError<BDError>, { code: string }>({
    mutationFn: (data) => userConfirmEmail(data),
    onSuccess: () => {
      if (onClose) {
         onClose()
      }
     
      toast.success('Update was successful!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useUserUpdateAvatar = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) =>
  useMutation<FormData, AxiosError<BDError>, FormData>({
    //@ts-ignore
    mutationFn: (data) => userUpdateAvatar(data),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess()
      }
      toast.success('Update was successful!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useDeleteAvatar = ({ onSuccess }: { onSuccess?: () => void }) =>
  useMutation({
    mutationFn: () => userDeleteAvatar(),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess()
      }
      toast.success('Avatar was successfully deleted!')
    },
  })
