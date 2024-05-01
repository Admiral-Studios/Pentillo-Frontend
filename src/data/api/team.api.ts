import { AxiosError, AxiosHeaderValue, AxiosHeaders, isAxiosError } from 'axios'
import axiosApi, { axiosInvitationApi } from '../axiosApi'
import { ISearchParams } from '../hooks/hooks.types'
import { IRemoveTeamMembersParams } from './api.types'

export const sendInviteInTeam = async ({
  invitedUserEmail,
}: {
  invitedUserEmail: string
}) =>
  axiosApi
    .post('/invitation/send', {
      invitedUserEmail,
    })
    .then((res) => res.data)

export const acceptInviteInTeam = async (token: string) => {
  try {
    return (
      axiosApi
        .post(`invitation/accept/${token}`)
        .then((res) => res)
    )
  } catch (error) {
    throw error
  }
}

export const getTeamData = async (params: any) =>
  axiosApi.get('/team/members', { params }).then((res) => res.data)

export const getSelectedTeamMember = async (memberId: any) =>
  axiosApi.get(`/team/member/${memberId}`).then((res) => res.data)

export const removeMember = async (members: IRemoveTeamMembersParams) => {
  try {
    const response = await axiosApi.delete('/team/kick-members', {
      data: { ...members },
    })
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.message)
    }
  }
}

export const getRoleList = async () => {
  const response = await axiosApi.get('/team/all-roles')
  return response.data
}

export const getSearchInfo = async (searchParams: ISearchParams) =>
  axiosApi
    .post('/team/search-members', { ...searchParams })
    .then((res) => res.data)

export const getIsTeamOwner = async () => {
  const response = await axiosApi.get('/team/is-owner')
  return response.data
}

export const leaveTeam = async () =>
  axiosApi.delete('/team/leave-team').then((res) => res.data)
