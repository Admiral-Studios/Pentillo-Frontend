import {
  IAgent,
  IAgentsListParams,
  IContactCompanyListParams,
  IContactGetResponse,
  IContactPostResponse,
  IContactResponse,
  IContactUpdateResponse,
} from '@/data/api/api.types'
import {
  createContact,
  deleteContact,
  getAgentsList,
  getContactById,
  getContacts,
  getContactsCompanyList,
  updateContact,
} from '@/data/api/contact'
import { contactKeys, listKeys } from '@/data/queryKeys'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import {
  BDError,
  IContact,
  IContactParams,
  IRemoveContactsParams,
} from '../api/api.types'
// import { createContact, deleteContact, getContacts } from '../api/contact'
import { IAddNewContactForm } from '@/app/(main)/contacts/create-contact/types'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { IUseDeleteContactProps } from './hooks.types'

export const useGetContacts = () =>
  useQuery<IContactGetResponse>({
    queryKey: [contactKeys.all],
    queryFn: () => getContacts(),
  })

export const useContact = (
  params: IContactParams,
  setCount: Dispatch<SetStateAction<number | undefined>>,
) =>
  useQuery<IContact>({
    queryKey: [contactKeys.list(params)],
    queryFn: () =>
      getContacts(params).then((res) => {
        setCount(res.count as number)

        return res
      }),
  })

export const useGetContactById = (id: string) =>
  useQuery<IContactResponse>({
    queryKey: [contactKeys.all],
    queryFn: () => getContactById(id),
  })

export const useContactCompanyList = (params: IContactCompanyListParams) =>
  useQuery({
    queryKey: [contactKeys.listCompanies(params)],
    queryFn: () => getContactsCompanyList(params),
  })

export const useCreateContact = ({
  onSuccess,
}: {
  onSuccess?: (data: IContactPostResponse) => void
}) =>
  useMutation<
    IContactPostResponse,
    AxiosError<BDError>,
    IAddNewContactForm,
    unknown
  >({
    mutationKey: [contactKeys.all],
    mutationFn: (data) => createContact(data),
    onSuccess: (data) => {
      toast.success('Contact successfuly added!')
      if (onSuccess) onSuccess(data)
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useAgentsList = (params: IAgentsListParams) =>
  useQuery({
    queryKey: [listKeys.listAssignedAgents(params)],
    queryFn: () => getAgentsList(params),
  })

export const useUpdateContact = ({
  onSuccess,
}: {
  onSuccess?: (data: IContactUpdateResponse) => void
}) =>
  useMutation<
    IContactUpdateResponse,
    AxiosError<BDError>,
    IContactUpdateResponse,
    unknown
  >({
    mutationFn: (data) => updateContact(data),
    onSuccess: (data) => {
      // toast.success('Contact successfuly updated!')
      if (onSuccess) onSuccess(data)
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useDeleteContact = ({ onSuccess }: IUseDeleteContactProps) =>
  useMutation({
    mutationFn: (params: IRemoveContactsParams) => deleteContact(params),
    onSuccess,
    onError: () => {
      toast.error('Cannot delete contact, please try again later')
    },
  })
