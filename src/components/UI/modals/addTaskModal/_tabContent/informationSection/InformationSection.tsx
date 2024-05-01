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
import { IContactData } from '@/data/api/api.types'
import {
  StyledButtonsWrapper,
  StyledErrorMessage,
  StyledForm,
  StyledFormInputsWrapper,
  StyledFormWrapper,
  StyledInputWrapper,
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
import RegularInput from '@/components/UI/inputs/inputs/regularInput/RegularInput'
import { IInformationForm } from '../../../editTaskModal/editTaskModal.types'

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
  { id: 4, name: 'dueDate', label: 'Date', width: 396, type: 'date' },
  {
    id: 5,
    name: 'reminderDate',
    label: 'Reminder Date',
    width: 396,
    type: 'date',
  },
]

interface IInformationSectionProps {
  handleNext?: () => void
  handleSetInformationData: (data: IInformationForm) => void
  informationData: IInformationForm
  templateId: string
  listsOptions: IOption[]
}

const InformationSection = ({
  handleNext,
  handleSetInformationData,
  informationData,
  templateId,
  listsOptions,
}: IInformationSectionProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [listModalOpen, setListModalOpen] = useState<boolean>(false)
  const formContextData = useFormContext()
  const [assignedPerson, setAssignedPerson] = useState<IContactData>()
  const [listId, setListId] = useState<string>('')
  const listData = useList({ type: TYPE.TASKS, templateId: templateId })
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

  console.log(getValues())

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
            <StyledInputWrapper width={'100%'}>
              <Controller
                control={control}
                name={'listId'}
                render={({ field: { onChange, value } }) => (
                  <SelectRegular
                    sxSelect={{ height: '44px' }}
                    onChange={onChange}
                    placeholder='Select List'
                    filled={true}
                    value={value}
                    options={listsOptions}
                  />
                )}
              />
              <StyledErrorMessage>
                {formState.errors['listId']?.message}
              </StyledErrorMessage>
            </StyledInputWrapper>
            {(getValues('status') || getValues('status') === undefined) && (
              <StyledInputWrapper width={'100%'}>
                <Controller
                  control={control}
                  name={'status'}
                  render={({ field: { onChange, value } }) => (
                    <SelectRegular
                      placeholder='Status'
                      onChange={(event) => {
                        onChange(event.target.value)
                        setStatus(event.target.value)
                      }}
                      filled={true}
                      sxSelect={{ height: '44px' }}
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
                    <StyledInputWrapper width={'100%'} key={field.id}>
                      <Controller
                        control={control}
                        name={field.name}
                        render={({ field: { onChange, value } }) => (
                          <SelectRegular
                            label={field.label}
                            value={value as string}
                            onChange={onChange}
                            key={field.id}
                            filled={true}
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
                              height={'44px'}
                              filled={true}
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
                <StyledInputWrapper key={field.id} width={'100%'}>
                  <Controller
                    control={control}
                    name={field.name}
                    render={({ field: { onChange, value } }) => (
                      <RegularInput
                        sxInput={{
                          width: '100%',
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
