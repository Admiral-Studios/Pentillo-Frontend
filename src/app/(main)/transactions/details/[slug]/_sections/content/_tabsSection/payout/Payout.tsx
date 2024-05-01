import {
  payoutFieldsLeftSide,
  payoutFieldsRightSide,
} from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/constants'
import {
  StyledErrorMessage,
  StyledForm,
  StyledFormInputsWrapper,
  StyledFormTitle,
  StyledInputWrapper,
} from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/styled'
import { IPayoutFormInputs } from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/types'
import { IPostTransactionPayoutResponse } from '@/data/api/api.types'
import { CssTextField } from '@/ui/components/styled'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { StyledSkeleton } from '@/components/UI/skeletons/skeletons.styled'
import { useEffect } from 'react'
import { payoutFormSchema } from './payout.schema'
import {
  usePatchTransactionPayoutById,
  useTransactionPayoutById,
} from '@/data/hooks/transaction'
import {
  StyledFormInputsWrapperRight,
  StyledGridWrapper,
} from './payout.styled'

interface IPayout {
  transactionId: string
}

interface IFormProps {
  payoutData: IPostTransactionPayoutResponse
  transactionId: string
}

const Payout = ({ transactionId }: IPayout) => {
  const { data: payoutData, isLoading: isLoadingPayoutData } =
    useTransactionPayoutById(transactionId)
  return (
    <StyledForm
      style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: '0',
      }}
      as='div'
    >
      {!isLoadingPayoutData ? (
        <Form
          payoutData={payoutData as IPostTransactionPayoutResponse}
          transactionId={transactionId}
        />
      ) : (
        <SkeletonForm />
      )}
    </StyledForm>
  )
}

const Form = ({ payoutData, transactionId }: IFormProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IPayoutFormInputs>({
    resolver: yupResolver(payoutFormSchema) as Resolver<IPayoutFormInputs>,
    mode: 'onBlur',
  })
  const { mutate: mutateTransactionPayoutById } = usePatchTransactionPayoutById(
    { id: transactionId },
  )

  const onSubmit: SubmitHandler<IPayoutFormInputs> = (data) => {
    mutateTransactionPayoutById(data)
  }

  useEffect(() => {
    if (payoutData) {
      setValue('broker', payoutData.broker)
      setValue('teamLead', payoutData.teamLead)
      setValue('primaryAgent', payoutData.primaryAgent)
      setValue('goAgent', payoutData.goAgent)
      setValue('firstAssistant', payoutData.firstAssistant)
      setValue('secondAssistant', payoutData.secondAssistant)
      setValue('referral', payoutData.referral)
      setValue('agentCommission', payoutData.agentCommission)
      setValue('estimatedGrossPayout', payoutData.estimatedGrossPayout)
      setValue('actualGrossPayout', payoutData.actualGrossPayout)
      setValue('commissionNote', payoutData.commissionNote)
    }
  }, [setValue, payoutData])

  return (
    <StyledGridWrapper onBlur={handleSubmit(onSubmit)}>
      <StyledForm as='div' style={{ padding: '0' }}>
        <StyledFormTitle
          style={{
            borderBottom: '1px solid #f2efeb',
            marginBottom: '12px',
            padding: '12px 16px',
          }}
        >
          Commission Breakdown
        </StyledFormTitle>
        <StyledFormInputsWrapper
          style={{ marginTop: '12px', padding: '12px 16px' }}
        >
          {payoutFieldsLeftSide.map((field) => {
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
                      height='32px'
                      sx={{
                        maxWidth: field.width ? field.width + 'px' : undefined,
                        height: '32px!important',
                        width: '100%',
                      }}
                      focused
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
        <StyledFormInputsWrapperRight>
          {payoutFieldsRightSide.map((field) => {
            return (
              <StyledInputWrapper
                key={field.id}
                style={{
                  maxWidth: field.width ? field.width + 'px' : '100%',
                }}
              >
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: { onChange, value } }) => (
                    <CssTextField
                      height='32px'
                      sx={{
                        maxWidth: field.width ? field.width + 'px' : '100%',
                        height: '32px!important',
                        width: '100%',
                      }}
                      focused
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
        </StyledFormInputsWrapperRight>
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
          {payoutFieldsLeftSide.map((field) => {
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
          {payoutFieldsRightSide.map((field) => {
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

export default Payout
