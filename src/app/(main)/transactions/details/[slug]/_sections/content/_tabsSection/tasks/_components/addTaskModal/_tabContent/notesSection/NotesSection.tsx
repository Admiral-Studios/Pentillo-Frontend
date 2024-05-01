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
import { useEffect } from 'react'

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
                <CssTextField
                  sx={{
                    width: '100%',
                    '& div': {
                      padding: '0',
                    },
                  }}
                  focused
                  multiline
                  rows={4}
                  label={'Notes'}
                  onChange={(e) => {
                    onChange()
                    handleNotes(e.target.value)
                  }}
                  value={value}
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
