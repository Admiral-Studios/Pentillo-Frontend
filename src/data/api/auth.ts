import axiosApi, { axiosInvitationApi } from '../axiosApi'
import {
  IPostAuthGoogleParams,
  IPostAuthSignInParams,
  IPostAuthSignUpParams,
} from './api.types'

export const postAuthGoogle = async ({ code, token, invitationToken }: IPostAuthGoogleParams) =>
  axiosApi.post('/auth/google', { code, token, invitationToken }).then((res) => res.data)

export const postAuthSignUp = async ({
  firstName,
  lastName,
  password,
  email,
  invitationToken
}: IPostAuthSignUpParams) =>
  axiosApi
    .post('/auth/register', {
      firstName,
      lastName,
      password,
      email,
      invitationToken,
    })
    .then((res) => res.data)

export const postAuthSignIn = async ({
  password,
  email,
  invitationToken
}: IPostAuthSignInParams) =>
  axiosApi
    .post('/auth/log-in', {
      password,
      email,
      invitationToken,
    })
    .then((res) => res.data)

export const forgotPassword = async ({ email }: { email: string }) =>
  axiosApi.post('/auth/forgot-password', { email }).then((res) => res.data)

export const authLogout = async () =>
  axiosApi.post('/auth/log-out', {}).then((res) => res.data)

export const forgotPasswordSubmit = async ({
  code,
  email,
}: {
  code: string
  email: string
}) => axiosApi.post('/auth/confirm', { code, email }).then((res) => res.data)

export const confirmEmailSubmit = async ({
  code,
  email,
}: {
  code: string
  email: string
}) => axiosApi.post('/auth/confirm', { code, email }).then((res) => res.data)
