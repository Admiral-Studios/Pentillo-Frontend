import SelectRegular from '@/components/newUI/selects/selectRegular'
import { StyledButtonsWrapper, StyledWrapper } from '../tabContent.styled'
import { StyledInput } from '@/components/newUI/inputs/inputs.styled'
import { StyledButton } from '@/components/newUI/buttons/buttons.styled'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addNewFormSchema } from './addNewForm.schema'
import styled from '@emotion/styled'
import { CATEGORY } from '@/types/enum'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import {
  StyledErrorMessage,
  StyledInputWrapper,
} from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/styled'
import { useId, useState } from 'react'
import {
  IContactData,
  IContactForOneTransaction,
  IContactPostResponse,
} from '@/data/api/api.types'
import { useCreateContact } from '@/data/hooks/contact'
import { useQueryClient } from '@tanstack/react-query'
import { contactKeys } from '@/data/queryKeys'
import { getOptionsFromEnum } from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/getOptionsFromEnum'
import PhoneInputField from '@/components/phoneInput/PhoneInput'
import PhoneTextField from '@/components/newUI/inputs/phoneTextField'

interface IAddNewTabProps {
  onAddContact?: (contact: string) => void
  handleClose: () => void
  onAddContactOnlyForOneTransaction?: (
    contact: IContactForOneTransaction,
  ) => void
}

interface IFormInputs extends Omit<IContactForOneTransaction, 'id'> {}

const AddNewTab = ({
  handleClose,
  onAddContact,
  onAddContactOnlyForOneTransaction,
}: IAddNewTabProps) => {
  const queryClient = useQueryClient()
  const [typeButtonClick, setTypeButtonClick] = useState<
    'transaction-only' | 'save' | null
  >(null)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(addNewFormSchema) as Resolver<IFormInputs>,
  })

  const idContactForOneTransaction = useId()

  const onSuccessCreateContact = (data: IContactPostResponse) => {
    const contactData: IContactData = {
      category: data.category,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      id: data.id,
      phone: data.phone,
    }

    queryClient.invalidateQueries({
      queryKey: [contactKeys.all],
    })

    if (onAddContact) {
      onAddContact(contactData.id)
      handleClose()
    }
  }
  const { mutate: mutateCreateContact, isPending: isPendingCreateContact } =
    useCreateContact({ onSuccess: onSuccessCreateContact })

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (typeButtonClick === 'save') {
      mutateCreateContact({
        firstName: data.firstName,
        lastName: data.lastName,
        category: data.category,
        email: data.email,
        phone: data.phone,
      })
    } else {
      if (onAddContactOnlyForOneTransaction) {
        onAddContactOnlyForOneTransaction({
          id: idContactForOneTransaction,
          email: data.email,
          category: data.category,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        })

        handleClose()
      }
    }
  }

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field) => {
          if (field.type === 'select') {
            return (
              <StyledInputWrapper key={field.name}>
                <Controller
                  key={field.name}
                  control={control}
                  name={field.name}
                  render={({ field: { onChange, value } }) => (
                    <SelectRegular
                      value={value}
                      onChange={onChange}
                      options={field.options}
                      placeholder='Select category'
                    />
                  )}
                />
                <StyledErrorMessage>
                  {errors[field.name]?.message}
                </StyledErrorMessage>
              </StyledInputWrapper>
            )
          } else if (field.type === 'phone') {
            return (
              <StyledInputWrapper key={field.name}>
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: { ref, ...fieldProps } }) => (
                    <PhoneTextField
                      fieldParams={fieldProps}
                      inputExtraProps={{
                        ref,
                      }}
                      label={field.placeholder}
                    />
                  )}
                />
              </StyledInputWrapper>
            )
          } else {
            return (
              <StyledInputWrapper key={field.name}>
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: { onChange, value } }) => (
                    <StyledInput
                      value={value}
                      onChange={onChange}
                      placeholder={field.placeholder}
                    />
                  )}
                />
                <StyledErrorMessage>
                  {errors[field.name]?.message}
                </StyledErrorMessage>
              </StyledInputWrapper>
            )
          }
        })}
        <StyledButtonsWrapper>
          <StyledButton
            onClick={() => {
              setTypeButtonClick('transaction-only')
            }}
            outlined
          >
            Add to this transaction only
          </StyledButton>
          <StyledButton
            onClick={() => {
              setTypeButtonClick('save')
            }}
          >
            Save
          </StyledButton>
        </StyledButtonsWrapper>
      </StyledForm>
    </StyledWrapper>
  )
}

interface IFormField {
  name: keyof IFormInputs
  placeholder: string
  type?: 'select' | 'phone'
  options?: IOption[]
}

const categoryOptions: IOption[] = getOptionsFromEnum(CATEGORY)

const formFields: IFormField[] = [
  {
    name: 'category',
    placeholder: 'Select category',
    type: 'select',
    options: categoryOptions,
  },
  { name: 'firstName', placeholder: 'Enter first name' },
  { name: 'lastName', placeholder: 'Enter last name' },
  { name: 'phone', placeholder: 'Enter phone number', type: 'phone' },
  { name: 'email', placeholder: 'Enter email' },
]

const StyledForm = styled.form`
  display: contents;
`

export default AddNewTab
