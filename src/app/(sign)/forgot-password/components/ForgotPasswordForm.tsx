'use client'
import { handleSchemas, handleText } from '@/utils/forgotPassword'
import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ForgotStepOne } from './ForgotStepOne'
import { ForgotStepThree } from './ForgotStepThree'
import { ForgotStepTwo } from './ForgotStepTwo'
import { StepComponent } from './StepComponent'
import { yupResolver } from '@hookform/resolvers/yup'
import { NAV_LINKS } from '@/utils/constants/nav'
import { redirect } from 'next/navigation'
import { useForgotPassword, useForgotPasswordSubmit } from '@/data/hooks/auth'
import { IForgotPasswordFormInput } from '@/components/types'
import { useUserChangePassword } from '@/data/hooks/user'
import logo from '@/assets/icons/logo.svg'
import Image from 'next/image'

export const ForgotPasswordForm = () => {
  const [step, setStep] = useState(1)

  const { handleSubmit, getValues, ...otherProps } =
    useForm<IForgotPasswordFormInput>({
      defaultValues: { email: '', password: '', cpassword: '', code: '' },
      mode: 'onChange',
      resolver: yupResolver(handleSchemas(step)),
    })
  const handleStep = (step: number) => {
    setStep(step)
  }
  const { mutate: mutateForgotPassword, isSuccess: isSuccessForgotPassword } =
    useForgotPassword({ handleStep })
  const {
    mutate: mutateForgotPasswordSubmit,
    isSuccess: isSuccessForgotPasswordSubmit,
  } = useForgotPasswordSubmit({ handleStep })
  const {
    mutate: mutateUserPasswordChange,
    isSuccess: isSuccessUserPasswordChange,
  } = useUserChangePassword({})

  const onSubmit: SubmitHandler<IForgotPasswordFormInput> = (data) => {
    if (step === 1) {
      return mutateForgotPassword({ email: data.email as string })
    } else if (step === 2) {
      return mutateForgotPasswordSubmit({
        code: data.code as string,
        email: data.email as string,
      })
    }
    return mutateUserPasswordChange({ newPassword: data.password as string })
  }
  const resendCode = () => {
    mutateForgotPassword({ email: getValues('email') as string })
  }
  if (isSuccessUserPasswordChange) redirect(NAV_LINKS.HOME)
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      sm={12}
      md={6}
    >
      <Grid
        item
        sx={{
          backgroundColor: '#fff',
          maxWidth: '520px',
          width: '100%',
          borderRadius: '24px',
        }}
      >
        <FormProvider
          {...otherProps}
          handleSubmit={handleSubmit}
          getValues={getValues}
        >
          <Grid
            container
            sx={{
              boxShadow: { sm: '10px 4px 40px 0px rgba(224, 233, 243, 0.50)' },
              p: '40px',
              borderRadius: '24px',
            }}
          >
            <Box
              sx={{
                '&': {
                  textAlign: 'center',
                  width: '100%',
                  fontSize: '40px',
                  fontWeight: 600,
                  pt: '34px',
                  pb: '62.5px',
                },
              }}
            >
              <Image src={logo} alt='Logo' />
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              component='form'
              noValidate
              autoComplete='off'
              sx={{ width: '100%' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography
                variant='h5'
                component='h5'
                sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 500 }}
              >
                {handleText(step)}
              </Typography>
              <StepComponent step={step} stepsLength={3} stepSize={4} />
              {step === 1 && <ForgotStepOne />}
              {step === 2 && (
                <ForgotStepTwo
                  handler={handleStep}
                  resendCode={resendCode}
                  email={getValues('email') as string}
                />
              )}
              {step === 3 && <ForgotStepThree />}
            </Box>
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  )
}
