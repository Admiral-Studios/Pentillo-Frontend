import { StyledRegularButton } from '@/components/UI/buttons/buttonRegular'
import { CssTextField } from '@/ui/components/styled'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Box } from '@mui/material'
import {
  StyledButtonsWrapper,
  StyledErrorMessage,
  StyledForm,
  StyledFormInputsWrapper,
  StyledInputWrapper,
} from './notesSection.styled'
import { ITaskData } from '@/data/api/api.types'
import { useEffect } from 'react'
import { IInformationForm } from '../../addTaskModal.types'
import { useUpdateTask } from '@/data/hooks/task'
import { NAV_LINKS } from '@/utils/constants/nav'
import Link from 'next/link'
import RegularInput from '@/components/UI/inputs/inputs/regularInput/RegularInput'

interface INotesSectionProps {
  handleCreateTask: (data: string) => void
  handlePrev: () => void
  notesData: string
  handleNotes: (data: string) => void
}

const NotesSection = ({
  handleCreateTask,
  handlePrev,
  notesData,
  handleNotes,
}: INotesSectionProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{ notes: string }>()

  const onSubmit: SubmitHandler<{ notes: string }> = (data) => {
    handleCreateTask(data.notes)
  }

  useEffect(() => {
    if (notesData) {
      setValue('notes', notesData)
    }

    return () => {
      reset()
    }
  }, [notesData, setValue, reset])

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <StyledFormInputsWrapper>
          <StyledInputWrapper>
            <Controller
              control={control}
              name={'notes'}
              render={({ field: { onChange, value } }) => (
                <RegularInput
                  sxInput={{
                    width: '100%',
                    '& div': {
                      padding: '0',
                    },
                  }}
                  multiline
                  rows={4}
                  label={'Notes'}
                  onChange={(e) => {
                    onChange()
                    handleNotes(e.target.value)
                  }}
                  value={value}
                  filled
                />
              )}
            />
            <StyledErrorMessage>{errors['notes']?.message}</StyledErrorMessage>
          </StyledInputWrapper>
        </StyledFormInputsWrapper>
      </Box>
      <StyledButtonsWrapper>
        <StyledRegularButton
          sx={{ width: '132px' }}
          onClick={handlePrev}
          variant='outlined'
          type='button'
        >
          Back
        </StyledRegularButton>
        <StyledRegularButton
          type='submit'
          variant='contained'
          sx={{ width: '132px' }}
        >
          Create
        </StyledRegularButton>
      </StyledButtonsWrapper>
    </StyledForm>
  )
}

export default NotesSection
