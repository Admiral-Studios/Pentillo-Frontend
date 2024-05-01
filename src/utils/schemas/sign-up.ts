import * as yup from 'yup'
import { ISignUpFormInput } from '@/components/types'

export const signUpFormSchema: yup.ObjectSchema<ISignUpFormInput> = yup.object({
  password: yup
    .string()
    .required('Password is required!')
    .trim('Password must not contain a space!')
    .min(8, 'Password must be at least 8 characters long!')
    .matches(/[A-Z]/, 'Password must contain at least one capital letter!')
    .matches(/[0-9]/, 'Password must contain at least one number!')
    .max(512, 'Password can have a maximum of 512 characters!'),
  cpassword: yup
    .string()
    .required('Confirmation password is required!')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  firstName: yup
    .string()
    .required('First name is required!')
    .min(2, 'First name can have a minimum of 2 characters!')
    .max(100, 'First name can have a maximum of 100 characters!'),
  lastName: yup
    .string()
    .required('Last name is required!')
    .min(2, 'Last name can have a minimum of 2 characters!')
    .max(100, 'Last name can have a maximum of 100 characters!'),
  email: yup
    .string()
    .email('Email is not valid')
    .required('Email is required!'),
})

export const confirmCodeFormSchema: yup.ObjectSchema<{ code: string }> =
  yup.object({
    code: yup
      .string()
      .length(4, 'Code should have 4 digits!')
      .required('Code is required!'),
  })
