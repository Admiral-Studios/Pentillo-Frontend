import { Box, Modal, Typography } from '@mui/material'
import {
  StyledButton,
  StyledModalBody,
  StyledModalDivider,
  StyledModalFooter,
  StyledModalHeader,
  StyledModalInner,
  StyledModalTitle,
} from './changeEmailModal.styled'
import closeIcon from '@/assets/icons/close-modal-icon.svg'
import Image from 'next/image'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changeEmailFormSchema } from '@/utils/schemas/change-email'
import {
  IChangeEmailForm,
  IChangePasswordForm,
  IConfirmEmailForm,
} from '@/components/types'
import {
  useUserConfirmEmail,
  useUserUpdateEmail,
  useUserUpdatePassword,
} from '@/data/hooks/user'
import FormInput from '@/components/formInput/FormInput'
import { confirmEmailFormSchema } from '@/utils/schemas/confirm-email'
import { useState } from 'react'

interface IChangeEmailModalProps {
  handleClose: () => void
  open: boolean
  title?: string
}

const ChangeEmailModal = ({
  handleClose,
  open,
  title = 'Change Email',
}: IChangeEmailModalProps) => {
  const [step, setStep] = useState(1)
  const [newEmail, setNewEmail] = useState('')

  const { handleSubmit: handleChangeEmailSubmit, ...otherChangeEmailProps } =
    useForm<IChangeEmailForm>({
      defaultValues: {
        newEmail: '',
      },
      mode: 'onChange',
      resolver: yupResolver(changeEmailFormSchema),
    })

  const { handleSubmit: handleConfirmEmailSubmit, ...otherConfirmEmailProps } =
    useForm<IConfirmEmailForm>({
      defaultValues: {
        code: '',
      },
      mode: 'onChange',
      resolver: yupResolver(confirmEmailFormSchema),
    })

  const { mutate: mutateUserEmailChange } = useUserUpdateEmail()
  const { mutate: mutateUserEmailConfirm } = useUserConfirmEmail({
    onClose() {
    handleClose()
  }})

  const onChangeEmailSubmit: SubmitHandler<IChangeEmailForm> = ({
    newEmail,
  }) => {
    setNewEmail(newEmail)
    mutateUserEmailChange({
      newEmail: newEmail,
    })
    setStep(2)
  }

  const onConfirmEmailSubmit: SubmitHandler<IConfirmEmailForm> = ({ code }) => {
    mutateUserEmailConfirm({
      code: code,
    })
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalInner>
        <StyledModalHeader>
          <StyledModalTitle>{title}</StyledModalTitle>
          <Image
            onClick={handleClose}
            width={16}
            height={16}
            src={closeIcon}
            alt='close icon'
          />
        </StyledModalHeader>
        <StyledModalDivider />
        <StyledModalBody>
          {step === 1 ? (
            <FormProvider
              {...otherChangeEmailProps}
              handleSubmit={handleChangeEmailSubmit}
            >
              <Box
                display='flex'
                flexDirection='column'
                component='form'
                noValidate
                autoComplete='off'
                sx={{ width: '100%', gap: '24px' }}
                onSubmit={handleChangeEmailSubmit(onChangeEmailSubmit)}
              >
                <FormInput label='New email' name='newEmail' focused required />
                <StyledModalFooter>
                  <StyledButton onClick={handleClose} variant='outlined'>
                    Cancel
                  </StyledButton>
                  <StyledButton type='submit' variant='contained'>
                    Change
                  </StyledButton>
                </StyledModalFooter>
              </Box>
            </FormProvider>
          ) : (
            <FormProvider
              {...otherConfirmEmailProps}
              handleSubmit={handleConfirmEmailSubmit}
            >
              <Box
                display='flex'
                flexDirection='column'
                component='form'
                noValidate
                autoComplete='off'
                sx={{ width: '100%', gap: '24px' }}
                onSubmit={handleConfirmEmailSubmit(onConfirmEmailSubmit)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '28px',
                    paddingBottom: '28px',
                  }}
                >
                  <Box>
                    <Typography
                      component='p'
                      color='#AAA'
                      sx={{ textAlign: 'center' }}
                    >
                      We sent verification code to{' '}
                      <span style={{ color: '#717171' }}>{newEmail}</span>
                    </Typography>{' '}
                    <Typography
                      component='p'
                      color='#AAA'
                      sx={{ textAlign: 'center' }}
                    >
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
                <StyledModalFooter>
                  <StyledButton variant='outlined' onClick={handleClose}>
                    Decline
                  </StyledButton>
                  <StyledButton
                    sx={{ color: '#FFFFFF' }}
                    variant='contained'
                    type='submit'
                  >
                    Confirm
                  </StyledButton>
                </StyledModalFooter>
              </Box>
            </FormProvider>
          )}
        </StyledModalBody>
      </StyledModalInner>
    </Modal>
  )
}

export default ChangeEmailModal
