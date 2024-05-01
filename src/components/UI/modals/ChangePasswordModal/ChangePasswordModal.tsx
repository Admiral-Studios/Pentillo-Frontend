import { Box, Modal } from '@mui/material'
import {
  StyledButton,
  StyledModalBody,
  StyledModalDivider,
  StyledModalFooter,
  StyledModalHeader,
  StyledModalInner,
  StyledModalTitle,
} from './changePasswordModal.styled'
import closeIcon from '@/assets/icons/close-modal-icon.svg'
import Image from 'next/image'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordFormSchema } from '@/utils/schemas/change-password'
import { IChangePasswordForm } from '@/components/types'
import { useUserUpdatePassword } from '@/data/hooks/user'
import FormInput from '@/components/formInput/FormInput'

interface IChangePasswordModalProps {
  handleClose: () => void
  open: boolean
  title?: string
}

const ChangePasswordModal = ({
  handleClose,
  open,
  title = 'Change Password',
}: IChangePasswordModalProps) => {
  const { handleSubmit, ...otherProps } = useForm<IChangePasswordForm>({
    defaultValues: {
      oldPassword: '',
      password: '',
      cpassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(changePasswordFormSchema),
  })

  const { mutate: mutateUserPasswordChange } = useUserUpdatePassword()

  const onSubmit: SubmitHandler<IChangePasswordForm> = (data) => {
    const { oldPassword, password } = data
    mutateUserPasswordChange({
      oldPassword: oldPassword,
      newPassword: password,
    })
    handleClose()
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
          <FormProvider {...otherProps} handleSubmit={handleSubmit}>
            <Box
              display='flex'
              flexDirection='column'
              component='form'
              noValidate
              autoComplete='off'
              sx={{ width: '100%', gap: '24px' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInput
                label='Old Password'
                name='oldPassword'
                type='password'
                focused
                required
              />
              <FormInput
                label='New Password'
                name='password'
                type='password'
                focused
                required
              />
              <FormInput
                label='Repeat Password'
                name='cpassword'
                type='password'
                focused
                required
              />
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
        </StyledModalBody>
      </StyledModalInner>
    </Modal>
  )
}

export default ChangePasswordModal
