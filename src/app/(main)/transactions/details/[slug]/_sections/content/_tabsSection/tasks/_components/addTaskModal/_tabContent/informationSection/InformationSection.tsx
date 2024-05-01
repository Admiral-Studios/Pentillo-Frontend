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
import AddListModal from '@/components/UI/modals/addListModal/AddListModal'
import { useList } from '@/data/hooks/list'
import dayjs from 'dayjs'
import DatePickerMui from '@/components/UI/inputs/datePickerMui'
import { useFormContext } from '../../_context/formContext/FormContext'
import { IInformationForm } from '@/components/UI/modals/addTaskModal/addTaskModal.types'

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
  handleNext?: () => void
  handleSetInformationData: (data: IInformationForm) => void
  informationData: IInformationForm
}

const InformationSection = ({
  handleNext,
  handleSetInformationData,
  informationData,
}: IInformationSectionProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [listModalOpen, setListModalOpen] = useState<boolean>(false)
  const formContextData = useFormContext()
  const [assignedPerson, setAssignedPerson] = useState<IContactData>()
  const [listId, setListId] = useState<string>('')
  const listData = useList({ type: TYPE.TASKS })
  const [status, setStatus] = useState<TASK_STATUS | string>('')

  const {
    handleSubmit,
    control,
    setValue,
    formState,
    reset,
    getValues,
    ...otherProps
  } = useForm<IInformationForm>({
    resolver: yupResolver(informationFormSchema) as Resolver<IInformationForm>,
  })

  const onSubmit: SubmitHandler<IInformationForm> = (data) => {
    handleSetInformationData(data)
    if (handleNext) {
      handleNext()
    }
  }
  const handleAddToList = (listId: string) => {
    setListId(listId)
    setValue('listId', listId)
  }
  const handleCloseModal = () => setModalIsOpen(false)
  const handleOpenModal = () => setModalIsOpen(true)
  const handleModal = () => {
    setListModalOpen((prev) => !prev)
  }
  useEffect(() => {
    if (formContextData?.contactsData && formContextData.assignedPersonId) {
      setValue('assignedPersonId', formContextData.assignedPersonId)
      const person = formContextData?.contactsData?.data?.find(
        (contact: any) => contact.id === formContextData.assignedPersonId,
      )
      if (person) {
        setAssignedPerson(person)
      }
    }
  }, [formContextData.contactsData, formContextData.assignedPersonId])

  const listName =
    listData?.data?.data?.find((list) => list?.id === listId)?.name || ' '

  useEffect(() => {
    if (informationData) {
      setValue('title', informationData.title)
      setValue('description', informationData?.description as string)
      setValue('status', informationData.status)
      setValue('dueDate', informationData.dueDate)
      setValue('reminderDate', informationData.reminderDate as Date)
      setValue('assignedPersonId', informationData?.assignedPersonId)
      setValue('listId', informationData?.listId)
      setListId(informationData?.listId as string)
    }

    return () => {
      reset()
    }
  }, [informationData, setValue, reset])
  return (
    <FormProvider
      control={control}
      setValue={setValue}
      formState={formState}
      handleSubmit={handleSubmit}
      reset={reset}
      getValues={getValues}
      {...otherProps}
    >
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormWrapper>
          <StyledFormInputsWrapper>
            <StyledListWrapper width={460 + 'px'}>
              <StyledRegularButton
                variant='contained'
                sx={{ width: '152px' }}
                onClick={handleModal}
              >
                {listId ? 'Change List' : 'Add List'}
              </StyledRegularButton>
              {listId && (
                <CssTextField
                  height='32px'
                  sx={{
                    width: 460 + 'px',
                    height: '32px!important',
                  }}
                  focused
                  disabled
                  label={'List name'}
                  value={listName}
                />
              )}
            </StyledListWrapper>
            {(getValues('status') || getValues('status') === undefined) && (
              <StyledInputWrapper width={460 + 'px'}>
                <Controller
                  control={control}
                  name={'status'}
                  render={({ field: { onChange, value } }) => (
                    <SelectRegular
                      label={'Status'}
                      onChange={(event) => {
                        onChange(event.target.value)
                        setStatus(event.target.value)
                      }}
                      sxInput={{
                        maxWidth: 745 + 'px',
                      }}
                      sxSelect={{
                        maxWidth: 745 + 'px',
                      }}
                      value={value || status}
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
                              value={dayjs(value)}
                              selected={value as Date | undefined}
                              height={'32px'}
                              label={field.label}
                              onChange={onChange}
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
                      <CssTextField
                        height='32px'
                        sx={{
                          width: field.width + 'px',
                          height: '32px!important',
                        }}
                        focused
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
              sx={{ width: assignedPerson?.id ? '172px' : '152px' }}
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
                email={assignedPerson?.email}
                fullName={
                  assignedPerson?.firstName + ' ' + assignedPerson?.lastName
                }
                isTask
                phone={assignedPerson?.phone}
                userType={assignedPerson?.category}
                handleRemove={() => {
                  if (formContextData.handleDeleteAssignedPerson) {
                    formContextData.handleDeleteAssignedPerson()
                  }
                }}
              />
            )}
          </StyledAssignedPersonWrapper>
        </StyledFormWrapper>

        <StyledButtonsWrapper>
          <StyledRegularButton
            type='submit'
            variant='contained'
            sx={{ width: '132px' }}
          >
            Next
          </StyledRegularButton>
        </StyledButtonsWrapper>
      </StyledForm>
      <AddAssignedPersonModal
        contacts={formContextData.contactsData?.data}
        onAddContact={formContextData.handleSelectContact}
        open={modalIsOpen}
        assignedPerson={assignedPerson}
        handleClose={handleCloseModal}
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
