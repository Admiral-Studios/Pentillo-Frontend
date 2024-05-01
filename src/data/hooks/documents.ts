import {
  IFile,
  IGetDocumentsParams,
  IGetDocumentsResponse,
} from '@/data/api/api.types'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  deleteDocumentsByIds,
  getDocuments,
  updateDocumentByIds,
  uploadDocument,
} from '../api/documents'
import { documnetsKeys } from '../queryKeys'

interface IUseUploadDocumentProps {
  onSuccess?: () => void
}

export const useUploadDocument = ({ onSuccess }: IUseUploadDocumentProps) =>
  useMutation({
    mutationKey: [documnetsKeys.all],
    mutationFn: (body: FormData) => uploadDocument(body),
    onSuccess() {
      if (onSuccess) {
        onSuccess()
      }
    },
  })

export const useDocumentByListId = (params: IGetDocumentsParams) =>
  useQuery<IFile[]>({
    queryKey: [documnetsKeys.details(params)],
    queryFn: () => getDocuments(params),
    enabled: false,
  })

export const useDeleteDocumentByIds = (onSuccess?: () => void) =>
  useMutation({
    mutationKey: [documnetsKeys.all],
    mutationFn: (ids: string[]) => deleteDocumentsByIds(ids),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess()
      }
    },
  })

export const useUpdateDocument = (id: string) =>
  useMutation({
    mutationKey: [documnetsKeys.all],
    mutationFn: (data: FormData) => updateDocumentByIds(id, data),
  })
