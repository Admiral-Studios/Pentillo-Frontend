import Image from 'next/image'
import {
  DialogDescription,
  DialogInfoBlock,
  ModalContent,
  StyledBackdrop,
  StyledCloseIconWrapper,
  StyledCssTextField,
  StyledDialog,
  StyledDialogCloseButton,
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
import { IDateData, IGetDateResponse } from '@/data/api/api.types'
import { useEffect } from 'react'
import DatePickerMui from '@/components/UI/inputs/datePickerMui'
import dayjs from 'dayjs'
import CloseIcon from '@/ui/icons/CloseIcon'
import { DialogTitle } from '@mui/material'
import addDateModalIcon from '@/assets/icons/add-date-modal-icon.svg'
import RegularInput from '../../inputs/inputs/regularInput/RegularInput'

interface IAddDateModalProps {
  open: boolean
  listsOptions: IOption[]
  handleClose: () => void
  dateData?: IDateData
  onSuccess?: () => void
  handleAddDate?: (data: IGetDateResponse) => void
}

const AddDateModal = ({
  open,
  listsOptions,
  handleClose,
  dateData,
  onSuccess,
  handleAddDate,
}: IAddDateModalProps) => {
  const { handleSubmit, control, setValue, formState, reset, ...otherProps } =
    useForm<IDateModalWindow>({
      resolver: yupResolver(dateModalFormSchema) as Resolver<IDateModalWindow>,
    })
  const { mutate: mutateUpdateDate } = useUpdateDate({ onSuccess })

  const onSubmit: SubmitHandler<IDateModalWindow> = (data) => {
    const newDateData = { id: dateData?.id as string, ...data }
    dateData
      ? mutateUpdateDate({ id: dateData?.id, data: newDateData })
      : handleAddDate && handleAddDate(data as IGetDateResponse)
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
    <StyledDialog open={open} onClose={handleClose} scroll='body'>
      <StyledDialogCloseButton onClick={handleClose}>
        <CloseIcon />
      </StyledDialogCloseButton>
      <DialogInfoBlock>
        <Image src={addDateModalIcon} alt='Modal Icon' />
        <DialogTitle id='customized-dialog-title'>
          {dateData ? 'Edit Date' : 'Add New Date Title'}
        </DialogTitle>
        <DialogDescription>
          Here you can add a new name for the date
        </DialogDescription>
      </DialogInfoBlock>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledModalBody>
          <StyledWrapper>
            <StyledInputWrapper>
              <Controller
                control={control}
                name={'listId'}
                render={({ field: { onChange, value } }) => (
                  <SelectRegular
                    sxSelect={{ height: '44px' }}
                    onChange={onChange}
                    placeholder='Select List'
                    value={value}
                    options={listsOptions}
                    filled={true}
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
                  <RegularInput
                    placeholder='Enter Title'
                    label='Title'
                    onChange={onChange}
                    value={value}
                    filled={true}
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
                      height='44px'
                      filled={true}
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
          <StyledButton type='submit'>{dateData ? 'Save' : 'Add'}</StyledButton>
        </StyledModalFooter>
      </StyledForm>
    </StyledDialog>
  )
}

export default AddDateModal
