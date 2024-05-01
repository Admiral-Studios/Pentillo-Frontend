import * as yup from 'yup'
import { IChangeEmailForm } from '@/components/types'

export const changeEmailFormSchema: yup.ObjectSchema<IChangeEmailForm> =
  yup.object({
    newEmail: yup
      .string()
      .email('Email should be valid')
      .required('Email is required!')
      .trim('Email must not contain a space!'),
  })
