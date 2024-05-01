import { IGetDocumentsParams } from '@/data/api/api.types'
import { downloadBlobFile } from '@/utils/downloadBlobFile'
import axiosApi from '../axiosApi'

export const uploadDocument = (body: FormData) =>
  axiosApi
    .post('/storage/upload-file', body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)

export const getDocuments = (params: IGetDocumentsParams) =>
  axiosApi.get(`/storage`, { params }).then((res) => res.data)

export const getAllDocumentsForDownload = (listId: string) =>
  axiosApi
    .get(`/storage/download/list/${listId}`, { responseType: 'blob' })
    .then((res) => {
      downloadBlobFile(res.data, `documents-${new Date().toDateString()}`)

      return null
    })

export const getDocumentsByIdsForDownload = (
  listId: string,
  fileIds: string[],
) =>
  axiosApi
    .get(`/storage/download/files/list/${listId}/zip`, {
      responseType: 'blob',
      params: { fileIds },
    })
    .then((res) => {
      downloadBlobFile(res.data, `documents-${new Date().toDateString()}`)

      return null
    })

export const deleteDocumentsByIds = (ids: string[]) =>
  axiosApi
    .delete('/storage/delete-files', { params: { ids } })
    .then((res) => res.data)

export const updateDocumentByIds = (id: string, data: FormData) =>
  axiosApi
    .patch(`/storage/update-file/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)
