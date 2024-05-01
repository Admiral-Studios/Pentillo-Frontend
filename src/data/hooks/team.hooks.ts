import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import {
  BDError,
  IRemoveTeamMembersParams,
  ITeamMember,
  ITeamMemberData,
} from '../api/api.types'
import {
  acceptInviteInTeam,
  getIsTeamOwner,
  getRoleList,
  getSearchInfo,
  getSelectedTeamMember,
  getTeamData,
  leaveTeam,
  removeMember,
  sendInviteInTeam,
} from '../api/team.api'
import { teamsKeys } from '../queryKeys'
import { Dispatch, SetStateAction } from 'react'
import { ISearchParams, IUseLeaveTeamProps } from './hooks.types'

export const useSendInviteToTeam = () =>
  useMutation<any, AxiosError<BDError>, { email: string }, unknown>({
    mutationFn: (data) => sendInviteInTeam({ invitedUserEmail: data.email }),
    onSuccess: (data) => {
      toast.success('Invite sended!')
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useTeamInviteAccept = () =>
  useMutation<any, AxiosError<BDError>, { token: string }, unknown>({
    mutationFn: (data) => acceptInviteInTeam(data.token),
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useTeamData = (
  params: any,
  setCount: Dispatch<SetStateAction<number | undefined>>
) =>
  useQuery<ITeamMember>({
    queryKey: [teamsKeys.all, params],
    queryFn: () =>
      getTeamData(params).then((res) => {
        setCount(res.count as number)

        return res
      }),
  })

export const useSearchMembers = () =>
  useMutation<ITeamMemberData[], AxiosError<BDError>, ISearchParams, unknown>({
    mutationFn: (data) => getSearchInfo(data)
  })

export const useSelectedTeamMember = (memberId: string) => {
  useQuery<any>({
    queryKey: [teamsKeys.selectedMember],
    queryFn: () => getSelectedTeamMember(memberId)
  })
}

export const useRemoveMember = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<
  any,
  AxiosError<BDError>,
  any,
  unknown
>({
    mutationFn: (params: IRemoveTeamMembersParams) => removeMember(params),
    onSuccess: () => {
      onSuccess()
      toast.success('The member was successfully removed.', {
        style: { maxWidth: '600px' },
      })
    },
    onError: (data) => {
      toast.error(data.toString())
    },
  })

export const useRoleList = () => {
  return useQuery({
    queryKey: [teamsKeys.rolesAll],
    queryFn: getRoleList,
  })
}

export const useIsTeamOwner = () => {
  return useQuery({
    queryKey: [teamsKeys.all],
    queryFn: getIsTeamOwner,
  })
}

export const useLeaveTeam = ({ onSuccess }: IUseLeaveTeamProps) =>
  useMutation({
    mutationFn: leaveTeam,
    onSuccess: () => {
      if(onSuccess) onSuccess()
      toast.success('You have successfully left the team.', {
        style: { maxWidth: '600px' },
      })
    },
    onError: () => {
      toast.error('Cannot leave team, please try again later.')
    },
  })



