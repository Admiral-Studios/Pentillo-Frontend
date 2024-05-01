import Image from 'next/image'
import {
  ModalContent,
  StyledBackdrop,
  StyledCloseIconWrapper,
  StyledCssTextField,
  StyledErrorMessage,
  StyledForm,
  StyledInputWrapper,
  StyledModal,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
  StyledTypography,
  StyledWrapper,
} from './addNoteModal.styled'
import closeIcon from '@/assets/icons/close-modal-icon.svg'
import { StyledButton } from '@/components/newUI/buttons/buttons.styled'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm, Resolver, SubmitHandler } from 'react-hook-form'
import { INoteModalWindow } from './addNoteModal.types'
import { noteModalFormSchema } from './addNoteModal.schema'
import { INoteData } from '@/data/api/api.types'
import { useEffect } from 'react'
import { useCreateNote, usePatchTransactionNoteById } from '@/data/hooks/notes'

interface IAdNoteModalProps {
  open: boolean
  handleClose: () => void
  noteData?: INoteData
  onSuccess?: () => void
  transactionId: string
}

const AddNoteModal = ({
  open,
  handleClose,
  noteData,
  onSuccess,
  transactionId,
}: IAdNoteModalProps) => {
  const { handleSubmit, control, setValue, formState, reset, ...otherProps } =
    useForm<INoteModalWindow>({
      resolver: yupResolver(noteModalFormSchema) as Resolver<INoteModalWindow>,
    })
  const { mutate: mutateAddNote } = useCreateNote({
    id: transactionId,
    onSuccess,
  })
  const { mutate: mutateUpdateNote } = usePatchTransactionNoteById({
    id: transactionId,
    noteId: noteData?.id as string,
  })

  const onSubmit: SubmitHandler<INoteModalWindow> = (data) => {
    const newNoteData = {
      id: noteData?.id as string,
      createdAt: noteData?.createdAt,
      ...data,
    }
    noteData ? mutateUpdateNote(newNoteData) : mutateAddNote(data)
    handleClose()
    reset()
  }

  useEffect(() => {
    if (noteData) {
      setValue('text', noteData?.text)
    }
  }, [noteData])

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent>
        <StyledModalHeader>
          <StyledTypography>Note</StyledTypography>
          <StyledCloseIconWrapper onClick={handleClose}>
            <Image src={closeIcon} alt='close icon' />
          </StyledCloseIconWrapper>
        </StyledModalHeader>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledModalBody>
            <StyledWrapper>
              <StyledInputWrapper>
                <Controller
                  control={control}
                  name={'text'}
                  render={({ field: { onChange, value } }) => (
                    <StyledCssTextField
                      multiline
                      focused
                      rows={4}
                      label='Title'
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <StyledErrorMessage>
                  {formState.errors['text']?.message}
                </StyledErrorMessage>
              </StyledInputWrapper>
            </StyledWrapper>
          </StyledModalBody>
          <StyledModalFooter>
            <StyledButton onClick={handleClose} outlined>
              Cancel
            </StyledButton>
            <StyledButton type='submit'>
              {noteData ? 'Save' : 'Create'}
            </StyledButton>
          </StyledModalFooter>
        </StyledForm>
      </ModalContent>
    </StyledModal>
  )
}

export default AddNoteModal
