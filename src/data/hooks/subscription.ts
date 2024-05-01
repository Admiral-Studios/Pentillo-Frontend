import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { subscriptionDataKeys } from '../queryKeys'
import {
  cancelSubscription,
  createSubscription,
  fetchSubscriptionData,
  updatePaymentInfo,
} from '../api/subscription'
import { BDError, IUserSubscriptionInfo } from '../api/api.types'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { SUBCRIPTION_PLAN } from '@/types/enum'

export const useFetchSubscriptionData = () => {
  return useQuery<IUserSubscriptionInfo>({
    queryKey: subscriptionDataKeys.all,
    queryFn: fetchSubscriptionData,
  })
}

export const useUserCancelSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation<any, AxiosError<BDError>>({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      toast.success('Unsubscribed!')
      queryClient.refetchQueries()
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })
}

export const useUserCreateSubscription = (successUrl?: string) => {
  return useMutation<any, AxiosError<BDError>, { successUrl: string, type: SUBCRIPTION_PLAN }>({
    mutationFn: ({ successUrl, type }) => createSubscription(type, successUrl),
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })
}

export const useUserUpdatePaymentInfo = (successUrl?: string) => {
  return useMutation<any, AxiosError<BDError>, { successUrl: string }>({
    mutationFn: ({ successUrl }) => updatePaymentInfo(successUrl),
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })
}
