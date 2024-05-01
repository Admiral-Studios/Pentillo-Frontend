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
import { IInformationForm } from '../../editTaskModal.types'
import { useUpdateTask } from '@/data/hooks/task'
import { NAV_LINKS } from '@/utils/constants/nav'
import Link from 'next/link'

interface INotesSectionProps {
  taskData: ITaskData
}

const NotesSection = ({ taskData }: INotesSectionProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IInformationForm>({ mode: 'onBlur' })
  const { mutate: mutateUpdateTask } = useUpdateTask({})

  const onSubmit: SubmitHandler<IInformationForm> = (data) => {
    const id = taskData.id
    mutateUpdateTask({ id, data: data })
  }

  useEffect(() => {
    if (taskData) {
      setValue('title', taskData.title)
      setValue('description', taskData?.description as string)
      setValue('status', taskData.status)
      setValue('dueDate', taskData.dueDate)
      setValue('reminderDate', taskData.reminderDate as Date)
      setValue('notes', taskData?.notes)
      setValue('assignedPersonId', taskData?.assignedPerson?.id)
    }

    return () => {
      reset()
    }
  }, [taskData, setValue, reset])

  return (
    <StyledForm onBlur={handleSubmit(onSubmit)}>
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
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <StyledErrorMessage>{errors['notes']?.message}</StyledErrorMessage>
          </StyledInputWrapper>
        </StyledFormInputsWrapper>
      </Box>
      {/* <StyledButtonsWrapper>
      <StyledRegularButton  sx={{ width: '132px' }} onClick={handlePrev} variant='outlined'>
          Back
        </StyledRegularButton>
        <Link href='/tasks'>
          <StyledRegularButton
            type='submit'
            variant='contained'
            sx={{ width: '132px' }}
          >
            All tasks
          </StyledRegularButton>
        </Link>
      </StyledButtonsWrapper> */}
    </StyledForm>
  )
}

export default NotesSection
