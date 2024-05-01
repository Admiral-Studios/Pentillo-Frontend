import React, { useEffect, useState } from 'react'
import {
  StyledDateInputWrapper,
  StyledDeleteWrapper,
  StyledErrorMessage,
  StyledIconWrapper,
  StyledInputWrapper,
  StyledSubTaskWrapper,
  StyledTypography,
} from '../subtaskSection.styled'
import { Box, SelectChangeEvent } from '@mui/material'
import SelectRegular from '@/components/UI/selects/selectRegular'
import dateIcon from '@/assets/icons/date-icon.svg'
import processIcon from '@/assets/icons/process-status-icon.svg'
import newIcon from '@/assets/icons/new-status-icon.svg'
import holdIcon from '@/assets/icons/hold-status-icon.svg'
import tickSelectIcon from '@/assets/icons/tick-status-icon.svg'
import { TASK_STATUS } from '@/types/enum'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import Image from 'next/image'
import { RemoveIcon } from '@/components/UI/icons'
import ModalDelete from '@/components/UI/modals/modalDelete'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { subtaskFormSchema } from '../subtaskForm.schema'
import { CssTextField } from '@/ui/components/styled'
import DatePicker from '@/components/UI/inputs/datePicker'
import { ISubTask, ISubtasksForm } from '@/app/(main)/tasks/create-task/types'
import DatePickerMui from '@/components/UI/inputs/datePickerMui'
import dayjs from 'dayjs'

interface ISubtaskWrapper {
  subTask: ISubTask
  index: number
  handleSubTaskChange: (index: number, newTitle: string, newDate: Date) => void
  handleDeleteSubTask: (index: number) => void
  handleStatusChange: (index: number, newStatus: TASK_STATUS) => void
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

export const SubtaskWrapper = ({
  subTask,
  index,
  handleSubTaskChange,
  handleStatusChange,
  handleDeleteSubTask,
}: ISubtaskWrapper) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ISubtasksForm>({
    mode: 'onBlur',
    resolver: yupResolver(subtaskFormSchema) as Resolver<ISubtasksForm>,
  })

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }
  const handleEditOnBlur: SubmitHandler<ISubtasksForm> = (data) => {
    handleSubTaskChange(index, data.title, data.dueDate)
    setValue('title', data.title)
    setValue('dueDate', data.dueDate)
  }

  useEffect(() => {
    if (subTask) {
      setValue('title', subTask.title)
      setValue('dueDate', subTask.dueDate)
    }

    return () => {
      reset()
    }
  }, [subTask, setValue, reset])
  return (
    <StyledSubTaskWrapper onBlur={handleSubmit(handleEditOnBlur)}>
      <Box sx={{ width: '132px' }}>
        <SelectRegular
          value={subTask.status}
          sxInput={{
            maxWidth: 132 + 'px',
            height: '28px !important',
          }}
          sxSelect={{
            maxWidth: 132 + 'px',
            height: '28px !important',
          }}
          options={getOptionsFromEnum(TASK_STATUS)}
          isIcons={true}
          onChange={(event: SelectChangeEvent<string>) =>
            handleStatusChange(index, event.target.value as TASK_STATUS)
          }
        />
      </Box>
      <StyledInputWrapper>
        <Controller
          control={control}
          rules={{ required: true }}
          name={'title'}
          render={({ field: { onChange, value } }) => (
            <CssTextField
              height='28px'
              sx={{
                width: 483 + 'px',
                height: '28px!important',
              }}
              focused
              label={'Title'}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <StyledErrorMessage>{errors['title']?.message}</StyledErrorMessage>
      </StyledInputWrapper>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <StyledDateInputWrapper>
          <Image src={dateIcon} alt='Date icon' />
          <StyledInputWrapper width={117 + 'px'}>
            <Controller
              control={control}
              name={'dueDate'}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <DatePickerMui
                      onBlur={handleSubmit(handleEditOnBlur)}
                      value={dayjs(value)}
                      height={'28px'}
                      onChange={onChange}
                    />
                  </>
                )
              }}
            />
            <StyledErrorMessage>
              {errors['dueDate']?.message}
            </StyledErrorMessage>
          </StyledInputWrapper>
        </StyledDateInputWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <StyledDeleteWrapper
            onClick={() => {
              handleOpen()
            }}
          >
            <StyledIconWrapper>
              <RemoveIcon
                sx={{ path: { fill: '#E46962' }, fontSize: '20px' }}
              />
            </StyledIconWrapper>
           
          </StyledDeleteWrapper>
          <ModalDelete
            title={`Are you sure want to delete “${subTask.title}” sub-task?`}
            description='You will not be able to recover a deleted sub-task'
            open={isOpen}
            handleClose={handleOpen}
            handleDelete={() => {
              handleDeleteSubTask(index)
              setIsOpen(false)
            }}
          />
        </Box>
      </Box>
    </StyledSubTaskWrapper>
  )
}
