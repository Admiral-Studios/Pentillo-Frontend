import { StyledRegularButton } from '@/components/UI/buttons/buttonRegular'
import SelectRegular from '@/components/UI/selects/selectRegular'
import { CssTextField } from '@/ui/components/styled'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { addressFormSchema } from './addressForm.schema'
import {
  StyledButtonsWrapper,
  StyledErrorMessage,
  StyledForm,
  StyledFormInputsWrapper,
  StyledFormTitle,
  StyledInputWrapper,
} from '../../_utils/styled'
import { IAddressFormInputs } from '../../_utils/types'
import { addressFields } from '../../_utils/constants'
import DatePicker from '@/components/UI/inputs/datePicker'
import { useFormContext } from '@/app/(main)/transactions/create-transaction/_context/formContext/FormContext'
import { IPostTransactionBody } from '@/data/api/api.types'
import RegularInput from '@/components/UI/inputs/inputs/regularInput/RegularInput'

interface IAddressSectionProps {
  handleNext?: () => void
}

const AddressSection = ({ handleNext }: IAddressSectionProps) => {
  const formContextData = useFormContext()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAddressFormInputs>({
    resolver: yupResolver(addressFormSchema) as Resolver<IAddressFormInputs>,
    defaultValues: {
      streetNumber: (formContextData.formState as IPostTransactionBody)
        .transaction?.streetNumber,
      dir: (formContextData.formState as IPostTransactionBody).transaction?.dir,
      street: (formContextData.formState as IPostTransactionBody).transaction
        ?.street,
      unit: (formContextData.formState as IPostTransactionBody).transaction
        ?.unit,
      purchase: (formContextData.formState as IPostTransactionBody).transaction
        ?.purchase,
      netPurchase: (formContextData.formState as IPostTransactionBody)
        .transaction?.netPurchase,
      city: (formContextData.formState as IPostTransactionBody).transaction
        ?.city,
      state: (formContextData.formState as IPostTransactionBody).transaction
        ?.state,
      zipCode: (formContextData.formState as IPostTransactionBody).transaction
        ?.zipCode,
      country: (formContextData.formState as IPostTransactionBody).transaction
        ?.country,
      listAmount: (formContextData.formState as IPostTransactionBody)
        .transaction?.listAmount,
      closedDate: (formContextData.formState as IPostTransactionBody)
        .transaction?.closedDate,
      side: (formContextData.formState as IPostTransactionBody).transaction
        ?.side,
      source: (formContextData.formState as IPostTransactionBody).transaction
        ?.source,
      propertyType: (formContextData.formState as IPostTransactionBody)
        .transaction?.propertyType,
      status: (formContextData.formState as IPostTransactionBody).transaction
        ?.status,
    },
  })

  const onSubmit: SubmitHandler<IAddressFormInputs> = (data) => {
    if (handleNext && formContextData.setFormValues) {
      formContextData.setFormValues({
        transaction: {
          streetNumber: data.streetNumber,
          dir: data.dir,
          street: data.street,
          unit: data.unit,
          purchase: data.purchase,
          netPurchase: data.netPurchase,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
          listAmount: data.listAmount,
          closedDate: data.closedDate?.toISOString(),
          side: data.side.toUpperCase(),
          source: data.source?.toUpperCase(),
          propertyType: data.propertyType.toUpperCase(),
          status: data.status.toUpperCase(),
        },
      })
      handleNext()
    }
  }

  return (
    <StyledForm as='div'>
      <StyledFormTitle>Address</StyledFormTitle>
      <StyledFormInputsWrapper>
        {addressFields.map((field) => {
          if (field.type) {
            if (field.type === 'select') {
              return (
                <StyledInputWrapper width={field.width + 'px'} key={field.id}>
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
                    {errors[field.name]?.message}
                  </StyledErrorMessage>
                </StyledInputWrapper>
              )
            } else if (field.type === 'date') {
              return (
                <StyledInputWrapper width={field.width + 'px'} key={field.id}>
                  <Controller
                    control={control}
                    name={field.name}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <DatePicker
                          selected={value as Date | undefined}
                          onChange={onChange}
                          label={field.label}
                          height='36px'
                        />
                      </>
                    )}
                  />
                  <StyledErrorMessage>
                    {errors[field.name]?.message}
                  </StyledErrorMessage>
                </StyledInputWrapper>
              )
            }
          }

          return (
            <StyledInputWrapper
              width={field.width ? field.width + 'px' : undefined}
              key={field.id}
            >
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, value } }) => (
                  <RegularInput
                    height='36px'
                    sxInput={{
                      maxWidth: field.width + 'px',
                      height: '36px!important',
                      width: '100%',
                    }}
                    label={field.label}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <StyledErrorMessage>
                {errors[field.name]?.message}
              </StyledErrorMessage>
            </StyledInputWrapper>
          )
        })}
      </StyledFormInputsWrapper>
      <StyledButtonsWrapper>
        <StyledRegularButton
          onClick={handleSubmit(onSubmit)}
          type='submit'
          variant='contained'
        >
          Next
        </StyledRegularButton>
      </StyledButtonsWrapper>
    </StyledForm>
  )
}

export default AddressSection
