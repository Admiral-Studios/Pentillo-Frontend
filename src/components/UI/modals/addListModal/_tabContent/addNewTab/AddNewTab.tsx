import SelectRegular from '@/components/newUI/selects/selectRegular'
import { StyledButtonsWrapper, StyledWrapper } from '../tabContent.styled'
import { StyledInput } from '@/components/newUI/inputs/inputs.styled'
import { StyledButton } from '@/components/newUI/buttons/buttons.styled'
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addNewFormSchema } from './addNewForm.schema'
import styled from '@emotion/styled'
import { TYPE } from '@/types/enum'
import {
  StyledErrorMessage,
  StyledInputWrapper,
} from '@/app/(main)/transactions/create-transaction/_sections/tabsContent/_utils/styled'
import { useState } from 'react'
import { IGetListResponse, IListData } from '@/data/api/api.types'
import { useQueryClient } from '@tanstack/react-query'
import { listKeys } from '@/data/queryKeys'
import { useCreateList } from '@/data/hooks/list'

interface IAddNewTabProps {
  onAddList?: (contact: string) => void
  handleClose: () => void
}

const AddNewTab = ({ handleClose, onAddList }: IAddNewTabProps) => {
  const queryClient = useQueryClient()
  const [typeButtonClick, setTypeButtonClick] = useState<'save' | null>(null)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: yupResolver(addNewFormSchema) as Resolver<{ name: string }>,
  })

  const onSuccessCreateList = (data: IGetListResponse) => {
    const listData: IListData = {
      id: data.id,
      name: data.name,
      type: TYPE.TASKS,
    }


    queryClient.invalidateQueries({
      queryKey: [listKeys.all],
    })

    if (onAddList) {
      onAddList(listData.id)
      handleClose()
    }
  }
  const { mutate: mutateCreateList, isPending: isPendingCreateList } =
    useCreateList({ onSuccess: onSuccessCreateList })

  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    if (typeButtonClick === 'save') {
      mutateCreateList({
        name: data.name,
        type: TYPE.TASKS,
      })
    }
  }

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInputWrapper>
          <Controller
            control={control}
            name={'name'}
            render={({ field: { onChange, value } }) => (
              <StyledInput
                value={value}
                onChange={onChange}
                placeholder={'List name'}
              />
            )}
          />
          <StyledErrorMessage>{errors['name']?.message}</StyledErrorMessage>
        </StyledInputWrapper>

        <StyledButtonsWrapper>
          <StyledButton
            onClick={() => {
              setTypeButtonClick('save')
            }}
          >
            Add
          </StyledButton>
        </StyledButtonsWrapper>
      </StyledForm>
    </StyledWrapper>
  )
}

const StyledForm = styled.form`
  display: contents;
`

export default AddNewTab
