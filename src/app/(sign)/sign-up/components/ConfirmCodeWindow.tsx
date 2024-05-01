import FormInput from '@/components/formInput/FormInput'
import { ButtonsContainer, StyledButton } from '@/ui/components/styled'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { confirmCodeFormSchema } from '@/utils/schemas/sign-up'
import { UseMutateFunction } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BDError } from '@/data/api/api.types'

interface IConfirmCodeWindow {
  handleConfirmSubmit: UseMutateFunction<
    { code: string },
    AxiosError<BDError, any>,
    { code: string; email: string },
    unknown
  >
  email: string
  handleClose: () => void
}

export const ConfirmCodeWindow = ({
  handleConfirmSubmit,
  email,
  handleClose,
}: IConfirmCodeWindow) => {
  const { handleSubmit, getValues, ...otherProps } = useForm<{ code: string }>({
    defaultValues: { code: '' },
    resolver: yupResolver(confirmCodeFormSchema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<{ code: string }> = ({ code }) => {
    handleConfirmSubmit({ email, code })
  }

  return (
    <FormProvider
      {...otherProps}
      handleSubmit={handleSubmit}
      getValues={getValues}
    >
      <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
        {' '}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            paddingBottom: '28px',
          }}
        >
          <Box>
            <Typography component='p' color='#AAA' sx={{ textAlign: 'center' }}>
              We sent verification code to{' '}
              <span style={{ color: '#717171' }}>{email}</span>
            </Typography>{' '}
            <Typography component='p' color='#AAA' sx={{ textAlign: 'center' }}>
              Please, check your inbox and enter the code.
            </Typography>
          </Box>

          <FormInput
            label='Enter 4-digits code'
            type='text'
            name='code'
            focused
            required
          />
        </Box>{' '}
        <ButtonsContainer>
          <StyledButton
            variant='outlined'
            onClick={handleClose}
          >
           Decline
          </StyledButton>
          <StyledButton
            sx={{ color: '#FFFFFF' }}
            variant='contained'
            type='submit'
          >
            Confirm
          </StyledButton>
        </ButtonsContainer>
      </Box>
    </FormProvider>
  )
}
