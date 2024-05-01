import { IChangePasswordForm } from '@/components/types'
import * as yup from 'yup'

export const changePasswordFormSchema: yup.ObjectSchema<IChangePasswordForm> =
  yup.object({
    oldPassword: yup
      .string()
      .required('Password is required!')
      .trim('Password must not contain a space!')
      .min(8, 'Password must be at least 8 characters long!')
      .matches(/[A-Z]/, 'Password must contain at least one capital letter!')
      .matches(/[0-9]/, 'Password must contain at least one number!')
      .max(512, 'Password can have a maximum of 512 characters!'),
    password: yup
      .string()
      .required('Password is required!')
      .trim('Password must not contain a space!')
      .min(8, 'Password must be at least 8 characters long!')
      .matches(/[A-Z]/, 'Password must contain at least one capital letter!')
      .matches(/[0-9]/, 'Password must contain at least one number!')
      .max(512, 'Password can have a maximum of 512 characters!')
      .test(
        'passwords-match',
        'New password must be different from the old password',
        function (value) {
          return value !== this.parent.oldPassword
        },
      ),
    cpassword: yup
      .string()
      .required('Confirmation password is required!')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  })
