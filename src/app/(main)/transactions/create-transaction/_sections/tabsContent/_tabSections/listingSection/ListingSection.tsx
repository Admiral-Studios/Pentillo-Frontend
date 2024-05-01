import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import {
  StyledButtonsWrapper,
  StyledErrorMessage,
  StyledForm,
  StyledFormInputsWrapper,
  StyledFormTitle,
  StyledGridWrapper,
  StyledInputWrapper,
} from '../../_utils/styled'
import { CssTextField } from '@/ui/components/styled'
import SelectRegular from '@/components/UI/selects/selectRegular'
import { StyledRegularButton } from '@/components/UI/buttons/buttonRegular'
import { yupResolver } from '@hookform/resolvers/yup'
import { listingFormSchema } from './listingForm.schema'
import { IListingFormInputs } from '../../_utils/types'
import {
  listingFieldsRightSide,
  listingFieldsLeftSide,
} from '../../_utils/constants'
import DatePicker from '@/components/UI/inputs/datePicker'
import { useFormContext } from '@/app/(main)/transactions/create-transaction/_context/formContext/FormContext'
import { IPostTransactionBody } from '@/data/api/api.types'
import { HOA_FREQUENCY, OCCUPANCY } from '@/types/enum'
import RegularInput from '@/components/UI/inputs/inputs/regularInput/RegularInput'

interface IListingSectionProps {
  handleNext?: () => void
  handlePrev?: () => void
}

const ListingSection = ({ handleNext, handlePrev }: IListingSectionProps) => {
  const formContextData = useFormContext()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IListingFormInputs>({
    resolver: yupResolver(listingFormSchema) as Resolver<IListingFormInputs>,
    defaultValues: {
      listDate: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.listDate
        ? new Date(
            (formContextData.formState as IPostTransactionBody)
              .transactionDetails?.listDate as string,
          )
        : undefined,
      expireDate: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.expireDate
        ? new Date(
            (formContextData.formState as IPostTransactionBody)
              .transactionDetails?.expireDate as string,
          )
        : undefined,
      beds: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.beds,
      bath: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.bath,
      built: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.built
        ? new Date(
            (formContextData.formState as IPostTransactionBody)
              .transactionDetails?.built as string,
          )
        : undefined,
      lot: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.lot,
      sqft: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.sqft,
      costSqft: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.sqft,
      taxId: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.taxId,
      hoaFee: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.hoaFee,
      hoaFrequency: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.hoaFrequency,
      parcelId: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.parcelId,
      occupancy: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.occupancy,
      lockBoxCode: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.lockBoxCode,
      lockBoxLocation: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.lockBoxLocation,
      securityAlarmCode: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.securityAlarmCode,
      mls: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.mls,
      remark: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.remark,
      additionalInfo: (formContextData.formState as IPostTransactionBody)
        .transactionDetails?.additionalInfo,
      fileNumber: (formContextData.formState as IPostTransactionBody).contract
        ?.fileNumber,
      financing: (formContextData.formState as IPostTransactionBody).contract
        ?.financing,
      concessions: (formContextData.formState as IPostTransactionBody).contract
        ?.concessions,
      earnestMoney: (formContextData.formState as IPostTransactionBody).contract
        ?.earnestMoney,
      additionalProvisions: (formContextData.formState as IPostTransactionBody)
        .contract?.additionalProvisions,
      otherInfo: (formContextData.formState as IPostTransactionBody).contract
        ?.otherInfo,
    },
  })

  const onSubmit: SubmitHandler<IListingFormInputs> = (data) => {
    if (handleNext && formContextData.setFormState) {
      formContextData.setFormState((prevState) => ({
        ...prevState,
        transactionDetails: {
          ...prevState.transactionDetails,
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
          ...prevState.contract,
          fileNumber: data.fileNumber,
          financing: data.financing,
          concessions: data.concessions,
          earnestMoney: data.earnestMoney,
          additionalProvisions: data.additionalProvisions,
          otherInfo: data.otherInfo,
        },
      }))
      handleNext()
    }
  }

  return (
    <StyledForm
      style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: '0',
      }}
      as='div'
    >
      <StyledGridWrapper>
        <StyledForm as='div'>
          <StyledFormTitle>Listing</StyledFormTitle>
          <StyledFormInputsWrapper>
            {listingFieldsLeftSide.map((field) => {
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
                            value={value as string}
                            onChange={onChange}
                            label={field.label}
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
                    <StyledInputWrapper
                      width={field.width + 'px'}
                      key={field.id}
                    >
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
                          maxWidth: field.width
                            ? field.width + 'px'
                            : undefined,
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

      <StyledButtonsWrapper>
        <StyledRegularButton onClick={handlePrev} variant='outlined'>
          Back
        </StyledRegularButton>
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

export default ListingSection
