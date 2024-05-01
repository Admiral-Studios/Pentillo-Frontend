'use client'
import {
  Checkbox,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Divider,
} from '@mui/material'
import { FC } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { ISignInFormInput } from '@/components/types'
import { signInFormSchema } from '@/utils/schemas/sign-in'
import { useAuthSignIn } from '@/data/hooks/auth'
import { redirect, useRouter } from 'next/navigation'
import { NAV_LINKS } from '@/utils/constants/nav'
import { yupResolver } from '@hookform/resolvers/yup'
import { StyledLink, StyledLoadingButton } from '@/ui/components/styled'
import FormInput from '@/components/formInput/FormInput'
import GoogleButton from '@/components/googleButton/GoogleButton'
import Image from 'next/image'
import logo from '@/assets/icons/logo.svg'

const SignInForm: FC<{ inviteToken?: string }> = ({ inviteToken }) => {
  const { handleSubmit, ...otherProps } = useForm<ISignInFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(signInFormSchema),
  })

  const {
    mutate: mutateAuthSignIn,
    data,
    isPending: isPendingAuthSignIn,
    isSuccess: isSuccessAuthSignIn,
    isError: isErrorAuthSignIn,
    error: errorAuthSignIn,
  } = useAuthSignIn()

  const onSubmit: SubmitHandler<ISignInFormInput> = (data) => {
    mutateAuthSignIn({ ...data, invitationToken: inviteToken })
  }

  if (isSuccessAuthSignIn && data.subscription && data.subscription.isActive)
    redirect(NAV_LINKS.TRANSACTIONS)

  if (isSuccessAuthSignIn && !data.subscription)
    redirect(NAV_LINKS.BUY_SUBSCRIPTION)

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
          maxHeight: '644px',
          height: '100%',
          width: '100%',
          borderRadius: '24px',
        }}
      >
        <FormProvider {...otherProps} handleSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              boxShadow: { sm: '10px 4px 40px 0px rgba(224, 233, 243, 0.50)' },
              p: '40px',
              borderRadius: '24px',
              maxHeight: '644px',
              height: '100%',
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
              <GoogleButton text={'Log in with'} inviteToken={inviteToken} />
              <Box
                sx={{
                  display: 'flex',
                  gap: '12px',
                  padding: '0 20px 20px 20px',
                  alignItems: 'center',
                }}
              >
                <Divider sx={{ width: '180px' }} />
                <Typography variant='h6'>or</Typography>
                <Divider sx={{ width: '180px' }} />
              </Box>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                <FormInput
                  label='Email'
                  type='email'
                  name='email'
                  required
                />

                <FormInput
                  type='password'
                  label='Password'
                  name='password'
                  required
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: '0',
                  mt: '16px',
                }}
              >
                <FormControlLabel
                  sx={{
                    color: '#AAAAAA',
                    display: 'flex',
                    gap: '8px',
                    margin: '0',
                  }}
                  control={
                    <Checkbox
                      sx={{
                        color: '#AAAAAA',
                        padding: 0,
                        borderWidth: '1px',
                        '& .MuiSvgIcon-root': {
                          fontSize: '20px',
                        },
                      }}
                      value='remember'
                      color='primary'
                    />
                  }
                  label='Remember me'
                />
                <StyledLink href='/forgot-password'>
                  {' '}
                  <Typography component='p' sx={{ color: '#AAAAAA' }}>
                    Forgot password?
                  </Typography>
                </StyledLink>
              </Box>

              <StyledLoadingButton
                loading={false}
                type='submit'
                variant='contained'
                sx={{
                  py: '12px',
                  mt: 3,
                  width: '100%',
                  marginInline: 'auto',
                  color: '#FFFFFF',
                  textTransform: 'initial',
                }}
              >
                Log in
              </StyledLoadingButton>
            </Box>

            <Typography
              sx={{
                fontSize: '20px',
                textAlign: 'center',
                mt: '2rem',
                width: '100%',
              }}
            >
              Don&apos;t have an account?{' '}
              <StyledLink
                href='/sign-up'
                style={{
                  color: '#FF902A',
                  paddingLeft: '10px',
                  fontSize: '20px',
                }}
              >
                Sign up
              </StyledLink>
            </Typography>
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  )
}

export default SignInForm
