import { IForgotPasswordData } from './../api/api.types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  BDError,
  IPostAuthGoogleParams,
  IPostAuthSignInParams,
  IPostAuthSignUpParams,
  IPostAuthSignUpSuccessData,
} from '../api/api.types'
import {
  authLogout,
  confirmEmailSubmit,
  forgotPassword,
  forgotPasswordSubmit,
  postAuthGoogle,
  postAuthSignIn,
  postAuthSignUp,
} from '../api/auth'
import { IForgotPasswordParams } from './hooks.types'
import toast from 'react-hot-toast'

export const useAuthGoogle = () =>
  useMutation<
    IPostAuthSignUpSuccessData,
    AxiosError<BDError>,
    IPostAuthGoogleParams,
    unknown
  >({
    mutationFn: (data) => postAuthGoogle(data),
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useAuthSignUp = () =>
  useMutation<
    IPostAuthSignUpSuccessData,
    AxiosError<BDError>,
    IPostAuthSignUpParams,
    unknown
  >({
    mutationFn: (data) => postAuthSignUp(data),
    onSuccess: (data) => {
      toast.success('Successful signing up!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useAuthSignIn = () =>
  useMutation<
    IPostAuthSignUpSuccessData,
    AxiosError<BDError>,
    IPostAuthSignInParams,
    unknown
  >({
    mutationFn: (data) => postAuthSignIn(data),
    onSuccess: (data) => {
      toast.success('Successful signing in!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useForgotPassword = ({ handleStep }: IForgotPasswordParams) =>
  useMutation<IForgotPasswordData, AxiosError<BDError>, { email: string }>({
    mutationFn: (data) => forgotPassword(data),
    onSuccess: () => {
      handleStep(2)
      toast.success('Code was sent to your email!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useLogout = () =>
  useMutation<{}, AxiosError<BDError>>({
    mutationFn: () => authLogout(),
    onSuccess: () => {
      toast.success('Log out was successful!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useForgotPasswordSubmit = ({
  handleStep,
}: IForgotPasswordParams) =>
  useMutation<
    IForgotPasswordData,
    AxiosError<BDError>,
    { code: string; email: string }
  >({
    mutationFn: (data) => forgotPasswordSubmit(data),
    onSuccess: () => {
      handleStep(3)
      toast.success('Verifying was successful!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useConfirmEmailSubmit = () =>
  useMutation<
    { code: string },
    AxiosError<BDError>,
    { code: string; email: string }
  >({
    mutationFn: (data) => confirmEmailSubmit(data),
    onSuccess: () => {
      toast.success('Verifying was successful!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })
