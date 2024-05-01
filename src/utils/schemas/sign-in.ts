import * as yup from 'yup'
import { ISignInFormInput } from '@/components/types'

export const signInFormSchema: yup.ObjectSchema<ISignInFormInput> = yup.object({
  password: yup
    .string()
    .required('Passwords is required!')
    .trim('Password must not contain a space!')
    .min(8, 'Password must be at least 8 characters long!')
    .matches(/[A-Z]/, 'Password must contain at least one capital letter!')
    .matches(/[0-9]/, 'Password must contain at least one number!')
    .max(512, 'Password can have a maximum of 512 characters!'),
  email: yup
    .string()
    .email('Email is not valid')
    .required('Email is required!'),
    invitationToken: yup.string()
})
