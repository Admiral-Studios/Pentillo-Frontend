import SelectRegular from '@/components/UI/selects/selectRegular'
import styled from '@emotion/styled'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { ITemplateFormInputs } from '../../_utils/types'
import { templateFormSchema } from './templateForm.schema'
import { StyledErrorMessage, StyledInputWrapper } from '../../_utils/styled'
import { useFormContext } from '@/app/(main)/transactions/create-transaction/_context/formContext/FormContext'
import { useGetTemplates } from '@/data/hooks/template'
import { IOption } from '@/components/UI/selects/selectRegular/SelectRegular'
import { IPostTransactionBody, ITemplate } from '@/data/api/api.types'
import { useCreateTransaction } from '@/data/hooks/transaction'
import { StyledButtonFooterWrapper } from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_tabSections/contactsAndAgentsSection/contactsAndAgentsSection.styled'
import { useRouter } from 'next/navigation'
import { StyledRegularButton } from '@/components/UI/buttons/buttonRegular'
import toast from 'react-hot-toast'
import { StyledRegularTooltip } from '@/components/UI/toaltips/toaltip.styled'

interface ITemplateSectionProps {
  handlePrev: () => void
}

const TemplateSection = ({ handlePrev }: ITemplateSectionProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ITemplateFormInputs>({
    resolver: yupResolver(templateFormSchema) as Resolver<ITemplateFormInputs>,
  })
  const router = useRouter()

  const createTransactionSuccess = () => {
    toast.success('The transaction was created successfully!')
    router.push('/transactions')
  }
  const createTransactionError = (error: Error) => {
    toast.error(error.message)
  }

  const { mutate: mutateCreateTransaction } = useCreateTransaction({
    onSuccess: createTransactionSuccess,
    onError: createTransactionError,
  })

  const { data: dataGetTemplates, isLoading: isLoadingGetTemplates } =
    useGetTemplates()

  const isTemplates = Boolean(dataGetTemplates?.count)

  const formContextData = useFormContext()

  const templateSelectOptions: IOption[] =
    dataGetTemplates?.data.map((template: ITemplate) => ({
      name: template.name,
      value: template.id,
    })) || []

  const onSubmit: SubmitHandler<ITemplateFormInputs> = (data) => {
    const templateId = data.templateId ? data.templateId : undefined

    if (formContextData.formState) {
      if ('transaction' in formContextData.formState) {
        mutateCreateTransaction({
          ...(formContextData.formState as IPostTransactionBody),
          transaction: {
            ...formContextData.formState.transaction,
            templateId: templateId,
          },
        })
      }
    }
  }

  return (
    <StyledWrapper>
      <StyledTitle>Template</StyledTitle>
      <StyledTemplateForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormTitle>Automatically chosen template</StyledFormTitle>

        <StyledInputWrapper width={'498px'}>
          <Controller
            control={control}
            name='templateId'
            render={({ field: { onChange, value } }) => (
              <SelectRegular
                disabled={!isTemplates}
                onChange={onChange}
                value={value as string}
                options={templateSelectOptions}
                sxSelect={{ maxWidth: '498px' }}
                placeholder='Template Name'
              />
            )}
          />

          <StyledErrorMessage>
            {errors['templateId']?.message}
          </StyledErrorMessage>
        </StyledInputWrapper>

        <StyledButtonFooterWrapper>
          <StyledRegularButton onClick={handlePrev} variant='outlined'>
            Back
          </StyledRegularButton>
          <StyledRegularButton type='submit' variant='contained'>
            Create
          </StyledRegularButton>
        </StyledButtonFooterWrapper>
      </StyledTemplateForm>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div``
const StyledTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  margin: 0;
  margin-bottom: 12px;
`
const StyledTemplateForm = styled.form`
  background-color: #ffffff;
  box-shadow: 10px 4px 40px 0px #e0e9f380;
  padding: 16px;
  border-radius: 16px;
`
const StyledFormTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  margin: 0;
  margin-bottom: 8px;
`

export default TemplateSection
