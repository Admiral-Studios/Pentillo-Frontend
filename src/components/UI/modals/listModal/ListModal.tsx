import { useFormContext } from '@/app/(main)/templates/create-template/_context/formContext/FormContext'
import FormInput from '@/components/formInput/FormInput'
import { IGetListResponse, IPostTemplateBody } from '@/data/api/api.types'
import { useCreateList } from '@/data/hooks/list'
import { listKeys } from '@/data/queryKeys'
import { TYPE } from '@/types/enum'
import { StyledLoadingButton } from '@/ui/components/styled'
import { listCreateFormSchema } from '@/utils/schemas/list-create.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Popper, Grow, Paper, Box } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import React, { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

interface ICreateList {
  name: string
}

interface ListModalProps {
  anchorRef: MutableRefObject<HTMLButtonElement | null>
  isOpen: boolean
  setOpenHandler: Dispatch<SetStateAction<boolean>>
  transactionId?: string
  templateId?: string
  type?: TYPE
  handleAddContextList?: (result: IGetListResponse) => void
}

const ListModal = ({
  anchorRef,
  isOpen,
  setOpenHandler,
  transactionId,
  type = TYPE.TASKS,
  handleAddContextList,
  templateId
}: ListModalProps) => {
  const { handleSubmit, reset, ...otherProps } = useForm<ICreateList>({
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
    resolver: yupResolver(listCreateFormSchema),
  })

  const queryClient = useQueryClient()

  const {
    mutate: mutateCreateList,
    isPending: isPending,
    isSuccess: isSuccess,
    isError: isError,
    error: error,
  } = useCreateList({})

  const onSubmit: SubmitHandler<ICreateList> = (data) =>
    mutateCreateList(
      {
        ...data,
        type: type,
        transactionId: transactionId,
        templateId: templateId,
      },
      {
        onSettled: (result) => {
          reset({ name: '' })
          queryClient.invalidateQueries({
            queryKey: [listKeys.list({ type: type })],
          })
          handleAddContextList &&
            handleAddContextList(result as IGetListResponse)
          setOpenHandler(false)
        },
      },
    )

  return (
    <Popper
      open={isOpen}
      anchorEl={anchorRef.current}
      disablePortal={false}
      style={{ zIndex: 99999 }}
      placement={'bottom'}
      sx={{
        '& .MuiPaper-root': {
          boxShadow: 'none',
          border: '1px solid #E5E5E5',
          padding: '15px',
          width: '260px',
          zIndex: 99999,
          marginRight: '125px',
          marginBottom: '10px',
          marginTop: '10px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
        },
        '& .MuiList-root': {
          padding: '0',
        },
        '& .MuiMenuItem-root': {
          fontSize: '16px',
          lineHeight: '17px',
          color: '#355670',
          padding: '8px 10px',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#FFFFFF',
          },
        },
      }}
    >
      <Grow in={isOpen}>
        <Paper>
          <Box
            display={'flex'}
            flexDirection={'column'}
            component='form'
            noValidate
            autoComplete='off'
            sx={{ width: '100%' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormProvider
              handleSubmit={handleSubmit}
              reset={reset}
              {...otherProps}
            >
              <FormInput
                label='List Name'
                type='text'
                name='name'
               
                required
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'end',
                  marginTop: '5px',
                }}
              >
                <StyledLoadingButton
                  variant='outlined'
                  onClick={() => setOpenHandler(false)}
                  sx={{
                    maxHeight: '32px',
                    fontSize: '14px !important',

                    px: '21px !important',
                    mt: '12px',
                    columnGap: '12px',
                    minWidth: '68px',
                    maxWidth: '35%',
                    ml: 0,
                  }}
                >
                  Cancel
                </StyledLoadingButton>
                <StyledLoadingButton
                  variant='contained'
                  type='submit'
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{
                    maxHeight: '32px',
                    fontSize: '14px !important',
                    color: '#fff',
                    px: '21px !important',
                    mt: '12px',
                    columnGap: '12px',
                    minWidth: '68px',
                    maxWidth: '35%',
                    ml: 0,
                  }}
                >
                  Create
                </StyledLoadingButton>
              </Box>
            </FormProvider>
          </Box>
        </Paper>
      </Grow>
    </Popper>
  )
}

export default ListModal
