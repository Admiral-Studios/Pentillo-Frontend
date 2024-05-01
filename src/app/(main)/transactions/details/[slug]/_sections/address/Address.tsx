import {
  StyledErrorMessage,
  StyledForm,
  StyledFormInputsWrapper,
  StyledFormTitle,
  StyledInputWrapper,
} from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/styled'
import { addressFields } from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/constants'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import SelectRegular from '@/components/UI/selects/selectRegular'
import { CssTextField } from '@/ui/components/styled'
import { IAddressFormInputs } from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { addressFormSchema } from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_tabSections/addressSection/addressForm.schema'
import {
  IPatchTransactionBody,
  IPostTransactionBody,
  IPostTransactionResponse,
} from '@/data/api/api.types'
import { UseMutateFunction } from '@tanstack/react-query'
import { StyledSkeleton } from '@/components/UI/skeletons/skeletons.styled'
import DatePickerMui from '@/components/UI/inputs/datePickerMui'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { PROPERTY_TYPE, SIDE, SOURCE, STATUS } from '@/types/enum'

interface IAddressProps {
  transactionData?: IPostTransactionResponse
  isLoading: boolean
  mutateTransaction: UseMutateFunction<
    any,
    Error,
    IPatchTransactionBody,
    unknown
  >
}

const Address = ({
  isLoading,
  transactionData,
  mutateTransaction,
}: IAddressProps) => {
  return (
    <StyledForm as='div' style={{ marginTop: '12px' }}>
      {!isLoading ? (
        <Form
          mutateTransaction={mutateTransaction}
          transactionData={transactionData}
          isLoading={isLoading}
        />
      ) : (
        <SkeletonForm />
      )}
    </StyledForm>
  )
}

interface IFormProps extends IAddressProps {}
const Form = ({
  transactionData,
  mutateTransaction,
  isLoading,
}: IFormProps) => {
  const [selectsValue, setSelectsValue] = useState<{
    side: SIDE | null
    source: SOURCE | null
    properyType: PROPERTY_TYPE | null
    status: STATUS | null
  }>({
    properyType: null,
    side: null,
    source: null,
    status: null,
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IAddressFormInputs>({
    resolver: yupResolver(addressFormSchema) as Resolver<IAddressFormInputs>,
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IAddressFormInputs> = (data) => {
    // @ts-ignore
    mutateTransaction({
      transaction: {
        streetNumber: data.streetNumber,
        dir: data.dir,
        street: data.street,
        unit: data.unit,
        purchase: data.purchase,
        netPurchase: data.netPurchase,
        city: data.city,
        state: data.state,
        closedDate: data.closedDate,
        country: data.country,
        listAmount: data.listAmount,
        propertyType: data.propertyType,
        side: data.side,
        source: data.source,
        status: data.status,
        zipCode: data.zipCode,
      },
    })
  }

  useEffect(() => {
    if (transactionData) {
      setValue('streetNumber', transactionData.streetNumber)
      setValue('status', transactionData.status)
      setValue('source', transactionData.source)
      setValue(
        'closedDate',
        transactionData.closedDate
          ? new Date(transactionData.closedDate)
          : undefined,
      )
      setValue('listAmount', transactionData.listAmount)
      setValue('country', transactionData.country)
      setValue('zipCode', transactionData.zipCode)
      setValue('state', transactionData.state)
      setValue('netPurchase', transactionData.netPurchase)
      setValue('purchase', transactionData.purchase)
      setValue('unit', transactionData.unit)
      setValue('street', transactionData.street)
      setValue('streetNumber', transactionData.streetNumber)
      setValue('city', transactionData.city)
      setValue('dir', transactionData.dir)
      setValue('side', transactionData.side)
      setValue('propertyType', transactionData.propertyType)
    }
  }, [isLoading, setValue, transactionData])

  return (
    <>
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
                        onBlur={handleSubmit(onSubmit)}
                        label={field.label}
                        value={value as string}
                        onChange={onChange}
                        isCategory
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
                      <DatePickerMui
                        onBlur={handleSubmit(onSubmit)}
                        value={dayjs(value)}
                        label={field.label}
                        onChange={onChange}
                      />
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
                  <CssTextField
                    onBlur={handleSubmit(onSubmit)}
                    height='32px'
                    sx={{
                      maxWidth: field.width + 'px',
                      height: '32px!important',
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
    </>
  )
}

interface ISkeletonFormProps {}
const SkeletonForm = ({}: ISkeletonFormProps) => {
  return (
    <>
      <StyledSkeleton sx={{ mb: '12px' }} />
      <StyledFormInputsWrapper>
        {addressFields.map((field) => {
          if (field.type) {
            if (field.type === 'select') {
              return (
                <StyledSkeleton
                  key={field.id}
                  sx={{ width: setWidht(field.width) }}
                />
              )
            } else if (field.type === 'date') {
              return (
                <StyledSkeleton
                  key={field.id}
                  sx={{ width: setWidht(field.width) }}
                />
              )
            }
          }

          return (
            <StyledSkeleton
              key={field.id}
              sx={{ width: setWidht(field.width) }}
            />
          )
        })}
      </StyledFormInputsWrapper>
    </>
  )
}

const setWidht = (width?: number) => (width ? width + 'px' : '100%')

export default Address
