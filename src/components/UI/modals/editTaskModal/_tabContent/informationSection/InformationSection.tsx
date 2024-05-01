import { StyledRegularButton } from '@/components/UI/buttons/buttonRegular'
import { CssTextField } from '@/ui/components/styled'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Controller,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { informationFormSchema } from './informationForm.schema'
import { IInformationForm } from '../../editTaskModal.types'
import SelectRegular from '@/components/UI/selects/selectRegular/SelectRegular'
import 'react-phone-input-2/lib/material.css'
import { TASK_STATUS, TYPE } from '@/types/enum'
import DatePicker from '@/components/UI/inputs/datePicker'
import { useEffect, useRef, useState } from 'react'
import AddAssignedPersonModal from '@/components/UI/modals/addAssignedPersonModal'
import ContactCard from '@/components/UI/cards/contactCard'
import { IContactData, ITaskData } from '@/data/api/api.types'
import {
  StyledAssignedPersonWrapper,
  StyledButtonsWrapper,
  StyledErrorMessage,
  StyledForm,
  StyledFormInputsWrapper,
  StyledFormTitle,
  StyledFormWrapper,
  StyledInputWrapper,
  StyledListWrapper,
} from './informationForm.styled'
import tickIcon from '@/assets/icons/tick-status-icon.svg'
import processIcon from '@/assets/icons/process-status-icon.svg'
import newIcon from '@/assets/icons/new-status-icon.svg'
import holdIcon from '@/assets/icons/hold-status-icon.svg'
import { useGetContacts } from '@/data/hooks/contact'
import { useAddTaskToList, useUpdateTask } from '@/data/hooks/task'
import AddListModal from '@/components/UI/modals/addListModal/AddListModal'
import { useList } from '@/data/hooks/list'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import DatePickerMui from '@/components/UI/inputs/datePickerMui'
import { listKeys } from '@/data/queryKeys'
import RegularInput from '@/components/UI/inputs/inputs/regularInput/RegularInput'

const getIconForStatus = (status: TASK_STATUS) => {
  switch (status) {
    case TASK_STATUS.DONE:
      return tickIcon
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

type TName =
  | 'status'
  | 'title'
  | 'description'
  | 'reminderDate'
  | 'dueDate'
  | 'listId'
  | 'assignedPersonId'

type TTypeField = 'select' | 'date'
interface IInformationFields {
  id: number
  name: TName
  label: string
  type?: TTypeField
  width?: number
  options?: IOption[]
}

interface IOption {
  value: string
  name: string
}

const informationFields: IInformationFields[] = [
  { id: 2, name: 'title', label: 'Task title', width: 460 },
  { id: 3, name: 'description', label: 'Task description', width: 460 },
  { id: 4, name: 'dueDate', label: 'Date', width: 220, type: 'date' },
  {
    id: 5,
    name: 'reminderDate',
    label: 'Reminder Date',
    width: 220,
    type: 'date',
  },
]

interface IInformationSectionProps {
  taskData: ITaskData
  onSuccess?: () => void
}

const InformationSection = ({ taskData, onSuccess }: IInformationSectionProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [listModalOpen, setListModalOpen] = useState<boolean>(false)
  const [assignedPerson, setAssignedPerson] = useState<IContactData>()
  const { data: contactsData } = useGetContacts()
  const listData = useList({ type: TYPE.TASKS })
  const { mutate: mutateUpdateTask } = useUpdateTask({onSuccess})
  const queryClient = useQueryClient()
  const { mutate: mutateAddTaskToList } = useAddTaskToList({ queryClient, onSuccess })
  const handleAddToList = (listId: string) => {
    mutateAddTaskToList({ taskIds: [taskData.id] as string[], listId: listId })
  }
  const handleModal = () => {
    setListModalOpen((prev) => !prev)
  }
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState,
    trigger,
    ...otherProps
  } = useForm<IInformationForm>({
    mode: 'onBlur',
    resolver: yupResolver(informationFormSchema) as Resolver<IInformationForm>,
  })

  const onSubmit: SubmitHandler<IInformationForm> = (data) => {
    const id = taskData.id
    mutateUpdateTask({ id, data: data })
  }

  const handleCloseModal = () => setModalIsOpen(false)
  const handleOpenModal = () => setModalIsOpen(true)
  const handleAssignedPersonId = (contactId: string) => {
    setValue('assignedPersonId', contactId)
    trigger()
  }

  useEffect(() => {
    if (taskData) {
      setValue('title', taskData.title)
      setValue('description', taskData?.description as string)
      setValue('status', taskData.status)
      setValue('dueDate', taskData.dueDate)
      setValue('reminderDate', taskData.reminderDate as Date)
      setValue('assignedPersonId', taskData?.assignedPerson?.id)
    }

    return () => {
      reset()
    }
  }, [taskData, setValue, reset])

  useEffect(() => {
    if (contactsData && getValues('assignedPersonId')) {
      const person = contactsData?.data?.find(
        (contact: any) => contact.id === getValues('assignedPersonId'),
      )
      if (person) {
        setAssignedPerson(person)
      }
    }
  }, [contactsData, getValues('assignedPersonId')])
  const listName =
    listData?.data?.data?.find((list) => list?.id === taskData?.listId)?.name ||
    ' '

  return (
    <FormProvider
      control={control}
      setValue={setValue}
      formState={formState}
      handleSubmit={handleSubmit}
      reset={reset}
      trigger={trigger}
      getValues={getValues}
      {...otherProps}
    >
      <StyledForm onBlur={handleSubmit(onSubmit)}>
        <StyledFormWrapper>
          <StyledFormInputsWrapper>
            <StyledListWrapper width={460 + 'px'}>
              <StyledRegularButton
                variant='contained'
                sx={{ width: '152px' }}
                onClick={handleModal}
              >
                {taskData?.listId ? 'Change List' : 'Add List'}
              </StyledRegularButton>
              {taskData?.listId && (
                <RegularInput
                  height='44px'
                  sxInput={{
                    width: 460 + 'px',
                    height: '44px!important',
                  }}
                  disabled
                  filled
                  label={'List name'}
                  value={listName}
                />
              )}
            </StyledListWrapper>

            {getValues('status') && (
              <StyledInputWrapper width={460 + 'px'}>
                <Controller
                  control={control}
                  name={'status'}
                  render={({ field: { onChange, value } }) => (
                    <SelectRegular
                      label={'Status'}
                      onChange={onChange}
                      sxInput={{
                        maxWidth: 745 + 'px',
                      }}
                      sxSelect={{
                        maxWidth: 745 + 'px',
                        height: '44px'
                      }}
                      filled
                      value={getValues('status')}
                      options={getOptionsFromEnum(TASK_STATUS)}
                      isIcons={true}
                    />
                  )}
                />
                <StyledErrorMessage>
                  {formState.errors['status']?.message}
                </StyledErrorMessage>
              </StyledInputWrapper>
            )}

            {informationFields.map((field) => {
              if (field.type) {
                if (field.type === 'select') {
                  return (
                    <StyledInputWrapper
                      width={field.width + 'px'}
                      key={field.id}
                    >
                      <Controller
                        control={control}
                        name={field.name}
                        render={({ field: { onChange, value } }) => (
                          <SelectRegular
                            label={field.label}
                            value={value as string}
                            onChange={onChange}
                            filled={true}
                            sxInput={{
                              maxWidth: field.width + 'px',
                            }}
                            sxSelect={{
                              maxWidth: field.width + 'px',
                            }}
                            key={field.id}
                            options={field.options}
                          />
                        )}
                      />
                      <StyledErrorMessage>
                        {formState.errors[field.name]?.message}
                      </StyledErrorMessage>
                    </StyledInputWrapper>
                  )
                } else if (field.type === 'date') {
                  return (
                    <StyledInputWrapper
                      width={field.width + 'px'}
                      key={field.id}
                    >
                      <Controller
                        control={control}
                        name={field.name}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <DatePickerMui
                              onChange={onChange}
                              onBlur={handleSubmit(onSubmit)}
                              value={dayjs(value as Date)}
                              label={field.label}
                              filled={true}
                              height={'44px'}
                            />
                          </>
                        )}
                      />
                      <StyledErrorMessage>
                        {formState.errors[field.name]?.message}
                      </StyledErrorMessage>
                    </StyledInputWrapper>
                  )
                }
              }
              return (
                <StyledInputWrapper key={field.id}>
                  <Controller
                    control={control}
                    name={field.name}
                    render={({ field: { onChange, value } }) => (
                      <RegularInput
                        height='44px'
                        sxInput={{
                          width: field.width + 'px',
                          height: '44px!important',
                        }}
                        filled={true}
                        label={field.label}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  <StyledErrorMessage>
                    {formState.errors[field.name]?.message}
                  </StyledErrorMessage>
                </StyledInputWrapper>
              )
            })}
          </StyledFormInputsWrapper>
          <StyledAssignedPersonWrapper>
            <StyledFormTitle>Assigned person</StyledFormTitle>
            <StyledRegularButton
              variant='contained'
              sx={{ width: assignedPerson?.id ? '205px' : '176px' }}
              onClick={handleOpenModal}
            >
              {assignedPerson?.id
                ? 'Change Assigned person'
                : 'Add Assigned person'}
            </StyledRegularButton>
            {assignedPerson?.id && (
              <ContactCard
                address={assignedPerson?.homeAddressLine1}
                isAuth
                company={assignedPerson?.company}
                isTask
                email={assignedPerson?.email}
                fullName={
                  assignedPerson?.firstName + ' ' + assignedPerson?.lastName
                }
                phone={assignedPerson?.phone}
                userType={assignedPerson?.category}
                handleRemove={() => {
                  setValue('assignedPersonId', '')
                }}
              />
            )}
          </StyledAssignedPersonWrapper>
        </StyledFormWrapper>

        {/* <StyledButtonsWrapper>
          <StyledRegularButton
            onClick={handleNext}
            variant='contained'
            sx={{ width: '132px' }}
          >
            Next
          </StyledRegularButton>
        </StyledButtonsWrapper> */}
      </StyledForm>
      <AddAssignedPersonModal
        contacts={contactsData?.data}
        open={modalIsOpen}
        assignedPerson={assignedPerson}
        handleClose={handleCloseModal}
        onAddContact={handleAssignedPersonId}
      />
      <AddListModal
        lists={listData?.data}
        open={listModalOpen}
        handleClose={handleModal}
        onAddList={handleAddToList}
      />
    </FormProvider>
  )
}

export default InformationSection
