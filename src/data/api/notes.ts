import axiosApi from '../axiosApi'
import {
  INotesParams,
  IPostNoteBody,
  IRemoveTransactionsNotesParams,
} from './api.types'

export const getTransactionNotes = async (id: string, params: INotesParams) =>
  axiosApi
    .get(`/transaction-notes/${id}`, { params })
    .then((res) => res.data)

export const postTransactionNote = async (id: string, body: IPostNoteBody) =>
  axiosApi
    .post(`/transaction-notes/${id}/create-note`, body)
    .then((res) => res.data)

export const patchTransactionNoteById = (
  id: string,
  noteId: string,
  data: IPostNoteBody,
) =>
  axiosApi
    .patch(`/transaction-notes/${id}/update-note/${noteId}`, data)
    .then((res) => res.data)

export const deleteNotes = async (
  params: IRemoveTransactionsNotesParams,
) => {
  let ids: string = ''

  for (let i = 0; i < params.ids.length; i++) {
    const id = params.ids[i]

    if (i) {
      ids = ids + '&ids=' + id
    } else {
      ids = '?ids=' + id
    }
  }

  const response = axiosApi.delete(
    `/transaction-notes/${params.id}/delete-notes${ids}`,
  )

  return response.then((res) => res.data)
}
