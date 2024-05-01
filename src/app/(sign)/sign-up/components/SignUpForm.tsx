'use client'
import {
  Checkbox,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Divider,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { ISignUpFormInput } from '@/components/types'
import { signUpFormSchema } from '@/utils/schemas/sign-up'
import { useAuthSignUp, useConfirmEmailSubmit } from '@/data/hooks/auth'
import { redirect } from 'next/navigation'
import { NAV_LINKS } from '@/utils/constants/nav'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from '@/components/formInput/FormInput'
import { StyledLink, StyledLoadingButton } from '@/ui/components/styled'
import GoogleButton from '@/components/googleButton/GoogleButton'
import { ModalWindow } from '@/components/modalWindow/ModalWindow'
import { ConfirmCodeWindow } from './ConfirmCodeWindow'
import Image from 'next/image'
import logo from '@/assets/icons/logo.svg'

const SignUpForm: FC<{ inviteToken?: string }> = ({ inviteToken }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { handleSubmit, getValues, ...otherProps } = useForm<ISignUpFormInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(signUpFormSchema),
    mode: 'onChange',
  })

  const { mutate: mutateAuthSignUp, isSuccess: isSuccessAuthSignUp } =
    useAuthSignUp()

  const { mutate: mutateConfirmEmail, isSuccess: isSuccessConfirmEmail } =
    useConfirmEmailSubmit()

  const onSubmit: SubmitHandler<ISignUpFormInput> = (data) => {

    mutateAuthSignUp({ ...data, invitationToken: inviteToken })
  }

  if (isSuccessConfirmEmail) redirect(NAV_LINKS.BUY_SUBSCRIPTION)

  useEffect(() => {
    setOpen(isSuccessAuthSignUp)
  }, [isSuccessAuthSignUp])

  return (
    <>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
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
            maxHeight: '772px',
            height: '100%',
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
                boxShadow: {
                  sm: '10px 4px 40px 0px rgba(224, 233, 243, 0.50)',
                },
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
                <GoogleButton text={'Sign up with'} inviteToken={inviteToken} />
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
                    label='First name'
                    type='text'
                    name='firstName'
                    required
                  />
                  <FormInput
                    label='Last name'
                    type='text'
                    name='lastName'
                    required
                  />
                  <FormInput
                    type='password'
                    label='Password'
                    name='password'
                    required
                  />
                  <FormInput
                    type='password'
                    label='Confirm Password'
                    name='cpassword'
                    required
                  />
                </Box>

                <Box
                  sx={{
                    mb: '0',
                    mt: '8px',
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
                    fontSize: '20px',
                  }}
                >
                  Sign up
                </StyledLoadingButton>
              </Box>

              <Typography
                sx={{
                  fontSize: '18px',
                  textAlign: 'center',
                  mt: '2rem',
                  width: '100%',
                }}
              >
                Already have an account?{' '}
                <StyledLink
                  href='/sign-in'
                  style={{
                    color: '#FF902A',
                    paddingLeft: '10px',
                    fontSize: '20px',
                  }}
                >
                  Log in
                </StyledLink>
              </Typography>
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
      {open && (
        <ModalWindow
          open={open}
          handleClose={() => setOpen((prev) => !prev)}
          title={"Verify it's you"}
        >
          <ConfirmCodeWindow
            handleConfirmSubmit={mutateConfirmEmail}
            email={getValues('email')}
            handleClose={() => setOpen((prev) => !prev)}
          />
        </ModalWindow>
      )}
    </>
  )
}

export default SignUpForm
