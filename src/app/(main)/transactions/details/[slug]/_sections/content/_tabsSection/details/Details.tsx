import { listingFormSchema } from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_tabSections/listingSection/listingForm.schema'
import {
  listingFieldsLeftSide,
  listingFieldsRightSide,
} from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/constants'
import {
  StyledErrorMessage,
  StyledForm,
  StyledFormInputsWrapper,
  StyledFormTitle,
  StyledGridWrapper,
  StyledInputWrapper,
} from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/styled'
import { IListingFormInputs } from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/types'
import SelectRegular from '@/components/UI/selects/selectRegular'
import {
  IPatchTransactionBody,
  IPostTransactionResponse,
} from '@/data/api/api.types'
import { CssTextField } from '@/ui/components/styled'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import DatePicker from '@/components/UI/inputs/datePicker'
import { StyledSkeleton } from '@/components/UI/skeletons/skeletons.styled'
import { UseMutateFunction } from '@tanstack/react-query'
import { HOA_FREQUENCY, OCCUPANCY } from '@/types/enum'
import DatePickerMui from '@/components/UI/inputs/datePickerMui'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import RegularInput from '@/components/UI/inputs/inputs/regularInput/RegularInput'

interface IDetailsProps {
  transactionData?: IPostTransactionResponse
  isLoading: boolean
  mutateTransaction: UseMutateFunction<
    any,
    Error,
    IPatchTransactionBody,
    unknown
  >
}

const Details = ({
  transactionData,
  isLoading,
  mutateTransaction,
}: IDetailsProps) => {
  return (
    <StyledForm
      style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: '0',
      }}
      as='div'
    >
      {!isLoading ? (
        <Form
          transactionData={transactionData}
          mutateTransaction={mutateTransaction}
        />
      ) : (
        <SkeletonForm />
      )}
    </StyledForm>
  )
}

interface IFormProps extends Omit<IDetailsProps, 'isLoading'> {}

const Form = ({ transactionData, mutateTransaction }: IFormProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IListingFormInputs>({
    resolver: yupResolver(listingFormSchema) as Resolver<IListingFormInputs>,
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IListingFormInputs> = (data) => {
    //@ts-ignore
    mutateTransaction({
      transactionDetails: {
        listDate: data.listDate?.toISOString(),
        expireDate: data.expireDate?.toISOString(),
        beds: data.beds,
        bath: data.bath,
        built: data.built?.toISOString(),
        lot: data.lot,
        sqft: data.sqft,
        costSqft: data.sqft,
        taxId: data.taxId,
        hoaFee: data.hoaFee,
        hoaFrequency: data.hoaFrequency.toUpperCase() as HOA_FREQUENCY,
        parcelId: data.parcelId,
        occupancy: data.occupancy.toUpperCase() as OCCUPANCY,
        lockBoxCode: data.lockBoxCode,
        lockBoxLocation: data.lockBoxLocation,
        securityAlarmCode: data.securityAlarmCode,
        mls: data.mls,
        remark: data.remark,
        additionalInfo: data.additionalInfo,
      },
      contract: {
        fileNumber: data.fileNumber,
        financing: data.financing,
        concessions: data.concessions,
        earnestMoney: data.earnestMoney,
        additionalProvisions: data.additionalProvisions,
        otherInfo: data.otherInfo,
      },
    })
  }

  useEffect(() => {
    if (transactionData) {
      setValue(
        'listDate',
        transactionData.details?.listDate
          ? new Date(transactionData?.details?.listDate)
          : undefined,
      )
      setValue(
        'expireDate',
        transactionData.details?.expireDate
          ? new Date(transactionData?.details?.expireDate)
          : undefined,
      )
      setValue(
        'built',
        transactionData.details?.built
          ? new Date(transactionData?.details?.built)
          : undefined,
      )
      setValue('beds', transactionData.details?.beds)
      setValue('bath', transactionData.details?.bath)
      setValue('lot', transactionData.details?.lot)
      setValue('sqft', transactionData.details?.sqft)
      setValue('costSqft', transactionData.details?.costSqft)
      setValue('taxId', transactionData.details?.taxId)
      setValue('hoaFee', transactionData.details?.hoaFee)
      setValue('hoaFrequency', transactionData.details?.hoaFrequency)
      setValue('parcelId', transactionData.details?.parcelId)
      setValue('occupancy', transactionData.details?.occupancy)
      setValue('lockBoxCode', transactionData.details?.lockBoxCode)
      setValue('lockBoxLocation', transactionData.details?.lockBoxLocation)
      setValue('securityAlarmCode', transactionData.details?.securityAlarmCode)
      setValue('mls', transactionData.details?.mls)
      setValue('remark', transactionData.details?.remark)
      setValue('additionalInfo', transactionData.details?.additionalInfo)
      setValue('fileNumber', transactionData.contract?.fileNumber)
      setValue('financing', transactionData.contract?.financing)
      setValue('earnestMoney', transactionData.contract?.earnestMoney)
      setValue('concessions', transactionData.contract?.concessions)
      setValue(
        'additionalProvisions',
        transactionData.contract?.additionalProvisions,
      )
      setValue('otherInfo', transactionData.contract?.otherInfo)
    }
  }, [setValue, transactionData])

  return (
    <StyledGridWrapper onBlur={handleSubmit(onSubmit)}>
      <StyledForm as='div'>
        <StyledFormTitle>Listing</StyledFormTitle>
        <StyledFormInputsWrapper>
          {listingFieldsLeftSide.map((field) => {
            if (field.type) {
              if (field.type === 'select') {
                return (
                  <StyledInputWrapper width={field.width + 'px'} key={field.id}>
                    <Controller
                      control={control}
                      name={field.name}
                      render={({ field: { onChange, value } }) => (
                        <SelectRegular
                          value={value as string}
                          onChange={onChange}
                          label={field.label}
                          isCategory
                          sxInput={{
                            maxWidth: field.width + 'px',
                          }}
                          sxSelect={{
                            maxWidth: field.width + 'px',
                          }}
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
                    <RegularInput
                      height='36px'
                      sxInput={{
                        maxWidth: field.width ? field.width + 'px' : undefined,
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
      </StyledForm>
      <StyledForm as='div'>
        <StyledFormTitle>Contract</StyledFormTitle>
        <StyledFormInputsWrapper>
          {listingFieldsRightSide.map((field) => {
            if (field.type && field.type === 'select') {
              return (
                <StyledInputWrapper width={field.width + 'px'} key={field.id}>
                  <Controller
                    control={control}
                    name={field.name}
                    render={({ field: { onChange, value } }) => (
                      <SelectRegular
                        value={value as string}
                        onChange={onChange}
                        placeholder={field.label}
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
            }
            return (
              <StyledInputWrapper key={field.id}>
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: { onChange, value } }) => (
                    <RegularInput
                      height='36px'
                      sxInput={{
                        maxWidth: field.width ? field.width + 'px' : '100%',
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
      </StyledForm>
    </StyledGridWrapper>
  )
}
const SkeletonForm = () => {
  return (
    <StyledGridWrapper>
      <StyledForm as='div'>
        <StyledSkeleton sx={{ mb: '12px' }} />
        <StyledFormInputsWrapper>
          {listingFieldsLeftSide.map((field) => {
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
      </StyledForm>
      <StyledForm as='div'>
        <StyledSkeleton sx={{ mb: '12px' }} />
        <StyledFormInputsWrapper>
          {listingFieldsRightSide.map((field) => {
            if (field.type && field.type === 'select') {
              return (
                <StyledSkeleton
                  key={field.id}
                  sx={{ width: setWidht(field.width) }}
                />
              )
            }
            return (
              <StyledSkeleton
                key={field.id}
                sx={{ width: setWidht(field.width) }}
              />
            )
          })}
        </StyledFormInputsWrapper>
      </StyledForm>
    </StyledGridWrapper>
  )
}

const setWidht = (width?: number) => (width ? width + 'px' : '100%')

export default Details
