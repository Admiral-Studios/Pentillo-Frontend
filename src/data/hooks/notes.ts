import { Dispatch, SetStateAction } from 'react'
import {
  BDError,
  INote,
  INoteData,
  INotesParams,
  IPostNoteBody,
  IRemoveTransactionsNotesParams,
} from '../api/api.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteNotes,
  getTransactionNotes,
  patchTransactionNoteById,
  postTransactionNote,
} from '../api/notes'
import { notesKeys } from '../queryKeys'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { IUseDeleteNoteProps } from './hooks.types'

export const useNotes = (
  params: INotesParams,
  setCount: Dispatch<SetStateAction<number | undefined>>,
  id: string,
) =>
  useQuery<INoteData[]>({
    queryKey: [notesKeys.list(params)],
    queryFn: () =>
      getTransactionNotes(id, params).then((res) => {
        setCount(res.count as number)
        return res
      }),
  })

export const useCreateNote = ({
  id,
  onSuccess,
}: {
  id: string
  onSuccess?: (data: IPostNoteBody) => void
}) =>
  useMutation<IPostNoteBody, AxiosError<BDError>, IPostNoteBody, unknown>({
    mutationFn: (data) => postTransactionNote(id, data),
    onSuccess: (data) => {
      toast.success('Note successfuly added!')
      if (onSuccess) onSuccess(data)
    },
    onError: (data) => {
      toast.error(data.response?.data.message as string)
    },
  })

export const useDeleteNote = ({ onSuccess }: IUseDeleteNoteProps) =>
  useMutation({
    mutationFn: (params: IRemoveTransactionsNotesParams) => deleteNotes(params),
    onSuccess,
    onError: () => {
      toast.error('Cannot delete task, please try again later')
    },
  })

export const usePatchTransactionNoteById = ({
  id,
  noteId,
}: {
  id: string
  noteId: string
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [notesKeys.all],
    mutationFn: (data: IPostNoteBody) =>
      patchTransactionNoteById(id, noteId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [notesKeys.all],
      })
    },
  })
}
