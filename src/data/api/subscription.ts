import { SUBCRIPTION_PLAN } from '@/types/enum'
import axiosApi from '../axiosApi'

export const fetchSubscriptionData = async () =>
  axiosApi.get('/subscription/get-subscription').then((res) => res.data)

export const createSubscription = async (type: SUBCRIPTION_PLAN, successUrl?: string) =>
  axiosApi
    .post('/subscription/create-subscription', { successUrl: successUrl, type })
    .then((res) => res.data)

export const cancelSubscription = async () =>
  axiosApi.post('/subscription/cancel-subscription').then((res) => res.data)

export const updatePaymentInfo = async (successUrl?: string) =>
  axiosApi.post('/subscription/create-portal-session', { returnUrl: successUrl }).then((res) => res.data)
