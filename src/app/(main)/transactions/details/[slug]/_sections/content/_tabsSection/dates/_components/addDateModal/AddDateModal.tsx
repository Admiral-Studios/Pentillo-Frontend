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
} from './addDateModal.styled'
import closeIcon from '@/assets/icons/close-modal-icon.svg'
import { StyledButton } from '@/components/newUI/buttons/buttons.styled'
import SelectRegular, {
  IOption,
} from '@/components/UI/selects/selectRegular/SelectRegular'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm, Resolver, SubmitHandler } from 'react-hook-form'
import { IDateModalWindow } from './addDateModal.types'
import { dateModalFormSchema } from './addDateModal.schema'
import DatePicker from '@/components/UI/inputs/datePicker'
import { useCreateDate, useUpdateDate } from '@/data/hooks/date'
import { IDateData } from '@/data/api/api.types'
import { useEffect } from 'react'
import DatePickerMui from '@/components/UI/inputs/datePickerMui'
import dayjs from 'dayjs'

interface IAddDateModalProps {
  open: boolean
  listsOptions: IOption[]
  handleClose: () => void
  dateData?: IDateData
  onSuccess?: () => void
}

const AddDateModal = ({
  open,
  listsOptions,
  handleClose,
  dateData,
  onSuccess,
}: IAddDateModalProps) => {
  const { handleSubmit, control, setValue, formState, reset, ...otherProps } =
    useForm<IDateModalWindow>({
      resolver: yupResolver(dateModalFormSchema) as Resolver<IDateModalWindow>,
    })
  const { mutate: mutateAddDateToList } = useCreateDate({ onSuccess })
  const { mutate: mutateUpdateDate } = useUpdateDate({ onSuccess })

  const onSubmit: SubmitHandler<IDateModalWindow> = (data) => {
    const newDateData = { id: dateData?.id as string, ...data }
    dateData
      ? mutateUpdateDate({ id: dateData?.id, data: newDateData })
      : mutateAddDateToList(data)
    handleClose()
    reset()
  }

  useEffect(() => {
    if (dateData) {
      setValue('title', dateData?.title)
      setValue('listId', dateData?.listId)
      setValue('dueDate', dateData?.dueDate)
    }
  }, [dateData])

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent>
        <StyledModalHeader>
          <StyledTypography>Date Setup</StyledTypography>
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
                  name={'listId'}
                  render={({ field: { onChange, value } }) => (
                    <SelectRegular
                      onChange={onChange}
                      
                      label='Select List'
                      value={value}
           
                      options={listsOptions}
                    />
                  )}
                />
                <StyledErrorMessage>
                  {formState.errors['listId']?.message}
                </StyledErrorMessage>
              </StyledInputWrapper>
              <StyledInputWrapper>
                <Controller
                  control={control}
                  name={'title'}
                  render={({ field: { onChange, value } }) => (
                    <StyledCssTextField
                      sx={{ marginBottom: '0px !important' }}
                      focused
                      label='Title'
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <StyledErrorMessage>
                  {formState.errors['title']?.message}
                </StyledErrorMessage>
              </StyledInputWrapper>
              <StyledInputWrapper>
                <Controller
                  control={control}
                  name={'dueDate'}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <DatePickerMui
                        onChange={onChange}
                        label={'Due Date'}
                        height='32px'
                        value={dayjs(value as Date)}
                      />
                    </>
                  )}
                />
                <StyledErrorMessage>
                  {formState.errors['dueDate']?.message}
                </StyledErrorMessage>
              </StyledInputWrapper>
            </StyledWrapper>
          </StyledModalBody>
          <StyledModalFooter>
            <StyledButton onClick={handleClose} outlined>
              Cancel
            </StyledButton>
            <StyledButton type='submit'>
              {dateData ? 'Save' : 'Create'}
            </StyledButton>
          </StyledModalFooter>
        </StyledForm>
      </ModalContent>
    </StyledModal>
  )
}

export default AddDateModal
