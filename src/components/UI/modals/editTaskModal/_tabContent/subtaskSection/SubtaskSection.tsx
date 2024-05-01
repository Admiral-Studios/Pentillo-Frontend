import { StyledRegularButton } from '@/components/UI/buttons/buttonRegular'
import { Controller, SubmitHandler, useForm, Resolver } from 'react-hook-form'
import { Box, Button } from '@mui/material'
import { ISubTask, ISubtasksForm } from '../../editTaskModal.types'
import {
  StyledAddSubTaskBlock,
  StyledButtonsWrapper,
  StyledDateInputWrapper,
  StyledDeleteWrapper,
  StyledErrorMessage,
  StyledForm,
  StyledFormInputsWrapper,
  StyledFormWrapper,
  StyledFormsWrapper,
  StyledIconWrapper,
  StyledInputWrapper,
  StyledSubTaskWrapper,
  StyledSubTasksWrapper,
  StyledSubmitButtonsWrapper,
  StyledTypography,
} from './subtaskSection.styled'
import { CssTextField } from '@/ui/components/styled'
import DatePicker from '@/components/UI/inputs/datePicker'
import dateIcon from '@/assets/icons/date-icon.svg'
import tickIcon from '@/assets/icons/tick-green-icon.svg'
import cancelIcon from '@/assets/icons/close-red-icon.svg'
import processIcon from '@/assets/icons/process-status-icon.svg'
import newIcon from '@/assets/icons/new-status-icon.svg'
import holdIcon from '@/assets/icons/hold-status-icon.svg'
import tickSelectIcon from '@/assets/icons/tick-status-icon.svg'
import addIcon from '@/assets/icons/add-sub-task-icon.svg'
import Image from 'next/image'
import { TASK_STATUS } from '@/types/enum'
import { yupResolver } from '@hookform/resolvers/yup'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { subtaskFormSchema } from './subtaskForm.schema'
import { ITaskData } from '@/data/api/api.types'
import {
  useCreateSubTask
} from '@/data/hooks/task'
import { useQueryClient } from '@tanstack/react-query'
import { SubtaskWrapper } from './_components/SubtaskWrapper'
import RegularInput from '@/components/UI/inputs/inputs/regularInput/RegularInput'

interface ISubtaskSectionProps {
  taskData: ITaskData
  subtaskData: ISubTask[]
}

const getIconForStatus = (status: TASK_STATUS) => {
  switch (status) {
    case TASK_STATUS.DONE:
      return tickSelectIcon
    case TASK_STATUS.IN_PROCESS:
      return processIcon
    case TASK_STATUS.NEW:
      return newIcon
    case TASK_STATUS.ON_HOLD:
      return holdIcon
    default:
      return null
  }
}

export const getOptionsFromEnum = (e: object): IOption[] =>
  Object.entries(e).map(([key, value]) => ({
    name: value,
    value: key,
    icon: getIconForStatus(value as TASK_STATUS),
  }))

const SubtaskSection = ({
  taskData,
  subtaskData,
}: ISubtaskSectionProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ISubtasksForm>({
    resolver: yupResolver(subtaskFormSchema) as Resolver<ISubtasksForm>,
  })
  const queryClient = useQueryClient()

  const { mutate: createSubTask } = useCreateSubTask({ queryClient })

  const onSubmit: SubmitHandler<ISubtasksForm> = (data) => {
    const id = taskData.id
    createSubTask({ id, data: { ...data, status: 'NEW' as TASK_STATUS } })
    reset({ title: '' })
  }

  return (
    <StyledFormsWrapper>
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <StyledFormInputsWrapper>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledFormWrapper>
              <StyledInputWrapper>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name={'title'}
                  render={({ field: { onChange, value } }) => (
                    <RegularInput
                      height='36px'
                      sxInput={{
                        width: 606 + 'px',
                        height: '36px!important',
                      }}
                      label={'Sub-tasks'}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <StyledErrorMessage>
                  {errors['title']?.message}
                </StyledErrorMessage>
              </StyledInputWrapper>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <StyledDateInputWrapper>
                  <Image src={dateIcon} alt='Date icon' />
                  <StyledInputWrapper width={117 + 'px'}>
                    <Controller
                      control={control}
                      name={'dueDate'}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <DatePicker
                            selected={value as Date | undefined}
                            onChange={onChange}
                            height={'36px'}
                          />
                        </>
                      )}
                    />
                  </StyledInputWrapper>
                </StyledDateInputWrapper>
                <StyledErrorMessage>
                  {errors['dueDate']?.message}
                </StyledErrorMessage>
              </Box>

              <StyledSubmitButtonsWrapper>
                <Button type='submit' sx={{ padding: 0, minWidth: '20px' }}>
                  <Image src={tickIcon} alt='Tick Icon' />
                </Button>
                <Image
                  src={cancelIcon}
                  style={{ cursor: 'pointer' }}
                  alt='Close icon'
                  onClick={() => reset({ title: '' })}
                />
              </StyledSubmitButtonsWrapper>
            </StyledFormWrapper>
          </StyledForm>
          <StyledSubTasksWrapper>
            {subtaskData?.map((subTask, index) => (
              <SubtaskWrapper
                key={index}
                subTask={subTask}
                taskData={taskData}
              />
            ))}
          </StyledSubTasksWrapper>
        </StyledFormInputsWrapper>
      </Box>

      {/* <StyledButtonsWrapper>
        <StyledRegularButton onClick={handlePrev} variant='outlined'>
          Back
        </StyledRegularButton>
        <StyledRegularButton onClick={handleNextSubmit} variant='contained'>
          Next
        </StyledRegularButton>
      </StyledButtonsWrapper> */}
    </StyledFormsWrapper>
  )
}

export default SubtaskSection
