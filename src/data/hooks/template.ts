import {
  createTemplate,
  getTemplateById,
  getTemplates,
  removeTemplate,
  updateTemplate,
} from '@/data/api/template'
import { templatesKeys } from '@/data/queryKeys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  BDError,
  IRemoveTemplatesParams,
  ITemplate,
  ITemplateGetResponse,
  ITemplatePostResponse,
} from '../api/api.types'
import { Dispatch, SetStateAction } from 'react'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export const useGetTemplates = (
  params?: any,
  setCount?: Dispatch<SetStateAction<number | undefined>>,
) =>
  useQuery<ITemplateGetResponse>({
    queryKey: [templatesKeys.all, params],
    queryFn: () =>
      getTemplates(params).then((res) => {
        setCount && setCount(res.count as number)
        return res
      }),
  })

export const useRemoveTemplate = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation<any, AxiosError<BDError>, any, unknown>({
    mutationFn: (params: IRemoveTemplatesParams) => removeTemplate(params),
    onSuccess: () => {
      onSuccess()
      toast.success('The templates was successfully deleted.', {
        style: { maxWidth: '600px' },
      })
    },
    onError: (data) => {
      toast.error(data.toString())
    },
  })

export const useCreateTemplate = ({ onSuccess }: { onSuccess?: () => void }) =>
  useMutation<
    ITemplatePostResponse,
    AxiosError<BDError>,
    ITemplatePostResponse,
    unknown
  >({
    mutationFn: (data) => createTemplate(data),
    onSuccess: () => {
      toast.success('Template successfuly added!')
      if (onSuccess) onSuccess()
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useTemplateById = (id: string) =>
  useQuery<ITemplatePostResponse>({
    queryKey: [templatesKeys.details(id), templatesKeys.all],
    queryFn: () => getTemplateById(id),
  })

export const usePatchTemplateById = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [templatesKeys.details(id), templatesKeys.all],
    mutationFn: (data: ITemplate) => updateTemplate(id, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [templatesKeys.details(id), templatesKeys.all],
      })
    },
  })
}
